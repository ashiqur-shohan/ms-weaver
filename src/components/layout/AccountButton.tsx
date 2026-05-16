"use client";

import Link from "next/link";
import { User } from "@phosphor-icons/react";
import { useAuthUser } from "@/lib/store/auth";

/**
 * Account icon button in the Header.
 * Links to /account if signed in, /auth/sign-in?next=/account if not.
 * Extracted as a client component so the rest of Header stays server.
 */
export function AccountButton() {
  const user = useAuthUser();
  const href = user ? "/account" : "/auth/sign-in?next=/account";
  const label = user ? `Account — signed in as ${user.name}` : "Sign in to your account";

  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-[44px] w-[44px] items-center justify-center text-foreground transition-opacity duration-200 hover:opacity-60"
    >
      <User size={24} weight="regular" aria-hidden="true" />
    </Link>
  );
}
