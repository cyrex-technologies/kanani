#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
port="8094"
log_file="$(mktemp)"
cleanup() { kill "${server_pid:-}" 2>/dev/null || true; rm -f "$log_file"; }
trap cleanup EXIT

CONTACT_FORM_DRY_RUN=1 php -S "127.0.0.1:${port}" -t "$root_dir/public" >"$log_file" 2>&1 &
server_pid=$!
sleep 1

assert_status() {
  local expected="$1"; shift
  local actual
  actual="$(curl -sS -o /tmp/kanan-contact-response.json -w '%{http_code}' "$@")"
  test "$actual" = "$expected"
}

assert_status 405 "http://127.0.0.1:${port}/contact-handler.php"
assert_status 415 -X POST -H 'Content-Type: application/json' --data '{}' "http://127.0.0.1:${port}/contact-handler.php"
assert_status 403 -X POST -H 'Origin: https://untrusted.example' -H 'Content-Type: application/x-www-form-urlencoded' --data 'name=Jane' "http://127.0.0.1:${port}/contact-handler.php"
assert_status 413 -X POST -H 'Content-Type: application/x-www-form-urlencoded' --data "$(printf '%*s' 20001 '' | tr ' ' x)" "http://127.0.0.1:${port}/contact-handler.php"
assert_status 422 -X POST -H 'Content-Type: application/x-www-form-urlencoded' --data 'name=A' "http://127.0.0.1:${port}/contact-handler.php"
assert_status 422 -X POST -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'name=Jane Doe' --data-urlencode $'email=bad@example\r\nBcc:x@example.com' --data-urlencode 'phone=12345' --data-urlencode 'interest=General Inquiry' --data-urlencode 'city=Dar es Salaam' --data-urlencode 'preferred_branch=Mivumoni, Madale' --data-urlencode 'message=This is a sufficiently long test message.' --data-urlencode "started_at=$(( $(date +%s%3N) - 4000 ))" "http://127.0.0.1:${port}/contact-handler.php"
assert_status 200 -X POST -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'name=Jane Doe' --data-urlencode 'email=jane@example.com' --data-urlencode 'phone=+255 700 000 000' --data-urlencode 'interest=Request a Quote' --data-urlencode 'city=Dar es Salaam' --data-urlencode 'preferred_branch=Mivumoni, Madale' --data-urlencode 'product=Steel Bars' --data-urlencode 'message=Please provide a quotation for a planned project.' --data-urlencode "started_at=$(( $(date +%s%3N) - 4000 ))" "http://127.0.0.1:${port}/contact-handler.php"
grep -q '"ok":true' /tmp/kanan-contact-response.json
echo 'contact-handler tests passed (SMTP dry run)'
