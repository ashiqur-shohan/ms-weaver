import { cn } from "@/lib/utils";
import type { HeadingBlock } from "@/lib/mock/journal";

interface RichTextHeadingProps {
  block: HeadingBlock;
  className?: string;
}

export function RichTextHeading({ block, className }: RichTextHeadingProps) {
  if (block.level === 2) {
    return (
      <h2
        className={cn(
          "font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground mt-16 mb-6",
          className,
        )}
      >
        {block.text}
      </h2>
    );
  }

  return (
    <h3
      className={cn(
        "font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground mt-12 mb-4",
        className,
      )}
    >
      {block.text}
    </h3>
  );
}
