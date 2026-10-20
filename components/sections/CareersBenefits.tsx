import {
  BadgeIcon,
  BuildingIcon,
  HeartIcon,
  UsersIcon,
  StarIcon,
  TrendingUpIcon,
} from "@/components/shared/icons";

const benefits = [
  {
    title: "Growth Opportunities",
    description:
      "Develop your career with a rapidly expanding company in the East African market.",
    icon: TrendingUpIcon,
  },
  {
    title: "Professional Environment",
    description:
      "Work alongside experienced professionals committed to excellence.",
    icon: BuildingIcon,
  },
  {
    title: "Competitive Compensation",
    description:
      "Attractive salary packages and benefits designed to reward your contribution.",
    icon: BadgeIcon,
  },
  {
    title: "Collaborative Culture",
    description:
      "Join a team that values collaboration, integrity and innovation.",
    icon: UsersIcon,
  },
  {
    title: "Industry Leadership",
    description:
      "Be part of a company setting standards in scrap metals and building materials.",
    icon: StarIcon,
  },
  {
    title: "Work-Life Balance",
    description:
      "We support our team members' well-being and professional development.",
    icon: HeartIcon,
  },
];

export default function CareersBenefits() {
  return (
    <section className="py-20 theme-section-main">
      <div className="max-w-6xl mx-auto px-6">

        <p className="uppercase tracking-[0.22em] text-xs theme-muted mb-3">
          Why Kanan
        </p>

        <h2 className="text-3xl font-bold mb-10">
          Why Work With Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="theme-panel rounded-xl p-6 border theme-border"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--kanan-bg-soft)] text-[var(--kanan-brand-blue)]">
                <Icon className="w-4 h-4" />
              </div>

              <p className="font-semibold mb-2">{title}</p>

              <p className="text-sm theme-muted leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
