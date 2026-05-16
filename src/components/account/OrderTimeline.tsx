import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/mock/orders";

interface OrderTimelineProps {
  order: Order;
}

const STAGES: { key: OrderStatus | "fulfilled"; label: string }[] = [
  { key: "pending", label: "Ordered" },
  { key: "in_atelier", label: "In Atelier" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const STATUS_ORDER: Record<string, number> = {
  pending: 0,
  in_atelier: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

function formatDate(dateStr?: string): string | null {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

/**
 * 5-stage visual timeline for an order's fulfilment progress.
 * Cancelled orders show a separate note. Server component.
 */
export function OrderTimeline({ order }: OrderTimelineProps) {
  if (order.status === "cancelled") {
    return (
      <div className="flex flex-col gap-2 border border-border/60 bg-muted/30 px-4 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Order status
        </p>
        <p className="text-[14px] text-muted-foreground line-through">
          This order was cancelled
        </p>
      </div>
    );
  }

  const currentIndex = STATUS_ORDER[order.status] ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        Fulfilment progress
      </p>

      <div className="relative flex items-start gap-0">
        {STAGES.map((stage, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div
              key={stage.key}
              className="flex flex-1 flex-col items-center gap-2"
            >
              {/* Connector line (not for first item) */}
              <div className="relative flex w-full items-center">
                {i > 0 && (
                  <div
                    className={cn(
                      "h-px flex-1",
                      isCompleted ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
                {/* Dot */}
                <div
                  className={cn(
                    "h-3 w-3 shrink-0 rounded-full border-2",
                    isCompleted
                      ? "border-primary bg-primary"
                      : "border-border bg-background",
                    isCurrent && "ring-2 ring-primary/30 ring-offset-1",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                />
                {i < STAGES.length - 1 && (
                  <div
                    className={cn(
                      "h-px flex-1",
                      i < currentIndex ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </div>

              {/* Label + date */}
              <div className="flex flex-col items-center gap-0.5 text-center">
                <span
                  className={cn(
                    "text-[10px] font-medium uppercase tracking-[0.07em]",
                    isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {stage.label}
                </span>
                {isCompleted && i === 0 && (
                  <span className="text-[10px] text-muted-foreground">
                    {formatDate(order.placedAt)}
                  </span>
                )}
                {isCompleted && i === 3 && order.fulfilledAt && (
                  <span className="text-[10px] text-muted-foreground">
                    {formatDate(order.fulfilledAt)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
