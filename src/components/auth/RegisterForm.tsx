"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogo } from "@phosphor-icons/react";
import { useAuth } from "@/lib/store/auth";
import { LuxuryField, LuxuryInput } from "@/components/checkout/LuxuryField";

function getPasswordStrength(pw: string): string {
  if (pw.length === 0) return "";
  if (pw.length < 8) return "Too short";
  if (pw.length >= 8 && /\d/.test(pw)) return "Good";
  return "Add a number";
}

export function RegisterForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordStrength = getPasswordStrength(password);

  function validate() {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "Must be at least 8 characters.";
    else if (!/\d/.test(password)) next.password = "Must include at least one number.";
    if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";
    if (!agreeTerms) next.terms = "Please agree to the terms to continue.";
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
    console.log("[Ms Weaver] Register attempt:", { firstName, lastName, email });
    await new Promise((r) => setTimeout(r, 600));
    console.log("[Ms Weaver] Signing up with:", email);
    signIn();
    router.push("/account");
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <LuxuryField label="First name" error={errors.firstName} required>
            <LuxuryInput
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Rahela"
              autoComplete="given-name"
              disabled={loading}
            />
          </LuxuryField>
          <LuxuryField label="Last name" error={errors.lastName} required>
            <LuxuryInput
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Chowdhury"
              autoComplete="family-name"
              disabled={loading}
            />
          </LuxuryField>
        </div>

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

        <div className="flex flex-col gap-1.5">
          <LuxuryField label="Password" error={errors.password} required>
            <LuxuryInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
            />
          </LuxuryField>
          {password && (
            <p
              className={`text-[12px] leading-[16px] ${
                passwordStrength === "Good"
                  ? "text-accent"
                  : "text-muted-foreground"
              }`}
            >
              {passwordStrength === "Good"
                ? "Strong enough"
                : passwordStrength === "Add a number"
                ? "8+ characters — add a number to strengthen it"
                : "8+ characters, 1 number required"}
            </p>
          )}
          {!password && (
            <p className="text-[12px] leading-[16px] text-muted-foreground">
              8+ characters, 1 number required
            </p>
          )}
        </div>

        <LuxuryField label="Confirm password" error={errors.confirmPassword} required>
          <LuxuryInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={loading}
          />
        </LuxuryField>

        {/* Terms */}
        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded-none border-border accent-primary"
              disabled={loading}
            />
            <span className="text-[13px] leading-[20px] text-muted-foreground">
              I agree to the{" "}
              <Link
                href="/legal/terms"
                className="text-foreground underline-offset-4 hover:underline"
                target="_blank"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="text-foreground underline-offset-4 hover:underline"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-[12px] text-primary" role="alert">
              {errors.terms}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-none bg-primary text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
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
          onClick={() => console.log("[Ms Weaver] Google sign-up stub")}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-sm border border-foreground bg-transparent text-[12px] font-medium uppercase tracking-[0.05em] text-foreground transition-colors duration-200 hover:bg-muted"
        >
          <GoogleLogo size={18} weight="regular" aria-hidden="true" />
          Continue with Google
        </button>
      </div>

      {/* Bottom link */}
      <p className="text-center text-[13px] leading-[20px] text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="text-foreground underline-offset-4 transition-colors duration-200 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
