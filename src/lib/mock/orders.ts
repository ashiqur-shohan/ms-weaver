// ─── Orders (admin mock data) ──────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "in_atelier"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  variant?: string;
  customOptions?: Record<string, string>;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: "BDT";
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  placedAt: string;
  fulfilledAt?: string;
}

export const orders: Order[] = [
  {
    id: "ord_001",
    orderNumber: "MSW-2025-0041",
    customerName: "Rahela Chowdhury",
    customerEmail: "rahela.c@gmail.com",
    status: "delivered",
    items: [
      {
        productId: "prod_bridal_veil",
        name: "Bridal Lace Veil",
        quantity: 1,
        price: 18500,
        customOptions: { Monogram: "RC", Size: "Double tier 90×250 cm" },
      },
    ],
    subtotal: 18500,
    shipping: 0,
    tax: 0,
    total: 18500,
    currency: "BDT",
    shippingAddress: {
      name: "Rahela Chowdhury",
      line1: "Flat 4B, Gulshan Heights",
      line2: "Road 11, Gulshan-1",
      city: "Dhaka",
      district: "Dhaka",
      postalCode: "1212",
      country: "Bangladesh",
      phone: "+880 1817 234567",
    },
    billingAddress: {
      name: "Rahela Chowdhury",
      line1: "Flat 4B, Gulshan Heights",
      line2: "Road 11, Gulshan-1",
      city: "Dhaka",
      district: "Dhaka",
      postalCode: "1212",
      country: "Bangladesh",
      phone: "+880 1817 234567",
    },
    paymentMethod: "bKash",
    placedAt: "2025-10-15T09:30:00.000Z",
    fulfilledAt: "2025-10-28T14:00:00.000Z",
  },
  {
    id: "ord_002",
    orderNumber: "MSW-2025-0055",
    customerName: "Tariq Hossain",
    customerEmail: "tariqh@outlook.com",
    status: "shipped",
    items: [
      {
        productId: "prod_table_runner",
        name: "Table Runner — Ivory",
        quantity: 1,
        price: 4800,
        customOptions: { Size: "40×180 cm" },
      },
    ],
    subtotal: 4800,
    shipping: 600,
    tax: 0,
    total: 5400,
    currency: "BDT",
    shippingAddress: {
      name: "Tariq Hossain",
      line1: "12 Brentwood Avenue",
      city: "London",
      district: "Greater London",
      postalCode: "E2 9RT",
      country: "United Kingdom",
      phone: "+44 7911 234567",
    },
    billingAddress: {
      name: "Tariq Hossain",
      line1: "12 Brentwood Avenue",
      city: "London",
      district: "Greater London",
      postalCode: "E2 9RT",
      country: "United Kingdom",
      phone: "+44 7911 234567",
    },
    paymentMethod: "Visa",
    placedAt: "2025-11-02T15:15:00.000Z",
  },
  {
    id: "ord_003",
    orderNumber: "MSW-2025-0062",
    customerName: "Nazia Islam",
    customerEmail: "nazia.islam@yahoo.com",
    status: "in_atelier",
    items: [
      {
        productId: "prod_ivory_throw",
        name: "Linen Throw — Ivory",
        quantity: 2,
        price: 8500,
        customOptions: { Color: "Sand" },
      },
      {
        productId: "prod_cushion_cover",
        name: "Crochet Cushion Cover — Linen",
        quantity: 4,
        price: 3600,
        customOptions: { Color: "Natural Linen", Size: "50×50 cm" },
      },
    ],
    subtotal: 31400,
    shipping: 0,
    tax: 0,
    total: 31400,
    currency: "BDT",
    shippingAddress: {
      name: "Nazia Islam",
      line1: "House 8, Road 4",
      city: "Sylhet",
      district: "Sylhet",
      postalCode: "3100",
      country: "Bangladesh",
      phone: "+880 1612 456789",
    },
    billingAddress: {
      name: "Nazia Islam",
      line1: "House 8, Road 4",
      city: "Sylhet",
      district: "Sylhet",
      postalCode: "3100",
      country: "Bangladesh",
      phone: "+880 1612 456789",
    },
    paymentMethod: "Nagad",
    placedAt: "2025-11-08T11:00:00.000Z",
  },
  {
    id: "ord_004",
    orderNumber: "MSW-2025-0068",
    customerName: "Sumaiya Begum",
    customerEmail: "sumaiya.b@gmail.com",
    status: "pending",
    items: [
      {
        productId: "prod_terracotta_beret",
        name: "Wool Beret — Terracotta",
        quantity: 1,
        price: 3200,
        customOptions: { Color: "Terracotta", Size: "M/L (56–58 cm)" },
      },
      {
        productId: "prod_merino_shawl",
        name: "Merino Wrap Shawl — Dusk",
        quantity: 1,
        price: 6200,
        customOptions: { Color: "Dusk" },
      },
    ],
    subtotal: 9400,
    shipping: 120,
    tax: 0,
    total: 9520,
    currency: "BDT",
    shippingAddress: {
      name: "Sumaiya Begum",
      line1: "Flat 2A, Nasrin Mansion",
      line2: "O R Nizam Road",
      city: "Chattogram",
      district: "Chattogram",
      postalCode: "4000",
      country: "Bangladesh",
      phone: "+880 1744 567890",
    },
    billingAddress: {
      name: "Sumaiya Begum",
      line1: "Flat 2A, Nasrin Mansion",
      line2: "O R Nizam Road",
      city: "Chattogram",
      district: "Chattogram",
      postalCode: "4000",
      country: "Bangladesh",
      phone: "+880 1744 567890",
    },
    paymentMethod: "Cash on Delivery",
    placedAt: "2025-11-14T08:45:00.000Z",
  },
  {
    id: "ord_005",
    orderNumber: "MSW-2025-0073",
    customerName: "Kamrun Nahar",
    customerEmail: "kamrun.nahar@live.com",
    status: "cancelled",
    items: [
      {
        productId: "prod_christening_gown",
        name: "Heirloom Christening Gown",
        quantity: 1,
        price: 24000,
        customOptions: { Monogram: "KN", Size: "0–3 months" },
      },
    ],
    subtotal: 24000,
    shipping: 200,
    tax: 0,
    total: 24200,
    currency: "BDT",
    shippingAddress: {
      name: "Kamrun Nahar",
      line1: "Road 5, Uposhohor",
      city: "Rajshahi",
      district: "Rajshahi",
      postalCode: "6000",
      country: "Bangladesh",
      phone: "+880 1956 345678",
    },
    billingAddress: {
      name: "Kamrun Nahar",
      line1: "Road 5, Uposhohor",
      city: "Rajshahi",
      district: "Rajshahi",
      postalCode: "6000",
      country: "Bangladesh",
      phone: "+880 1956 345678",
    },
    paymentMethod: "bKash",
    placedAt: "2025-10-30T10:30:00.000Z",
  },
];
