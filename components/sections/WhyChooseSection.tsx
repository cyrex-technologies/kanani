import { Building2, Handshake, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    title: "Reliable Material Sourcing",
    description:
      "We partner with trusted manufacturers and suppliers to ensure every material meets strict quality and durability standards for customers.",
    icon: Handshake,
  },
  {
    title: "Efficient Supply & Logistics",
    description:
      "Our logistics network ensures fast and dependable delivery, helping contractors and developers keep projects on schedule without material delays.",
    icon: Truck,
  },
  {
    title: "Quality Assurance",
    description:
      "Every order goes through careful sourcing and verification to ensure the materials delivered meet project specifications and safety standards. ",
    icon: ShieldCheck,
  },
  {
    title: "Built for Large-Scale Projects",
    description:
      "We specialize in supporting large infrastructure and construction projects with consistent supply capacity and dependable service.",
    icon: Building2,
  },
];

export default function WhyChooseSection() {
  return (
    <section className="theme-section-deep py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-sm uppercase tracking-wide text-slate-500">Company Profile</p>
            <div className="mt-3 h-1 w-48 bg-[var(--kanan-brand-red)]" />
            <h2 className="mt-4 text-4xl font-black text-[var(--kanan-text)] sm:text-5xl">Why Choose Us</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-8 text-[var(--kanan-muted-strong)]">
              Kanan Services delivers professional construction and industrial supply support with
              a strong focus on quality, consistency, and responsive customer service. We combine
              reliable sourcing, technical understanding, and logistics capability to keep projects
              moving without delays.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="relative rounded-3xl border border-white/70 bg-white px-7 py-8 shadow-[0_4px_14px_rgba(16,34,70,0.09)]"
            >
              <span className="absolute left-5 top-5 h-12 w-12 rounded-full bg-[rgba(227,31,47,0.15)]" />
              <div className="relative mb-6 flex h-12 w-12 items-center justify-center text-[var(--kanan-brand-red)]">
                <benefit.icon className="h-9 w-9" />
              </div>
              <h3 className="text-2xl font-semibold text-[var(--kanan-text)]">{benefit.title}</h3>
              <p className="mt-4 text-base leading-8 text-[var(--kanan-muted-strong)]">{benefit.description}</p>
              {/* <Link
                href="/about"
                className="mt-7 inline-flex items-center gap-2 text-base font-medium text-[var(--kanan-muted-strong)] transition hover:text-[var(--kanan-brand-red)]"
              >
                Read More
                <ArrowRightIcon className="h-4 w-4 text-[var(--kanan-brand-gold)]" />
              </Link> */}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
