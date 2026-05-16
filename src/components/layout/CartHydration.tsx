"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/store/cart";

/**
 * Triggers Zustand cart rehydration from localStorage after first paint.
 * Mounted inside the storefront layout so persisted cart state (items,
 * badge count) is available on the client without causing an SSR/CSR mismatch.
 *
 * The store uses `skipHydration: true`, so nothing is read from localStorage
 * during SSR. This component kicks off the read in a useEffect, which runs
 * only in the browser after the initial render is committed.
 */
export function CartHydration() {
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);

  return null;
}
