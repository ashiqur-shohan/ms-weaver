// ─── Home page section configuration ─────────────────────────────────────────

export interface HeroSectionProps {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  desktopImage: { url: string; alt: string; width: number; height: number };
  mobileImage: { url: string; alt: string; width: number; height: number };
}

export interface FeaturedCollectionProps {
  collectionId: string;
  eyebrow: string;
  heading: string;
  subhead: string;
  productIds: string[];
  cta: { label: string; href: string };
}

export interface BrandStoryProps {
  eyebrow: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  image: { url: string; alt: string; width: number; height: number };
}

export interface ProcessShowcaseProps {
  eyebrow: string;
  heading: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
    image: { url: string; alt: string; width: number; height: number };
  }>;
}

export interface TestimonialsProps {
  heading: string;
  subhead: string;
  featuredOnly: boolean;
}

export interface JournalPreviewProps {
  eyebrow: string;
  heading: string;
  postIds: string[];
  cta: { label: string; href: string };
}

export interface NewsletterProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  placeholder: string;
  buttonLabel: string;
  backgroundImage?: { url: string; alt: string };
}

export interface InstagramImage {
  url: string;
  alt: string;
  likeCount: number;
}

export interface InstagramFeedProps {
  eyebrow: string;
  heading: string;
  handle: string;
  href: string;
  postCount: number;
  images: InstagramImage[];
}

/**
 * Discriminated union — switch on `section.type` narrows `section.props`
 * to the correct interface in section components throughout Phase 1B.
 */
export type HomeSection =
  | { type: "hero"; enabled: boolean; props: HeroSectionProps }
  | { type: "featuredCollection"; enabled: boolean; props: FeaturedCollectionProps }
  | { type: "brandStory"; enabled: boolean; props: BrandStoryProps }
  | { type: "processShowcase"; enabled: boolean; props: ProcessShowcaseProps }
  | { type: "testimonials"; enabled: boolean; props: TestimonialsProps }
  | { type: "journalPreview"; enabled: boolean; props: JournalPreviewProps }
  | { type: "newsletter"; enabled: boolean; props: NewsletterProps }
  | { type: "instagramFeed"; enabled: boolean; props: InstagramFeedProps };

export const homePage: HomeSection[] = [
  {
    type: "hero",
    enabled: true,
    props: {
      eyebrow: "The Spring Atelier",
      headline: "Knotted by hand, made to be lived with.",
      subhead:
        "Each piece leaves the Dhaka atelier carrying the hours of one careful pair of hands.",
      cta: { label: "Discover the Atelier", href: "/about" },
      secondaryCta: { label: "Shop New Pieces", href: "/shop" },
      desktopImage: {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&auto=format&fit=crop&q=80",
        alt: "Ivory crocheted throw draping over a worn oak chair in afternoon light, a single spool of yarn on the floor beside it",
        width: 1920,
        height: 1080,
      },
      mobileImage: {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&auto=format&fit=crop&q=80",
        alt: "Close view of hands working a crochet hook through terracotta yarn, the texture of each stitch visible",
        width: 900,
        height: 1125,
      },
    } satisfies HeroSectionProps,
  },
  {
    type: "featuredCollection",
    enabled: true,
    props: {
      collectionId: "col_home",
      eyebrow: "Featured Collection",
      heading: "Heirloom Home",
      subhead: "Objects that outlast trends.",
      productIds: ["prod_ivory_throw", "prod_cushion_cover", "prod_table_runner"],
      cta: { label: "View the Collection", href: "/collections/heirloom-home" },
    } satisfies FeaturedCollectionProps,
  },
  {
    type: "brandStory",
    enabled: true,
    props: {
      eyebrow: "The Atelier",
      heading: "One pair of hands. No shortcuts.",
      body: "Ms Weaver is a one-woman atelier in Dhaka, Bangladesh. Ashfia Khatun has been crocheting since she was nine years old — taught by her mother's elder sister, who was taught by hers. Every technique in the collection is inherited, refined, or reconstructed from pattern books that predate the internet. The work is slow by design. Made-to-order means your piece does not exist until you ask for it.",
      cta: { label: "Our Story", href: "/about" },
      image: {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80",
        alt: "Ashfia at the atelier workbench, a late afternoon portrait with yarn and tools arranged behind her",
        width: 900,
        height: 1100,
      },
    } satisfies BrandStoryProps,
  },
  {
    type: "processShowcase",
    enabled: true,
    props: {
      eyebrow: "How It Is Made",
      heading: "From fibre to finished piece.",
      steps: [
        {
          number: "01",
          title: "Material selection",
          description:
            "Every yarn is chosen for its specific hand — the way it drapes, its behaviour in water, how it ages. We source Himalayan wool, Belgian linen, and Pima cotton from suppliers we have used for years.",
          image: {
            url: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&auto=format&fit=crop&q=80",
            alt: "Skeins of undyed natural wool arranged on a wooden shelf, textures visible",
            width: 400,
            height: 400,
          },
        },
        {
          number: "02",
          title: "Botanical dyeing",
          description:
            "Where colour is involved, we dye in-house using madder root, marigold, and woad depending on the season. The bath determines the exact result — we never promise a colour chip match.",
          image: {
            url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=600&auto=format&fit=crop&q=80",
            alt: "Marigold flowers steeping in a hot dye bath, the water turning a deep amber",
            width: 400,
            height: 400,
          },
        },
        {
          number: "03",
          title: "Handwork",
          description:
            "Each piece is crocheted entirely by hand, one stitch at a time. There is no machinery involved at any stage. A medium throw requires approximately eighteen to twenty hours of focused work.",
          image: {
            url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80",
            alt: "A crochet hook mid-stitch, the hook drawn through a loop of terracotta wool",
            width: 400,
            height: 400,
          },
        },
        {
          number: "04",
          title: "Finishing & dispatch",
          description:
            "Finished pieces are blocked, pressed, and inspected. Each one is wrapped in unbleached cotton muslin and tied with a length of the same yarn. A hand-written care card is included.",
          image: {
            url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&auto=format&fit=crop&q=80",
            alt: "Finished cream throw folded and wrapped in muslin on a workbench, ready for dispatch",
            width: 400,
            height: 400,
          },
        },
      ],
    } satisfies ProcessShowcaseProps,
  },
  {
    type: "testimonials",
    enabled: true,
    props: {
      heading: "From those who live with the work.",
      subhead: "",
      featuredOnly: true,
    } satisfies TestimonialsProps,
  },
  {
    type: "journalPreview",
    enabled: true,
    props: {
      eyebrow: "From the Journal",
      heading: "Notes from the atelier",
      postIds: ["journal_slowness", "journal_marigold", "journal_atelier_notes"],
      cta: { label: "Read More", href: "/journal" },
    } satisfies JournalPreviewProps,
  },
  {
    type: "newsletter",
    enabled: true,
    props: {
      eyebrow: "The Atelier Letter",
      heading: "Unhurried correspondence.",
      subhead:
        "Occasional notes on new pieces, seasonal dyeing, and the particular quality of a Tuesday morning in the atelier. Never promotional. Always worth reading.",
      placeholder: "Your email address",
      buttonLabel: "Subscribe",
    } satisfies NewsletterProps,
  },
  {
    type: "instagramFeed",
    enabled: true,
    props: {
      eyebrow: "@msweaver.bd",
      heading: "Follow us on Instagram",
      handle: "@msweaver.bd",
      href: "https://instagram.com/msweaver.bd",
      postCount: 6,
      images: [
        {
          url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80",
          alt: "Hands drawing a crochet hook through terracotta yarn mid-stitch, the texture of each loop visible",
          likeCount: 214,
        },
        {
          url: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&auto=format&fit=crop&q=80",
          alt: "Skeins of undyed natural wool arranged in loose coils on a wooden shelf",
          likeCount: 187,
        },
        {
          url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
          alt: "Ivory linen throw draped over a worn oak armchair in warm afternoon light",
          likeCount: 342,
        },
        {
          url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=600&auto=format&fit=crop&q=80",
          alt: "Marigold flowers steeping in a hot dye bath, the water turning a deep amber",
          likeCount: 156,
        },
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80",
          alt: "Natural linen basketweave cushion cover on a cream surface in morning light",
          likeCount: 203,
        },
        {
          url: "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&auto=format&fit=crop&q=80",
          alt: "Ivory Bruges lace table runner centred on a raw oak dining table, candlelight reflecting in the surface",
          likeCount: 178,
        },
      ],
    } satisfies InstagramFeedProps,
  },
];
