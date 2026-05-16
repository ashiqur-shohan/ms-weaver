import { z } from "zod";
import { BD_DISTRICTS } from "@/lib/data/bd-districts";

// ─── Reusable primitives ───────────────────────────────────────────────────────

const bdPhoneRegex = /^\+?880\s?1\d{9}$|^01\d{9}$/;

const bdPhone = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    bdPhoneRegex,
    "Enter a valid Bangladesh number — e.g. 01712 345678 or +880 1712 345678",
  );

const postalCode = z
  .string()
  .min(1, "Postal code is required")
  .regex(/^\d{4}$/, "Postal code must be 4 digits");

// ─── Address ──────────────────────────────────────────────────────────────────

export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: bdPhone,
  street: z.string().min(4, "Street address is required"),
  area: z.string().min(2, "Area or neighbourhood is required"),
  city: z.string().min(2, "City is required"),
  postalCode,
  district: z
    .string()
    .min(1, "Select a district")
    .refine((val) => (BD_DISTRICTS as readonly string[]).includes(val), {
      message: "Select a valid district",
    }),
});

export type AddressValues = z.infer<typeof addressSchema>;

// ─── Full address step (shipping + optional billing) ──────────────────────────

export const addressStepSchema = z
  .object({
    shipping: addressSchema,
    billingSameAsShipping: z.boolean(),
    billing: addressSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.billingSameAsShipping) {
      const result = addressSchema.safeParse(data.billing);
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({ ...issue, path: ["billing", ...issue.path] });
        }
      }
    }
  });

export type AddressStepValues = z.infer<typeof addressStepSchema>;

// ─── Shipping method ──────────────────────────────────────────────────────────

export const shippingStepSchema = z.object({
  shippingOptionId: z.string().min(1, "Select a shipping method"),
});

export type ShippingStepValues = z.infer<typeof shippingStepSchema>;

// ─── Payment ──────────────────────────────────────────────────────────────────

export const PAYMENT_METHODS = ["bkash", "nagad", "rocket", "cod"] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const paymentStepSchema = z
  .object({
    method: z.enum(PAYMENT_METHODS, {
      error: "Select a payment method",
    }),
    /** Mobile number for bKash / Nagad / Rocket — optional otherwise */
    mobileNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const mfs: readonly string[] = ["bkash", "nagad", "rocket"];
    if (mfs.includes(data.method)) {
      if (!data.mobileNumber || !bdPhoneRegex.test(data.mobileNumber)) {
        ctx.addIssue({
          code: "custom",
          path: ["mobileNumber"],
          message: "Enter a valid Bangladeshi mobile number",
        });
      }
    }
  });

export type PaymentStepValues = z.infer<typeof paymentStepSchema>;

// ─── Full checkout order (Phase 2 backend schema reuse) ───────────────────────

export const orderSchema = z.object({
  address: addressStepSchema,
  shipping: shippingStepSchema,
  payment: paymentStepSchema,
});

export type OrderValues = z.infer<typeof orderSchema>;
