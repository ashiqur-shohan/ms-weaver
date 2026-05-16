// ─── FAQ mock data ────────────────────────────────────────────────────────────

export type FaqCategory = "Orders" | "Custom" | "Shipping" | "Care";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  // ── Orders ───────────────────────────────────────────────────────────────────
  {
    id: "faq_orders_1",
    category: "Orders",
    question: "Are all pieces made to order?",
    answer:
      "Yes. Every piece in the Ms Weaver collection is made to order. We do not hold finished inventory. This means a typical lead time of 7–21 days depending on the piece and current atelier schedule. When you place an order, you will receive an email confirming the estimated completion date.",
  },
  {
    id: "faq_orders_2",
    category: "Orders",
    question: "Can I specify colour preferences when ordering?",
    answer:
      "For most pieces, yes. The product page will list available colourways — these correspond to our current dye stock. If you have a specific colour in mind that is not listed, you may note it in the order comments and we will contact you to discuss feasibility. Custom colour requests may extend the lead time.",
  },
  {
    id: "faq_orders_3",
    category: "Orders",
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, Visa, Mastercard, and cash on delivery (Dhaka only, orders under ৳ 15,000). For bespoke commissions over ৳ 25,000, we require a 50% deposit at the time of consultation. The remaining balance is due upon completion.",
  },
  {
    id: "faq_orders_4",
    category: "Orders",
    question: "Can I cancel or modify my order?",
    answer:
      "Orders may be cancelled or modified within 24 hours of placement, provided the piece has not yet entered production. After 24 hours, we cannot guarantee cancellation. Please contact us as soon as possible at atelier@msweaver.com if you need to make changes.",
  },
  {
    id: "faq_orders_5",
    category: "Orders",
    question: "Do you offer gift wrapping?",
    answer:
      "Every piece leaves the atelier wrapped in unbleached cotton muslin, tied with a length of the same yarn used in the piece. This is our standard packaging — not an optional add-on. If you would like to include a handwritten note, you may leave the text in the order comments. There is no additional charge for notes.",
  },

  // ── Custom ────────────────────────────────────────────────────────────────────
  {
    id: "faq_custom_1",
    category: "Custom",
    question: "What kinds of bespoke pieces can I commission?",
    answer:
      "We accept commissions across all categories: bridal (veils, accessories, ring cushions), heirloom home (throws, blankets, table runners), apparel (shawls, wraps, tops), and accessories (bags, hats). We also make heirloom gift pieces — christening blankets, anniversary throws — where the story of the piece matters as much as the object.",
  },
  {
    id: "faq_custom_2",
    category: "Custom",
    question: "How does the bespoke consultation process work?",
    answer:
      "You begin by submitting a consultation request through our Custom Order page. Ashfia reviews each request personally and responds within 3 business days with questions, an initial concept note, and a price estimate. If the estimate suits, we schedule a short call or WhatsApp conversation to finalise the details. Work begins once a 50% deposit is received.",
  },
  {
    id: "faq_custom_3",
    category: "Custom",
    question: "Can I request a specific yarn or fibre for a bespoke piece?",
    answer:
      "Yes, within reason. We work primarily with cotton, linen, and merino wool. If you have a specific fibre in mind — bamboo, silk blend, cashmere — we can discuss sourcing. Please note that unusual fibres may require additional sourcing time and cost. We will always be transparent about what is feasible before you commit.",
  },
  {
    id: "faq_custom_4",
    category: "Custom",
    question: "Do bespoke pieces cost more than standard pieces?",
    answer:
      "Usually yes, for two reasons. First, pattern development takes time that is not required for existing designs. Second, bespoke pieces often involve unusual materials or dimensions. Our pricing is transparent: we itemise materials, labour, and any additional costs before you confirm. There are no surprises.",
  },

  // ── Shipping ─────────────────────────────────────────────────────────────────
  {
    id: "faq_shipping_1",
    category: "Shipping",
    question: "Do you ship outside Dhaka?",
    answer:
      "Yes. We ship to all 64 districts of Bangladesh via Sundarban Courier or SA Paribahan. Delivery outside Dhaka typically takes 3–5 business days. We also ship internationally on request — please contact us before placing an order so we can confirm the shipping cost to your country.",
  },
  {
    id: "faq_shipping_2",
    category: "Shipping",
    question: "Is free shipping available?",
    answer:
      "Orders above ৳ 5,000 qualify for free delivery within Dhaka. For orders outside Dhaka, standard shipping charges apply regardless of order value. International orders are quoted individually.",
  },
  {
    id: "faq_shipping_3",
    category: "Shipping",
    question: "How is my order packaged for shipping?",
    answer:
      "Pieces are wrapped in unbleached cotton muslin, placed in an acid-free tissue-lined box, and sealed with a Ms Weaver wax stamp. The outer packaging is a recycled kraft cardboard box. We do not use plastic fill. For fragile or very large pieces, additional padding is added at no charge.",
  },
  {
    id: "faq_shipping_4",
    category: "Shipping",
    question: "Can I track my order?",
    answer:
      "Yes. Once your piece leaves the atelier, you will receive a tracking number by email and SMS. You can track the shipment through the courier's website. If you have any concerns about a delivery, contact us and we will liaise with the courier directly.",
  },

  // ── Care ─────────────────────────────────────────────────────────────────────
  {
    id: "faq_care_1",
    category: "Care",
    question: "Can I machine-wash a Ms Weaver piece?",
    answer:
      "For cotton and linen pieces without fine openwork: a gentle cycle in cool water (30°C maximum) is acceptable. For wool and merino: hand wash only, always. For any piece that has been hand-dyed: hand wash only, cool water, pH-neutral detergent. When in doubt, hand wash — it takes four minutes and causes no harm.",
  },
  {
    id: "faq_care_2",
    category: "Care",
    question: "How do I prevent wool from felting?",
    answer:
      "Wool felts when exposed to heat and agitation simultaneously. Use cool water, avoid rubbing, and lift the piece gently in and out of the water rather than wringing. Press gently in a towel to remove excess water, then reshape and dry flat. Never hang a wet wool piece — it will stretch under its own weight.",
  },
  {
    id: "faq_care_3",
    category: "Care",
    question: "The colours on my piece look different from the photos. Is that normal?",
    answer:
      "Plant-dyed and hand-dyed pieces will always vary slightly from the photos, which are taken under specific light conditions. Small variations between pieces in the same colourway are the nature of botanical dyeing. Over time, naturally dyed colours will shift — always gracefully, never dramatically. We document this as a feature rather than a flaw.",
  },
  {
    id: "faq_care_4",
    category: "Care",
    question: "How should I store my piece long-term?",
    answer:
      "Clean the piece before storing — oils from skin attract moths. Fold loosely (never hang for long-term storage) and place in an unbleached cotton bag. Cedar blocks help deter moths; lavender sachets also work but need refreshing annually. Avoid airtight plastic containers, which trap moisture and can cause mildew. Read our full care guide for detailed instructions.",
  },
];

export const faqCategories: FaqCategory[] = ["Orders", "Custom", "Shipping", "Care"];
