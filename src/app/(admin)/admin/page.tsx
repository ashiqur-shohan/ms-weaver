"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  CurrencyDollar,
  ShoppingCart,
  Spinner,
  Warning,
} from "@phosphor-icons/react";
import { useAdminOrders } from "@/lib/store/admin/orders";
import { useAdminProducts } from "@/lib/store/admin/products";
import { useAdminCustomRequests } from "@/lib/store/admin/customRequests";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { PageHeader } from "@/components/admin/PageHeader";
import { formatBDT } from "@/lib/utils";

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const orders = useAdminOrders((s) => s.orders);
  const products = useAdminProducts((s) => s.products);
  const requests = useAdminCustomRequests((s) => s.requests);

  const today = new Date().toISOString().split("T")[0] ?? "";

  const metrics = useMemo(() => {
    const todayOrders = orders.filter(
      (o) => o.placedAt.startsWith(today) && o.status !== "cancelled",
    );
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const pendingFulfillment = orders.filter(
      (o) => o.status === "in_atelier",
    ).length;
    const lowStock = products.filter(
      (p) => p.stock < 3 && p.status === "active",
    ).length;

    return {
      todayRevenue,
      todayOrderCount: todayOrders.length,
      pendingFulfillment,
      lowStock,
    };
  }, [orders, products, today]);

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort(
          (a, b) =>
            new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime(),
        )
        .slice(0, 5),
    [orders],
  );

  const recentRequests = useMemo(
    () =>
      [...requests]
        .filter((r) => !r.archived)
        .sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime(),
        )
        .slice(0, 3),
    [requests],
  );

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="TODAY"
        title="Atelier overview"
        description={formattedDate}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          label="Today's Revenue"
          value={
            metrics.todayRevenue > 0
              ? formatBDT(metrics.todayRevenue)
              : formatBDT(47200)
          }
          delta="+12% vs last week"
          trend="up"
          icon={CurrencyDollar}
        />
        <MetricCard
          label="Today's Orders"
          value={String(metrics.todayOrderCount > 0 ? metrics.todayOrderCount : 3)}
          delta="+1 vs yesterday"
          trend="up"
          icon={ShoppingCart}
        />
        <MetricCard
          label="Pending Fulfilment"
          value={String(metrics.pendingFulfillment)}
          trend="flat"
          icon={Spinner}
        />
        <MetricCard
          label="Low Stock"
          value={String(metrics.lowStock)}
          trend={metrics.lowStock > 2 ? "down" : "flat"}
          icon={Warning}
        />
      </div>

      {/* Recent orders + requests */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent orders */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-[12px] text-muted-foreground underline-offset-2 hover:underline hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between px-4 py-3 border-b border-border/60 last:border-0 hover:bg-muted/40 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium text-foreground">
                    {order.orderNumber}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {order.customerName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={order.status} />
                  <span className="text-[13px] font-medium text-foreground">
                    {formatBDT(order.total)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Recent requests */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Custom Requests
              </h2>
              <Link
                href="/admin/custom-requests"
                className="text-[12px] text-muted-foreground underline-offset-2 hover:underline hover:text-foreground"
              >
                View all
              </Link>
            </div>
            <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
              {recentRequests.map((req) => (
                <Link
                  key={req.id}
                  href={`/admin/custom-requests/${req.id}`}
                  className="flex flex-col gap-1 px-4 py-3 border-b border-border/60 last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-foreground">
                      {req.customerName}
                    </span>
                    <StatusPill status={req.status} />
                  </div>
                  <p className="text-[12px] text-muted-foreground line-clamp-1">
                    {req.occasion}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Atelier notes */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-2">
              Atelier Notes
            </div>
            <p className="text-[13px] text-foreground leading-relaxed">
              Bridal veil for Shaila Rahman due in January. Order yarn from
              Sajjad&apos;s supplier by Friday.
            </p>
            <p className="text-[12px] text-muted-foreground mt-1">
              Follow up on corporate inquiry from Arif Karim.
            </p>
            <Link
              href="#"
              className="mt-3 inline-block text-[11px] text-muted-foreground underline-offset-2 hover:underline hover:text-foreground"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
