import { Container } from "./Container";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { RichText } from "@/components/rich-text/RichText";
import type { ContentBlock } from "@/lib/mock/journal";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  blocks: ContentBlock[];
  breadcrumbItems: BreadcrumbItem[];
}

/**
 * Shared layout for all legal pages.
 * Renders title, last-updated date, and RichText body in reading-width column.
 */
export function LegalPageLayout({
  title,
  lastUpdated,
  blocks,
  breadcrumbItems,
}: LegalPageLayoutProps) {
  return (
    <Container className="py-16 md:py-20 lg:py-24">
      <Breadcrumb items={breadcrumbItems} className="mb-10" />

      <div className="mx-auto max-w-[680px]">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
        <h1 className="mb-12 font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-foreground">
          {title}
        </h1>

        <article>
          <RichText blocks={blocks} />
        </article>
      </div>
    </Container>
  );
}
