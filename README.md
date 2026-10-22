## Kanan Services Limited

Marketing website for Kanan Services Limited built with Next.js App Router.

## Contact Form and cPanel

The site is a static export. The browser submits enquiries to the same-origin
PHP endpoint at `/contact-handler.php`; it uses authenticated SMTP configured
outside the document root. See [CPANEL_DEPLOY.md](CPANEL_DEPLOY.md) for the
required private configuration, upload layout, verification, and rollback steps.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Build for cPanel

```bash
npm run validate:products
npm run lint
npm run build
```

Upload the contents of `out/` (not the directory itself) to the confirmed cPanel
document root, then configure and test the PHP handler as documented above.
