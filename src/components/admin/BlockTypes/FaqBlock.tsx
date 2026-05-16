"use client";

import type { FaqBlock } from "@/lib/mock/journal";
import { FormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "@phosphor-icons/react";

interface FaqBlockEditorProps {
  block: FaqBlock;
  onChange: (updated: FaqBlock) => void;
}

export function FaqBlockEditor({ block, onChange }: FaqBlockEditorProps) {
  const addItem = () => {
    onChange({
      ...block,
      items: [...block.items, { question: "", answer: "" }],
    });
  };

  const updateItem = (
    index: number,
    updates: Partial<FaqBlock["items"][number]>,
  ) => {
    onChange({
      ...block,
      items: block.items.map((item, i) =>
        i === index ? { ...item, ...updates } : item,
      ),
    });
  };

  const removeItem = (index: number) => {
    onChange({
      ...block,
      items: block.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {block.items.map((item, i) => (
        <div key={i} className="rounded-sm border border-border p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Q&amp;A {i + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove item"
            >
              <Trash size={14} />
            </button>
          </div>
          <FormField label="Question">
            <AdminInput
              value={item.question}
              onChange={(e) => updateItem(i, { question: e.target.value })}
              placeholder="The question..."
            />
          </FormField>
          <FormField label="Answer">
            <AdminTextarea
              value={item.answer}
              onChange={(e) => updateItem(i, { answer: e.target.value })}
              placeholder="The answer..."
              className="min-h-[64px]"
            />
          </FormField>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="gap-1.5 rounded-sm text-[12px] h-8 self-start"
      >
        <Plus size={13} />
        Add Q&amp;A
      </Button>
    </div>
  );
}
