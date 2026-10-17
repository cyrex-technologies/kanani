import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="theme-section-main py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <Image
            src="/images/about/kanan-services-headquarters.webp"
            alt="Kanan Services Limited headquarters building"
            width={1145}
            height={1374}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="theme-border h-full max-h-[560px] w-full rounded-[2rem] border object-cover object-center"
          />
          <div className="absolute -bottom-5 right-0 rounded-2xl bg-[var(--kanan-brand-blue)] px-7 py-5 shadow-lg shadow-black/20 sm:right-5">
            <p className="text-3xl font-black text-white">14+</p>
            <p className="text-xs text-slate-200">Years of Experience</p>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-slate-500">Who We Are</p>
          <div className="mt-2 h-[2px] w-28 bg-[var(--kanan-brand-red)] sm:w-40" />
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            Professional Supply Solutions for Large-Scale Projects
          </h2>
          <p className="theme-muted mt-6 max-w-xl">
            Kanan Services Limited is a “Integrated Supply Solutions Company” specializing in the sourcing 
            and supply of construction and industrial materials across Tanzania. We serve both large-scale developers 
            and independent contractors with a focus on reliability, consistency, and long-term partnerships.
          </p>
          <p className="theme-muted mt-4 max-w-xl">
            Our operations are built on structured procurement processes, strong supplier networks, and disciplined execution 
            to ensure uninterrupted material availability for projects of all sizes.
          </p>

          <p className="theme-muted mt-4 max-w-xl">
            Along with our growing logistics capability, we support efficient coordination from sourcing to delivery, helping clients maintain project timelines and operational efficiency.
          </p>


          <Link
            href="/about"
            className="btn-theme-blue mt-8 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            About Us
          </Link>

          {/* <div className="theme-border mt-10 grid max-w-lg grid-cols-2 gap-6 border-t pt-6">
            <div>
              <p className="text-3xl font-black">500+</p>
              <p className="theme-muted text-sm">Global Partners</p>
            </div>
            <div>
              <p className="text-3xl font-black">24/7</p>
              <p className="theme-muted text-sm">Logistics Support</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
