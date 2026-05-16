"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { lookbookRows, type LookbookRow } from "@/lib/mock/lookbook";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LookbookState {
  rows: LookbookRow[];
  _hydrated: boolean;
}

interface LookbookActions {
  addRow: (row: LookbookRow) => void;
  updateRow: (id: string, updates: Partial<LookbookRow>) => void;
  deleteRow: (id: string) => void;
  reorderRows: (newOrder: LookbookRow[]) => void;
  setHydrated: () => void;
}

type LookbookStore = LookbookState & LookbookActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ rows: LookbookRow[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminLookbook = create<LookbookStore>()(
  persist(
    (set) => ({
      rows: lookbookRows,
      _hydrated: false,

      addRow: (row) => {
        set((state) => ({ rows: [...state.rows, row] }));
      },

      updateRow: (id, updates) => {
        set((state) => ({
          rows: state.rows.map((r) =>
            r.id === id ? { ...r, ...updates } : r,
          ),
        }));
      },

      deleteRow: (id) => {
        set((state) => ({ rows: state.rows.filter((r) => r.id !== id) }));
      },

      reorderRows: (newOrder) => {
        set({ rows: newOrder });
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:lookbook:v1",
      storage,
      partialize: (state) => ({ rows: state.rows }),
      skipHydration: true,
    },
  ),
);
