import Image from "next/image";
import type { ImageBlock } from "@/lib/mock/journal";

interface RichTextImageProps {
  block: ImageBlock;
}

/**
 * Full-bleed editorial figure with optional caption.
 * Extends beyond the reading column to signal visual emphasis.
 */
export function RichTextImage({ block }: RichTextImageProps) {
  return (
    <figure className="my-12 -mx-6 md:-mx-12 lg:-mx-20">
      <div className="relative w-full overflow-hidden">
        <Image
          src={block.url}
          alt={block.alt}
          width={block.width}
          height={block.height}
          className="w-full object-cover"
          sizes="100vw"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 px-6 md:px-12 lg:px-20 text-[13px] leading-[20px] tracking-[0.01em] text-muted-foreground italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
