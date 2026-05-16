"use client";

import { useState, useRef } from "react";
import { Paperclip } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type ProjectType =
  | "Bridal"
  | "Heirloom"
  | "Home"
  | "Apparel"
  | "Accessories"
  | "Gift"
  | "Other"
  | "";

type Budget =
  | "Under ৳10,000"
  | "৳10,000–৳25,000"
  | "৳25,000–৳50,000"
  | "৳50,000+"
  | "";

type Timeline =
  | "Within 1 month"
  | "1–3 months"
  | "3–6 months"
  | "Flexible"
  | "";

interface Fields {
  name: string;
  email: string;
  phone: string;
  whatsappPreferred: boolean;
  projectType: ProjectType;
  budget: Budget;
  timeline: Timeline;
  vision: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  vision?: string;
}

function validate(fields: Fields): FormErrors {
  const errs: FormErrors = {};
  if (fields.name.trim().length < 2) errs.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = "Please enter a valid email address";
  if (!fields.projectType) errs.projectType = "Please select a project type";
  if (!fields.budget) errs.budget = "Please select a budget range";
  if (!fields.timeline) errs.timeline = "Please select a timeline";
  if (fields.vision.trim().length < 50)
    errs.vision = "Please tell us a bit more — at least 50 characters";
  return errs;
}

const labelClass =
  "block mb-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground";

const inputClass =
  "w-full h-11 border-0 border-b border-border bg-transparent px-0 text-[16px] text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus-visible:outline-none transition-colors duration-200";

const selectClass =
  "w-full h-11 border-0 border-b border-border bg-transparent px-0 text-[16px] text-foreground focus:border-foreground focus-visible:outline-none transition-colors duration-200 appearance-none cursor-pointer";

const errorClass = "mt-1.5 text-[12px] text-primary";

export function CustomOrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    whatsappPreferred: false,
    projectType: "",
    budget: "",
    timeline: "",
    vision: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setFileNames(files.map((f) => f.name));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Phase 1 stub — wire to Resend / notification in Phase 2
    console.log("[CustomOrderForm] Submission:", fields, "Files:", fileNames);
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="py-12">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          REQUEST RECEIVED
        </p>
        <p className="font-serif text-[28px] font-normal leading-[36px] text-foreground">
          Thank you. Ashfia will personally review your request.
        </p>
        <p className="mt-4 text-[16px] leading-[26px] text-muted-foreground">
          We reply within 3 business days. The next step is a short conversation
          — by email, phone, or WhatsApp — to discuss your vision before any
          commitment is made.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Name */}
      <div>
        <label htmlFor="co-name" className={labelClass}>
          Your name <span aria-hidden="true">*</span>
        </label>
        <input
          id="co-name"
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
        <label htmlFor="co-email" className={labelClass}>
          Email address <span aria-hidden="true">*</span>
        </label>
        <input
          id="co-email"
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

      {/* Phone */}
      <div>
        <label htmlFor="co-phone" className={labelClass}>
          Phone (optional, BD format)
        </label>
        <input
          id="co-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+880 17XX XXX XXX"
          value={fields.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* WhatsApp toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={fields.whatsappPreferred}
          onClick={() =>
            setFields((prev) => ({
              ...prev,
              whatsappPreferred: !prev.whatsappPreferred,
            }))
          }
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            fields.whatsappPreferred ? "bg-primary" : "bg-border",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none inline-block h-5 w-5 rounded-full bg-primary-foreground shadow-sm ring-0 transition-transform duration-200",
              fields.whatsappPreferred ? "translate-x-5" : "translate-x-0",
            )}
          />
        </button>
        <span className="text-[14px] text-foreground">
          I prefer to be contacted via WhatsApp
        </span>
      </div>

      {/* Project type */}
      <div>
        <label htmlFor="co-project-type" className={labelClass}>
          Project type <span aria-hidden="true">*</span>
        </label>
        <select
          id="co-project-type"
          name="projectType"
          value={fields.projectType}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Select…</option>
          {(
            [
              "Bridal",
              "Heirloom",
              "Home",
              "Apparel",
              "Accessories",
              "Gift",
              "Other",
            ] as ProjectType[]
          ).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className={errorClass} role="alert">
            {errors.projectType}
          </p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="co-budget" className={labelClass}>
          Budget range <span aria-hidden="true">*</span>
        </label>
        <select
          id="co-budget"
          name="budget"
          value={fields.budget}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Select…</option>
          {(
            [
              "Under ৳10,000",
              "৳10,000–৳25,000",
              "৳25,000–৳50,000",
              "৳50,000+",
            ] as Budget[]
          ).map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p className={errorClass} role="alert">
            {errors.budget}
          </p>
        )}
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="co-timeline" className={labelClass}>
          Timeline <span aria-hidden="true">*</span>
        </label>
        <select
          id="co-timeline"
          name="timeline"
          value={fields.timeline}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Select…</option>
          {(
            ["Within 1 month", "1–3 months", "3–6 months", "Flexible"] as Timeline[]
          ).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.timeline && (
          <p className={errorClass} role="alert">
            {errors.timeline}
          </p>
        )}
      </div>

      {/* Vision */}
      <div>
        <label htmlFor="co-vision" className={labelClass}>
          Tell us about your vision <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="co-vision"
          name="vision"
          rows={6}
          placeholder="Describe the piece you have in mind — the occasion, the recipient, any colours or textures that feel right. The more you share, the better we can respond."
          value={fields.vision}
          onChange={handleChange}
          className={cn(inputClass, "h-auto resize-none py-2")}
        />
        {errors.vision && (
          <p className={errorClass} role="alert">
            {errors.vision}
          </p>
        )}
      </div>

      {/* Inspiration images — UI stub */}
      <div>
        <p className={labelClass}>Inspiration images (optional)</p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-[14px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline transition-colors duration-200"
        >
          <Paperclip size={16} weight="regular" aria-hidden="true" />
          {fileNames.length > 0
            ? `${fileNames.length} file${fileNames.length > 1 ? "s" : ""} selected`
            : "Attach images"}
        </button>
        {fileNames.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {fileNames.map((name, i) => (
              <li key={i} className="text-[13px] text-muted-foreground">
                {name}
              </li>
            ))}
          </ul>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label="Upload inspiration images"
          onChange={handleFileChange}
        />
        <p className="mt-1.5 text-[12px] text-muted-foreground">
          Images are for reference only — no upload occurs in this phase.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-12 w-full items-center justify-center bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Request Consultation"}
      </button>
    </form>
  );
}
