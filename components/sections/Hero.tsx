import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/shared/icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[var(--kanan-brand-blue)] text-white">
      <Image
        src="/images/hero/kanan-industrial-supply-facility-poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        poster="/images/hero/kanan-industrial-supply-facility-poster.webp"
        className="absolute inset-0 hidden h-full w-full object-cover lg:block motion-reduce:hidden"
      >
        <source src="/videos/hero/kanan-industrial-supply-facility.webm" type="video/webm" />
        <source src="/videos/hero/kanan-industrial-supply-facility.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,23,55,0.88)_0%,rgba(2,23,55,0.75)_46%,rgba(2,23,55,0.46)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:170px_170px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
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
              className="btn-theme-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
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
