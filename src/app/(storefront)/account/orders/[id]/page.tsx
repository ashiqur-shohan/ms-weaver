import { notFound } from "next/navigation";
import Link from "next/link";
import { orders } from "@/lib/mock/orders";
import { formatBDT } from "@/lib/utils";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { OrderTimeline } from "@/components/account/OrderTimeline";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Account", href: "/account" },
          { label: "Orders", href: "/account/orders" },
          { label: order.orderNumber },
        ]}
      />

      {/* Page header */}
      <div className="flex flex-wrap items-start gap-4">
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Order
          </p>
          <h1 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
            #{order.orderNumber}
          </h1>
          <p className="mt-2 text-[14px] leading-[22px] text-muted-foreground">
            Placed {formatDate(order.placedAt)}
          </p>
        </div>
        <div className="mt-auto pb-1">
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {/* Left — 8/12: line items + timeline */}
        <div className="col-span-12 flex flex-col gap-8 md:col-span-8">
          {/* Line items */}
          <section aria-label="Order items">
            <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Items in this order
            </h2>
            <div className="flex flex-col divide-y divide-border">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4 py-4 first:pt-0">
                  {/* Product image placeholder */}
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
                    <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                      <span className="text-center px-1">{item.name.split("—")[0]?.trim() ?? item.name}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-[14px] font-medium leading-[22px] text-foreground">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-[12px] text-muted-foreground">
                        {item.variant}
                      </p>
                    )}
                    {item.customOptions &&
                      Object.entries(item.customOptions).map(([k, v]) => (
                        <p key={k} className="text-[12px] text-muted-foreground">
                          {k}: {v}
                        </p>
                      ))}
                    <p className="text-[12px] text-muted-foreground">
                      Qty {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[14px] text-foreground">
                      {formatBDT(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Status timeline */}
          <section aria-label="Order timeline">
            <OrderTimeline order={order} />
          </section>

          {/* Need help */}
          <p className="text-[13px] leading-[20px] text-muted-foreground">
            Questions about this order?{" "}
            <Link
              href="/contact"
              className="text-foreground underline-offset-4 transition-colors duration-200 hover:underline"
            >
              Contact the atelier
            </Link>
          </p>
        </div>

        {/* Right — 4/12: sticky meta */}
        <div className="col-span-12 md:col-span-4">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Shipping address */}
            <div className="border border-border bg-card p-5">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Shipping to
              </p>
              <address className="not-italic text-[13px] leading-[20px] text-muted-foreground">
                <p className="text-foreground">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && (
                  <p>{order.shippingAddress.line2}</p>
                )}
                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.district}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-1">{order.shippingAddress.phone}</p>
              </address>
            </div>

            {/* Billing address */}
            <div className="border border-border bg-card p-5">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Billed to
              </p>
              <address className="not-italic text-[13px] leading-[20px] text-muted-foreground">
                <p className="text-foreground">{order.billingAddress.name}</p>
                <p>{order.billingAddress.line1}</p>
                {order.billingAddress.line2 && (
                  <p>{order.billingAddress.line2}</p>
                )}
                <p>
                  {order.billingAddress.city}, {order.billingAddress.district}{" "}
                  {order.billingAddress.postalCode}
                </p>
                <p>{order.billingAddress.country}</p>
              </address>
            </div>

            {/* Payment + shipping method */}
            <div className="border border-border bg-card p-5">
              <div className="mb-4">
                <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  Payment
                </p>
                <p className="text-[13px] text-foreground">
                  {order.paymentMethod}
                </p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  Shipping
                </p>
                <p className="text-[13px] text-foreground">
                  {order.shipping === 0
                    ? "Complimentary delivery"
                    : formatBDT(order.shipping)}
                </p>
              </div>
            </div>

            {/* Order totals */}
            <div className="border border-border bg-card p-5">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Order total
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatBDT(order.subtotal)}</span>
                </div>
                {order.shipping > 0 && (
                  <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                    <span>Shipping</span>
                    <span>{formatBDT(order.shipping)}</span>
                  </div>
                )}
                {order.tax > 0 && (
                  <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                    <span>Tax</span>
                    <span>{formatBDT(order.tax)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-border pt-2 text-[14px] font-medium text-foreground">
                  <span>Total</span>
                  <span>{formatBDT(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
