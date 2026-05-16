"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { journalPosts, type JournalPost } from "@/lib/mock/journal";

// ─── Types ────────────────────────────────────────────────────────────────────

export type JournalStatus = "published" | "draft";

export interface AdminJournalPost extends JournalPost {
  status: JournalStatus;
  featured: boolean;
  bodyHtml: string; // Tiptap HTML output
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    focusKeyword: string;
  };
}

interface JournalState {
  posts: AdminJournalPost[];
  _hydrated: boolean;
}

interface JournalActions {
  addPost: (post: AdminJournalPost) => void;
  updatePost: (id: string, updates: Partial<AdminJournalPost>) => void;
  deletePost: (id: string) => void;
  setHydrated: () => void;
}

type JournalStore = JournalState & JournalActions;

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ posts: AdminJournalPost[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Seed ─────────────────────────────────────────────────────────────────────

const seedPosts: AdminJournalPost[] = journalPosts.map((p) => ({
  ...p,
  status: "published" as JournalStatus,
  featured: false,
  bodyHtml: p.content
    .map((block) => {
      if (block.type === "paragraph") return `<p>${block.text}</p>`;
      if (block.type === "heading") return `<h${block.level}>${block.text}</h${block.level}>`;
      if (block.type === "quote") return `<blockquote><p>${block.text}</p>${block.attribution ? `<cite>${block.attribution}</cite>` : ""}</blockquote>`;
      return "";
    })
    .filter(Boolean)
    .join("\n"),
  seo: {
    metaTitle: `${p.title} — Ms Weaver Journal`,
    metaDescription: p.excerpt,
    ogImage: p.coverImage.url,
    focusKeyword: p.tags[0] ?? "",
  },
}));

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminJournal = create<JournalStore>()(
  persist(
    (set) => ({
      posts: seedPosts,
      _hydrated: false,

      addPost: (post) => {
        set((state) => ({ posts: [...state.posts, post] }));
      },

      updatePost: (id, updates) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        }));
      },

      deletePost: (id) => {
        set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:journal:v1",
      storage,
      partialize: (state) => ({ posts: state.posts }),
      skipHydration: true,
    },
  ),
);
