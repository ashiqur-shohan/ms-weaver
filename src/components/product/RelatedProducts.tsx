import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Product } from "@/lib/mock/products";

interface RelatedProductsProps {
  currentProduct: Product;
  all: Product[];
}

/**
 * Related products — server component.
 * Filters to the same primary collection, excluding the current product.
 * Shows up to 4 products in a horizontal grid.
 */
export function RelatedProducts({ currentProduct, all }: RelatedProductsProps) {
  const primaryCollectionId = currentProduct.collectionIds[0];

  const related = all
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.status === "active" &&
        primaryCollectionId !== undefined &&
        p.collectionIds.includes(primaryCollectionId),
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section
      aria-label="Related products"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <ScrollReveal>
          <div className="mb-10 flex flex-col gap-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              From the same collection
            </p>
            <h2 className="font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
              You might also like
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop: 4-col grid — Mobile: snap carousel */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {related.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.06}>
              <ProductCard
                product={product}
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 25vw, (min-width: 768px) 30vw, 80vw"
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory md:hidden">
          {related.map((product) => (
            <div key={product.id} className="w-[72vw] shrink-0 snap-start">
              <ProductCard
                product={product}
                sizes="72vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
