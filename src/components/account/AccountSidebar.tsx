"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Package,
  Heart,
  MapPin,
  Gear,
  SignOut,
} from "@phosphor-icons/react";
import { useAuth, useAuthUser } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/account", label: "Overview", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/profile", label: "Profile", icon: Gear },
];

/**
 * Left sidebar for account pages. Sticky, reads auth store for name/initials.
 */
export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthUser();
  const { signOut } = useAuth();

  const name = user?.name ?? "Account";
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0] ?? "")
    .join("")
    .toUpperCase();

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <aside className="sticky top-24 flex flex-col gap-8">
      {/* Avatar + name */}
      <div className="flex flex-col items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-[14px] font-medium tracking-[0.05em] text-foreground">
          {user?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={`${name}'s avatar`}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Account
          </p>
          <p className="mt-0.5 text-[15px] leading-[22px] font-medium text-foreground">
            {name}
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav aria-label="Account navigation">
        <ul role="list" className="flex flex-col">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/account"
                ? pathname === "/account"
                : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 py-2.5 text-[13px] leading-[20px] transition-colors duration-200",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    size={16}
                    weight={isActive ? "fill" : "regular"}
                    aria-hidden="true"
                    className={isActive ? "text-primary" : ""}
                  />
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Sign out */}
          <li className="mt-2 border-t border-border pt-2">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 py-2.5 text-[13px] leading-[20px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <SignOut size={16} weight="regular" aria-hidden="true" />
              Sign out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
