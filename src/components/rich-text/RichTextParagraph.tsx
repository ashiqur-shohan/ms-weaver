import { cn } from "@/lib/utils";
import type { ParagraphBlock } from "@/lib/mock/journal";

interface RichTextParagraphProps {
  block: ParagraphBlock;
  className?: string;
}

export function RichTextParagraph({ block, className }: RichTextParagraphProps) {
  return (
    <p
      className={cn(
        "font-sans text-[18px] leading-[32px] text-foreground mb-8",
        className,
      )}
    >
      {block.text}
    </p>
  );
}
