"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Handbag } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { useCart, useCartItems, useCartItemCount, useCartSubtotal } from "@/lib/store/cart";
import { formatBDT } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Global cart drawer — mounted once in (storefront)/layout.tsx.
 * Open/close state driven by the Zustand cart store.
 * Auto-closes on route change.
 */
export function CartDrawer() {
  const { isOpen, closeCart } = useCart();
  const items = useCartItems();
  const itemCount = useCartItemCount();
  const subtotal = useCartSubtotal();
  const pathname = usePathname();

  // Auto-close on route change only — not on initial mount.
  // Tracking previousPathname prevents the drawer from closing the moment it
  // opens when the user navigates to a new page that triggers addItem + openCart.
  const previousPathname = useRef(pathname);
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      closeCart();
      previousPathname.current = pathname;
    }
  }, [pathname, closeCart]);

  const isEmpty = items.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-full sm:w-[480px] rounded-none border-l border-border",
          "bg-card text-card-foreground flex flex-col gap-0 p-0",
          "data-[side=right]:sm:max-w-[480px]",
        )}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-8">
          <div>
            <SheetTitle asChild>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Your Bag
              </p>
            </SheetTitle>
            <SheetDescription asChild>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                {itemCount} {itemCount === 1 ? "piece" : "pieces"} · made to order
              </p>
            </SheetDescription>
          </div>
          <button
            onClick={closeCart}
            className="flex h-[44px] w-[44px] items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label="Close cart"
          >
            <X size={20} weight="regular" aria-hidden="true" />
          </button>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        {isEmpty ? (
          <CartEmptyState />
        ) : (
          <>
            {/* Scrollable item list */}
            <div className="flex-1 overflow-y-auto px-8">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <CartLineItem
                    key={`${item.productId}-${item.variantId ?? "default"}`}
                    item={item}
                    size="drawer"
                  />
                ))}
              </div>
            </div>

            {/* ── Footer (sticky) ───────────────────────────────────────── */}
            <div className="shrink-0 border-t border-border bg-card px-8 pb-8 pt-6">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-serif text-[18px] font-light tracking-[-0.01em] text-foreground">
                  {formatBDT(subtotal)}
                </span>
              </div>

              {/* Shipping note */}
              <p className="mt-2 text-[12px] leading-[18px] text-muted-foreground">
                Shipping calculated at checkout · Free in Dhaka over {formatBDT(5000)}
              </p>

              {/* Primary CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-6 flex h-14 w-full items-center justify-center bg-primary text-[12px] font-medium uppercase tracking-[0.08em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                Proceed to Checkout
              </Link>

              {/* Secondary: view bag */}
              <div className="mt-4 text-center">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                >
                  View bag
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────

function CartEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <Handbag
        size={64}
        weight="regular"
        className="text-muted-foreground/40"
        aria-hidden="true"
      />
      <h2 className="mt-6 font-serif text-[22px] font-light leading-[30px] tracking-[-0.01em] text-foreground">
        Your bag is quiet
      </h2>
      <p className="mt-3 max-w-[28ch] text-[14px] leading-[22px] text-muted-foreground">
        Pieces you collect will rest here.
      </p>
      <Link
        href="/shop"
        className="mt-8 flex h-12 items-center justify-center border border-foreground px-8 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
      >
        Discover the Atelier
      </Link>
    </div>
  );
}
