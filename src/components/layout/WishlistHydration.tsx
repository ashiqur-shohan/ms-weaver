"use client";

import { useEffect } from "react";
import { useWishlist } from "@/lib/store/wishlist";

/**
 * Triggers Zustand wishlist rehydration from localStorage after first paint.
 * Mirrors the CartHydration pattern.
 */
export function WishlistHydration() {
  useEffect(() => {
    useWishlist.persist.rehydrate();
  }, []);

  return null;
}
