import Link from "next/link";
import { orders } from "@/lib/mock/orders";
import type { OrderStatus } from "@/lib/mock/orders";
import { OrderRow } from "@/components/account/OrderRow";
import { cn } from "@/lib/utils";

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Atelier", value: "in_atelier" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

interface OrdersPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { status } = await searchParams;
  const activeStatus = status ?? "all";

  const sorted = [...orders].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime(),
  );

  const filtered =
    activeStatus === "all"
      ? sorted
      : sorted.filter((o) => o.status === (activeStatus as OrderStatus));

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Your orders
        </p>
        <h1 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
          All orders
        </h1>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter orders by status">
        {STATUS_FILTERS.map(({ label, value }) => (
          <Link
            key={value}
            href={value === "all" ? "/account/orders" : `/account/orders?status=${value}`}
            className={cn(
              "border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-200",
              activeStatus === value
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Orders table (desktop) / list (mobile) */}
      {filtered.length === 0 ? (
        <div className="flex flex-col gap-4 border border-border bg-card px-6 py-12 text-center">
          <p className="text-[15px] leading-[24px] text-muted-foreground">
            No orders match this filter.
          </p>
          <Link
            href="/account/orders"
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            View all orders
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <table className="hidden w-full md:table">
            <thead>
              <tr className="border-b border-border">
                {["Order", "Date", "Items", "Total", "Status", ""].map(
                  (col) => (
                    <th
                      key={col}
                      className="pb-3 pr-6 text-left text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground last:pr-0"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>

          {/* Mobile list */}
          <ul role="list" className="md:hidden">
            {filtered.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
