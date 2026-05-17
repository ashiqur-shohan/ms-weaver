"use client";

import { useState } from "react";
import { FloppyDisk, ChartLine } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminAnalytics } from "@/lib/store/admin/analytics";
import { PageHeader } from "@/components/admin/PageHeader";
import { MetricCard } from "@/components/admin/MetricCard";
import { FormField, AdminInput } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// ─── Mock chart placeholder ───────────────────────────────────────────────────

function ChartPlaceholder() {
  return (
    <div className="rounded-sm border border-border bg-card p-6 flex flex-col items-center justify-center gap-3 min-h-[200px]">
      <ChartLine size={32} className="text-muted-foreground/30" />
      <div className="text-center">
        <div className="text-[13px] font-medium text-muted-foreground">Analytics chart</div>
        <div className="text-[12px] text-muted-foreground/60 mt-1">
          Connect Google Analytics in Phase 2 to see sessions, revenue, and conversion data here.
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { config, updateConfig } = useAdminAnalytics();

  const [gaId, setGaId] = useState(config.ga4MeasurementId);
  const [enabled, setEnabled] = useState(config.enabled);
  const [anonymizeIp, setAnonymizeIp] = useState(config.anonymizeIp);
  const [cookieConsent, setCookieConsent] = useState(config.cookieConsentRequired);

  const handleSave = () => {
    updateConfig({ ga4MeasurementId: gaId, enabled, anonymizeIp, cookieConsentRequired: cookieConsent });
    toast.success("Analytics settings saved");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="CONFIG" title="Analytics" />

      {/* Mock metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Sessions today" value="142" delta="+12%" trend="up" />
        <MetricCard label="Revenue this week" value="৳ 48,200" delta="+8%" trend="up" />
        <MetricCard label="Conversion rate" value="3.2%" delta="-0.4%" trend="down" />
        <MetricCard label="Top product" value="Ivory Throw" delta="18 orders" trend="flat" />
      </div>

      {/* Chart placeholder */}
      <ChartPlaceholder />

      {/* GA settings */}
      <div className="rounded-sm border border-border bg-card p-5 flex flex-col gap-4 max-w-xl">
        <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Google Analytics 4
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-medium text-foreground">Enable analytics</div>
            <div className="text-[11px] text-muted-foreground">Send events to GA4 (Phase 2)</div>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>

        <FormField label="GA4 Measurement ID" hint="Found in Google Analytics > Admin > Data Streams">
          <AdminInput
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="font-mono text-[13px]"
            disabled={!enabled}
          />
        </FormField>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-medium text-foreground">Anonymize IP</div>
            <div className="text-[11px] text-muted-foreground">Mask the last octet of IP addresses</div>
          </div>
          <Switch checked={anonymizeIp} onCheckedChange={setAnonymizeIp} disabled={!enabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-medium text-foreground">Require cookie consent</div>
            <div className="text-[11px] text-muted-foreground">Show consent banner before tracking</div>
          </div>
          <Switch checked={cookieConsent} onCheckedChange={setCookieConsent} disabled={!enabled} />
        </div>

        {cookieConsent && enabled && (
          <div className="rounded-sm border border-border bg-muted/40 px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground mb-1">Cookie banner preview</div>
            <div className="flex items-center justify-between gap-3 rounded-sm border border-border bg-card px-3 py-2">
              <p className="text-[12px] text-foreground">
                We use analytics to improve your experience. Accept?
              </p>
              <div className="flex gap-2">
                <span className="text-[11px] font-medium text-muted-foreground cursor-pointer">Decline</span>
                <span className="text-[11px] font-medium text-primary cursor-pointer">Accept</span>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-sm border border-border bg-muted/30 px-3 py-2 text-[12px] text-muted-foreground">
          Analytics integration (real GA4 tag injection) will be implemented in Phase 2.
        </div>

        <Button
          size="sm"
          onClick={handleSave}
          className="self-start rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
        >
          <FloppyDisk size={14} className="mr-1.5" />
          Save settings
        </Button>
      </div>
    </div>
  );
}
