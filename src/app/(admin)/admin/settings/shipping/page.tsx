"use client";

import { useState } from "react";
import { Plus, Trash, PencilSimple, FloppyDisk } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminShipping } from "@/lib/store/admin/shipping";
import type { ShippingZone, ShippingRate } from "@/lib/store/admin/shipping";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatBDT } from "@/lib/utils";

// ─── Rate row ─────────────────────────────────────────────────────────────────

function RateRow({
  rate,
  onDelete,
}: {
  rate: ShippingRate;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/60 last:border-0">
      <div>
        <div className="text-[13px] font-medium text-foreground">{rate.label}</div>
        <div className="text-[11px] text-muted-foreground">{rate.description}</div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-medium text-foreground">{formatBDT(rate.price)}</span>
        <button
          type="button"
          onClick={onDelete}
          className="text-muted-foreground/60 hover:text-destructive transition-colors"
          aria-label="Delete rate"
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Add rate dialog ──────────────────────────────────────────────────────────

function AddRateDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (rate: ShippingRate) => void;
}) {
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!label || !price) return;
    onAdd({
      id: `rate_${Date.now()}`,
      label,
      price: Number(price),
      description,
    });
    setLabel("");
    setPrice("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">Add shipping rate</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <FormField label="Rate name" required>
            <AdminInput value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Standard delivery" />
          </FormField>
          <FormField label="Price (BDT)" required>
            <AdminInput type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="150" min="0" />
          </FormField>
          <FormField label="Description">
            <AdminInput value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Doorstep delivery..." />
          </FormField>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-[12px] text-muted-foreground">Cancel</Button>
          <Button size="sm" onClick={handleAdd} disabled={!label || !price} className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90">Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Zone card ────────────────────────────────────────────────────────────────

function ZoneCard({ zone }: { zone: ShippingZone }) {
  const { updateZone, addRate, deleteRate, deleteZone } = useAdminShipping();
  const [addRateOpen, setAddRateOpen] = useState(false);
  const [freeThreshold, setFreeThreshold] = useState(String(zone.freeThreshold ?? ""));

  const handleSave = () => {
    updateZone(zone.id, {
      freeThreshold: freeThreshold ? Number(freeThreshold) : null,
    });
    toast.success(`${zone.name} saved`);
  };

  return (
    <div className="rounded-sm border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-[17px] font-normal text-foreground">{zone.name}</h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">{zone.regions.join(", ")}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5 italic">{zone.leadTimeCopy}</p>
        </div>
      </div>

      {/* Rates */}
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-2">Rates</div>
        {zone.rates.map((rate) => (
          <RateRow
            key={rate.id}
            rate={rate}
            onDelete={() => {
              deleteRate(zone.id, rate.id);
              toast.success("Rate removed");
            }}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAddRateOpen(true)}
          className="gap-1.5 rounded-sm text-[12px] h-7 mt-2"
        >
          <Plus size={12} />
          Add rate
        </Button>
      </div>

      {/* Free threshold */}
      <div className="flex items-end gap-3 border-t border-border pt-3">
        <FormField label="Free shipping threshold (BDT)" className="flex-1">
          <AdminInput
            type="number"
            value={freeThreshold}
            onChange={(e) => setFreeThreshold(e.target.value)}
            placeholder="Leave blank for no free shipping"
            min="0"
          />
        </FormField>
        <Button
          type="button"
          size="sm"
          onClick={handleSave}
          className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90 shrink-0"
        >
          <FloppyDisk size={13} className="mr-1" />
          Save
        </Button>
      </div>

      <AddRateDialog
        open={addRateOpen}
        onOpenChange={setAddRateOpen}
        onAdd={(rate) => {
          addRate(zone.id, rate);
          toast.success("Rate added");
        }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShippingPage() {
  const { zones } = useAdminShipping();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="CONFIG" title="Shipping" />

      <div className="flex flex-col gap-4">
        {zones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} />
        ))}
      </div>
    </div>
  );
}
