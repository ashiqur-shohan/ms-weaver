"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { homePage, type HomeSection } from "@/lib/mock/home";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HomeBuilderState {
  sections: HomeSection[];
  _hydrated: boolean;
}

interface HomeBuilderActions {
  toggleSection: (type: HomeSection["type"]) => void;
  reorderSections: (newOrder: HomeSection[]) => void;
  updateSectionProps: (type: HomeSection["type"], props: Record<string, unknown>) => void;
  setHydrated: () => void;
}

type HomeBuilderStore = HomeBuilderState & HomeBuilderActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ sections: HomeSection[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminHomeBuilder = create<HomeBuilderStore>()(
  persist(
    (set) => ({
      sections: homePage,
      _hydrated: false,

      toggleSection: (type) => {
        set((state) => ({
          sections: state.sections.map((s) =>
            s.type === type ? { ...s, enabled: !s.enabled } : s,
          ),
        }));
      },

      reorderSections: (newOrder) => {
        set({ sections: newOrder });
      },

      updateSectionProps: (type, props) => {
        set((state) => ({
          sections: state.sections.map((s) =>
            s.type === type ? { ...s, props: { ...s.props, ...props } } : s,
          ) as HomeSection[],
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:homeBuilder:v1",
      storage,
      partialize: (state) => ({ sections: state.sections }),
      skipHydration: true,
    },
  ),
);
