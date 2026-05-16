import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { products } from "@/lib/mock/products";

export const metadata = {
  title: "All Pieces | Ms Weaver",
  description:
    "Browse the full Ms Weaver atelier — handwoven throws, bridal lace, soft accessories, and bespoke commissions made to order in Dhaka.",
};

const activeProducts = products.filter((p) => p.status === "active");

export default function ShopPage() {
  return (
    <section aria-label="Shop" className="py-16 md:py-24">
      <Container>
        {/* Header: eyebrow, h1, subtitle, count + sort bar */}
        <Suspense>
          <ShopHeader
            totalCount={activeProducts.length}
            filterTrigger={<MobileFilterSheet />}
          />
        </Suspense>

        {/* Body: filter sidebar + product grid */}
        <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Desktop filter sidebar — hidden on mobile */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="md:sticky md:top-28">
              <Suspense>
                <FilterSidebar />
              </Suspense>
            </div>
          </aside>

          {/* Product grid */}
          <div className="col-span-12 lg:col-span-9">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      <div className="aspect-[4/5] animate-pulse bg-muted" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                    </div>
                  ))}
                </div>
              }
            >
              <ShopGrid allProducts={activeProducts} />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
