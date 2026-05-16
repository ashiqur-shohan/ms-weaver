"use client";

import { useState } from "react";
import {
  DotsThreeVertical,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminCollections } from "@/lib/store/admin/collections";
import { useAdminProducts } from "@/lib/store/admin/products";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  FormField,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/lib/mock/collections";

// ─── Edit Sheet ────────────────────────────────────────────────────────────────

function CollectionEditSheet({
  collection,
  open,
  onOpenChange,
}: {
  collection: Collection | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { updateCollection } = useAdminCollections();
  const [name, setName] = useState(collection?.name ?? "");
  const [slug, setSlug] = useState(collection?.slug ?? "");
  const [tagline, setTagline] = useState(collection?.tagline ?? "");
  const [description, setDescription] = useState(
    collection?.description ?? "",
  );
  const [heroImage, setHeroImage] = useState(
    collection?.heroImage.url ?? "",
  );

  // Reset on open
  const handleOpenChange = (open: boolean) => {
    if (open && collection) {
      setName(collection.name);
      setSlug(collection.slug);
      setTagline(collection.tagline);
      setDescription(collection.description);
      setHeroImage(collection.heroImage.url);
    }
    onOpenChange(open);
  };

  const handleSave = () => {
    if (!collection) return;
    updateCollection(collection.id, {
      name,
      slug,
      tagline,
      description,
      heroImage: {
        ...collection.heroImage,
        url: heroImage,
      },
    });
    toast.success("Collection saved");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-[420px] flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="text-[15px]">
            Edit collection
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          <FormField label="Name" required>
            <AdminInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bridal"
            />
          </FormField>
          <FormField label="Slug">
            <AdminInput
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="bridal"
            />
          </FormField>
          <FormField label="Tagline">
            <AdminInput
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="A short tagline..."
            />
          </FormField>
          <FormField label="Description">
            <AdminTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
              placeholder="Collection description..."
            />
          </FormField>
          <FormField label="Hero image URL">
            <MediaPicker
              value={heroImage}
              onChange={setHeroImage}
              placeholder="https://..."
            />
          </FormField>

          <div className="text-[12px] text-muted-foreground pt-2">
            Product assignment available in Part 2 when database integration is
            complete.
          </div>
        </div>

        <div className="border-t border-border px-6 py-4 flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-[12px] text-muted-foreground"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CollectionsPage() {
  const { collections, deleteCollection } = useAdminCollections();
  const products = useAdminProducts((s) => s.products);

  const [editingCollection, setEditingCollection] =
    useState<Collection | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const getProductCount = (collectionId: string) =>
    products.filter((p) => p.collectionIds.includes(collectionId)).length;

  const columns: Column<Collection>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (c) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">
            {c.name}
          </div>
          <div className="text-[11px] text-muted-foreground">{c.slug}</div>
        </div>
      ),
    },
    {
      key: "tagline",
      header: "Tagline",
      render: (c) => (
        <span className="text-[12px] text-muted-foreground line-clamp-1">
          {c.tagline}
        </span>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      sortable: true,
      render: (c) => (
        <span className="text-[13px] text-foreground">
          {getProductCount(c.id)}
        </span>
      ),
    },
    {
      key: "order",
      header: "Order",
      sortable: true,
      render: (c) => (
        <span className="text-[12px] text-muted-foreground">{c.order}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      render: (c) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Actions"
              className="text-muted-foreground"
            >
              <DotsThreeVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="gap-2 text-[13px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setEditingCollection(c);
                setSheetOpen(true);
              }}
            >
              <PencilSimple size={13} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-[13px] text-destructive cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget(c.id);
              }}
            >
              <Trash size={13} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="CATALOG" title="Collections" />

      <DataTable
        columns={columns}
        data={collections}
        getRowId={(c) => c.id}
        onRowClick={(c) => {
          setEditingCollection(c);
          setSheetOpen(true);
        }}
        emptyState="No collections found."
      />

      <CollectionEditSheet
        collection={editingCollection}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete collection"
        description="This will permanently delete this collection. Products in this collection will not be deleted, but the collection assignment will be removed."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteTarget) {
            deleteCollection(deleteTarget);
            toast.success("Collection deleted");
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
