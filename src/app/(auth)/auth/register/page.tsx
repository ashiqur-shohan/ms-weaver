import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Ms Weaver",
  description: "Create your Ms Weaver account to track orders and save pieces.",
};

export default function RegisterPage() {
  return (
    <AuthForm eyebrow="Join us" heading="Create your account">
      <RegisterForm />
    </AuthForm>
  );
}
