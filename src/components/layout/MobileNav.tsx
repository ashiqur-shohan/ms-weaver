"use client";

import Link from "next/link";
import { List, X, MagnifyingGlass, User } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/mock/site";

/**
 * Mobile navigation drawer — slides from the left on screens < md.
 * Uses shadcn Sheet primitive.
 */
export function MobileNav() {
  const { primary } = siteConfig.nav;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation menu"
          className="flex h-[44px] w-[44px] items-center justify-center text-foreground transition-opacity duration-200 hover:opacity-60 md:hidden"
        >
          <List size={24} weight="regular" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-[88vw] max-w-[420px] rounded-none border-r border-border bg-background p-0"
      >
        {/* Sheet header */}
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <span className="font-serif text-base font-light uppercase tracking-[0.18em] text-foreground">
            MS WEAVER
          </span>
          <SheetClose asChild>
            <button
              aria-label="Close navigation menu"
              className="flex h-[44px] w-[44px] items-center justify-center text-foreground transition-opacity duration-200 hover:opacity-60"
            >
              <X size={24} weight="regular" aria-hidden="true" />
            </button>
          </SheetClose>
        </div>

        {/* Navigation links */}
        <nav aria-label="Mobile navigation">
          <ul role="list" className="py-2">
            {primary.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="flex h-14 items-center border-b border-border px-6 text-[13px] font-medium uppercase tracking-[0.1em] text-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom utilities */}
        <div className="mt-auto border-t border-border">
          <SheetClose asChild>
            <Link
              href="/search"
              className="flex h-14 items-center gap-3 px-6 text-[13px] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <MagnifyingGlass size={20} weight="regular" aria-hidden="true" />
              Search
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={siteConfig.nav.account.loginHref}
              className="flex h-14 items-center gap-3 border-t border-border px-6 text-[13px] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <User size={20} weight="regular" aria-hidden="true" />
              Account
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
