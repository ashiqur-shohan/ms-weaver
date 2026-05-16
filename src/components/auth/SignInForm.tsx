"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogo } from "@phosphor-icons/react";
import { useAuth } from "@/lib/store/auth";
import { LuxuryField, LuxuryInput } from "@/components/checkout/LuxuryField";

interface SignInFormProps {
  nextHref?: string;
}

export function SignInForm({ nextHref = "/account" }: SignInFormProps) {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!password) next.password = "Password is required.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    console.log("[Ms Weaver] Sign-in attempt:", { email, rememberMe });
    // Simulate 600ms network delay
    await new Promise((r) => setTimeout(r, 600));
    console.log("[Ms Weaver] Signing in with:", email);
    signIn();
    router.push(nextHref);
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <LuxuryField label="Email address" error={errors.email} required>
          <LuxuryInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            disabled={loading}
          />
        </LuxuryField>

        <LuxuryField label="Password" error={errors.password} required>
          <LuxuryInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={loading}
          />
        </LuxuryField>

        {/* Remember me */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded-none border-border accent-primary"
              disabled={loading}
            />
            <span className="text-[13px] leading-[20px] text-muted-foreground">
              Remember me
            </span>
          </label>
          <Link
            href="/auth/forgot"
            className="text-[13px] leading-[20px] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-none bg-primary text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      {/* Divider + Google */}
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            or
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={() => console.log("[Ms Weaver] Google sign-in stub")}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-sm border border-foreground bg-transparent text-[12px] font-medium uppercase tracking-[0.05em] text-foreground transition-colors duration-200 hover:bg-muted"
        >
          <GoogleLogo size={18} weight="regular" aria-hidden="true" />
          Continue with Google
        </button>
      </div>

      {/* Bottom link */}
      <p className="text-center text-[13px] leading-[20px] text-muted-foreground">
        New to Ms Weaver?{" "}
        <Link
          href="/auth/register"
          className="text-foreground underline-offset-4 transition-colors duration-200 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
