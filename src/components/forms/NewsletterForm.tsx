"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

/**
 * Newsletter subscription form stub.
 * Phase 1 — console.logs the email; Phase 2 will wire to Resend.
 */
export function NewsletterForm({
  placeholder = "your@email.com",
  buttonLabel,
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Phase 1 stub — wire to Resend in Phase 2
    console.log("[NewsletterForm] Subscription request:", email);
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return (
      <p className="text-[13px] text-muted-foreground">
        Thank you. You will hear from us when there is something worth saying.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex max-w-sm flex-col gap-3", className)}>
      <label
        htmlFor="newsletter-email"
        className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground"
      >
        Email address
      </label>
      <div className="flex items-end gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          autoComplete="email"
          className="h-11 flex-1 border-b border-border bg-transparent px-0 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus-visible:outline-none transition-colors duration-200"
        />
        <button
          type="submit"
          aria-label={buttonLabel ?? "Subscribe to newsletter"}
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center text-foreground transition-opacity duration-200 hover:opacity-60"
        >
          <ArrowRight size={20} weight="regular" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
