import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/shared/icons";
import { partners } from "@/data/partners";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[var(--kanan-brand-blue)] text-white">
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
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,12,38,0.62)_0%,rgba(3,34,111,0.49)_42%,rgba(1,12,38,0.76)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:170px_170px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 pb-32 pt-28 text-center sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">Kanan Services Limited</p>
          <h1 className="mt-5 text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
            Reliable Trading Partner
            <br />
            for Construction
            <br />
            &amp; Industrial Material in Tanzania
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-50 sm:text-lg">
            We specialize in bulk sourcing and supply of construction and industrial materials, supporting contractors, developers,
            and industrial clients with consistent availability, competitive pricing, and controlled operations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="btn-theme-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
            >
              Explore Products
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--kanan-brand-blue)]">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-10 z-10 sm:bottom-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">Industry partners</span>
          <div className="flex items-center gap-7 sm:gap-10">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={`relative h-9 w-28 ${partner.id === "2" ? "sm:h-22 sm:w-44" : "sm:h-10 sm:w-36"}`}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="144px"
                  className="object-contain opacity-80 drop-shadow-[0_1px_5px_rgba(0,0,0,0.32)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
