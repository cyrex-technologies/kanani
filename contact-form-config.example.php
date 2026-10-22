<?php
declare(strict_types=1);

// Copy outside public_html as /home/CPANEL_USER/kanan-contact-form-config.php and chmod 0600.
// Do not commit the copied file or put it in the document root.
return [
    'smtp_host' => 'mail.kanan.co.tz',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl', // ssl, tls, or none (only use encrypted transport in production)
    'smtp_username' => 'info@kanan.co.tz',
    'smtp_password' => 'REPLACE_WITH_MAILBOX_PASSWORD',
    'from_email' => 'info@kanan.co.tz',
    'from_name' => 'Kanan Services Limited Website',
    'recipient_email' => 'info@kanan.co.tz',
];
