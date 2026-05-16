"use client";

import { useState } from "react";
import { DotsThreeVertical, Copy, Trash, ArrowClockwise } from "@phosphor-icons/react";
import type { MediaAsset } from "@/lib/store/admin/media";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface MediaTileProps {
  asset: MediaAsset;
  selected: boolean;
  onSelect: () => void;
  onClick: () => void;
  onDelete: () => void;
}

export function MediaTile({ asset, selected, onSelect, onClick, onDelete }: MediaTileProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    void navigator.clipboard.writeText(asset.url);
    setMenuOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
    setMenuOpen(false);
  };

  return (
    <div
      className={cn(
        "group relative rounded-sm overflow-hidden border cursor-pointer",
        selected ? "border-primary ring-1 ring-primary" : "border-border",
      )}
      onClick={onClick}
    >
      {/* Select checkbox */}
      <div
        className="absolute left-2 top-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <Checkbox
          checked={selected}
          onCheckedChange={onSelect}
          className="bg-card/90 backdrop-blur-sm"
          aria-label={`Select ${asset.filename}`}
        />
      </div>

      {/* Kebab menu */}
      <div className="absolute right-2 top-2 z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm bg-card/90 backdrop-blur-sm",
            "text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
          )}
          aria-label="Asset actions"
        >
          <DotsThreeVertical size={14} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-36 rounded-sm border border-border bg-card shadow-lg py-1 z-20">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-foreground hover:bg-muted transition-colors"
            >
              <Copy size={13} />
              Copy URL
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-foreground hover:bg-muted transition-colors"
            >
              <ArrowClockwise size={13} />
              Replace
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-destructive hover:bg-muted transition-colors"
            >
              <Trash size={13} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.url}
          alt={asset.alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      {/* Tags */}
      {asset.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 p-1.5">
          {asset.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-muted px-1 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {asset.tags.length > 2 && (
            <span className="text-[10px] text-muted-foreground/60">
              +{asset.tags.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
