"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MediaAsset {
  id: string;
  url: string;
  alt: string;
  filename: string;
  tags: string[];
  width: number;
  height: number;
  /** Approximate size in bytes (estimated for Phase 1) */
  sizeBytes: number;
  uploadedAt: string;
}

interface MediaState {
  assets: MediaAsset[];
  _hydrated: boolean;
}

interface MediaActions {
  addAsset: (asset: MediaAsset) => void;
  updateAsset: (id: string, updates: Partial<MediaAsset>) => void;
  deleteAsset: (id: string) => void;
  deleteAssets: (ids: string[]) => void;
  setHydrated: () => void;
}

type MediaStore = MediaState & MediaActions;

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedAssets: MediaAsset[] = [
  {
    id: "media_01",
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
    alt: "Hands working a crochet hook through terracotta yarn",
    filename: "crochet-hands-terracotta.jpg",
    tags: ["process", "hands", "terracotta"],
    width: 1200,
    height: 800,
    sizeBytes: 284000,
    uploadedAt: "2025-11-01T10:00:00.000Z",
  },
  {
    id: "media_02",
    url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=1200&auto=format&fit=crop&q=80",
    alt: "Marigold flowers steeping in a hot dye bath",
    filename: "marigold-dye-bath.jpg",
    tags: ["dyeing", "process", "marigold"],
    width: 1200,
    height: 800,
    sizeBytes: 312000,
    uploadedAt: "2025-10-15T10:00:00.000Z",
  },
  {
    id: "media_03",
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&auto=format&fit=crop&q=80",
    alt: "Ivory crocheted throw draped over a worn oak armchair",
    filename: "ivory-throw-armchair.jpg",
    tags: ["product", "home", "ivory"],
    width: 1920,
    height: 1080,
    sizeBytes: 520000,
    uploadedAt: "2025-09-20T10:00:00.000Z",
  },
  {
    id: "media_04",
    url: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=900&auto=format&fit=crop&q=80",
    alt: "Skeins of undyed natural wool on a wooden shelf",
    filename: "wool-skeins-shelf.jpg",
    tags: ["materials", "wool", "process"],
    width: 900,
    height: 900,
    sizeBytes: 198000,
    uploadedAt: "2025-09-10T10:00:00.000Z",
  },
  {
    id: "media_05",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80",
    alt: "Ashfia at the atelier workbench, afternoon light portrait",
    filename: "ashfia-atelier-portrait.jpg",
    tags: ["about", "portrait", "atelier"],
    width: 900,
    height: 1100,
    sizeBytes: 245000,
    uploadedAt: "2025-08-28T10:00:00.000Z",
  },
  {
    id: "media_06",
    url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=900&auto=format&fit=crop&q=80",
    alt: "Atelier workbench with crochet hooks and yarn swatches",
    filename: "atelier-workbench.jpg",
    tags: ["atelier", "tools", "process"],
    width: 900,
    height: 1125,
    sizeBytes: 267000,
    uploadedAt: "2025-08-15T10:00:00.000Z",
  },
  {
    id: "media_07",
    url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=900&auto=format&fit=crop&q=80",
    alt: "Cream throw folded and wrapped in muslin, ready for dispatch",
    filename: "dispatch-wrapped-throw.jpg",
    tags: ["packaging", "product"],
    width: 900,
    height: 600,
    sizeBytes: 178000,
    uploadedAt: "2025-07-30T10:00:00.000Z",
  },
  {
    id: "media_08",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80",
    alt: "Wool yarn skeins in a ceramic basin with clean water",
    filename: "wool-washing-basin.jpg",
    tags: ["care", "washing", "wool"],
    width: 1200,
    height: 800,
    sizeBytes: 289000,
    uploadedAt: "2025-07-15T10:00:00.000Z",
  },
  {
    id: "media_09",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&auto=format&fit=crop&q=80",
    alt: "Natural linen basketweave cushion cover on a cream surface",
    filename: "linen-cushion-cream.jpg",
    tags: ["product", "home", "linen"],
    width: 900,
    height: 900,
    sizeBytes: 215000,
    uploadedAt: "2025-06-20T10:00:00.000Z",
  },
  {
    id: "media_10",
    url: "https://images.unsplash.com/photo-1549497538-303791108f95?w=900&auto=format&fit=crop&q=80",
    alt: "Ivory Bruges lace table runner on a raw oak dining table",
    filename: "lace-table-runner-oak.jpg",
    tags: ["product", "home", "table"],
    width: 900,
    height: 600,
    sizeBytes: 193000,
    uploadedAt: "2025-06-10T10:00:00.000Z",
  },
  {
    id: "media_11",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80",
    alt: "Bright yellow yarn skeins hanging to dry on a wooden rack",
    filename: "yellow-yarn-drying.jpg",
    tags: ["dyeing", "process", "colour"],
    width: 900,
    height: 900,
    sizeBytes: 224000,
    uploadedAt: "2025-05-25T10:00:00.000Z",
  },
  {
    id: "media_12",
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
    alt: "Ashfia Khatun — founder and maker portrait",
    filename: "ashfia-avatar.jpg",
    tags: ["about", "portrait"],
    width: 200,
    height: 200,
    sizeBytes: 32000,
    uploadedAt: "2025-04-01T10:00:00.000Z",
  },
];

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ assets: MediaAsset[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminMedia = create<MediaStore>()(
  persist(
    (set) => ({
      assets: seedAssets,
      _hydrated: false,

      addAsset: (asset) => {
        set((state) => ({ assets: [asset, ...state.assets] }));
      },

      updateAsset: (id, updates) => {
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === id ? { ...a, ...updates } : a,
          ),
        }));
      },

      deleteAsset: (id) => {
        set((state) => ({ assets: state.assets.filter((a) => a.id !== id) }));
      },

      deleteAssets: (ids) => {
        set((state) => ({
          assets: state.assets.filter((a) => !ids.includes(a.id)),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:media:v1",
      storage,
      partialize: (state) => ({ assets: state.assets }),
      skipHydration: true,
    },
  ),
);
