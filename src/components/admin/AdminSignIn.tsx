"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash, LockSimple } from "@phosphor-icons/react";
import { useAdminAuth } from "@/lib/store/adminAuth";
import { Button } from "@/components/ui/button";

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminSignIn() {
  const { signIn } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Brief artificial delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const success = signIn(password);
    setLoading(false);

    if (!success) {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-[360px]">
        {/* Wordmark */}
        <div className="mb-10 text-center">
          <div className="font-serif text-[28px] font-light tracking-[-0.02em] text-foreground">
            Ms Weaver
          </div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div className="rounded-sm border border-border bg-card p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-[16px] font-medium text-foreground">
              Sign in
            </h1>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Enter your admin password to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="admin-password"
                className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-0 border-b border-border bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors duration-200 h-9 pr-8 px-0"
                  placeholder="Admin password"
                  autoComplete="current-password"
                  aria-describedby={error ? "pw-error" : undefined}
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlash size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && (
                <span
                  id="pw-error"
                  className="text-[12px] text-destructive"
                  role="alert"
                >
                  {error}
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || !password}
              className="mt-2 h-9 w-full rounded-sm bg-primary text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <LockSimple size={14} />
              {loading ? "Verifying..." : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          Back to{" "}
          <Link
            href="/"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            storefront
          </Link>
        </p>
      </div>
    </div>
  );
}
