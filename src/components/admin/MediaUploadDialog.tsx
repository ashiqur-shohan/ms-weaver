"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField, AdminInput } from "./AdminFormPrimitives";
import type { MediaAsset } from "@/lib/store/admin/media";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MediaUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (asset: MediaAsset) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MediaUploadDialog({ open, onOpenChange, onUpload }: MediaUploadDialogProps) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [tags, setTags] = useState("");

  const handleUpload = () => {
    if (!url) return;
    const asset: MediaAsset = {
      id: `media_${Date.now()}`,
      url,
      alt,
      filename: url.split("/").pop() ?? "upload.jpg",
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      width: 0,
      height: 0,
      sizeBytes: 0,
      uploadedAt: new Date().toISOString(),
    };
    onUpload(asset);
    setUrl("");
    setAlt("");
    setTags("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">Upload asset</DialogTitle>
          <DialogDescription>
            Phase 1: Paste an image URL to add it to the library. File upload will be enabled in Phase 2.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <FormField label="Image URL" required>
            <AdminInput
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </FormField>
          <p className="text-[11px] text-muted-foreground/70">
            Phase 1: Paste a direct URL. File upload (drag &amp; drop) will be enabled in Phase 2.
          </p>

          <FormField label="Alt text" required>
            <AdminInput
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe what the image communicates..."
            />
          </FormField>

          <FormField label="Tags (comma separated)">
            <AdminInput
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="process, product, atelier..."
            />
          </FormField>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-[12px] text-muted-foreground"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleUpload}
            disabled={!url}
            className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            Add to library
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
