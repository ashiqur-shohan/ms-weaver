"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/mock/products";

interface ProductTabsProps {
  product: Product;
}

/**
 * Product detail tabs — client component.
 * Desktop: underline-style shadcn Tabs (Details / Care / Story).
 * Mobile: Accordion.
 */
export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <section id="product-care" aria-label="Product details">
      {/* Desktop tabs */}
      <div className="hidden md:block">
        <Tabs defaultValue="details">
          <TabsList
            variant="line"
            className="w-full justify-start gap-0 border-b border-border rounded-none bg-transparent pb-0"
          >
            <TabsTrigger
              value="details"
              className="rounded-none px-6 py-3 text-[12px] uppercase tracking-[0.05em]"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="care"
              className="rounded-none px-6 py-3 text-[12px] uppercase tracking-[0.05em]"
            >
              Care
            </TabsTrigger>
            <TabsTrigger
              value="story"
              className="rounded-none px-6 py-3 text-[12px] uppercase tracking-[0.05em]"
            >
              Story
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-8">
            <DetailsContent product={product} />
          </TabsContent>
          <TabsContent value="care" className="pt-8">
            <CareContent product={product} />
          </TabsContent>
          <TabsContent value="story" className="pt-8">
            <StoryContent product={product} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden border-t border-border">
        <Accordion type="single" collapsible>
          <AccordionItem value="details">
            <AccordionTrigger className="text-[12px] uppercase tracking-[0.05em] py-4">
              Details
            </AccordionTrigger>
            <AccordionContent>
              <DetailsContent product={product} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="care">
            <AccordionTrigger className="text-[12px] uppercase tracking-[0.05em] py-4">
              Care
            </AccordionTrigger>
            <AccordionContent>
              <CareContent product={product} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="story">
            <AccordionTrigger className="text-[12px] uppercase tracking-[0.05em] py-4">
              Story
            </AccordionTrigger>
            <AccordionContent>
              <StoryContent product={product} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

// ── Tab content components ─────────────────────────────────────────────────────

function DetailsContent({ product }: { product: Product }) {
  return (
    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-[14px]">
      <DetailRow label="Materials" value={product.materials.join(", ")} />
      <DetailRow label="Dimensions" value={product.dimensions} />
      <DetailRow label="Weight" value={product.weight} />
      <DetailRow label="Country of origin" value="Bangladesh" />
      <DetailRow label="Lead time" value={`${product.leadTimeDays} days`} />
      {product.tags.length > 0 && (
        <DetailRow label="Tags" value={product.tags.join(", ")} />
      )}
    </dl>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="leading-[22px] text-foreground">{value}</dd>
    </div>
  );
}

function CareContent({ product }: { product: Product }) {
  return (
    <ul className="flex flex-col gap-3">
      {product.care.map((instruction, i) => (
        <li key={i} className="flex items-start gap-3 text-[14px] leading-[22px] text-foreground">
          <span
            className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
            aria-hidden="true"
          />
          {instruction}
        </li>
      ))}
    </ul>
  );
}

function StoryContent({ product }: { product: Product }) {
  return (
    <p className="max-w-[65ch] text-[16px] leading-[26px] text-muted-foreground">
      {product.story}
    </p>
  );
}
