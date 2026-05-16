"use client";

import { useState } from "react";
import { FolderOpen } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminInput } from "./AdminFormPrimitives";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MediaPickerProps {
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MediaPicker({
  value = "",
  onChange,
  label: _label = "Media",
  placeholder = "https://...",
  className,
}: MediaPickerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={cn("flex items-end gap-2", className)}>
      <div className="flex-1">
        <AdminInput
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setDialogOpen(true)}
        className="shrink-0 gap-1.5 text-[12px] h-8 rounded-sm"
      >
        <FolderOpen size={14} />
        Browse
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-[15px]">Media library</DialogTitle>
            <DialogDescription>
              The media library is coming in Part 2 of the admin panel. For now,
              paste a direct image URL in the field below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Coming in Part 2
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
