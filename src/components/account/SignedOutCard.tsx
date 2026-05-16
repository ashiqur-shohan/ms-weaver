import Link from "next/link";

/**
 * Shown in the account layout when there is no authenticated user.
 * Server component — no interactivity needed.
 */
export function SignedOutCard() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Account
        </p>
        <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
          You&apos;re signed out
        </h2>
        <p className="mt-4 max-w-[360px] text-[15px] leading-[24px] text-muted-foreground">
          Sign in to see your orders, saved pieces, and delivery addresses.
        </p>
      </div>
      <Link
        href="/auth/sign-in?next=/account"
        className="flex h-12 items-center justify-center rounded-none bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
      >
        Sign in
      </Link>
    </div>
  );
}
