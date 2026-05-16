"use client";

import Image from "next/image";
import { useCartItems, useCartSubtotal } from "@/lib/store/cart";
import { useCheckout } from "@/lib/store/checkout";
import { shippingOptions, resolveShippingCost } from "@/lib/mock/shipping";
import { formatBDT } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

/**
 * Sticky order summary sidebar shown during checkout.
 * Reads cart items + selected shipping from Zustand stores.
 */
export function OrderSummarySidebar() {
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const { shipping } = useCheckout();

  const selectedOption = shipping
    ? shippingOptions.find((o) => o.id === shipping.shippingOptionId)
    : null;

  const shippingCost = selectedOption
    ? resolveShippingCost(selectedOption, subtotal)
    : null;

  const total = subtotal + (shippingCost ?? 0);

  return (
    <div className="rounded-none border border-border bg-card p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Your Order
      </p>

      {/* Item list */}
      <ul className="mt-5 space-y-4" aria-label="Cart items">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.variantId ?? "default"}`}
            className="flex items-center gap-3"
          >
            <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-muted">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
              {/* Quantity badge */}
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-medium text-background">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] text-foreground">{item.name}</p>
              {item.customOptions && (
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {Object.entries(item.customOptions)
                    .filter(([, v]) => v)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(" · ")}
                </p>
              )}
            </div>
            <p className="shrink-0 text-[13px] text-foreground">
              {formatBDT(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <Separator className="my-5" />

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">Subtotal</span>
          <span className="text-[13px] text-foreground">{formatBDT(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">Shipping</span>
          <span className="text-[13px] text-foreground">
            {shippingCost === null
              ? "Calculated next step"
              : shippingCost === 0
                ? "Free"
                : formatBDT(shippingCost)}
          </span>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-foreground">Total</span>
        <span className="font-serif text-[18px] font-light tracking-[-0.01em] text-foreground">
          {formatBDT(total)}
        </span>
      </div>
    </div>
  );
}
