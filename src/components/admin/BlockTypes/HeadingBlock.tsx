"use client";

import type { HeadingBlock } from "@/lib/mock/journal";
import { AdminInput, AdminSelect, FormField } from "@/components/admin/AdminFormPrimitives";

interface HeadingBlockEditorProps {
  block: HeadingBlock;
  onChange: (updated: HeadingBlock) => void;
}

const levelOptions = [
  { value: "2", label: "H2 — Section heading" },
  { value: "3", label: "H3 — Sub-heading" },
];

export function HeadingBlockEditor({ block, onChange }: HeadingBlockEditorProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <FormField label="Heading text">
          <AdminInput
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Heading..."
          />
        </FormField>
      </div>
      <div className="w-44">
        <FormField label="Level">
          <AdminSelect
            value={String(block.level)}
            onChange={(e) =>
              onChange({ ...block, level: Number(e.target.value) as 2 | 3 })
            }
            options={levelOptions}
          />
        </FormField>
      </div>
    </div>
  );
}
