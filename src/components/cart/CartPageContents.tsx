"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useCartItems,
  useCartItemCount,
  useCartSubtotal,
} from "@/lib/store/cart";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { EmptyState } from "@/components/layout/EmptyState";
import { formatBDT } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

/**
 * Client component rendering the full cart page body.
 * Two-column desktop layout: items (8/12) + sticky summary (4/12).
 */
export function CartPageContents() {
  const items = useCartItems();
  const itemCount = useCartItemCount();
  const subtotal = useCartSubtotal();

  const [promoCode, setPromoCode] = useState("");

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <EmptyState
          title="Your bag is quiet"
          description="Pieces you collect will rest here, waiting with the patience of something made well."
          action={
            <Link
              href="/shop"
              className="flex h-12 items-center justify-center border border-foreground px-8 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
            >
              Discover the Atelier
            </Link>
          }
        />
      </div>
    );
  }

  return (
    /*
     * data-lenis-prevent: tells Lenis to stop intercepting scroll events on
     * this element. Without this, Lenis overrides the native scroll model and
     * breaks CSS `position: sticky` on the order summary sidebar.
     * Chosen over disabling Lenis globally so other storefront pages retain
     * smooth scrolling.
     */
    <div data-lenis-prevent className="mx-auto w-full max-w-[1100px] px-6 py-20 md:px-12">
      {/* Page header */}
      <div className="mb-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Your Bag
        </p>
        <h1 className="mt-2 font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
          A considered selection
        </h1>
        <p className="mt-3 text-[16px] leading-[26px] text-muted-foreground">
          {itemCount} {itemCount === 1 ? "piece" : "pieces"} · each made to order by hand
        </p>
      </div>

      {/* Body: items + summary */}
      <div className="grid grid-cols-12 gap-x-12 gap-y-12 items-start">
        {/* Left: line items */}
        <div className="col-span-12 lg:col-span-8">
          <div className="divide-y divide-border">
            {items.map((item) => (
              <CartLineItem
                key={`${item.productId}-${item.variantId ?? "default"}`}
                item={item}
                size="page"
              />
            ))}
          </div>
        </div>

        {/* Right: order summary */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-28">
            <div className="border border-border bg-card p-8">
              {/* Summary heading */}
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Order Summary
              </p>

              {/* Lines */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-muted-foreground">Subtotal</span>
                  <span className="text-[14px] text-foreground">{formatBDT(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-muted-foreground">Shipping</span>
                  <span className="text-[14px] text-muted-foreground">Calculated at checkout</span>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-foreground">Total</span>
                <span className="font-serif text-[20px] font-light tracking-[-0.01em] text-foreground">
                  {formatBDT(subtotal)}
                </span>
              </div>

              {/* Promo code — wrapped in <form> so Enter key triggers submit */}
              <form
                className="mt-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Phase 2: real promo code validation
                  console.log("apply promo:", promoCode);
                }}
              >
                <label
                  htmlFor="promo-code"
                  className="block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-2"
                >
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-code"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    autoComplete="off"
                    className="h-11 flex-1 border-0 border-b border-border bg-transparent px-0 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    className="shrink-0 h-11 px-4 border border-border text-[11px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-200 hover:border-foreground"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {/* Primary CTA */}
              <Link
                href="/checkout"
                className="mt-6 flex h-14 w-full items-center justify-center bg-primary text-[12px] font-medium uppercase tracking-[0.08em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                Proceed to Checkout
              </Link>

              {/* Payment badges + trust note */}
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground text-center">
                  bKash · Nagad · Rocket · Visa · Mastercard
                </p>
                <p className="mt-2 text-[11px] text-center text-muted-foreground">
                  Secure checkout · Made to order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
