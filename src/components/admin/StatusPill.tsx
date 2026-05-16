import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusVariant =
  | "pending"
  | "in_atelier"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "active"
  | "draft"
  | "new"
  | "in_review"
  | "proposal_sent"
  | "confirmed"
  | "declined";

interface StatusPillProps {
  status: StatusVariant;
  className?: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const statusConfig: Record<
  StatusVariant,
  { label: string; classes: string }
> = {
  // Order statuses
  pending: {
    label: "Pending",
    classes: "bg-amber-50 text-amber-700 border-amber-200",
  },
  in_atelier: {
    label: "In Atelier",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
  shipped: {
    label: "Shipped",
    classes: "bg-violet-50 text-violet-700 border-violet-200",
  },
  delivered: {
    label: "Delivered",
    classes: "bg-green-50 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-50 text-red-600 border-red-200",
  },
  // Product statuses
  active: {
    label: "Active",
    classes: "bg-green-50 text-green-700 border-green-200",
  },
  draft: {
    label: "Draft",
    classes: "bg-muted text-muted-foreground border-border",
  },
  // Custom request statuses
  new: {
    label: "New",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
  in_review: {
    label: "In Review",
    classes: "bg-amber-50 text-amber-700 border-amber-200",
  },
  proposal_sent: {
    label: "Proposal Sent",
    classes: "bg-violet-50 text-violet-700 border-violet-200",
  },
  confirmed: {
    label: "Confirmed",
    classes: "bg-green-50 text-green-700 border-green-200",
  },
  declined: {
    label: "Declined",
    classes: "bg-red-50 text-red-600 border-red-200",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status] ?? {
    label: status,
    classes: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em]",
        config.classes,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
