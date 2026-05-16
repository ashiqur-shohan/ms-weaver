/**
 * Mock shipping options for the checkout flow.
 * Phase 2: replace with real carrier rates from an API.
 */

export interface ShippingOption {
  id: string;
  label: string;
  description: string;
  /** Days as a display string, e.g. "1-2 days" */
  deliveryWindow: string;
  /** Base price in BDT (paisa-less). 0 = free */
  price: number;
  /** If order subtotal >= freeThreshold, shipping is free. null = never free. */
  freeThreshold: number | null;
  /** If true, only available for Dhaka city deliveries */
  dhakaOnly: boolean;
}

export const shippingOptions: ShippingOption[] = [
  {
    id: "dhaka_standard",
    label: "Standard — Inside Dhaka",
    description: "Doorstep delivery within Dhaka metropolitan area",
    deliveryWindow: "1–2 days",
    price: 150,
    freeThreshold: 5000,
    dhakaOnly: true,
  },
  {
    id: "nationwide_standard",
    label: "Standard — Outside Dhaka",
    description: "Nationwide delivery via courier partner",
    deliveryWindow: "3–5 days",
    price: 250,
    freeThreshold: 8000,
    dhakaOnly: false,
  },
  {
    id: "dhaka_express",
    label: "Express — Next Day (Dhaka only)",
    description: "Order before 2 pm for next-day delivery in Dhaka",
    deliveryWindow: "Next day",
    price: 400,
    freeThreshold: null,
    dhakaOnly: true,
  },
];

/**
 * Resolve the effective shipping cost for a given option and subtotal.
 */
export function resolveShippingCost(
  option: ShippingOption,
  subtotal: number,
): number {
  if (option.freeThreshold !== null && subtotal >= option.freeThreshold) {
    return 0;
  }
  return option.price;
}
