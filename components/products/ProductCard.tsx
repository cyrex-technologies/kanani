import Image from "next/image";
import Link from "next/link";

import type { RelatedProduct } from "@/data/products";

type ProductCardProps = {
  item: RelatedProduct;
};

export default function ProductCard({ item }: ProductCardProps) {
  return (
    <Link
      href={`/products/${item.slug}`}
      className="theme-panel group block rounded-xl border border-[var(--kanan-line)] p-3"
    >
      <div className="relative mb-3 aspect-video overflow-hidden rounded-lg border border-[var(--kanan-line)] bg-white">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <h5 className="font-bold text-[var(--kanan-text)] transition-colors group-hover:text-[var(--kanan-brand-blue)]">
        {item.title}
      </h5>
      <p className="theme-muted text-xs">{item.subtitle}</p>
    </Link>
  );
}
