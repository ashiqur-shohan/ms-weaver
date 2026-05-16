"use client";

import { useState, useMemo } from "react";
import { UploadSimple, X, MagnifyingGlass } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminMedia } from "@/lib/store/admin/media";
import type { MediaAsset } from "@/lib/store/admin/media";
import { PageHeader } from "@/components/admin/PageHeader";
import { MediaTile } from "@/components/admin/MediaTile";
import { MediaUploadDialog } from "@/components/admin/MediaUploadDialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FormField, AdminInput } from "@/components/admin/AdminFormPrimitives";

// ─── Asset detail sheet ───────────────────────────────────────────────────────

function AssetSheet({
  asset,
  onClose,
  onUpdate,
}: {
  asset: MediaAsset | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<MediaAsset>) => void;
}) {
  if (!asset) return null;

  return (
    <Sheet open={!!asset} onOpenChange={onClose}>
      <SheetContent className="w-[400px] rounded-none p-0">
        <SheetHeader className="h-14 flex flex-row items-center justify-between border-b border-border px-6">
          <SheetTitle className="text-[14px] font-medium">Asset details</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto p-6 flex flex-col gap-4">
          {/* Preview */}
          <div className="overflow-hidden rounded-sm border border-border aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.url} alt={asset.alt} className="h-full w-full object-cover" />
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-1 text-[12px] text-muted-foreground">
            <div><strong className="text-foreground">Filename:</strong> {asset.filename}</div>
            {asset.width > 0 && <div><strong className="text-foreground">Dimensions:</strong> {asset.width}×{asset.height}</div>}
            {asset.sizeBytes > 0 && <div><strong className="text-foreground">Size:</strong> {Math.round(asset.sizeBytes / 1024)} KB</div>}
            <div><strong className="text-foreground">Uploaded:</strong> {new Date(asset.uploadedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
          </div>

          {/* Editable fields */}
          <FormField label="Alt text">
            <AdminInput
              defaultValue={asset.alt}
              onBlur={(e) => onUpdate(asset.id, { alt: e.target.value })}
              placeholder="Describe the image..."
            />
          </FormField>

          {/* URL copy */}
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">URL</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 text-[11px] font-mono text-muted-foreground truncate border-b border-border pb-1">
                {asset.url}
              </div>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(asset.url);
                  toast.success("URL copied");
                }}
                className="text-[11px] text-muted-foreground underline hover:text-foreground"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MediaPage() {
  const { assets, addAsset, updateAsset, deleteAsset, deleteAssets } = useAdminMedia();

  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeAsset, setActiveAsset] = useState<MediaAsset | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

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

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    deleteAssets([...selectedIds]);
    setSelectedIds(new Set());
    toast.success("Assets deleted");
    setBulkDeleteOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="ASSETS"
        title="Media library"
        actions={
          <Button
            size="sm"
            onClick={() => setUploadOpen(true)}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <UploadSimple size={14} />
            Upload
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename or alt text..."
            className="h-8 w-full rounded-sm border border-border bg-card text-[13px] pl-8 pr-2 focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <span className="text-[12px] text-muted-foreground">
          {filtered.length} asset{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-sm border border-border bg-muted/40 px-3 py-2">
          <span className="text-[12px] text-muted-foreground">{selectedIds.size} selected</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setBulkDeleteOpen(true)}
            className="rounded-sm h-7 text-[12px] text-destructive border-destructive/30 hover:bg-destructive/5"
          >
            Delete selected
          </Button>
          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            className="text-muted-foreground hover:text-foreground ml-auto"
            aria-label="Clear selection"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-[13px] text-muted-foreground">
          No assets found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((asset) => (
            <MediaTile
              key={asset.id}
              asset={asset}
              selected={selectedIds.has(asset.id)}
              onSelect={() => toggleSelect(asset.id)}
              onClick={() => setActiveAsset(asset)}
              onDelete={() => {
                deleteAsset(asset.id);
                toast.success("Asset deleted");
              }}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <MediaUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={(asset) => {
          addAsset(asset);
          toast.success("Asset added to library");
        }}
      />

      <AssetSheet
        asset={activeAsset}
        onClose={() => setActiveAsset(null)}
        onUpdate={updateAsset}
      />

      <ConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Delete selected assets"
        description={`Permanently delete ${selectedIds.size} asset${selectedIds.size !== 1 ? "s" : ""}? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleBulkDelete}
      />
    </div>
  );
}
