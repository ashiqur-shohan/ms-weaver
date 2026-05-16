"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react";
import { useAdminProducts } from "@/lib/store/admin/products";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const products = useAdminProducts((s) => s.products);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <CaretLeft size={14} />
          Back to products
        </Link>
        <p className="text-[13px] text-muted-foreground">
          Product not found. It may have been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <CaretLeft size={13} />
          Products
        </Link>
      </div>
      <PageHeader
        eyebrow="CATALOG"
        title={product.name}
        description={`/${product.slug}`}
      />
      <ProductForm product={product} mode="edit" />
    </div>
  );
}
