"use client";

import { useCart, useCartItemCount, useCartSubtotal } from "@/lib/store/cart";
import { formatBDT } from "@/lib/utils";

/**
 * Phase 1A smoke test — adds a placeholder item to the Zustand cart.
 * Not used in production pages; only on the holding page.
 */
export function CartTestButton() {
  const addItem = useCart((s) => s.addItem);
  const clearCart = useCart((s) => s.clearCart);
  const itemCount = useCartItemCount();
  const subtotal = useCartSubtotal();

  function addPlaceholderItem() {
    addItem({
      productId: "prod_ivory_throw",
      name: "Linen Throw — Ivory",
      slug: "linen-throw-ivory",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80",
      customOptions: { Color: "Ivory" },
    });
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <button
        onClick={addPlaceholderItem}
        className="h-12 rounded-none bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
      >
        Add item to cart
      </button>

      {itemCount > 0 && (
        <div className="flex flex-col items-center gap-1">
          <p className="text-[13px] text-muted-foreground">
            {itemCount} item{itemCount !== 1 ? "s" : ""} ·{" "}
            {formatBDT(subtotal)}
          </p>
          <button
            onClick={clearCart}
            className="text-[12px] text-muted-foreground underline underline-offset-2 transition-colors duration-200 hover:text-foreground"
          >
            Clear cart
          </button>
        </div>
      )}
    </div>
  );
}
