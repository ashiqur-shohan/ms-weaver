// ─── Bespoke consultation requests ────────────────────────────────────────────

export type RequestStatus =
  | "new"
  | "in_review"
  | "proposal_sent"
  | "confirmed"
  | "declined";

export interface CustomRequest {
  id: string;
  status: RequestStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  occasion: string;
  description: string;
  inspirationUrls?: string[];
  preferredMaterials?: string[];
  budget?: { min: number; max: number; currency: "BDT" };
  deadline?: string;
  submittedAt: string;
  respondedAt?: string;
  internalNotes?: string;
}

export const customRequests: CustomRequest[] = [
  {
    id: "req_001",
    status: "proposal_sent",
    customerName: "Fariha Akter",
    customerEmail: "fariha.akter@gmail.com",
    customerPhone: "+880 1822 345678",
    occasion: "Wedding anniversary gift for parents — 40 years",
    description:
      "I would like to commission a large dining table runner for my parents' fortieth anniversary dinner in December. The dining table is solid teak, approximately 240 cm long. The colour of the room is warm — cream walls, brass fixtures. I am thinking ivory or natural linen, something with an openwork border. Budget is flexible; quality is the priority.",
    inspirationUrls: [
      "https://www.pinterest.com/pin/example1",
      "https://www.instagram.com/p/example2",
    ],
    preferredMaterials: ["Mercerised cotton", "Linen"],
    budget: { min: 8000, max: 15000, currency: "BDT" },
    deadline: "2025-12-01T00:00:00.000Z",
    submittedAt: "2025-11-05T13:45:00.000Z",
    respondedAt: "2025-11-07T10:00:00.000Z",
    internalNotes:
      "Sent proposal for 40×240 cm Bruges lace runner in mercerised cotton, ivory. Quoted ৳ 9,800 with ৳ 500 monogram add-on. Awaiting confirmation.",
  },
  {
    id: "req_002",
    status: "in_review",
    customerName: "Shaila Rahman",
    customerEmail: "shaila.rahman@hotmail.com",
    customerPhone: "+880 1933 456789",
    occasion: "Bridal trousseau — personal use",
    description:
      "I am getting married in February and am looking for a complete trousseau set — a veil, a bolero for the reception, and a throw for our new bedroom. Everything in ivory or champagne. The veil should be long and traditional, the bolero quite simple without heavy embellishment. The throw is a gift from my mother and she wants it to last. I have attached some inspiration images.",
    inspirationUrls: ["https://www.pinterest.com/pin/example3"],
    preferredMaterials: ["Mercerised cotton", "Linen-cotton blend"],
    budget: { min: 30000, max: 50000, currency: "BDT" },
    deadline: "2026-01-15T00:00:00.000Z",
    submittedAt: "2025-11-10T09:15:00.000Z",
    internalNotes:
      "Large trousseau commission — potential for ৳ 45,000+ order. Schedule consultation call. Note February wedding deadline.",
  },
  {
    id: "req_003",
    status: "new",
    customerName: "Arif Karim",
    customerEmail: "arif.karim@outlook.com",
    customerPhone: "+880 1711 678901",
    occasion: "Corporate gifting — 12 pieces for hospitality company",
    description:
      "We are a boutique hotel company looking for branded gifting items for our rooms. We would like 12 matching cushion covers in a neutral palette — sand, ivory, or taupe — for our Dhaka flagship property opening in March. The hotel aesthetic is quiet luxury: raw wood, linen, terracotta accents. A simple, unfussy pattern would be ideal. We can discuss branding (a small woven label) if that is something you offer.",
    preferredMaterials: ["Linen-cotton", "Natural cotton"],
    budget: { min: 25000, max: 40000, currency: "BDT" },
    deadline: "2026-02-01T00:00:00.000Z",
    submittedAt: "2025-11-15T11:30:00.000Z",
    internalNotes:
      "New inquiry — corporate/B2B. Could be a recurring relationship. Check feasibility of custom woven label (would need minimum run). Prioritise response.",
  },
];
