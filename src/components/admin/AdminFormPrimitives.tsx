"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

// ─── FormField ────────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground"
      >
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
      {hint && !error && (
        <span className="text-[11px] text-muted-foreground">{hint}</span>
      )}
      {error && (
        <span className="text-[11px] text-destructive">{error}</span>
      )}
    </div>
  );
}

// ─── AdminInput ───────────────────────────────────────────────────────────────

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border-0 border-b border-border bg-transparent text-[14px] text-foreground",
          "placeholder:text-muted-foreground/50",
          "focus:border-foreground focus:outline-none transition-colors duration-200",
          "h-8 px-0",
          error && "border-destructive focus:border-destructive",
          className,
        )}
        {...props}
      />
    );
  },
);
AdminInput.displayName = "AdminInput";

// ─── AdminTextarea ────────────────────────────────────────────────────────────

interface AdminTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const AdminTextarea = forwardRef<
  HTMLTextAreaElement,
  AdminTextareaProps
>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-y border border-border rounded-sm bg-transparent text-[14px] text-foreground",
        "placeholder:text-muted-foreground/50",
        "focus:border-foreground focus:outline-none transition-colors duration-200",
        "px-2 py-1.5 min-h-[80px]",
        error && "border-destructive",
        className,
      )}
      {...props}
    />
  );
});
AdminTextarea.displayName = "AdminTextarea";

// ─── AdminSelect ──────────────────────────────────────────────────────────────

interface AdminSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ className, error, placeholder, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full border-0 border-b border-border bg-transparent text-[14px] text-foreground",
          "focus:border-foreground focus:outline-none transition-colors duration-200",
          "h-8 px-0",
          error && "border-destructive",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  },
);
AdminSelect.displayName = "AdminSelect";

// ─── ChipInput ────────────────────────────────────────────────────────────────

interface ChipInputProps {
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function ChipInput({
  value,
  onChange,
  placeholder = "Add and press Enter...",
  className,
}: ChipInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = e.currentTarget;
      const val = input.value.trim();
      if (val && !value.includes(val)) {
        onChange([...value, val]);
        input.value = "";
      }
    } else if (e.key === "Backspace" && e.currentTarget.value === "") {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-1 min-h-[32px] border-b border-border pb-1 focus-within:border-foreground transition-colors",
        className,
      )}
    >
      {value.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center gap-1 rounded-sm bg-muted px-1.5 py-0.5 text-[12px]"
        >
          {chip}
          <button
            type="button"
            onClick={() => onChange(value.filter((v) => v !== chip))}
            className="text-muted-foreground hover:text-foreground leading-none"
            aria-label={`Remove ${chip}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent text-[14px] focus:outline-none placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
