// ─── Lookbook mock data ────────────────────────────────────────────────────────

export type LookbookRowType = "full" | "pair" | "triple";

export interface LookbookImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface LookbookRow {
  id: string;
  type: LookbookRowType;
  images: LookbookImage[];
  caption?: string;
  productIds?: string[];
}

export const lookbookRows: LookbookRow[] = [
  {
    id: "lb1",
    type: "full",
    caption: "The Ivory Throw — in its natural setting.",
    productIds: ["prod_ivory_throw"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&auto=format&fit=crop&q=80",
        alt:
          "A cream crochet throw draped across a linen sofa in a sun-filled room, the texture of each stitch visible in afternoon light",
        width: 1600,
        height: 686,
      },
    ],
  },
  {
    id: "lb2",
    type: "pair",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80",
        alt:
          "Sage linen shawl worn loosely over the shoulders of a woman seated beside an open window",
        width: 900,
        height: 900,
      },
      {
        url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=900&auto=format&fit=crop&q=80",
        alt:
          "Detail of a crochet tote bag — the stitchwork in ivory cotton against a stone surface",
        width: 900,
        height: 1125,
      },
    ],
  },
  {
    id: "lb3",
    type: "triple",
    caption: "Process — materials and method.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=700&auto=format&fit=crop&q=80",
        alt:
          "Marigold-dyed merino skein hanging against a whitewashed wall, the colour a warm clear yellow",
        width: 700,
        height: 875,
      },
      {
        url: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=700&auto=format&fit=crop&q=80",
        alt:
          "Undyed cotton skeins soaking in a ceramic vessel before mordanting",
        width: 700,
        height: 875,
      },
      {
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&auto=format&fit=crop&q=80",
        alt:
          "A line of crochet hooks from 2mm to 8mm arranged on a worn linen cloth, morning light raking across them",
        width: 700,
        height: 875,
      },
    ],
  },
  {
    id: "lb4",
    type: "full",
    caption: "Bridal Collection — the veil.",
    productIds: ["prod_bridal_veil"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=80",
        alt:
          "A hand-crocheted bridal veil in finest cotton, the openwork pattern catching the light as it falls from a window",
        width: 1600,
        height: 686,
      },
    ],
  },
  {
    id: "lb5",
    type: "pair",
    productIds: ["prod_terracotta_runner"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80",
        alt:
          "Terracotta table runner in botanical-dyed cotton laid on a raw oak dining table set for two",
        width: 900,
        height: 1125,
      },
      {
        url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=900&auto=format&fit=crop&q=80",
        alt:
          "Close detail of the terracotta runner — the stitch relief casting small shadows in low light",
        width: 900,
        height: 900,
      },
    ],
  },
  {
    id: "lb6",
    type: "triple",
    caption: "Soft accessories — worn and carried.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80",
        alt:
          "Cream crochet beret worn by a woman against a pale stone wall",
        width: 700,
        height: 875,
      },
      {
        url: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?w=700&auto=format&fit=crop&q=80",
        alt:
          "Natural linen tote bag on a wooden bench beside a stack of books and a ceramic cup",
        width: 700,
        height: 875,
      },
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&auto=format&fit=crop&q=80",
        alt:
          "A sage crochet wrap loosely folded on a chair, the colour catching the green of a plant in the background",
        width: 700,
        height: 875,
      },
    ],
  },
];
