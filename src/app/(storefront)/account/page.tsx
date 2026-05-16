import Link from "next/link";
import Image from "next/image";
import { orders } from "@/lib/mock/orders";
import { products } from "@/lib/mock/products";
import { customers } from "@/lib/mock/customers";
import { formatBDT } from "@/lib/utils";
import { AccountGreeting } from "@/components/account/AccountGreeting";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";

const mockUser = customers[0]!;

// For Phase 1: wishlist uses the first 4 products as demo items
const wishlistPreview = products.slice(0, 4);

// Show 3 most recent orders
const recentOrders = [...orders]
  .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime())
  .slice(0, 3);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AccountOverviewPage() {
  const mostRecent = recentOrders[0];

  return (
    <div className="flex flex-col gap-12">
      {/* Greeting */}
      <AccountGreeting />

      {/* Quick summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Most recent order */}
        <div className="flex flex-col gap-2 border border-border bg-card p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Last order
          </p>
          {mostRecent ? (
            <>
              <p className="font-mono text-[13px] text-foreground">
                {mostRecent.orderNumber}
              </p>
              <OrderStatusBadge status={mostRecent.status} />
            </>
          ) : (
            <p className="text-[13px] text-muted-foreground">No orders yet</p>
          )}
        </div>

        {/* Wishlist count */}
        <div className="flex flex-col gap-2 border border-border bg-card p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Saved pieces
          </p>
          <p className="text-[24px] font-light text-foreground">
            {wishlistPreview.length}
          </p>
          <Link
            href="/account/wishlist"
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            View wishlist
          </Link>
        </div>

        {/* Account info */}
        <div className="flex flex-col gap-2 border border-border bg-card p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Your account
          </p>
          <p className="text-[13px] leading-[20px] text-foreground">
            {mockUser.email}
          </p>
          <Link
            href="/account/profile"
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            Edit profile
          </Link>
        </div>
      </div>

      {/* Recent orders */}
      <section aria-label="Recent orders">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-[22px] font-normal leading-[30px] tracking-[-0.005em] text-foreground">
            Recent orders
          </h2>
          <Link
            href="/account/orders"
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-[14px] text-muted-foreground">
            You have not placed any orders yet.{" "}
            <Link
              href="/shop"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Discover the atelier
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentOrders.map((order) => {
              const itemCount = order.items.reduce(
                (n, i) => n + i.quantity,
                0,
              );
              return (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="flex items-center justify-between border border-border bg-card px-5 py-4 transition-colors duration-150 hover:bg-muted/40"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[13px] font-medium text-foreground">
                      {order.orderNumber}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {formatDate(order.placedAt)} ·{" "}
                      {itemCount}{" "}
                      {itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-[13px] text-foreground">
                      {formatBDT(order.total)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Saved for later */}
      <section aria-label="Saved for later">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-[22px] font-normal leading-[30px] tracking-[-0.005em] text-foreground">
            Saved for later
          </h2>
          <Link
            href="/account/wishlist"
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {wishlistPreview.map((product) => {
            const img = product.images[0];
            if (!img) return null;
            return (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 15vw, (min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-2 text-[13px] leading-[20px] text-foreground">
                  {product.name}
                </p>
                <p className="text-[12px] text-muted-foreground">
                  {formatBDT(product.price)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
