"use client";

import { useState } from "react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminCategories } from "@/lib/store/admin/categories";
import { useAdminProducts } from "@/lib/store/admin/products";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  FormField,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/AdminFormPrimitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/mock/categories";

// ─── Category Dialog ──────────────────────────────────────────────────────────

function CategoryDialog({
  category,
  open,
  onOpenChange,
  onSave,
}: {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { name: string; slug: string; description: string }) => void;
}) {
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpenChange = (open: boolean) => {
    if (open && category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description);
    } else if (!open) {
      setName("");
      setSlug("");
      setDescription("");
      setErrors({});
    }
    onOpenChange(open);
  };

  const handleSave = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs["name"] = "Name is required";
    if (!slug.trim()) errs["slug"] = "Slug is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSave({ name, slug, description });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">
            {category ? "Edit category" : "New category"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <FormField label="Name" required error={errors["name"]}>
            <AdminInput
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!category) {
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, ""),
                  );
                }
              }}
              error={!!errors["name"]}
              placeholder="Throws"
            />
          </FormField>
          <FormField label="Slug" required error={errors["slug"]}>
            <AdminInput
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              error={!!errors["slug"]}
              placeholder="throws"
            />
          </FormField>
          <FormField label="Description">
            <AdminTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              className="min-h-[80px]"
            />
          </FormField>
        </div>

        <DialogFooter className="border-0 bg-transparent p-0 pt-2">
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
            {category ? "Save" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useAdminCategories();
  const products = useAdminProducts((s) => s.products);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const getProductCount = (categoryId: string) =>
    products.filter((p) => p.categoryId === categoryId).length;

  const columns: Column<Category>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (c) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">{c.name}</div>
          <div className="text-[11px] text-muted-foreground">{c.slug}</div>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (c) => (
        <span className="text-[12px] text-muted-foreground line-clamp-1">
          {c.description}
        </span>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      render: (c) => (
        <span className="text-[13px] text-foreground">{getProductCount(c.id)}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-20",
      render: (c) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              setEditingCategory(c);
              setDialogOpen(true);
            }}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Edit category"
          >
            <PencilSimple size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDeleteTarget(c.id)}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Delete category"
          >
            <Trash size={14} />
          </Button>
        </div>
      ),
    },
  ];

  const handleSave = (data: {
    name: string;
    slug: string;
    description: string;
  }) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, data);
      toast.success("Category saved");
    } else {
      addCategory({
        id: data.slug,
        ...data,
      });
      toast.success("Category created");
    }
    setEditingCategory(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CATALOG"
        title="Categories"
        actions={
          <Button
            size="sm"
            onClick={() => {
              setEditingCategory(null);
              setDialogOpen(true);
            }}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            Add Category
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={categories}
        getRowId={(c) => c.id}
        emptyState="No categories found."
      />

      <CategoryDialog
        category={editingCategory}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingCategory(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete category"
        description="This will permanently delete this category. Products assigned to it will not be deleted."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteTarget) {
            deleteCategory(deleteTarget);
            toast.success("Category deleted");
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
