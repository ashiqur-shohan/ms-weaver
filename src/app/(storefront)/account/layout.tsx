"use client";

import { useAuthUser } from "@/lib/store/auth";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { SignedOutCard } from "@/components/account/SignedOutCard";
import { Container } from "@/components/layout/Container";

/**
 * Account layout — client shell.
 * Guards all /account/* pages: shows SignedOutCard if not authenticated,
 * otherwise renders the 3/9 asymmetric sidebar layout.
 */
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthUser();

  if (!user) {
    return (
      <Container>
        <SignedOutCard />
      </Container>
    );
  }

  return (
    <Container className="py-16 md:py-20">
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {/* Sidebar — 3/12 desktop, hidden mobile (shown as top nav via separate mobile menu in future) */}
        <div className="col-span-12 md:col-span-3">
          <AccountSidebar />
        </div>

        {/* Main content — 9/12 desktop */}
        <div className="col-span-12 md:col-span-9">{children}</div>
      </div>
    </Container>
  );
}
