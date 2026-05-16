// ─── Legal pages mock data ────────────────────────────────────────────────────
// Realistic legal copy for Bangladesh jurisdiction.
// IMPORTANT FOR OWNER REVIEW: This copy has been drafted with reference to
// Bangladesh consumer protection law (Consumer Rights Protection Act 2009) and
// standard e-commerce practice. It is not a substitute for professional legal
// advice. A Bangladeshi lawyer should review before publication.

import type { ContentBlock } from "./journal";

export interface LegalPageData {
  title: string;
  lastUpdated: string;
  blocks: ContentBlock[];
}

export const legalPages: Record<"privacy" | "terms" | "shipping" | "returns", LegalPageData> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "1 January 2026",
    blocks: [
      {
        type: "paragraph",
        text: "Ms Weaver (\"we\", \"our\", \"the atelier\") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and the rights you have under Bangladeshi law, including the Digital Security Act 2018 and relevant provisions of the Consumer Rights Protection Act 2009.",
      },
      {
        type: "heading",
        level: 2,
        text: "What we collect",
      },
      {
        type: "paragraph",
        text: "When you place an order or make an inquiry, we collect: your name, email address, phone number, delivery address, and payment reference number (we do not store full card details). When you visit the website, we collect basic analytics data including page visits and device type. We do not use advertising tracking cookies.",
      },
      {
        type: "heading",
        level: 2,
        text: "How we use your data",
      },
      {
        type: "paragraph",
        text: "We use your data to: process and deliver your order; contact you about your order or a bespoke consultation; send the Atelier Letter if you have subscribed (you may unsubscribe at any time); improve the website and our service. We do not sell, rent, or share your personal data with third parties for marketing purposes.",
      },
      {
        type: "heading",
        level: 2,
        text: "Data retention",
      },
      {
        type: "paragraph",
        text: "We retain order records for 7 years in accordance with Bangladeshi tax and accounting requirements. Email subscription data is held until you unsubscribe. You may request deletion of your personal data at any time by writing to atelier@msweaver.com — we will comply within 30 days, subject to any legal obligations to retain records.",
      },
      {
        type: "heading",
        level: 2,
        text: "Cookies",
      },
      {
        type: "paragraph",
        text: "We use only essential cookies necessary for the website to function (session management, cart persistence). We do not use third-party advertising cookies or social media tracking pixels. Analytics data is anonymised and aggregated.",
      },
      {
        type: "heading",
        level: 2,
        text: "Your rights",
      },
      {
        type: "paragraph",
        text: "You have the right to access the personal data we hold about you, to correct inaccurate data, and to request deletion (subject to retention requirements noted above). To exercise any of these rights, contact us at atelier@msweaver.com or by post at House 14, Road 7, Block C, Banani, Dhaka 1213, Bangladesh.",
      },
      {
        type: "heading",
        level: 2,
        text: "Changes to this policy",
      },
      {
        type: "paragraph",
        text: "We may update this Privacy Policy from time to time. Material changes will be communicated by email to all registered customers. The date of the most recent revision is shown at the top of this page.",
      },
    ],
  },

  terms: {
    title: "Terms & Conditions",
    lastUpdated: "1 January 2026",
    blocks: [
      {
        type: "paragraph",
        text: "These Terms and Conditions govern your use of the Ms Weaver website and your purchase of products from us. By placing an order, you confirm that you have read, understood, and agreed to these terms. Please read them carefully.",
      },
      {
        type: "heading",
        level: 2,
        text: "About us",
      },
      {
        type: "paragraph",
        text: "Ms Weaver is a sole-proprietorship atelier owned and operated by Ashfia Khatun, registered in Bangladesh. Registered address: House 14, Road 7, Block C, Banani, Dhaka 1213, Bangladesh. Contact: atelier@msweaver.com.",
      },
      {
        type: "heading",
        level: 2,
        text: "Orders and contract",
      },
      {
        type: "paragraph",
        text: "All orders are offers to purchase, which we may accept or decline. A contract is formed when we send you an order confirmation email with an estimated completion date. All pieces are made to order; by placing an order you acknowledge the stated lead time. We reserve the right to cancel orders that cannot be fulfilled (for example, due to material unavailability) and will issue a full refund in such cases within 5 business days.",
      },
      {
        type: "heading",
        level: 2,
        text: "Pricing",
      },
      {
        type: "paragraph",
        text: "All prices are displayed in Bangladeshi Taka (BDT). Prices include applicable VAT where required. We make every effort to ensure prices are accurate; in the event of a pricing error, we will contact you before processing your order. You are not obligated to proceed at the corrected price.",
      },
      {
        type: "heading",
        level: 2,
        text: "Intellectual property",
      },
      {
        type: "paragraph",
        text: "All designs, photographs, and written content on this website are the property of Ms Weaver and Ashfia Khatun. You may not reproduce, distribute, or use our content for commercial purposes without prior written permission. Personal, non-commercial sharing (for example, posting a photo of your purchase on social media) is welcome and appreciated.",
      },
      {
        type: "heading",
        level: 2,
        text: "Limitation of liability",
      },
      {
        type: "paragraph",
        text: "Our liability to you in connection with any order shall not exceed the total price paid for that order. We are not liable for indirect losses including loss of income, loss of profit, or loss of opportunity. Nothing in these terms limits our liability for death, personal injury, or fraud.",
      },
      {
        type: "heading",
        level: 2,
        text: "Governing law",
      },
      {
        type: "paragraph",
        text: "These Terms are governed by the laws of Bangladesh. Any dispute arising from these terms or your use of the website shall be subject to the jurisdiction of the courts of Dhaka, Bangladesh.",
      },
    ],
  },

  shipping: {
    title: "Shipping Policy",
    lastUpdated: "1 January 2026",
    blocks: [
      {
        type: "paragraph",
        text: "All Ms Weaver pieces are made to order. Please allow the stated lead time before your piece enters the shipping process. We will notify you by email and SMS when your piece has left the atelier.",
      },
      {
        type: "heading",
        level: 2,
        text: "Dhaka delivery",
      },
      {
        type: "paragraph",
        text: "Within Dhaka (all thanas), we offer same-day or next-day delivery via our trusted local courier partners. Delivery is free on orders above ৳ 5,000. Orders below ৳ 5,000 carry a flat ৳ 100 delivery charge. Cash on delivery is available within Dhaka for orders up to ৳ 15,000.",
      },
      {
        type: "heading",
        level: 2,
        text: "Nationwide shipping",
      },
      {
        type: "paragraph",
        text: "We ship to all 64 districts of Bangladesh via Sundarban Courier or SA Paribahan. Standard nationwide delivery takes 3–5 business days from dispatch. Charges vary by district and parcel weight — you will see the exact charge at checkout before confirming your order. Cash on delivery is available for nationwide orders up to ৳ 10,000.",
      },
      {
        type: "heading",
        level: 2,
        text: "International shipping",
      },
      {
        type: "paragraph",
        text: "We ship internationally on request. Before placing an international order, please contact us at atelier@msweaver.com to confirm shipping costs and timelines to your country. International orders are shipped via DHL Express or FedEx. Duties and import taxes in the destination country are the responsibility of the buyer. Estimated transit time is 5–10 business days.",
      },
      {
        type: "heading",
        level: 2,
        text: "Packaging",
      },
      {
        type: "paragraph",
        text: "All pieces are wrapped in unbleached cotton muslin, placed in an acid-free tissue-lined box, and sealed with a Ms Weaver wax stamp. The outer packaging is recycled kraft cardboard. We do not use plastic fill or bubble wrap. For large or fragile pieces, additional protection is added at no charge.",
      },
      {
        type: "heading",
        level: 2,
        text: "Tracking",
      },
      {
        type: "paragraph",
        text: "All orders include tracking. You will receive your tracking number by email and SMS once the piece has been dispatched. If there is any delay or issue with delivery, contact us at atelier@msweaver.com and we will liaise with the courier on your behalf.",
      },
      {
        type: "heading",
        level: 2,
        text: "Lost or damaged shipments",
      },
      {
        type: "paragraph",
        text: "In the rare event that a piece is lost in transit or arrives damaged, please contact us within 48 hours of the expected delivery date (for lost items) or within 24 hours of receipt (for damaged items), with photographs of the damage and packaging where applicable. We will arrange a replacement or full refund according to the Returns Policy.",
      },
    ],
  },

  returns: {
    title: "Returns & Exchanges",
    lastUpdated: "1 January 2026",
    blocks: [
      {
        type: "paragraph",
        text: "Because every Ms Weaver piece is made to order — crafted for you specifically, in your chosen colour and dimensions — our returns policy is necessarily different from that of a retailer holding stock. Please read it carefully before purchasing.",
      },
      {
        type: "heading",
        level: 2,
        text: "Made-to-order pieces",
      },
      {
        type: "paragraph",
        text: "Standard made-to-order pieces (those ordered in a listed colourway and standard size) may be returned within 7 days of delivery if they arrive in a condition that significantly differs from how they were described on the website, or if there is a demonstrable fault in the making. In such cases, we will offer a full replacement, a repair, or a full refund — at your choice.",
      },
      {
        type: "paragraph",
        text: "Returns for change of mind are not accepted on made-to-order pieces. This is in accordance with the Consumer Rights Protection Act 2009 (Bangladesh), which excludes goods made to a customer's specification from the standard right of return. We encourage you to contact us before ordering if you have any questions about a piece — we are happy to provide additional photographs, swatches, or measurements.",
      },
      {
        type: "heading",
        level: 2,
        text: "Bespoke and custom pieces",
      },
      {
        type: "paragraph",
        text: "Bespoke and custom-commissioned pieces — including bridal pieces and pieces made to specific measurements or unusual specifications — are non-returnable and non-exchangeable unless they arrive with a demonstrable manufacturing defect. We invest significant time in the consultation process precisely to ensure the finished piece meets your brief. Please use the consultation process to resolve any questions before we begin work.",
      },
      {
        type: "heading",
        level: 2,
        text: "Defects and manufacturing faults",
      },
      {
        type: "paragraph",
        text: "We stand behind the quality of every piece we make. If you believe a piece has a manufacturing defect — a structural issue in the crochet, a problem with the construction, a fault in the finishing — please contact us at atelier@msweaver.com within 30 days of receipt with photographs. We will assess the issue and, if confirmed, offer a free repair, a replacement, or a full refund within 14 days of receiving the returned piece.",
      },
      {
        type: "heading",
        level: 2,
        text: "Condition for return",
      },
      {
        type: "paragraph",
        text: "Pieces returned for defect must be returned in their original condition: unwashed, with the care card attached, in the original cotton muslin wrapping where possible. We will provide a prepaid return label for all confirmed defective returns.",
      },
      {
        type: "heading",
        level: 2,
        text: "Refund processing",
      },
      {
        type: "paragraph",
        text: "Approved refunds are processed within 5 business days of receiving the returned piece. Refunds are made to the original payment method. bKash and Nagad refunds may take an additional 1–2 business days to appear in your account. Bank transfer refunds take 3–5 business days.",
      },
      {
        type: "heading",
        level: 2,
        text: "Contact",
      },
      {
        type: "paragraph",
        text: "For all returns, exchanges, or warranty queries, contact us at atelier@msweaver.com or on WhatsApp at +880 1712 345678 (Saturday–Thursday, 10 am–6 pm BST). We aim to respond to all queries within 2 business days.",
      },
    ],
  },
};
