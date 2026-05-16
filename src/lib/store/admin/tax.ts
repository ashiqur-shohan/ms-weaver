"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TaxInclusivity = "inclusive" | "exclusive";
export type TaxStatus = "active" | "inactive";

export interface TaxRate {
  id: string;
  region: string;
  name: string;
  rate: number; // percentage
  inclusivity: TaxInclusivity;
  status: TaxStatus;
}

interface TaxState {
  rates: TaxRate[];
  _hydrated: boolean;
}

interface TaxActions {
  addRate: (rate: TaxRate) => void;
  updateRate: (id: string, updates: Partial<TaxRate>) => void;
  deleteRate: (id: string) => void;
  setHydrated: () => void;
}

type TaxStore = TaxState & TaxActions;

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultRates: TaxRate[] = [
  {
    id: "tax_bd_vat",
    region: "Bangladesh",
    name: "BD VAT",
    rate: 5,
    inclusivity: "exclusive",
    status: "active",
  },
];

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ rates: TaxRate[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminTax = create<TaxStore>()(
  persist(
    (set) => ({
      rates: defaultRates,
      _hydrated: false,

      addRate: (rate) => {
        set((state) => ({ rates: [...state.rates, rate] }));
      },

      updateRate: (id, updates) => {
        set((state) => ({
          rates: state.rates.map((r) =>
            r.id === id ? { ...r, ...updates } : r,
          ),
        }));
      },

      deleteRate: (id) => {
        set((state) => ({ rates: state.rates.filter((r) => r.id !== id) }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:tax:v1",
      storage,
      partialize: (state) => ({ rates: state.rates }),
      skipHydration: true,
    },
  ),
);
