"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products as mockProducts } from "@/lib/mock/products";
import type { Product } from "@/lib/mock/products";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminProductsState {
  products: Product[];
  _hydrated: boolean;
}

interface AdminProductsActions {
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => Product | null;
  setHydrated: () => void;
}

type AdminProductsStore = AdminProductsState & AdminProductsActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ products: Product[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

/**
 * Admin products store.
 * Seeds from mock data on first run, then owns state independently.
 * Storefront pages continue reading from mock/products.ts directly.
 */
export const useAdminProducts = create<AdminProductsStore>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      _hydrated: false,

      addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      duplicateProduct: (id) => {
        const original = get().products.find((p) => p.id === id);
        if (!original) return null;
        const duplicate: Product = {
          ...original,
          id: `${original.id}_copy_${Date.now()}`,
          slug: `${original.slug}-copy`,
          name: `${original.name} (Copy)`,
          status: "draft",
        };
        set((state) => ({ products: [...state.products, duplicate] }));
        return duplicate;
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:products:v1",
      storage,
      partialize: (state) => ({ products: state.products }),
      skipHydration: true,
    },
  ),
);
