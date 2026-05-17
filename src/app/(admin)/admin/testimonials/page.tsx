"use client";

import { useState } from "react";
import { Star, Plus } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminTestimonials } from "@/lib/store/admin/testimonials";
import type { Testimonial } from "@/lib/mock/testimonials";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";

// ─── Testimonial form dialog ──────────────────────────────────────────────────

function TestimonialDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Testimonial;
  onSave: (t: Testimonial) => void;
}) {
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [avatar, setAvatar] = useState(initial?.avatar ?? "");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(initial?.rating ?? 5);
  const [featured, setFeatured] = useState(initial?.featured ?? false);

  const handleSave = () => {
    if (!quote || !author) return;
    onSave({
      id: initial?.id ?? `test_${Date.now()}`,
      quote,
      author,
      role,
      avatar,
      rating: rating as 1 | 2 | 3 | 4 | 5,
      featured,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">
            {initial ? "Edit testimonial" : "New testimonial"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <FormField label="Quote" required>
            <AdminTextarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="The testimonial text..."
              className="min-h-[80px]"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Author name" required>
              <AdminInput value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Rahela Chowdhury" />
            </FormField>
            <FormField label="Role / location">
              <AdminInput value={role} onChange={(e) => setRole(e.target.value)} placeholder="Dhaka, Bangladesh" />
            </FormField>
          </div>
          <FormField label="Avatar URL">
            <MediaPicker value={avatar} onChange={setAvatar} />
          </FormField>
          <FormField label={`Rating: ${rating}/5`}>
            <input
              type="range"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
              className="w-full accent-primary"
            />
          </FormField>
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-primary"
            />
            Featured on homepage
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-[12px] text-muted-foreground">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!quote || !author}
            className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, toggleFeatured } =
    useAdminTestimonials();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = (t: Testimonial) => {
    if (editing) {
      updateTestimonial(t.id, t);
      toast.success("Testimonial updated");
    } else {
      addTestimonial(t);
      toast.success("Testimonial added");
    }
  };

  const columns: Column<Testimonial>[] = [
    {
      key: "avatar",
      header: "",
      className: "w-10",
      render: (t) =>
        t.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.avatar} alt={t.author} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted" />
        ),
    },
    {
      key: "quote",
      header: "Quote",
      render: (t) => (
        <span className="text-[13px] text-foreground line-clamp-1">
          &ldquo;{t.quote.slice(0, 80)}{t.quote.length > 80 ? "…" : ""}&rdquo;
        </span>
      ),
    },
    {
      key: "author",
      header: "Author",
      sortable: true,
      render: (t) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">{t.author}</div>
          <div className="text-[11px] text-muted-foreground">{t.role}</div>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (t) => (
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              weight={i < t.rating ? "fill" : "regular"}
              className={i < t.rating ? "text-amber-400" : "text-muted-foreground/30"}
            />
          ))}
        </div>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      render: (t) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFeatured(t.id);
            toast.success(t.featured ? "Removed from featured" : "Added to featured");
          }}
          className="text-muted-foreground hover:text-amber-500 transition-colors"
          aria-label={t.featured ? "Unfeature" : "Feature"}
        >
          <Star size={15} weight={t.featured ? "fill" : "regular"} className={t.featured ? "text-amber-500" : ""} />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CONTENT"
        title="Testimonials"
        actions={
          <Button
            size="sm"
            onClick={() => { setEditing(undefined); setDialogOpen(true); }}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            New testimonial
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={testimonials}
        getRowId={(t) => t.id}
        onRowClick={(t) => { setEditing(t); setDialogOpen(true); }}
        emptyState="No testimonials yet."
      />

      <TestimonialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete testimonial"
        description="This testimonial will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) {
            deleteTestimonial(deleteId);
            toast.success("Testimonial deleted");
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
