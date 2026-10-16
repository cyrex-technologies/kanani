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

`/home/brianceasar/Downloads/kanan-products` contains 30 named source files, all explicitly associated by filename with the listed products. Twenty-eight map to the existing 26-product catalogue plus two identifiable roofing products: Wavestyle Roofing Sheets and Mountstyle Roofing Sheets. The remaining product mapping is one image per product. The supplied originals are primarily 1254px-square or approximately 1655×950 PNGs (about 1.9–3.7 MB each); steel Flat Bar and Angle Iron are smaller JPGs.

## Implementation mapping status

The catalogue data source will be the single mapping between each product, its official source filename and its optimised public asset. Image size measurements, output paths and exceptions will be added after optimisation. No asset identity is inferred beyond the supplied filename.
