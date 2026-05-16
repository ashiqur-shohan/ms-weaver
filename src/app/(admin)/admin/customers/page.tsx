"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdminCustomers } from "@/lib/store/admin/customers";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { formatBDT } from "@/lib/utils";
import type { Customer } from "@/lib/mock/customers";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomersPage() {
  const router = useRouter();
  const customers = useAdminCustomers((s) => s.customers);
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q),
    );
  }, [customers, search]);

  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (c) => (
        <div className="text-[13px] font-medium text-foreground">{c.name}</div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (c) => (
        <span className="text-[12px] text-muted-foreground">{c.email}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (c) => (
        <span className="text-[12px] text-muted-foreground">{c.phone}</span>
      ),
    },
    {
      key: "orderCount",
      header: "Orders",
      sortable: true,
      render: (c) => (
        <span className="text-[13px] text-foreground">{c.orderCount}</span>
      ),
    },
    {
      key: "totalSpend",
      header: "Total spent",
      sortable: true,
      render: (c) => (
        <span className="text-[13px] font-medium text-foreground">
          {formatBDT(c.totalSpend)}
        </span>
      ),
    },
    {
      key: "lastOrderAt",
      header: "Last order",
      sortable: true,
      render: (c) => (
        <span className="text-[12px] text-muted-foreground">
          {c.lastOrderAt
            ? new Date(c.lastOrderAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "—"}
        </span>
      ),
    },
    {
      key: "tags",
      header: "Tags",
      render: (c) => (
        <div className="flex flex-wrap gap-1">
          {c.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {c.tags.length > 3 && (
            <span className="text-[11px] text-muted-foreground">
              +{c.tags.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "notes",
      header: "Notes",
      render: (c) => (
        <span className="text-[12px] text-muted-foreground line-clamp-1 max-w-[180px]">
          {c.notes ?? "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="COMMERCE" title="Customers" />

      <DataTable
        columns={columns}
        data={filteredCustomers}
        getRowId={(c) => c.id}
        onRowClick={(c) => router.push(`/admin/customers/${c.id}`)}
        filterSlot={
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="h-8 border-b border-border bg-transparent text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors px-0 w-64"
          />
        }
        emptyState="No customers found."
      />
    </div>
  );
}
