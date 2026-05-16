"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash } from "@phosphor-icons/react";
import { useAdminProducts } from "@/lib/store/admin/products";
import { useAdminCollections } from "@/lib/store/admin/collections";
import { useAdminCategories } from "@/lib/store/admin/categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FormField,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  ChipInput,
} from "@/components/admin/AdminFormPrimitives";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant, CustomOption } from "@/lib/mock/products";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormErrors = Partial<Record<keyof Product | string, string>>;

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateId(): string {
  return `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const { addProduct, updateProduct, deleteProduct, products } =
    useAdminProducts();
  const collections = useAdminCollections((s) => s.collections);
  const categories = useAdminCategories((s) => s.categories);

  const isEdit = mode === "edit";

  // ── Form state ────────────────────────────────────────────────────────────

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [status, setStatus] = useState<"active" | "draft">(
    product?.status ?? "draft",
  );
  // featured state — reserved for Phase 2 visibility controls
  const [_featured, _setFeatured] = useState(false);
  const [story, setStory] = useState(product?.story ?? "");

  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [compareAtPrice, setCompareAtPrice] = useState(
    String(product?.compareAtPrice ?? ""),
  );

  const [stock, setStock] = useState(String(product?.stock ?? "0"));
  const [leadTimeDays, setLeadTimeDays] = useState(
    String(product?.leadTimeDays ?? "7"),
  );

  const [materials, setMaterials] = useState<string[]>(
    product?.materials ?? [],
  );
  const [care, setCare] = useState<string[]>(product?.care ?? []);
  const [dimensions, setDimensions] = useState(product?.dimensions ?? "");
  const [weight, setWeight] = useState(product?.weight ?? "");

  const [collectionIds, setCollectionIds] = useState<string[]>(
    product?.collectionIds ?? [],
  );
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [tags, setTags] = useState<string[]>(product?.tags ?? []);

  const [seoTitle, setSeoTitle] = useState(product?.seo.title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    product?.seo.description ?? "",
  );
  const [seoOgImage, setSeoOgImage] = useState(product?.seo.ogImage ?? "");

  const [variants, setVariants] = useState<ProductVariant[]>(
    product?.variants ?? [],
  );
  const [customOptions, setCustomOptions] = useState<CustomOption[]>(
    product?.customOptions ?? [],
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // ── Name → slug auto-generation ──────────────────────────────────────────

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setSlugManuallyEdited(true);
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!name.trim()) errs["name"] = "Product name is required";
    if (!slug.trim()) errs["slug"] = "Slug is required";
    else {
      const slugConflict = products.find(
        (p) => p.slug === slug && p.id !== product?.id,
      );
      if (slugConflict) errs["slug"] = "This slug is already in use";
    }
    if (!price || Number(price) < 0)
      errs["price"] = "Price must be 0 or greater";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = useCallback(() => {
    if (!validate()) return;

    const payload: Product = {
      id: product?.id ?? generateId(),
      slug,
      name,
      story,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      currency: "BDT",
      images: product?.images ?? [],
      collectionIds,
      categoryId,
      materials,
      dimensions,
      weight,
      care,
      leadTimeDays: Number(leadTimeDays),
      customOptions: customOptions.length > 0 ? customOptions : undefined,
      variants: variants.length > 0 ? variants : undefined,
      stock: Number(stock),
      status,
      tags,
      seo: {
        title: seoTitle || `${name} | Ms Weaver`,
        description: seoDescription,
        ogImage: seoOgImage || product?.images[0]?.url || "",
      },
    };

    if (isEdit && product) {
      updateProduct(product.id, payload);
      toast.success("Product saved");
    } else {
      addProduct(payload);
      toast.success("Product created");
      router.push(`/admin/products/${payload.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, slug, story, price, compareAtPrice, stock, leadTimeDays, materials, care, dimensions, weight, collectionIds, categoryId, tags, seoTitle, seoDescription, seoOgImage, variants, customOptions, status]);

  const handleDiscard = () => {
    if (isEdit) {
      // Re-set to original values
      setName(product?.name ?? "");
      setSlug(product?.slug ?? "");
      setStory(product?.story ?? "");
      setPrice(String(product?.price ?? ""));
      toast("Changes discarded");
    } else {
      router.push("/admin/products");
    }
  };

  // ── Variant helpers ──────────────────────────────────────────────────────

  const addVariant = () => {
    setVariants((v) => [
      ...v,
      {
        id: `var_${Date.now()}`,
        label: "",
        priceDelta: 0,
        stock: 0,
      },
    ]);
  };

  const updateVariant = (index: number, updates: Partial<ProductVariant>) => {
    setVariants((v) => v.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  };

  const removeVariant = (index: number) => {
    setVariants((v) => v.filter((_, i) => i !== index));
  };

  // ── Custom option helpers ────────────────────────────────────────────────

  const addCustomOption = () => {
    setCustomOptions((opts) => [
      ...opts,
      { name: "Color" as const, type: "select" as const, values: [] },
    ]);
  };

  const updateCustomOption = (index: number, updates: Partial<CustomOption>) => {
    setCustomOptions((opts) =>
      opts.map((opt, i) => (i === index ? { ...opt, ...updates } : opt)),
    );
  };

  const removeCustomOption = (index: number) => {
    setCustomOptions((opts) => opts.filter((_, i) => i !== index));
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="relative flex flex-col gap-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left: main form (8/12) */}
        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="basics">
            <TabsList className="mb-4 rounded-sm border border-border bg-card h-9">
              {[
                "basics",
                "media",
                "pricing",
                "variants",
                "inventory",
                "materials",
                "seo",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-[12px] capitalize rounded-sm data-[state=active]:bg-background"
                >
                  {tab === "variants" ? "Variants & Options" : tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Basics */}
            <TabsContent value="basics" className="flex flex-col gap-4">
              <FormField label="Product name" required error={errors["name"]}>
                <AdminInput
                  id="product-name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  error={!!errors["name"]}
                  placeholder="Linen Throw — Ivory"
                />
              </FormField>

              <FormField
                label="Slug"
                required
                error={errors["slug"]}
                hint="URL-friendly identifier. Auto-generated from name."
              >
                <AdminInput
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  error={!!errors["slug"]}
                  placeholder="linen-throw-ivory"
                />
              </FormField>

              <FormField label="Story / Description">
                <AdminTextarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Describe the piece — its making, its material, its character..."
                  className="min-h-[140px]"
                />
              </FormField>
            </TabsContent>

            {/* Media */}
            <TabsContent value="media" className="flex flex-col gap-4">
              <FormField label="Product images">
                <ImageUploader multiple />
              </FormField>
              {product?.images && product.images.length > 0 && (
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-2">
                    Existing images ({product.images.length})
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((img, i) => (
                      <div key={i} className="aspect-[4/5] overflow-hidden rounded-sm border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Pricing */}
            <TabsContent value="pricing" className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Price (BDT)" required error={errors["price"]}>
                  <AdminInput
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    error={!!errors["price"]}
                    placeholder="0"
                    min={0}
                  />
                </FormField>
                <FormField label="Compare-at price (BDT)">
                  <AdminInput
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    placeholder="0"
                    min={0}
                  />
                </FormField>
              </div>
              <p className="text-[12px] text-muted-foreground">
                Currency is locked to BDT. Cost (admin-only) fields coming in Part 2.
              </p>
            </TabsContent>

            {/* Variants & Custom Options */}
            <TabsContent value="variants" className="flex flex-col gap-6">
              {/* Variants */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-medium text-foreground">
                    Variants
                  </h3>
                  <Button
                    type="button"
                    size="xs"
                    variant="outline"
                    onClick={addVariant}
                    className="gap-1 text-[12px] rounded-sm"
                  >
                    <Plus size={12} />
                    Add Variant
                  </Button>
                </div>
                {variants.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground py-4 border border-dashed border-border rounded-sm text-center">
                    No variants added yet.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {variants.map((v, i) => (
                      <div
                        key={v.id}
                        className="grid grid-cols-4 gap-2 items-end p-3 rounded-sm border border-border bg-card"
                      >
                        <FormField label="Label">
                          <AdminInput
                            value={v.label}
                            onChange={(e) =>
                              updateVariant(i, { label: e.target.value })
                            }
                            placeholder="e.g. Large"
                          />
                        </FormField>
                        <FormField label="Price delta (BDT)">
                          <AdminInput
                            type="number"
                            value={String(v.priceDelta)}
                            onChange={(e) =>
                              updateVariant(i, {
                                priceDelta: Number(e.target.value),
                              })
                            }
                            placeholder="0"
                          />
                        </FormField>
                        <FormField label="Stock">
                          <AdminInput
                            type="number"
                            value={String(v.stock)}
                            onChange={(e) =>
                              updateVariant(i, { stock: Number(e.target.value) })
                            }
                            placeholder="0"
                          />
                        </FormField>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeVariant(i)}
                          className="text-destructive hover:bg-destructive/10 self-end mb-0.5"
                          aria-label="Remove variant"
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom options */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-medium text-foreground">
                    Custom Options
                  </h3>
                  <Button
                    type="button"
                    size="xs"
                    variant="outline"
                    onClick={addCustomOption}
                    className="gap-1 text-[12px] rounded-sm"
                  >
                    <Plus size={12} />
                    Add Option
                  </Button>
                </div>
                {customOptions.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground py-4 border border-dashed border-border rounded-sm text-center">
                    No custom options added yet.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {customOptions.map((opt, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-sm border border-border bg-card flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <select
                            value={opt.name}
                            onChange={(e) =>
                              updateCustomOption(i, {
                                name: e.target.value as CustomOption["name"],
                              })
                            }
                            className="flex-1 h-8 border-b border-border bg-transparent text-[13px] focus:outline-none focus:border-foreground"
                          >
                            {["Color", "Size", "Yarn", "Monogram"].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                          <select
                            value={opt.type}
                            onChange={(e) =>
                              updateCustomOption(i, {
                                type: e.target.value as CustomOption["type"],
                              })
                            }
                            className="w-28 h-8 border-b border-border bg-transparent text-[13px] focus:outline-none focus:border-foreground"
                          >
                            <option value="select">Select</option>
                            <option value="color">Color</option>
                            <option value="text">Text</option>
                          </select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removeCustomOption(i)}
                            className="text-destructive hover:bg-destructive/10"
                            aria-label="Remove option"
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                        {opt.type !== "text" && (
                          <FormField label="Values (comma-separated)">
                            <AdminInput
                              value={opt.values?.join(", ") ?? ""}
                              onChange={(e) =>
                                updateCustomOption(i, {
                                  values: e.target.value
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter(Boolean),
                                })
                              }
                              placeholder="Ivory, Sand, Stone"
                            />
                          </FormField>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Inventory */}
            <TabsContent value="inventory" className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Stock quantity">
                  <AdminInput
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    min={0}
                  />
                </FormField>
                <FormField label="Lead time (days)">
                  <AdminInput
                    type="number"
                    value={leadTimeDays}
                    onChange={(e) => setLeadTimeDays(e.target.value)}
                    placeholder="7"
                    min={0}
                  />
                </FormField>
              </div>
              <p className="text-[12px] text-muted-foreground">
                Low-stock threshold and backorder toggle coming in Part 2.
              </p>
            </TabsContent>

            {/* Materials & Care */}
            <TabsContent value="materials" className="flex flex-col gap-4">
              <FormField
                label="Materials"
                hint="Add each material and press Enter"
              >
                <ChipInput
                  value={materials}
                  onChange={setMaterials}
                  placeholder="Belgian linen 55%..."
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Dimensions">
                  <AdminInput
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="130 cm × 180 cm"
                  />
                </FormField>
                <FormField label="Weight">
                  <AdminInput
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="680 g"
                  />
                </FormField>
              </div>

              <FormField
                label="Care instructions"
                hint="Add each instruction and press Enter"
              >
                <ChipInput
                  value={care}
                  onChange={setCare}
                  placeholder="Hand wash in cool water..."
                />
              </FormField>
            </TabsContent>

            {/* SEO */}
            <TabsContent value="seo" className="flex flex-col gap-4">
              <FormField label="Meta title">
                <AdminInput
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Product Name | Ms Weaver"
                />
              </FormField>
              <FormField label="Meta description">
                <AdminTextarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="A brief description for search engines..."
                  className="min-h-[80px]"
                />
              </FormField>
              <FormField label="OG image URL">
                <MediaPicker
                  value={seoOgImage}
                  onChange={setSeoOgImage}
                  placeholder="https://..."
                />
              </FormField>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: status + organization (4/12) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* Status */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Status
            </div>
            <div className="flex flex-col gap-2">
              {(["active", "draft"] as const).map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                    className="accent-primary"
                  />
                  <span className="text-[13px] capitalize text-foreground">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Organization */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Organization
            </div>

            <FormField label="Category">
              <AdminSelect
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="Select category"
                options={categories.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
              />
            </FormField>

            <FormField label="Collections">
              <div className="flex flex-col gap-1 pt-1">
                {collections.map((col) => (
                  <label
                    key={col.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={collectionIds.includes(col.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCollectionIds((ids) => [...ids, col.id]);
                        } else {
                          setCollectionIds((ids) =>
                            ids.filter((id) => id !== col.id),
                          );
                        }
                      }}
                      className="accent-primary"
                    />
                    <span className="text-[13px] text-foreground">
                      {col.name}
                    </span>
                  </label>
                ))}
              </div>
            </FormField>

            <FormField label="Tags" hint="Press Enter to add">
              <ChipInput value={tags} onChange={setTags} placeholder="bridal, linen..." />
            </FormField>
          </div>

          {/* Danger zone */}
          {isEdit && product && (
            <div className="rounded-sm border border-red-200 bg-red-50/30 p-4 flex flex-col gap-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-red-600">
                Danger zone
              </div>
              <p className="text-[12px] text-muted-foreground">
                Permanently remove this product and all its data.
              </p>
              <Button
                type="button"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
                className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90 w-full"
              >
                Delete product
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className={cn(
        "sticky bottom-0 z-20 flex items-center justify-between gap-3",
        "border-t border-border bg-background py-3 px-6 -mx-6",
        "shadow-[0_-2px_8px_rgba(0,0,0,0.06)]",
      )}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleDiscard}
          className="text-[12px] text-muted-foreground hover:text-foreground"
        >
          Discard changes
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleSave}
          className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90 px-6"
        >
          {isEdit ? "Save" : "Create product"}
        </Button>
      </div>

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete product"
        description="This will permanently delete this product. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (product) {
            deleteProduct(product.id);
            toast.success("Product deleted");
            router.push("/admin/products");
          }
        }}
      />
    </div>
  );
}
