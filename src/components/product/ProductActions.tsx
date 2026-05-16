"use client";

import { useState } from "react";
import { Minus, Plus, Heart } from "@phosphor-icons/react";
import { useCart } from "@/lib/store/cart";
import { formatBDT } from "@/lib/utils";
import type { Product, ProductVariant, CustomOption } from "@/lib/mock/products";

interface ProductActionsProps {
  product: Product;
}

/**
 * Client component containing all interactive purchase controls:
 * - Variant selector (radio chips)
 * - Custom order options (select, text, color)
 * - Quantity stepper
 * - Add to cart button
 * - Wishlist button (local state for now)
 */
export function ProductActions({ product }: ProductActionsProps) {
  const { addItem, openCart } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product.variants?.[0]?.id,
  );
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const selectedVariant = product.variants?.find(
    (v) => v.id === selectedVariantId,
  );
  const effectivePrice = product.price + (selectedVariant?.priceDelta ?? 0);

  function setCustomValue(name: string, value: string) {
    setCustomValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddToCart() {
    const primaryImage = product.images[0];
    addItem({
      productId: product.id,
      variantId: selectedVariantId,
      name: product.name,
      slug: product.slug,
      price: effectivePrice,
      image: primaryImage?.url ?? "",
      quantity,
      customOptions: Object.keys(customValues).length > 0 ? customValues : undefined,
    });
    openCart();
  }

  const isOutOfStock = (selectedVariant?.stock ?? product.stock) === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Variant selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Variant
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <VariantChip
                key={variant.id}
                variant={variant}
                selected={selectedVariantId === variant.id}
                onSelect={() => setSelectedVariantId(variant.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom options */}
      {product.customOptions && product.customOptions.length > 0 && (
        <div className="flex flex-col gap-5">
          {product.customOptions.map((opt) => (
            <CustomOptionField
              key={opt.name}
              option={opt}
              value={customValues[opt.name] ?? ""}
              onChange={(val) => setCustomValue(opt.name, val)}
            />
          ))}
        </div>
      )}

      {/* Quantity stepper */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Quantity
        </p>
        <div className="inline-flex items-center border border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-40"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            <Minus size={16} weight="regular" aria-hidden="true" />
          </button>
          <span className="flex h-10 w-12 items-center justify-center text-[14px] text-foreground">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-40"
            aria-label="Increase quantity"
            disabled={quantity >= 10}
          >
            <Plus size={16} weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Add to cart + wishlist */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex h-14 flex-1 items-center justify-center rounded-none bg-primary text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isOutOfStock
            ? "Out of stock"
            : `Add to cart · ${formatBDT(effectivePrice * quantity)}`}
        </button>
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="flex h-14 w-14 items-center justify-center border border-border text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <Heart
            size={20}
            weight={wishlisted ? "fill" : "regular"}
            className={wishlisted ? "text-primary" : ""}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Lead time note */}
      <p className="text-[13px] leading-[20px] text-muted-foreground">
        Made to order in {product.leadTimeDays} days · Free shipping in Dhaka
        over {formatBDT(5000)}
      </p>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

interface VariantChipProps {
  variant: ProductVariant;
  selected: boolean;
  onSelect: () => void;
}

function VariantChip({ variant, selected, onSelect }: VariantChipProps) {
  const outOfStock = variant.stock === 0;
  return (
    <button
      onClick={onSelect}
      disabled={outOfStock}
      aria-pressed={selected}
      className={`rounded-none border px-4 py-2 text-[12px] uppercase tracking-[0.05em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border text-foreground hover:border-foreground"
      }`}
    >
      {variant.label}
      {variant.priceDelta !== 0 && (
        <span className="ml-1 text-[11px] opacity-70">
          {variant.priceDelta > 0 ? "+" : ""}
          {formatBDT(variant.priceDelta)}
        </span>
      )}
    </button>
  );
}

interface CustomOptionFieldProps {
  option: CustomOption;
  value: string;
  onChange: (value: string) => void;
}

function CustomOptionField({ option, value, onChange }: CustomOptionFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {option.name}
      </label>

      {option.type === "select" && option.values && (
        <div className="flex flex-wrap gap-2">
          {option.values.map((val) => (
            <button
              key={val}
              onClick={() => onChange(val)}
              aria-pressed={value === val}
              className={`rounded-none border px-3 py-1.5 text-[12px] uppercase tracking-[0.04em] transition-colors duration-200 ${
                value === val
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-foreground"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      )}

      {option.type === "color" && option.values && (
        <div className="flex flex-wrap gap-2">
          {option.values.map((val) => (
            <button
              key={val}
              onClick={() => onChange(val)}
              aria-pressed={value === val}
              className={`rounded-none border px-3 py-1.5 text-[12px] uppercase tracking-[0.04em] transition-colors duration-200 ${
                value === val
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-foreground"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      )}

      {option.type === "text" && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${option.name.toLowerCase()}…`}
          className="h-11 w-full border-0 border-b border-border bg-transparent px-0 text-[14px] leading-[22px] text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus-visible:ring-0 transition-colors duration-200"
        />
      )}
    </div>
  );
}
