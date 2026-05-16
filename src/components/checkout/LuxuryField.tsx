import { cn } from "@/lib/utils";

interface LuxuryFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

/**
 * Field wrapper with eyebrow-style label and inline error message.
 * Pairs with the underline-only input pattern from design.md Section 6.
 */
export function LuxuryField({
  label,
  error,
  children,
  className,
  required,
}: LuxuryFieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
        {required && (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[12px] text-primary leading-[16px]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Underline-only input per design.md Section 6.
 * Use inside <LuxuryField> for label + error handling.
 */
export function LuxuryInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full border-0 border-b border-border bg-transparent px-0",
        "text-[14px] leading-[22px] text-foreground",
        "placeholder:text-muted-foreground",
        "focus:border-foreground focus:outline-none focus-visible:ring-0",
        "transition-colors duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Underline-only select per design.md Section 6.
 */
export function LuxurySelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-11 w-full border-0 border-b border-border bg-transparent px-0",
        "text-[14px] leading-[22px] text-foreground",
        "focus:border-foreground focus:outline-none focus-visible:ring-0",
        "transition-colors duration-200 cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Remove default select arrow styling on some browsers
        "appearance-none",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
