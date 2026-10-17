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
    <section id="products" className="theme-section-deep flex min-h-[100svh] items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-[#d8deea] bg-white shadow-[0_12px_32px_rgba(16,34,70,0.1)] sm:rounded-[2.5rem]">
          <div className="grid grid-cols-[112px_1fr] lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[260px_1fr_1.35fr]">
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
                        className={`relative mx-2 block w-[calc(100%-1rem)] rounded-xl px-2 py-5 text-left text-sm transition sm:px-4 sm:text-base lg:mx-4 lg:w-[calc(100%-2rem)] lg:px-4 ${
                          isActive ? "bg-white/15 font-semibold" : "hover:bg-white/8"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div className="bg-[#f7f9fd] px-4 py-6 sm:px-6 sm:py-8 lg:col-start-2 lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-16">
              <p className="text-sm uppercase tracking-widest text-slate-500">Services</p>
              <div className="mt-2 h-[2px] w-28 bg-[var(--kanan-brand-red)] sm:w-40" />
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
                What can we offer
              </h2>

              <h3 className="mt-8 text-4xl font-medium text-slate-900 sm:mt-10 sm:text-5xl">
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
