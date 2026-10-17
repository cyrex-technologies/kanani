import type { ProductCategoryId } from "@/data/products";

export type ProductCategory = {
  id: ProductCategoryId;
  title: string;
  description: string;
  summary: string;
  relatedCategoryIds: ProductCategoryId[];
};

export const categories: ProductCategory[] = [
  {
    id: "scrap",
    title: "Scrap Materials",
    description: "Heavy melting scrap, cast iron, and scrap metal supply for industrial buyers.",
    summary: "Explore Kanan's listed heavy melting scrap, cast iron scrap and mixed scrap metal products. Product requirements vary by industrial process, so contact Kanan to discuss the material information needed for your enquiry.",
    relatedCategoryIds: ["steel", "plastic"],
  },
  {
    id: "steel",
    title: "Steel Products",
    description: "TMT B500 and B300 bars, hollow section, wire rod, black pipes, flat bars, angle iron, HR plates, Z-purlins, and chequered plates.",
    summary: "Browse Kanan's steel product range for construction, fabrication and roofing-support work. Confirm the grade, dimensions and project requirements needed before ordering.",
    relatedCategoryIds: ["roofing", "cement"],
  },
  {
    id: "roofing",
    title: "Roofing Materials",
    description: "Aluzinki, Rangi, IT4, IT5, Wavestyle and Mountstyle roofing sheets.",
    summary: "Browse Kanan's listed roofing-sheet profiles and finishes. Contact the team to confirm the profile, dimensions and product information relevant to your roofing project.",
    relatedCategoryIds: ["steel", "cement"],
  },
  {
    id: "cement",
    title: "Cement Supply",
    description: "Dangote 42.5N, Dangote 42.5R, and Huaxin cement supply.",
    summary: "Browse the cement products listed by Kanan for construction enquiries. Confirm the cement type and project requirements with the team before procurement.",
    relatedCategoryIds: ["steel", "roofing"],
  },
  {
    id: "plastic",
    title: "Plastic Products",
    description:
      "Recycled PE and PP pellets, water tanks, UPVC, HDPE, and PPR pipe systems.",
    summary: "Browse Kanan's listed recycled plastic materials, water tanks and pipe products. Confirm the product type, dimensions and intended application before procurement.",
    relatedCategoryIds: ["steel", "scrap"],
  },
];

export function getCategoryById(id: string): ProductCategory | undefined {
  return categories.find((category) => category.id === id);
}
