import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductGrid from "@/components/products/ProductGrid";
import { categoryLabels, type ProductDetailEntry } from "@/data/products";

type ProductDetailProps = { product: ProductDetailEntry };

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <main className="theme-shell min-h-screen">
      <Navbar />
      <section className="border-b border-[var(--kanan-line)] bg-white px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 text-sm text-[var(--kanan-muted)]" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-[var(--kanan-brand-blue)]">Products</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/products/category/${product.category}`} className="hover:text-[var(--kanan-brand-blue)]">{categoryLabels[product.category]}</Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[var(--kanan-brand-blue)]" aria-current="page">{product.name}</span>
        </nav>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--kanan-line)] bg-slate-100 shadow-[var(--kanan-shadow-soft)]">
              <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded bg-[var(--kanan-brand-red)] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">{categoryLabels[product.category]}</span>
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-[var(--kanan-text)] sm:text-5xl">{product.name}</h1>
            <p className="theme-muted mt-4 max-w-3xl text-lg leading-relaxed">{product.description}</p>
            <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-theme-blue mt-6 inline-flex rounded-full px-6 py-3 text-sm font-bold">Request pricing or availability</Link>

            <div className="mt-10 space-y-10 border-t border-[var(--kanan-line)] pt-10">
              <section>
                <h2 className="text-3xl font-bold text-[var(--kanan-text)]">Product overview</h2>
                <p className="theme-muted mt-4 leading-relaxed">{product.summary}</p>
              </section>
              {product.useCases.length > 0 ? <section>
                <h2 className="text-3xl font-bold text-[var(--kanan-text)]">Relevant uses</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {product.useCases.map((useCase) => <li key={useCase} className="rounded-full border border-[var(--kanan-line)] bg-white px-4 py-2 text-sm text-[var(--kanan-muted-strong)]">{useCase}</li>)}
                </ul>
              </section> : null}
              <section className="rounded-xl border border-[var(--kanan-line)] bg-white p-6">
                <h2 className="text-xl font-bold text-[var(--kanan-text)]">Need technical specifications?</h2>
                <p className="theme-muted mt-2">Contact Kanan Services Ltd. to confirm the specifications relevant to your project.</p>
              </section>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="theme-section-brand rounded-2xl p-7 shadow-[var(--kanan-shadow-soft)]">
              <h2 className="text-3xl font-black leading-tight text-white">Discuss your project</h2>
              <p className="mt-4 text-sm leading-relaxed text-blue-100">Use the contact form to request current product information, pricing, or availability.</p>
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-theme-primary mt-5 inline-flex w-full justify-center rounded-lg px-6 py-3 text-sm font-bold">Contact Kanan</Link>
            </div>
          </aside>
        </div>
        <div className="mx-auto max-w-7xl"><ProductGrid products={product.relatedProducts} /></div>
      </section>
      <Footer />
    </main>
  );
}
