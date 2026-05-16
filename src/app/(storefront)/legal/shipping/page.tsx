import type { Metadata } from "next";
import { legalPages } from "@/lib/mock/legal";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Shipping Policy — Ms Weaver",
  description: "Delivery times, charges, and packaging for Ms Weaver orders across Bangladesh and internationally.",
};

export default function ShippingPage() {
  const page = legalPages.shipping;
  return (
    <LegalPageLayout
      title={page.title}
      lastUpdated={page.lastUpdated}
      blocks={page.blocks}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Shipping" },
      ]}
    />
  );
}
