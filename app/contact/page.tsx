import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ContactInquiryForm from "@/components/sections/ContactInquiryForm";
import {
  BuildingIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/shared/icons";
import { contactHighlights, contactLocations } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us | Kanan Services Limited",
  description:
    "Reach Kanan Services Limited through our main office in Mivumoni, Madale and our regional coverage in Dar es Salaam, Dodoma, Moshi, and Bagamoyo.",
};

const quickContacts = [
  {
    title: "Main Office",
    detail: "Mivumoni, Madale, Dar es Salaam",
    href: "https://www.google.com/maps/search/?api=1&query=Mivumoni+Madale+Dar+es+Salaam+Tanzania",
    cta: "Open Map",
    icon: MapPinIcon,
  },
  {
    title: "Call Our Team",
    detail: "+255 677 125 108",
    href: "tel:+255677125108",
    cta: "Call Now",
    icon: PhoneIcon,
  },
  {
    title: "Working Hours",
    detail: "Weekdays 08:00 - 17:00 | Weekend 09:00 - 12:00",
    href: "#contact-form",
    cta: "Send Inquiry",
    icon: ClockIcon,
  },
] as const;

export default function ContactPage() {

  return (
    <main className="theme-shell min-h-screen">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-[var(--kanan-brand-blue-strong)]">
        <Image
          src="/images/products/steel/steel_rebars.jpeg"
          alt="Industrial steel materials stacked for construction supply"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(3,34,111,0.95)_10%,rgba(3,34,111,0.82)_55%,rgba(3,34,111,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_10%,rgba(255,255,255,0.14),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--kanan-brand-gold-soft)]">
              Contact Us
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Talk to Kanan about supply, delivery, and project support
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.82] sm:text-lg">
              We support clients from our main office in Mivumoni, Madale and through regional
              coverage in Dar es Salaam, Dodoma, Moshi, and Bagamoyo. Reach out for quotations,
              stock planning, and delivery coordination.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span>Home</span>
              <span className="text-white/[0.35]">/</span>
              <span className="text-[var(--kanan-brand-gold-soft)]">Contact Us</span>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {quickContacts.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-sm"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[var(--kanan-brand-gold-soft)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-bold text-white">{item.title}</h2>
                  <p className="mt-2 min-h-[3rem] text-sm leading-6 text-white/[0.74]">
                    {item.detail}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex text-sm font-semibold text-[var(--kanan-brand-gold-soft)] transition hover:text-white"
                  >
                    {item.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--kanan-brand-blue)]">
              Our Locations
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Branch locations by city
            </h2>
            <p className="theme-muted mt-4 text-sm leading-7 sm:text-base">
              Each city can have more than one branch. For now, the cards list sample locations
              that can be added to, removed, or updated as the exact branch network changes.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactHighlights.map((item) => (
              <article
                key={item.label}
                className="theme-panel rounded-[1.75rem] border border-[var(--kanan-line)] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--kanan-brand-blue)]">
                  {item.label}
                </p>
                <p className="mt-4 text-2xl font-black leading-tight">{item.value}</p>
                <p className="theme-muted mt-2 text-sm leading-6">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {contactLocations.map((location) => (
              <article
                key={location.city}
                className="theme-panel overflow-hidden rounded-[2rem] border border-[var(--kanan-line)]"
              >
                <div className="relative aspect-[5/4]">
                  <Image
                    src={location.image}
                    alt={`${location.city} service coverage`}
                    fill
                    sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 40vw, (min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,17,31,0.75),transparent_55%)]" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/[0.88] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--kanan-brand-blue)]">
                      {location.city}
                    </span>
                    {location.isHeadOffice ? (
                      <span className="rounded-full bg-[var(--kanan-brand-red)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                        Head Office
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black leading-tight">{location.title}</h3>
                  <p className="theme-muted mt-3 text-sm leading-7">{location.intro}</p>

                  <div className="mt-5 rounded-2xl bg-[var(--kanan-bg-soft)] px-4 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--kanan-brand-blue)]">
                      Exact Locations
                    </p>
                    <ul className="mt-3 space-y-3">
                      {location.branches.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--kanan-text)]">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--kanan-brand-gold-soft)]" />
                        <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={location.mapHref}
                    className="btn-theme-outline mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    View on Google Maps
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[var(--kanan-brand-blue-strong)] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--kanan-brand-gold-soft)]">
                Contact Kanan
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
                For supply requests, quotations, and branch direction
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.76] sm:text-base">
                Send your details and our team will direct the inquiry to the right office or
                service point. Submissions are delivered directly to the team handling website
                inquiries for faster routing and follow-up.
              </p>

              <div className="mt-8">
                <Suspense fallback={null}>
                  <ContactInquiryForm />
                </Suspense>
              </div>
            </div>

            <aside className="space-y-4">
              <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[var(--kanan-brand-gold-soft)]">
                  <BuildingIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">Head Office</h3>
                <p className="mt-3 text-sm leading-7 text-white/[0.76]">
                  Mivumoni, Madale, Dar es Salaam. This is the primary coordination point for
                  quotations, order planning, and delivery support.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[var(--kanan-brand-gold-soft)]">
                  <ClockIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">Working Hours</h3>
                <div className="mt-4 space-y-3 text-sm text-white/[0.76]">
                  <p className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span>Weekdays</span>
                    <strong className="font-semibold text-white">08:00 - 17:00</strong>
                  </p>
                  <p className="flex items-center justify-between gap-4">
                    <span>Weekend half day</span>
                    <strong className="font-semibold text-white">09:00 - 12:00</strong>
                  </p>
                </div>
              </article>

              <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[var(--kanan-brand-gold-soft)]">
                  <PhoneIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">Direct Support</h3>
                <p className="mt-3 text-sm leading-7 text-white/[0.76]">
                  Need immediate help? Call the main office and we will route you to the right city
                  team or service point.
                </p>
                <Link
                  href="tel:+255677125108"
                  className="btn-theme-primary mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  +255 677 125 108
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
