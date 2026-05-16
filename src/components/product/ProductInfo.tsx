import { formatBDT } from "@/lib/utils";
import { getCategoryName } from "@/lib/mock/categories";
import { ProductActions } from "@/components/product/ProductActions";
import type { Product } from "@/lib/mock/products";

interface ProductInfoProps {
  product: Product;
}

/**
 * Product detail right column — server component.
 * Renders: collection eyebrow, h1, price, story, client ProductActions,
 * and materials/dimensions meta block.
 */
export function ProductInfo({ product }: ProductInfoProps) {
  const categoryName = getCategoryName(product.categoryId);

  return (
    <div className="flex flex-col gap-6">
      {/* Eyebrow + name */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {categoryName}
        </p>
        <h1 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground md:text-[44px] md:leading-[52px]">
          {product.name}
        </h1>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-[22px] leading-[30px] font-normal text-foreground">
            {formatBDT(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[16px] leading-[26px] text-muted-foreground line-through">
              {formatBDT(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Story */}
      <p className="text-[16px] leading-[26px] text-muted-foreground">
        {product.story}
      </p>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Client interactive controls */}
      <ProductActions product={product} />

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Meta block */}
      <dl className="flex flex-col gap-4 text-[14px]">
        {product.materials.length > 0 && (
          <div className="flex flex-col gap-1">
            <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Materials
            </dt>
            <dd className="leading-[22px] text-foreground">
              {product.materials.join(" · ")}
            </dd>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Dimensions
          </dt>
          <dd className="leading-[22px] text-foreground">
            {product.dimensions}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Weight
          </dt>
          <dd className="leading-[22px] text-foreground">{product.weight}</dd>
        </div>
        {product.care.length > 0 && (
          <div className="flex flex-col gap-1">
            <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Care
            </dt>
            <dd className="leading-[22px] text-foreground">
              {product.care[0]}
              {product.care.length > 1 && (
                <>
                  {" · "}
                  {product.care[1]}
                </>
              )}
              {product.care.length > 2 && (
                <>
                  {" "}
                  <a
                    href="#product-care"
                    className="text-[12px] uppercase tracking-[0.05em] text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                  >
                    See full care
                  </a>
                </>
              )}
            </dd>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Lead time
          </dt>
          <dd className="leading-[22px] text-foreground">
            {product.leadTimeDays} days
          </dd>
        </div>
      </dl>
    </div>
  );
}
