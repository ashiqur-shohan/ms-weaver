import { SortDropdown } from "@/components/shop/SortDropdown";

interface ShopHeaderProps {
  totalCount: number;
  filterTrigger: React.ReactNode;
}

/**
 * Shop page header: eyebrow, h1, editorial subtitle, count + sort bar.
 * Server component — SortDropdown is client but only the trigger shell is here.
 * The mobile filter trigger is injected as a prop to keep this component server-safe.
 */
export function ShopHeader({ totalCount, filterTrigger }: ShopHeaderProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Editorial header */}
      <div className="flex flex-col gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          The Atelier
        </p>
        <h1 className="font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-foreground">
          All Pieces
        </h1>
        <p className="max-w-[52ch] text-[16px] leading-[26px] text-muted-foreground">
          Each piece begins as a conversation between thread, hook, and
          intention. Browse the full atelier — made to order in Dhaka, made to
          last a lifetime.
        </p>
      </div>

      {/* Count + sort + filter trigger row */}
      <div className="flex items-center justify-between border-y border-border py-3">
        <p className="text-[13px] leading-[20px] text-muted-foreground">
          {totalCount} pieces · Made to order in Dhaka
        </p>
        <div className="flex items-center gap-3">
          <SortDropdown />
          {/* Mobile filter trigger — passed as prop */}
          <div className="lg:hidden">{filterTrigger}</div>
        </div>
      </div>
    </div>
  );
}
