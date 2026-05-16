import { JournalCard } from "./JournalCard";
import type { JournalPost } from "@/lib/mock/journal";

interface JournalGridProps {
  posts: JournalPost[];
}

export function JournalGrid({ posts }: JournalGridProps) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-[16px] text-muted-foreground">
        No posts match your selection.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
      {posts.map((post) => (
        <JournalCard key={post.id} post={post} />
      ))}
    </div>
  );
}
