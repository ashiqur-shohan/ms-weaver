"use client";

import Image from "next/image";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { useCart } from "@/lib/store/cart";
import { formatBDT } from "@/lib/utils";
import type { CartItem } from "@/lib/store/cart";

interface CartLineItemProps {
  item: CartItem;
  /** "drawer" = compact 80×100, "page" = larger 120×150 */
  size?: "drawer" | "page";
}

/**
 * Renders a single cart line item with image, name, options, quantity stepper,
 * line subtotal, and remove button. Shared between CartDrawer and CartPageContents.
 */
export function CartLineItem({ item, size = "drawer" }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const imageWidth = size === "drawer" ? 80 : 120;
  const imageHeight = size === "drawer" ? 100 : 150;

  const lineTotal = item.price * item.quantity;

  /** Format customOptions as "Color: Sage · Size: M" */
  const optionLabels = item.customOptions
    ? Object.entries(item.customOptions)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ")
    : null;

  function handleDecrement() {
    updateQuantity(item.productId, item.quantity - 1, item.variantId);
  }

  function handleIncrement() {
    updateQuantity(item.productId, item.quantity + 1, item.variantId);
  }

  function handleRemove() {
    removeItem(item.productId, item.variantId);
  }

  return (
    <div className="flex gap-4 py-6">
      {/* Product image */}
      <div
        className="relative shrink-0 overflow-hidden bg-muted"
        style={{ width: imageWidth, height: imageHeight }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.name} — product image`}
            fill
            sizes={`${imageWidth}px`}
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-3 min-w-0">
        {/* Name + price row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-serif text-[15px] font-normal leading-[22px] tracking-[-0.005em] text-foreground truncate">
              {item.name}
            </p>
            {optionLabels && (
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {optionLabels}
              </p>
            )}
          </div>
          <p className="shrink-0 text-[14px] text-foreground font-medium">
            {formatBDT(lineTotal)}
          </p>
        </div>

        {/* Quantity stepper + remove */}
        <div className="flex items-center justify-between">
          {/* Stepper */}
          <div className="inline-flex items-center border border-border">
            <button
              onClick={handleDecrement}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-40"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} weight="regular" aria-hidden="true" />
            </button>
            <span className="flex h-8 w-10 items-center justify-center text-[13px] text-foreground select-none">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-40"
              aria-label="Increase quantity"
              disabled={item.quantity >= 10}
            >
              <Plus size={14} weight="regular" aria-hidden="true" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash size={16} weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
