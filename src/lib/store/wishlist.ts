"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WishlistState {
  items: string[]; // productIds
}

interface WishlistActions {
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  has: (productId: string) => boolean;
}

type WishlistStore = WishlistState & WishlistActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ items: string[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        set((state) => {
          if (state.items.includes(productId)) return state;
          return { items: [...state.items, productId] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }));
      },

      toggleItem: (productId) => {
        if (get().has(productId)) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },

      has: (productId) => get().items.includes(productId),
    }),
    {
      name: "msweaver:wishlist:v1",
      storage,
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);

// ─── Selector hooks ───────────────────────────────────────────────────────────

export const useWishlistCount = () => useWishlist((s) => s.items.length);
export const useWishlistIsItem = (productId: string) =>
  useWishlist((s) => s.items.includes(productId));
