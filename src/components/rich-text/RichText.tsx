import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/lib/mock/journal";
import { RichTextParagraph } from "./RichTextParagraph";
import { RichTextHeading } from "./RichTextHeading";
import { RichTextImage } from "./RichTextImage";
import { RichTextQuote } from "./RichTextQuote";
import { RichTextGallery } from "./RichTextGallery";
import { RichTextFAQ } from "./RichTextFAQ";

interface RichTextProps {
  blocks: ContentBlock[];
  className?: string;
}

/**
 * Server component. Renders a discriminated union of ContentBlock[] into
 * editorial HTML. Used for journal posts, care guide, FAQ, legal pages, etc.
 *
 * Body text is constrained to a 680px reading width via the parent container;
 * image blocks break out via negative margins.
 */
export function RichText({ blocks, className }: RichTextProps) {
  return (
    <div className={cn("rich-text", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <RichTextParagraph key={i} block={block} />;
          case "heading":
            return <RichTextHeading key={i} block={block} />;
          case "image":
            return <RichTextImage key={i} block={block} />;
          case "quote":
            return <RichTextQuote key={i} block={block} />;
          case "gallery":
            return <RichTextGallery key={i} block={block} />;
          case "faq":
            return <RichTextFAQ key={i} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
