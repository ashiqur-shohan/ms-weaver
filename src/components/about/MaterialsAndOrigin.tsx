import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { AboutPageData } from "@/lib/mock/about";

interface MaterialsAndOriginProps {
  data: AboutPageData["materials"];
}

export function MaterialsAndOrigin({ data }: MaterialsAndOriginProps) {
  return (
    <section aria-label="Materials and origin" className="py-24 md:py-32 lg:py-40">
      <Container>
        <ScrollReveal className="mb-12 md:mb-16" margin="-80px">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {data.eyebrow}
          </p>
          <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
            {data.heading}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {data.items.map((material, i) => (
            <ScrollReveal key={material.id} delay={i * 0.08} margin="-80px">
              <article className="flex flex-col gap-5">
                {/* Material image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={material.image.url}
                    alt={material.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Name + origin */}
                <div>
                  <h3 className="font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
                    {material.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {material.origin}
                  </p>
                </div>

                {/* Why it matters */}
                <p className="text-[16px] leading-[26px] text-muted-foreground">
                  {material.why}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
