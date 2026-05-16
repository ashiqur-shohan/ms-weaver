"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdminCustomRequests } from "@/lib/store/admin/customRequests";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { formatBDT } from "@/lib/utils";
import type { AdminCustomRequest } from "@/lib/store/admin/customRequests";
import type { RequestStatus } from "@/lib/mock/customRequests";

// ─── Status filter tabs ───────────────────────────────────────────────────────

const STATUS_TABS: { label: string; value: RequestStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In Review", value: "in_review" },
  { label: "Proposal Sent", value: "proposal_sent" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Declined", value: "declined" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomRequestsPage() {
  const router = useRouter();
  const requests = useAdminCustomRequests((s) => s.requests);

  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">(
    "all",
  );
  const [showArchived, setShowArchived] = useState(false);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (!showArchived && r.archived) return false;
      if (showArchived && !r.archived) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      return true;
    });
  }, [requests, statusFilter, showArchived]);

  const columns: Column<AdminCustomRequest>[] = [
    {
      key: "submittedAt",
      header: "Date",
      sortable: true,
      render: (r) => (
        <span className="text-[12px] text-muted-foreground">
          {new Date(r.submittedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      sortable: true,
      render: (r) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">
            {r.customerName}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {r.customerEmail}
          </div>
        </div>
      ),
    },
    {
      key: "occasion",
      header: "Project",
      render: (r) => (
        <span className="text-[13px] text-foreground line-clamp-1 max-w-[200px]">
          {r.occasion}
        </span>
      ),
    },
    {
      key: "budget",
      header: "Budget",
      render: (r) => (
        <span className="text-[12px] text-muted-foreground">
          {r.budget
            ? `${formatBDT(r.budget.min)} – ${formatBDT(r.budget.max)}`
            : "—"}
        </span>
      ),
    },
    {
      key: "deadline",
      header: "Timeline",
      render: (r) => (
        <span className="text-[12px] text-muted-foreground">
          {r.deadline
            ? new Date(r.deadline).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusPill status={r.status} />,
    },
    {
      key: "description",
      header: "Preview",
      render: (r) => (
        <span className="text-[12px] text-muted-foreground line-clamp-1 max-w-[200px]">
          {r.description.slice(0, 80)}
          {r.description.length > 80 ? "…" : ""}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="COMMERCE" title="Custom Requests" />

      {/* Status tabs */}
      <div className="flex items-center gap-1 border-b border-border -mx-6 px-6 pb-0">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-3 py-2 text-[12px] font-medium border-b-2 transition-colors ${
              statusFilter === tab.value
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={() => setShowArchived((v) => !v)}
          className={`ml-auto px-3 py-2 text-[12px] font-medium border-b-2 transition-colors ${
            showArchived
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Archived
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        getRowId={(r) => r.id}
        onRowClick={(r) => router.push(`/admin/custom-requests/${r.id}`)}
        emptyState="No requests match your filter."
      />
    </div>
  );
}
