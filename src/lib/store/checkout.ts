"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AddressStepValues } from "@/lib/schemas/checkout";
import type { ShippingStepValues } from "@/lib/schemas/checkout";
import type { PaymentStepValues } from "@/lib/schemas/checkout";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckoutStep = 1 | 2 | 3 | 4;

interface CheckoutState {
  step: CheckoutStep;
  address: AddressStepValues | null;
  shipping: ShippingStepValues | null;
  payment: PaymentStepValues | null;
  /** Populated after order is placed — used on confirmation page */
  orderNumber: string | null;
  firstName: string | null;
  email: string | null;
  /** Order total in BDT captured at placement (cart is cleared before confirmation) */
  orderTotal: number | null;
}

interface CheckoutActions {
  setStep: (step: CheckoutStep) => void;
  saveAddress: (data: AddressStepValues) => void;
  saveShipping: (data: ShippingStepValues) => void;
  savePayment: (data: PaymentStepValues) => void;
  placeOrder: (orderNumber: string, total: number) => void;
  reset: () => void;
}

type CheckoutStore = CheckoutState & CheckoutActions;

// ─── Store ────────────────────────────────────────────────────────────────────

const initialState: CheckoutState = {
  step: 1,
  address: null,
  shipping: null,
  payment: null,
  orderNumber: null,
  firstName: null,
  email: null,
  orderTotal: null,
};

/**
 * Persists only the fields needed to render the confirmation page after a
 * browser refresh. Uses sessionStorage (cleared on tab close) rather than
 * localStorage so stale order data never leaks into a future session.
 */
export const useCheckout = create<CheckoutStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      saveAddress: (data) =>
        set({
          address: data,
          // Lift first name + email for confirmation page
          firstName: data.shipping.fullName.split(" ")[0] ?? data.shipping.fullName,
          email: data.shipping.email,
          step: 2,
        }),

      saveShipping: (data) => set({ shipping: data, step: 3 }),

      savePayment: (data) => set({ payment: data, step: 4 }),

      placeOrder: (orderNumber, total) => set({ orderNumber, orderTotal: total, step: 4 }),

      reset: () => set(initialState),
    }),
    {
      name: "msweaver:checkout",
      storage: createJSONStorage(() => sessionStorage),
      // Only persist the minimal slice needed for the confirmation page —
      // the full address/shipping/payment objects stay ephemeral.
      partialize: (state) => ({
        orderNumber: state.orderNumber,
        firstName: state.firstName,
        email: state.email,
        orderTotal: state.orderTotal,
        shipping: state.shipping,
      }),
      skipHydration: true,
    },
  ),
);
