import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { journalPosts } from "@/lib/mock/journal";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AuthorByline } from "@/components/journal/AuthorByline";
import { JournalCard } from "@/components/journal/JournalCard";
import { RichText } from "@/components/rich-text/RichText";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Ms Weaver Journal`,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImage.url],
    },
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Related posts: same tag, exclude current
  const related = journalPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.tags.some((t) => post.tags.includes(t)),
    )
    .slice(0, 2);

  return (
    <>
      {/* Cover image — full bleed 21:9 */}
      <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Article container */}
      <Container className="py-16 md:py-20 lg:py-32">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: post.title },
          ]}
          className="mb-10"
        />

        {/* Article header — constrained to reading width */}
        <div className="mx-auto max-w-[680px]">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {post.tags.join(" · ")} &middot; {post.readingTimeMin} min read
          </p>
          <h1 className="font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-foreground">
            {post.title}
          </h1>
          <p className="mt-4 text-[18px] leading-[28px] text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-8 border-t border-border pt-8">
            <AuthorByline
              author={post.author}
              publishedAt={post.publishedAt}
              readingTimeMin={post.readingTimeMin}
            />
          </div>
        </div>

        {/* Article body — images break out, text stays at reading width */}
        <article className="mx-auto mt-12 max-w-[680px]">
          <RichText blocks={post.content} />
        </article>

        {/* Continue reading */}
        {related.length > 0 && (
          <section
            aria-label="Continue reading"
            className="mt-24 border-t border-border pt-16"
          >
            <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              CONTINUE READING
            </p>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
              {related.map((p) => (
                <JournalCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
