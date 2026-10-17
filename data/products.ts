export type ProductCategoryId = "scrap" | "steel" | "roofing" | "cement" | "plastic";

export type ProductSpec = { property: string; value: string };

export type RelatedProduct = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategoryId;
  image: string;
  imageAlt: string;
  description: string;
  summary: string;
  useCases: string[];
} & ProductContent;

export type ProductDetailEntry = CatalogProduct & {
  breadcrumbs: string[];
  relatedProducts: RelatedProduct[];
  specifications: ProductSpec[];
};

export const productCategoryIds: ProductCategoryId[] = ["scrap", "steel", "roofing", "cement", "plastic"];

export function isProductCategory(value: string): value is ProductCategoryId {
  return productCategoryIds.includes(value as ProductCategoryId);
}

export const categoryLabels: Record<ProductCategoryId, string> = {
  scrap: "Scrap Materials",
  steel: "Steel Products",
  roofing: "Roofing Materials",
  cement: "Cement Supply",
  plastic: "Plastic Products",
};

const product = (
  id: string, slug: string, name: string, category: ProductCategoryId, image: string, imageAlt: string,
  description: string, summary: string, useCases: string[] = [],
): CatalogProduct => ({ id, slug, name, category, image, imageAlt, description, summary, useCases, ...productContent[slug] });

// Each asset path maps directly to a named source supplied in kanan-products.
export const products: CatalogProduct[] = [
  product("heavy-melting-scrap-hms", "heavy-melting-scrap-hms", "Heavy Melting Scrap (HMS)", "scrap", "/images/products/scrap/heavy-melting-scrap-hms.webp", "Heavy melting scrap at a Kanan scrap yard", "Heavy melting scrap for recycling and industrial material recovery.", "Heavy melting scrap (HMS) is listed in Kanan's scrap materials catalogue.", ["Recycling", "Industrial material recovery"]),
  product("cast-iron", "cast-iron", "Cast Iron Scrap", "scrap", "/images/products/scrap/cast-iron.webp", "Cast iron scrap components", "Cast iron scrap for recycling and foundry material recovery.", "Cast iron scrap is listed in Kanan's scrap materials catalogue.", ["Recycling", "Foundry material recovery"]),
  product("scrap-metal", "scrap-metal", "Scrap Metal", "scrap", "/images/products/scrap/scrap-metal-yard.webp", "Mixed scrap metal in a yard", "Mixed scrap metal for industrial recycling and material recovery.", "Scrap metal is listed in Kanan's scrap materials catalogue.", ["Industrial recycling", "Material recovery"]),
  product("tmt-b500-steel-bars", "tmt-b500-steel-bars", "TMT B500 Steel Bars", "steel", "/images/products/steel/tmt-b500-steel-bars.webp", "Bundled TMT B500 steel bars", "TMT B500 steel bars for reinforced-concrete construction work.", "TMT B500 steel bars are listed in Kanan's steel products catalogue.", ["Reinforced concrete work"]),
  product("tmt-b300-steel-bars", "tmt-b300-steel-bars", "TMT B300 Steel Bars", "steel", "/images/products/steel/tmt-b300-steel-bars.webp", "Bundled TMT B300 steel bars", "TMT B300 steel bars for construction reinforcement work.", "TMT B300 steel bars are listed in Kanan's steel products catalogue.", ["Construction reinforcement"]),
  product("hollow-section", "hollow-section", "Hollow Section", "steel", "/images/products/steel/hollow-section.webp", "Square and rectangular hollow steel sections", "Hollow steel sections for framing and fabrication projects.", "Hollow section steel is listed in Kanan's steel products catalogue.", ["Framing", "Fabrication"]),
  product("wire-rod", "wire-rod", "Wire Rod", "steel", "/images/products/steel/wire-rod.webp", "Coiled steel wire rod", "Coiled steel wire rod for fabrication and processing work.", "Wire rod is listed in Kanan's steel products catalogue.", ["Fabrication", "Steel processing"]),
  product("black-pipes", "black-pipes", "Black Pipes", "steel", "/images/products/steel/black-pipes.webp", "Stacked black steel pipes", "Black steel pipes for fabrication and construction applications.", "Black pipes are listed in Kanan's steel products catalogue.", ["Fabrication", "Construction"]),
  product("angle-iron", "angle-iron", "Angle Iron", "steel", "/images/products/steel/angle-iron.webp", "Stacked steel angle iron", "Steel angle iron for framing and fabrication work.", "Angle iron is listed in Kanan's steel products catalogue.", ["Framing", "Fabrication"]),
  product("flat-bars", "flat-bars", "Flat Bars", "steel", "/images/products/steel/flat-bars.webp", "Stacked flat steel bars", "Flat steel bars for fabrication and construction work.", "Flat bars are listed in Kanan's steel products catalogue.", ["Fabrication", "Construction"]),
  product("hr-plates", "hr-plates", "HR Plates", "steel", "/images/products/steel/hr-plates.webp", "Stacked hot rolled steel plates", "Hot rolled steel plates for fabrication work.", "HR plates are listed in Kanan's steel products catalogue.", ["Fabrication"]),
  product("z-purlins", "z-purlins", "Z-Purlins", "steel", "/images/products/steel/z-purlins.webp", "Stacked galvanised Z-purlins", "Z-purlins for roofing support and steel framing.", "Z-purlins are listed in Kanan's steel products catalogue.", ["Roofing support", "Steel framing"]),
  product("chequered-plates", "chequered-plates", "Chequered Plates", "steel", "/images/products/steel/chequered-plates.webp", "Stacked chequered steel plates", "Chequered steel plates for industrial surface applications.", "Chequered plates are listed in Kanan's steel products catalogue.", ["Industrial surfaces"]),
  product("aluzinki-corrugated-sheets", "aluzinki-corrugated-sheets", "Aluzinki Corrugated Sheets", "roofing", "/images/products/roofing/aluzinki-corrugated-sheets.webp", "Stacked Aluzinki corrugated roofing sheets", "Aluzinki corrugated sheets for roofing projects.", "Aluzinki corrugated sheets are listed in Kanan's roofing materials catalogue.", ["Roofing"]),
  product("rangi-corrugated-sheets", "rangi-corrugated-sheets", "Rangi Corrugated Sheets", "roofing", "/images/products/roofing/rangi-corrugated-sheets.webp", "Coloured corrugated roofing sheets", "Coloured Rangi corrugated sheets for roofing projects.", "Rangi corrugated sheets are listed in Kanan's roofing materials catalogue.", ["Roofing"]),
  product("it4-it5-roofing-sheets", "it4-it5-roofing-sheets", "IT4 and IT5 Roofing Sheets", "roofing", "/images/products/roofing/it4-it5-roofing-sheets.webp", "IT4 and IT5 profile roofing sheets", "IT4 and IT5 profile sheets for roofing projects.", "IT4 and IT5 roofing sheets are listed in Kanan's roofing materials catalogue.", ["Roofing"]),
  product("wavestyle-roofing-sheets", "wavestyle-roofing-sheets", "Wavestyle Roofing Sheets", "roofing", "/images/products/roofing/wavestyle-roofing-sheets.webp", "Wavestyle roofing sheets", "Wavestyle profile sheets for roofing projects.", "Wavestyle roofing sheets are listed in Kanan's roofing materials catalogue.", ["Roofing"]),
  product("mountstyle-roofing-sheets", "mountstyle-roofing-sheets", "Mountstyle Roofing Sheets", "roofing", "/images/products/roofing/mountstyle-roofing-sheets.webp", "Mountstyle roofing sheets", "Mountstyle profile sheets for roofing projects.", "Mountstyle roofing sheets are listed in Kanan's roofing materials catalogue.", ["Roofing"]),
  product("dangote-42-5n", "dangote-42-5n-authorised-distributor", "Dangote Cement 42.5N", "cement", "/images/products/cement/dangote-42-5n.webp", "Dangote Cement 42.5N bag", "Dangote Cement 42.5N for construction projects.", "Dangote Cement 42.5N is listed in Kanan's cement supply catalogue.", ["Construction"]),
  product("dangote-42-5r", "dangote-42-5r-authorised-distributor", "Dangote Cement 42.5R", "cement", "/images/products/cement/dangote-42-5r.webp", "Dangote Cement 42.5R bag", "Dangote Cement 42.5R for construction projects.", "Dangote Cement 42.5R is listed in Kanan's cement supply catalogue.", ["Construction"]),
  product("huaxin", "huaxin", "Huaxin Cement", "cement", "/images/products/cement/huaxin-cement.webp", "Huaxin Cement bags in a warehouse", "Huaxin cement for construction projects.", "Huaxin cement is listed in Kanan's cement supply catalogue.", ["Construction"]),
  product("plastic-recycling-pp", "plastic-recycling-pp", "Recycled PP Pellets", "plastic", "/images/products/plastic/recycled-pp-pellets.webp", "Bags of recycled polypropylene pellets", "Recycled polypropylene pellets for material processing.", "Recycled PP pellets are listed in Kanan's plastic products catalogue.", ["Material processing"]),
  product("plastic-recycling-pe", "plastic-recycling-pe", "Recycled PE Pellets", "plastic", "/images/products/plastic/recycled-pe-pellets.webp", "Bags of recycled polyethylene pellets", "Recycled polyethylene pellets for material processing.", "Recycled PE pellets are listed in Kanan's plastic products catalogue.", ["Material processing"]),
  product("water-tank-tritank", "water-tank-tritank", "TriTank Water Tanks", "plastic", "/images/products/plastic/tritank-water-tank.webp", "TriTank water storage tanks", "TriTank water storage tanks for water-storage needs.", "TriTank water tanks are listed in Kanan's plastic products catalogue.", ["Water storage"]),
  product("upvc-borewell-pipes", "upvc-borewell-pipes", "UPVC Borewell Pipes", "plastic", "/images/products/plastic/upvc-borewell-pipes.webp", "Blue UPVC borewell pipes", "UPVC borewell pipes for borewell systems.", "UPVC borewell pipes are listed in Kanan's plastic products catalogue.", ["Borewell systems"]),
  product("upvc-pipes", "upvc-pipes", "UPVC Pipes", "plastic", "/images/products/plastic/upvc-pipes.webp", "White UPVC pipes", "UPVC pipes for plumbing and water-conveyance systems.", "UPVC pipes are listed in Kanan's plastic products catalogue.", ["Plumbing", "Water conveyance"]),
  product("hdpe-pipes", "hdpe-pipes", "HDPE Pipes", "plastic", "/images/products/plastic/hdpe-pipes.webp", "Stacked HDPE pipes", "HDPE pipes for water and utility systems.", "HDPE pipes are listed in Kanan's plastic products catalogue.", ["Water systems", "Utility systems"]),
  product("ppr-pipes", "ppr-pipes", "PPR Pipes", "plastic", "/images/products/plastic/ppr-pipes.webp", "Green PPR pipes", "PPR pipes for plumbing systems.", "PPR pipes are listed in Kanan's plastic products catalogue.", ["Plumbing"]),
];

function toRelatedProduct(item: CatalogProduct): RelatedProduct {
  return { slug: item.slug, title: item.name, subtitle: item.description, image: item.image, imageAlt: item.imageAlt };
}

export function getRelatedProducts(item: CatalogProduct): RelatedProduct[] {
  return products.filter((candidate) => candidate.category === item.category && candidate.slug !== item.slug)
    .concat(products.filter((candidate) => candidate.category !== item.category && candidate.slug !== item.slug))
    .slice(0, 4).map(toRelatedProduct);
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  const legacyProductSlugMap: Record<string, string> = {
    "cast-iron-structural-scrap": "cast-iron", "hollow-sections": "hollow-section",
    "dangote-cement-authorized-distributor": "dangote-42-5n-authorised-distributor",
  };
  const normalizedSlug = legacyProductSlugMap[slug] ?? slug;
  return products.find((item) => item.slug === normalizedSlug || item.id === normalizedSlug);
}

export function getProductDetailBySlug(slug: string): ProductDetailEntry | undefined {
  const item = getProductBySlug(slug);
  if (!item) return undefined;
  return { ...item, breadcrumbs: ["Products", categoryLabels[item.category], item.name], specifications: [], relatedProducts: getRelatedProducts(item) };
}
import { productContent, type ProductContent } from "@/data/product-content";
