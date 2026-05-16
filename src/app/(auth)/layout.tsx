import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { AuthHydration } from "@/components/layout/AuthHydration";

export const metadata: Metadata = {
  title: "Account | Ms Weaver",
  description: "Sign in or create your Ms Weaver account.",
};

/**
 * Auth layout — deliberately stripped of storefront Header, Footer and Lenis.
 * Monastic clarity per design.md. Mirrors the checkout layout pattern.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHydration />
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        {/* Minimal top bar */}
        <header className="h-16 shrink-0 border-b border-border">
          <div className="mx-auto flex h-full max-w-[640px] items-center justify-between px-6 md:px-12">
            <Logo />
            <Link
              href="/"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
            >
              Back to atelier
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-start justify-center px-6 py-16 md:px-12">
          <div className="w-full max-w-[480px]">{children}</div>
        </main>
      </div>
    </>
  );
}
