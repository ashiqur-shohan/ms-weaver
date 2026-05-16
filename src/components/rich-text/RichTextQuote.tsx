import { cn } from "@/lib/utils";
import type { QuoteBlock } from "@/lib/mock/journal";

interface RichTextQuoteProps {
  block: QuoteBlock;
  className?: string;
}

export function RichTextQuote({ block, className }: RichTextQuoteProps) {
  return (
    <blockquote
      className={cn(
        "my-12 text-center",
        className,
      )}
    >
      <p className="font-serif text-[22px] font-light italic leading-[30px] text-foreground">
        &ldquo;{block.text}&rdquo;
      </p>
      {block.attribution && (
        <cite className="mt-4 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground not-italic">
          — {block.attribution}
        </cite>
      )}
    </blockquote>
  );
}
