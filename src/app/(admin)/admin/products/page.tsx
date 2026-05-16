"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DotsThreeVertical,
  PencilSimple,
  Copy,
  Trash,
  Plus,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminProducts } from "@/lib/store/admin/products";
import { useAdminCollections } from "@/lib/store/admin/collections";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";
import type { Product } from "@/lib/mock/products";

// ─── Filter Component ─────────────────────────────────────────────────────────

function ProductFilters({
  collectionFilter,
  setCollectionFilter,
  statusFilter,
  setStatusFilter,
  stockFilter,
  setStockFilter,
  search,
  setSearch,
}: {
  collectionFilter: string;
  setCollectionFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  stockFilter: string;
  setStockFilter: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  const collections = useAdminCollections((s) => s.collections);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="h-8 border-b border-border bg-transparent text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors px-0 w-48"
      />
      <select
        value={collectionFilter}
        onChange={(e) => setCollectionFilter(e.target.value)}
        className="h-8 rounded-sm border border-border bg-card text-[12px] px-2 focus:outline-none focus:border-foreground"
      >
        <option value="">All collections</option>
        {collections.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-8 rounded-sm border border-border bg-card text-[12px] px-2 focus:outline-none focus:border-foreground"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
      </select>
      <select
        value={stockFilter}
        onChange={(e) => setStockFilter(e.target.value)}
        className="h-8 rounded-sm border border-border bg-card text-[12px] px-2 focus:outline-none focus:border-foreground"
      >
        <option value="">All stock</option>
        <option value="in_stock">In stock</option>
        <option value="low">Low ({"<"}3)</option>
        <option value="out">Out of stock</option>
      </select>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const router = useRouter();
  const { products, deleteProduct, duplicateProduct, updateProduct } =
    useAdminProducts();
  const collections = useAdminCollections((s) => s.collections);

  const [search, setSearch] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Filtered data
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.slug.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (collectionFilter && !p.collectionIds.includes(collectionFilter))
        return false;
      if (statusFilter && p.status !== statusFilter) return false;
      if (stockFilter === "in_stock" && p.stock < 1) return false;
      if (stockFilter === "low" && !(p.stock > 0 && p.stock < 3)) return false;
      if (stockFilter === "out" && p.stock > 0) return false;
      return true;
    });
  }, [products, search, collectionFilter, statusFilter, stockFilter]);

  const getCollectionName = (ids: string[]) => {
    if (ids.length === 0) return "—";
    const names = ids
      .map((id) => collections.find((c) => c.id === id)?.name ?? id)
      .slice(0, 2);
    return names.join(", ") + (ids.length > 2 ? ` +${ids.length - 2}` : "");
  };

  const columns: Column<Product>[] = [
    {
      key: "thumbnail",
      header: "",
      className: "w-12",
      render: (p) => {
        const img = p.images[0];
        return img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.url}
            alt={img.alt}
            className="h-10 w-8 rounded-sm object-cover"
          />
        ) : (
          <div className="h-10 w-8 rounded-sm bg-muted" />
        );
      },
    },
    {
      key: "name",
      header: "Product",
      sortable: true,
      render: (p) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">
            {p.name}
          </div>
          <div className="text-[11px] text-muted-foreground">{p.slug}</div>
        </div>
      ),
    },
    {
      key: "collectionIds",
      header: "Collection",
      render: (p) => (
        <span className="text-[12px] text-muted-foreground">
          {getCollectionName(p.collectionIds)}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (p) => (
        <span className="text-[13px] text-foreground">
          {formatBDT(p.price)}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      render: (p) => (
        <span
          className={
            p.stock === 0
              ? "text-red-600 text-[13px]"
              : p.stock < 3
                ? "text-amber-600 text-[13px]"
                : "text-foreground text-[13px]"
          }
        >
          {p.stock}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => <StatusPill status={p.status} />,
    },
    {
      key: "leadTimeDays",
      header: "Lead time",
      render: (p) => (
        <span className="text-[12px] text-muted-foreground">
          {p.leadTimeDays}d
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      render: (p) => (
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
                router.push(`/admin/products/${p.id}`);
              }}
            >
              <PencilSimple size={13} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-[13px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                duplicateProduct(p.id);
                toast.success("Product duplicated as draft");
              }}
            >
              <Copy size={13} />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-[13px] text-destructive cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget(p.id);
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

  const handleBulkStatusChange = (
    ids: string[],
    status: "active" | "draft",
  ) => {
    ids.forEach((id) => updateProduct(id, { status }));
    toast.success(`${ids.length} product(s) set to ${status}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CATALOG"
        title="Products"
        actions={
          <Link href="/admin/products/new">
            <Button
              size="sm"
              className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
            >
              <Plus size={14} />
              New Product
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={filteredProducts}
        getRowId={(p) => p.id}
        onRowClick={(p) => router.push(`/admin/products/${p.id}`)}
        selectable
        bulkActions={(ids) => (
          <>
            <Button
              size="xs"
              variant="outline"
              onClick={() => handleBulkStatusChange(ids, "active")}
              className="text-[12px] rounded-sm"
            >
              Set Active
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => handleBulkStatusChange(ids, "draft")}
              className="text-[12px] rounded-sm"
            >
              Set Draft
            </Button>
            <Button
              size="xs"
              onClick={() => setDeleteTarget("bulk:" + ids.join(","))}
              className="text-[12px] rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Delete
            </Button>
          </>
        )}
        filterSlot={
          <ProductFilters
            collectionFilter={collectionFilter}
            setCollectionFilter={setCollectionFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
            search={search}
            setSearch={setSearch}
          />
        }
        emptyState="No products match your filters."
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete product"
        description={
          deleteTarget?.startsWith("bulk:")
            ? `This will permanently delete ${deleteTarget.split(":")[1]?.split(",").length} products. This action cannot be undone.`
            : "This will permanently delete the product. This action cannot be undone."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (!deleteTarget) return;
          if (deleteTarget.startsWith("bulk:")) {
            const ids = deleteTarget.split(":")[1]?.split(",") ?? [];
            ids.forEach((id) => deleteProduct(id));
            toast.success(`${ids.length} product(s) deleted`);
          } else {
            deleteProduct(deleteTarget);
            toast.success("Product deleted");
          }
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
