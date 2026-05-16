"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OrderSummarySidebar } from "@/components/checkout/OrderSummarySidebar";
import { useCartSubtotal } from "@/lib/store/cart";
import { formatBDT } from "@/lib/utils";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

/**
 * Two-column checkout wrapper.
 * Desktop: 7/12 form area + 5/12 sticky sidebar.
 * Mobile: accordion order summary at top + single-column form below.
 *
 * Note on dual OrderSummarySidebar instances:
 * The mobile accordion and desktop sticky aside need the sidebar in two
 * different DOM positions, so two instances are mounted. This causes 2×
 * Zustand subscriptions (negligible overhead) and 2× Next/Image renders —
 * but because both instances share the same image `src` URLs, Next/Image
 * deduplicates the network requests via the built-in image cache. The
 * dual-mount is the simplest correct solution; a portal-based approach would
 * add meaningful complexity for no user-visible gain at this scale.
 */
export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  const subtotal = useCartSubtotal();

  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 py-10 md:px-12">
      <div className="grid grid-cols-12 gap-x-12 gap-y-8 items-start">
        {/* ── Left: form area ───────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-7">
          {/* Mobile order summary accordion */}
          <div className="mb-8 lg:hidden">
            <Accordion type="single" collapsible className="border border-border">
              <AccordionItem value="summary" className="border-0">
                <AccordionTrigger className="px-5 py-4 text-[12px] uppercase tracking-[0.1em] text-foreground hover:no-underline rounded-none">
                  <span>Order Summary</span>
                  <span className="ml-auto mr-3 text-[13px] normal-case tracking-normal font-normal text-muted-foreground">
                    {formatBDT(subtotal)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <OrderSummarySidebar />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Form content */}
          {children}
        </div>

        {/* ── Right: sticky summary (desktop only) ─────────────────────── */}
        <div className="col-span-5 hidden lg:block">
          <div className="sticky top-28">
            <OrderSummarySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
