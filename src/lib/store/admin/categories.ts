"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { categories as mockCategories } from "@/lib/mock/categories";
import type { Category } from "@/lib/mock/categories";

interface AdminCategoriesState {
  categories: Category[];
  _hydrated: boolean;
}

interface AdminCategoriesActions {
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  setHydrated: () => void;
}

type AdminCategoriesStore = AdminCategoriesState & AdminCategoriesActions;

const storage = createJSONStorage<{ categories: Category[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

export const useAdminCategories = create<AdminCategoriesStore>()(
  persist(
    (set) => ({
      categories: mockCategories,
      _hydrated: false,

      addCategory: (category) => {
        set((state) => ({
          categories: [...state.categories, category],
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c,
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:categories:v1",
      storage,
      partialize: (state) => ({ categories: state.categories }),
      skipHydration: true,
    },
  ),
);
