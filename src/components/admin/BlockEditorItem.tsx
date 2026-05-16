"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DotsSixVertical,
  Trash,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import type { ContentBlock } from "@/lib/mock/journal";
import { cn } from "@/lib/utils";
import { ParagraphBlockEditor } from "./BlockTypes/ParagraphBlock";
import { HeadingBlockEditor } from "./BlockTypes/HeadingBlock";
import { ImageBlockEditor } from "./BlockTypes/ImageBlock";
import { QuoteBlockEditor } from "./BlockTypes/QuoteBlock";
import { GalleryBlockEditor } from "./BlockTypes/GalleryBlock";
import { FaqBlockEditor } from "./BlockTypes/FaqBlock";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlockEditorItemProps {
  id: string;
  block: ContentBlock;
  onChange: (updated: ContentBlock) => void;
  onDelete: () => void;
}

const BLOCK_TYPE_LABELS: Record<ContentBlock["type"], string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  image: "Image",
  quote: "Pull quote",
  gallery: "Gallery",
  faq: "FAQ",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function BlockEditorItem({ id, block, onChange, onDelete }: BlockEditorItemProps) {
  const [expanded, setExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-sm border border-border bg-card",
        isDragging && "opacity-50 shadow-lg z-50",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground/60 hover:text-muted-foreground transition-colors touch-none"
          aria-label="Drag to reorder"
        >
          <DotsSixVertical size={16} />
        </button>

        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground flex-1">
          {BLOCK_TYPE_LABELS[block.type]}
        </span>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          aria-label={expanded ? "Collapse block" : "Expand block"}
        >
          {expanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="text-muted-foreground/60 hover:text-destructive transition-colors"
          aria-label="Delete block"
        >
          <Trash size={14} />
        </button>
      </div>

      {/* Content */}
      {expanded && (
        <div className="p-3">
          {block.type === "paragraph" && (
            <ParagraphBlockEditor block={block} onChange={onChange} />
          )}
          {block.type === "heading" && (
            <HeadingBlockEditor block={block} onChange={onChange} />
          )}
          {block.type === "image" && (
            <ImageBlockEditor block={block} onChange={onChange} />
          )}
          {block.type === "quote" && (
            <QuoteBlockEditor block={block} onChange={onChange} />
          )}
          {block.type === "gallery" && (
            <GalleryBlockEditor block={block} onChange={onChange} />
          )}
          {block.type === "faq" && (
            <FaqBlockEditor block={block} onChange={onChange} />
          )}
        </div>
      )}
    </div>
  );
}
