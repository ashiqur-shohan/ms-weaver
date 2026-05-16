// ─── Products ─────────────────────────────────────────────────────────────────

// Image helpers — use these in consumers to avoid noUncheckedIndexedAccess
// errors when accessing p.images[0] directly.

export type ProductStatus = "active" | "draft";
export type CustomOptionType = "select" | "text" | "color";
export type CustomOptionName = "Color" | "Size" | "Yarn" | "Monogram";

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export interface CustomOption {
  name: CustomOptionName;
  type: CustomOptionType;
  values?: string[];
}

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
  stock: number;
}

export interface ProductSeo {
  title: string;
  description: string;
  ogImage: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  story: string;
  price: number;
  compareAtPrice?: number;
  currency: "BDT";
  images: ProductImage[];
  collectionIds: string[];
  categoryId: string;
  materials: string[];
  dimensions: string;
  weight: string;
  care: string[];
  leadTimeDays: number;
  customOptions?: CustomOption[];
  variants?: ProductVariant[];
  stock: number;
  status: ProductStatus;
  tags: string[];
  seo: ProductSeo;
}

export const products: Product[] = [
  {
    id: "prod_ivory_throw",
    slug: "linen-throw-ivory",
    name: "Linen Throw — Ivory",
    story:
      "Worked in a dense shell stitch across a full day's unhurried labour, this throw does not announce itself — it simply improves every room it enters. The yarn is a Belgian linen-cotton blend, undyed, retaining the natural variation that no dye bath can replicate. It softens with every wash and ages into a quality that cannot be bought new.",
    price: 8500,
    compareAtPrice: 9800,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
        alt: "Ivory linen throw folded over the arm of an oak chair in warm afternoon light",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of shell stitch texture in undyed linen-cotton yarn",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80",
        alt: "Ivory throw draped loosely across a linen sofa in afternoon light",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&auto=format&fit=crop&q=80",
        alt: "Detail of the weighted hem and shell-stitch border in natural linen",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_home"],
    categoryId: "throws",
    materials: ["Belgian linen 55%", "Egyptian cotton 45%"],
    dimensions: "130 cm × 180 cm",
    weight: "680 g",
    care: [
      "Hand wash in cool water with mild detergent",
      "Lay flat to dry — do not tumble dry",
      "Iron on medium heat if desired",
      "Dry cleaning not recommended",
    ],
    leadTimeDays: 14,
    customOptions: [
      {
        name: "Color",
        type: "color",
        values: ["Ivory", "Sand", "Stone"],
      },
    ],
    stock: 6,
    status: "active",
    tags: ["throw", "linen", "home", "bestseller"],
    seo: {
      title: "Handwoven Linen Throw — Ivory | Ms Weaver",
      description:
        "Belgian linen-cotton shell-stitch throw, made to order in Dhaka. Ages beautifully with every wash.",
      ogImage:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_bridal_veil",
    slug: "bridal-lace-veil",
    name: "Bridal Lace Veil",
    story:
      "Crocheted entirely in a fine mercerised cotton with a traditional Bangladeshi needle-lace border, this veil carries the quiet authority of something made specifically for one occasion and one person. The motif — a repeating jasmine flower — is drawn from Ashfia's grandmother's pattern book. It arrives pressed and folded in a linen envelope with a hand-written care card.",
    price: 18500,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
        alt: "Delicate crocheted bridal veil with jasmine-motif border draped over a dressing table",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&auto=format&fit=crop&q=80",
        alt: "Detail of needle-lace jasmine motif border on ivory bridal veil",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1522929031089-44e3aa23b6eb?w=800&auto=format&fit=crop&q=80",
        alt: "Bridal veil cascading over a dressing table with a single rose beside it",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop&q=80",
        alt: "Close detail of the mercerised cotton thread catching morning window light",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_bridal"],
    categoryId: "bridal",
    materials: ["Mercerised Egyptian cotton 100%"],
    dimensions: "90 cm × 250 cm",
    weight: "120 g",
    care: [
      "Dry clean only for best preservation",
      "Store rolled in acid-free tissue, never folded",
      "Keep away from direct sunlight",
    ],
    leadTimeDays: 21,
    customOptions: [
      {
        name: "Size",
        type: "select",
        values: ["Single tier 90×180 cm", "Double tier 90×250 cm", "Cathedral length custom"],
      },
      {
        name: "Monogram",
        type: "text",
      },
    ],
    stock: 3,
    status: "active",
    tags: ["bridal", "veil", "lace", "made-to-order"],
    seo: {
      title: "Handcrocheted Bridal Lace Veil | Ms Weaver",
      description:
        "Fine mercerised cotton bridal veil with traditional needle-lace border. Made to order in Dhaka. Each piece unique.",
      ogImage:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_terracotta_beret",
    slug: "wool-beret-terracotta",
    name: "Wool Beret — Terracotta",
    story:
      "A beret that understands its assignment: to sit slightly too far back and make the wearer feel as though they are about to say something interesting. Worked in plant-dyed Himalayan wool in a warm terracotta, the crown is a dense cluster stitch that holds its shape across seasons. The band is double-crocheted for a firm, comfortable fit.",
    price: 3200,
    compareAtPrice: 3800,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1612831127797-9c90e0d7fd4f?w=800&auto=format&fit=crop&q=80",
        alt: "Terracotta wool beret resting on a matte clay surface with loose yarn nearby",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1624623278313-a930126a11c3?w=800&auto=format&fit=crop&q=80",
        alt: "Terracotta beret worn slightly off-centre, photographed against warm stone",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of the dense cluster-stitch crown texture in plant-dyed wool",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop&q=80",
        alt: "Beret and loose skeins of Himalayan wool in terracotta, sage, and ivory",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_accessories", "col_spring"],
    categoryId: "hats",
    materials: ["Plant-dyed Himalayan wool 100%"],
    dimensions: "Fits head circumference 54–58 cm",
    weight: "95 g",
    care: [
      "Hand wash in cool water with wool wash",
      "Block to shape while damp",
      "Dry flat on a towel",
    ],
    leadTimeDays: 7,
    customOptions: [
      {
        name: "Color",
        type: "color",
        values: ["Terracotta", "Sage", "Natural Cream", "Charcoal"],
      },
      {
        name: "Size",
        type: "select",
        values: ["S/M (54–56 cm)", "M/L (56–58 cm)", "Custom"],
      },
    ],
    stock: 12,
    status: "active",
    tags: ["beret", "wool", "accessories", "winter", "plant-dyed"],
    seo: {
      title: "Handmade Wool Beret in Terracotta | Ms Weaver",
      description:
        "Plant-dyed Himalayan wool beret. Cluster-stitch crown, double-crocheted band. Available in four colourways.",
      ogImage:
        "https://images.unsplash.com/photo-1612831127797-9c90e0d7fd4f?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_christening_gown",
    slug: "heirloom-christening-gown",
    name: "Heirloom Christening Gown",
    story:
      "There are objects made for a single occasion and kept for a lifetime. This gown — worked in fine mercerised cotton with a yoke of filet lace — is intended to be stored in a drawer and handed forward. The pattern originated in a Portuguese crocheted christening tradition that Ashfia has been adapting for fifteen years. It comes with a matching bonnet and a linen storage bag embroidered with the child's initials.",
    price: 24000,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&auto=format&fit=crop&q=80",
        alt: "Ivory crocheted heirloom christening gown with filet-lace yoke, folded on a linen surface",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1522929031089-44e3aa23b6eb?w=800&auto=format&fit=crop&q=80",
        alt: "Christening gown and matching bonnet arranged on an ivory linen cloth",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of the filet-lace yoke with scalloped border detail",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
        alt: "The embroidered linen storage bag with monogram beside the christening gown",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_bridal"],
    categoryId: "bridal",
    materials: ["Mercerised cotton 100%", "Linen storage bag included"],
    dimensions: "Newborn to 3 months; custom sizing available",
    weight: "210 g",
    care: [
      "Hand wash in cool water with baby-safe detergent",
      "Dry flat on a clean towel",
      "Press gently with a damp cloth",
      "Store in provided linen bag away from light",
    ],
    leadTimeDays: 28,
    customOptions: [
      {
        name: "Monogram",
        type: "text",
      },
      {
        name: "Size",
        type: "select",
        values: ["Newborn", "0–3 months", "3–6 months", "Custom"],
      },
    ],
    stock: 2,
    status: "active",
    tags: ["bridal", "christening", "heirloom", "made-to-order", "gift"],
    seo: {
      title: "Heirloom Crocheted Christening Gown | Ms Weaver",
      description:
        "Fine cotton filet-lace christening gown with bonnet and monogrammed linen bag. A piece made to last generations.",
      ogImage:
        "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_sage_market_bag",
    slug: "sage-market-bag",
    name: "Sage Market Bag",
    story:
      "A bag that improves with use — each trip to the market loosens the stitch slightly, softens the handles, deepens the colour of the botanical sage dye. Worked in a sturdy open-mesh pattern from a cotton-jute blend, it holds more than it looks like it should. The long handles allow shoulder carry; the natural jute adds a rigidity that keeps the bag from sagging.",
    price: 2800,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591543620767-4a18d90f9834?w=800&auto=format&fit=crop&q=80",
        alt: "Sage green open-mesh market bag resting against a white wall with persimmons spilling out",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
        alt: "Sage market bag carried over the shoulder in warm outdoor light",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
        alt: "Detail of the open-mesh weave structure and natural jute handle join",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop&q=80",
        alt: "The bag flat on a linen surface showing interior capacity and handle length",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_accessories", "col_spring"],
    categoryId: "bags",
    materials: ["Cotton 70%", "Natural jute 30%"],
    dimensions: "38 cm wide × 42 cm tall; handles 60 cm drop",
    weight: "190 g",
    care: [
      "Machine wash cold on gentle cycle",
      "Hang to dry — do not put in dryer",
      "Natural jute fibres may release slight colour when new",
    ],
    leadTimeDays: 7,
    customOptions: [
      {
        name: "Color",
        type: "color",
        values: ["Sage", "Natural", "Terracotta", "Ink Blue"],
      },
    ],
    stock: 18,
    status: "active",
    tags: ["bag", "market bag", "accessories", "sustainable", "cotton"],
    seo: {
      title: "Crocheted Sage Market Bag | Ms Weaver",
      description:
        "Open-mesh cotton-jute market bag in botanical sage. Machine washable. Grows more beautiful with every use.",
      ogImage:
        "https://images.unsplash.com/photo-1591543620767-4a18d90f9834?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_merino_shawl",
    slug: "merino-wrap-shawl-dusk",
    name: "Merino Wrap Shawl — Dusk",
    story:
      "The colour of Dhaka at six in the evening — not quite grey, not quite rose — is what Ashfia was chasing when she commissioned this particular plant-dye run. The shawl is worked in a feather-and-fan lace pattern from superfine merino, draping close to the body without weight. It pins at the shoulder or wraps twice at the waist.",
    price: 6200,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
        alt: "Dusty rose merino shawl draped over a marble surface with a sprig of dried lavender",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
        alt: "Merino shawl wrapped twice at the waist with the lace pattern visible",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of the feather-and-fan lace pattern in superfine merino",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
        alt: "The shawl pinned at the shoulder with a vintage brooch in the dusk light",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_accessories", "col_spring"],
    categoryId: "shawls",
    materials: ["Superfine merino wool 100%"],
    dimensions: "200 cm × 80 cm",
    weight: "310 g",
    care: [
      "Hand wash in cool water with wool wash",
      "Do not wring — roll in a towel to remove excess water",
      "Dry flat to preserve the lace pattern",
    ],
    leadTimeDays: 10,
    customOptions: [
      {
        name: "Color",
        type: "color",
        values: ["Dusk", "Sage", "Ivory", "Storm"],
      },
    ],
    stock: 8,
    status: "active",
    tags: ["shawl", "merino", "accessories", "plant-dyed", "lace"],
    seo: {
      title: "Handcrocheted Merino Wrap Shawl in Dusk | Ms Weaver",
      description:
        "Feather-and-fan lace shawl in superfine merino, plant-dyed to a quiet dusty rose. Light, warm, lasting.",
      ogImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_cushion_cover",
    slug: "crochet-cushion-cover-linen",
    name: "Crochet Cushion Cover — Linen",
    story:
      "Made in a basketweave stitch that casts a subtle shadow across its own surface, this cushion cover changes character as the light moves through the day. The zip closure is concealed at the back; the front face is entirely seamless. It fits a standard 50 × 50 cm insert and is sold as a single cover — the emptiness before the filling is part of the design.",
    price: 3600,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
        alt: "Natural linen basketweave cushion cover on a cream sofa in a light-filled room",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
        alt: "Two cushion covers stacked on a reading chair in afternoon light",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of the basketweave stitch casting subtle shadow across the linen surface",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&auto=format&fit=crop&q=80",
        alt: "The cushion cover from the back showing the concealed zip closure",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_home"],
    categoryId: "home-decor",
    materials: ["Linen 60%", "Cotton 40%"],
    dimensions: "50 cm × 50 cm",
    weight: "240 g",
    care: [
      "Machine wash cool, gentle cycle",
      "Remove cover before washing",
      "Iron slightly damp for best results",
    ],
    leadTimeDays: 10,
    customOptions: [
      {
        name: "Color",
        type: "color",
        values: ["Natural Linen", "Ivory", "Warm Stone", "Soft Sage"],
      },
      {
        name: "Size",
        type: "select",
        values: ["45×45 cm", "50×50 cm", "60×60 cm"],
      },
    ],
    stock: 10,
    status: "active",
    tags: ["cushion", "home", "linen", "cover"],
    seo: {
      title: "Crocheted Linen Cushion Cover | Ms Weaver",
      description:
        "Basketweave stitch linen-cotton cushion cover with concealed zip. Fits 50×50 cm inserts.",
      ogImage:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_table_runner",
    slug: "crochet-table-runner-ivory",
    name: "Table Runner — Ivory",
    story:
      "A table runner is one of the few objects in a home that is used only when something worth celebrating is happening. This one — worked in a Bruges lace pattern — deserves that occasion. The openwork structure allows the wood of a good table to show through while framing it. It is weighted at each end with small shell-stitch borders that keep the runner from shifting.",
    price: 4800,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&auto=format&fit=crop&q=80",
        alt: "Ivory Bruges lace table runner centred on a raw oak dining table with a single candlestick",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
        alt: "Table runner detail showing openwork lace structure allowing oak grain to show through",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
        alt: "Shell-stitch weighted border at each end of the ivory table runner",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
        alt: "Table runner rolled for storage as recommended — showing the clean cotton thread",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_home"],
    categoryId: "home-decor",
    materials: ["Mercerised cotton 100%"],
    dimensions: "40 cm × 150 cm",
    weight: "180 g",
    care: [
      "Hand wash in cool water",
      "Starch lightly and press to restore crispness",
      "Store rolled, not folded",
    ],
    leadTimeDays: 14,
    customOptions: [
      {
        name: "Size",
        type: "select",
        values: ["40×120 cm", "40×150 cm", "40×180 cm", "Custom"],
      },
    ],
    stock: 5,
    status: "active",
    tags: ["table runner", "home", "lace", "entertaining"],
    seo: {
      title: "Handcrocheted Bruges Lace Table Runner — Ivory | Ms Weaver",
      description:
        "Openwork cotton table runner in Bruges lace pattern. For tables that deserve to be dressed slowly.",
      ogImage:
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_bridal_headband",
    slug: "bridal-floral-headband",
    name: "Bridal Floral Headband",
    story:
      "For the bride who wants something to remember rather than something to photograph. Each flower in this headband is individually wired and crocheted, allowing the arrangement to be reset between the ceremony and the reception. The base is wrapped in ivory satin ribbon that ties at the nape — adjustable to any head size, resisted by no hairpin.",
    price: 5500,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522929031089-44e3aa23b6eb?w=800&auto=format&fit=crop&q=80",
        alt: "Crocheted ivory floral headband arranged on a white linen cloth beside a small mirror",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of individually wired crochet flowers in the bridal headband",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&auto=format&fit=crop&q=80",
        alt: "Headband worn with the satin ribbon tied at the nape in a simple bow",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&auto=format&fit=crop&q=80",
        alt: "Detail of petal texture in mercerised cotton showing the craftsmanship of each flower",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_bridal"],
    categoryId: "bridal",
    materials: ["Mercerised cotton 100%", "Florist wire", "Ivory satin ribbon"],
    dimensions: "Adjustable; flowers span approximately 35 cm",
    weight: "85 g",
    care: [
      "Spot clean only — do not submerge",
      "Store in box to preserve flower shape",
      "Wire flowers may be gently reshaped if bent",
    ],
    leadTimeDays: 14,
    customOptions: [
      {
        name: "Color",
        type: "color",
        values: ["Ivory White", "Blush", "Champagne"],
      },
      {
        name: "Monogram",
        type: "text",
      },
    ],
    stock: 4,
    status: "active",
    tags: ["bridal", "headband", "accessories", "wedding"],
    seo: {
      title: "Crocheted Bridal Floral Headband | Ms Weaver",
      description:
        "Hand-crocheted individual flower headband on adjustable satin ribbon. Made to order for your wedding day.",
      ogImage:
        "https://images.unsplash.com/photo-1522929031089-44e3aa23b6eb?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_bespoke_commission",
    slug: "bespoke-commission",
    name: "Bespoke Commission",
    story:
      "Begin with a conversation. Ashfia will ask about the occasion, the space, the person it is for, and the feeling you are trying to create. From there, the atelier develops a proposal — materials, pattern, palette, timeline — and work begins only once both parties are satisfied. Every bespoke piece is one of a kind, documented and signed, never repeated.",
    price: 12000,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
        alt: "Ashfia's hands at work on a half-finished crochet piece, yarn and hooks on a linen surface",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
        alt: "A mood-board arrangement of yarn samples and pattern sketches for a bespoke commission",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1591543620767-4a18d90f9834?w=800&auto=format&fit=crop&q=80",
        alt: "Yarn skeins in terracotta, sage, and undyed linen arranged on a work surface",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1612831127797-9c90e0d7fd4f?w=800&auto=format&fit=crop&q=80",
        alt: "A completed bespoke piece folded with a handwritten care card from Ashfia",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_bespoke"],
    categoryId: "bespoke",
    materials: ["Determined in consultation"],
    dimensions: "As designed",
    weight: "As designed",
    care: ["Care instructions provided with completed piece"],
    leadTimeDays: 60,
    customOptions: [
      {
        name: "Yarn",
        type: "select",
        values: [
          "Linen-cotton",
          "Superfine merino",
          "Himalayan wool",
          "Silk-blend",
          "Cotton",
          "To be discussed",
        ],
      },
      {
        name: "Color",
        type: "text",
      },
    ],
    stock: 99,
    status: "active",
    tags: ["bespoke", "commission", "made-to-order", "custom"],
    seo: {
      title: "Bespoke Crochet Commission | Ms Weaver Atelier",
      description:
        "Commission a one-of-a-kind piece from the Ms Weaver atelier. Begins with a conversation, ends with something irreplaceable.",
      ogImage:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_spring_top",
    slug: "open-stitch-crop-top-sage",
    name: "Open-Stitch Crop Top — Sage",
    story:
      "Worked in a botanical sage cotton on a loose mesh that catches the light without clinging to the body, this top is for the kind of warmth that does not want to be covered. The armholes are finished with a single round of slip stitch — clean, undecorated — and the hem hangs in a slight curve. It is meant to be worn over a slip, or not.",
    price: 4200,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80",
        alt: "Sage green open-mesh crochet crop top on a warm-toned background",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
        alt: "Top worn over a linen slip in outdoor morning light, hem curve visible",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of the open-mesh weave that catches light without clinging",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1591543620767-4a18d90f9834?w=800&auto=format&fit=crop&q=80",
        alt: "Slip-stitch finished armhole and curved hem detail on the sage cotton top",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_spring"],
    categoryId: "garments",
    materials: ["Pima cotton 100%"],
    dimensions: "Available in XS–XL; see size guide",
    weight: "155 g",
    care: [
      "Hand wash cold, gentle",
      "Lay flat to dry — do not stretch while damp",
      "Low iron if needed; do not press mesh flat",
    ],
    leadTimeDays: 14,
    customOptions: [
      {
        name: "Size",
        type: "select",
        values: ["XS", "S", "M", "L", "XL"],
      },
      {
        name: "Color",
        type: "color",
        values: ["Sage", "Dusty Rose", "Natural", "Storm Blue"],
      },
    ],
    stock: 7,
    status: "active",
    tags: ["garment", "top", "spring", "cotton", "mesh"],
    seo: {
      title: "Open-Stitch Crochet Crop Top in Sage | Ms Weaver",
      description:
        "Loose-mesh Pima cotton crop top in botanical sage. For the warm days when less is exactly right.",
      ogImage:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "prod_bridal_shrug",
    slug: "bridal-bolero-shrug-ivory",
    name: "Bridal Bolero — Ivory",
    story:
      "The bolero that disappears into the dress. Worked in fine mercerised cotton with a delicate picot edging, this cover-up adds a layer without adding weight — the kind of garment whose absence you notice but whose presence you do not. It closes at the front with three ivory-covered buttons and opens wide enough to leave the shoulders of most gowns entirely uninterrupted.",
    price: 7800,
    currency: "BDT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
        alt: "Ivory crocheted bolero shrug with picot edge draped over a silk hanger against a white wall",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
        alt: "Bolero worn over a bridal gown, showing where the picot edge meets the shoulder",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
        alt: "Close-up of the three ivory shell buttons at the front closure",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
      {
        url: "https://images.unsplash.com/photo-1522929031089-44e3aa23b6eb?w=800&auto=format&fit=crop&q=80",
        alt: "Detail of picot-stitch edging in mercerised cotton at the sleeve cuff",
        width: 800,
        height: 1000,
        aspectRatio: "4:5",
      },
    ],
    collectionIds: ["col_bridal"],
    categoryId: "bridal",
    materials: ["Mercerised cotton 100%", "Ivory shell buttons"],
    dimensions: "Available in XS–L; cropped to just above the waist",
    weight: "175 g",
    care: [
      "Hand wash in cool water with mild detergent",
      "Do not bleach",
      "Lay flat to dry",
      "Press on reverse with a damp cloth",
    ],
    leadTimeDays: 18,
    customOptions: [
      {
        name: "Size",
        type: "select",
        values: ["XS", "S", "M", "L"],
      },
      {
        name: "Monogram",
        type: "text",
      },
    ],
    stock: 5,
    status: "active",
    tags: ["bridal", "bolero", "shrug", "cover-up", "wedding"],
    seo: {
      title: "Crocheted Bridal Bolero Shrug — Ivory | Ms Weaver",
      description:
        "Fine cotton bolero with picot edging and ivory shell buttons. Adds a layer without adding weight to any bridal look.",
      ogImage:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
    },
  },
];

// ─── Image helpers ────────────────────────────────────────────────────────────

/**
 * Returns the primary (first) image for a product.
 * Throws if the product has no images — callers should never render
 * a product without at least one image in the data layer.
 * Sidesteps `noUncheckedIndexedAccess` for Phase 1B consumers.
 */
export function getPrimaryImage(p: Product): ProductImage {
  const img = p.images[0];
  if (!img) throw new Error(`Product ${p.slug} has no images`);
  return img;
}

/**
 * Returns all images for a product (gallery order preserved).
 */
export function getGalleryImages(p: Product): ProductImage[] {
  return p.images;
}
