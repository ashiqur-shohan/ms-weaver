import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { ForgotForm } from "@/components/auth/ForgotForm";

export const metadata: Metadata = {
  title: "Forgot Password | Ms Weaver",
  description: "Reset your Ms Weaver account password.",
};

export default function ForgotPage() {
  return (
    <AuthForm eyebrow="Reset" heading="Forgot your password?">
      <ForgotForm />
    </AuthForm>
  );
}
