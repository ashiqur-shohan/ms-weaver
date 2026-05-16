import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/mock/orders";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "border-border text-muted-foreground bg-muted",
  },
  in_atelier: {
    label: "In Atelier",
    className: "border-accent/40 text-accent bg-accent/10",
  },
  shipped: {
    label: "Shipped",
    className: "border-secondary/40 text-secondary bg-secondary/10",
  },
  delivered: {
    label: "Delivered",
    className: "border-primary/40 text-primary bg-primary/10",
  },
  cancelled: {
    label: "Cancelled",
    className: "border-border text-muted-foreground bg-transparent line-through",
  },
};

/**
 * Status pill — server component.
 * Uses palette tokens; no hardcoded colours.
 */
export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] rounded-none",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
