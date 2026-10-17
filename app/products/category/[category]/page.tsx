import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductGrid from "@/components/products/ProductGrid";
import { categories, getCategoryById } from "@/data/categories";
import { categoryLabels, isProductCategory, products } from "@/data/products";

type CategoryPageProps = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map(({ id }) => ({ category: id }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const entry = getCategoryById(category);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/products/category/${entry.id}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isProductCategory(category)) notFound();
  const entry = getCategoryById(category);
  const categoryProducts = products.filter((product) => product.category === category);
  if (!entry || categoryProducts.length === 0) notFound();

  const relatedCategories = categories.filter(({ id }) => entry.relatedCategoryIds.includes(id));
  const categoryUrl = `https://kanan.co.tz/products/category/${entry.id}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: "https://kanan.co.tz/products" },
      { "@type": "ListItem", position: 2, name: entry.title, item: categoryUrl },
    ],
  };

  return (
    <main className="theme-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <section className="relative isolate overflow-hidden bg-[var(--kanan-brand-blue-strong)] px-4 py-16 sm:px-6 lg:px-8">
        <Image src={categoryProducts[0].image} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="text-sm text-white/80" aria-label="Breadcrumb"><Link href="/products" className="hover:text-white">Products</Link> <span aria-hidden="true">/</span> <span aria-current="page">{entry.title}</span></nav>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">{entry.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">{entry.summary}</p>
          <Link href="/contact" className="btn-theme-primary mt-7 inline-flex rounded-full px-6 py-3 text-sm font-bold">Ask about {entry.title}</Link>
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--kanan-brand-blue)]">Product range</p><h2 className="mt-2 text-3xl font-black text-[var(--kanan-text)]">{categoryProducts.length} listed products</h2></div>
            <Link href="/products" className="btn-theme-outline rounded-full px-5 py-2.5 text-sm font-semibold">View all products</Link>
          </div>
          <ProductGrid title={`${entry.title} products`} products={categoryProducts.map((product) => ({ slug: product.slug, title: product.name, subtitle: product.description, image: product.image, imageAlt: product.imageAlt }))} />
          {relatedCategories.length > 0 ? <section className="mt-16 border-t border-[var(--kanan-line)] pt-10"><h2 className="text-2xl font-bold text-[var(--kanan-text)]">Related categories</h2><div className="mt-5 flex flex-wrap gap-3">{relatedCategories.map((related) => <Link key={related.id} href={`/products/category/${related.id}`} className="btn-theme-outline rounded-full px-5 py-2.5 text-sm font-semibold">{categoryLabels[related.id]}</Link>)}</div></section> : null}
        </div>
      </section>
      <Footer />
    </main>
  );
}
