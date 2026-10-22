# Kanan cPanel deployment

This release is a static Next.js export with a same-origin PHP enquiry handler.
It does not require cPanel's Node.js application feature. The implementation is
adapted from the checked-in Vision Tea Brokers cPanel contact pattern:
`public/contact-handler.php`, private account-home SMTP configuration in
`kanan-contact-form-config.php`, form-url-
encoded requests, and SMTP with a controlled `From` plus visitor `Reply-To`.

## Build package

Run locally:

```bash
npm ci
npm run validate:products
npm run lint
npm run build
php -l public/contact-handler.php
```

The deployable static site is `out/`. Confirm that it contains `index.html`,
`contact/`, `products/`, `_next/`, `sitemap.xml`, `robots.txt`, and
`contact-handler.php`. Upload the *contents* of `out/`, not the `out` folder,
to the document root confirmed in cPanel for `kanan.co.tz`.

## Private mail configuration

Before uploading, create the real configuration on the hosting account:

```text
/home/CPANEL_USER/kanan-contact-form-config.php
```

Copy [`contact-form-config.example.php`](contact-form-config.example.php), replace
the placeholders with the Kanan mailbox details, and set its permission to
`0600`. It must be outside `public_html`; do not upload it with the site.

The SMTP account, `from_email`, and recipient must be Kanan-owned, authorised
addresses. Use SSL on port 465 or STARTTLS on the provider's documented port.
The endpoint verifies the TLS peer and does not put visitor input in `From`.

Confirm PHP 8+ and the OpenSSL/streams extensions are available. Use normal
cPanel permissions: directories `0755`, public files `0644`; do not make files
world-writable. Turn off PHP error display in production.

## Required verification before changing traffic

Keep the Vercel deployment active as rollback until all of these pass on the
cPanel hostname over HTTPS:

1. `GET /contact-handler.php` returns JSON `405`.
2. The homepage, contact page, legal pages, catalogue, all category pages and
   product pages render with assets and canonical URLs intact.
3. Submit one controlled general enquiry and one product-specific enquiry from
   a mailbox the team can inspect. Check the owner inbox and visitor inbox/spam
   folder; reply to the owner notice and confirm it addresses the visitor.
4. Confirm a malformed or fast submission fails, a fourth attempt within
   fifteen minutes receives `429`, and browser success appears only after a
   successful PHP response.
5. Confirm `generate_lead` fires once after a successful response, not after a
   validation, network, or PHP error.
6. Confirm `/sitemap.xml`, `/robots.txt`, canonical tags and HTTPS on the
   canonical domain.

`CONTACT_FORM_DRY_RUN=1` is permitted only for local development: it preserves
validation but bypasses SMTP and rate limits. Never set it in production.
An SMTP `250` is only server acceptance; actual mailbox receipt is required.

## Rollback

Do not change DNS or production routing as part of this repository release.
If the cPanel smoke tests fail after an approved switch, restore the prior
Vercel/DNS target, retain the cPanel files for diagnosis, and inspect cPanel PHP
and mail delivery logs. Never expose SMTP credentials in those logs or tickets.
