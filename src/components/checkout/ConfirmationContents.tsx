"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react";
import { useCheckout } from "@/lib/store/checkout";
import { shippingOptions } from "@/lib/mock/shipping";
import { formatBDT } from "@/lib/utils";

interface ConfirmationContentsProps {
  searchParams: Promise<{ order?: string }>;
}

/**
 * Confirmation page contents.
 * Reads order number from URL + first name/email from the checkout store.
 * After sessionStorage rehydration, if orderNumber in the store does not
 * match the URL param (e.g., the user navigates directly to /confirmation
 * without completing checkout), they are redirected to the home page.
 *
 * firstName may be null on the very first render (before rehydration); the
 * heading degrades gracefully to "Thank you for your order".
 */
export function ConfirmationContents({ searchParams }: ConfirmationContentsProps) {
  const params = use(searchParams);
  const urlOrder = params.order ?? null;
  const router = useRouter();

  const { firstName, email, shipping, orderNumber, orderTotal, reset } = useCheckout();

  // Redirect to home if the store's orderNumber doesn't match the URL param.
  // We wait one tick (useEffect) so the sessionStorage rehydration can settle
  // before evaluating — this avoids a false redirect on hard refresh.
  useEffect(() => {
    if (orderNumber !== null && urlOrder !== null && orderNumber !== urlOrder) {
      router.replace("/");
    }
    // If both are null (direct visit before rehydration has resolved), also
    // redirect — this prevents a blank confirmation page.
    if (orderNumber === null && urlOrder === null) {
      router.replace("/");
    }
  }, [orderNumber, urlOrder, router]);

  const selectedShipping = shipping
    ? shippingOptions.find((o) => o.id === shipping.shippingOptionId)
    : null;

  // Derive the date string for display
  const orderDate = (() => {
    const orderParam = urlOrder ?? "";
    // Order number format: MSW-YYYYMMDD-XXXX
    const parts = orderParam.split("-");
    if (parts.length >= 2 && parts[1] && parts[1].length === 8) {
      const raw = parts[1];
      const y = raw.slice(0, 4);
      const m = raw.slice(4, 6);
      const d = raw.slice(6, 8);
      const date = new Date(`${y}-${m}-${d}`);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  })();

  // Capitalise first letter defensively — firstName comes from user input
  const displayFirstName =
    firstName
      ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
      : null;

  const displayEmail = email ?? "your email address";
  const displayOrderNumber = urlOrder ?? orderNumber ?? "—";

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[560px] flex-col items-center justify-center px-6 py-20 text-center">
      {/* Icon */}
      <CheckCircle
        size={64}
        weight="regular"
        className="text-accent"
        aria-hidden="true"
      />

      {/* Eyebrow */}
      <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Order Confirmed
      </p>

      {/* Headline — graceful fallback when firstName is not yet available */}
      <h1 className="mt-3 font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
        {displayFirstName
          ? `Thank you, ${displayFirstName}`
          : "Thank you for your order"}
      </h1>

      {/* Order details */}
      <div className="mt-8 w-full border border-border bg-card p-6 text-left">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
              Order number
            </span>
            <span className="font-mono text-[13px] text-foreground">
              {displayOrderNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
              Date
            </span>
            <span className="text-[13px] text-foreground">{orderDate}</span>
          </div>
          {selectedShipping && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
                Shipping
              </span>
              <span className="text-[13px] text-foreground">
                {selectedShipping.label}
              </span>
            </div>
          )}
          {orderTotal !== null && (
            <div className="flex items-center justify-between border-t border-border pt-3 mt-1">
              <span className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
                Total charged
              </span>
              <span className="font-serif text-[16px] font-light text-foreground">
                {formatBDT(orderTotal)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Editorial paragraph */}
      <p className="mt-8 max-w-[44ch] text-[15px] leading-[26px] text-muted-foreground">
        We have received your order and Ashfia will begin work shortly. You will
        hear from us at{" "}
        <span className="text-foreground">{displayEmail}</span> with progress
        updates.
      </p>

      {/* Continue shopping */}
      <Link
        href="/shop"
        onClick={() => reset()}
        className="mt-10 flex h-12 items-center justify-center border border-foreground px-10 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
      >
        Continue shopping
      </Link>
    </div>
  );
}
