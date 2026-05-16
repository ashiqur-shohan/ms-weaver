"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/schemas/resolver";
import { shippingStepSchema, type ShippingStepValues } from "@/lib/schemas/checkout";
import { useCheckout } from "@/lib/store/checkout";
import { shippingOptions, resolveShippingCost } from "@/lib/mock/shipping";
import { useCartSubtotal } from "@/lib/store/cart";
import { formatBDT } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * Step 2: Shipping method selection.
 * Uses shadcn RadioGroup styled to the luxury pattern.
 */
export function ShippingStep() {
  const { saveShipping, shipping, setStep } = useCheckout();
  const subtotal = useCartSubtotal();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ShippingStepValues>({
    resolver: zodResolver<ShippingStepValues>(shippingStepSchema),
    defaultValues: shipping ?? { shippingOptionId: "" },
  });

  const selectedId = watch("shippingOptionId");

  function onSubmit(data: ShippingStepValues) {
    saveShipping(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Shipping Method
      </h2>

      {errors.shippingOptionId && (
        <p className="mt-2 text-[12px] text-primary" role="alert">
          {errors.shippingOptionId.message}
        </p>
      )}

      <RadioGroup
        value={selectedId}
        onValueChange={(val) => setValue("shippingOptionId", val)}
        className="mt-6 gap-3"
        aria-label="Shipping method"
      >
        {shippingOptions.map((option) => {
          const cost = resolveShippingCost(option, subtotal);
          const isFree = cost === 0 && option.price > 0;
          const isSelected = selectedId === option.id;

          return (
            <label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-4 border p-5 transition-colors duration-200",
                isSelected
                  ? "border-foreground bg-card"
                  : "border-border bg-transparent hover:border-foreground/40",
              )}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="shrink-0"
              />
              <div className="flex flex-1 items-start justify-between gap-4">
                <div>
                  <p className="text-[14px] font-medium text-foreground">
                    {option.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    {option.description} · {option.deliveryWindow}
                  </p>
                  {option.freeThreshold !== null && (
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Free over {formatBDT(option.freeThreshold)}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  {isFree ? (
                    <span className="text-[14px] font-medium text-accent">
                      Free
                    </span>
                  ) : (
                    <span className="text-[14px] text-foreground">
                      {formatBDT(cost)}
                    </span>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </RadioGroup>

      {/* Navigation */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex h-12 items-center justify-center border border-border px-8 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-200 hover:border-foreground"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex h-14 flex-1 items-center justify-center bg-primary text-[12px] font-medium uppercase tracking-[0.08em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
