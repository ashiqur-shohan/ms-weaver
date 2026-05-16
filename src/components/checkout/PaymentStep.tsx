"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/schemas/resolver";
import {
  paymentStepSchema,
  type PaymentStepValues,
  type PaymentMethod,
} from "@/lib/schemas/checkout";
import { useCheckout } from "@/lib/store/checkout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LuxuryField, LuxuryInput } from "@/components/checkout/LuxuryField";
import { cn } from "@/lib/utils";

// ─── Payment option definitions ────────────────────────────────────────────────

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  description: string;
  requiresMobile: boolean;
  disabled?: boolean;
  disabledNote?: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "bkash",
    label: "bKash",
    description: "Mobile financial service — instant payment",
    requiresMobile: true,
  },
  {
    id: "nagad",
    label: "Nagad",
    description: "Mobile financial service — instant payment",
    requiresMobile: true,
  },
  {
    id: "rocket",
    label: "Rocket",
    description: "DBBL mobile banking — instant payment",
    requiresMobile: true,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    requiresMobile: false,
  },
];

/**
 * Step 3: Payment method selection.
 * Mobile-number field (bKash, Nagad, Rocket) is registered through RHF
 * and validated by the superRefine in paymentStepSchema.
 */
export function PaymentStep() {
  const { savePayment, payment, setStep } = useCheckout();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentStepValues>({
    resolver: zodResolver<PaymentStepValues>(paymentStepSchema),
    defaultValues: payment ?? { method: undefined, mobileNumber: "" },
  });

  const selectedMethod = watch("method") as PaymentMethod | undefined;

  function onSubmit(data: PaymentStepValues) {
    savePayment(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Payment Method
      </h2>

      {errors.method && (
        <p className="mt-2 text-[12px] text-primary" role="alert">
          {errors.method.message}
        </p>
      )}

      <RadioGroup
        value={selectedMethod}
        onValueChange={(val) => {
          setValue("method", val as PaymentMethod, { shouldValidate: false });
          setValue("mobileNumber", "", { shouldValidate: false });
        }}
        className="mt-6 gap-3"
        aria-label="Payment method"
      >
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = selectedMethod === option.id;

          return (
            <label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "flex cursor-pointer flex-col border p-5 transition-colors duration-200",
                isSelected
                  ? "border-foreground bg-card"
                  : "border-border bg-transparent hover:border-foreground/40",
              )}
            >
              <div className="flex items-center gap-4">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="shrink-0"
                />
                <div>
                  <p className="text-[14px] font-medium text-foreground">
                    {option.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Mobile number field — revealed for MFS options */}
              {isSelected && option.requiresMobile && (
                <div className="mt-5 ml-8 border-t border-border pt-5">
                  <LuxuryField
                    label="Mobile number"
                    className="max-w-xs"
                    error={errors.mobileNumber?.message}
                  >
                    <LuxuryInput
                      {...register("mobileNumber")}
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      autoComplete="tel"
                      aria-invalid={!!errors.mobileNumber}
                    />
                  </LuxuryField>
                  <button
                    type="button"
                    onClick={() => {
                      // Phase 2: real OTP trigger
                      console.log("Send verification to:", watch("mobileNumber"));
                    }}
                    className="mt-4 flex h-10 items-center justify-center border border-border px-6 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-200 hover:border-foreground"
                  >
                    Send Verification
                  </button>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    Phase 1 — verification is a placeholder. No charge will be made.
                  </p>
                </div>
              )}
            </label>
          );
        })}

        {/* Card — coming soon, disabled */}
        <div className="flex cursor-not-allowed items-center gap-4 border border-border p-5 opacity-50">
          <span className="flex h-4 w-4 shrink-0 rounded-full border border-border" />
          <div>
            <p className="text-[14px] font-medium text-foreground">
              Card — Visa / Mastercard
            </p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              Via SSLCommerz · Coming in Phase 2
            </p>
          </div>
        </div>
      </RadioGroup>

      {/* Navigation */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex h-12 items-center justify-center border border-border px-8 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-200 hover:border-foreground"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex h-14 flex-1 items-center justify-center bg-primary text-[12px] font-medium uppercase tracking-[0.08em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
        >
          Review Order
        </button>
      </div>
    </form>
  );
}
