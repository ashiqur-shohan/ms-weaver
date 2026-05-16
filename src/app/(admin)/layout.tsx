"use client";

import { useAdminAuth } from "@/lib/store/adminAuth";
import { AdminStoresHydration } from "@/components/admin/AdminStoresHydration";
import { AdminSignIn } from "@/components/admin/AdminSignIn";
import { AdminShell } from "@/components/admin/AdminShell";
import { Toaster } from "@/components/ui/sonner";

// ─── Auth Gate ────────────────────────────────────────────────────────────────

function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAdminAuth((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <AdminSignIn />;
  }

  return <AdminShell>{children}</AdminShell>;
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminStoresHydration />
      <AdminAuthGate>{children}</AdminAuthGate>
      <Toaster position="bottom-right" />
    </>
  );
}
