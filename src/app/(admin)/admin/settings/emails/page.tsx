"use client";

import { useState, useRef } from "react";
import { FloppyDisk, PaperPlaneTilt } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminEmailTemplates } from "@/lib/store/admin/emailTemplates";
import type { EmailTemplate, EmailTemplateId } from "@/lib/store/admin/emailTemplates";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { VariableInserter } from "@/components/admin/VariableInserter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmailTemplatesPage() {
  const { templates, updateTemplate } = useAdminEmailTemplates();
  const [activeId, setActiveId] = useState<EmailTemplateId>("order_confirmation");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const active = templates.find((t) => t.id === activeId);

  const [subject, setSubject] = useState(active?.subject ?? "");
  const [fromName, setFromName] = useState(active?.fromName ?? "");
  const [fromEmail, setFromEmail] = useState(active?.fromEmail ?? "");
  const [body, setBody] = useState(active?.body ?? "");

  const handleTabChange = (id: EmailTemplateId) => {
    // Save current before switching
    if (active) {
      updateTemplate(active.id, { subject, fromName, fromEmail, body });
    }
    setActiveId(id);
    const next = templates.find((t) => t.id === id);
    if (next) {
      setSubject(next.subject);
      setFromName(next.fromName);
      setFromEmail(next.fromEmail);
      setBody(next.body);
    }
  };

  const handleSave = () => {
    if (!active) return;
    updateTemplate(active.id, { subject, fromName, fromEmail, body });
    toast.success("Template saved");
  };

  const handleSendTest = () => {
    console.log("[Admin] Send test email:", { id: activeId, subject, fromName, fromEmail, body });
    toast.success("Test email logged to console (Phase 2: real delivery)");
  };

  const handleInsertVariable = (variable: string) => {
    void navigator.clipboard.writeText(variable);
    toast.success(`Copied ${variable} — paste where needed`);
  };

  const TAB_LABELS: Record<EmailTemplateId, string> = {
    order_confirmation: "Order confirmation",
    shipping_notification: "Shipping",
    custom_request_reply: "Custom request",
    password_reset: "Password reset",
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CONFIG"
        title="Email templates"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendTest}
              className="gap-1.5 rounded-sm text-[12px] h-8"
            >
              <PaperPlaneTilt size={14} />
              Send test
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
            >
              <FloppyDisk size={14} />
              Save
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border overflow-x-auto">
        {(Object.keys(TAB_LABELS) as EmailTemplateId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => handleTabChange(id)}
            className={cn(
              "px-4 py-2 text-[13px] font-medium transition-colors border-b-2 -mb-px whitespace-nowrap",
              activeId === id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {TAB_LABELS[id]}
          </button>
        ))}
      </div>

      {active && (
        <div className="grid grid-cols-12 gap-6">
          {/* Editor (8/12) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
            <div className="rounded-sm border border-border bg-card p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="From name">
                  <AdminInput value={fromName} onChange={(e) => setFromName(e.target.value)} />
                </FormField>
                <FormField label="From email">
                  <AdminInput type="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
                </FormField>
              </div>
              <FormField label="Subject line">
                <AdminInput value={subject} onChange={(e) => setSubject(e.target.value)} />
              </FormField>
              <FormField label="Body">
                <AdminTextarea
                  ref={bodyRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[320px] font-mono text-[13px]"
                />
              </FormField>
            </div>
          </div>

          {/* Variables sidebar (4/12) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="rounded-sm border border-border bg-card p-4 sticky top-4">
              <VariableInserter
                variables={active.variables}
                onInsert={handleInsertVariable}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
