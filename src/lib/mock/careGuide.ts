// ─── Care Guide mock data ─────────────────────────────────────────────────────

import type { ContentBlock } from "./journal";

export interface CareGuideData {
  title: string;
  subtitle: string;
  blocks: ContentBlock[];
}

export const careGuide: CareGuideData = {
  title: "Care Guide",
  subtitle:
    "A Ms Weaver piece is built to outlast a decade of careful use. These notes will help you get there.",
  blocks: [
    {
      type: "paragraph",
      text: "Every piece that leaves the atelier carries a handwritten care card. This guide is the full version of that card — not a list of warnings but a set of practices that, if followed, will keep your piece as good in ten years as it is today. Natural fibres reward attention. They also forgive minor errors, so long as you correct them before they compound.",
    },
    {
      type: "heading",
      level: 2,
      text: "Washing",
    },
    {
      type: "paragraph",
      text: "For wool and merino, hand washing is the only method we recommend. Fill a basin with cool water — not cold, not warm — and add a small measure of pH-neutral wool wash. Submerge the piece and allow it to soak for three to four minutes. Do not rub or wring. Lift the piece in and out of the water gently; the motion that felts wool is friction, not submersion. Press gently to the sides of the basin, never squeeze.",
    },
    {
      type: "paragraph",
      text: "For cotton and linen, a gentle machine cycle in cool water (30°C maximum) is acceptable for most pieces. The exceptions are: pieces with fine openwork or lace detail, and anything that has been hand-dyed botanically. For those, hand washing preserves both the structure and the colour. When hand washing cotton or linen, you may apply a little more pressure than with wool — these fibres do not felt.",
    },
    {
      type: "quote",
      text: "The washing machine has a relationship with handmade textiles that can only be described as hostile.",
      attribution: "Ashfia Khatun",
    },
    {
      type: "heading",
      level: 2,
      text: "Drying",
    },
    {
      type: "paragraph",
      text: "After washing, press — never wring — excess water from the piece by laying it flat on a clean dry towel and rolling the towel up around it. Unroll, then lay the piece flat to dry on a second dry towel, reshaping it gently while still damp. Flat drying is essential for wool pieces in particular, which will stretch and distort if hung while wet. For cotton and linen, flat drying is preferred but brief hanging in shade is acceptable for sturdy pieces without openwork.",
    },
    {
      type: "paragraph",
      text: "Dry out of direct sunlight. Sunlight fades both natural fibres and botanical dyes faster than any other factor. A shaded spot with good airflow is ideal. Never use a tumble dryer — the heat and agitation are the same forces that felt wool and weaken linen.",
    },
    {
      type: "heading",
      level: 2,
      text: "Storage",
    },
    {
      type: "paragraph",
      text: "Before storing any piece for more than a few weeks, wash it first. Oils from skin are invisible to the eye but not to moths. A clean piece is an unattractive piece to any insect. Once clean and completely dry, fold loosely — never tightly — and place in an unbleached cotton bag. Never use plastic bags for long-term storage: they trap moisture and create the conditions for mildew.",
    },
    {
      type: "paragraph",
      text: "Cedar blocks are the most reliable and least intrusive moth deterrent. Place one or two in the storage bag and refresh them by sanding lightly once a year when the scent diminishes. Lavender sachets also work, though they need replacing more often. Both are natural and safe for all fibres.",
    },
    {
      type: "heading",
      level: 2,
      text: "Refresh",
    },
    {
      type: "paragraph",
      text: "Between washes, airing a piece for an hour in a cool, shaded spot removes most odours. Wool in particular is naturally self-cleaning — its lanolin content resists dirt and moisture better than any synthetic fibre. A well-cared-for wool piece rarely needs washing more than two or three times a year, even with regular use. Linen and cotton are slightly more absorbent; monthly washing during heavy use is appropriate.",
    },
    {
      type: "heading",
      level: 2,
      text: "Repairs",
    },
    {
      type: "paragraph",
      text: "Crochet, unlike knitting, does not unravel from a single dropped stitch. If a loop becomes loose or a stitch breaks, the surrounding stitches will hold. Mark the area with a safety pin immediately and contact us. We repair all Ms Weaver pieces at no charge within the first two years, and at cost price thereafter. We keep records of the yarn used in each piece where possible — this means repairs can be nearly invisible.",
    },
    {
      type: "heading",
      level: 2,
      text: "When in doubt",
    },
    {
      type: "faq",
      items: [
        {
          question: "Can I use fabric softener?",
          answer:
            "We would not recommend it. Fabric softener coats fibres with a silicone layer that changes the handle permanently — and not in a way that improves natural fibre. The natural softness of good merino or linen increases with washing over time. You do not need to add it artificially.",
        },
        {
          question: "What if the piece shrinks?",
          answer:
            "For wool: wet the piece thoroughly with cool water, add a small amount of hair conditioner to the rinse water, and gently stretch the piece back to shape while damp. Pin it out flat on a towel and allow it to dry completely before unpinning. This works for minor shrinkage. For cotton and linen, shrinkage that occurs in the first wash is largely permanent — but most of our cotton is pre-washed before we work it, so shrinkage should be minimal.",
        },
        {
          question: "The colour has shifted — is that a defect?",
          answer:
            "No. Plant-dyed and botanical-dyed colours shift over time and with washing. This is the nature of natural dye — the colours are living in a way that synthetic dyes are not. The shift is always towards earth tones: terracotta towards taupe, sage towards straw, indigo towards denim-grey. We consider this ageing, not fading, and it is part of the reason we choose natural dye.",
        },
        {
          question: "I found a moth hole — what do I do?",
          answer:
            "First, isolate the piece in a sealed bag and check other stored textiles. Treat the storage area. Then contact us about repair — we can often work a repair that is invisible or nearly so if the damage is caught early. For future prevention: always store clean, use cedar, and air pieces regularly.",
        },
      ],
    },
  ],
};
