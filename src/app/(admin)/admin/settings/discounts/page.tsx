"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminDiscounts } from "@/lib/store/admin/discounts";
import type { Discount, DiscountType, DiscountStatus } from "@/lib/store/admin/discounts";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField, AdminInput, AdminSelect } from "@/components/admin/AdminFormPrimitives";
import { formatBDT } from "@/lib/utils";
import { cn } from "@/lib/utils";

// ─── Status pill ──────────────────────────────────────────────────────────────

function DiscountStatusPill({ status }: { status: DiscountStatus }) {
  const config: Record<DiscountStatus, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    expired: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span className={cn(
      "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em]",
      config[status],
    )}>
      {status}
    </span>
  );
}

// ─── Discount form dialog ─────────────────────────────────────────────────────

function DiscountDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (d: Discount) => void;
}) {
  const [code, setCode] = useState("");
  const [type, setType] = useState<DiscountType>("percent");
  const [value, setValue] = useState("");
  const [minSubtotal, setMinSubtotal] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");

  const handleSave = () => {
    if (!code || !value) return;
    onSave({
      id: `disc_${Date.now()}`,
      code: code.toUpperCase(),
      type,
      value: Number(value),
      minimumSubtotal: minSubtotal ? Number(minSubtotal) : null,
      maxUses: maxUses ? Number(maxUses) : null,
      usedCount: 0,
      validFrom: validFrom ? new Date(validFrom).toISOString() : null,
      validTo: validTo ? new Date(validTo).toISOString() : null,
      applicableProductIds: [],
      customerRestriction: "any",
      status: validFrom && new Date(validFrom) > new Date() ? "scheduled" : "active",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">Create discount</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <FormField label="Discount code" required>
            <AdminInput
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="WELCOME10"
              className="uppercase font-mono"
            />
          </FormField>

          <FormField label="Type" required>
            <AdminSelect
              value={type}
              onChange={(e) => setType(e.target.value as DiscountType)}
              options={[
                { value: "percent", label: "Percentage off" },
                { value: "fixed", label: "Fixed amount off" },
                { value: "free_ship", label: "Free shipping" },
              ]}
            />
          </FormField>

          {type !== "free_ship" && (
            <FormField label={type === "percent" ? "Percentage (%)" : "Amount (BDT)"} required>
              <AdminInput
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={type === "percent" ? "10" : "500"}
                min="0"
              />
            </FormField>
          )}

          <FormField label="Minimum subtotal (BDT)">
            <AdminInput
              type="number"
              value={minSubtotal}
              onChange={(e) => setMinSubtotal(e.target.value)}
              placeholder="Leave blank for no minimum"
              min="0"
            />
          </FormField>

          <FormField label="Maximum uses">
            <AdminInput
              type="number"
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              placeholder="Leave blank for unlimited"
              min="1"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Valid from">
              <AdminInput type="date" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />
            </FormField>
            <FormField label="Valid to">
              <AdminInput type="date" value={validTo} onChange={(e) => setValidTo(e.target.value)} />
            </FormField>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-[12px] text-muted-foreground">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!code || (type !== "free_ship" && !value)}
            className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DiscountsPage() {
  const { discounts, addDiscount, deleteDiscount } = useAdminDiscounts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = (d: Discount) => {
    addDiscount(d);
    toast.success(`Discount ${d.code} created`);
  };

  const columns: Column<Discount>[] = [
    {
      key: "code",
      header: "Code",
      sortable: true,
      render: (d) => (
        <span className="font-mono text-[13px] font-medium text-foreground">{d.code}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (d) => (
        <span className="text-[12px] text-muted-foreground capitalize">
          {d.type === "free_ship" ? "Free shipping" : d.type}
        </span>
      ),
    },
    {
      key: "value",
      header: "Value",
      render: (d) => (
        <span className="text-[13px] text-foreground">
          {d.type === "percent"
            ? `${d.value}%`
            : d.type === "fixed"
              ? formatBDT(d.value)
              : "Free ship"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (d) => <DiscountStatusPill status={d.status} />,
    },
    {
      key: "uses",
      header: "Uses",
      render: (d) => (
        <span className="text-[12px] text-muted-foreground">
          {d.usedCount}{d.maxUses ? ` / ${d.maxUses}` : ""}
        </span>
      ),
    },
    {
      key: "validFrom",
      header: "Valid range",
      render: (d) => (
        <span className="text-[11px] text-muted-foreground">
          {d.validFrom ? new Date(d.validFrom).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "Any"}
          {" — "}
          {d.validTo ? new Date(d.validTo).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "No end"}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="COMMERCE"
        title="Discounts"
        actions={
          <Button
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            Create discount
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={discounts}
        getRowId={(d) => d.id}
        emptyState="No discounts yet."
      />

      <DiscountDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleSave} />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete discount"
        description="This discount code will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) {
            deleteDiscount(deleteId);
            toast.success("Discount deleted");
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
