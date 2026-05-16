"use client";

import type { ParagraphBlock } from "@/lib/mock/journal";
import { AdminTextarea } from "@/components/admin/AdminFormPrimitives";

interface ParagraphBlockEditorProps {
  block: ParagraphBlock;
  onChange: (updated: ParagraphBlock) => void;
}

export function ParagraphBlockEditor({ block, onChange }: ParagraphBlockEditorProps) {
  return (
    <AdminTextarea
      value={block.text}
      onChange={(e) => onChange({ ...block, text: e.target.value })}
      placeholder="Paragraph text..."
      className="min-h-[80px] text-[14px]"
    />
  );
}
