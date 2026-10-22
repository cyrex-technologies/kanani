<?php
declare(strict_types=1);

// Adapted from the proven VTB cPanel contact-handler pattern. Keep secrets in
// /home/CPANEL_USER/kanan-contact-form-config.php, never in this public directory.
const COMPANY_NAME = 'Kanan Services Limited';
const COMPANY_EMAIL = 'info@kanan.co.tz';
const COMPANY_PHONE = '+255 677 125 108';
const COMPANY_WEBSITE = 'https://kanan.co.tz';
const MAX_REQUEST_BYTES = 20000;
const RATE_LIMIT_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_SECONDS = 900;
const MIN_FILL_MILLISECONDS = 3000;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function respond(int $status, bool $ok, string $message): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function field(string $key, bool $multiline = false): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) return '';
    $value = trim($value);
    if ($multiline) {
        $value = str_replace(["\r\n", "\r"], "\n", $value);
        return preg_replace("/[ \t]+\n/u", "\n", $value) ?? '';
    }
    return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

function html(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function headerInjection(string $value): bool { return preg_match('/[\r\n]/', $value) === 1; }
function requestIp(): string { return is_string($_SERVER['REMOTE_ADDR'] ?? null) ? $_SERVER['REMOTE_ADDR'] : 'unknown'; }

function allowedOrigin(): bool {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') return true; // permits non-browser smoke tests; PHP still validates the payload.
    if (!is_string($origin)) return false;
    $host = parse_url($origin, PHP_URL_HOST);
    return is_string($host) && in_array(strtolower($host), [
        'kanan.co.tz', 'www.kanan.co.tz', 'dev.kanan.co.tz', 'www.dev.kanan.co.tz', 'localhost', '127.0.0.1',
    ], true);
}

function retryAfter(string $ip): int {
    if (getenv('CONTACT_FORM_DRY_RUN') === '1') return 0;
    $path = sys_get_temp_dir() . '/kanan-contact-' . hash('sha256', $ip) . '.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false) return 0; // fail open if shared-host temp storage is unavailable.
    try {
        if (!flock($handle, LOCK_EX)) return 0;
        $contents = stream_get_contents($handle);
        $attempts = is_string($contents) ? json_decode($contents, true) : [];
        $attempts = is_array($attempts) ? $attempts : [];
        $now = time();
        $attempts = array_values(array_filter($attempts, static fn($at): bool => is_int($at) && $at >= $now - RATE_LIMIT_WINDOW_SECONDS));
        if (count($attempts) >= RATE_LIMIT_ATTEMPTS) return max(1, min($attempts) + RATE_LIMIT_WINDOW_SECONDS - $now);
        $attempts[] = $now;
        rewind($handle); ftruncate($handle, 0); fwrite($handle, json_encode($attempts)); fflush($handle);
        return 0;
    } finally { fclose($handle); }
}

function smtpConfig(): array {
    // Supports both a domain at public_html and a subdomain at public_html/name.
    // Keep the private config in the cPanel account home, outside the web root.
    $config = [];
    foreach ([dirname(__DIR__) . '/kanan-contact-form-config.php', dirname(__DIR__, 2) . '/kanan-contact-form-config.php'] as $configFile) {
        if (is_file($configFile)) {
            $loaded = require $configFile;
            $config = is_array($loaded) ? $loaded : [];
            break;
        }
    }
    foreach (['smtp_host', 'smtp_port', 'smtp_encryption', 'smtp_username', 'smtp_password', 'from_email', 'from_name', 'recipient_email', 'instagram_url'] as $key) {
        $env = getenv('CONTACT_' . strtoupper($key));
        if ($env !== false && $env !== '') $config[$key] = $env;
    }
    return array_merge([
        'smtp_host' => '', 'smtp_port' => 465, 'smtp_encryption' => 'ssl', 'smtp_username' => '', 'smtp_password' => '',
        'from_email' => '', 'from_name' => 'Kanan Services Limited Website', 'recipient_email' => COMPANY_EMAIL,
        'instagram_url' => 'https://www.instagram.com/kanan.tz/',
    ], $config);
}

function smtpRead($socket, array $codes): void {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) { $response .= $line; if (strlen($line) < 4 || $line[3] === ' ') break; }
    if (!in_array((int) substr($response, 0, 3), $codes, true)) throw new RuntimeException('Unexpected SMTP response.');
}
function smtpCommand($socket, string $command, array $codes): void {
    if (fwrite($socket, $command . "\r\n") === false) throw new RuntimeException('SMTP write failed.');
    smtpRead($socket, $codes);
}
function mimeMessage(string $fromEmail, string $fromName, string $to, string $replyTo, string $subject, string $text, string $htmlBody): string {
    $boundary = 'kanan_' . bin2hex(random_bytes(16));
    $headers = [
        'Date: ' . date(DATE_RFC2822), 'Message-ID: <' . bin2hex(random_bytes(16)) . '@kanan.co.tz>',
        'To: ' . $to, 'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=', 'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'From: ' . $fromName . ' <' . $fromEmail . '>', 'Reply-To: ' . $replyTo, 'X-Mailer: PHP/' . PHP_VERSION,
    ];
    // Base64 avoids malformed quoted-printable soft line breaks in webmail clients.
    $encode = static fn(string $body): string => rtrim(chunk_split(base64_encode(str_replace(["\r\n", "\r"], "\n", $body)), 76, "\r\n"));
    return implode("\r\n", $headers) . "\r\n\r\n" . implode("\r\n", [
        '--' . $boundary, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', $encode($text), '',
        '--' . $boundary, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', $encode($htmlBody), '', '--' . $boundary . '--',
    ]);
}
function smtpSend(array $config, string $to, string $replyTo, string $subject, string $text, string $htmlBody): bool {
    if (getenv('CONTACT_FORM_DRY_RUN') === '1') return true;
    $host = (string) $config['smtp_host']; $port = (int) $config['smtp_port']; $encryption = strtolower((string) $config['smtp_encryption']);
    $username = (string) $config['smtp_username']; $password = (string) $config['smtp_password']; $from = (string) $config['from_email'];
    if ($host === '' || $username === '' || $password === '' || !filter_var($from, FILTER_VALIDATE_EMAIL)) { error_log('Kanan contact: SMTP configuration is incomplete.'); return false; }
    try {
        $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host, 'SNI_enabled' => true]]);
        $target = ($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
        $socket = @stream_socket_client($target, $code, $error, 20, STREAM_CLIENT_CONNECT, $context);
        if ($socket === false) throw new RuntimeException('SMTP connection failed.');
        stream_set_timeout($socket, 20); smtpRead($socket, [220]); smtpCommand($socket, 'EHLO kanan.co.tz', [250]);
        if ($encryption === 'tls') { smtpCommand($socket, 'STARTTLS', [220]); if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) throw new RuntimeException('TLS failed.'); smtpCommand($socket, 'EHLO kanan.co.tz', [250]); }
        smtpCommand($socket, 'AUTH LOGIN', [334]); smtpCommand($socket, base64_encode($username), [334]); smtpCommand($socket, base64_encode($password), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $from . '>', [250]); smtpCommand($socket, 'RCPT TO:<' . $to . '>', [250, 251]); smtpCommand($socket, 'DATA', [354]);
        $message = preg_replace('/(?m)^\./', '..', mimeMessage($from, (string) $config['from_name'], $to, $replyTo, $subject, $text, $htmlBody)) ?? '';
        if (fwrite($socket, $message . "\r\n.\r\n") === false) throw new RuntimeException('SMTP data write failed.');
        smtpRead($socket, [250]); smtpCommand($socket, 'QUIT', [221]); fclose($socket); return true;
    } catch (Throwable $exception) {
        if (isset($socket) && is_resource($socket)) fclose($socket);
        error_log('Kanan contact SMTP error: ' . $exception->getMessage()); return false;
    }
}
function emailShell(array $config, string $title, string $content): string {
    $instagram = (string) ($config['instagram_url'] ?? '');
    $instagramLink = filter_var($instagram, FILTER_VALIDATE_URL)
        ? ' &nbsp;·&nbsp; <a href="' . html($instagram) . '" style="color:#03226f">Instagram</a>'
        : '';
    return '<!doctype html><html lang="en"><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#102246"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 14px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fff;border:1px solid #dce3f0"><tr><td style="background:#03226f;padding:24px 32px"><img src="https://kanan.co.tz/images/kanan-nav.png" width="190" alt="Kanan Services Limited" style="display:block;width:190px;max-width:100%;height:auto;border:0"></td></tr><tr><td style="padding:32px"><h1 style="margin:0 0 20px;font-size:27px">' . html($title) . '</h1>' . $content . '</td></tr><tr><td style="padding:22px 32px;background:#f5f7fb;font-size:13px;line-height:1.7">' . COMPANY_NAME . '<br><a href="mailto:' . COMPANY_EMAIL . '" style="color:#03226f">' . COMPANY_EMAIL . '</a> &nbsp;·&nbsp; <a href="tel:+255677125108" style="color:#03226f">' . COMPANY_PHONE . '</a>' . $instagramLink . '</td></tr></table></td></tr></table></body></html>';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, false, 'Method not allowed.');
if (!allowedOrigin()) respond(403, false, 'This submission origin is not allowed.');
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_REQUEST_BYTES) respond(413, false, 'The submitted message is too large.');
$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if ($contentType !== '' && !str_starts_with($contentType, 'application/x-www-form-urlencoded')) respond(415, false, 'Unsupported submission format.');
if (field('company') !== '') respond(200, true, 'Thank you. Your inquiry has been received.');
$startedAt = filter_input(INPUT_POST, 'started_at', FILTER_VALIDATE_INT);
$elapsed = is_int($startedAt) ? (int) floor(microtime(true) * 1000) - $startedAt : 0;
if ($elapsed < MIN_FILL_MILLISECONDS || $elapsed > 86400000) respond(422, false, 'Please wait a moment, then submit the form again.');
$wait = retryAfter(requestIp());
if ($wait > 0) { header('Retry-After: ' . $wait); respond(429, false, 'Too many requests were sent. Please wait about ' . max(1, (int) ceil($wait / 60)) . ' minutes and try again.'); }

$name = field('name'); $email = strtolower(field('email')); $phone = field('phone'); $interest = field('interest'); $city = field('city');
$branch = field('preferred_branch'); $product = field('product'); $message = field('message', true);
$interests = ['General Inquiry', 'Request a Quote', 'Bulk Supply Support', 'Project Delivery Planning', 'Careers'];
$branches = ['Dar es Salaam' => ['Mivumoni, Madale', 'Kariakoo', 'Mbezi Beach'], 'Dodoma' => ['Area C', 'Nzuguni', 'Kisasa'], 'Moshi' => ['Majengo', 'Pasua', 'Soweto'], 'Bagamoyo' => ['Dunda', 'Kaole', 'Mlandizi']];
$errors = [];
if (strlen($name) < 2 || strlen($name) > 100 || headerInjection($name)) $errors[] = 'Enter a valid name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 || headerInjection($email)) $errors[] = 'Enter a valid email address.';
if ($phone === '' || strlen($phone) > 40 || headerInjection($phone)) $errors[] = 'Enter a valid phone number.';
if (!in_array($interest, $interests, true)) $errors[] = 'Select a valid inquiry type.';
if (!isset($branches[$city])) $errors[] = 'Select a valid city.';
if (!isset($branches[$city]) || !in_array($branch, $branches[$city], true)) $errors[] = 'Select a valid branch.';
if (strlen($product) > 160 || headerInjection($product)) $errors[] = 'The selected product is invalid.';
if (strlen($message) < 10 || strlen($message) > 5000) $errors[] = 'Your message must be between 10 and 5,000 characters.';
if ($errors !== []) respond(422, false, implode(' ', $errors));

$smtp = smtpConfig(); $recipient = (string) $smtp['recipient_email'];
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) { error_log('Kanan contact: recipient email is invalid.'); respond(502, false, 'We could not send your inquiry. Please email or call our team directly.'); }
$summary = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nInquiry type: {$interest}\nCity: {$city}\nPreferred branch: {$branch}\n" . ($product !== '' ? "Product: {$product}\n" : '') . "\nMessage:\n{$message}\n";
$details = '<p style="line-height:1.7">A new website enquiry was submitted.</p><table role="presentation" style="line-height:1.8"><tr><td><strong>Name:</strong></td><td>&nbsp;' . html($name) . '</td></tr><tr><td><strong>Email:</strong></td><td>&nbsp;<a href="mailto:' . html($email) . '">' . html($email) . '</a></td></tr><tr><td><strong>Phone:</strong></td><td>&nbsp;' . html($phone) . '</td></tr><tr><td><strong>Inquiry:</strong></td><td>&nbsp;' . html($interest) . '</td></tr><tr><td><strong>City / branch:</strong></td><td>&nbsp;' . html($city . ' / ' . $branch) . '</td></tr>' . ($product !== '' ? '<tr><td><strong>Product:</strong></td><td>&nbsp;' . html($product) . '</td></tr>' : '') . '</table><p><strong>Message</strong></p><p style="white-space:pre-wrap;line-height:1.7">' . nl2br(html($message)) . '</p>';
if (!smtpSend($smtp, $recipient, $email, 'Website inquiry | ' . $interest . ' | ' . $name, $summary, emailShell($smtp, 'New website inquiry', $details))) { error_log('Kanan contact: owner notification failed.'); respond(502, false, 'We could not send your inquiry. Please email or call our team directly.'); }
$ackText = "Dear {$name},\n\nThank you for contacting Kanan Services Limited. We have received your inquiry and will respond during our office hours.\n\n{$summary}\n";
$ackHtml = '<p>Dear ' . html($name) . ',</p><p>Thank you for contacting Kanan Services Limited. We have received your inquiry and will respond during our office hours.</p><p><strong>Your message</strong></p><p style="white-space:pre-wrap;line-height:1.7">' . nl2br(html($message)) . '</p>';
if (!smtpSend($smtp, $email, COMPANY_EMAIL, 'We received your inquiry | Kanan Services Limited', $ackText, emailShell($smtp, 'Thank you for contacting Kanan', $ackHtml))) { error_log('Kanan contact: visitor acknowledgement failed.'); respond(502, false, 'Your inquiry reached our team, but the confirmation email could not be sent. Please contact us directly if needed.'); }
respond(200, true, 'Thank you. Your inquiry has been sent and a confirmation email is on its way.');
