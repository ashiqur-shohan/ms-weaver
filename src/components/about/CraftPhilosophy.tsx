import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { AboutPageData } from "@/lib/mock/about";

interface CraftPhilosophyProps {
  data: AboutPageData["philosophy"];
}

export function CraftPhilosophy({ data }: CraftPhilosophyProps) {
  return (
    <section
      aria-label="Our philosophy"
      className="bg-muted/30 py-24 md:py-32 lg:py-40"
    >
      <Container>
        <div className="grid grid-cols-12 items-start gap-8 md:gap-12">
          {/* Text — 7/12 */}
          <ScrollReveal className="col-span-12 md:col-span-7" margin="-80px">
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {data.eyebrow}
                </p>
                <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
                  {data.heading}
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

          {/* Image — 5/12 */}
          <ScrollReveal
            className="col-span-12 md:col-span-5"
            delay={0.12}
            margin="-80px"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={data.image.url}
                alt={data.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
