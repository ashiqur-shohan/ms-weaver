"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  List,
  MagnifyingGlass,
  Bell,
  User,
  SignOut,
  CaretRight,
} from "@phosphor-icons/react";
import { useAdminAuth } from "@/lib/store/adminAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ─── Mock recent activity ─────────────────────────────────────────────────────

const recentActivity = [
  { id: 1, text: "New order MSW-2025-0073 from Kamrun Nahar", time: "2m ago" },
  {
    id: 2,
    text: "Custom request submitted by Arif Karim",
    time: "14m ago",
  },
  { id: 3, text: "Order MSW-2025-0062 moved to In Atelier", time: "1h ago" },
  { id: 4, text: "New customer: Sumaiya Begum", time: "2h ago" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminTopbarProps {
  onToggleMobileSidebar: () => void;
  onToggleCollapse: () => void;
  collapsed: boolean;
  breadcrumb?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminTopbar({
  onToggleMobileSidebar,
  onToggleCollapse,
  collapsed,
  breadcrumb,
}: AdminTopbarProps) {
  const router = useRouter();
  const { signOut } = useAdminAuth();
  const [cmdOpen, setCmdOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.push("/admin");
  };

  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-4 transition-all duration-200",
        collapsed ? "left-16" : "left-[240px]",
        "max-lg:left-0",
      )}
    >
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Open sidebar"
        >
          <List size={20} />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <List size={20} />
        </button>

        {breadcrumb && (
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-muted-foreground">Admin</span>
            <CaretRight size={12} className="text-muted-foreground" />
            <span className="text-foreground">{breadcrumb}</span>
          </div>
        )}
      </div>

      {/* Right: search, notifications, avatar */}
      <div className="flex items-center gap-1">
        {/* Search / command palette */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCmdOpen(true)}
          aria-label="Search (Cmd+K)"
          className="text-muted-foreground hover:text-foreground"
        >
          <MagnifyingGlass size={18} />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="px-3 py-2 border-b border-border">
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Recent Activity
              </span>
            </div>
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="px-3 py-2 border-b border-border/50 last:border-0"
              >
                <p className="text-[12px] text-foreground leading-snug">
                  {item.text}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {item.time}
                </p>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar / sign out */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account menu"
              className="text-muted-foreground hover:text-foreground"
            >
              <User size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2">
              <p className="text-[12px] font-medium text-foreground">
                Ashfia Khatun
              </p>
              <p className="text-[11px] text-muted-foreground">Administrator</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="gap-2 text-[13px] cursor-pointer"
            >
              <SignOut size={14} />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Command palette dialog */}
      <Dialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <DialogContent className="max-w-md rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-[15px]">Command palette</DialogTitle>
            <DialogDescription>
              Quick search across orders, products, customers, and pages.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Coming in Part 2
            </span>
            <p className="text-[12px] text-muted-foreground mt-1">
              Full command palette with search will be available in Part 2.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
