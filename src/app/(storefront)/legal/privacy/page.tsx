import type { Metadata } from "next";
import { legalPages } from "@/lib/mock/legal";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Ms Weaver",
  description: "How Ms Weaver collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  const page = legalPages.privacy;
  return (
    <LegalPageLayout
      title={page.title}
      lastUpdated={page.lastUpdated}
      blocks={page.blocks}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Legal", href: "/legal/privacy" },
        { label: page.title },
      ]}
    />
  );
}
