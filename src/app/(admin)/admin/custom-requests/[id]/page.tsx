"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CaretLeft,
  EnvelopeSimple,
  Archive,
  ArrowRight,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminCustomRequests } from "@/lib/store/admin/customRequests";
import { StatusPill } from "@/components/admin/StatusPill";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AdminTextarea, AdminSelect, FormField } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatBDT } from "@/lib/utils";
import type { RequestStatus } from "@/lib/mock/customRequests";

// ─── Status options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: RequestStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "confirmed", label: "Confirmed" },
  { value: "declined", label: "Declined" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

// ─── Reply dialog ─────────────────────────────────────────────────────────────

function ReplyDialog({
  open,
  onOpenChange,
  to,
  subject,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  to: string;
  subject: string;
}) {
  const [body, setBody] = useState(
    `Dear ${to.split("@")[0]},\n\nThank you for your enquiry. I have reviewed your request and would like to discuss the details further.\n\nWarm regards,\nAshfia\nMs Weaver Atelier`,
  );

  const handleSend = () => {
    console.log("[Admin] Reply email:", { to, subject, body });
    toast.success("Reply sent (logged to console in Phase 1)");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[15px]">Reply to customer</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              To
            </span>
            <span className="text-[13px] text-foreground">{to}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Subject
            </span>
            <span className="text-[13px] text-foreground">{subject}</span>
          </div>
          <FormField label="Message">
            <AdminTextarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[160px]"
            />
          </FormField>
        </div>
        <DialogFooter className="border-0 bg-transparent p-0 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-[12px] text-muted-foreground"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSend}
            className="rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const requests = useAdminCustomRequests((s) => s.requests);
  const {
    updateRequestStatus,
    updatePriority,
    updateInternalNotes,
    archiveRequest,
  } = useAdminCustomRequests();

  const request = requests.find((r) => r.id === id);

  const [internalNotes, setInternalNotes] = useState(
    request?.internalNotes ?? "",
  );
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);

  if (!request) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/custom-requests"
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
        >
          <CaretLeft size={14} />
          Back to requests
        </Link>
        <p className="text-[13px] text-muted-foreground">Request not found.</p>
      </div>
    );
  }

  const handleSaveNotes = () => {
    updateInternalNotes(request.id, internalNotes);
    toast.success("Notes saved");
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/custom-requests"
        className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <CaretLeft size={13} />
        Custom Requests
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-0.5">
            CUSTOM REQUEST
          </div>
          <h1 className="font-serif text-[22px] font-normal text-foreground">
            {request.occasion}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[13px] text-muted-foreground">
              {request.customerName}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-[13px] text-muted-foreground">
              {new Date(request.submittedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <StatusPill status={request.status} />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReplyDialogOpen(true)}
            className="gap-1.5 rounded-sm text-[12px] h-8"
          >
            <EnvelopeSimple size={14} />
            Reply
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast("Coming in Phase 2 — order conversion requires database integration");
            }}
            className="gap-1.5 rounded-sm text-[12px] h-8"
          >
            <ArrowRight size={14} />
            Convert to draft order
          </Button>
          <Button
            size="sm"
            onClick={() => setArchiveDialogOpen(true)}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <Archive size={14} />
            Archive
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left (8/12) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {/* Request details */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-5 flex flex-col gap-4">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">
                Project description
              </div>
              <p className="text-[14px] text-foreground leading-relaxed">
                {request.description}
              </p>
            </div>

            {request.preferredMaterials &&
              request.preferredMaterials.length > 0 && (
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    Preferred materials
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {request.preferredMaterials.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-[12px] text-foreground"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {request.budget && (
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">
                  Budget range
                </div>
                <div className="text-[14px] text-foreground">
                  {formatBDT(request.budget.min)} –{" "}
                  {formatBDT(request.budget.max)}
                </div>
              </div>
            )}

            {request.deadline && (
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">
                  Required by
                </div>
                <div className="text-[14px] text-foreground">
                  {new Date(request.deadline).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            )}

            {request.inspirationUrls && request.inspirationUrls.length > 0 && (
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-1">
                  Inspiration links
                </div>
                <div className="flex flex-col gap-1">
                  {request.inspirationUrls.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                    >
                      {url}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Internal notes */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Internal notes
            </div>
            <AdminTextarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Notes visible to admin only..."
              className="min-h-[120px]"
            />
          </div>
        </div>

        {/* Right (4/12) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* Customer info */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-2">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Customer
            </div>
            <div className="text-[14px] font-medium text-foreground">
              {request.customerName}
            </div>
            <div className="text-[13px] text-muted-foreground">
              {request.customerEmail}
            </div>
            <div className="text-[13px] text-muted-foreground">
              {request.customerPhone}
            </div>
          </div>

          {/* Status workflow */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Status
            </div>
            <AdminSelect
              value={request.status}
              onChange={(e) =>
                updateRequestStatus(request.id, e.target.value as RequestStatus)
              }
              options={STATUS_OPTIONS}
            />
          </div>

          {/* Priority */}
          <div className="rounded-sm border border-border bg-card shadow-sm p-4 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Priority
            </div>
            <AdminSelect
              value={request.priority ?? "medium"}
              onChange={(e) =>
                updatePriority(
                  request.id,
                  e.target.value as "high" | "medium" | "low",
                )
              }
              options={PRIORITY_OPTIONS}
            />
          </div>
        </div>
      </div>

      {/* Archive confirm */}
      <ConfirmDialog
        open={archiveDialogOpen}
        onOpenChange={setArchiveDialogOpen}
        title="Archive request"
        description="This request will be moved to the archived view. You can restore it at any time."
        confirmLabel="Archive"
        onConfirm={() => {
          archiveRequest(request.id);
          toast.success("Request archived");
          router.push("/admin/custom-requests");
        }}
      />

      {/* Reply dialog */}
      <ReplyDialog
        open={replyDialogOpen}
        onOpenChange={setReplyDialogOpen}
        to={request.customerEmail}
        subject={`Re: ${request.occasion} — Ms Weaver Atelier`}
      />
    </div>
  );
}
