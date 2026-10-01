export type Partner = {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: "supplier" | "logistics" | "certification" | "technology";
};

export const partners: Partner[] = [
  {
    id: "1",
    name: "Dangote Cement Tanzania",
    logo: "/images/partners/partners_dangote_cement_logo.jpg",
    description: "Leading cement supplier with a strong presence in Tanzania, providing high-quality materials for construction projects",
    category: "supplier",
  },
  {
    id: "2",
    name: "Lodhia Indusries Ltd",
    logo: "/images/partners/lodhia_industries_logo.webp",
    description: "Leading supplier of construction materials including cement, steel, and aggregates with a strong commitment to quality and customer service",
    category: "supplier",
  },
  
];

export const partnerCategories = [
  { id: "supplier", label: "Suppliers", color: "bg-blue-50 text-blue-700" },
  { id: "logistics", label: "Logistics", color: "bg-emerald-50 text-emerald-700" },
  { id: "certification", label: "Certification", color: "bg-amber-50 text-amber-700" },
  { id: "technology", label: "Technology", color: "bg-indigo-50 text-indigo-700" },
];
