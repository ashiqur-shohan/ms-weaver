"use client";

import { useEffect } from "react";
import { useCheckout } from "@/lib/store/checkout";

/**
 * Triggers Zustand checkout store rehydration from sessionStorage after first
 * paint. Mirrors the pattern used in CartHydration. Must be mounted inside the
 * checkout layout so the confirmation page can read persisted confirmation data
 * (orderNumber, firstName, email, orderTotal, shipping) after a browser refresh.
 *
 * The store uses `skipHydration: true`, so nothing is read from sessionStorage
 * during SSR. This component kicks off the read in a useEffect, which runs
 * only in the browser once the initial render is committed.
 */
export function CheckoutHydration() {
  useEffect(() => {
    useCheckout.persist.rehydrate();
  }, []);

  return null;
}
