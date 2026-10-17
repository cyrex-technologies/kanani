export type ProductMenuItem = {
  label: string;
  href: string;
};

export type ProductMenuSection = {
  title: string;
  href: string;
  items: ProductMenuItem[];
};

export const productMenu: ProductMenuSection[] = [
  {
    title: "Scrap Materials",
    href: "/products/category/scrap",
    items: [
      { label: "Heavy Melting Scrap (HMS)", href: "/products/heavy-melting-scrap-hms" },
      { label: "Cast Iron", href: "/products/cast-iron" },
      { label: "Scrap Metal", href: "/products/scrap-metal" },
    ],
  },
  {
    title: "Steel Products",
    href: "/products/category/steel",
    items: [
      { label: "TMT B500 Steel Bars", href: "/products/tmt-b500-steel-bars" },
      { label: "TMT B300 Steel Bars", href: "/products/tmt-b300-steel-bars" },
      { label: "Hollow Section", href: "/products/hollow-section" },
      { label: "Wire Rod", href: "/products/wire-rod" },
      { label: "Black Pipes", href: "/products/black-pipes" },
      { label: "Angle Iron", href: "/products/angle-iron" },
      { label: "Flat Bars", href: "/products/flat-bars" },
      { label: "HR Plates", href: "/products/hr-plates" },
      { label: "Z-Purlins", href: "/products/z-purlins" },
      { label: "Chequered Plates", href: "/products/chequered-plates" },
    ],
  },
  {
    title: "Roofing Materials",
    href: "/products/category/roofing",
    items: [
      { label: "Aluzinki Corrugated Sheets", href: "/products/aluzinki-corrugated-sheets" },
      { label: "Rangi Corrugated Sheets", href: "/products/rangi-corrugated-sheets" },
      { label: "IT4 and IT5 Roofing Sheets", href: "/products/it4-it5-roofing-sheets" },
      { label: "Wavestyle Roofing Sheets", href: "/products/wavestyle-roofing-sheets" },
      { label: "Mountstyle Roofing Sheets", href: "/products/mountstyle-roofing-sheets" },
    ],
  },
  {
    title: "Cement Supply",
    href: "/products/category/cement",
    items: [
      {
        label: "Dangote Cement 42.5N",
        href: "/products/dangote-42-5n-authorised-distributor",
      },
      {
        label: "Dangote Cement 42.5R",
        href: "/products/dangote-42-5r-authorised-distributor",
      },
      { label: "Huaxin Cement", href: "/products/huaxin" },
    ],
  },
  {
    title: "Plastic Products",
    href: "/products/category/plastic",
    items: [
      { label: "Recycled PE Pellets", href: "/products/plastic-recycling-pe" },
      { label: "Recycled PP Pellets", href: "/products/plastic-recycling-pp" },
      { label: "TriTank Water Tanks", href: "/products/water-tank-tritank" },
      { label: "UPVC Borewell Pipes", href: "/products/upvc-borewell-pipes" },
      { label: "UPVC Pipes", href: "/products/upvc-pipes" },
      { label: "HDPE Pipes", href: "/products/hdpe-pipes" },
      { label: "PPR Pipes", href: "/products/ppr-pipes" },
    ],
  },
];
