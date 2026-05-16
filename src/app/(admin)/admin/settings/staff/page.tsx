"use client";

import { useState } from "react";
import { Plus, ShieldCheck, ShieldSlash } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminStaff } from "@/lib/store/admin/staff";
import type { StaffMember, StaffRole, StaffStatus } from "@/lib/store/admin/staff";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { RolePill } from "@/components/admin/RolePill";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FormField, AdminInput, AdminSelect } from "@/components/admin/AdminFormPrimitives";
import { cn } from "@/lib/utils";

// ─── Invite dialog ────────────────────────────────────────────────────────────

function InviteDialog({
  open,
  onOpenChange,
  onInvite,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onInvite: (email: string, role: StaffRole) => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<StaffRole>("Editor");

  const handleInvite = () => {
    if (!email) return;
    onInvite(email, role);
    console.log("[Admin] Staff invite sent to:", email, "as", role);
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">Invite staff member</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <FormField label="Email address" required>
            <AdminInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colleague@msweaver.com" />
          </FormField>
          <FormField label="Role">
            <AdminSelect
              value={role}
              onChange={(e) => setRole(e.target.value as StaffRole)}
              options={[
                { value: "Manager", label: "Manager — full access except billing" },
                { value: "Editor", label: "Editor — content & orders only" },
              ]}
            />
          </FormField>
          <p className="text-[11px] text-muted-foreground/70">
            An invitation email will be sent to this address. (Phase 1: logged to console only.)
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-[12px] text-muted-foreground">Cancel</Button>
          <Button size="sm" onClick={handleInvite} disabled={!email} className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90">Send invite</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Staff detail sheet ───────────────────────────────────────────────────────

function StaffSheet({
  member,
  onClose,
  onUpdate,
}: {
  member: StaffMember | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<StaffMember>) => void;
}) {
  if (!member) return null;

  return (
    <Sheet open={!!member} onOpenChange={onClose}>
      <SheetContent className="w-[360px] rounded-none p-0">
        <SheetHeader className="h-14 flex flex-row items-center border-b border-border px-6">
          <SheetTitle className="text-[14px] font-medium">Staff member</SheetTitle>
        </SheetHeader>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {member.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-muted" />
            )}
            <div>
              <div className="text-[15px] font-medium text-foreground">{member.name}</div>
              <div className="text-[12px] text-muted-foreground">{member.email}</div>
            </div>
          </div>

          <FormField label="Role">
            <AdminSelect
              value={member.role}
              onChange={(e) => onUpdate(member.id, { role: e.target.value as StaffRole })}
              options={[
                { value: "Owner", label: "Owner — full access" },
                { value: "Manager", label: "Manager — full except billing" },
                { value: "Editor", label: "Editor — content & orders" },
              ]}
              disabled={member.role === "Owner"}
            />
          </FormField>

          <div className="flex items-center gap-2 text-[13px]">
            {member.twoFAEnabled ? (
              <><ShieldCheck size={16} className="text-green-600" /><span className="text-muted-foreground">2FA enabled</span></>
            ) : (
              <><ShieldSlash size={16} className="text-muted-foreground/60" /><span className="text-muted-foreground">2FA not enabled</span></>
            )}
          </div>

          <div className="text-[11px] text-muted-foreground">
            Last sign-in:{" "}
            {member.lastSignIn
              ? new Date(member.lastSignIn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
              : "Never"}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StaffPage() {
  const { members, addMember, updateMember } = useAdminStaff();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<StaffMember | null>(null);

  const handleInvite = (email: string, role: StaffRole) => {
    addMember({
      id: `staff_${Date.now()}`,
      name: email.split("@")[0] ?? email,
      email,
      role,
      avatar: "",
      twoFAEnabled: false,
      lastSignIn: null,
      status: "Invited",
    });
    toast.success(`Invitation sent to ${email}`);
  };

  const columns: Column<StaffMember>[] = [
    {
      key: "avatar",
      header: "",
      className: "w-10",
      render: (m) =>
        m.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={m.avatar} alt={m.name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground">
            {m.name.charAt(0)}
          </div>
        ),
    },
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (m) => (
        <div>
          <div className="text-[13px] font-medium text-foreground">{m.name}</div>
          <div className="text-[11px] text-muted-foreground">{m.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (m) => <RolePill role={m.role} />,
    },
    {
      key: "twoFA",
      header: "2FA",
      render: (m) =>
        m.twoFAEnabled ? (
          <ShieldCheck size={15} className="text-green-600" />
        ) : (
          <ShieldSlash size={15} className="text-muted-foreground/40" />
        ),
    },
    {
      key: "lastSignIn",
      header: "Last sign-in",
      render: (m) => (
        <span className="text-[12px] text-muted-foreground">
          {m.lastSignIn
            ? new Date(m.lastSignIn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
            : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (m) => (
        <span className={cn(
          "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em]",
          m.status === "Active"
            ? "border-green-200 bg-green-50 text-green-700"
            : m.status === "Invited"
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-border bg-muted text-muted-foreground",
        )}>
          {m.status}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CONFIG"
        title="Staff & roles"
        actions={
          <Button
            size="sm"
            onClick={() => setInviteOpen(true)}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Plus size={14} />
            Invite staff
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={members}
        getRowId={(m) => m.id}
        onRowClick={(m) => setActiveMember(m)}
        emptyState="No staff members."
      />

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} onInvite={handleInvite} />

      <StaffSheet
        member={activeMember}
        onClose={() => setActiveMember(null)}
        onUpdate={updateMember}
      />
    </div>
  );
}
