"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@/lib/schemas/resolver";
import { addressStepSchema, type AddressStepValues } from "@/lib/schemas/checkout";
import { useCheckout } from "@/lib/store/checkout";
import { BD_DISTRICTS } from "@/lib/data/bd-districts";
import { LuxuryField, LuxuryInput, LuxurySelect } from "@/components/checkout/LuxuryField";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Step 1: Shipping address + optional separate billing address.
 * Billing fields are enforced by the superRefine in addressStepSchema.
 */
export function AddressStep() {
  const { saveAddress, address } = useCheckout();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddressStepValues>({
    resolver: zodResolver<AddressStepValues>(addressStepSchema),
    defaultValues: address ?? {
      billingSameAsShipping: true,
      shipping: {
        fullName: "",
        email: "",
        phone: "",
        street: "",
        area: "",
        city: "",
        postalCode: "",
        district: undefined,
      },
    },
  });

  // Derive billing visibility from watched RHF value — no local state needed
  const billingSameAsShipping = watch("billingSameAsShipping");

  function onSubmit(data: AddressStepValues) {
    saveAddress(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <SectionHeading>Contact</SectionHeading>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <LuxuryField
          label="Full name"
          error={errors.shipping?.fullName?.message}
          required
          className="sm:col-span-2"
        >
          <LuxuryInput
            {...register("shipping.fullName")}
            placeholder="Nadia Rahman"
            autoComplete="name"
            aria-invalid={!!errors.shipping?.fullName}
          />
        </LuxuryField>

        <LuxuryField
          label="Email"
          error={errors.shipping?.email?.message}
          required
        >
          <LuxuryInput
            {...register("shipping.email")}
            type="email"
            placeholder="nadia@example.com"
            autoComplete="email"
            aria-invalid={!!errors.shipping?.email}
          />
        </LuxuryField>

        <LuxuryField
          label="Phone"
          error={errors.shipping?.phone?.message}
          required
        >
          <LuxuryInput
            {...register("shipping.phone")}
            type="tel"
            placeholder="+880 1712 345678"
            autoComplete="tel"
            aria-invalid={!!errors.shipping?.phone}
          />
        </LuxuryField>
      </div>

      {/* Shipping address */}
      <SectionHeading className="mt-10">Shipping Address</SectionHeading>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <LuxuryField
          label="Street address"
          error={errors.shipping?.street?.message}
          required
          className="sm:col-span-2"
        >
          <LuxuryInput
            {...register("shipping.street")}
            placeholder="House 14, Road 7, Block C"
            autoComplete="street-address"
            aria-invalid={!!errors.shipping?.street}
          />
        </LuxuryField>

        <LuxuryField
          label="Area / Neighbourhood"
          error={errors.shipping?.area?.message}
          required
        >
          <LuxuryInput
            {...register("shipping.area")}
            placeholder="Banani"
            autoComplete="address-level3"
            aria-invalid={!!errors.shipping?.area}
          />
        </LuxuryField>

        <LuxuryField
          label="City"
          error={errors.shipping?.city?.message}
          required
        >
          <LuxuryInput
            {...register("shipping.city")}
            placeholder="Dhaka"
            autoComplete="address-level2"
            aria-invalid={!!errors.shipping?.city}
          />
        </LuxuryField>

        <LuxuryField
          label="Postal code"
          error={errors.shipping?.postalCode?.message}
          required
        >
          <LuxuryInput
            {...register("shipping.postalCode")}
            placeholder="1213"
            autoComplete="postal-code"
            maxLength={4}
            aria-invalid={!!errors.shipping?.postalCode}
          />
        </LuxuryField>

        <LuxuryField
          label="District"
          error={errors.shipping?.district?.message}
          required
        >
          <LuxurySelect
            {...register("shipping.district")}
            autoComplete="address-level1"
            aria-invalid={!!errors.shipping?.district}
            defaultValue=""
          >
            <option value="" disabled>
              Select district
            </option>
            {BD_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </LuxurySelect>
        </LuxuryField>
      </div>

      {/* Billing same as shipping toggle — wired through RHF Controller */}
      <div className="mt-10">
        <label className="flex cursor-pointer items-center gap-3">
          <Controller
            name="billingSameAsShipping"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="billing-same"
              />
            )}
          />
          <span className="text-[13px] text-foreground">
            Billing address is the same as shipping
          </span>
        </label>
      </div>

      {/* Billing address — shown only when different from shipping */}
      {!billingSameAsShipping && (
        <div className="mt-8">
          <SectionHeading>Billing Address</SectionHeading>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <LuxuryField
              label="Full name"
              error={errors.billing?.fullName?.message}
              required
              className="sm:col-span-2"
            >
              <LuxuryInput
                {...register("billing.fullName")}
                placeholder="Nadia Rahman"
                autoComplete="name"
              />
            </LuxuryField>

            <LuxuryField
              label="Email"
              error={errors.billing?.email?.message}
              required
            >
              <LuxuryInput
                {...register("billing.email")}
                type="email"
                placeholder="nadia@example.com"
                autoComplete="email"
              />
            </LuxuryField>

            <LuxuryField
              label="Phone"
              error={errors.billing?.phone?.message}
              required
            >
              <LuxuryInput
                {...register("billing.phone")}
                type="tel"
                placeholder="+880 1712 345678"
                autoComplete="tel"
              />
            </LuxuryField>

            <LuxuryField
              label="Street address"
              error={errors.billing?.street?.message}
              required
              className="sm:col-span-2"
            >
              <LuxuryInput
                {...register("billing.street")}
                placeholder="House 14, Road 7, Block C"
                autoComplete="billing street-address"
              />
            </LuxuryField>

            <LuxuryField
              label="Area / Neighbourhood"
              error={errors.billing?.area?.message}
              required
            >
              <LuxuryInput
                {...register("billing.area")}
                placeholder="Banani"
                autoComplete="billing address-level3"
              />
            </LuxuryField>

            <LuxuryField
              label="City"
              error={errors.billing?.city?.message}
              required
            >
              <LuxuryInput
                {...register("billing.city")}
                placeholder="Dhaka"
                autoComplete="billing address-level2"
              />
            </LuxuryField>

            <LuxuryField
              label="Postal code"
              error={errors.billing?.postalCode?.message}
              required
            >
              <LuxuryInput
                {...register("billing.postalCode")}
                placeholder="1213"
                maxLength={4}
                autoComplete="billing postal-code"
              />
            </LuxuryField>

            <LuxuryField
              label="District"
              error={errors.billing?.district?.message}
              required
            >
              <LuxurySelect
                {...register("billing.district")}
                autoComplete="billing address-level1"
                defaultValue=""
              >
                <option value="" disabled>
                  Select district
                </option>
                {BD_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </LuxurySelect>
            </LuxuryField>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="mt-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center bg-primary text-[12px] font-medium uppercase tracking-[0.08em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Shipping
        </button>
      </div>
    </form>
  );
}

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}
