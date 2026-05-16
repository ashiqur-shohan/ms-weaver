// ─── Customers (admin mock data) ──────────────────────────────────────────────

export type CustomerStatus = "active" | "inactive";

export interface CustomerAddress {
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: CustomerStatus;
  orderCount: number;
  totalSpend: number;
  currency: "BDT";
  savedAddresses: CustomerAddress[];
  joinedAt: string;
  lastOrderAt?: string;
  notes?: string;
  tags: string[];
}

export const customers: Customer[] = [
  {
    id: "cust_001",
    name: "Rahela Chowdhury",
    email: "rahela.c@gmail.com",
    phone: "+880 1817 234567",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80",
    status: "active",
    orderCount: 3,
    totalSpend: 38200,
    currency: "BDT",
    savedAddresses: [
      {
        label: "Home",
        name: "Rahela Chowdhury",
        line1: "Flat 4B, Gulshan Heights",
        line2: "Road 11, Gulshan-1",
        city: "Dhaka",
        district: "Dhaka",
        postalCode: "1212",
        country: "Bangladesh",
        phone: "+880 1817 234567",
        isDefault: true,
      },
    ],
    joinedAt: "2025-06-10T10:00:00.000Z",
    lastOrderAt: "2025-10-15T09:30:00.000Z",
    notes: "Prefers bKash payment. Bridal customer — second purchase a gift set.",
    tags: ["bridal", "repeat-buyer", "vip"],
  },
  {
    id: "cust_002",
    name: "Tariq Hossain",
    email: "tariqh@outlook.com",
    phone: "+44 7911 234567",
    status: "active",
    orderCount: 1,
    totalSpend: 5400,
    currency: "BDT",
    savedAddresses: [
      {
        label: "Home",
        name: "Tariq Hossain",
        line1: "12 Brentwood Avenue",
        city: "London",
        district: "Greater London",
        postalCode: "E2 9RT",
        country: "United Kingdom",
        phone: "+44 7911 234567",
        isDefault: true,
      },
    ],
    joinedAt: "2025-10-28T16:00:00.000Z",
    lastOrderAt: "2025-11-02T15:15:00.000Z",
    notes: "International customer — gifting. Careful with shipping estimates.",
    tags: ["international", "gift-buyer"],
  },
  {
    id: "cust_003",
    name: "Nazia Islam",
    email: "nazia.islam@yahoo.com",
    phone: "+880 1612 456789",
    status: "active",
    orderCount: 2,
    totalSpend: 52800,
    currency: "BDT",
    savedAddresses: [
      {
        label: "Home",
        name: "Nazia Islam",
        line1: "House 8, Road 4",
        city: "Sylhet",
        district: "Sylhet",
        postalCode: "3100",
        country: "Bangladesh",
        phone: "+880 1612 456789",
        isDefault: true,
      },
    ],
    joinedAt: "2025-08-01T12:00:00.000Z",
    lastOrderAt: "2025-11-08T11:00:00.000Z",
    notes: "Interior designer — bulk orders for client projects. Always large orders.",
    tags: ["trade", "bulk-buyer", "interior-design", "vip"],
  },
  {
    id: "cust_004",
    name: "Sumaiya Begum",
    email: "sumaiya.b@gmail.com",
    phone: "+880 1744 567890",
    status: "active",
    orderCount: 1,
    totalSpend: 9520,
    currency: "BDT",
    savedAddresses: [
      {
        label: "Home",
        name: "Sumaiya Begum",
        line1: "Flat 2A, Nasrin Mansion",
        line2: "O R Nizam Road",
        city: "Chattogram",
        district: "Chattogram",
        postalCode: "4000",
        country: "Bangladesh",
        phone: "+880 1744 567890",
        isDefault: true,
      },
    ],
    joinedAt: "2025-11-12T09:00:00.000Z",
    lastOrderAt: "2025-11-14T08:45:00.000Z",
    tags: ["new-customer"],
  },
  {
    id: "cust_005",
    name: "Kamrun Nahar",
    email: "kamrun.nahar@live.com",
    phone: "+880 1956 345678",
    status: "inactive",
    orderCount: 1,
    totalSpend: 0,
    currency: "BDT",
    savedAddresses: [
      {
        label: "Home",
        name: "Kamrun Nahar",
        line1: "Road 5, Uposhohor",
        city: "Rajshahi",
        district: "Rajshahi",
        postalCode: "6000",
        country: "Bangladesh",
        phone: "+880 1956 345678",
        isDefault: true,
      },
    ],
    joinedAt: "2025-10-25T14:00:00.000Z",
    lastOrderAt: "2025-10-30T10:30:00.000Z",
    notes: "Order cancelled — reach out regarding rescheduling christening gown commission.",
    tags: ["cancelled-order", "follow-up"],
  },
];
