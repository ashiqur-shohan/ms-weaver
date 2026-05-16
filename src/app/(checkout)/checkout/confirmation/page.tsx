import type { Metadata } from "next";
import { ConfirmationContents } from "@/components/checkout/ConfirmationContents";

export const metadata: Metadata = {
  title: "Order Confirmed | Ms Weaver",
  description: "Your order has been received. Ashfia will begin work shortly.",
};

/**
 * Order confirmation page — server shell.
 * The client component reads the order number from searchParams and
 * checkout store for the first-name and email.
 */
export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  return <ConfirmationContents searchParams={searchParams} />;
}
