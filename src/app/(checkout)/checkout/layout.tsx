import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { CartHydration } from "@/components/layout/CartHydration";
import { CheckoutHydration } from "@/components/checkout/CheckoutHydration";

export const metadata: Metadata = {
  title: "Checkout | Ms Weaver",
  description: "Complete your order. Each piece is made to order in the Dhaka atelier.",
};

/**
 * Checkout layout — deliberately stripped of storefront Header, Footer,
 * AnnouncementBar and Lenis smooth scroll. Monastic clarity per design.md.
 *
 * CartHydration is included so cart items persist during the checkout flow.
 * CartDrawer is intentionally NOT mounted here.
 */
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartHydration />
      <CheckoutHydration />
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        {/* Minimal top bar */}
        <header className="h-16 shrink-0 border-b border-border">
          <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-6 md:px-12">
            <Logo />
            <Link
              href="/cart"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
            >
              Back to bag
            </Link>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}
