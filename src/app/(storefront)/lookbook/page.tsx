import type { Metadata } from "next";
import { lookbookRows } from "@/lib/mock/lookbook";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LookbookRow } from "@/components/lookbook/LookbookRow";

export const metadata: Metadata = {
  title: "Lookbook — Ms Weaver",
  description:
    "A visual diary of Ms Weaver pieces in their settings. Crochet for the home, the body, the occasion.",
};

export default function LookbookPage() {
  return (
    <>
      <PageHeader
        eyebrow="VISUAL DIARY"
        heading="Lookbook"
        subtitle="Pieces in their settings."
      />

      <Container className="pb-24 md:pb-32 lg:pb-40">
        <div className="flex flex-col gap-10 md:gap-16">
          {lookbookRows.map((row) => (
            <LookbookRow key={row.id} row={row} />
          ))}
        </div>
      </Container>
    </>
  );
}
