"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CaretLeft, FloppyDisk, Star } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminJournal } from "@/lib/store/admin/journal";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { FormField, AdminInput, AdminTextarea, AdminSelect, ChipInput } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Tab type ─────────────────────────────────────────────────────────────────

type Tab = "content" | "media" | "meta" | "seo";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JournalPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { posts, updatePost } = useAdminJournal();
  const post = posts.find((p) => p.id === id);

  const [tab, setTab] = useState<Tab>("content");
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [bodyHtml, setBodyHtml] = useState(post?.bodyHtml ?? "");
  const [coverUrl, setCoverUrl] = useState(post?.coverImage.url ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.coverImage.alt ?? "");
  const [author, setAuthor] = useState(post?.author.name ?? "Ashfia Khatun");
  const [tags, setTags] = useState(post?.tags ?? []);
  const [readingTime, setReadingTime] = useState(String(post?.readingTimeMin ?? 5));
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt
      ? new Date(post.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [metaTitle, setMetaTitle] = useState(post?.seo.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.seo.metaDescription ?? "");
  const [ogImage, setOgImage] = useState(post?.seo.ogImage ?? "");
  const [focusKeyword, setFocusKeyword] = useState(post?.seo.focusKeyword ?? "");

  if (!post) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/admin/journal" className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
          <CaretLeft size={14} />
          Back to journal
        </Link>
        <p className="text-[13px] text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  const handleSave = () => {
    updatePost(post.id, {
      title,
      excerpt,
      bodyHtml,
      coverImage: { ...post.coverImage, url: coverUrl, alt: coverAlt },
      author: { ...post.author, name: author },
      tags,
      readingTimeMin: Number(readingTime),
      publishedAt: new Date(publishedAt).toISOString(),
      status,
      featured,
      seo: { metaTitle, metaDescription, ogImage, focusKeyword },
    });
    toast.success("Post saved");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "content", label: "Content" },
    { id: "media", label: "Media" },
    { id: "meta", label: "Meta" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Link href="/admin/journal" className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
        <CaretLeft size={13} />
        Journal
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-0.5">JOURNAL POST</div>
          <h1 className="font-serif text-[22px] font-normal text-foreground">{title || "Untitled post"}</h1>
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
        {/* Main (8/12) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {/* Title */}
          <div className="rounded-sm border border-border bg-card p-4">
            <FormField label="Post title" required>
              <AdminInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-[18px]"
                placeholder="Post title..."
              />
            </FormField>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-4 py-2 text-[13px] font-medium transition-colors border-b-2 -mb-px",
                  tab === t.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === "content" && (
            <div className="flex flex-col gap-3">
              <FormField label="Excerpt">
                <AdminTextarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short summary shown in the journal index..."
                  className="min-h-[64px]"
                />
              </FormField>
              <FormField label="Body">
                <TiptapEditor
                  value={bodyHtml}
                  onChange={setBodyHtml}
                  placeholder="Begin writing the post..."
                  minHeight="320px"
                />
              </FormField>
            </div>
          )}

          {tab === "media" && (
            <div className="flex flex-col gap-3 rounded-sm border border-border bg-card p-4">
              <FormField label="Cover image">
                <MediaPicker value={coverUrl} onChange={setCoverUrl} />
              </FormField>
              <FormField label="Cover image alt text">
                <AdminInput value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} placeholder="Describe the cover image..." />
              </FormField>
              {coverUrl && (
                <div className="overflow-hidden rounded-sm border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverUrl} alt={coverAlt} className="w-full max-h-48 object-cover" />
                </div>
              )}
            </div>
          )}

          {tab === "meta" && (
            <div className="flex flex-col gap-3 rounded-sm border border-border bg-card p-4">
              <FormField label="Author name">
                <AdminInput value={author} onChange={(e) => setAuthor(e.target.value)} />
              </FormField>
              <FormField label="Tags">
                <ChipInput value={tags} onChange={setTags} placeholder="Add tag and press Enter..." />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Reading time (min)">
                  <AdminInput type="number" value={readingTime} onChange={(e) => setReadingTime(e.target.value)} min="1" />
                </FormField>
                <FormField label="Published date">
                  <AdminInput type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
                </FormField>
              </div>
            </div>
          )}

          {tab === "seo" && (
            <div className="flex flex-col gap-3 rounded-sm border border-border bg-card p-4">
              <FormField label="Meta title">
                <AdminInput value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Post title for search engines..." />
              </FormField>
              <FormField label="Meta description">
                <AdminTextarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Brief description for search results..." className="min-h-[64px]" />
              </FormField>
              <FormField label="OG image">
                <MediaPicker value={ogImage} onChange={setOgImage} />
              </FormField>
              <FormField label="Focus keyword">
                <AdminInput value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} placeholder="primary keyword..." />
              </FormField>
            </div>
          )}
        </div>

        {/* Sidebar (4/12) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          <div className="rounded-sm border border-border bg-card p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Status</div>
            <FormField label="Publish status">
              <AdminSelect
                value={status}
                onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                options={[
                  { value: "published", label: "Published" },
                  { value: "draft", label: "Draft" },
                ]}
              />
            </FormField>

            <div className="flex items-center justify-between py-1 border-t border-border mt-1">
              <div>
                <div className="text-[13px] text-foreground">Featured post</div>
                <div className="text-[11px] text-muted-foreground">Show at the top of the journal</div>
              </div>
              <button
                type="button"
                onClick={() => setFeatured((v) => !v)}
                className="text-muted-foreground hover:text-amber-500 transition-colors"
                aria-label={featured ? "Unfeature post" : "Feature post"}
              >
                <Star size={18} weight={featured ? "fill" : "regular"} className={featured ? "text-amber-500" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-sm py-3 flex justify-end">
        <Button
          size="sm"
          onClick={handleSave}
          className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
        >
          <FloppyDisk size={14} />
          Save post
        </Button>
      </div>
    </div>
  );
}
