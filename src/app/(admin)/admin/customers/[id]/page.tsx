"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminCustomers } from "@/lib/store/admin/customers";
import { useAdminOrders } from "@/lib/store/admin/orders";
import { useAdminCustomRequests } from "@/lib/store/admin/customRequests";
import { StatusPill } from "@/components/admin/StatusPill";
import { ChipInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatBDT } from "@/lib/utils";

// ─── Address Card ─────────────────────────────────────────────────────────────

function AddressCard({
  address,
}: {
  address: {
    label: string;
    name: string;
    line1: string;
    line2?: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
  };
}) {
  return (
    <div className="rounded-sm border border-border p-3 text-[13px]">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-foreground">{address.label}</span>
        {address.isDefault && (
          <span className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
            Default
          </span>
        )}
      </div>
      <div className="text-muted-foreground leading-relaxed">
        <div>{address.name}</div>
        <div>{address.line1}</div>
        {address.line2 && <div>{address.line2}</div>}
        <div>
          {address.city}, {address.district} {address.postalCode}
        </div>
        <div>{address.country}</div>
        <div>{address.phone}</div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const customers = useAdminCustomers((s) => s.customers);
  const { updateCustomer, updateNotes } = useAdminCustomers();
  const orders = useAdminOrders((s) => s.orders);
  const requests = useAdminCustomRequests((s) => s.requests);

  const customer = customers.find((c) => c.id === id);
  const customerOrders = orders.filter(
    (o) => o.customerEmail === customer?.email,
  );
  const customerRequests = requests.filter(
    (r) => r.customerEmail === customer?.email,
  );

  const [notes, setNotes] = useState(customer?.notes ?? "");

  if (!customer) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/customers"
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
        >
          <CaretLeft size={14} />
          Back to customers
        </Link>
        <p className="text-[13px] text-muted-foreground">Customer not found.</p>
      </div>
    );
  }

  const aov =
    customer.orderCount > 0
      ? Math.round(customer.totalSpend / customer.orderCount)
      : 0;

  const handleSaveNotes = () => {
    updateNotes(customer.id, notes);
    toast.success("Notes saved");
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/customers"
        className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <CaretLeft size={13} />
        Customers
      </Link>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Tabs (8/12) */}
        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4 rounded-sm border border-border bg-card h-9">
              {["overview", "orders", "requests", "addresses", "notes"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="text-[12px] capitalize rounded-sm data-[state=active]:bg-background"
                  >
                    {tab === "requests" ? "Custom Requests" : tab}
                  </TabsTrigger>
                ),
              )}
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Total spent",
                    value: formatBDT(customer.totalSpend),
                  },
                  {
                    label: "Orders",
                    value: String(customer.orderCount),
                  },
                  { label: "AOV", value: formatBDT(aov) },
                  {
                    label: "Member since",
                    value: new Date(customer.joinedAt).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    ),
                  },
                  {
                    label: "Last order",
                    value: customer.lastOrderAt
                      ? new Date(customer.lastOrderAt).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" },
                        )
                      : "—",
                  },
                  { label: "Status", value: customer.status },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-sm border border-border bg-card shadow-sm p-3"
                  >
                    <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">
                      {label}
                    </div>
                    <div className="font-serif text-[20px] font-light text-foreground">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Orders */}
            <TabsContent value="orders">
              <div className="flex flex-col gap-2">
                {customerOrders.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground py-6 text-center border border-dashed border-border rounded-sm">
                    No orders found.
                  </p>
                ) : (
                  customerOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/admin/orders/${order.id}`}
                      className="flex items-center justify-between px-4 py-3 rounded-sm border border-border bg-card hover:bg-muted/40 transition-colors"
                    >
                      <div>
                        <div className="text-[13px] font-medium text-foreground font-mono">
                          {order.orderNumber}
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                          {new Date(order.placedAt).toLocaleDateString(
                            "en-GB",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}{" "}
                          · {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusPill status={order.status} />
                        <span className="text-[13px] font-medium">
                          {formatBDT(order.total)}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Custom requests */}
            <TabsContent value="requests">
              <div className="flex flex-col gap-2">
                {customerRequests.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground py-6 text-center border border-dashed border-border rounded-sm">
                    No custom requests from this customer.
                  </p>
                ) : (
                  customerRequests.map((req) => (
                    <Link
                      key={req.id}
                      href={`/admin/custom-requests/${req.id}`}
                      className="flex items-start justify-between gap-3 px-4 py-3 rounded-sm border border-border bg-card hover:bg-muted/40 transition-colors"
                    >
                      <div>
                        <div className="text-[13px] font-medium text-foreground">
                          {req.occasion}
                        </div>
                        <div className="text-[12px] text-muted-foreground line-clamp-1 mt-0.5">
                          {req.description}
                        </div>
                      </div>
                      <StatusPill status={req.status} />
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Addresses */}
            <TabsContent value="addresses">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customer.savedAddresses.map((addr) => (
                  <AddressCard key={addr.label} address={addr} />
                ))}
              </div>
            </TabsContent>

            {/* Notes */}
            <TabsContent value="notes">
              <div className="flex flex-col gap-2">
                <div className="text-[12px] text-muted-foreground">
                  Admin-only notes. Saved automatically on blur.
                </div>
                <AdminTextarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleSaveNotes}
                  placeholder="Customer preferences, special instructions, follow-up notes..."
                  className="min-h-[160px]"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: customer card (4/12) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 flex flex-col gap-4">
            <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
              {customer.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={customer.avatar}
                  alt={`${customer.name}'s avatar`}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="text-[15px] font-medium text-foreground">
                  {customer.name}
                </div>
                <div className="text-[12px] text-muted-foreground mt-0.5">
                  {customer.email}
                </div>
                <div className="text-[12px] text-muted-foreground">
                  {customer.phone}
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Joined{" "}
                {new Date(customer.joinedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <div className="border-t border-border pt-3">
                <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-2">
                  Tags
                </div>
                <ChipInput
                  value={customer.tags}
                  onChange={(tags) => updateCustomer(customer.id, { tags })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
