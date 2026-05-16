"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DiscountType = "percent" | "fixed" | "free_ship";
export type DiscountStatus = "active" | "scheduled" | "expired";
export type CustomerRestriction = "any" | "first_time";

export interface Discount {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minimumSubtotal: number | null;
  maxUses: number | null;
  usedCount: number;
  validFrom: string | null;
  validTo: string | null;
  applicableProductIds: string[];
  customerRestriction: CustomerRestriction;
  status: DiscountStatus;
}

interface DiscountsState {
  discounts: Discount[];
  _hydrated: boolean;
}

interface DiscountsActions {
  addDiscount: (discount: Discount) => void;
  updateDiscount: (id: string, updates: Partial<Discount>) => void;
  deleteDiscount: (id: string) => void;
  setHydrated: () => void;
}

type DiscountsStore = DiscountsState & DiscountsActions;

// ─── Seed ─────────────────────────────────────────────────────────────────────

const seedDiscounts: Discount[] = [
  {
    id: "disc_01",
    code: "WELCOME10",
    type: "percent",
    value: 10,
    minimumSubtotal: null,
    maxUses: null,
    usedCount: 47,
    validFrom: "2025-01-01T00:00:00.000Z",
    validTo: null,
    applicableProductIds: [],
    customerRestriction: "first_time",
    status: "active",
  },
  {
    id: "disc_02",
    code: "FREESHIP",
    type: "free_ship",
    value: 0,
    minimumSubtotal: 3000,
    maxUses: null,
    usedCount: 183,
    validFrom: "2025-06-01T00:00:00.000Z",
    validTo: null,
    applicableProductIds: [],
    customerRestriction: "any",
    status: "active",
  },
  {
    id: "disc_03",
    code: "HOLIDAY25",
    type: "percent",
    value: 25,
    minimumSubtotal: 5000,
    maxUses: 200,
    usedCount: 72,
    validFrom: "2025-12-20T00:00:00.000Z",
    validTo: "2026-01-05T23:59:59.000Z",
    applicableProductIds: [],
    customerRestriction: "any",
    status: "expired",
  },
];

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ discounts: Discount[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminDiscounts = create<DiscountsStore>()(
  persist(
    (set) => ({
      discounts: seedDiscounts,
      _hydrated: false,

      addDiscount: (discount) => {
        set((state) => ({ discounts: [...state.discounts, discount] }));
      },

      updateDiscount: (id, updates) => {
        set((state) => ({
          discounts: state.discounts.map((d) =>
            d.id === id ? { ...d, ...updates } : d,
          ),
        }));
      },

      deleteDiscount: (id) => {
        set((state) => ({
          discounts: state.discounts.filter((d) => d.id !== id),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:discounts:v1",
      storage,
      partialize: (state) => ({ discounts: state.discounts }),
      skipHydration: true,
    },
  ),
);
