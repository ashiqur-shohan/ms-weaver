"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CaretLeft, Printer, X } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminOrders } from "@/lib/store/admin/orders";
import { StatusPill } from "@/components/admin/StatusPill";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { FormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";
import type { OrderStatus } from "@/lib/mock/orders";

// ─── Status workflow ──────────────────────────────────────────────────────────

const STATUS_FLOW: OrderStatus[] = ["pending", "in_atelier", "shipped", "delivered"];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  in_atelier: "In Atelier",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const NEXT_STAGE_LABEL: Record<string, string> = {
  pending: "Move to In Atelier",
  in_atelier: "Mark as Shipped",
  shipped: "Mark as Delivered",
};

// ─── Address card ─────────────────────────────────────────────────────────────

function AddressBlock({
  title,
  address,
}: {
  title: string;
  address: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
    phone: string;
  };
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">
        {title}
      </div>
      <div className="text-[13px] text-foreground leading-relaxed">
        <div className="font-medium">{address.name}</div>
        <div>{address.line1}</div>
        {address.line2 && <div>{address.line2}</div>}
        <div>
          {address.city}, {address.district} {address.postalCode}
        </div>
        <div>{address.country}</div>
        <div className="text-muted-foreground">{address.phone}</div>
      </div>
    </div>
  );
}

// ─── Status advance form ──────────────────────────────────────────────────────

function StatusAdvanceForm({
  currentStatus,
  onAdvance,
}: {
  currentStatus: OrderStatus;
  onAdvance: (
    status: OrderStatus,
    extraData: { estimatedCompletion?: string; courier?: string; tracking?: string },
  ) => void;
}) {
  const [estimatedCompletion, setEstimatedCompletion] = useState("");
  const [courier, setCourier] = useState("");
  const [tracking, setTracking] = useState("");

  const nextIndex = STATUS_FLOW.indexOf(currentStatus) + 1;
  const nextStatus = STATUS_FLOW[nextIndex] as OrderStatus | undefined;

  if (!nextStatus || currentStatus === "cancelled") return null;

  return (
    <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
      <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        Advance status
      </div>

      {currentStatus === "pending" && (
        <FormField label="Estimated completion date">
          <AdminInput
            type="date"
            value={estimatedCompletion}
            onChange={(e) => setEstimatedCompletion(e.target.value)}
          />
        </FormField>
      )}

      {currentStatus === "in_atelier" && (
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Courier name">
            <AdminInput
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              placeholder="Pathao, Sundarban..."
            />
          </FormField>
          <FormField label="Tracking number">
            <AdminInput
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="TRK-12345"
            />
          </FormField>
        </div>
      )}

      <Button
        size="sm"
        onClick={() =>
          onAdvance(nextStatus, {
            estimatedCompletion,
            courier,
            tracking,
          })
        }
        className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90 self-start"
      >
        {NEXT_STAGE_LABEL[currentStatus] ?? "Advance"}
      </Button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { orders, updateOrderStatus, cancelOrder, updateOrder } =
    useAdminOrders();
  const order = orders.find((o) => o.id === id);

  const [internalNotes, setInternalNotes] = useState("");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
        >
          <CaretLeft size={14} />
          Back to orders
        </Link>
        <p className="text-[13px] text-muted-foreground">Order not found.</p>
      </div>
    );
  }

  const handleAdvanceStatus = (
    nextStatus: OrderStatus,
    extraData: {
      estimatedCompletion?: string;
      courier?: string;
      tracking?: string;
    },
  ) => {
    updateOrderStatus(order.id, nextStatus);
    toast.success(`Order moved to ${STATUS_LABELS[nextStatus]}`);
    if (extraData.courier || extraData.tracking) {
      console.log("[Admin] Shipping info:", extraData);
    }
  };

  const handleSaveNotes = () => {
    updateOrder(order.id, { ...order });
    console.log("[Admin] Internal notes saved:", internalNotes);
    toast.success("Notes saved");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <CaretLeft size={13} />
          Orders
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-0.5">
            ORDER
          </div>
          <h1 className="font-serif text-[22px] font-normal text-foreground">
            {order.orderNumber}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[13px] text-muted-foreground">
              {order.customerName}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-[13px] text-muted-foreground">
              {new Date(order.placedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <StatusPill status={order.status} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 rounded-sm text-[12px] h-8"
          >
            <Printer size={14} />
            Print
          </Button>
          {order.status !== "cancelled" && order.status !== "delivered" && (
            <Button
              size="sm"
              onClick={() => setCancelDialogOpen(true)}
              className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
            >
              <X size={14} />
              Cancel order
            </Button>
          )}
        </div>
      </div>

      {/* 8/4 layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left (8/12) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {/* Status timeline */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">
              Fulfilment status
            </div>
            <div className="flex items-center gap-0 mb-4">
              {STATUS_FLOW.map((s, i) => {
                const currentIndex = STATUS_FLOW.indexOf(
                  order.status === "cancelled" ? "pending" : order.status,
                );
                const isPast = i <= currentIndex;
                const isCurrent =
                  s === order.status ||
                  (order.status === "cancelled" && i === 0);
                return (
                  <div key={s} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          isPast
                            ? "bg-primary"
                            : "bg-border"
                        }`}
                      />
                      <span
                        className={`text-[10px] uppercase tracking-[0.06em] ${
                          isCurrent
                            ? "text-foreground font-semibold"
                            : isPast
                              ? "text-muted-foreground"
                              : "text-muted-foreground/50"
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </span>
                    </div>
                    {i < STATUS_FLOW.length - 1 && (
                      <div
                        className={`h-px w-12 mx-1 ${
                          i < currentIndex ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
              {order.status === "cancelled" && (
                <div className="ml-4">
                  <StatusPill status="cancelled" />
                </div>
              )}
            </div>

            {order.status !== "delivered" && order.status !== "cancelled" && (
              <StatusAdvanceForm
                currentStatus={order.status}
                onAdvance={handleAdvanceStatus}
              />
            )}
          </div>

          {/* Line items */}
          <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Items
              </span>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-2 text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Product
                  </th>
                  <th className="px-4 py-2 text-right text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Qty
                  </th>
                  <th className="px-4 py-2 text-right text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Price
                  </th>
                  <th className="px-4 py-2 text-right text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">{item.name}</div>
                      {item.customOptions && (
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {Object.entries(item.customOptions)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatBDT(item.price)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatBDT(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Internal notes */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Internal notes
            </div>
            <AdminTextarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Notes visible to admin only — not shown to the customer..."
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Right (4/12 sticky) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* Customer card */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-2">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Customer
            </div>
            <div className="text-[14px] font-medium text-foreground">
              {order.customerName}
            </div>
            <div className="text-[13px] text-muted-foreground">
              {order.customerEmail}
            </div>
            <div className="text-[13px] text-muted-foreground">
              {order.shippingAddress.phone}
            </div>
            <Link
              href={`/admin/customers?q=${encodeURIComponent(order.customerEmail)}`}
              className="text-[12px] text-muted-foreground underline-offset-2 hover:underline hover:text-foreground mt-1"
            >
              View customer
            </Link>
          </div>

          {/* Shipping address */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4">
            <AddressBlock
              title="Shipping address"
              address={order.shippingAddress}
            />
          </div>

          {/* Billing address */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4">
            <AddressBlock
              title="Billing address"
              address={order.billingAddress}
            />
          </div>

          {/* Payment + totals */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Payment
            </div>
            <div className="text-[13px] text-foreground">
              {order.paymentMethod}
            </div>

            <div className="border-t border-border pt-3 flex flex-col gap-1.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatBDT(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {order.shipping === 0 ? "Free" : formatBDT(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">Tax</span>
                <span>
                  {order.tax === 0 ? "—" : formatBDT(order.tax)}
                </span>
              </div>
              <div className="flex justify-between text-[14px] font-semibold border-t border-border pt-1.5 mt-1">
                <span>Total</span>
                <span>{formatBDT(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel confirmation */}
      <ConfirmDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancel order"
        description={`Cancel order ${order.orderNumber}? This action cannot be undone.`}
        confirmLabel="Cancel order"
        onConfirm={() => {
          cancelOrder(order.id);
          toast.success("Order cancelled");
          router.push("/admin/orders");
        }}
      />
    </div>
  );
}
