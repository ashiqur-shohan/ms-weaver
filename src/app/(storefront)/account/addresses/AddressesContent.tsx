"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddressCard } from "@/components/account/AddressCard";
import { LuxuryField, LuxuryInput } from "@/components/checkout/LuxuryField";
import type { CustomerAddress } from "@/lib/mock/customers";

interface AddressesContentProps {
  addresses: CustomerAddress[];
}

export function AddressesContent({ addresses }: AddressesContentProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    console.log("[Ms Weaver] Add address (Phase 1 stub)");
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 1500);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Delivery
          </p>
          <h1 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
            Saved addresses
          </h1>
        </div>

        {/* Add new — triggers dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="mt-auto flex h-11 items-center justify-center rounded-none border border-foreground bg-transparent px-6 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-200 hover:bg-muted">
              Add new address
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[520px] rounded-none border border-border bg-background p-8 ring-0 shadow-none">
            <DialogHeader>
              <DialogTitle className="font-serif text-[22px] font-normal leading-[30px] tracking-[-0.005em] text-foreground">
                New address
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} noValidate className="mt-4 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <LuxuryField label="Label" required>
                  <LuxuryInput placeholder="Home / Work / Studio" />
                </LuxuryField>
                <LuxuryField label="Full name" required>
                  <LuxuryInput placeholder="Rahela Chowdhury" />
                </LuxuryField>
              </div>
              <LuxuryField label="Address line 1" required>
                <LuxuryInput placeholder="Flat 4B, Gulshan Heights" />
              </LuxuryField>
              <LuxuryField label="Address line 2">
                <LuxuryInput placeholder="Road 11, Gulshan-1" />
              </LuxuryField>
              <div className="grid grid-cols-2 gap-4">
                <LuxuryField label="City" required>
                  <LuxuryInput placeholder="Dhaka" />
                </LuxuryField>
                <LuxuryField label="District" required>
                  <LuxuryInput placeholder="Dhaka" />
                </LuxuryField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <LuxuryField label="Postal code">
                  <LuxuryInput placeholder="1212" />
                </LuxuryField>
                <LuxuryField label="Country" required>
                  <LuxuryInput placeholder="Bangladesh" />
                </LuxuryField>
              </div>
              <LuxuryField label="Phone">
                <LuxuryInput type="tel" placeholder="+880 1817 234567" />
              </LuxuryField>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || saved}
                  className="flex h-12 flex-1 items-center justify-center rounded-none bg-primary text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saved ? "Saved" : saving ? "Saving…" : "Save address"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-none border border-border px-6 text-[12px] font-medium uppercase tracking-[0.05em] text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Address cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((address, i) => (
          <AddressCard key={i} address={address} showActions />
        ))}
      </div>
    </div>
  );
}
