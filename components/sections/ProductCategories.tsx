import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { productCategoryItems } from "@/data/productCategories";

export default function ProductCategories() {
  return (
    <section id="products" className="theme-section-deep px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-slate-500">Services</p>
          <div className="mt-2 h-[2px] w-28 bg-[var(--kanan-brand-red)] sm:w-40" />
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[var(--kanan-text)] sm:text-5xl">
            What can we offer
          </h2>
          <p className="theme-muted mt-4 text-base leading-8 sm:text-lg">
            Explore Kanan&apos;s construction and industrial supply categories, then find the right product for your project.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {productCategoryItems.map((item) => (
            <article
              key={item.key}
              className="theme-panel group overflow-hidden rounded-3xl border border-[var(--kanan-line)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(16,34,70,0.15)]"
            >
              <Link href={`/products/category/${item.key}`} className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--kanan-brand-blue)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,24,58,0.46),transparent_55%)]" />
                </div>
                <div className="flex min-h-[230px] flex-col p-6">
                  <h3 className="text-2xl font-bold text-[var(--kanan-text)]">{item.heroTitle}</h3>
                  <p className="theme-muted mt-3 text-sm leading-7">{item.description}</p>
                  <span className="btn-theme-blue mt-auto inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm font-semibold">
                    See more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
