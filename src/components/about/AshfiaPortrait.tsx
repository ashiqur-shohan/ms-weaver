import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { AboutPageData } from "@/lib/mock/about";

interface AshfiaPortraitProps {
  data: AboutPageData["portrait"];
}

export function AshfiaPortrait({ data }: AshfiaPortraitProps) {
  return (
    <section aria-label="About the maker" className="py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-12 items-start gap-8 md:gap-12">
          {/* Portrait image — 5/12 */}
          <ScrollReveal
            className="col-span-12 md:col-span-5"
            margin="-80px"
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden">
              <Image
                src={data.image.url}
                alt={data.image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </ScrollReveal>

          {/* Editorial text — 7/12 */}
          <ScrollReveal
            className="col-span-12 md:col-span-7 md:pt-8"
            delay={0.12}
            margin="-80px"
          >
            <div className="flex flex-col gap-6">
              <p className="font-serif text-[22px] font-light italic leading-[30px] text-muted-foreground">
                &ldquo;{data.tagline}&rdquo;
              </p>

              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {data.eyebrow}
                </p>
                <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
                  {data.name}
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                {data.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-[18px] leading-[28px] text-muted-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
