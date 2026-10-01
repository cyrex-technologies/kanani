import Image from "next/image";
import Link from "next/link";

import { MailIcon, PhoneIcon, MapPinIcon as PinIcon, SocialDot } from "@/components/shared/icons";

export default function Footer() {
  return (
    <footer className="theme-section-brand relative mt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -top-12 z-10 rounded-[2.5rem] border border-white/10 bg-[var(--kanan-brand-blue-strong)] px-6 py-8 shadow-[0_18px_40px_rgba(4,20,43,0.32)] md:px-10">
          <div className="grid gap-6 md:grid-cols-3 md:gap-4">
            <div className="flex items-center gap-4 border-white/10 md:border-r md:pr-8">
              <PinIcon className="h-11 w-11 text-white/90" />
              <div>
                <p className="text-xl font-bold leading-tight">Location:</p>
                <p className="mt-2 text-base text-white/80">Mivumoni, Dar es Salaam Tanzania</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-white/10 md:border-r md:px-8">
              <MailIcon className="h-11 w-11 text-white/90" />
              <div>
                <p className="text-xl font-bold leading-tight">Email:</p>
                <Link
                  href="mailto:info@kanan.co.tz"
                  className="mt-2 inline-block text-base text-white/80 transition hover:text-white"
                >
                  info@kanan.co.tz
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 md:pl-8">
              <PhoneIcon className="h-11 w-11 text-white/90" />
              <div>
                <p className="text-xl font-bold leading-tight">Phone:</p>
                <p className="mt-2 text-base text-white/80">+255 745 120 612</p>
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-2 grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-white/10 pb-8 md:border-0 md:pr-8 lg:border-r lg:pb-0">
            <Link href="/" aria-label="Kanan home" className="inline-flex items-center">
              <Image
                src="/images/kanan-nav.png"
                alt="Kanan logo"
                width={1013}
                height={320}
                className="h-16 w-auto object-contain sm:h-20"
              />
            </Link>
            <p className="mt-6 text-base leading-8 text-white/80">
              Reliable industrial supply partner for construction and infrastructure projects across
              East Africa.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <SocialDot label="f" />
              <SocialDot label="t" />
              <SocialDot label="in" />
              <SocialDot label="p" />
              <SocialDot label="v" />
            </div>
          </div>

          <div>
            <p className="text-3xl font-semibold">Navigation</p>
            <ul className="mt-8 space-y-4 text-base text-white/80">
              <li>- About us</li>
              <li>- Contact us</li>
              <li>- Product Catalog</li>
              <li>- Recent Post</li>
            </ul>
          </div>

          <div>
            <p className="text-3xl font-semibold">All Services</p>
            <ul className="mt-8 space-y-4 text-base text-white/80">
              <li>- Scrap Materials</li>
              <li>- Steel Products</li>
              <li>- Cement Supply</li>
              <li>- Roofing Materials</li>
              <li>- Plastic Products</li>
            </ul>
          </div>

          {/* <div>
            <p className="text-3xl font-semibold">Newsletter</p>
            <p className="mt-8 text-base leading-8 text-white/80">
              Subscribe for stock updates, price alerts, and project supply insights from kanan
              Services.
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 rounded-lg border border-white/12 bg-white/10 px-5 py-4">
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full bg-transparent text-base text-white placeholder:text-white/65 focus:outline-none"
              />
              <button type="button" aria-label="Send newsletter request" className="text-white/80">
                <MailIcon className="h-8 w-8" />
              </button>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright © <span className="text-[var(--kanan-brand-red-soft)]">2026</span> | All
            Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#">Term and Service</a>
            <span className="text-[var(--kanan-brand-red-soft)]">||</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
