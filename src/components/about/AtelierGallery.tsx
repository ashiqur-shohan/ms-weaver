import Image from "next/image";
import { Container } from "@/components/layout/Container";
import type { AtelierImage } from "@/lib/mock/about";

interface AtelierGalleryProps {
  images: AtelierImage[];
}

export function AtelierGallery({ images }: AtelierGalleryProps) {
  return (
    <section
      aria-label="Atelier gallery"
      className="bg-muted/30 py-24 md:py-32 lg:py-40"
    >
      <Container>
        <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          THE ATELIER
        </p>

        {/* Masonry columns */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {images.map((img) => (
            <figure key={img.id} className="overflow-hidden">
              <Image
                src={img.url}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="w-full object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
