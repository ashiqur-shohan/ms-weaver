"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Plus } from "@phosphor-icons/react";
import type { ContentBlock } from "@/lib/mock/journal";
import { Button } from "@/components/ui/button";
import { BlockEditorItem } from "./BlockEditorItem";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  className?: string;
}

type NewBlockType = ContentBlock["type"];

const BLOCK_OPTIONS: { type: NewBlockType; label: string }[] = [
  { type: "paragraph", label: "Paragraph" },
  { type: "heading", label: "Heading" },
  { type: "image", label: "Image" },
  { type: "quote", label: "Pull quote" },
  { type: "gallery", label: "Gallery" },
  { type: "faq", label: "FAQ" },
];

function createBlock(type: NewBlockType): ContentBlock {
  switch (type) {
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "heading":
      return { type: "heading", level: 2, text: "" };
    case "image":
      return { type: "image", url: "", alt: "", width: 900, height: 600 };
    case "quote":
      return { type: "quote", text: "" };
    case "gallery":
      return { type: "gallery", images: [] };
    case "faq":
      return { type: "faq", items: [] };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BlockEditor({ blocks, onChange, className }: BlockEditorProps) {
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  // Generate stable IDs for dnd-kit
  const [blockIds] = useState(() =>
    blocks.map((_, i) => `block_${i}_${Date.now()}`),
  );
  const [ids, setIds] = useState(blockIds);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);

    const newIds = arrayMove(ids, oldIndex, newIndex);
    const newBlocks = arrayMove(blocks, oldIndex, newIndex);
    setIds(newIds);
    onChange(newBlocks);
  };

  const updateBlock = (index: number, updated: ContentBlock) => {
    const newBlocks = blocks.map((b, i) => (i === index ? updated : b));
    onChange(newBlocks);
  };

  const deleteBlock = (index: number) => {
    const newIds = ids.filter((_, i) => i !== index);
    const newBlocks = blocks.filter((_, i) => i !== index);
    setIds(newIds);
    onChange(newBlocks);
  };

  const addBlock = (type: NewBlockType) => {
    const newBlock = createBlock(type);
    const newId = `block_${ids.length}_${Date.now()}`;
    setIds([...ids, newId]);
    onChange([...blocks, newBlock]);
    setAddMenuOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={ids.slice(0, blocks.length)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block, i) => (
            <BlockEditorItem
              key={ids[i] ?? `block_${i}`}
              id={ids[i] ?? `block_${i}`}
              block={block}
              onChange={(updated) => updateBlock(i, updated)}
              onDelete={() => deleteBlock(i)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && (
        <div className="rounded-sm border border-dashed border-border py-10 text-center">
          <p className="text-[13px] text-muted-foreground">
            No blocks yet. Add one below.
          </p>
        </div>
      )}

      {/* Add block */}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAddMenuOpen((v) => !v)}
          className="gap-1.5 rounded-sm text-[12px] h-8"
        >
          <Plus size={13} />
          Add block
        </Button>

        {addMenuOpen && (
          <div className="absolute left-0 top-full mt-1 z-20 w-44 rounded-sm border border-border bg-card shadow-lg py-1">
            {BLOCK_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => addBlock(opt.type)}
                className="w-full px-3 py-1.5 text-left text-[13px] text-foreground hover:bg-muted transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
