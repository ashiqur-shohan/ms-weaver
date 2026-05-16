"use client";

import type { GalleryBlock } from "@/lib/mock/journal";
import { FormField, AdminInput } from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "@phosphor-icons/react";

interface GalleryBlockEditorProps {
  block: GalleryBlock;
  onChange: (updated: GalleryBlock) => void;
}

export function GalleryBlockEditor({ block, onChange }: GalleryBlockEditorProps) {
  const addImage = () => {
    onChange({
      ...block,
      images: [...block.images, { url: "", alt: "", width: 900, height: 600 }],
    });
  };

  const updateImage = (
    index: number,
    updates: Partial<GalleryBlock["images"][number]>,
  ) => {
    onChange({
      ...block,
      images: block.images.map((img, i) =>
        i === index ? { ...img, ...updates } : img,
      ),
    });
  };

  const removeImage = (index: number) => {
    onChange({
      ...block,
      images: block.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {block.images.map((img, i) => (
        <div key={i} className="rounded-sm border border-border p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Image {i + 1}
            </span>
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove image"
            >
              <Trash size={14} />
            </button>
          </div>
          <FormField label="URL">
            <MediaPicker
              value={img.url}
              onChange={(url) => updateImage(i, { url })}
            />
          </FormField>
          <FormField label="Alt text">
            <AdminInput
              value={img.alt}
              onChange={(e) => updateImage(i, { alt: e.target.value })}
              placeholder="Describe the image..."
            />
          </FormField>
          {img.url && (
            <div className="overflow-hidden rounded-sm border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="max-h-28 w-full object-cover"
              />
            </div>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addImage}
        className="gap-1.5 rounded-sm text-[12px] h-8 self-start"
      >
        <Plus size={13} />
        Add image
      </Button>
    </div>
  );
}
