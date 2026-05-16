"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  customOptions?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// CartComputed is intentionally removed from the store shape.
// Computed values are derived via selector hooks below — they survive
// persist/rehydration because they read from `items` at call time.
type CartStore = CartState & CartActions;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSameItem(
  item: CartItem,
  productId: string,
  variantId?: string,
): boolean {
  return item.productId === productId && item.variantId === variantId;
}

// SSR-safe storage: returns undefined on the server so persist doesn't attempt
// to read localStorage during SSR, avoiding hydration mismatches.
// Typed against the partialised shape (items only) to satisfy Zustand's
// generic constraints when `partialize` narrows the persisted state.
const storage = createJSONStorage<{ items: CartItem[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────────────────────
      items: [],
      isOpen: false,

      // ── Actions ────────────────────────────────────────────────────────────
      addItem: (incoming) => {
        const quantity = incoming.quantity ?? 1;
        set((state) => {
          const existing = state.items.find((i) =>
            isSameItem(i, incoming.productId, incoming.variantId),
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                isSameItem(i, incoming.productId, incoming.variantId)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, { ...incoming, quantity }],
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !isSameItem(i, productId, variantId),
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            isSameItem(i, productId, variantId) ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "msweaver:cart:v1",
      storage,
      // Only persist the items array, not the drawer open/close state.
      partialize: (state) => ({ items: state.items }),
      // Delay rehydration until CartHydration mounts client-side,
      // preventing SSR/CSR badge mismatch.
      skipHydration: true,
    },
  ),
);

// ─── Selector hooks ───────────────────────────────────────────────────────────
// These are plain selectors that derive values from `items` at render time.
// Because they compute on access rather than being stored in the Zustand state,
// they are not affected by JSON.stringify/parse stripping getter descriptors.

export const useCartItems = () => useCart((s) => s.items);

export const useCartItemCount = () =>
  useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

export const useCartSubtotal = () =>
  useCart((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));

export const useCartIsOpen = () => useCart((s) => s.isOpen);
