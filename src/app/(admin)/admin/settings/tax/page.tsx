"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminTax } from "@/lib/store/admin/tax";
import type { TaxRate, TaxInclusivity } from "@/lib/store/admin/tax";
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
import { cn } from "@/lib/utils";

// ─── Add rate dialog ──────────────────────────────────────────────────────────

function AddTaxDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (rate: TaxRate) => void;
}) {
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [inclusivity, setInclusivity] = useState<TaxInclusivity>("exclusive");

  const handleAdd = () => {
    if (!region || !name || !rate) return;
    onAdd({
      id: `tax_${Date.now()}`,
      region,
      name,
      rate: Number(rate),
      inclusivity,
      status: "active",
    });
    setRegion("");
    setName("");
    setRate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">Add tax rate</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <FormField label="Region" required>
            <AdminInput value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Bangladesh" />
          </FormField>
          <FormField label="Name" required>
            <AdminInput value={name} onChange={(e) => setName(e.target.value)} placeholder="BD VAT" />
          </FormField>
          <FormField label="Rate (%)" required>
            <AdminInput type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5" min="0" max="100" step="0.01" />
          </FormField>
          <FormField label="Inclusivity">
            <AdminSelect
              value={inclusivity}
              onChange={(e) => setInclusivity(e.target.value as TaxInclusivity)}
              options={[
                { value: "exclusive", label: "Tax exclusive (added on top)" },
                { value: "inclusive", label: "Tax inclusive (included in price)" },
              ]}
            />
          </FormField>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-[12px] text-muted-foreground">Cancel</Button>
          <Button size="sm" onClick={handleAdd} disabled={!region || !name || !rate} className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90">Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TaxPage() {
  const { rates, addRate, deleteRate } = useAdminTax();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: Column<TaxRate>[] = [
    {
      key: "region",
      header: "Region",
      sortable: true,
      render: (r) => <span className="text-[13px] font-medium text-foreground">{r.region}</span>,
    },
    {
      key: "name",
      header: "Name",
      render: (r) => <span className="text-[13px] text-foreground">{r.name}</span>,
    },
    {
      key: "rate",
      header: "Rate",
      render: (r) => <span className="text-[13px] font-medium text-foreground">{r.rate}%</span>,
    },
    {
      key: "inclusivity",
      header: "Applied as",
      render: (r) => (
        <span className="text-[12px] text-muted-foreground capitalize">{r.inclusivity}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <span className={cn(
          "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em]",
          r.status === "active"
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-border bg-muted text-muted-foreground",
        )}>
          {r.status}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CONFIG"
        title="Tax rates"
        description="Phase 1: tax rates are informational only. Checkout does not yet compute tax."
        actions={
          <Button
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            Add tax rate
          </Button>
        }
      />

      <div className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-700">
        Tax is informational only in Phase 1. Actual tax computation at checkout will be enabled in Phase 2.
      </div>

      <DataTable
        columns={columns}
        data={rates}
        getRowId={(r) => r.id}
        emptyState="No tax rates configured."
      />

      <AddTaxDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={(rate) => { addRate(rate); toast.success("Tax rate added"); }} />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete tax rate"
        description="This tax rate will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) { deleteRate(deleteId); toast.success("Rate deleted"); setDeleteId(null); }
        }}
      />
    </div>
  );
}
