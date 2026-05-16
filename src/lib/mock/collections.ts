// ─── Collections ─────────────────────────────────────────────────────────────

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  productCount: number;
  order: number;
}

export const collections: Collection[] = [
  {
    id: "col_bridal",
    slug: "bridal",
    name: "Bridal",
    tagline: "Made for the morning after the vow.",
    description:
      "Every bridal piece is conceived as an heirloom — lace that carries the weight of a moment without betraying it with excess. We work in fine cotton, silk-blend yarns, and undyed merino, keeping the palette close to candlelight. Each order begins with a conversation about silhouette, sentiment, and the kind of bride you are.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1400&auto=format&fit=crop&q=80",
      alt: "Delicate hand-crocheted bridal veil catching afternoon light in a sunlit room",
      width: 1400,
      height: 900,
    },
    productCount: 4,
    order: 1,
  },
  {
    id: "col_home",
    slug: "heirloom-home",
    name: "Heirloom Home",
    tagline: "Objects that outlast trends.",
    description:
      "A throw is not furniture — it is the temperature of a room. Our home collection is built for surfaces that matter: the reading chair inherited from a grandparent, the window seat that holds the afternoon sun. We use heavyweight linen-cotton blends and undyed wool, dyed only when colour is the point.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&auto=format&fit=crop&q=80",
      alt: "Cream linen throw draped over the arm of a worn oak chair beside a stack of books",
      width: 1400,
      height: 900,
    },
    productCount: 3,
    order: 2,
  },
  {
    id: "col_accessories",
    slug: "soft-accessories",
    name: "Soft Accessories",
    tagline: "The finishing detail that changes everything.",
    description:
      "A beret worn slightly off-centre. A market bag heavy with persimmons. A shawl pinned at the collar with a grandmother's brooch. These are the pieces that complete an outfit without competing with it — made slowly, worn often, improved by time.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1612831127797-9c90e0d7fd4f?w=1400&auto=format&fit=crop&q=80",
      alt: "Terracotta wool beret resting on a matte clay surface beside a spool of yarn",
      width: 1400,
      height: 900,
    },
    productCount: 3,
    order: 3,
  },
  {
    id: "col_bespoke",
    slug: "bespoke-atelier",
    name: "Bespoke Atelier",
    tagline: "Nothing exists yet. Let us make it.",
    description:
      "Some things cannot be found in a catalogue because they have not been made yet. The bespoke service is a conversation: you bring a reference, a feeling, or simply a need, and the atelier builds from there. Lead times run eight to sixteen weeks depending on complexity. Each commission is accompanied by a hand-written note from Ashfia.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&auto=format&fit=crop&q=80",
      alt: "Ashfia's hands working a crochet hook through terracotta-dyed yarn on a linen work surface",
      width: 1400,
      height: 900,
    },
    productCount: 1,
    order: 4,
  },
  {
    id: "col_spring",
    slug: "spring-capitals",
    name: "Spring Capitals",
    tagline: "Light colours for lighter days.",
    description:
      "Drawn from the particular quality of spring light in Dhaka — the hour between seven and nine when the city is still cool and the air carries the smell of rain on warm stone. This seasonal collection uses botanical-dyed yarns in sage, dusty rose, and undyed linen, woven into pieces that travel well and remember where they have been.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format&fit=crop&q=80",
      alt: "Sage green crocheted shawl spread on a sunlit marble surface with dried botanicals",
      width: 1400,
      height: 900,
    },
    productCount: 2,
    order: 5,
  },
];
