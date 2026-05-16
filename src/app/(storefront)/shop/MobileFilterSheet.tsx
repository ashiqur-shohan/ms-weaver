"use client";

import { useState } from "react";
import { SlidersHorizontal } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "@/components/shop/FilterSidebar";

/**
 * Mobile filter sheet trigger + drawer.
 * Client component — manages open/close state.
 */
export function MobileFilterSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="inline-flex h-9 items-center gap-2 rounded-none border border-border px-3 text-[12px] uppercase tracking-[0.05em] text-foreground transition-colors duration-200 hover:bg-muted"
          aria-label="Open filters"
        >
          <SlidersHorizontal size={16} weight="regular" aria-hidden="true" />
          Filters
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-[360px] rounded-none border-l border-border bg-background p-0"
        showCloseButton={false}
      >
        <SheetHeader className="flex h-16 flex-row items-center justify-between border-b border-border px-6">
          <SheetTitle className="text-[12px] font-medium uppercase tracking-[0.05em]">
            Filters
          </SheetTitle>
          <button
            onClick={() => setOpen(false)}
            className="p-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Close filters"
          >
            ✕
          </button>
        </SheetHeader>
        <div className="overflow-y-auto px-6 py-6">
          <FilterSidebar
            showApplyButton={true}
            onApply={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
