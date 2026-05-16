"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ContentBlock } from "@/lib/mock/journal";
import { legalPages } from "@/lib/mock/legal";
import { careGuide } from "@/lib/mock/careGuide";
import { aboutPage } from "@/lib/mock/about";
import { faqItems } from "@/lib/mock/faq";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PageStatus = "published" | "draft";

export interface AdminPage {
  id: string;
  slug: string;
  title: string;
  blocks: ContentBlock[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
  status: PageStatus;
  updatedAt: string;
}

interface PagesState {
  pages: AdminPage[];
  _hydrated: boolean;
}

interface PagesActions {
  addPage: (page: AdminPage) => void;
  updatePage: (id: string, updates: Partial<AdminPage>) => void;
  deletePage: (id: string) => void;
  updateBlocks: (id: string, blocks: ContentBlock[]) => void;
  setHydrated: () => void;
}

type PagesStore = PagesState & PagesActions;

// ─── Seed data ────────────────────────────────────────────────────────────────

// Convert about page into blocks
const aboutBlocks: ContentBlock[] = [
  { type: "heading", level: 2, text: aboutPage.hero.headline },
  { type: "paragraph", text: aboutPage.hero.subheadline },
  { type: "image", url: aboutPage.hero.image.url, alt: aboutPage.hero.image.alt, width: 1600, height: 900 },
  { type: "heading", level: 2, text: aboutPage.portrait.name },
  ...aboutPage.portrait.paragraphs.map((text): ContentBlock => ({ type: "paragraph", text })),
  { type: "heading", level: 2, text: aboutPage.philosophy.heading },
  ...aboutPage.philosophy.paragraphs.map((text): ContentBlock => ({ type: "paragraph", text })),
];

// Convert FAQ into blocks
const faqBlocks: ContentBlock[] = [
  {
    type: "faq",
    items: faqItems.map((item) => ({ question: item.question, answer: item.answer })),
  },
];

const seedPages: AdminPage[] = [
  {
    id: "page_about",
    slug: "about",
    title: "About",
    blocks: aboutBlocks,
    seo: { metaTitle: "About — Ms Weaver", metaDescription: aboutPage.hero.subheadline, ogImage: aboutPage.hero.image.url },
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page_care_guide",
    slug: "care-guide",
    title: "Care Guide",
    blocks: careGuide.blocks,
    seo: { metaTitle: `${careGuide.title} — Ms Weaver`, metaDescription: careGuide.subtitle, ogImage: "" },
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page_faq",
    slug: "faq",
    title: "FAQ",
    blocks: faqBlocks,
    seo: { metaTitle: "FAQ — Ms Weaver", metaDescription: "Frequently asked questions about Ms Weaver.", ogImage: "" },
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page_legal_privacy",
    slug: "legal/privacy",
    title: legalPages.privacy.title,
    blocks: legalPages.privacy.blocks,
    seo: { metaTitle: `${legalPages.privacy.title} — Ms Weaver`, metaDescription: "", ogImage: "" },
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page_legal_terms",
    slug: "legal/terms",
    title: legalPages.terms.title,
    blocks: legalPages.terms.blocks,
    seo: { metaTitle: `${legalPages.terms.title} — Ms Weaver`, metaDescription: "", ogImage: "" },
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page_legal_shipping",
    slug: "legal/shipping",
    title: legalPages.shipping.title,
    blocks: legalPages.shipping.blocks,
    seo: { metaTitle: `${legalPages.shipping.title} — Ms Weaver`, metaDescription: "", ogImage: "" },
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page_legal_returns",
    slug: "legal/returns",
    title: legalPages.returns.title,
    blocks: legalPages.returns.blocks,
    seo: { metaTitle: `${legalPages.returns.title} — Ms Weaver`, metaDescription: "", ogImage: "" },
    status: "published",
    updatedAt: new Date().toISOString(),
  },
];

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ pages: AdminPage[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminPages = create<PagesStore>()(
  persist(
    (set) => ({
      pages: seedPages,
      _hydrated: false,

      addPage: (page) => {
        set((state) => ({ pages: [...state.pages, page] }));
      },

      updatePage: (id, updates) => {
        set((state) => ({
          pages: state.pages.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p,
          ),
        }));
      },

      deletePage: (id) => {
        set((state) => ({ pages: state.pages.filter((p) => p.id !== id) }));
      },

      updateBlocks: (id, blocks) => {
        set((state) => ({
          pages: state.pages.map((p) =>
            p.id === id ? { ...p, blocks, updatedAt: new Date().toISOString() } : p,
          ),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:pages:v1",
      storage,
      partialize: (state) => ({ pages: state.pages }),
      skipHydration: true,
    },
  ),
);
