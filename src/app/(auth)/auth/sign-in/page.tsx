import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Ms Weaver",
  description: "Sign in to your Ms Weaver account to view orders and saved pieces.",
};

interface SignInPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { next } = await searchParams;

  return (
    <AuthForm eyebrow="Welcome back" heading="Sign in">
      <SignInForm nextHref={next ?? "/account"} />
    </AuthForm>
  );
}
