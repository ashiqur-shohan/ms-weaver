"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/lib/store/checkout";
import { useCartItems } from "@/lib/store/cart";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { AddressStep } from "@/components/checkout/AddressStep";
import { ShippingStep } from "@/components/checkout/ShippingStep";
import { PaymentStep } from "@/components/checkout/PaymentStep";
import { ReviewStep } from "@/components/checkout/ReviewStep";

/**
 * Orchestrates the multi-step checkout flow.
 * Reads active step from the Zustand checkout store.
 * Redirects to /cart if the cart is empty.
 */
export function CheckoutFlow() {
  const { step } = useCheckout();
  const items = useCartItems();
  const router = useRouter();

  // Redirect to cart if no items (and not on step 4 post-order)
  useEffect(() => {
    if (items.length === 0 && step !== 4) {
      router.replace("/cart");
    }
  }, [items.length, step, router]);

  // While redirecting
  if (items.length === 0 && step !== 4) {
    return null;
  }

  const stepLabel =
    step === 1
      ? "Address"
      : step === 2
        ? "Shipping"
        : step === 3
          ? "Payment"
          : "Review";

  return (
    <section aria-label={`Checkout — ${stepLabel}`}>
      <CheckoutLayout>
        <div>
          <CheckoutSteps current={step} />
          <div>
            {step === 1 && <AddressStep />}
            {step === 2 && <ShippingStep />}
            {step === 3 && <PaymentStep />}
            {step === 4 && <ReviewStep />}
          </div>
        </div>
      </CheckoutLayout>
    </section>
  );
}
