# Kanan product, image and SEO audit

Date: 2026-10-16

## Baseline

- Application: Next.js 16 App Router with local TypeScript product data.
- Catalogue at audit: 26 products: Scrap (3), Steel (10), Roofing (3), Cement (3), Plastic (7).
- Product routes: `/products/[slug]`; unknown slugs rendered the HMS product rather than a 404.
- No sitemap, robots route, per-product metadata, canonical URL, static product-route list, or product/breadcrumb structured data was present.
- The products page used an externally hosted hero image. Catalogue imagery reused generic assets for materially different products.
- Existing product detail content included unsupported availability, delivery, logistics, quality-control, distributor and resource-download claims. The contact route validates submissions, but delivery cannot be verified without its configured Resend environment variables.

## Lodhia strategy availability

Repository history, tracked branches, application files and accessible assets were searched. The only Lodhia-related asset is a partner logo (`public/images/partners/lodhia_industries_logo.*`). No Lodhia SEO strategy, keyword research, query mapping, recommended titles/descriptions, or approved content guidance was found. Consequently no keyword targets or search-volume claims are inferred. Technical SEO and unique, factual product metadata will be implemented; applying Lodhia-specific search targets remains blocked pending the strategy source.

## Official asset inventory supplied for this work

`/home/brianceasar/Downloads/kanan-products` contains 28 named source files, all explicitly associated by filename with the listed products. They map to the existing 26-product catalogue plus two identifiable roofing products: Wavestyle Roofing Sheets and Mountstyle Roofing Sheets. The mapping is one image per product. The supplied originals are primarily 1254px-square or approximately 1655×950 PNGs (about 1.9–3.7 MB each); steel Flat Bar and Angle Iron are smaller JPGs.

## Implementation mapping status

`data/products.ts` is the single mapping between each product and its optimised public asset. The retained source-image filenames are the mapping evidence; no asset identity is inferred beyond those filenames.

## Image optimisation result

- Processed: 28 supplied product images.
- Source total: 71,223,849 bytes (71.22 MB decimal).
- Optimised WebP total: 5,177,624 bytes (5.18 MB decimal).
- Reduction: 92.73%.
- Output: semantic paths under `public/images/products/{cement,scrap,steel,roofing,plastic}`; WebP quality 78, stripped metadata and a maximum 1400px edge.
- Visual check: a contact sheet covering all 28 output images was inspected. Every image has a direct filename-to-product match.
- Budget exceptions: five files exceed the preferred 250 KB catalogue-thumbnail budget; all are at or below 369 KB and remain within the 150–350 KB product-detail target except the 369 KB scrap-metal yard image, which was retained for visible detail. Next.js responsive image delivery additionally creates appropriately sized derivatives for rendered thumbnails.
