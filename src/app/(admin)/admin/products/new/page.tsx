"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="CATALOG" title="New Product" />
      <ProductForm mode="create" />
    </div>
  );
}
