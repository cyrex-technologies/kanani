"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const categoryTitles: Record<string, string> = {
  scrap: "Scrap Materials",
  steel: "Steel Products",
  roofing: "Roofing Materials",
  cement: "Cement Supply",
  plastic: "Plastic Products",
};

// Static export cannot render query strings on the server. This small client
// enhancement retains the existing catalogue filters without needing a server.
export default function ProductCatalogueEnhancer() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category") ?? "all";
    const query = (searchParams.get("q") ?? "").trim().toLowerCase();
    const validCategory = category in categoryTitles ? category : "all";
    const products = Array.from(document.querySelectorAll<HTMLElement>("[data-catalogue-product]"));
    let count = 0;

    for (const product of products) {
      const categoryMatch = validCategory === "all" || product.dataset.category === validCategory;
      const searchMatch = !query || (product.dataset.search ?? "").includes(query);
      const show = categoryMatch && searchMatch;
      product.hidden = !show;
      if (show) count += 1;
    }

    const title = document.querySelector<HTMLElement>("[data-catalogue-title]");
    if (title) title.textContent = validCategory === "all" ? "All Products" : categoryTitles[validCategory];
    const countLabel = document.querySelector<HTMLElement>("[data-catalogue-count]");
    if (countLabel) countLabel.textContent = `Showing ${count} product${count === 1 ? "" : "s"}${query ? ` for “${query}”.` : "."}`;
    const empty = document.querySelector<HTMLElement>("[data-catalogue-empty]");
    if (empty) empty.hidden = count !== 0;
    const input = document.querySelector<HTMLInputElement>("[data-catalogue-search]");
    if (input) input.value = searchParams.get("q") ?? "";
    for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-catalogue-category]")) {
      const active = link.dataset.catalogueCategory === validCategory;
      link.setAttribute("aria-current", active ? "page" : "false");
    }
  }, [searchParams]);

  return null;
}
