import type { MetadataRoute } from "next";

import { products } from "@/data/products";

const baseUrl = "https://kanan.co.tz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = ["", "/about", "/contact", "/careers", "/products"].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
  const productPages: MetadataRoute.Sitemap = products.map(({ slug }) => ({
    url: `${baseUrl}/products/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...productPages];
}
