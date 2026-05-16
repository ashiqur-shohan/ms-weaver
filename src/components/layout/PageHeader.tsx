import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface PageHeaderProps {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

/**
 * Shared page header pattern: eyebrow + h1 + optional subtitle.
 * Used across all content pages (Journal, Contact, FAQ, Care Guide, etc.)
 * Server component — no interactivity.
 */
export function PageHeader({
  eyebrow,
  heading,
  subtitle,
  className,
  centered = false,
}: PageHeaderProps) {
  return (
    <section
      aria-label="Page header"
      className={cn("py-16 md:py-20 lg:py-24", className)}
    >
      <Container>
        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-foreground">
            {heading}
          </h1>
          {subtitle && (
            <p className="mt-4 text-[18px] leading-[28px] text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
