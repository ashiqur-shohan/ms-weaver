import { cn } from "@/lib/utils";

interface AuthFormProps {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared wrapper for auth pages: eyebrow + Fraunces h1 + form body.
 * Server component — no interactivity.
 */
export function AuthForm({ eyebrow, heading, children, className }: AuthFormProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
          {heading}
        </h1>
      </div>
      {children}
    </div>
  );
}
