import type { Metadata } from "next";
import { Suspense } from "react";
import { journalPosts } from "@/lib/mock/journal";
import { Container } from "@/components/layout/Container";
import { JournalHero } from "@/components/journal/JournalHero";
import { JournalCard } from "@/components/journal/JournalCard";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { TagFilter } from "@/components/journal/TagFilter";

export const metadata: Metadata = {
  title: "The Journal — Ms Weaver",
  description:
    "Notes from the atelier. On slow craft, botanical dyeing, material choices, and the objects we make to last.",
};

interface JournalPageProps {
  searchParams: Promise<{ tag?: string | string[] }>;
}

// Collect all unique tags across posts
const allTags = Array.from(
  new Set(journalPosts.flatMap((p) => p.tags)),
).sort();

function JournalContent({ activeTags }: { activeTags: string[] }) {
  const filtered =
    activeTags.length > 0
      ? journalPosts.filter((p) => p.tags.some((t) => activeTags.includes(t)))
      : journalPosts;

  const [featured, ...rest] = filtered;

  return (
    <Container className="py-16 md:py-20 lg:py-24">
      {/* Tag filter row */}
      <div className="mb-12 border-b border-border pb-8">
        <TagFilter tags={allTags} activeTags={activeTags} />
      </div>

      {/* Featured post */}
      {featured && (
        <div className="mb-20 border-b border-border pb-20">
          <JournalCard post={featured} featured />
        </div>
      )}

      {/* Remaining posts grid */}
      {rest.length > 0 && <JournalGrid posts={rest} />}
    </Container>
  );
}

export default async function JournalPage({ searchParams }: JournalPageProps) {
  const params = await searchParams;
  const rawTags = params.tag;
  const activeTags: string[] = rawTags
    ? Array.isArray(rawTags)
      ? rawTags
      : [rawTags]
    : [];

  return (
    <>
      <JournalHero
        eyebrow="FROM THE ATELIER"
        heading="The Journal"
        subtitle="Notes on slow craft, seasonal dyeing, material choices, and the objects we make to last."
      />
      <Suspense fallback={null}>
        <JournalContent activeTags={activeTags} />
      </Suspense>
    </>
  );
}
