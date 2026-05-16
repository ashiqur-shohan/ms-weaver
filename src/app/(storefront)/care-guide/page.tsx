import type { Metadata } from "next";
import { careGuide } from "@/lib/mock/careGuide";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RichText } from "@/components/rich-text/RichText";

export const metadata: Metadata = {
  title: "Care Guide — Ms Weaver",
  description:
    "How to wash, dry, store, and refresh your Ms Weaver piece so it lasts a decade or more.",
};

export default function CareGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="CARING FOR YOUR PIECE"
        heading={careGuide.title}
        subtitle={careGuide.subtitle}
      />

      <Container className="pb-24 md:pb-32 lg:pb-40">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Care Guide" },
          ]}
          className="mb-12"
        />

        {/* Reading-width article */}
        <article className="mx-auto max-w-[680px]">
          <RichText blocks={careGuide.blocks} />
        </article>
      </Container>
    </>
  );
}
