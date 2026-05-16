import { Container } from "@/components/layout/Container";

interface JournalHeroProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
}

export function JournalHero({ eyebrow, heading, subtitle }: JournalHeroProps) {
  return (
    <section
      aria-label="Journal header"
      className="border-b border-border py-16 md:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-foreground">
            {heading}
          </h1>
          <p className="mt-4 text-[18px] leading-[28px] text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </Container>
    </section>
  );
}
