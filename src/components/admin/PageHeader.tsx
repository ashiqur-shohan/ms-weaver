import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border pb-4 mb-6",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        {eyebrow && (
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            {eyebrow}
          </span>
        )}
        <h1 className="font-serif text-[22px] font-normal leading-tight tracking-[-0.005em] text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-[13px] text-muted-foreground mt-0.5">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}
