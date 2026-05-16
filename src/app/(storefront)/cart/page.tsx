import type { Metadata } from "next";
import { CartPageContents } from "@/components/cart/CartPageContents";

export const metadata: Metadata = {
  title: "Your Bag | Ms Weaver",
  description:
    "Review the pieces you have selected. Each item is made to order by Ashfia's hands in the Dhaka atelier.",
};

/**
 * Cart page — server component shell.
 * The interactive contents live in the CartPageContents client component.
 */
export default function CartPage() {
  return (
    <main>
      <CartPageContents />
    </main>
  );
}
