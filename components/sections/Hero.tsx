import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/shared/icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[var(--kanan-brand-blue)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_75%_5%,rgba(255,255,255,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:170px_170px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            {/* <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              <FoundationIcon className="h-3.5 w-3.5" />
              kanan Services Limited
            </p> */}

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Reliable Trading Partner 
              <br />
              for Construction
              <br />
              &amp; Industrial Material in Tanzania
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100">
              We specialize in bulk sourcing and supply of construction and industrial materials, supporting contractors, developers, 
              and industrial clients with consistent availability, competitive pricing, and controlled operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn-theme-primary inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-bold"
              >
                Explore Products
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              {/* <Link
                href="/contact"
                className="btn-theme-blue inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-bold"
              >
                Request a Quote
                <ArrowRightIcon className="h-4 w-4" />
              </Link> */}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-[0_20px_55px_rgba(5,18,43,0.35)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1UOSNBIk4TnSSMwddbR92xfHyfrdnCLBar08u7GuBXN-4prYnH7YUhfpHgQBjLvZS_woZ91ADURqViJPFWHuRp0HBdLM3RyqUCMjMaxMeeuRIzUfJmLkgB9shxL1pnl3A3CkWBj3si9cWUcQIkAZEj7yn9-Sdn3Ry9wSBjbyjTKsw8LGUP3Z0I8tWyvarvo2zFwU2MUFj0ag8IKY628Fl6OtctDqsSCyytof-fxbmelEhqJXTshIwPcNetr7xoXaTfivXLVUU6-GH"
                  alt="Large-scale construction and material handling operations"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <article
              key={point.label}
              className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-sm"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white">
                <point.icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white">{point.label}</h3>
                <p className="mt-1 text-sm text-blue-100">{point.detail}</p>
              </div>
            </article>
          ))}
        </div> */}
      </div>
    </section>
  );
}
