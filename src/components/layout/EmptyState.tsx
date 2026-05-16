import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Generic empty state for filtered lists, search results, etc.
 * Used in ProductGrid when no products match the active filters.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-24 text-center",
        className,
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Nothing here
      </p>
      <h3 className="mt-4 font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
        {title}
      </h3>
      <p className="mt-3 max-w-[36ch] text-[16px] leading-[26px] text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
