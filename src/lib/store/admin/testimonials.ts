"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { testimonials, type Testimonial } from "@/lib/mock/testimonials";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialsState {
  testimonials: Testimonial[];
  _hydrated: boolean;
}

interface TestimonialsActions {
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  toggleFeatured: (id: string) => void;
  setHydrated: () => void;
}

type TestimonialsStore = TestimonialsState & TestimonialsActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ testimonials: Testimonial[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminTestimonials = create<TestimonialsStore>()(
  persist(
    (set) => ({
      testimonials,
      _hydrated: false,

      addTestimonial: (t) => {
        set((state) => ({ testimonials: [...state.testimonials, t] }));
      },

      updateTestimonial: (id, updates) => {
        set((state) => ({
          testimonials: state.testimonials.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
          ),
        }));
      },

      deleteTestimonial: (id) => {
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        }));
      },

      toggleFeatured: (id) => {
        set((state) => ({
          testimonials: state.testimonials.map((t) =>
            t.id === id ? { ...t, featured: !t.featured } : t,
          ),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:testimonials:v1",
      storage,
      partialize: (state) => ({ testimonials: state.testimonials }),
      skipHydration: true,
    },
  ),
);
