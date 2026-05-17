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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DotsSixVertical,
  Eye,
  EyeSlash,
  ArrowSquareOut,
  FloppyDisk,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminHomeBuilder } from "@/lib/store/admin/homeBuilder";
import { useAdminCollections } from "@/lib/store/admin/collections";
import { useAdminProducts } from "@/lib/store/admin/products";
import { useAdminTestimonials } from "@/lib/store/admin/testimonials";
import { useAdminJournal } from "@/lib/store/admin/journal";
import type { HomeSection } from "@/lib/mock/home";
import type {
  FeaturedCollectionProps,
  ProcessShowcaseProps,
  TestimonialsProps,
  JournalPreviewProps,
  InstagramFeedProps,
} from "@/lib/mock/home";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import {
  FormField,
  AdminInput,
  AdminTextarea,
  AdminSelect,
} from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { cn, formatBDT } from "@/lib/utils";

// ─── Section labels ────────────────────────────────────────────────────────────

const SECTION_LABELS: Record<HomeSection["type"], string> = {
  hero: "Hero",
  featuredCollection: "Featured Collection",
  brandStory: "Brand Story",
  processShowcase: "Process Showcase",
  testimonials: "Testimonials",
  journalPreview: "Journal Preview",
  newsletter: "Newsletter",
  instagramFeed: "Instagram Feed",
};

// ─── Sortable section item ─────────────────────────────────────────────────────

function SectionItem({
  section,
  isActive,
  onSelect,
  onToggle,
}: {
  section: HomeSection;
  isActive: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.type });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 rounded-sm border px-3 py-2.5 cursor-pointer transition-colors",
        isDragging ? "opacity-50 shadow-md" : "",
        isActive
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:bg-muted/30",
      )}
      onClick={onSelect}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground/60 hover:text-muted-foreground touch-none"
        onClick={(e) => e.stopPropagation()}
        aria-label="Drag to reorder"
      >
        <DotsSixVertical size={16} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-foreground truncate">
          {SECTION_LABELS[section.type]}
        </div>
        <div
          className={cn(
            "text-[11px] uppercase tracking-[0.06em]",
            section.enabled ? "text-green-600" : "text-muted-foreground",
          )}
        >
          {section.enabled ? "Visible" : "Hidden"}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={section.enabled ? "Hide section" : "Show section"}
      >
        {section.enabled ? <Eye size={16} /> : <EyeSlash size={16} />}
      </button>
    </div>
  );
}

// ─── Section editors ──────────────────────────────────────────────────────────

function HeroEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "hero" };
  onChange: (props: Record<string, unknown>) => void;
}) {
  const p = section.props;
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Eyebrow">
        <AdminInput
          value={p.eyebrow}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
        />
      </FormField>
      <FormField label="Headline">
        <AdminInput
          value={p.headline}
          onChange={(e) => onChange({ headline: e.target.value })}
        />
      </FormField>
      <FormField label="Subhead">
        <AdminTextarea
          value={p.subhead}
          onChange={(e) => onChange({ subhead: e.target.value })}
          className="min-h-[60px]"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Primary CTA label">
          <AdminInput
            value={p.cta.label}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, label: e.target.value } })
            }
          />
        </FormField>
        <FormField label="Primary CTA href">
          <AdminInput
            value={p.cta.href}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, href: e.target.value } })
            }
          />
        </FormField>
        <FormField label="Secondary CTA label">
          <AdminInput
            value={p.secondaryCta.label}
            onChange={(e) =>
              onChange({
                secondaryCta: { ...p.secondaryCta, label: e.target.value },
              })
            }
          />
        </FormField>
        <FormField label="Secondary CTA href">
          <AdminInput
            value={p.secondaryCta.href}
            onChange={(e) =>
              onChange({
                secondaryCta: { ...p.secondaryCta, href: e.target.value },
              })
            }
          />
        </FormField>
      </div>
      <FormField label="Desktop image">
        <MediaPicker
          value={p.desktopImage.url}
          onChange={(url) =>
            onChange({ desktopImage: { ...p.desktopImage, url } })
          }
        />
      </FormField>
      <FormField label="Desktop image alt text">
        <AdminInput
          value={p.desktopImage.alt}
          onChange={(e) =>
            onChange({
              desktopImage: { ...p.desktopImage, alt: e.target.value },
            })
          }
        />
      </FormField>
    </div>
  );
}

function BrandStoryEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "brandStory" };
  onChange: (props: Record<string, unknown>) => void;
}) {
  const p = section.props;
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Eyebrow">
        <AdminInput
          value={p.eyebrow}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
        />
      </FormField>
      <FormField label="Heading">
        <AdminInput
          value={p.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
        />
      </FormField>
      <FormField label="Body">
        <AdminTextarea
          value={p.body}
          onChange={(e) => onChange({ body: e.target.value })}
          className="min-h-[100px]"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="CTA label">
          <AdminInput
            value={p.cta.label}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, label: e.target.value } })
            }
          />
        </FormField>
        <FormField label="CTA href">
          <AdminInput
            value={p.cta.href}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, href: e.target.value } })
            }
          />
        </FormField>
      </div>
      <FormField label="Image">
        <MediaPicker
          value={p.image.url}
          onChange={(url) => onChange({ image: { ...p.image, url } })}
        />
      </FormField>
    </div>
  );
}

function NewsletterEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "newsletter" };
  onChange: (props: Record<string, unknown>) => void;
}) {
  const p = section.props;
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Eyebrow">
        <AdminInput
          value={p.eyebrow}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
        />
      </FormField>
      <FormField label="Heading">
        <AdminInput
          value={p.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
        />
      </FormField>
      <FormField label="Subhead">
        <AdminTextarea
          value={p.subhead}
          onChange={(e) => onChange({ subhead: e.target.value })}
          className="min-h-[60px]"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Placeholder text">
          <AdminInput
            value={p.placeholder}
            onChange={(e) => onChange({ placeholder: e.target.value })}
          />
        </FormField>
        <FormField label="Button label">
          <AdminInput
            value={p.buttonLabel}
            onChange={(e) => onChange({ buttonLabel: e.target.value })}
          />
        </FormField>
      </div>
    </div>
  );
}

// ─── FeaturedCollectionEditor ─────────────────────────────────────────────────

function FeaturedCollectionEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "featuredCollection" };
  onChange: (props: Partial<FeaturedCollectionProps>) => void;
}) {
  const p = section.props;
  const { collections } = useAdminCollections();
  const { products } = useAdminProducts();
  const [productPickerOpen, setProductPickerOpen] = useState(false);

  const collectionOptions = collections.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const selectedCollection = collections.find((c) => c.id === p.collectionId);

  const toggleProduct = (productId: string) => {
    const current = p.productIds ?? [];
    if (current.includes(productId)) {
      onChange({ productIds: current.filter((id) => id !== productId) });
    } else if (current.length < 8) {
      onChange({ productIds: [...current, productId] });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Eyebrow">
        <AdminInput
          value={p.eyebrow}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
        />
      </FormField>
      <FormField label="Heading">
        <AdminInput
          value={p.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
        />
      </FormField>
      <FormField label="Subhead">
        <AdminInput
          value={p.subhead}
          onChange={(e) => onChange({ subhead: e.target.value })}
        />
      </FormField>
      <FormField label="Collection">
        <AdminSelect
          value={p.collectionId}
          onChange={(e) => {
            const col = collections.find((c) => c.id === e.target.value);
            onChange({
              collectionId: e.target.value,
              cta: {
                ...p.cta,
                href: col ? `/collections/${col.slug}` : p.cta.href,
              },
            });
          }}
          options={collectionOptions}
          placeholder="Select a collection..."
        />
      </FormField>

      {/* Product picker */}
      <FormField
        label={`Featured products (${(p.productIds ?? []).length} / 8)`}
        hint="Select up to 8 products to feature."
      >
        <div className="flex flex-col gap-2">
          {/* Selected chips */}
          {(p.productIds ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {(p.productIds ?? []).map((pid) => {
                const prod = products.find((pr) => pr.id === pid);
                if (!prod) return null;
                return (
                  <span
                    key={pid}
                    className="inline-flex items-center gap-1 rounded-sm bg-muted px-2 py-1 text-[12px]"
                  >
                    {prod.name}
                    <button
                      type="button"
                      onClick={() => toggleProduct(pid)}
                      className="text-muted-foreground hover:text-foreground leading-none"
                      aria-label={`Remove ${prod.name}`}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setProductPickerOpen(true)}
            className="self-start gap-1.5 text-[12px] h-8 rounded-sm"
          >
            <Plus size={14} />
            Choose products
          </Button>
        </div>
      </FormField>

      {/* Product picker dialog */}
      {productPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-sm border border-border bg-card shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <h3 className="text-[14px] font-medium">Choose products</h3>
                <p className="text-[11px] text-muted-foreground">
                  {(p.productIds ?? []).length} selected · max 8
                </p>
              </div>
              <button
                type="button"
                onClick={() => setProductPickerOpen(false)}
                className="text-[20px] text-muted-foreground hover:text-foreground leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-3 flex flex-col gap-1">
              {products.map((prod) => {
                const checked = (p.productIds ?? []).includes(prod.id);
                const disabled =
                  !checked && (p.productIds ?? []).length >= 8;
                const thumb = prod.images[0]?.url;
                return (
                  <label
                    key={prod.id}
                    className={cn(
                      "flex items-center gap-3 rounded-sm border px-3 py-2 cursor-pointer transition-colors",
                      checked
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/30",
                      disabled ? "opacity-40 cursor-not-allowed" : "",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => !disabled && toggleProduct(prod.id)}
                      className="sr-only"
                    />
                    {thumb && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt={prod.images[0]?.alt ?? prod.name}
                        className="h-10 w-10 rounded-sm object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium truncate">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {formatBDT(prod.price)}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "h-4 w-4 rounded-sm border flex items-center justify-center shrink-0",
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border",
                      )}
                    >
                      {checked && (
                        <span className="text-[10px] leading-none">✓</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
            <div className="border-t border-border px-4 py-3 flex justify-end">
              <Button
                size="sm"
                onClick={() => setProductPickerOpen(false)}
                className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <FormField label="CTA label">
          <AdminInput
            value={p.cta.label}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, label: e.target.value } })
            }
          />
        </FormField>
        <FormField
          label="CTA href"
          hint={
            selectedCollection
              ? `Suggestion: /collections/${selectedCollection.slug}`
              : undefined
          }
        >
          <AdminInput
            value={p.cta.href}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, href: e.target.value } })
            }
          />
        </FormField>
      </div>
    </div>
  );
}

// ─── ProcessShowcaseEditor ────────────────────────────────────────────────────

type ProcessStep = ProcessShowcaseProps["steps"][number];

function SortableStepRow({
  step,
  index,
  onChange,
  onRemove,
}: {
  step: ProcessStep;
  index: number;
  onChange: (updated: ProcessStep) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: step.number });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-sm border border-border bg-card p-3 flex flex-col gap-3",
        isDragging ? "opacity-50 shadow-lg" : "",
      )}
    >
      {/* Row header */}
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab text-muted-foreground/60 hover:text-muted-foreground touch-none"
          aria-label="Drag to reorder step"
        >
          <DotsSixVertical size={16} />
        </button>
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground flex-1">
          Step {index + 1}
        </span>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove step"
        >
          <Trash size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Step number">
          <AdminInput
            value={step.number}
            onChange={(e) => onChange({ ...step, number: e.target.value })}
            placeholder="01"
          />
        </FormField>
        <FormField label="Title">
          <AdminInput
            value={step.title}
            onChange={(e) => onChange({ ...step, title: e.target.value })}
            placeholder="Material selection"
          />
        </FormField>
      </div>

      <FormField label="Description">
        <AdminTextarea
          value={step.description}
          onChange={(e) => onChange({ ...step, description: e.target.value })}
          className="min-h-[60px]"
        />
      </FormField>

      <FormField label="Image">
        <MediaPicker
          value={step.image.url}
          onChange={(url) =>
            onChange({ ...step, image: { ...step.image, url } })
          }
        />
      </FormField>
      <FormField label="Image alt text">
        <AdminInput
          value={step.image.alt}
          onChange={(e) =>
            onChange({ ...step, image: { ...step.image, alt: e.target.value } })
          }
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Width (px)">
          <AdminInput
            type="number"
            value={step.image.width}
            onChange={(e) =>
              onChange({
                ...step,
                image: { ...step.image, width: Number(e.target.value) },
              })
            }
          />
        </FormField>
        <FormField label="Height (px)">
          <AdminInput
            type="number"
            value={step.image.height}
            onChange={(e) =>
              onChange({
                ...step,
                image: { ...step.image, height: Number(e.target.value) },
              })
            }
          />
        </FormField>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove step?"
        description={`This will permanently remove step "${step.title || step.number}" from the process showcase.`}
        confirmLabel="Remove"
        onConfirm={onRemove}
      />
    </div>
  );
}

function ProcessShowcaseEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "processShowcase" };
  onChange: (props: Partial<ProcessShowcaseProps>) => void;
}) {
  const p = section.props;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = p.steps.findIndex((s) => s.number === active.id);
    const newIdx = p.steps.findIndex((s) => s.number === over.id);
    onChange({ steps: arrayMove(p.steps, oldIdx, newIdx) });
  };

  const updateStep = (index: number, updated: ProcessStep) => {
    const steps = p.steps.map((s, i) => (i === index ? updated : s));
    onChange({ steps });
  };

  const removeStep = (index: number) => {
    onChange({ steps: p.steps.filter((_, i) => i !== index) });
  };

  const addStep = () => {
    const newNumber = String(p.steps.length + 1).padStart(2, "0");
    onChange({
      steps: [
        ...p.steps,
        {
          number: newNumber,
          title: "",
          description: "",
          image: { url: "", alt: "", width: 400, height: 400 },
        },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Eyebrow">
        <AdminInput
          value={p.eyebrow}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
        />
      </FormField>
      <FormField label="Heading">
        <AdminInput
          value={p.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
        />
      </FormField>

      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Steps ({p.steps.length})
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={p.steps.map((s) => s.number)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {p.steps.map((step, idx) => (
              <SortableStepRow
                key={`${step.number}-${idx}`}
                step={step}
                index={idx}
                onChange={(updated) => updateStep(idx, updated)}
                onRemove={() => removeStep(idx)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addStep}
        className="self-start gap-1.5 text-[12px] h-8 rounded-sm"
      >
        <Plus size={14} />
        Add step
      </Button>
    </div>
  );
}

// ─── TestimonialsEditor ───────────────────────────────────────────────────────

function TestimonialsEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "testimonials" };
  onChange: (props: Partial<TestimonialsProps>) => void;
}) {
  const p = section.props;
  const { testimonials } = useAdminTestimonials();

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Heading">
        <AdminInput
          value={p.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
        />
      </FormField>
      <FormField label="Subhead">
        <AdminInput
          value={p.subhead}
          onChange={(e) => onChange({ subhead: e.target.value })}
        />
      </FormField>

      <FormField
        label="Featured testimonials"
        hint='Toggle "Featured" on individual testimonials to include them here. The "Featured only" toggle below controls whether this section shows all or only featured entries.'
      >
        <div className="flex flex-col gap-1.5 mt-1">
          {testimonials.map((t) => {
            const isFeatured = t.featured;
            return (
              <div
                key={t.id}
                className={cn(
                  "flex items-start gap-3 rounded-sm border px-3 py-2.5",
                  isFeatured ? "border-primary bg-primary/5" : "border-border",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={`Portrait of ${t.author}`}
                  className="h-8 w-8 rounded-full object-cover shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium">{t.author}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {t.role}
                  </div>
                  <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-2">
                    {t.quote}
                  </p>
                </div>
                <div
                  className={cn(
                    "shrink-0 text-[10px] font-medium uppercase tracking-[0.06em] mt-0.5",
                    isFeatured ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {isFeatured ? "Featured" : "Hidden"}
                </div>
              </div>
            );
          })}
          <p className="text-[11px] text-muted-foreground mt-1">
            Manage featured status in{" "}
            <a
              href="/admin/testimonials"
              className="underline hover:text-foreground"
            >
              Testimonials
            </a>
            .
          </p>
        </div>
      </FormField>

      <FormField label="Show featured only">
        <label className="flex items-center gap-2 cursor-pointer select-none mt-1">
          <button
            type="button"
            role="switch"
            aria-checked={p.featuredOnly}
            onClick={() => onChange({ featuredOnly: !p.featuredOnly })}
            className={cn(
              "relative inline-flex h-5 w-9 items-center rounded-full border transition-colors",
              p.featuredOnly
                ? "bg-primary border-primary"
                : "bg-muted border-border",
            )}
          >
            <span
              className={cn(
                "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform",
                p.featuredOnly ? "translate-x-4" : "translate-x-0.5",
              )}
            />
          </button>
          <span className="text-[13px] text-foreground">
            {p.featuredOnly
              ? "Only showing featured testimonials"
              : "Showing all testimonials"}
          </span>
        </label>
      </FormField>
    </div>
  );
}

// ─── JournalPreviewEditor ─────────────────────────────────────────────────────

function JournalPreviewEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "journalPreview" };
  onChange: (props: Partial<JournalPreviewProps>) => void;
}) {
  const p = section.props;
  const { posts } = useAdminJournal();
  const [pickerOpen, setPickerOpen] = useState(false);

  const MAX_POSTS = 3;

  const togglePost = (postId: string) => {
    const current = p.postIds ?? [];
    if (current.includes(postId)) {
      onChange({ postIds: current.filter((id) => id !== postId) });
    } else if (current.length < MAX_POSTS) {
      onChange({ postIds: [...current, postId] });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Eyebrow">
        <AdminInput
          value={p.eyebrow}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
        />
      </FormField>
      <FormField label="Heading">
        <AdminInput
          value={p.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
        />
      </FormField>

      {/* Post picker */}
      <FormField
        label={`Featured posts (${(p.postIds ?? []).length} / ${MAX_POSTS})`}
        hint="Select up to 3 journal posts to preview."
      >
        <div className="flex flex-col gap-2">
          {(p.postIds ?? []).length > 0 && (
            <div className="flex flex-col gap-1.5">
              {(p.postIds ?? []).map((pid) => {
                const post = posts.find((post) => post.id === pid);
                if (!post) return null;
                return (
                  <div
                    key={pid}
                    className="flex items-center gap-2 rounded-sm border border-primary bg-primary/5 px-3 py-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage.url}
                      alt={post.coverImage.alt}
                      className="h-8 w-12 rounded-sm object-cover shrink-0"
                    />
                    <span className="flex-1 text-[12px] font-medium truncate">
                      {post.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePost(pid)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Remove ${post.title}`}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPickerOpen(true)}
            className="self-start gap-1.5 text-[12px] h-8 rounded-sm"
          >
            <Plus size={14} />
            Choose posts
          </Button>
        </div>
      </FormField>

      {/* Post picker overlay */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-sm border border-border bg-card shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <h3 className="text-[14px] font-medium">Choose journal posts</h3>
                <p className="text-[11px] text-muted-foreground">
                  {(p.postIds ?? []).length} selected · max {MAX_POSTS}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="text-[20px] text-muted-foreground hover:text-foreground leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-3 flex flex-col gap-1">
              {posts.map((post) => {
                const checked = (p.postIds ?? []).includes(post.id);
                const disabled =
                  !checked && (p.postIds ?? []).length >= MAX_POSTS;
                return (
                  <label
                    key={post.id}
                    className={cn(
                      "flex items-center gap-3 rounded-sm border px-3 py-2 cursor-pointer transition-colors",
                      checked
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/30",
                      disabled ? "opacity-40 cursor-not-allowed" : "",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => !disabled && togglePost(post.id)}
                      className="sr-only"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage.url}
                      alt={post.coverImage.alt}
                      className="h-12 w-16 rounded-sm object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium truncate">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground flex flex-wrap gap-1 mt-0.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm bg-muted px-1 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "h-4 w-4 rounded-sm border flex items-center justify-center shrink-0",
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border",
                      )}
                    >
                      {checked && (
                        <span className="text-[10px] leading-none">✓</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
            <div className="border-t border-border px-4 py-3 flex justify-end">
              <Button
                size="sm"
                onClick={() => setPickerOpen(false)}
                className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <FormField label="View all label">
          <AdminInput
            value={p.cta.label}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, label: e.target.value } })
            }
          />
        </FormField>
        <FormField label="View all href">
          <AdminInput
            value={p.cta.href}
            onChange={(e) =>
              onChange({ cta: { ...p.cta, href: e.target.value } })
            }
          />
        </FormField>
      </div>
    </div>
  );
}

// ─── InstagramFeedEditor ──────────────────────────────────────────────────────

type InstagramImage = InstagramFeedProps["images"][number];

function InstagramFeedEditor({
  section,
  onChange,
}: {
  section: HomeSection & { type: "instagramFeed" };
  onChange: (props: Partial<InstagramFeedProps>) => void;
}) {
  const p = section.props;
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  const updateImage = (index: number, updated: InstagramImage) => {
    const images = p.images.map((img, i) => (i === index ? updated : img));
    onChange({ images });
  };

  const removeImage = (index: number) => {
    onChange({ images: p.images.filter((_, i) => i !== index) });
  };

  const addImage = () => {
    onChange({
      images: [
        ...p.images,
        { url: "", alt: "", likeCount: 0 },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Eyebrow">
        <AdminInput
          value={p.eyebrow}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
          placeholder="@msweaver.bd"
        />
      </FormField>
      <FormField label="Heading">
        <AdminInput
          value={p.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          placeholder="Follow us on Instagram"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Handle">
          <AdminInput
            value={p.handle}
            onChange={(e) => onChange({ handle: e.target.value })}
            placeholder="@msweaver.bd"
          />
        </FormField>
        <FormField label="Profile URL">
          <AdminInput
            value={p.href}
            onChange={(e) => onChange({ href: e.target.value })}
            placeholder="https://instagram.com/msweaver.bd"
          />
        </FormField>
      </div>

      {/* Images */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Images ({p.images.length})
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {p.images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-sm border border-border bg-card p-3 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Image {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => setConfirmIndex(idx)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`Remove image ${idx + 1}`}
              >
                <Trash size={14} />
              </button>
            </div>

            <FormField label="Image URL">
              <MediaPicker
                value={img.url}
                onChange={(url) => updateImage(idx, { ...img, url })}
              />
            </FormField>
            <FormField label="Alt text">
              <AdminInput
                value={img.alt}
                onChange={(e) =>
                  updateImage(idx, { ...img, alt: e.target.value })
                }
              />
            </FormField>
            <FormField label="Like count">
              <AdminInput
                type="number"
                value={img.likeCount}
                onChange={(e) =>
                  updateImage(idx, {
                    ...img,
                    likeCount: Number(e.target.value),
                  })
                }
              />
            </FormField>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addImage}
        className="self-start gap-1.5 text-[12px] h-8 rounded-sm"
        disabled={p.images.length >= 12}
      >
        <Plus size={14} />
        Add image
      </Button>

      <ConfirmDialog
        open={confirmIndex !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmIndex(null);
        }}
        title="Remove image?"
        description="This will remove the image from the Instagram feed section."
        confirmLabel="Remove"
        onConfirm={() => {
          if (confirmIndex !== null) removeImage(confirmIndex);
          setConfirmIndex(null);
        }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeBuilderPage() {
  const { sections, toggleSection, reorderSections, updateSectionProps } =
    useAdminHomeBuilder();
  const [activeType, setActiveType] = useState<HomeSection["type"] | null>(
    sections[0]?.type ?? null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.type === active.id);
    const newIndex = sections.findIndex((s) => s.type === over.id);
    reorderSections(arrayMove(sections, oldIndex, newIndex));
  };

  const activeSection = sections.find((s) => s.type === activeType) ?? null;

  const handleSave = () => {
    console.log("[Admin] Home builder saved:", sections);
    toast.success("Home page updated");
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="STOREFRONT"
        title="Home builder"
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("/", "_blank")}
              className="gap-1.5 rounded-sm text-[12px] h-8"
            >
              <ArrowSquareOut size={14} />
              Preview site
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
            >
              <FloppyDisk size={14} />
              Save &amp; publish
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Left: section list (5/12) */}
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-sm border border-border overflow-hidden">
            <div className="border-b border-border bg-card px-3 py-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Sections
              </span>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map((s) => s.type)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-1 p-2">
                  {sections.map((section) => (
                    <SectionItem
                      key={section.type}
                      section={section}
                      isActive={activeType === section.type}
                      onSelect={() => setActiveType(section.type)}
                      onToggle={() => toggleSection(section.type)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Right: editor (7/12) */}
        <div className="col-span-12 lg:col-span-7">
          {activeSection ? (
            <div className="rounded-sm border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  Editing
                </div>
                <h2 className="font-serif text-[18px] font-normal text-foreground mt-0.5">
                  {SECTION_LABELS[activeSection.type]}
                </h2>
              </div>
              <div className="p-4">
                {activeSection.type === "hero" && (
                  <HeroEditor
                    section={activeSection as HomeSection & { type: "hero" }}
                    onChange={(props) => updateSectionProps("hero", props)}
                  />
                )}
                {activeSection.type === "brandStory" && (
                  <BrandStoryEditor
                    section={
                      activeSection as HomeSection & { type: "brandStory" }
                    }
                    onChange={(props) =>
                      updateSectionProps("brandStory", props)
                    }
                  />
                )}
                {activeSection.type === "newsletter" && (
                  <NewsletterEditor
                    section={
                      activeSection as HomeSection & { type: "newsletter" }
                    }
                    onChange={(props) =>
                      updateSectionProps("newsletter", props)
                    }
                  />
                )}
                {activeSection.type === "featuredCollection" && (
                  <FeaturedCollectionEditor
                    section={
                      activeSection as HomeSection & {
                        type: "featuredCollection";
                      }
                    }
                    onChange={(props) =>
                      updateSectionProps("featuredCollection", props)
                    }
                  />
                )}
                {activeSection.type === "processShowcase" && (
                  <ProcessShowcaseEditor
                    section={
                      activeSection as HomeSection & {
                        type: "processShowcase";
                      }
                    }
                    onChange={(props) =>
                      updateSectionProps("processShowcase", props)
                    }
                  />
                )}
                {activeSection.type === "testimonials" && (
                  <TestimonialsEditor
                    section={
                      activeSection as HomeSection & { type: "testimonials" }
                    }
                    onChange={(props) =>
                      updateSectionProps("testimonials", props)
                    }
                  />
                )}
                {activeSection.type === "journalPreview" && (
                  <JournalPreviewEditor
                    section={
                      activeSection as HomeSection & {
                        type: "journalPreview";
                      }
                    }
                    onChange={(props) =>
                      updateSectionProps("journalPreview", props)
                    }
                  />
                )}
                {activeSection.type === "instagramFeed" && (
                  <InstagramFeedEditor
                    section={
                      activeSection as HomeSection & { type: "instagramFeed" }
                    }
                    onChange={(props) =>
                      updateSectionProps("instagramFeed", props)
                    }
                  />
                )}
              </div>
              <div className="border-t border-border px-4 py-3">
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
                >
                  Save section
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-sm border border-dashed border-border py-20">
              <p className="text-[13px] text-muted-foreground">
                Select a section from the list to edit it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
