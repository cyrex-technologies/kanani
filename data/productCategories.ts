import type { ProductCategoryId } from "@/data/products";

export type ProductCategoryItem = {
  key: ProductCategoryId;
  title: string;
  heroTitle: string;
  description: string;
  image: string;
};

export const productCategoryItems: ProductCategoryItem[] = [
  {
    key: "scrap",
    title: "Scrap Metal Services",
    heroTitle: "Scrap Services",
    description:
      "Heavy melting scrap, cast iron, and scrap metal supply for recycling, foundry, and industrial reuse.",
    image: "/images/products/scrap/scrap-metal-yard.webp",
  },
  {
    key: "steel",
    title: "Steel Supply Services",
    heroTitle: "Steel Supply Services",
    description:
      "Reliable supply of TMT B500 and B300 bars, hollow section, wire rod, black pipes, flat bars, angle iron, HR plates, Z-purlins, and chequered plates.",
    image: "/images/products/steel/tmt-b500-steel-bars.webp",
  },
  {
    key: "roofing",
    title: "Roofing Supply Services",
    heroTitle: "Roofing Supply Services",
    description:
      "Dependable roofing material supply including Aluzinki and rangi corrugated sheets plus IT4 and IT5 profiles.",
    image: "/images/products/roofing/aluzinki-corrugated-sheets.webp",
  },
  {
    key: "cement",
    title: "Cement Supply Services",
    heroTitle: "Cement Supply Services",
    description:
      "Supply of Dangote 42.5N, Dangote 42.5R, and Huaxin cement for construction and infrastructure projects.",
    image: "/images/products/cement/dangote-42-5n.webp",
  },
  {
    key: "plastic",
    title: "Plastic Product Supply",
    heroTitle: "Plastic Product Supply",
    description:
      "Plastic product supply including recycled PE and PP pellets, water tanks, and UPVC, HDPE, and PPR pipes.",
    image: "/images/products/plastic/recycled-pp-pellets.webp",
  },
];
