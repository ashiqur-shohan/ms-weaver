"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { shippingOptions, type ShippingOption } from "@/lib/mock/shipping";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShippingRate {
  id: string;
  label: string;
  price: number;
  description: string;
}

export interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  leadTimeCopy: string;
  freeThreshold: number | null;
  rates: ShippingRate[];
}

interface ShippingState {
  zones: ShippingZone[];
  legacyOptions: ShippingOption[];
  _hydrated: boolean;
}

interface ShippingActions {
  addZone: (zone: ShippingZone) => void;
  updateZone: (id: string, updates: Partial<ShippingZone>) => void;
  deleteZone: (id: string) => void;
  addRate: (zoneId: string, rate: ShippingRate) => void;
  updateRate: (zoneId: string, rateId: string, updates: Partial<ShippingRate>) => void;
  deleteRate: (zoneId: string, rateId: string) => void;
  setHydrated: () => void;
}

type ShippingStore = ShippingState & ShippingActions;

// ─── Seed ─────────────────────────────────────────────────────────────────────

const seedZones: ShippingZone[] = [
  {
    id: "zone_dhaka",
    name: "Inside Dhaka",
    regions: ["Dhaka metropolitan area", "All thanas within Dhaka city"],
    leadTimeCopy: "1–2 business days after dispatch. Order before 2 pm for same-day dispatch.",
    freeThreshold: 5000,
    rates: [
      { id: "rate_dhaka_std", label: "Standard Delivery", price: 150, description: "Doorstep delivery within Dhaka" },
      { id: "rate_dhaka_exp", label: "Express — Next Day", price: 400, description: "Order before 2 pm for next-day delivery" },
    ],
  },
  {
    id: "zone_nationwide",
    name: "Outside Dhaka",
    regions: ["All 64 districts of Bangladesh excluding Dhaka metropolitan"],
    leadTimeCopy: "3–5 business days via Sundarban Courier or SA Paribahan.",
    freeThreshold: 8000,
    rates: [
      { id: "rate_nation_std", label: "Standard Nationwide", price: 250, description: "Nationwide courier delivery" },
    ],
  },
  {
    id: "zone_international",
    name: "International",
    regions: ["All countries outside Bangladesh — quoted on request"],
    leadTimeCopy: "5–10 business days via DHL Express or FedEx. Customs duties are the buyer's responsibility.",
    freeThreshold: null,
    rates: [
      { id: "rate_intl_dhl", label: "DHL Express", price: 2500, description: "International tracked shipping" },
    ],
  },
];

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ zones: ShippingZone[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminShipping = create<ShippingStore>()(
  persist(
    (set) => ({
      zones: seedZones,
      legacyOptions: shippingOptions,
      _hydrated: false,

      addZone: (zone) => {
        set((state) => ({ zones: [...state.zones, zone] }));
      },

      updateZone: (id, updates) => {
        set((state) => ({
          zones: state.zones.map((z) =>
            z.id === id ? { ...z, ...updates } : z,
          ),
        }));
      },

      deleteZone: (id) => {
        set((state) => ({ zones: state.zones.filter((z) => z.id !== id) }));
      },

      addRate: (zoneId, rate) => {
        set((state) => ({
          zones: state.zones.map((z) =>
            z.id === zoneId ? { ...z, rates: [...z.rates, rate] } : z,
          ),
        }));
      },

      updateRate: (zoneId, rateId, updates) => {
        set((state) => ({
          zones: state.zones.map((z) =>
            z.id === zoneId
              ? {
                  ...z,
                  rates: z.rates.map((r) =>
                    r.id === rateId ? { ...r, ...updates } : r,
                  ),
                }
              : z,
          ),
        }));
      },

      deleteRate: (zoneId, rateId) => {
        set((state) => ({
          zones: state.zones.map((z) =>
            z.id === zoneId
              ? { ...z, rates: z.rates.filter((r) => r.id !== rateId) }
              : z,
          ),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:shipping:v1",
      storage,
      partialize: (state) => ({ zones: state.zones }),
      skipHydration: true,
    },
  ),
);
