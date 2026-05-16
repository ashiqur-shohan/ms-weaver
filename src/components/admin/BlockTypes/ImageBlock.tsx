"use client";

import type { ImageBlock } from "@/lib/mock/journal";
import { FormField, AdminInput } from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";

interface ImageBlockEditorProps {
  block: ImageBlock;
  onChange: (updated: ImageBlock) => void;
}

export function ImageBlockEditor({ block, onChange }: ImageBlockEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <FormField label="Image URL">
        <MediaPicker
          value={block.url}
          onChange={(url) => onChange({ ...block, url })}
        />
      </FormField>
      <FormField label="Alt text">
        <AdminInput
          value={block.alt}
          onChange={(e) => onChange({ ...block, alt: e.target.value })}
          placeholder="Describe what the image communicates..."
        />
      </FormField>
      <FormField label="Caption (optional)">
        <AdminInput
          value={block.caption ?? ""}
          onChange={(e) => onChange({ ...block, caption: e.target.value })}
          placeholder="Caption shown below image..."
        />
      </FormField>
      {block.url && (
        <div className="mt-1 overflow-hidden rounded-sm border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.alt}
            className="max-h-40 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
