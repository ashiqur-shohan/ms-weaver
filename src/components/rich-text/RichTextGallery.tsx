import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryBlock } from "@/lib/mock/journal";

interface RichTextGalleryProps {
  block: GalleryBlock;
  className?: string;
}

export function RichTextGallery({ block, className }: RichTextGalleryProps) {
  const count = block.images.length;
  const cols = count >= 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <div className={cn("my-10 grid gap-3", cols, className)}>
      {block.images.map((img, i) => (
        <figure key={i} className="overflow-hidden aspect-square">
          <Image
            src={img.url}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </figure>
      ))}
    </div>
  );
}
