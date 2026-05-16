// ─── Journal posts ────────────────────────────────────────────────────────────

export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "quote"
  | "gallery"
  | "faq";

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface GalleryBlock {
  type: "gallery";
  images: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
}

export interface FaqBlock {
  type: "faq";
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock
  | GalleryBlock
  | FaqBlock;

export interface JournalAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  author: JournalAuthor;
  publishedAt: string;
  readingTimeMin: number;
  tags: string[];
  content: ContentBlock[];
}

export const journalPosts: JournalPost[] = [
  {
    id: "journal_slowness",
    slug: "on-the-slowness-of-yarn",
    title: "On the Slowness of Yarn",
    excerpt:
      "There is a reason we reach for handmade things when we want to give something meaningful. A crocheted piece holds its hours visibly — every stitch is a record of time spent.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
      alt: "Hands working a crochet hook through terracotta yarn on a worn linen surface in morning light",
      width: 1200,
      height: 800,
    },
    author: {
      name: "Ashfia Khatun",
      role: "Founder & Maker",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
    },
    publishedAt: "2025-11-12T08:00:00.000Z",
    readingTimeMin: 6,
    tags: ["craft", "slowness", "philosophy"],
    content: [
      {
        type: "paragraph",
        text: "Every piece I make begins with the same act: I sit down, I pick up the hook, and I count. Not in a mechanical way — counting is just the rhythm that brings me into the work. The first few stitches of any project are the ones that determine whether the rest will be good. You can feel when the tension is wrong before you can see it.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=900&auto=format&fit=crop&q=80",
        alt: "Close-up of hook entering yarn loop, the texture of the stitch visible against a dark background",
        caption: "The first stitch of the Ivory Throw — the tension took three attempts to settle.",
        width: 900,
        height: 600,
      },
      {
        type: "quote",
        text: "A crocheted piece holds its hours visibly. Unlike woven cloth, every stitch is discrete — each one a choice, a small act of will. You cannot hide the labour. That is exactly the point.",
      },
      {
        type: "paragraph",
        text: "I learned to crochet from my mother's elder sister, who had learned from her own mother in a village outside Mymensingh. The pattern she taught me first — a simple granny square — has been in our family for at least four generations. Nobody can say with certainty where it came from originally, only that it came from someone's hands.",
      },
      {
        type: "paragraph",
        text: "When people ask me why I don't scale the atelier, why I don't hire more makers, I find myself struggling to answer in terms they expect. The honest answer is that scale changes the object. A throw made in a day is a different thing from a throw made across a week. The time is literally in it.",
      },
    ],
  },
  {
    id: "journal_marigold",
    slug: "dyeing-with-marigold",
    title: "Dyeing With Marigold",
    excerpt:
      "Botanical dyeing is an argument with chemistry that you lose slowly and beautifully. Our terracotta and sage colourways begin not in a factory but in a bucket of simmering flowers.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=1200&auto=format&fit=crop&q=80",
      alt: "Glass jar of marigold flowers steeping in water on a sunlit wooden surface",
      width: 1200,
      height: 800,
    },
    author: {
      name: "Ashfia Khatun",
      role: "Founder & Maker",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
    },
    publishedAt: "2025-10-03T08:00:00.000Z",
    readingTimeMin: 8,
    tags: ["dyeing", "process", "materials", "colour"],
    content: [
      {
        type: "paragraph",
        text: "Marigold dye is not the colour of marigolds. This is the first surprise. The dried petals — deep orange, almost rust — yield a bath that settles on mordanted wool as a clear, clean yellow. You have to learn to read the chemistry rather than the flower.",
      },
      {
        type: "heading",
        level: 2,
        text: "The mordanting",
      },
      {
        type: "paragraph",
        text: "Before the dye bath, the yarn must be prepared to receive colour. I use alum — potassium aluminium sulphate — dissolved in hot water with the skeins submerged for an hour. Alum is the most forgiving mordant: it does not shift the colour significantly, does not harm the fibre, and is reasonably safe to handle. With iron as a mordant, the same marigold bath turns a deep olive. With copper, an acid green. The mordant is the grammar of the sentence; the dye is only the vocabulary.",
      },
      {
        type: "gallery",
        images: [
          {
            url: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&auto=format&fit=crop&q=80",
            alt: "Skeins of undyed merino wool soaking in a ceramic bowl before mordanting",
            width: 600,
            height: 600,
          },
          {
            url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80",
            alt: "Bright yellow yarn skeins hanging to dry on a wooden rack in warm afternoon light",
            width: 600,
            height: 600,
          },
        ],
      },
      {
        type: "quote",
        text: "Botanical dyeing is an argument with chemistry that you lose slowly and beautifully.",
        attribution: "Ashfia Khatun",
      },
      {
        type: "paragraph",
        text: "Our terracotta comes from a combination of madder root and pomegranate rind — both available from Dhaka's kitchen-supply markets in dried form. The sage is marigold over an iron-modified base. None of these colours are permanent in the sense that a synthetic dye is permanent. They fade. But they fade with grace — shifting towards taupe, towards straw, towards the colour of old documents. That fading is not a defect. It is the proof of authenticity.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Will the plant-dyed colours fade?",
            answer:
              "Yes, gradually. This is the nature of botanical dye. We recommend washing in cool water with a pH-neutral detergent and drying out of direct sunlight. The colour will shift — never dramatically, always gracefully.",
          },
          {
            question: "Can I request a specific botanical colourway?",
            answer:
              "For bespoke commissions, yes. We can discuss particular dye plants depending on the season and what is available. Some colours — a particular indigo depth, a bright woad — require advance notice and may add to the lead time.",
          },
        ],
      },
    ],
  },
  {
    id: "journal_atelier_notes",
    slug: "notes-from-the-atelier",
    title: "Notes From the Atelier",
    excerpt:
      "What the workroom looks like at eleven in the morning in October, when the light comes through the east window and the project on the table is a christening gown with fourteen more rows to go.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
      alt: "The atelier workroom — a linen-draped table with tools, yarn, and a half-finished piece",
      width: 1200,
      height: 800,
    },
    author: {
      name: "Ashfia Khatun",
      role: "Founder & Maker",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
    },
    publishedAt: "2025-09-18T08:00:00.000Z",
    readingTimeMin: 5,
    tags: ["atelier", "process", "behind the scenes"],
    content: [
      {
        type: "paragraph",
        text: "The east window is the reason I chose this room. From October until March it delivers approximately two hours of clean, cool light that falls at exactly the right angle to reveal the structure of the stitch. Errors I would miss at noon are visible at ten-thirty. It is the most useful light I have.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=900&auto=format&fit=crop&q=80",
        alt: "A row of Clover Armour crochet hooks arranged by size on a wooden shelf, morning light from the left",
        caption: "The hooks. Every maker has a preferred brand — mine is Clover, specifically the Armour series.",
        width: 900,
        height: 600,
      },
      {
        type: "paragraph",
        text: "I work on one piece at a time. This is not a virtue — it is a temperament. Some makers move between five projects simultaneously; I find that impossible. The object on the table has all of my attention, or it has none, and yarn worked with divided attention shows it. You cannot think about dinner and also make something beautiful.",
      },
      {
        type: "quote",
        text: "The christening gown has fourteen more rows. I know this because I counted last night. Knowing how much remains is different from being close to done.",
        attribution: "From the atelier journal, October 2025",
      },
      {
        type: "paragraph",
        text: "When a piece leaves the atelier, it goes out wrapped in unbleached cotton muslin, tied with a single length of the same colour yarn used in the piece. I started doing this because I needed a system. I kept doing it because it turned out to be the right ending to the object's time with me.",
      },
    ],
  },
  {
    id: "journal_care",
    slug: "the-case-for-hand-washing",
    title: "The Case for Hand Washing",
    excerpt:
      "The washing machine has a relationship with handmade textiles that can only be described as hostile. Some of the most common questions we receive are about care — here, the full and honest answer.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80",
      alt: "Wool yarn skeins arranged in a ceramic basin with clean water, soft light from above",
      width: 1200,
      height: 800,
    },
    author: {
      name: "Ashfia Khatun",
      role: "Founder & Maker",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
    },
    publishedAt: "2025-08-29T08:00:00.000Z",
    readingTimeMin: 7,
    tags: ["care", "guide", "wool", "maintenance"],
    content: [
      {
        type: "paragraph",
        text: "Every piece that leaves the atelier carries a handwritten care card. This is not ceremony — it is the information that determines whether the object lasts three years or thirty. Most textile damage in the home is accidental: the wrong temperature, the wrong detergent, the dryer cycle that seemed fine.",
      },
      {
        type: "heading",
        level: 2,
        text: "For wool and merino",
      },
      {
        type: "paragraph",
        text: "Wool felts when exposed to heat and agitation simultaneously. The washing machine delivers both at once. Hand washing in cool water — and I mean cool, not cold — with a pH-neutral wool wash gives you full control. The entire process takes four minutes. Lift the piece in and out of the water rather than rubbing or wringing; the motion that felts wool is friction, not submersion.",
      },
      {
        type: "heading",
        level: 2,
        text: "For cotton and linen",
      },
      {
        type: "paragraph",
        text: "Cotton and linen are more forgiving. A gentle machine cycle in cool water is acceptable for most pieces — with two exceptions: pieces with fine openwork or lace detail, and anything that has been hand-dyed. For those, hand washing preserves both the structure and the colour.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Can I use fabric softener?",
            answer:
              "I would not. Fabric softener coats fibres to make them feel soft, which changes the handle of yarn in ways that are difficult to reverse. The natural softness of good merino or linen increases with washing over time — you do not need to add it.",
          },
          {
            question: "What if I make a mistake and the piece shrinks?",
            answer:
              "For wool: wet the piece thoroughly with cool water, add a small amount of hair conditioner to the rinse water, and gently stretch the piece back to shape while damp. Pin it out on a towel and allow it to dry. This works for minor shrinkage. For cotton and linen, shrinkage is largely set after the first wash.",
          },
          {
            question: "How should I store pieces long-term?",
            answer:
              "Clean before storing — oils from skin attract moths. Fold loosely and place in an unbleached cotton bag. Cedar blocks are a useful natural deterrent; lavender sachets work but need refreshing regularly. Avoid airtight plastic, which traps moisture.",
          },
        ],
      },
    ],
  },
];
