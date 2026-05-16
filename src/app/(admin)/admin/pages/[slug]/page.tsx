"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CaretLeft, FloppyDisk } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminPages } from "@/lib/store/admin/pages";
import { BlockEditor } from "@/components/admin/BlockEditor";
import { FormField, AdminInput, AdminSelect } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import type { ContentBlock } from "@/lib/mock/journal";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PageEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { pages, updatePage } = useAdminPages();
  const page = pages.find((p) => p.id === slug);

  const [title, setTitle] = useState(page?.title ?? "");
  const [pageSlug, setPageSlug] = useState(page?.slug ?? "");
  const [status, setStatus] = useState(page?.status ?? "draft");
  const [blocks, setBlocks] = useState<ContentBlock[]>(page?.blocks ?? []);
  const [metaTitle, setMetaTitle] = useState(page?.seo.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(page?.seo.metaDescription ?? "");

  if (!page) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/admin/pages" className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
          <CaretLeft size={14} />
          Back to pages
        </Link>
        <p className="text-[13px] text-muted-foreground">Page not found.</p>
      </div>
    );
  }

  const handleSave = () => {
    updatePage(page.id, {
      title,
      slug: pageSlug,
      status,
      blocks,
      seo: { ...page.seo, metaTitle, metaDescription },
    });
    toast.success("Page saved");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Link href="/admin/pages" className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
        <CaretLeft size={13} />
        Pages
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-0.5">PAGE</div>
          <h1 className="font-serif text-[22px] font-normal text-foreground">{title}</h1>
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
        >
          <FloppyDisk size={14} />
          Save
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main content (8/12) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {/* Page meta */}
          <div className="rounded-sm border border-border bg-card p-4 flex flex-col gap-3">
            <FormField label="Page title" required>
              <AdminInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormField>
            <FormField label="Slug" hint="URL path — e.g. about, legal/privacy">
              <AdminInput
                value={pageSlug}
                onChange={(e) => setPageSlug(e.target.value)}
                className="font-mono text-[13px]"
              />
            </FormField>
          </div>

          {/* Block editor */}
          <div className="rounded-sm border border-border bg-card p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">
              Content blocks
            </div>
            <BlockEditor blocks={blocks} onChange={setBlocks} />
          </div>

          {/* SEO */}
          <div className="rounded-sm border border-border bg-card p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">SEO</div>
            <FormField label="Meta title">
              <AdminInput value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Page title for search engines..." />
            </FormField>
            <FormField label="Meta description">
              <AdminInput value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Brief description for search results..." />
            </FormField>
          </div>
        </div>

        {/* Sidebar (4/12) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-sm border border-border bg-card p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Status</div>
            <FormField label="Visibility">
              <AdminSelect
                value={status}
                onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                options={[
                  { value: "published", label: "Published" },
                  { value: "draft", label: "Draft" },
                ]}
              />
            </FormField>
            <div className="text-[11px] text-muted-foreground">
              <strong>{blocks.length}</strong> block{blocks.length !== 1 ? "s" : ""}
            </div>
            <div className="text-[11px] text-muted-foreground">
              Last saved:{" "}
              {new Date(page.updatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm px-0 py-3 flex justify-end">
        <Button
          size="sm"
          onClick={handleSave}
          className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
        >
          <FloppyDisk size={14} />
          Save page
        </Button>
      </div>
    </div>
  );
}
