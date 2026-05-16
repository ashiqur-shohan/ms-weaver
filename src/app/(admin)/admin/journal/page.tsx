"use client";

import { useRouter } from "next/navigation";
import { Plus, Star } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminJournal } from "@/lib/store/admin/journal";
import type { AdminJournalPost } from "@/lib/store/admin/journal";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JournalPage() {
  const router = useRouter();
  const { posts, addPost } = useAdminJournal();

  const handleNewPost = () => {
    const id = `journal_${Date.now()}`;
    addPost({
      id,
      slug: `untitled-${Date.now()}`,
      title: "Untitled post",
      excerpt: "",
      coverImage: { url: "", alt: "", width: 1200, height: 800 },
      author: { name: "Ashfia Khatun", role: "Founder & Maker", avatar: "" },
      publishedAt: new Date().toISOString(),
      readingTimeMin: 5,
      tags: [],
      content: [],
      status: "draft",
      featured: false,
      bodyHtml: "",
      seo: { metaTitle: "", metaDescription: "", ogImage: "", focusKeyword: "" },
    });
    router.push(`/admin/journal/${id}`);
  };

  const columns: Column<AdminJournalPost>[] = [
    {
      key: "cover",
      header: "",
      className: "w-12",
      render: (p) =>
        p.coverImage.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.coverImage.url}
            alt={p.coverImage.alt}
            className="h-10 w-10 rounded-sm object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-sm bg-muted" />
        ),
    },
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (p) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">{p.title}</div>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {p.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-sm bg-muted px-1 py-0.5 text-[10px] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "author",
      header: "Author",
      render: (p) => (
        <span className="text-[12px] text-muted-foreground">{p.author.name}</span>
      ),
    },
    {
      key: "publishedAt",
      header: "Published",
      sortable: true,
      render: (p) => (
        <span className="text-[12px] text-muted-foreground">
          {new Date(p.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <span className={`text-[10px] uppercase tracking-[0.06em] font-medium rounded-sm border px-1.5 py-0.5 ${
          p.status === "published"
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-border bg-muted text-muted-foreground"
        }`}>
          {p.status}
        </span>
      ),
    },
    {
      key: "featured",
      header: "",
      className: "w-8",
      render: (p) =>
        p.featured ? (
          <Star size={14} weight="fill" className="text-amber-500" />
        ) : null,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CONTENT"
        title="Journal"
        actions={
          <Button
            size="sm"
            onClick={handleNewPost}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            New post
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={posts}
        getRowId={(p) => p.id}
        onRowClick={(p) => router.push(`/admin/journal/${p.id}`)}
        emptyState="No posts yet."
      />
    </div>
  );
}
