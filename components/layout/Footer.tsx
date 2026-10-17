import { ArrowUpRight, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Products", "/products"],
  ["Careers", "/careers"],
  ["Contact Us", "/contact"],
] as const;

const categoryLinks = [
  ["Scrap Materials", "/products/category/scrap"],
  ["Steel Products", "/products/category/steel"],
  ["Roofing Materials", "/products/category/roofing"],
  ["Cement Supply", "/products/category/cement"],
  ["Plastic Products", "/products/category/plastic"],
] as const;

const footerLinkClass = "group inline-flex items-center gap-2 rounded py-1 text-sm text-white/75 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Footer() {
  return (
    <footer className="theme-section-brand mt-28 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative -top-10 mb-[-2.5rem] rounded-3xl border border-white/15 bg-[var(--kanan-brand-blue-strong)] px-6 py-7 shadow-[0_18px_40px_rgba(4,20,43,0.32)] sm:px-8 lg:px-10" aria-label="Contact Kanan">
          <div className="grid gap-6 md:grid-cols-3 md:gap-0">
            <a href="https://www.google.com/maps/search/?api=1&query=Mivumoni+Madale+Dar+es+Salaam+Tanzania" target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-lg transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:border-r md:border-white/15 md:pr-7">
              <MapPin className="mt-0.5 h-7 w-7 shrink-0 text-[var(--kanan-brand-gold-soft)]" aria-hidden="true" />
              <span><span className="block text-sm font-bold uppercase tracking-[0.16em] text-white/70">Location</span><span className="mt-1 block font-semibold">Mivumoni, Dar es Salaam, Tanzania</span></span>
            </a>
            <a href="mailto:info@kanan.co.tz" className="flex items-start gap-4 rounded-lg transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:border-r md:border-white/15 md:px-7">
              <Mail className="mt-0.5 h-7 w-7 shrink-0 text-[var(--kanan-brand-gold-soft)]" aria-hidden="true" />
              <span><span className="block text-sm font-bold uppercase tracking-[0.16em] text-white/70">Email</span><span className="mt-1 block font-semibold">info@kanan.co.tz</span></span>
            </a>
            <a href="tel:+255677125108" className="flex items-start gap-4 rounded-lg transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:pl-7">
              <Phone className="mt-0.5 h-7 w-7 shrink-0 text-[var(--kanan-brand-gold-soft)]" aria-hidden="true" />
              <span><span className="block text-sm font-bold uppercase tracking-[0.16em] text-white/70">Phone</span><span className="mt-1 block font-semibold">+255 677 125 108</span></span>
            </a>
          </div>
        </section>

        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.15fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Kanan home" className="inline-flex rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <Image src="/images/kanan-nav.png" alt="Kanan Services Limited" width={1013} height={320} className="h-16 w-auto object-contain" />
            </Link>
            <p className="mt-5 text-sm leading-7 text-white/75">Kanan Services Limited provides product information and enquiry support for industrial, construction, roofing, cement and plastic product requirements.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded text-sm font-semibold text-[var(--kanan-brand-gold-soft)] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Contact Kanan <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>

          <FooterColumn title="Navigation" links={navigationLinks} />
          <FooterColumn title="Product categories" links={categoryLinks} />

          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.14em] text-white">Contact</h2>
            <address className="mt-5 not-italic">
              <a href="https://www.google.com/maps/search/?api=1&query=Mivumoni+Madale+Dar+es+Salaam+Tanzania" target="_blank" rel="noreferrer" className={footerLinkClass}><MapPin className="h-4 w-4 shrink-0 text-[var(--kanan-brand-gold-soft)]" aria-hidden="true" /><span>Mivumoni, Dar es Salaam, Tanzania</span></a>
              <a href="mailto:info@kanan.co.tz" className={footerLinkClass}><Mail className="h-4 w-4 shrink-0 text-[var(--kanan-brand-gold-soft)]" aria-hidden="true" /><span>info@kanan.co.tz</span></a>
              <a href="tel:+255677125108" className={footerLinkClass}><Phone className="h-4 w-4 shrink-0 text-[var(--kanan-brand-gold-soft)]" aria-hidden="true" /><span>+255 677 125 108</span></a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-7 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 Kanan Services Limited. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/terms" className="rounded transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Terms of Service</Link>
            <Link href="/privacy-policy" className="rounded transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Privacy Policy</Link>
            <a href="https://cyrex.co.tz/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Powered by Cyrex Technologies <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return <div><h2 className="text-base font-bold uppercase tracking-[0.14em] text-white">{title}</h2><ul className="mt-5 space-y-2">{links.map(([label, href]) => <li key={href}><Link href={href} className={footerLinkClass}><ChevronRight className="h-3.5 w-3.5 text-[var(--kanan-brand-gold-soft)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />{label}</Link></li>)}</ul></div>;
}
