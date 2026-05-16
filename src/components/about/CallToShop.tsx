import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/layout/Container";

export function CallToShop() {
  return (
    <section
      aria-label="Shop the collection"
      className="bg-card py-24 md:py-32 lg:py-40"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            THE COLLECTION
          </p>
          <h2 className="mx-auto max-w-xl font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
            Each piece, waiting for the right pair of hands.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[18px] leading-[28px] text-muted-foreground">
            Browse the current atelier collection — all made to order, all made
            by one careful maker.
          </p>
          <Link
            href="/shop"
            className="mt-10 inline-flex h-12 items-center gap-2 bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            Discover the Collection
            <ArrowRight size={16} weight="regular" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
