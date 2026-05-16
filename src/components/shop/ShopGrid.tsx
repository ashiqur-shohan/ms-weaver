"use client";

import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { collections } from "@/lib/mock/collections";
import type { Product } from "@/lib/mock/products";
import type { SortOption } from "@/components/shop/SortDropdown";

interface ShopGridProps {
  allProducts: Product[];
}

/**
 * Client wrapper that reads URL search params and derives the filtered/sorted
 * product list to pass down to the server-renderable ProductGrid.
 */
export function ShopGrid({ allProducts }: ShopGridProps) {
  const searchParams = useSearchParams();

  const selectedCollectionSlugs = searchParams.getAll("collection");
  const selectedColors = searchParams.getAll("color");
  const priceMin = Number(searchParams.get("priceMin") ?? 0);
  const priceMax = Number(searchParams.get("priceMax") ?? Infinity);
  const inStockOnly = searchParams.get("inStock") === "1";
  const customOnly = searchParams.get("customOnly") === "1";
  const sort = (searchParams.get("sort") ?? "featured") as SortOption;

  // Resolve collection slugs → collection IDs
  const selectedCollectionIds =
    selectedCollectionSlugs.length > 0
      ? collections
          .filter((c) => selectedCollectionSlugs.includes(c.slug))
          .map((c) => c.id)
      : [];

  // ── Filter ────────────────────────────────────────────────────────────────

  let filtered = allProducts.filter((p) => {
    if (p.status !== "active") return false;

    if (
      selectedCollectionIds.length > 0 &&
      !p.collectionIds.some((id) => selectedCollectionIds.includes(id))
    ) {
      return false;
    }

    if (selectedColors.length > 0) {
      const productColors = p.customOptions
        ?.filter((o) => o.name === "Color" && o.values)
        .flatMap((o) => o.values ?? []) ?? [];
      if (!productColors.some((c) => selectedColors.includes(c))) return false;
    }

    const effectiveMax = priceMax === 0 ? Infinity : priceMax;
    if (p.price < priceMin || p.price > effectiveMax) return false;

    if (inStockOnly && p.stock === 0) return false;
    if (customOnly && !p.customOptions) return false;

    return true;
  });

  // ── Sort ──────────────────────────────────────────────────────────────────

  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }
  // "featured" and "newest" keep the mock order (newest first = existing order)

  return <ProductGrid products={filtered} priorityCount={6} />;
}
