import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "@/components/shared/icons";

const positions: Array<{
  title: string;
  department: string;
  location: string;
  type: string;
}> = [];

export default function CareersPositions() {
  return (
    <section id="positions" className="py-20 theme-section-deep">
      <div className="max-w-6xl mx-auto px-6">

        <p className="uppercase tracking-[0.22em] text-xs theme-muted mb-3">
          Open Roles
        </p>

        <h2 className="text-3xl font-bold mb-10">
          No open position
        </h2>

        {positions.length === 0 ? (
          <div className="theme-panel rounded-xl border theme-border p-6">
            <p className="text-base leading-7 theme-muted">
              There are currently no open positions. You can still reach out through the contact
              page and share your CV for future opportunities.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {positions.map((pos) => (
              <div
                key={pos.title}
                className="theme-panel rounded-xl border theme-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-semibold">{pos.title}</p>

                    <span className="rounded-full bg-[var(--kanan-bg-soft)] px-3 py-1 text-xs text-[var(--kanan-brand-blue)]">
                      {pos.type}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-2 text-sm theme-muted flex-wrap">
                    <span>{pos.department}</span>

                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      {pos.location}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/contact?position=${encodeURIComponent(pos.title)}`}
                  className="btn-theme-blue px-5 py-2 rounded-full text-xs flex items-center gap-2"
                >
                  Apply Now
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
