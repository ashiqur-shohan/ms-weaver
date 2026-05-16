// ─── Categories ───────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "throws",
    slug: "throws",
    name: "Throws",
    description: "Handwoven throws and blankets for every surface that matters.",
  },
  {
    id: "veils",
    slug: "veils",
    name: "Veils",
    description: "Bridal veils worked in fine lace traditions.",
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    description: "The finishing detail that changes everything.",
  },
  {
    id: "apparel",
    slug: "apparel",
    name: "Apparel",
    description: "Garments made slowly, worn often.",
  },
  {
    id: "bags",
    slug: "bags",
    name: "Bags",
    description: "Carriers that improve with use.",
  },
  {
    id: "home-decor",
    slug: "home-decor",
    name: "Home Décor",
    description: "Objects for surfaces that deserve to be dressed slowly.",
  },
  {
    id: "bridal",
    slug: "bridal",
    name: "Bridal",
    description: "Made for the morning after the vow.",
  },
  {
    id: "bespoke",
    slug: "bespoke",
    name: "Bespoke",
    description: "Nothing exists yet. Let us make it.",
  },
  {
    id: "hats",
    slug: "hats",
    name: "Hats",
    description: "Berets and caps worked in plant-dyed wools.",
  },
  {
    id: "shawls",
    slug: "shawls",
    name: "Shawls",
    description: "Wraps for the shoulder and the hour between light and dark.",
  },
  {
    id: "garments",
    slug: "garments",
    name: "Garments",
    description: "Open-mesh tops and apparel for warm days.",
  },
];

export function getCategoryName(categoryId: string): string {
  return categories.find((c) => c.id === categoryId)?.name ?? categoryId;
}
