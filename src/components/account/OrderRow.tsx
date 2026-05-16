import Link from "next/link";
import { formatBDT } from "@/lib/utils";
import { OrderStatusBadge } from "./OrderStatusBadge";
import type { Order } from "@/lib/mock/orders";

interface OrderRowProps {
  order: Order;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Single order row — used in the orders list on both desktop (table) and
 * mobile (stacked card). Server component.
 */
export function OrderRow({ order }: OrderRowProps) {
  const itemCount = order.items.reduce((n, i) => n + i.quantity, 0);

  return (
    <>
      {/* Desktop row */}
      <tr className="hidden border-b border-border transition-colors duration-150 hover:bg-muted/40 md:table-row">
        <td className="py-4 pr-6">
          <Link
            href={`/account/orders/${order.id}`}
            className="font-mono text-[13px] font-medium text-foreground underline-offset-4 hover:underline"
          >
            {order.orderNumber}
          </Link>
        </td>
        <td className="py-4 pr-6 text-[13px] text-muted-foreground">
          {formatDate(order.placedAt)}
        </td>
        <td className="py-4 pr-6 text-[13px] text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </td>
        <td className="py-4 pr-6 text-[13px] text-foreground">
          {formatBDT(order.total)}
        </td>
        <td className="py-4 pr-6">
          <OrderStatusBadge status={order.status} />
        </td>
        <td className="py-4 text-right">
          <Link
            href={`/account/orders/${order.id}`}
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            View
          </Link>
        </td>
      </tr>

      {/* Mobile card */}
      <li className="block border-b border-border py-4 md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Link
              href={`/account/orders/${order.id}`}
              className="font-mono text-[13px] font-medium text-foreground underline-offset-4 hover:underline"
            >
              {order.orderNumber}
            </Link>
            <p className="text-[12px] text-muted-foreground">
              {formatDate(order.placedAt)} · {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <OrderStatusBadge status={order.status} />
            <span className="text-[13px] text-foreground">
              {formatBDT(order.total)}
            </span>
          </div>
        </div>
      </li>
    </>
  );
}
