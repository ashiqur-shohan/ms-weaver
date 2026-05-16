import { cn } from "@/lib/utils";
import { TrendUp, TrendDown, Minus } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: Icon;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MetricCard({
  label,
  value,
  delta,
  trend,
  icon: IconComponent,
  className,
}: MetricCardProps) {
  const TrendIcon =
    trend === "up" ? TrendUp : trend === "down" ? TrendDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
        ? "text-red-500"
        : "text-muted-foreground";

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-sm shadow-sm p-4 flex flex-col gap-2",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </span>
        {IconComponent && (
          <IconComponent size={16} className="text-muted-foreground" />
        )}
      </div>

      <div className="font-serif text-[28px] font-light leading-tight tracking-tight text-foreground">
        {value}
      </div>

      {delta && trend && (
        <div className={cn("flex items-center gap-1 text-[12px]", trendColor)}>
          <TrendIcon size={14} />
          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}
