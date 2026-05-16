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
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminHomeBuilder } from "@/lib/store/admin/homeBuilder";
import type { HomeSection } from "@/lib/mock/home";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { FormField, AdminInput, AdminTextarea, AdminSelect } from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { cn } from "@/lib/utils";

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
        <div className={cn("text-[11px] uppercase tracking-[0.06em]", section.enabled ? "text-green-600" : "text-muted-foreground")}>
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
        <AdminInput value={p.eyebrow} onChange={(e) => onChange({ eyebrow: e.target.value })} />
      </FormField>
      <FormField label="Headline">
        <AdminInput value={p.headline} onChange={(e) => onChange({ headline: e.target.value })} />
      </FormField>
      <FormField label="Subhead">
        <AdminTextarea value={p.subhead} onChange={(e) => onChange({ subhead: e.target.value })} className="min-h-[60px]" />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Primary CTA label">
          <AdminInput value={p.cta.label} onChange={(e) => onChange({ cta: { ...p.cta, label: e.target.value } })} />
        </FormField>
        <FormField label="Primary CTA href">
          <AdminInput value={p.cta.href} onChange={(e) => onChange({ cta: { ...p.cta, href: e.target.value } })} />
        </FormField>
        <FormField label="Secondary CTA label">
          <AdminInput value={p.secondaryCta.label} onChange={(e) => onChange({ secondaryCta: { ...p.secondaryCta, label: e.target.value } })} />
        </FormField>
        <FormField label="Secondary CTA href">
          <AdminInput value={p.secondaryCta.href} onChange={(e) => onChange({ secondaryCta: { ...p.secondaryCta, href: e.target.value } })} />
        </FormField>
      </div>
      <FormField label="Desktop image">
        <MediaPicker value={p.desktopImage.url} onChange={(url) => onChange({ desktopImage: { ...p.desktopImage, url } })} />
      </FormField>
      <FormField label="Desktop image alt text">
        <AdminInput value={p.desktopImage.alt} onChange={(e) => onChange({ desktopImage: { ...p.desktopImage, alt: e.target.value } })} />
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
        <AdminInput value={p.eyebrow} onChange={(e) => onChange({ eyebrow: e.target.value })} />
      </FormField>
      <FormField label="Heading">
        <AdminInput value={p.heading} onChange={(e) => onChange({ heading: e.target.value })} />
      </FormField>
      <FormField label="Body">
        <AdminTextarea value={p.body} onChange={(e) => onChange({ body: e.target.value })} className="min-h-[100px]" />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="CTA label">
          <AdminInput value={p.cta.label} onChange={(e) => onChange({ cta: { ...p.cta, label: e.target.value } })} />
        </FormField>
        <FormField label="CTA href">
          <AdminInput value={p.cta.href} onChange={(e) => onChange({ cta: { ...p.cta, href: e.target.value } })} />
        </FormField>
      </div>
      <FormField label="Image">
        <MediaPicker value={p.image.url} onChange={(url) => onChange({ image: { ...p.image, url } })} />
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
        <AdminInput value={p.eyebrow} onChange={(e) => onChange({ eyebrow: e.target.value })} />
      </FormField>
      <FormField label="Heading">
        <AdminInput value={p.heading} onChange={(e) => onChange({ heading: e.target.value })} />
      </FormField>
      <FormField label="Subhead">
        <AdminTextarea value={p.subhead} onChange={(e) => onChange({ subhead: e.target.value })} className="min-h-[60px]" />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Placeholder text">
          <AdminInput value={p.placeholder} onChange={(e) => onChange({ placeholder: e.target.value })} />
        </FormField>
        <FormField label="Button label">
          <AdminInput value={p.buttonLabel} onChange={(e) => onChange({ buttonLabel: e.target.value })} />
        </FormField>
      </div>
    </div>
  );
}

function GenericSectionEditor({
  section,
}: {
  section: HomeSection;
}) {
  return (
    <div className="rounded-sm border border-dashed border-border py-8 text-center">
      <p className="text-[13px] text-muted-foreground">
        Visual editor for <strong>{SECTION_LABELS[section.type]}</strong> coming in Phase 2.
      </p>
      <p className="text-[11px] text-muted-foreground/60 mt-1">
        Toggle visibility and reorder using the list on the left.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeBuilderPage() {
  const { sections, toggleSection, reorderSections, updateSectionProps } = useAdminHomeBuilder();
  const [activeType, setActiveType] = useState<HomeSection["type"] | null>(sections[0]?.type ?? null);

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
                    section={activeSection as HomeSection & { type: "brandStory" }}
                    onChange={(props) => updateSectionProps("brandStory", props)}
                  />
                )}
                {activeSection.type === "newsletter" && (
                  <NewsletterEditor
                    section={activeSection as HomeSection & { type: "newsletter" }}
                    onChange={(props) => updateSectionProps("newsletter", props)}
                  />
                )}
                {!["hero", "brandStory", "newsletter"].includes(activeSection.type) && (
                  <GenericSectionEditor section={activeSection} />
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
