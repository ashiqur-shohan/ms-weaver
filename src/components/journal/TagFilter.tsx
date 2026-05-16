"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
}

/**
 * Client component — manages tag filter state via URL search params.
 * Tags are stored as ?tag=value&tag=value2 (multi-select).
 */
export function TagFilter({ tags, activeTags }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggleTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll("tag");

    if (current.includes(tag)) {
      // Remove this tag
      params.delete("tag");
      current.filter((t) => t !== tag).forEach((t) => params.append("tag", t));
    } else {
      params.append("tag", tag);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  return (
    <div role="group" aria-label="Filter by tag" className="flex flex-wrap items-center gap-2">
      {activeTags.length > 0 && (
        <button
          onClick={clearAll}
          className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground underline-offset-2 hover:underline transition-colors duration-200"
        >
          Clear
        </button>
      )}
      {tags.map((tag) => {
        const active = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            aria-pressed={active}
            className={cn(
              "h-9 px-4 text-[11px] font-medium uppercase tracking-[0.08em] border transition-colors duration-200",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-foreground hover:border-foreground",
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
