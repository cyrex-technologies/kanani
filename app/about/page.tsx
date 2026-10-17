import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MilestonesSlider from "@/components/sections/MilestonesSlider";
import { DiamondIcon, TargetIcon, VisionIcon } from "@/components/shared/icons";
import {
  aboutMilestones,
  aboutPillars,
  aboutWhoWeAreImage,
  type AboutPillarIcon,
} from "@/data/about";

export const metadata: Metadata = {
  title: "About Us | Kanani Services Limited",
  description:
    "Learn how Kanan Services Limited supports construction and industrial projects in Tanzania through bulk sourcing, reliable supply, and controlled operations.",
};

const pillarIconMap: Record<AboutPillarIcon, ComponentType<{ className?: string }>> = {
  mission: TargetIcon,
  vision: VisionIcon,
  values: DiamondIcon,
};

const pillarAccentClass: Record<AboutPillarIcon, string> = {
  mission: "bg-[#ff5f68] text-[#06243d]",
  vision: "bg-[#f3bf57] text-[#06243d]",
  values: "bg-[#66c8e8] text-[#06243d]",
};

export default function AboutPage() {
  return (
    <main className="theme-shell min-h-screen">
      <Navbar />

      <section className="theme-section-brand relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_80%_5%,rgba(255,255,255,0.2),transparent_62%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
            About Kanan Services Limited
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Integrated Supply Solutions for Construction and Industry in Tanzania
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100">
            We specialize in bulk sourcing and supply of cement, steel, scrap, roofing, plastic,
            and industrial materials, supporting contractors, developers, and industrial clients
            with consistent availability, competitive pricing, and controlled operations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/products" className="btn-theme-primary rounded-full px-6 py-2.5 text-sm font-semibold">
              Explore Products
            </Link>
            {/* <Link href="/contact" className="btn-theme-blue rounded-full px-6 py-2.5 text-sm font-semibold">
              Contact Our Team
            </Link> */}
          </div>
        </div>
      </section>

      <section className="theme-section-main px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <article className="theme-panel rounded-2xl border border-[var(--kanan-line)] p-7 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--kanan-muted)]">Who We Are</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[var(--kanan-text)] sm:text-4xl">
              Built on structured procurement, strong supplier networks, and disciplined execution
            </h2>
            <blockquote className="mt-6 border-l-2 border-[var(--kanan-brand-blue)] pl-4">
              <p className="text-xl italic leading-8 text-[var(--kanan-text)]">
                Reliable supply starts with disciplined sourcing and ends with dependable delivery.
              </p>
              <p className="mt-2 text-xs tracking-wide text-[var(--kanan-muted)]">KANAN OPERATIONS TEAM</p>
            </blockquote>
            <p className="theme-muted mt-5 text-sm leading-7 sm:text-base">
              Kanan Services Limited is an integrated supply solutions company serving construction
              and industrial projects across Tanzania. We work with large-scale developers,
              independent contractors, and industrial buyers who depend on reliable access to
              essential materials.
            </p>
            <p className="theme-muted mt-4 text-sm leading-7 sm:text-base">
              Our operations are designed around structured procurement processes, dependable
              supplier relationships, and controlled execution that helps maintain uninterrupted
              material availability for projects of different sizes.
            </p>
            <p className="theme-muted mt-4 text-sm leading-7 sm:text-base">
              With growing logistics capability, we support smoother coordination from sourcing to
              delivery so clients can protect project timelines, improve operational efficiency, and
              build with confidence.
            </p>
            
          </article>

          <article className="theme-panel overflow-hidden rounded-2xl border border-[var(--kanan-line)] p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={aboutWhoWeAreImage}
                alt="Kanan Services Limited truck fleet in an industrial yard"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,22,45,0.5),transparent_55%)]" />
              <span className="absolute bottom-4 left-4 rounded-full bg-[rgba(6,22,45,0.72)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                Kanan Logistics Fleet
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[#06243d] px-4 py-8 text-white sm:px-8 sm:py-10">
          <div className="grid gap-6 md:grid-cols-3 md:gap-0">
            {aboutPillars.map((pillar) => {
              const Icon = pillarIconMap[pillar.icon];
              return (
                <article
                  key={pillar.title}
                  className="px-4 text-center md:px-8 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-white/30"
                >
                  <span
                    className={`mx-auto inline-flex h-22 w-22 items-center justify-center rounded-full ${pillarAccentClass[pillar.icon]}`}
                  >
                    <Icon className="h-11 w-11" />
                  </span>
                  <h3 className="mt-5 text-3xl font-black uppercase tracking-wide">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-blue-100">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="theme-section-main px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--kanan-muted)]">
              Our Journey
            </p>
          <h2 className="mt-4 text-3xl font-black text-[var(--kanan-text)] sm:text-5xl">
            Milestones That Shaped Us
          </h2>
          <p className="theme-muted mt-4 max-w-3xl text-sm leading-7 sm:text-base">
            Our growth reflects a steady expansion from trading and recycling roots into a more
            structured supply model for construction and industrial clients across Tanzania.
          </p>

          <div className="mt-10">
            <MilestonesSlider milestones={aboutMilestones} />
          </div>
        </div>
      </section>

      {/* <section className="theme-section-deep px-4 pb-16 sm:px-6 lg:px-8">
        <div className="theme-section-brand mx-auto max-w-7xl rounded-3xl border border-white/10 p-8 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
              Ready to source materials for your next project?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Talk to our team about supply requirements, bulk pricing, and delivery timelines.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <Link href="/contact" className="btn-theme-primary rounded-full px-6 py-2.5 text-sm font-semibold">
              Get a Quote
            </Link>
            <Link href="/products" className="btn-theme-blue rounded-full px-6 py-2.5 text-sm font-semibold">
              View Products
            </Link>
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}
