import { EmptyState } from "@/components/layout/EmptyState";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/mock/products";

interface ProductGridProps {
  products: Product[];
  priorityCount?: number;
}

/**
 * Responsive 3-column product grid with asymmetric vertical rhythm.
 * Server component. Renders EmptyState when products array is empty.
 */
export function ProductGrid({
  products,
  priorityCount = 3,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No pieces found"
        description="Try adjusting your filters — there is more here than the current selection shows."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 md:gap-y-24 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
        />
      ))}
    </div>
  );
}
