import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { collections } from "@/lib/mock/collections";
import { products } from "@/lib/mock/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};

  return {
    title: `${collection.name} | Ms Weaver`,
    description: collection.description,
    openGraph: {
      images: [{ url: collection.heroImage.url }],
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) notFound();

  const collectionProducts = products.filter(
    (p) =>
      p.status === "active" && p.collectionIds.includes(collection.id),
  );

  return (
    <>
      {/* Hero band */}
      <section
        aria-label={`${collection.name} collection hero`}
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <Image
          src={collection.heroImage.url}
          alt={collection.heroImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Centred copy */}
        <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/70">
            Collection
          </p>
          <h1 className="font-serif text-[48px] font-light leading-[54px] tracking-[-0.02em] text-white md:text-[64px] md:leading-[70px]">
            {collection.name}
          </h1>
          <p className="text-[14px] italic leading-[22px] text-white/80">
            {collection.tagline}
          </p>
          <p className="max-w-[52ch] text-[16px] leading-[26px] text-white/70">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section
        aria-label={`${collection.name} products`}
        className="py-16 md:py-24"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {collection.name}
              </p>
              <p className="text-[14px] leading-[22px] text-muted-foreground">
                {collectionProducts.length}{" "}
                {collectionProducts.length === 1 ? "piece" : "pieces"} in this
                collection
              </p>
            </div>
          </ScrollReveal>

          <ProductGrid products={collectionProducts} priorityCount={3} />
        </Container>
      </section>
    </>
  );
}
