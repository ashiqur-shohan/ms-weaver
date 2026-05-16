import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "default" shows the wordmark only; "full" adds the italic subscript */
  variant?: "default" | "full";
  className?: string;
  /** Suppress the link wrapper (e.g. already inside a link) */
  noLink?: boolean;
}

/**
 * MS WEAVER wordmark.
 * Fraunces uppercase, tracking-[0.18em].
 * Optional "HANDWOVEN ELEGANCE" subscript in italic Fraunces (full variant).
 */
export function Logo({ variant = "default", className, noLink }: LogoProps) {
  const content = (
    <span className={cn("flex flex-col items-center gap-0.5", className)}>
      {/* aria-hidden: the parent <Link> already labels the element for SR users. */}
      <span
        aria-hidden={true}
        className="font-serif text-lg font-light uppercase tracking-[0.18em] text-foreground"
      >
        MS WEAVER
      </span>
      {variant === "full" && (
        <span
          aria-hidden={true}
          className="font-serif text-[10px] font-light italic tracking-[0.12em] text-muted-foreground"
        >
          Handwoven Elegance
        </span>
      )}
    </span>
  );

  if (noLink) return content;

  return (
    <Link href="/" aria-label="Ms Weaver — return to homepage">
      {content}
    </Link>
  );
}
