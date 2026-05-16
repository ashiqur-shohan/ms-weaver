"use client";

import { useAuthUser } from "@/lib/store/auth";

/**
 * Client component — reads the auth store to display a personalised greeting.
 */
export function AccountGreeting() {
  const user = useAuthUser();
  const firstName = user?.name.split(" ")[0] ?? "there";

  return (
    <div>
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Welcome back
      </p>
      <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
        Hello, {firstName}
      </h2>
    </div>
  );
}
