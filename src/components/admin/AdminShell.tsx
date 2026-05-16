"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminShellProps {
  children: React.ReactNode;
  breadcrumb?: string;
}

const COLLAPSE_KEY = "msweaver:admin:sidebar:collapsed";

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminShell({ children, breadcrumb }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read persisted collapse preference after mount (SSR-safe)
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(COLLAPSE_KEY);
      if (stored === "1") setCollapsed(true);
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleToggleCollapse = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  if (!mounted) {
    // Render a minimal skeleton to avoid SSR mismatch
    return (
      <div className="flex h-screen bg-background">
        <div className="w-[240px] border-r border-border bg-card" />
        <div className="flex-1" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={handleToggleCollapse}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main content area */}
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden transition-all duration-200",
          collapsed ? "lg:ml-16" : "lg:ml-[240px]",
        )}
      >
        <AdminTopbar
          onToggleMobileSidebar={() => setMobileOpen(true)}
          onToggleCollapse={handleToggleCollapse}
          collapsed={collapsed}
          breadcrumb={breadcrumb}
        />

        <main className="flex-1 overflow-y-auto pt-14">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
