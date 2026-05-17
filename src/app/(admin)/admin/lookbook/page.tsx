"use client";

import { useState } from "react";
import { Plus, DotsThreeVertical } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminLookbook } from "@/lib/store/admin/lookbook";
import type { LookbookRow } from "@/lib/mock/lookbook";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormField, AdminInput, AdminTextarea, AdminSelect } from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Row type chip ────────────────────────────────────────────────────────────

function RowTypeChip({ type }: { type: LookbookRow["type"] }) {
  const config = {
    full: "bg-violet-50 text-violet-700 border-violet-200",
    pair: "bg-blue-50 text-blue-700 border-blue-200",
    triple: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span className={cn(
      "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em]",
      config[type],
    )}>
      {type}
    </span>
  );
}

// ─── Row editor dialog ────────────────────────────────────────────────────────

const IMAGE_SLOT_COUNTS = { full: 1, pair: 2, triple: 3 };

function LookbookRowDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: LookbookRow;
  onSave: (row: LookbookRow) => void;
}) {
  const [type, setType] = useState<LookbookRow["type"]>(initial?.type ?? "full");
  const [caption, setCaption] = useState(initial?.caption ?? "");
  const [images, setImages] = useState(
    initial?.images ?? [{ url: "", alt: "", width: 900, height: 600 }],
  );

  const slotCount = IMAGE_SLOT_COUNTS[type];

  const handleTypeChange = (newType: LookbookRow["type"]) => {
    setType(newType);
    const count = IMAGE_SLOT_COUNTS[newType];
    setImages((prev) => {
      const slots = Array.from({ length: count }, (_, i) =>
        prev[i] ?? { url: "", alt: "", width: 900, height: 600 },
      );
      return slots;
    });
  };

  const handleSave = () => {
    onSave({
      id: initial?.id ?? `lb_${Date.now()}`,
      type,
      caption,
      images,
      productIds: initial?.productIds ?? [],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">
            {initial ? "Edit lookbook row" : "New lookbook row"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <FormField label="Row layout">
            <AdminSelect
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as LookbookRow["type"])}
              options={[
                { value: "full", label: "Full — 1 wide image" },
                { value: "pair", label: "Pair — 2 images side by side" },
                { value: "triple", label: "Triple — 3 images" },
              ]}
            />
          </FormField>

          {Array.from({ length: slotCount }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-sm border border-border">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Image {i + 1}
              </span>
              <FormField label="URL">
                <MediaPicker
                  value={images[i]?.url ?? ""}
                  onChange={(url) =>
                    setImages((prev) =>
                      prev.map((img, idx) => idx === i ? { ...img, url } : img),
                    )
                  }
                />
              </FormField>
              <FormField label="Alt text">
                <AdminInput
                  value={images[i]?.alt ?? ""}
                  onChange={(e) =>
                    setImages((prev) =>
                      prev.map((img, idx) => idx === i ? { ...img, alt: e.target.value } : img),
                    )
                  }
                  placeholder="Describe the image..."
                />
              </FormField>
            </div>
          ))}

          <FormField label="Caption (optional)">
            <AdminInput value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption shown below the row..." />
          </FormField>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-[12px] text-muted-foreground">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LookbookPage() {
  const { rows, addRow, updateRow, deleteRow } = useAdminLookbook();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<LookbookRow | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = (row: LookbookRow) => {
    if (editing) {
      updateRow(row.id, row);
      toast.success("Row updated");
    } else {
      addRow(row);
      toast.success("Row added");
    }
  };

  const columns: Column<LookbookRow>[] = [
    {
      key: "type",
      header: "Layout",
      render: (r) => <RowTypeChip type={r.type} />,
    },
    {
      key: "images",
      header: "Images",
      render: (r) => (
        <span className="text-[12px] text-muted-foreground">{r.images.length}</span>
      ),
    },
    {
      key: "caption",
      header: "Caption",
      render: (r) => (
        <span className="text-[13px] text-foreground line-clamp-1">
          {r.caption ?? "—"}
        </span>
      ),
    },
    {
      key: "products",
      header: "Products",
      render: (r) => (
        <span className="text-[12px] text-muted-foreground">{r.productIds?.length ?? 0}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      render: (r) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteId(r.id);
          }}
          className="text-muted-foreground/60 hover:text-destructive transition-colors"
          aria-label="Delete row"
        >
          <DotsThreeVertical size={15} />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CONTENT"
        title="Lookbook"
        actions={
          <Button
            size="sm"
            onClick={() => { setEditing(undefined); setDialogOpen(true); }}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            New row
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        onRowClick={(r) => { setEditing(r); setDialogOpen(true); }}
        emptyState="No lookbook rows yet."
      />

      <LookbookRowDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete lookbook row"
        description="This row will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) {
            deleteRow(deleteId);
            toast.success("Row deleted");
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
