import type { Metadata } from "next";
import { legalPages } from "@/lib/mock/legal";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Returns & Exchanges — Ms Weaver",
  description: "Ms Weaver returns policy — made-to-order and bespoke pieces, defects, and refund processing.",
};

export default function ReturnsPage() {
  const page = legalPages.returns;
  return (
    <LegalPageLayout
      title={page.title}
      lastUpdated={page.lastUpdated}
      blocks={page.blocks}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Returns" },
      ]}
    />
  );
}
