"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/lib/store/wishlist";
import { products } from "@/lib/mock/products";
import { formatBDT } from "@/lib/utils";
import { Heart } from "@phosphor-icons/react";

export function WishlistContent() {
  const { items, removeItem } = useWishlist();

  const wishlisted = products.filter((p) => items.includes(p.id));

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Saved pieces
        </p>
        <h1 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
          Your wishlist
        </h1>
      </div>

      {wishlisted.length === 0 ? (
        <div className="flex flex-col items-start gap-6 border border-border bg-card px-6 py-12">
          <p className="max-w-[340px] text-[15px] leading-[24px] text-muted-foreground">
            Pieces you save will appear here — a quiet shelf of things that
            caught your eye.
          </p>
          <Link
            href="/shop"
            className="flex h-12 items-center justify-center rounded-none bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            Discover the atelier
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {wishlisted.map((product) => {
            const img = product.images[0];
            if (!img) return null;
            return (
              <div key={product.id} className="group flex flex-col gap-3">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Link href={`/shop/${product.slug}`} className="block h-full">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </Link>
                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center bg-background/80 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <Heart size={18} weight="fill" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="text-[14px] leading-[22px] text-foreground hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="text-[13px] text-muted-foreground">
                    {formatBDT(product.price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
