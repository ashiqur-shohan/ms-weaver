import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { collections } from "@/lib/mock/collections";

export const metadata = {
  title: "Collections | Ms Weaver",
  description:
    "Explore the Ms Weaver collections — bridal lace, heirloom home, soft accessories, seasonal pieces, and bespoke commissions.",
};

export default function CollectionsPage() {
  const sorted = [...collections].sort((a, b) => a.order - b.order);

  return (
    <section aria-label="Collections" className="py-16 md:py-24">
      {/* Page header */}
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-4 pb-16 md:pb-24">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              The Atelier
            </p>
            <h1 className="font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-foreground">
              Collections
            </h1>
            <p className="max-w-[52ch] text-[16px] leading-[26px] text-muted-foreground">
              Five bodies of work, each with its own texture and intention.
              Browse by collection or let the pieces speak in their own time.
            </p>
          </div>
        </ScrollReveal>
      </Container>

      {/* Collection rows */}
      <div className="flex flex-col">
        {sorted.map((collection, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={collection.id}
              aria-label={collection.name}
              className="border-t border-border py-24 md:py-32"
            >
              <Container>
                <div
                  className={`grid grid-cols-12 items-center gap-8 md:gap-12 ${
                    isEven ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* Image — 5/12 or 7/12 alternating */}
                  <ScrollReveal
                    className={`col-span-12 md:col-span-7 ${
                      isEven ? "" : "md:[direction:ltr]"
                    }`}
                  >
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="group relative block overflow-hidden"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <div className="aspect-[5/4] overflow-hidden">
                        <Image
                          src={collection.heroImage.url}
                          alt={collection.heroImage.alt}
                          width={collection.heroImage.width}
                          height={collection.heroImage.height}
                          className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 55vw, 100vw"
                        />
                      </div>
                    </Link>
                  </ScrollReveal>

                  {/* Text — 5/12 */}
                  <ScrollReveal
                    delay={0.1}
                    className={`col-span-12 md:col-span-5 ${
                      isEven ? "" : "md:[direction:ltr]"
                    }`}
                  >
                    <div className="flex flex-col gap-6">
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        Collection {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
                        {collection.name}
                      </h2>
                      <p className="text-[14px] leading-[22px] italic text-muted-foreground">
                        {collection.tagline}
                      </p>
                      <p className="text-[16px] leading-[26px] text-muted-foreground line-clamp-3">
                        {collection.description}
                      </p>
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground underline-offset-4 hover:underline transition-colors duration-200"
                      >
                        Explore {collection.name}
                        <ArrowRight
                          size={16}
                          weight="regular"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              </Container>
            </article>
          );
        })}
      </div>
    </section>
  );
}
