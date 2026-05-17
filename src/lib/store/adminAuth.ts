"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Constants ────────────────────────────────────────────────────────────────

// PHASE 1 ONLY — symbolic gate for the mock admin demo. Replace with Better Auth
// + RBAC in Phase 2 before any public deploy.
const ADMIN_PASSWORD = "msweaver-admin";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminAuthState {
  isAuthenticated: boolean;
}

interface AdminAuthActions {
  signIn: (password: string) => boolean;
  signOut: () => void;
}

type AdminAuthStore = AdminAuthState & AdminAuthActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ isAuthenticated: boolean }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

/**
 * Admin authentication store — Phase 1 only.
 * Uses a hardcoded password. Phase 2 will replace with Better Auth + RBAC.
 * Matches the skipHydration pattern from useCart / useAuth.
 */
export const useAdminAuth = create<AdminAuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      signIn: (password: string): boolean => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      signOut: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "msweaver:admin:auth:v1",
      storage,
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
      skipHydration: true,
    },
  ),
);

// ─── Selector hooks ───────────────────────────────────────────────────────────

export const useIsAdminAuthenticated = () =>
  useAdminAuth((s) => s.isAuthenticated);
