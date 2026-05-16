// ─── About page editorial content ─────────────────────────────────────────────

export interface AboutMaterial {
  id: string;
  name: string;
  origin: string;
  why: string;
  image: {
    url: string;
    alt: string;
  };
}

export interface AtelierImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface AboutPageData {
  hero: {
    image: { url: string; alt: string };
    eyebrow: string;
    headline: string;
    subheadline: string;
  };
  portrait: {
    image: { url: string; alt: string };
    tagline: string;
    eyebrow: string;
    name: string;
    paragraphs: string[];
  };
  philosophy: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    image: { url: string; alt: string };
  };
  materials: {
    eyebrow: string;
    heading: string;
    items: AboutMaterial[];
  };
  gallery: AtelierImage[];
}

export const aboutPage: AboutPageData = {
  hero: {
    image: {
      url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1600&auto=format&fit=crop&q=80",
      alt:
        "Ashfia's hands working a crochet hook through terracotta cotton yarn on a worn linen surface, morning light from the east window of the Dhaka atelier",
    },
    eyebrow: "OUR STORY",
    headline: "A slow practice from Dhaka.",
    subheadline:
      "Every piece is a record of time — counted, worked, and finished by one careful pair of hands.",
  },
  portrait: {
    image: {
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&auto=format&fit=crop&q=80",
      alt:
        "Ashfia Khatun seated at her atelier workbench, afternoon light casting long shadows across a half-finished ivory throw",
    },
    tagline: "Two hands, a hook, and a vocabulary of stitches passed down through generations.",
    eyebrow: "THE MAKER",
    name: "Ashfia Khatun",
    paragraphs: [
      "Ashfia Khatun grew up watching her aunt's hands move through yarn in the particular, unhurried way that only someone who has never needed to rush can manage. She learned crochet not from a book but from watching — stitch after stitch until the pattern lived in muscle memory rather than in diagrams.",
      "After studying textile design at Dhaka University, Ashfia spent three years apprenticed to a weaving cooperative in Rajshahi, where she developed her understanding of natural fibres, regional dyeing traditions, and the structural logic of cloth. It is work that does not appear in the pieces themselves — but it is present in the way they behave, the way they age, the way they feel after a decade of use.",
      "Ms Weaver was founded in 2021 from a spare room in Banani with a hook, a bag of undyed cotton, and the conviction that there was a place in the world for objects made with complete attention. That room is now the atelier. The conviction has not changed.",
      "Each piece is made by Ashfia alone. There are no assistants, no production runs, no minimum quantities. When a piece is finished, it is finished because it is right — not because the deadline has arrived.",
    ],
  },
  philosophy: {
    eyebrow: "OUR PHILOSOPHY",
    heading: "Why hand. Why slow.",
    paragraphs: [
      "There is a question beneath every purchase of a handmade thing: why pay more, wait longer, and choose the thing that will not be replaced by next season? The answer is not nostalgia. It is physics. A piece made by hand carries an irreducible record of its own making. The tension of the thread, the slight variation in stitch gauge across an afternoon's work, the tiny correction in the third row — these are not defects. They are the fingerprint of the maker.",
      "Slow production is not a design choice. It is a consequence of making things well. You cannot crochet a considered piece quickly. The hand must feel the tension, the eye must check the count, the mind must hold the pattern. Speed and attention work in opposition. We have chosen attention.",
      "We use natural fibres exclusively — cotton, linen, and wool — because synthetic fibres do not age, they only wear out. Natural fibres develop over time: cotton softens with washing, linen grows more supple with use, wool builds a patina that nothing artificial can replicate. A Ms Weaver piece is not finished when it leaves the atelier. It continues to become itself in your hands.",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=900&auto=format&fit=crop&q=80",
      alt:
        "Close-up of undyed cotton yarn wound in loose skeins on a wooden rack, the texture of the fibres visible in afternoon light",
    },
  },
  materials: {
    eyebrow: "MATERIALS",
    heading: "Yarn, with a story.",
    items: [
      {
        id: "cotton",
        name: "Cotton",
        origin: "Tangail, Bangladesh",
        why:
          "Tangail cotton has been hand-spun in Bangladesh for centuries. We source from cooperatives that pay artisan spinners directly. The yarn is slightly heavier than commercial cotton — more body, better drape, and a warmth in tone that synthetic cotton never achieves.",
        image: {
          url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&auto=format&fit=crop&q=80",
          alt: "Cream cotton yarn wound around a wooden spindle, the fibres slightly irregular from hand-spinning",
        },
      },
      {
        id: "linen",
        name: "Linen",
        origin: "Belgium via Dhaka",
        why:
          "Linen is the most honest fibre we work with. It has no give, no softness at the start — it earns those qualities over time. We import Belgian linen in natural and undyed form, working it into pieces designed for a lifetime of use: table runners, throws, room dividers. Nothing disposable.",
        image: {
          url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
          alt: "Natural linen yarn skeins arranged on an unfinished oak surface, the long fibres catching light at an angle",
        },
      },
      {
        id: "wool",
        name: "Merino Wool",
        origin: "Australian Merino, dyed in Dhaka",
        why:
          "Our merino is the finest-count we can source — 19 micron. At that count, wool does not itch. It falls against the skin the way cashmere does, but it is more durable and, for our particular climate, more appropriate for the cooler months. We dye it in-house using botanical sources: marigold, madder, pomegranate, indigo.",
        image: {
          url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=600&auto=format&fit=crop&q=80",
          alt:
            "Terracotta-dyed merino wool skeins drying on a line in morning light, the colour shifting from rust to amber across the skein",
        },
      },
    ],
  },
  gallery: [
    {
      id: "g1",
      url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&auto=format&fit=crop&q=80",
      alt: "Atelier workbench with crochet hooks, a tension gauge, and a swatch of cream cotton in progress",
      width: 800,
      height: 1000,
    },
    {
      id: "g2",
      url: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=800&auto=format&fit=crop&q=80",
      alt: "Skeins of undyed merino arranged by weight on a wooden shelf above the dye station",
      width: 800,
      height: 600,
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=800&auto=format&fit=crop&q=80",
      alt: "Marigold flowers steeping in an enamel pot — the beginning of the terracotta dye bath",
      width: 800,
      height: 800,
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80",
      alt: "A row of Clover Armour hooks arranged smallest to largest on a worn linen cloth",
      width: 800,
      height: 600,
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
      alt: "Half-finished ivory throw draped over the back of a wooden chair in afternoon light",
      width: 800,
      height: 1000,
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80",
      alt: "Freshly dyed yellow and ochre skeins hanging to dry on a wooden rack outside the atelier",
      width: 800,
      height: 800,
    },
    {
      id: "g7",
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
      alt: "Close detail of a granny square in sage and cream, the stitch structure sharp and even",
      width: 800,
      height: 800,
    },
    {
      id: "g8",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
      alt: "Cotton yarn skeins in natural and terracotta arranged in a ceramic bowl on the atelier table",
      width: 800,
      height: 600,
    },
  ],
};
