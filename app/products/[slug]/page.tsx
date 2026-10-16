import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/products/ProductDetail";
import { getProductDetailBySlug, getProductBySlug, products } from "@/data/products";

type ProductDetailPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} | Kanan Services Ltd.`, description: product.description, images: [{ url: product.image, alt: product.imageAlt }] },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductDetailBySlug(slug);
  if (!product) notFound();

  const pageUrl = `https://kanan.co.tz/products/${product.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `https://kanan.co.tz${product.image}`,
      url: pageUrl,
      category: product.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Products", item: "https://kanan.co.tz/products" },
        { "@type": "ListItem", position: 2, name: product.name, item: pageUrl },
      ],
    },
  ];

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ProductDetail product={product} /></>;
}
