"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { siteConfig, type SiteConfig } from "@/lib/mock/site";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SiteSettingsState {
  config: SiteConfig;
  _hydrated: boolean;
}

interface SiteSettingsActions {
  updateConfig: (updates: Partial<SiteConfig>) => void;
  updateAnnouncementBar: (updates: Partial<SiteConfig["announcementBar"]>) => void;
  updateContact: (updates: Partial<SiteConfig["contact"]>) => void;
  updateSocials: (updates: Partial<SiteConfig["socials"]>) => void;
  updateFooter: (updates: Partial<SiteConfig["footer"]>) => void;
  updateNav: (updates: Partial<SiteConfig["nav"]>) => void;
  setHydrated: () => void;
}

type SiteSettingsStore = SiteSettingsState & SiteSettingsActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ config: SiteConfig }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminSiteSettings = create<SiteSettingsStore>()(
  persist(
    (set) => ({
      config: siteConfig,
      _hydrated: false,

      updateConfig: (updates) => {
        set((state) => ({ config: { ...state.config, ...updates } }));
      },

      updateAnnouncementBar: (updates) => {
        set((state) => ({
          config: {
            ...state.config,
            announcementBar: { ...state.config.announcementBar, ...updates },
          },
        }));
      },

      updateContact: (updates) => {
        set((state) => ({
          config: {
            ...state.config,
            contact: { ...state.config.contact, ...updates },
          },
        }));
      },

      updateSocials: (updates) => {
        set((state) => ({
          config: {
            ...state.config,
            socials: { ...state.config.socials, ...updates },
          },
        }));
      },

      updateFooter: (updates) => {
        set((state) => ({
          config: {
            ...state.config,
            footer: { ...state.config.footer, ...updates },
          },
        }));
      },

      updateNav: (updates) => {
        set((state) => ({
          config: {
            ...state.config,
            nav: { ...state.config.nav, ...updates },
          },
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:siteSettings:v1",
      storage,
      partialize: (state) => ({ config: state.config }),
      skipHydration: true,
    },
  ),
);
