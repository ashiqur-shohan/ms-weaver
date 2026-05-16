"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { collections as mockCollections } from "@/lib/mock/collections";
import type { Collection } from "@/lib/mock/collections";

interface AdminCollectionsState {
  collections: Collection[];
  _hydrated: boolean;
}

interface AdminCollectionsActions {
  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  setHydrated: () => void;
}

type AdminCollectionsStore = AdminCollectionsState & AdminCollectionsActions;

const storage = createJSONStorage<{ collections: Collection[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

export const useAdminCollections = create<AdminCollectionsStore>()(
  persist(
    (set) => ({
      collections: mockCollections,
      _hydrated: false,

      addCollection: (collection) => {
        set((state) => ({
          collections: [...state.collections, collection],
        }));
      },

      updateCollection: (id, updates) => {
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === id ? { ...c, ...updates } : c,
          ),
        }));
      },

      deleteCollection: (id) => {
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:collections:v1",
      storage,
      partialize: (state) => ({ collections: state.collections }),
      skipHydration: true,
    },
  ),
);
