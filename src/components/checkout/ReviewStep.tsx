"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCheckout } from "@/lib/store/checkout";
import { useCart, useCartItems, useCartSubtotal } from "@/lib/store/cart";
import { shippingOptions, resolveShippingCost } from "@/lib/mock/shipping";
import { formatBDT } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const PAYMENT_LABELS: Record<string, string> = {
  bkash: "bKash",
  nagad: "Nagad",
  rocket: "Rocket",
  cod: "Cash on Delivery",
};

/**
 * Step 4: Read-only order review before placement.
 * On "PLACE ORDER" generates a fake order number, clears the cart,
 * saves it to checkout store, and navigates to the confirmation page.
 */
export function ReviewStep() {
  const router = useRouter();
  const { address, shipping, payment, placeOrder, setStep } = useCheckout();
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const { clearCart } = useCart();

  const selectedShipping = shipping
    ? shippingOptions.find((o) => o.id === shipping.shippingOptionId)
    : null;

  const shippingCost = selectedShipping
    ? resolveShippingCost(selectedShipping, subtotal)
    : 0;

  const total = subtotal + shippingCost;

  function handlePlaceOrder() {
    // Generate fake order number: MSW-YYYYMMDD-XXXX
    const today = new Date();
    const yyyymmdd = today.toISOString().slice(0, 10).replace(/-/g, "");
    const rand = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `MSW-${yyyymmdd}-${rand}`;

    placeOrder(orderNumber, total);
    clearCart();
    router.push(`/checkout/confirmation?order=${orderNumber}`);
  }

  if (!address || !shipping || !payment) {
    return (
      <div className="py-12 text-center">
        <p className="text-[14px] text-muted-foreground">
          Something went wrong. Please start from the beginning.
        </p>
        <button
          onClick={() => setStep(1)}
          className="mt-6 text-[12px] uppercase tracking-[0.08em] text-foreground underline-offset-4 hover:underline"
        >
          Back to Address
        </button>
      </div>
    );
  }

  const addr = address.shipping;

  return (
    <div>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Review Your Order
      </h2>

      {/* ── Shipping address ─────────────────────────────────────────────── */}
      <ReviewSection
        title="Shipping Address"
        onEdit={() => setStep(1)}
      >
        <p className="text-[14px] leading-[22px] text-foreground">{addr.fullName}</p>
        <p className="text-[14px] leading-[22px] text-muted-foreground">
          {addr.street}, {addr.area}
        </p>
        <p className="text-[14px] leading-[22px] text-muted-foreground">
          {addr.city} {addr.postalCode}, {addr.district}
        </p>
        <p className="text-[14px] leading-[22px] text-muted-foreground">{addr.phone}</p>
        <p className="text-[14px] leading-[22px] text-muted-foreground">{addr.email}</p>
      </ReviewSection>

      {/* ── Shipping method ──────────────────────────────────────────────── */}
      <ReviewSection
        title="Shipping Method"
        onEdit={() => setStep(2)}
        className="mt-8"
      >
        {selectedShipping ? (
          <>
            <p className="text-[14px] text-foreground">{selectedShipping.label}</p>
            <p className="text-[12px] text-muted-foreground">
              {selectedShipping.deliveryWindow} ·{" "}
              {shippingCost === 0 ? "Free" : formatBDT(shippingCost)}
            </p>
          </>
        ) : (
          <p className="text-[14px] text-muted-foreground">Not selected</p>
        )}
      </ReviewSection>

      {/* ── Payment method ───────────────────────────────────────────────── */}
      <ReviewSection
        title="Payment Method"
        onEdit={() => setStep(3)}
        className="mt-8"
      >
        <p className="text-[14px] text-foreground">
          {PAYMENT_LABELS[payment.method] ?? payment.method}
        </p>
        {payment.mobileNumber && (
          <p className="text-[12px] text-muted-foreground">{payment.mobileNumber}</p>
        )}
      </ReviewSection>

      {/* ── Line items ───────────────────────────────────────────────────── */}
      <div className="mt-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Items ({items.length})
        </p>
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.variantId ?? "default"}`}
              className="flex items-center gap-4"
            >
              <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-muted">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-foreground">{item.name}</p>
                {item.customOptions && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {Object.entries(item.customOptions)
                      .filter(([, v]) => v)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" · ")}
                  </p>
                )}
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="shrink-0 text-[14px] text-foreground">
                {formatBDT(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Order totals ─────────────────────────────────────────────────── */}
      <div className="mt-8 border-t border-border pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">Subtotal</span>
          <span className="text-[13px] text-foreground">{formatBDT(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">Shipping</span>
          <span className="text-[13px] text-foreground">
            {shippingCost === 0 ? "Free" : formatBDT(shippingCost)}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between pt-1">
          <span className="text-[14px] font-medium text-foreground">Total</span>
          <span className="font-serif text-[22px] font-light tracking-[-0.01em] text-foreground">
            {formatBDT(total)}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="flex h-12 items-center justify-center border border-border px-8 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-200 hover:border-foreground"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="flex h-14 flex-1 items-center justify-center bg-primary text-[12px] font-medium uppercase tracking-[0.08em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

interface ReviewSectionProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
  className?: string;
}

function ReviewSection({ title, onEdit, children, className }: ReviewSectionProps) {
  return (
    <div className={`border border-border p-5 ${className ?? ""}`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </p>
        <button
          type="button"
          onClick={onEdit}
          className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
