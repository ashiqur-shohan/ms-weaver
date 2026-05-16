"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DotsThreeVertical, Plus } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminPages } from "@/lib/store/admin/pages";
import type { AdminPage } from "@/lib/store/admin/pages";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PagesPage() {
  const router = useRouter();
  const { pages, addPage, deletePage } = useAdminPages();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleNewPage = () => {
    const id = `page_${Date.now()}`;
    addPage({
      id,
      slug: `untitled-${Date.now()}`,
      title: "Untitled page",
      blocks: [],
      seo: { metaTitle: "", metaDescription: "", ogImage: "" },
      status: "draft",
      updatedAt: new Date().toISOString(),
    });
    router.push(`/admin/pages/${id}`);
  };

  const columns: Column<AdminPage>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (p) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">{p.title}</div>
          <div className="text-[11px] text-muted-foreground font-mono">/{p.slug}</div>
        </div>
      ),
    },
    {
      key: "blocks",
      header: "Blocks",
      render: (p) => (
        <span className="text-[12px] text-muted-foreground">{p.blocks.length}</span>
      ),
    },
    {
      key: "updatedAt",
      header: "Last updated",
      sortable: true,
      render: (p) => (
        <span className="text-[12px] text-muted-foreground">
          {new Date(p.updatedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <StatusPill status={p.status as "active" | "draft"} />
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      render: (p) => (
        <div className="relative group">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Page actions"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/pages/${p.id}`);
            }}
          >
            <DotsThreeVertical size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CONTENT"
        title="Pages"
        actions={
          <Button
            size="sm"
            onClick={handleNewPage}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            Create page
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={pages}
        getRowId={(p) => p.id}
        onRowClick={(p) => router.push(`/admin/pages/${p.id}`)}
        emptyState="No pages yet."
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete page"
        description="This page will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) {
            deletePage(deleteId);
            toast.success("Page deleted");
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
