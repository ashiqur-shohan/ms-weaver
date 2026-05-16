"use client";

import { Handbag } from "@phosphor-icons/react";
import { useCart, useCartItemCount } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const toggleCart = useCart((s) => s.toggleCart);
  const itemCount = useCartItemCount();

  return (
    <button
      onClick={toggleCart}
      aria-label={`Open cart — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
      className={cn(
        "relative flex h-[44px] w-[44px] items-center justify-center text-foreground transition-opacity duration-200 hover:opacity-60",
        className,
      )}
    >
      <Handbag size={24} weight="regular" aria-hidden="true" />
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-medium leading-none text-primary-foreground"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
