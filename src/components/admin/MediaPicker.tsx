"use client";

import { useState, useMemo } from "react";
import { FolderOpen, MagnifyingGlass, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminInput } from "./AdminFormPrimitives";
import { useAdminMedia } from "@/lib/store/admin/media";
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
  const [search, setSearch] = useState("");
  const { assets } = useAdminMedia();

  const filtered = useMemo(() => {
    if (!search) return assets;
    const q = search.toLowerCase();
    return assets.filter(
      (a) =>
        a.alt.toLowerCase().includes(q) ||
        a.filename.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [assets, search]);

  const handleSelect = (url: string) => {
    onChange?.(url);
    setDialogOpen(false);
  };

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
        <DialogContent className="max-w-2xl rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-[15px]">Choose from media library</DialogTitle>
            <DialogDescription className="text-[12px]">
              Select an image or paste a URL directly. Upload new assets at{" "}
              <span className="font-mono">/admin/media</span>.
            </DialogDescription>
          </DialogHeader>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlass
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by filename or tag..."
              className="h-8 w-full rounded-sm border border-border bg-card pl-8 pr-2 text-[13px] focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-2 max-h-[360px] overflow-y-auto">
            {filtered.length === 0 && (
              <div className="col-span-4 py-8 text-center text-[13px] text-muted-foreground">
                No assets match your search.
              </div>
            )}
            {filtered.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => handleSelect(asset.url)}
                className={cn(
                  "group relative rounded-sm border overflow-hidden transition-all",
                  value === asset.url
                    ? "border-primary ring-1 ring-primary"
                    : "border-border hover:border-foreground/30",
                )}
                title={asset.alt}
              >
                <div className="aspect-[4/5] bg-muted overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                {value === asset.url && (
                  <div className="absolute top-1 right-1 rounded-full bg-primary p-0.5">
                    <Check size={10} className="text-primary-foreground" weight="fill" />
                  </div>
                )}
                <div className="p-1">
                  <p className="text-[10px] text-muted-foreground truncate">
                    {asset.filename}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="text-[11px] text-muted-foreground">
              {filtered.length} asset{filtered.length !== 1 ? "s" : ""}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDialogOpen(false)}
              className="text-[12px] text-muted-foreground"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
