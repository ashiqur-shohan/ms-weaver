import type { Metadata } from "next";
import { legalPages } from "@/lib/mock/legal";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions — Ms Weaver",
  description: "Terms and conditions governing use of the Ms Weaver website and purchases.",
};

export default function TermsPage() {
  const page = legalPages.terms;
  return (
    <LegalPageLayout
      title={page.title}
      lastUpdated={page.lastUpdated}
      blocks={page.blocks}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Legal", href: "/legal/terms" },
        { label: page.title },
      ]}
    />
  );
}
