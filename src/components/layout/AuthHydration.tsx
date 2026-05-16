"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/store/auth";

/**
 * Triggers Zustand auth rehydration from localStorage after first paint.
 * Mirrors the CartHydration pattern — store uses `skipHydration: true`
 * so SSR never reads localStorage, preventing hydration mismatches.
 */
export function AuthHydration() {
  useEffect(() => {
    useAuth.persist.rehydrate();
  }, []);

  return null;
}
