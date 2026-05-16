"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdminOrders } from "@/lib/store/admin/orders";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { formatBDT } from "@/lib/utils";
import type { Order } from "@/lib/mock/orders";

// ─── Filters ──────────────────────────────────────────────────────────────────

function OrderFilters({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  search,
  setSearch,
}: {
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  dateFilter: string;
  setDateFilter: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Order # or customer email..."
        className="h-8 border-b border-border bg-transparent text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors px-0 w-56"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-8 rounded-sm border border-border bg-card text-[12px] px-2 focus:outline-none focus:border-foreground"
      >
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in_atelier">In Atelier</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="h-8 rounded-sm border border-border bg-card text-[12px] px-2 focus:outline-none focus:border-foreground"
      >
        <option value="all">All time</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const router = useRouter();
  const orders = useAdminOrders((s) => s.orders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    const now = Date.now();
    const cutoff =
      dateFilter === "7d"
        ? now - 7 * 24 * 60 * 60 * 1000
        : dateFilter === "30d"
          ? now - 30 * 24 * 60 * 60 * 1000
          : 0;

    return orders.filter((o) => {
      if (statusFilter && o.status !== statusFilter) return false;
      if (cutoff && new Date(o.placedAt).getTime() < cutoff) return false;
      if (
        search &&
        !o.orderNumber.toLowerCase().includes(search.toLowerCase()) &&
        !o.customerEmail.toLowerCase().includes(search.toLowerCase()) &&
        !o.customerName.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [orders, search, statusFilter, dateFilter]);

  const columns: Column<Order>[] = [
    {
      key: "orderNumber",
      header: "Order #",
      sortable: true,
      render: (o) => (
        <span className="text-[13px] font-medium text-foreground font-mono">
          {o.orderNumber}
        </span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      sortable: true,
      render: (o) => (
        <div>
          <div className="text-[13px] text-foreground">{o.customerName}</div>
          <div className="text-[11px] text-muted-foreground">
            {o.customerEmail}
          </div>
        </div>
      ),
    },
    {
      key: "placedAt",
      header: "Date",
      sortable: true,
      render: (o) => (
        <span className="text-[12px] text-muted-foreground">
          {new Date(o.placedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (o) => (
        <span className="text-[12px] text-muted-foreground">
          {o.items.length}
        </span>
      ),
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      render: (o) => (
        <span className="text-[13px] font-medium text-foreground">
          {formatBDT(o.total)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (o) => <StatusPill status={o.status} />,
    },
    {
      key: "paymentMethod",
      header: "Payment",
      render: (o) => (
        <span className="text-[12px] text-muted-foreground">
          {o.paymentMethod}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="COMMERCE" title="Orders" />

      <DataTable
        columns={columns}
        data={filteredOrders}
        getRowId={(o) => o.id}
        onRowClick={(o) => router.push(`/admin/orders/${o.id}`)}
        filterSlot={
          <OrderFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            search={search}
            setSearch={setSearch}
          />
        }
        emptyState="No orders match your filters."
      />
    </div>
  );
}
