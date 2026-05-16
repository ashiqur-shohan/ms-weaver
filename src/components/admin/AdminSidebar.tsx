"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/lib/store/adminAuth";
import {
  SquaresFour,
  Package,
  Folder,
  Tag,
  ClipboardText,
  Users,
  Notepad,
  Percent,
  FileText,
  House,
  BookOpen,
  Quotes,
  Images,
  FolderOpen,
  Gear,
  Globe,
  EnvelopeSimple,
  Truck,
  Receipt,
  UsersFour,
  ChartLine,
  SignOut,
  X,
} from "@phosphor-icons/react";

// ─── Nav structure ────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  comingSoon?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/admin", icon: SquaresFour }],
  },
  {
    title: "COMMERCE",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Collections", href: "/admin/collections", icon: Folder },
      { label: "Categories", href: "/admin/categories", icon: Tag },
      { label: "Orders", href: "/admin/orders", icon: ClipboardText },
      { label: "Customers", href: "/admin/customers", icon: Users },
      {
        label: "Custom Requests",
        href: "/admin/custom-requests",
        icon: Notepad,
      },
      {
        label: "Discounts",
        href: "/admin/settings/discounts",
        icon: Percent,
      },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { label: "Pages", href: "/admin/pages", icon: FileText },
      {
        label: "Home Builder",
        href: "/admin/home-builder",
        icon: House,
      },
      {
        label: "Journal",
        href: "/admin/journal",
        icon: BookOpen,
      },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: Quotes,
      },
      {
        label: "Lookbook",
        href: "/admin/lookbook",
        icon: Images,
      },
      {
        label: "Media Library",
        href: "/admin/media",
        icon: FolderOpen,
      },
    ],
  },
  {
    title: "CONFIG",
    items: [
      {
        label: "Site Settings",
        href: "/admin/settings/site",
        icon: Gear,
      },
      {
        label: "Announcement Bar",
        href: "/admin/settings/announcement-bar",
        icon: Globe,
      },
      { label: "SEO", href: "/admin/settings/seo", icon: Globe },
      {
        label: "Email Templates",
        href: "/admin/settings/emails",
        icon: EnvelopeSimple,
      },
      {
        label: "Shipping",
        href: "/admin/settings/shipping",
        icon: Truck,
      },
      { label: "Tax", href: "/admin/settings/tax", icon: Receipt },
      {
        label: "Staff & Roles",
        href: "/admin/settings/staff",
        icon: UsersFour,
      },
      {
        label: "Analytics",
        href: "/admin/settings/analytics",
        icon: ChartLine,
      },
    ],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAdminAuth();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleSignOut = () => {
    signOut();
    router.push("/admin");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-border bg-card transition-all duration-200",
          collapsed ? "w-16" : "w-[240px]",
          // Mobile: hidden by default, shown when mobileOpen
          "max-lg:translate-x-[-100%] max-lg:shadow-lg",
          mobileOpen && "max-lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex h-14 items-center border-b border-border px-4",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {!collapsed && (
            <div>
              <div className="text-[13px] font-semibold tracking-[0.05em] text-foreground">
                MS WEAVER
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Admin
              </div>
            </div>
          )}
          {/* Mobile close button */}
          <button
            className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
          {collapsed && (
            <span className="text-[11px] font-bold tracking-widest text-foreground">
              MSW
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navSections.map((section) => (
            <div key={section.title} className="mb-4">
              {!collapsed && (
                <div className="px-4 pb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/60">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={onCloseMobile}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "relative flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium transition-colors duration-150",
                      collapsed ? "justify-center px-0" : "",
                      active
                        ? "text-foreground bg-muted font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {/* Active left border */}
                    {active && !collapsed && (
                      <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-primary" />
                    )}
                    <Icon
                      size={16}
                      className={cn(collapsed && "mx-auto")}
                    />
                    {!collapsed && (
                      <span className="flex-1">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: sign out */}
        <div className="border-t border-border p-3">
          {!collapsed && (
            <div className="mb-2 px-1">
              <div className="text-[12px] font-medium text-foreground">
                Ashfia Khatun
              </div>
              <div className="text-[11px] text-muted-foreground">
                Administrator
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className={cn(
              "flex w-full items-center gap-2 rounded-sm px-1 py-2 text-[12px] text-muted-foreground",
              "hover:text-foreground hover:bg-muted/50 transition-colors duration-150",
              collapsed && "justify-center",
            )}
            title={collapsed ? "Sign out" : undefined}
          >
            <SignOut size={15} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
