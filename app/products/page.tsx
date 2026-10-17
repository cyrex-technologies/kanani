import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { categories } from "@/data/categories";
import { categoryLabels, isProductCategory, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Kanan Services Ltd. steel, roofing, cement, scrap and plastic products.",
  alternates: { canonical: "/products" },
};

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const heroImage = "/images/products/steel/tmt-b500-steel-bars.webp";
  const { category: categoryParam, q } = await searchParams;
  const selectedCategory = categoryParam && isProductCategory(categoryParam) ? categoryParam : "all";
  const query = q?.trim() ?? "";
  const queryLower = query.toLowerCase();

  const categoryItems = [
    {
      id: "all",
      title: "All Products",
      description: "Browse every category in one place.",
      count: products.length,
    },
    ...categories.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      count: products.filter((product) => product.category === item.id).length,
    })),
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const searchSource = `${product.name} ${product.description} ${product.summary} ${product.useCases.join(" ")}`.toLowerCase();
    const searchMatch = queryLower.length === 0 || searchSource.includes(queryLower);
    return categoryMatch && searchMatch;
  });

  const categoryTitle = selectedCategory === "all" ? "All Products" : categoryLabels[selectedCategory];

  return (
    <main className="theme-shell min-h-screen">
      <Navbar />

      <section className="relative h-[36vh] min-h-[250px] overflow-hidden sm:h-[42vh]">
        <Image
          src={heroImage}
          alt="Bundled TMT B500 steel bars"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(7,22,52,0.55)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[rgba(7,22,52,0.82)] to-transparent" />
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-end px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">Kanani Services</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our Products
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Browse steel, roofing, cement, scrap and plastic products, then filter by category.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--kanan-line)] bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-sm text-[var(--kanan-muted-strong)]">
          <span className="font-semibold text-[var(--kanan-text)]">Position:</span> Home &gt;
          Products
          {selectedCategory !== "all" ? (
            <span>
              {" "}
              &gt;{" "}
              <span className="font-semibold text-[var(--kanan-brand-blue)]">
                {categoryLabels[selectedCategory]}
              </span>
            </span>
          ) : null}
        </div>
      </section>

      <section className="theme-section-deep border-b border-[var(--kanan-line)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black tracking-tight text-[var(--kanan-text)] sm:text-5xl">
            Product Catalog
          </h2>
          <p className="theme-muted mt-4 max-w-3xl text-base leading-7 sm:text-lg">
            Filter products by category and open a product page for its image, overview and contact route.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {categoryItems.map((item) => {
              const href = item.id === "all" ? "/products" : `/products/category/${item.id}`;
              const isActive = selectedCategory === item.id;

              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-[var(--kanan-brand-blue)] bg-[var(--kanan-brand-blue)] text-white shadow-[0_8px_20px_rgba(1,72,187,0.18)]"
                      : "border-[var(--kanan-line)] bg-white text-[var(--kanan-text)] hover:border-[var(--kanan-brand-red-soft)] hover:text-[var(--kanan-brand-red)]"
                  }`}
                >
                  {item.title} ({item.count})
                </Link>
              );
            })}
          </div>

          <form action="/products" className="mt-6 flex max-w-xl items-center gap-3">
            {selectedCategory !== "all" ? (
              <input type="hidden" name="category" value={selectedCategory} />
            ) : null}
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search products, specs, keywords..."
              className="h-11 w-full rounded-full border border-[var(--kanan-line)] bg-white px-4 text-sm text-[var(--kanan-text)] placeholder:text-[var(--kanan-muted)] focus:border-[var(--kanan-brand-blue)] focus:outline-none"
            />
            <button type="submit" className="btn-theme-primary rounded-full px-6 py-2.5 text-sm font-semibold">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold text-[var(--kanan-text)]">{categoryTitle}</h2>
              <p className="theme-muted mt-1 text-sm">
                Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
                {query ? ` for "${query}"` : ""}.
              </p>
            </div>
            <Link href="/" className="btn-theme-outline rounded-full px-5 py-2.5 text-sm font-semibold">
              Back to Home
            </Link>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="theme-panel rounded-2xl border border-[var(--kanan-line)] p-8 text-center">
              <h3 className="text-xl font-bold text-[var(--kanan-text)]">No products found</h3>
              <p className="theme-muted mt-2">
                Try another keyword or clear the filter to view all listed products.
              </p>
              <Link
                href="/products"
                className="btn-theme-primary mt-5 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                Clear Filter
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.slug}
                  className="theme-panel overflow-hidden rounded-2xl border border-[var(--kanan-line)]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="badge-theme rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                      {categoryLabels[product.category]}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-[var(--kanan-text)]">{product.name}</h3>
                    <p className="theme-muted mt-2 text-sm leading-6">{product.description}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--kanan-brand-blue)]">
                      {categoryLabels[product.category]}
                    </p>
                    <Link
                      href={`/products/${product.slug}`}
                      className="btn-theme-blue mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
                    >
                      View Product Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
