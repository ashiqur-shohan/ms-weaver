"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnalyticsConfig {
  ga4MeasurementId: string;
  enabled: boolean;
  anonymizeIp: boolean;
  cookieConsentRequired: boolean;
}

interface AnalyticsState {
  config: AnalyticsConfig;
  _hydrated: boolean;
}

interface AnalyticsActions {
  updateConfig: (updates: Partial<AnalyticsConfig>) => void;
  setHydrated: () => void;
}

type AnalyticsStore = AnalyticsState & AnalyticsActions;

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultConfig: AnalyticsConfig = {
  ga4MeasurementId: "",
  enabled: false,
  anonymizeIp: true,
  cookieConsentRequired: true,
};

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ config: AnalyticsConfig }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminAnalytics = create<AnalyticsStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      _hydrated: false,

      updateConfig: (updates) => {
        set((state) => ({ config: { ...state.config, ...updates } }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:analytics:v1",
      storage,
      partialize: (state) => ({ config: state.config }),
      skipHydration: true,
    },
  ),
);
