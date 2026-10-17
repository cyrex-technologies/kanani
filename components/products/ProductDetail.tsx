import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductGrid from "@/components/products/ProductGrid";
import { categoryLabels, type ProductDetailEntry } from "@/data/products";

type ProductDetailProps = { product: ProductDetailEntry };

export default function ProductDetail({ product }: ProductDetailProps) {
  const contactHref = `/contact?product=${encodeURIComponent(product.name)}`;

  return (
    <main className="theme-shell min-h-screen">
      <Navbar />
      <section className="border-b border-[var(--kanan-line)] bg-white px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm text-[var(--kanan-muted)]" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-[var(--kanan-brand-blue)]">Products</Link><span aria-hidden="true">/</span>
          <Link href={`/products/category/${product.category}`} className="hover:text-[var(--kanan-brand-blue)]">{categoryLabels[product.category]}</Link><span aria-hidden="true">/</span>
          <span className="font-semibold text-[var(--kanan-brand-blue)]" aria-current="page">{product.name}</span>
        </nav>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--kanan-line)] bg-slate-100 shadow-[var(--kanan-shadow-soft)]">
              <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded bg-[var(--kanan-brand-red)] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">{categoryLabels[product.category]}</span>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--kanan-brand-blue)]">Kanan product catalogue</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--kanan-text)] sm:text-5xl">{product.name}</h1>
            <p className="theme-muted mt-5 text-lg leading-relaxed">{product.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={contactHref} className="btn-theme-blue inline-flex rounded-full px-6 py-3 text-sm font-bold">Request product information</Link>
              <Link href={`/products/category/${product.category}`} className="btn-theme-outline inline-flex rounded-full px-6 py-3 text-sm font-bold">Browse {categoryLabels[product.category]}</Link>
            </div>
            <p className="mt-5 text-sm leading-6 text-[var(--kanan-muted)]">Use the enquiry form to confirm current product details and request a quotation for {product.name}.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--kanan-line)] bg-[var(--kanan-bg-soft)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Product overview" title={`Understanding ${product.name}`} />
          <p className="theme-muted mt-5 max-w-4xl text-base leading-8 sm:text-lg">{product.overview}</p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <section>
            <SectionHeading eyebrow="Applications" title="Relevant uses and enquiries" />
            <ul className="mt-6 space-y-3">
              {product.applications.map((application) => <li key={application} className="flex gap-3 rounded-xl border border-[var(--kanan-line)] bg-white p-4 text-[var(--kanan-muted-strong)]"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--kanan-brand-red)]" />{application}</li>)}
            </ul>
          </section>
          <section>
            <SectionHeading eyebrow="Key considerations" title="What to confirm" />
            <ul className="mt-6 space-y-3">
              {product.characteristics.map((characteristic) => <li key={characteristic} className="flex gap-3 rounded-xl border border-[var(--kanan-line)] bg-white p-4 text-[var(--kanan-muted-strong)]"><span className="mt-0.5 text-lg font-black text-[var(--kanan-brand-blue)]">✓</span>{characteristic}</li>)}
            </ul>
          </section>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[var(--kanan-line)] bg-white p-6 sm:p-8">
            <SectionHeading eyebrow="Selection guidance" title="Prepare your enquiry" />
            <p className="theme-muted mt-5 leading-8">{product.selectionGuidance}</p>
          </section>
          <section className="rounded-2xl bg-[var(--kanan-brand-blue-strong)] p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--kanan-brand-gold-soft)]">Product specifications</p>
            <h2 className="mt-3 text-2xl font-black">Information to request</h2>
            <p className="mt-5 leading-8 text-blue-100">{product.technicalInformation}</p>
            <Link href={contactHref} className="btn-theme-primary mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-bold">Ask for product details</Link>
          </section>
        </div>
      </section>

      <section className="border-y border-[var(--kanan-line)] bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-[var(--kanan-line)] bg-[var(--kanan-bg-soft)] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--kanan-brand-blue)]">Source through Kanan</p><h2 className="mt-2 text-2xl font-black text-[var(--kanan-text)]">Discuss {product.name} with the Kanan team</h2><p className="theme-muted mt-3 max-w-2xl leading-7">Share the product details your project requires. Kanan can route your enquiry for current product information and a quotation.</p></div>
          <Link href={contactHref} className="btn-theme-blue mt-6 inline-flex shrink-0 rounded-full px-6 py-3 text-sm font-bold sm:mt-0">Enquire about this product</Link>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><ProductGrid title={`Related ${categoryLabels[product.category].toLowerCase()}`} products={product.relatedProducts} /></div></section>
      <Footer />
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <><p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--kanan-brand-blue)]">{eyebrow}</p><h2 className="mt-2 text-3xl font-black tracking-tight text-[var(--kanan-text)]">{title}</h2></>;
}
