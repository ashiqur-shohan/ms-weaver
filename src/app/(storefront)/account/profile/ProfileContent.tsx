"use client";

import { useState } from "react";
import { LuxuryField, LuxuryInput } from "@/components/checkout/LuxuryField";
import type { Customer } from "@/lib/mock/customers";

interface ProfileContentProps {
  user: Customer;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const nameParts = user.name.split(" ");
  const [firstName, setFirstName] = useState(nameParts[0] ?? "");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") ?? "");
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState<string | undefined>();

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    console.log("[Ms Weaver] Profile update (stub):", {
      firstName,
      lastName,
      email,
      phone,
    });
    await new Promise((r) => setTimeout(r, 600));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  async function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    setPasswordError(undefined);
    setPasswordSaving(true);
    console.log("[Ms Weaver] Password change (stub)");
    await new Promise((r) => setTimeout(r, 600));
    setPasswordSaving(false);
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-12">
      {/* Page header */}
      <div>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Account
        </p>
        <h1 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
          Your profile
        </h1>
      </div>

      {/* Personal details */}
      <section aria-label="Personal details">
        <h2 className="mb-6 font-serif text-[22px] font-normal leading-[30px] tracking-[-0.005em] text-foreground">
          Personal details
        </h2>
        <form
          onSubmit={handleProfileSave}
          noValidate
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <LuxuryField label="First name" required>
              <LuxuryInput
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={profileSaving}
              />
            </LuxuryField>
            <LuxuryField label="Last name" required>
              <LuxuryInput
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={profileSaving}
              />
            </LuxuryField>
          </div>
          <LuxuryField label="Email address" required>
            <LuxuryInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={profileSaving}
            />
          </LuxuryField>
          <LuxuryField label="Phone">
            <LuxuryInput
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={profileSaving}
            />
          </LuxuryField>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={profileSaving}
              className="flex h-12 items-center justify-center rounded-none bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {profileSaving ? "Saving…" : "Save changes"}
            </button>
            {profileSaved && (
              <p className="text-[13px] text-accent" role="status">
                Changes saved
              </p>
            )}
          </div>
        </form>
      </section>

      {/* Password */}
      <section
        aria-label="Change password"
        className="border-t border-border pt-10"
      >
        <h2 className="mb-6 font-serif text-[22px] font-normal leading-[30px] tracking-[-0.005em] text-foreground">
          Change password
        </h2>
        <form
          onSubmit={handlePasswordSave}
          noValidate
          className="flex flex-col gap-6"
        >
          <LuxuryField label="Current password" required>
            <LuxuryInput
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={passwordSaving}
            />
          </LuxuryField>
          <LuxuryField
            label="New password"
            required
            error={passwordError}
          >
            <LuxuryInput
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={passwordSaving}
            />
          </LuxuryField>
          <LuxuryField label="Confirm new password" required>
            <LuxuryInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={passwordSaving}
            />
          </LuxuryField>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={passwordSaving}
              className="flex h-12 items-center justify-center rounded-none bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordSaving ? "Saving…" : "Update password"}
            </button>
            {passwordSaved && (
              <p className="text-[13px] text-accent" role="status">
                Password updated
              </p>
            )}
          </div>
        </form>
      </section>

      {/* Delete account */}
      <div className="border-t border-border pt-8">
        <button
          onClick={() =>
            console.log("[Ms Weaver] Delete account (Phase 1 stub)")
          }
          className="text-[13px] leading-[20px] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}
