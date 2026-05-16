"use client";

import { cn } from "@/lib/utils";
import type { CheckoutStep } from "@/lib/store/checkout";

interface CheckoutStepsProps {
  current: CheckoutStep;
}

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 1, label: "Address" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

/**
 * Top progress indicator for the checkout flow.
 * Displays step numbers + labels; highlights the current step.
 */
export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <nav aria-label="Checkout progress" className="mb-10">
      <ol className="flex items-center gap-0">
        {STEPS.map((step, i) => {
          const isCompleted = step.id < current;
          const isCurrent = step.id === current;

          return (
            <li key={step.id} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center gap-1.5">
                <span
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center text-[11px] font-medium transition-colors duration-200",
                    isCurrent
                      ? "bg-foreground text-background"
                      : isCompleted
                        ? "bg-foreground/20 text-foreground"
                        : "border border-border text-muted-foreground",
                  )}
                >
                  {step.id}
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.1em] transition-colors duration-200",
                    isCurrent
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-3 h-px w-12 transition-colors duration-200",
                    isCompleted ? "bg-foreground/40" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
