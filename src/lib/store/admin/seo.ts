"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SeoRedirect {
  id: string;
  from: string;
  to: string;
  statusCode: 301 | 302;
}

export interface SeoConfig {
  defaultTitleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string;
  robotsEnabled: boolean;
  sitemapEnabled: boolean;
  canonicalDomain: string;
  redirects: SeoRedirect[];
}

interface SeoState {
  config: SeoConfig;
  _hydrated: boolean;
}

interface SeoActions {
  updateConfig: (updates: Partial<SeoConfig>) => void;
  addRedirect: (redirect: SeoRedirect) => void;
  updateRedirect: (id: string, updates: Partial<SeoRedirect>) => void;
  deleteRedirect: (id: string) => void;
  setHydrated: () => void;
}

type SeoStore = SeoState & SeoActions;

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultConfig: SeoConfig = {
  defaultTitleTemplate: "%s · Ms Weaver",
  defaultDescription:
    "Each piece leaves the atelier in Dhaka carrying the hours of one careful pair of hands. Ms Weaver creates made-to-order crochet for those who believe the objects they live with should be chosen slowly.",
  defaultOgImage:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop&q=80",
  robotsEnabled: true,
  sitemapEnabled: true,
  canonicalDomain: "https://msweaver.com",
  redirects: [
    {
      id: "redir_01",
      from: "/shop/all",
      to: "/shop",
      statusCode: 301,
    },
    {
      id: "redir_02",
      from: "/blog",
      to: "/journal",
      statusCode: 301,
    },
  ],
};

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ config: SeoConfig }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminSeo = create<SeoStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      _hydrated: false,

      updateConfig: (updates) => {
        set((state) => ({ config: { ...state.config, ...updates } }));
      },

      addRedirect: (redirect) => {
        set((state) => ({
          config: {
            ...state.config,
            redirects: [...state.config.redirects, redirect],
          },
        }));
      },

      updateRedirect: (id, updates) => {
        set((state) => ({
          config: {
            ...state.config,
            redirects: state.config.redirects.map((r) =>
              r.id === id ? { ...r, ...updates } : r,
            ),
          },
        }));
      },

      deleteRedirect: (id) => {
        set((state) => ({
          config: {
            ...state.config,
            redirects: state.config.redirects.filter((r) => r.id !== id),
          },
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:seo:v1",
      storage,
      partialize: (state) => ({ config: state.config }),
      skipHydration: true,
    },
  ),
);
