import Image from "next/image";
import type { JournalAuthor } from "@/lib/mock/journal";

interface AuthorBylineProps {
  author: JournalAuthor;
  publishedAt: string;
  readingTimeMin: number;
}

export function AuthorByline({
  author,
  publishedAt,
  readingTimeMin,
}: AuthorBylineProps) {
  const dateFormatted = new Date(publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={author.avatar}
          alt={`Portrait of ${author.name}`}
          fill
          className="object-cover object-top"
          sizes="40px"
        />
      </div>
      <div>
        <p className="text-[13px] font-medium text-foreground">{author.name}</p>
        <p className="text-[12px] text-muted-foreground">
          {author.role} &middot; {dateFormatted} &middot; {readingTimeMin} min read
        </p>
      </div>
    </div>
  );
}
