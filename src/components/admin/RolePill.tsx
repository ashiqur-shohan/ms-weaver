import { cn } from "@/lib/utils";
import type { StaffRole } from "@/lib/store/admin/staff";

interface RolePillProps {
  role: StaffRole;
  className?: string;
}

const roleConfig: Record<StaffRole, { label: string; classes: string }> = {
  Owner: {
    label: "Owner",
    classes: "bg-amber-50 text-amber-700 border-amber-200",
  },
  Manager: {
    label: "Manager",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
  Editor: {
    label: "Editor",
    classes: "bg-muted text-muted-foreground border-border",
  },
};

export function RolePill({ role, className }: RolePillProps) {
  const config = roleConfig[role];
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
