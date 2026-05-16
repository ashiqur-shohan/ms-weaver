import Image from "next/image";
import Link from "next/link";
import { formatBDT } from "@/lib/utils";
import { getPrimaryImage } from "@/lib/mock/products";
import { getCategoryName } from "@/lib/mock/categories";
import type { Product } from "@/lib/mock/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
}

const DEFAULT_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw";

/**
 * Reusable product card — server component.
 * Used across Shop index, Collections, FeaturedCollection, RelatedProducts.
 * Layout: 4:5 image with hover zoom, eyebrow category, Fraunces product name, BDT price.
 */
export function ProductCard({
  product,
  priority = false,
  sizes = DEFAULT_SIZES,
}: ProductCardProps) {
  const img = getPrimaryImage(product);
  const categoryName = getCategoryName(product.categoryId);

  const isBespoke = Boolean(product.customOptions);
  const isMadeToOrder = product.leadTimeDays > 14;
  const showBespokeTag = product.customOptions !== undefined && !isMadeToOrder;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={img.url}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
        />

        {/* Badge — top left */}
        {(showBespokeTag || isMadeToOrder) && (
          <div className="absolute left-3 top-3">
            <span className="inline-block border border-primary-foreground bg-transparent px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-primary-foreground">
              {isBespoke && !isMadeToOrder ? "BESPOKE" : "MADE TO ORDER"}
            </span>
          </div>
        )}
      </div>

      {/* Info block */}
      <div className="mt-4 flex flex-col gap-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {categoryName}
        </p>
        <h3 className="font-serif text-base font-normal leading-snug tracking-[-0.005em] text-foreground md:text-lg">
          {product.name}
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[14px] leading-[22px] text-foreground">
            {formatBDT(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[13px] leading-[20px] text-muted-foreground line-through">
              {formatBDT(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
