import Image from "next/image";
import type { AboutPageData } from "@/lib/mock/about";

interface AboutHeroProps {
  data: AboutPageData["hero"];
}

export function AboutHero({ data }: AboutHeroProps) {
  return (
    <section
      aria-label="About hero"
      className="relative h-[90vh] min-h-[560px] w-full overflow-hidden"
    >
      <Image
        src={data.image.url}
        alt={data.image.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Gradient overlay — bottom-left anchored editorial text */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 md:px-12 md:pb-20 lg:px-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground/80">
            {data.eyebrow}
          </p>
          <h1 className="font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-primary-foreground md:text-[72px] md:leading-[76px] md:tracking-[-0.03em]">
            {data.headline}
          </h1>
          <p className="mt-4 max-w-[50ch] text-[18px] leading-[28px] text-primary-foreground/80">
            {data.subheadline}
          </p>
        </div>
      </div>
    </section>
  );
}
