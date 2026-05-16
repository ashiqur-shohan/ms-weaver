"use client";

import type { QuoteBlock } from "@/lib/mock/journal";
import { FormField, AdminTextarea, AdminInput } from "@/components/admin/AdminFormPrimitives";

interface QuoteBlockEditorProps {
  block: QuoteBlock;
  onChange: (updated: QuoteBlock) => void;
}

export function QuoteBlockEditor({ block, onChange }: QuoteBlockEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <FormField label="Quote text">
        <AdminTextarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="The quote text..."
          className="min-h-[64px]"
        />
      </FormField>
      <FormField label="Attribution (optional)">
        <AdminInput
          value={block.attribution ?? ""}
          onChange={(e) => onChange({ ...block, attribution: e.target.value })}
          placeholder="Ashfia Khatun, or leave blank..."
        />
      </FormField>
    </div>
  );
}
