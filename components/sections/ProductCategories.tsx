"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { productCategoryItems } from "@/data/productCategories";

export default function ProductCategories() {
  const [activeKey, setActiveKey] = useState(productCategoryItems[0].key);

  const activeItem = useMemo(
    () => productCategoryItems.find((item) => item.key === activeKey) ?? productCategoryItems[0],
    [activeKey],
  );

  return (
    <section id="products" className="theme-section-deep py-0">
      <div className="w-full">
        <div className="overflow-hidden border-y border-[#d8deea] bg-white">
          <div className="grid grid-cols-[112px_1fr] lg:grid-cols-[260px_1fr_1.35fr]">
            <aside className="row-span-2 bg-[var(--kanan-brand-red)] py-6 text-white lg:row-span-1 lg:py-12">
              <ul>
                {productCategoryItems.map((item) => {
                  const isActive = item.key === activeItem.key;

                  return (
                    <li key={item.key}>
                      <Link
                        href={`/products/category/${item.key}`}
                        onMouseEnter={() => setActiveKey(item.key)}
                        onFocus={() => setActiveKey(item.key)}
                        className={`relative block w-full px-2 py-5 text-left text-sm transition sm:px-4 sm:text-base lg:px-8 ${
                          isActive ? "bg-white/10 font-semibold" : "hover:bg-white/8"
                        }`}
                      >
                        {item.title}
                        {isActive ? (
                          <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rotate-45 bg-[var(--kanan-brand-red)]" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div className="bg-[#f5f6f8] px-4 py-6 sm:px-6 sm:py-8 lg:col-start-2 lg:px-12 lg:py-16">
              <p className="text-sm uppercase tracking-widest text-slate-500">Services</p>
              <div className="mt-2 h-[2px] w-28 bg-[var(--kanan-brand-red)] sm:w-40" />
              <h2 className="mt-4 text-5xl font-bold tracking-tight text-slate-800 sm:text-6xl">
                What can we offer
              </h2>

              <h3 className="mt-8 text-5xl font-medium text-slate-900 sm:mt-10 sm:text-6xl">
                {activeItem.heroTitle}
              </h3>
              <p className="mt-4 max-w-xl text-xl leading-relaxed text-slate-600 sm:text-2xl">
                {activeItem.description}
              </p>

              <Link
                href={`/products/category/${activeItem.key}`}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-(--kanan-brand-blue) px-8 py-3 text-base font-medium text-white transition hover:brightness-110 sm:mt-10 sm:px-12 sm:py-4 sm:text-lg"
              >
                Browse {activeItem.title}
              </Link>
            </div>

            <div className="relative min-h-[180px] sm:min-h-[240px] lg:col-start-3 lg:row-start-1 lg:min-h-[320px]">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
