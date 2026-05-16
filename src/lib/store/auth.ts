"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { customers } from "@/lib/mock/customers";
import type { Customer } from "@/lib/mock/customers";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: Customer | null;
}

interface AuthActions {
  signIn: () => void;
  signOut: () => void;
}

type AuthStore = AuthState & AuthActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ user: Customer | null }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

/**
 * Mock auth store — Phase 1 only.
 * Sign-in always resolves to the first mock customer (Rahela Chowdhury).
 * No real authentication occurs; all state is client-side localStorage only.
 *
 * Matches the skipHydration pattern used by useCart, paired with
 * <AuthHydration /> in the storefront layout.
 */
export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      signIn: () => {
        // Phase 1: always sign in as the first mock customer
        const mockUser = customers[0];
        if (!mockUser) return;
        console.log("[Ms Weaver] Mock sign-in as:", mockUser.email);
        set({ user: mockUser });
      },

      signOut: () => {
        console.log("[Ms Weaver] Signed out");
        set({ user: null });
      },
    }),
    {
      name: "msweaver:auth:v1",
      storage,
      partialize: (state) => ({ user: state.user }),
      skipHydration: true,
    },
  ),
);

// ─── Selector hooks ───────────────────────────────────────────────────────────

export const useAuthUser = () => useAuth((s) => s.user);
export const useIsSignedIn = () => useAuth((s) => s.user !== null);
