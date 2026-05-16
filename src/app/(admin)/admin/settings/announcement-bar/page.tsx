"use client";

import { useState } from "react";
import { FloppyDisk } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminSiteSettings } from "@/lib/store/admin/siteSettings";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormField, AdminInput } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnnouncementBarPage() {
  const { config, updateAnnouncementBar } = useAdminSiteSettings();
  const bar = config.announcementBar;

  const [enabled, setEnabled] = useState(bar.enabled);
  const [message, setMessage] = useState(bar.message);
  const [linkText, setLinkText] = useState(bar.linkText);
  const [linkHref, setLinkHref] = useState(bar.linkHref);
  const [dismissible, setDismissible] = useState(bar.dismissible);

  const handleSave = () => {
    updateAnnouncementBar({ enabled, message, linkText, linkHref, dismissible });
    toast.success("Announcement bar updated");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="CONFIG" title="Announcement bar" />

      {/* Live preview */}
      {enabled && (
        <div className="rounded-sm overflow-hidden">
          <div className="flex items-center justify-center gap-2 bg-foreground px-4 py-2.5 text-primary-foreground">
            <span className="text-[12px] font-medium">{message}</span>
            {linkText && (
              <span className="text-[12px] underline underline-offset-2 opacity-80">{linkText}</span>
            )}
          </div>
          <div className="text-[11px] text-center text-muted-foreground py-1">
            Preview — as it will appear on the storefront
          </div>
        </div>
      )}

      {!enabled && (
        <div className="rounded-sm border border-dashed border-border py-4 text-center">
          <span className="text-[12px] text-muted-foreground">Announcement bar is currently hidden.</span>
        </div>
      )}

      {/* Settings */}
      <div className="rounded-sm border border-border bg-card p-6 flex flex-col gap-4 max-w-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-medium text-foreground">Enabled</div>
            <div className="text-[11px] text-muted-foreground">Show the announcement bar on all storefront pages</div>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>

        <FormField label="Message text">
          <AdminInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Free delivery on orders above ৳ 5,000..."
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Link text">
            <AdminInput
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="See details"
            />
          </FormField>
          <FormField label="Link URL">
            <AdminInput
              value={linkHref}
              onChange={(e) => setLinkHref(e.target.value)}
              placeholder="/help/shipping"
            />
          </FormField>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-medium text-foreground">Dismissible</div>
            <div className="text-[11px] text-muted-foreground">Allow customers to close the bar</div>
          </div>
          <Switch checked={dismissible} onCheckedChange={setDismissible} />
        </div>

        <Button
          size="sm"
          onClick={handleSave}
          className="self-start rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
        >
          <FloppyDisk size={14} className="mr-1.5" />
          Save
        </Button>
      </div>
    </div>
  );
}
