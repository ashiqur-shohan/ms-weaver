import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { JournalPost } from "@/lib/mock/journal";

interface JournalCardProps {
  post: JournalPost;
  featured?: boolean;
}

export function JournalCard({ post, featured = false }: JournalCardProps) {
  const tag = post.tags[0];

  if (featured) {
    return (
      <article aria-label={`Featured post: ${post.title}`}>
        <Link href={`/journal/${post.slug}`} className="group block">
          {/* Cover image — 3:2 */}
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              sizes="100vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="mt-8 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {tag} &middot; {post.readingTimeMin} min read
              </p>
              <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
                {post.title}
              </h2>
              <p className="mt-4 text-[18px] leading-[28px] text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground underline-offset-4 group-hover:underline">
                Read
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article aria-label={post.title}>
      <Link href={`/journal/${post.slug}`} className="group block">
        {/* Cover image — 3:2 */}
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {tag} &middot; {post.readingTimeMin} min read
          </p>
          <h3 className="font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
            {post.title}
          </h3>
          <p className="mt-3 text-[16px] leading-[26px] text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground underline-offset-4 group-hover:underline">
            Read
            <ArrowRight size={16} weight="regular" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
