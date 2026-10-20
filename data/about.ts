export type AboutPillarIcon = "mission" | "vision" | "values";

export type AboutPillar = {
  title: string;
  description: string;
  icon: AboutPillarIcon;
};

export type MilestoneItem = {
  year: string;
  title: string;
  caption: string;
  image: string;
};

export const aboutWhoWeAreImage =
  "/images/about/kanan-truck-fleet.webp";

export const aboutServicePills = ["Bulk Sourcing", "Cement & Steel", "Scrap & Roofing", "Industrial Supply"];

export const aboutPillars: AboutPillar[] = [
  {
    title: "Mission",
    description:
      "Support construction and industrial clients with dependable supply, consistent availability, and accountable service from sourcing to delivery.",
    icon: "mission",
  },
  {
    title: "Vision",
    description:
      "Become Tanzania's most trusted trading and supply partner for construction and industrial materials through disciplined execution and long-term value.",
    icon: "vision",
  },
  {
    title: "Values",
    description:
      "Reliability, operational discipline, transparency, and partnership guide how we source, stock, and deliver every order.",
    icon: "values",
  },
];

const aboutMilestoneHistory: MilestoneItem[] = [
  {
    year: "2009",
    title: "Scrap Metal Operations",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXCIN_i77zC2-U6_pSxIX_jIWnn5zQqABlqV7w_8UdcWw2HXLMDe2a73D8Or-2IRYkJRC6GHrUY4t-WFreb6bUseOi39Hr67iCRZcklQs2a9qmcTxvjqHCOWNE--m4YeRYtYclINCrZOgke0LkpP82FyVa-g4bIgCvUBnU8HWYCpnpIR5KV1OPfDeTxPMESDdq0t2KHFHyZfWwcqVbnKVte3zgl0ASGW_u-KQ5A7SHn5aGLsB5NePe93gP1aomVcVG4gbBizeHxnWI",
    caption: "Kanan began operations in scrap metal sourcing and processing.",
  },
  {
    year: "2011",
    title: "Plastics Recycling",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsEtlepplJ6mw_D9ug1ecMZ0ky9FKF7P69nu6JCPeAsN0aWUCXe7C2jA_xpBll6ZQzmeNmBxFq7jGWSNTDuYY_SfhNMlqE6KtxLohM-1ulZKjgE4w6TWmtr6d5ePukAcIYpKI5h-NlNm2r-gZAy29QXuYoaup6Ie10Yb28RZYDewkQ1Qn7NkZm9FveGe4W-2jkVPnwg-ioRyA7nLlt5nA5UtT-btUOHWORQzMJRjd6VHDc4OfNd-tHzgVghVqRxVi2Ni71DU5KzSZt",
    caption: "Expanded into plastics recycling with structured sorting and reprocessing lines.",
  },
  {
    year: "2017",
    title: "Logistics Expansion",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjvAn9SbafEwGUsve5C8c_aSCYGWPeuQlttatT-Jm70yjBqxyk6MSUam91zGe5UNbgLKcVB4WbouGDjYjJyhCgllssvQC1H51yCqldsUcBug5pclS7JeIzAr7SOepz05taYzGpzP36-5uN8hSr40a-eCpS5e-ztiA6QspO9ntwFMYpgzPIwjS23VYcTvwx3e6NjQ_VTyqwaiOFKMpbUg7oyv23NotfSCXvQXJN2zo8Q00eS7S6jjHHolsU-RaCMXcwxtDvQd6cjuLj",
    caption: "Scaled logistics capabilities to support larger and time-sensitive supply contracts.",
  },
  {
    year: "2019",
    title: "Industrial Recycling Area",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3PZYE8vS1VsCZESjsBmRxj9AgcIH2WNiCgJJypcSY4xyw4sCwl3__lF3kQYXcBE4VOJZmN7FdR7vvfnSl2vsRbKOPYkt2xmmF5A7GaJajUGVSX_dZTZ1XwcqMTeS9sbE_RByQNREFn8s5Cej4AfEuVj795vrTvZLxbX0bCwk3bkrqu2C0prDiUf0hLValAGimB_jqWHXgzsadM-9Y8Y31N6oduqpxVPOc-ShM6oN_kDAPBiX6NliQphyhrnMD4KReh5bkaStNuY7N",
    caption: "Expanded industrial area dedicated to higher-volume recycling operations.",
  },
  {
    year: "2021",
    title: "Supply Portfolio Expanded",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCz8Tddr83Lrz8iEd5qRFd_HPiHMLwGa1YXbt6vSCsjNZprNlJu_BVsZx1-DifX-q8OnrWJKJTg10yasEdoOam0siHjJO_s2XlPIwLZd6QGI4e3aG_yRWW2e0Il54UdTm-QZDClkx2yhv_Ais0NV-hTrSfUsu4hMift0OYNRRXJqdJvBYS-W5p7AeELYDpTHq0fGWSeVwnxwd5I2JlLm4TdF5M89VVjaeExcXg0k7UNVtVSMaSVi8Bf_D9hHKxhgUzEVitRNy3CW212",
    caption: "Expanded the supply portfolio to serve construction and industrial buyers with a broader materials range.",
  },
  {
    year: "2023",
    title: "Logistics Trucks Fleet",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ahCr8hFHGKBMe7VLmP2oKg7gBdEM1lo2fQr7FxD0WktDO9498N1xGRAMHbQb-rPAL0HzcZTCJ3d2PQzzz0qN1erPJh6bC608p2EPk0a3iNEd5wUEjaAu-S9bSExOktHSRo-6F1m9xuzgTewkO0u8e5b57vbI586oMpvbQLwep500w6PqG9aUdncCRf1mQrKf2kUp5uoQ9MZKGrpJh0L7CmvDjNzWjevJiHWsTYXk_wsXsarSmrhSxHLNux8PuHzzYmekvk9S9hao",
    caption: "Added logistics trucks to improve dispatch control and last-mile reliability.",
  },
  {
    year: "2025",
    title: "Own Office & Industry Site",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjvAn9SbafEwGUsve5C8c_aSCYGWPeuQlttatT-Jm70yjBqxyk6MSUam91zGe5UNbgLKcVB4WbouGDjYjJyhCgllssvQC1H51yCqldsUcBug5pclS7JeIzAr7SOepz05taYzGpzP36-5uN8hSr40a-eCpS5e-ztiA6QspO9ntwFMYpgzPIwjS23VYcTvwx3e6NjQ_VTyqwaiOFKMpbUg7oyv23NotfSCXvQXJN2zo8Q00eS7S6jjHHolsU-RaCMXcwxtDvQd6cjuLj",
    caption: "Opened our own office and industry facility to support long-term growth.",
  },
];

const kananMilestoneImages = [
  "/images/products/scrap/scrap-metal-yard.webp",
  "/images/products/plastic_recycling/plastic_recycling_pp.webp",
  "/images/hero/kanan-industrial-supply-facility-poster.webp",
  "/images/footer/kanan-industrial-yard-delivery.webp",
  "/images/products/cement/dangote_cement.webp",
  "/images/about/kanan-truck-fleet.webp",
  "/images/about/kanan-services-headquarters.webp",
] as const;

export const aboutMilestones: MilestoneItem[] = aboutMilestoneHistory.map((milestone, index) => ({
  ...milestone,
  image: kananMilestoneImages[index] ?? aboutWhoWeAreImage,
}));
