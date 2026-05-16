import { cn } from "@/lib/utils";
import type { CustomerAddress } from "@/lib/mock/customers";

interface AddressCardProps {
  address: CustomerAddress;
  className?: string;
  /** Show edit/delete no-op actions */
  showActions?: boolean;
}

/**
 * Displays a saved address in a card. Server component.
 */
export function AddressCard({
  address,
  className,
  showActions = true,
}: AddressCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border border-border bg-card p-6",
        className,
      )}
    >
      {/* Label row */}
      <div className="flex items-center gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground">
          {address.label}
        </p>
        {address.isDefault && (
          <span className="border border-foreground px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-foreground">
            Default
          </span>
        )}
      </div>

      {/* Address block */}
      <address className="not-italic">
        <p className="text-[14px] leading-[22px] text-foreground">
          {address.name}
        </p>
        <p className="text-[14px] leading-[22px] text-muted-foreground">
          {address.line1}
        </p>
        {address.line2 && (
          <p className="text-[14px] leading-[22px] text-muted-foreground">
            {address.line2}
          </p>
        )}
        <p className="text-[14px] leading-[22px] text-muted-foreground">
          {address.city}, {address.district} {address.postalCode}
        </p>
        <p className="text-[14px] leading-[22px] text-muted-foreground">
          {address.country}
        </p>
        <p className="mt-1 text-[13px] leading-[20px] text-muted-foreground">
          {address.phone}
        </p>
      </address>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-4 border-t border-border pt-4">
          <button
            onClick={() =>
              console.log("[Ms Weaver] Edit address (Phase 1 stub):", address.label)
            }
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            Edit
          </button>
          {!address.isDefault && (
            <button
              onClick={() =>
                console.log(
                  "[Ms Weaver] Delete address (Phase 1 stub):",
                  address.label,
                )
              }
              className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
