"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "@phosphor-icons/react";
import { formatBDT } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { collections } from "@/lib/mock/collections";
import { products } from "@/lib/mock/products";

// Derive unique color values from all product customOptions
function getAllColors(): string[] {
  const colorSet = new Set<string>();
  for (const product of products) {
    if (!product.customOptions) continue;
    for (const opt of product.customOptions) {
      if (opt.name === "Color" && opt.values) {
        for (const val of opt.values) {
          colorSet.add(val);
        }
      }
    }
  }
  return Array.from(colorSet).sort();
}

// Derive price range from all products
function getPriceRange(): [number, number] {
  let min = Infinity;
  let max = 0;
  for (const p of products) {
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  }
  return [min === Infinity ? 0 : min, max];
}

const ALL_COLORS = getAllColors();
const [PRICE_MIN, PRICE_MAX] = getPriceRange();

interface FilterSidebarProps {
  /** When true, shows an "Apply" button (used inside mobile Sheet). */
  showApplyButton?: boolean;
  onApply?: () => void;
}

/**
 * Filter sidebar — client component, persists state in URL search params.
 * Used in the desktop layout (sticky column) and inside mobile Sheet.
 */
export function FilterSidebar({
  showApplyButton = false,
  onApply,
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Read current filter state from URL ────────────────────────────────────

  const selectedCollections = searchParams.getAll("collection");
  const selectedColors = searchParams.getAll("color");
  const priceMin = Number(searchParams.get("priceMin") ?? PRICE_MIN);
  const priceMax = Number(searchParams.get("priceMax") ?? PRICE_MAX);
  const inStockOnly = searchParams.get("inStock") === "1";
  const customOnly = searchParams.get("customOnly") === "1";

  // ── URL mutator ───────────────────────────────────────────────────────────

  const pushParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // ── Toggle helpers ────────────────────────────────────────────────────────

  function toggleMulti(key: string, value: string, current: string[]) {
    pushParams((p) => {
      p.delete(key);
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      for (const v of next) p.append(key, v);
    });
  }

  function setPrice(values: number[]) {
    pushParams((p) => {
      if (values[0] !== undefined) p.set("priceMin", String(values[0]));
      if (values[1] !== undefined) p.set("priceMax", String(values[1]));
    });
  }

  function toggleBoolean(key: string, value: boolean) {
    pushParams((p) => {
      if (value) p.set(key, "1");
      else p.delete(key);
    });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const hasActiveFilters =
    selectedCollections.length > 0 ||
    selectedColors.length > 0 ||
    priceMin !== PRICE_MIN ||
    priceMax !== PRICE_MAX ||
    inStockOnly ||
    customOnly;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Filter
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X size={12} weight="regular" aria-hidden="true" />
            Clear all
          </button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["collection", "price"]}>
        {/* Collection */}
        <AccordionItem value="collection">
          <AccordionTrigger className="text-[12px] uppercase tracking-[0.05em]">
            Collection
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-2">
              {collections.map((col) => (
                <label
                  key={col.id}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <Checkbox
                    checked={selectedCollections.includes(col.slug)}
                    onCheckedChange={() =>
                      toggleMulti("collection", col.slug, selectedCollections)
                    }
                    aria-label={col.name}
                  />
                  <span className="text-[14px] leading-[22px] text-foreground">
                    {col.name}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color */}
        <AccordionItem value="color">
          <AccordionTrigger className="text-[12px] uppercase tracking-[0.05em]">
            Colour
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {ALL_COLORS.map((color) => {
                const selected = selectedColors.includes(color);
                return (
                  <button
                    key={color}
                    onClick={() =>
                      toggleMulti("color", color, selectedColors)
                    }
                    aria-pressed={selected}
                    className={`rounded-none border px-2.5 py-1 text-[12px] uppercase tracking-[0.05em] transition-colors duration-200 ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-[12px] uppercase tracking-[0.05em]">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 pt-2">
              <Slider
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={100}
                value={[priceMin, priceMax]}
                onValueChange={setPrice}
                aria-label="Price range"
              />
              <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                <span>{formatBDT(priceMin)}</span>
                <span>{formatBDT(priceMax)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* In stock */}
        <AccordionItem value="stock">
          <AccordionTrigger className="text-[12px] uppercase tracking-[0.05em]">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 pt-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="in-stock"
                  className="text-[14px] font-normal leading-[22px] text-foreground cursor-pointer"
                >
                  In stock only
                </Label>
                <Switch
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={(v) => toggleBoolean("inStock", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="custom-only"
                  className="text-[14px] font-normal leading-[22px] text-foreground cursor-pointer"
                >
                  Custom order only
                </Label>
                <Switch
                  id="custom-only"
                  checked={customOnly}
                  onCheckedChange={(v) => toggleBoolean("customOnly", v)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Mobile apply button */}
      {showApplyButton && (
        <div className="mt-6 border-t border-border pt-6">
          <button
            onClick={onApply}
            className="h-12 w-full rounded-none bg-primary text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            Apply filters
          </button>
        </div>
      )}
    </div>
  );
}
