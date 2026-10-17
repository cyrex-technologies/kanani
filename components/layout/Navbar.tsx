"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { productMenu } from "@/data/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <header className="theme-header sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Kanan home" className="inline-flex items-center">
          <Image
            src="/images/kanan-nav.png"
            alt="Kanan logo"
            width={1013}
            height={320}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-xs font-semibold md:flex">
          <Link href="/" className="transition hover:text-[var(--kanan-brand-gold-soft)]">
            Home
          </Link>
          <Link href="/about" className="transition hover:text-[var(--kanan-brand-gold-soft)]">
            About Us
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <Link
              href="/products"
              onFocus={() => setIsProductsOpen(true)}
              className={`rounded px-3 py-2 transition ${
                isProductsOpen
                  ? "bg-[var(--kanan-brand-red)] text-white"
                  : "hover:text-[var(--kanan-brand-gold-soft)]"
              }`}
            >
              Products
            </Link>
            {isProductsOpen ? (
              <div className="absolute left-1/2 top-full z-50 w-[min(95vw,1320px)] -translate-x-1/2 pt-3">
                <div className="rounded border border-slate-200 bg-white p-7 shadow-[0_22px_55px_rgba(16,34,70,0.18)]">
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
                    {productMenu.map((section) => (
                      <div key={section.title}>
                        <Link
                          href={section.href}
                          onClick={() => setIsProductsOpen(false)}
                          className="text-xl font-semibold text-[var(--kanan-brand-red)]"
                        >
                          {section.title}
                        </Link>
                        <ul className="mt-4 space-y-2.5">
                          {section.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={() => setIsProductsOpen(false)}
                                className="text-sm text-[var(--kanan-muted-strong)] transition hover:text-[var(--kanan-brand-blue)]"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/* <Link href="/#industries" className="transition hover:text-[var(--kanan-brand-gold-soft)]">
            Industries
          </Link> */}
          <Link href="/careers" className="transition hover:text-[var(--kanan-brand-gold-soft)]">
            Careers
          </Link>
          <Link href="/contact" className="transition hover:text-[var(--kanan-brand-gold-soft)]">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="btn-theme-primary hidden rounded-full px-4 py-2.5 text-xs font-semibold md:inline-flex"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--kanan-line)] bg-white text-[var(--kanan-brand-blue)] md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-[var(--kanan-line)] bg-white md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-[var(--kanan-text)]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-[var(--kanan-text)]"
            >
              About Us
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-[var(--kanan-text)]"
            >
              Products
            </Link>
            {/* <Link
              href="/#industries"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-[var(--kanan-text)]"
            >
              Industries
            </Link> */}
            <Link
              href="/careers"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-[var(--kanan-text)]"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-[var(--kanan-text)]"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="btn-theme-primary mt-2 inline-flex w-full justify-center rounded-full px-4 py-2.5 text-sm font-semibold"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
