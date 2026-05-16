"use client";

import { useState } from "react";
import Link from "next/link";
import { LuxuryField, LuxuryInput } from "@/components/checkout/LuxuryField";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(undefined);
    setLoading(true);
    console.log("[Ms Weaver] Forgot password request for:", email);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-6">
        <div className="border border-border bg-card px-6 py-5">
          <p className="text-[14px] leading-[22px] text-foreground">
            If an account exists for{" "}
            <span className="font-medium">{email}</span>, a reset link is on
            its way.
          </p>
          <p className="mt-2 text-[13px] leading-[20px] text-muted-foreground">
            Check your inbox — it may take a few minutes to arrive.
          </p>
        </div>
        <Link
          href="/auth/sign-in"
          className="text-[13px] leading-[20px] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-[14px] leading-[22px] text-muted-foreground">
        Enter the email address associated with your account and we will send
        you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <LuxuryField label="Email address" error={error} required>
          <LuxuryInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            disabled={loading}
          />
        </LuxuryField>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-none bg-primary text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <Link
        href="/auth/sign-in"
        className="text-[13px] leading-[20px] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
      >
        ← Back to sign in
      </Link>
    </div>
  );
}
