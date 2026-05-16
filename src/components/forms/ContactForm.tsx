"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const labelClass =
  "block mb-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground";

const inputClass =
  "w-full h-11 border-0 border-b border-border bg-transparent px-0 text-[16px] text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus-visible:outline-none transition-colors duration-200";

const errorClass = "mt-1.5 text-[12px] text-primary";

function validate(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): FormErrors {
  const errs: FormErrors = {};
  if (data.name.trim().length < 2) errs.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = "Please enter a valid email address";
  if (data.subject.trim().length < 3) errs.subject = "Please enter a subject";
  if (data.message.trim().length < 10)
    errs.message = "Please write at least 10 characters";
  return errs;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Phase 1 stub — wire to Resend in Phase 2
    console.log("[ContactForm] Submission:", fields);
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="py-12">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          MESSAGE SENT
        </p>
        <p className="font-serif text-[28px] font-normal leading-[36px] text-foreground">
          Your note has reached the atelier.
        </p>
        <p className="mt-4 text-[16px] leading-[26px] text-muted-foreground">
          We respond within 2 business days. If your inquiry is urgent, reach us
          on WhatsApp at +880 1712 345678.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Fatima Rahman"
          value={fields.name}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.name && (
          <p className={errorClass} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.email && (
          <p className={errorClass} role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="Custom order inquiry"
          value={fields.subject}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.subject && (
          <p className={errorClass} role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Write your message here…"
          value={fields.message}
          onChange={handleChange}
          className={cn(inputClass, "h-auto resize-none border-b border-border py-2")}
        />
        {errors.message && (
          <p className={errorClass} role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-12 w-full items-center justify-center bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
