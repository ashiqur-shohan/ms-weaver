"use client";

import { useState } from "react";
import { FloppyDisk } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminSeo } from "@/lib/store/admin/seo";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RedirectTable } from "@/components/admin/RedirectTable";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SeoSettingsPage() {
  const { config, updateConfig, addRedirect, updateRedirect, deleteRedirect } = useAdminSeo();

  const [titleTemplate, setTitleTemplate] = useState(config.defaultTitleTemplate);
  const [description, setDescription] = useState(config.defaultDescription);
  const [ogImage, setOgImage] = useState(config.defaultOgImage);
  const [robotsEnabled, setRobotsEnabled] = useState(config.robotsEnabled);
  const [sitemapEnabled, setSitemapEnabled] = useState(config.sitemapEnabled);
  const [canonicalDomain, setCanonicalDomain] = useState(config.canonicalDomain);

  const handleSave = () => {
    updateConfig({
      defaultTitleTemplate: titleTemplate,
      defaultDescription: description,
      defaultOgImage: ogImage,
      robotsEnabled,
      sitemapEnabled,
      canonicalDomain,
    });
    toast.success("SEO settings saved");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="CONFIG"
        title="SEO"
        actions={
          <Button
            size="sm"
            onClick={handleSave}
            className="gap-1.5 rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <FloppyDisk size={14} />
            Save settings
          </Button>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Main settings */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          <div className="rounded-sm border border-border bg-card p-5 flex flex-col gap-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Defaults</div>

            <FormField label="Title template" hint='Use "%s" where the page title should appear'>
              <AdminInput
                value={titleTemplate}
                onChange={(e) => setTitleTemplate(e.target.value)}
                placeholder='%s · Ms Weaver'
                className="font-mono text-[13px]"
              />
            </FormField>

            <FormField label="Default meta description">
              <AdminTextarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Site-wide fallback description..."
                className="min-h-[80px]"
              />
            </FormField>

            <FormField label="Default OG image">
              <MediaPicker value={ogImage} onChange={setOgImage} />
            </FormField>

            <FormField label="Canonical domain" hint="Without trailing slash — e.g. https://msweaver.com">
              <AdminInput
                value={canonicalDomain}
                onChange={(e) => setCanonicalDomain(e.target.value)}
                placeholder="https://msweaver.com"
                className="font-mono text-[13px]"
              />
            </FormField>
          </div>

          {/* Redirects */}
          <div className="rounded-sm border border-border bg-card p-5 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Redirects</div>
            <RedirectTable
              redirects={config.redirects}
              onAdd={addRedirect}
              onDelete={deleteRedirect}
              onUpdate={updateRedirect}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-sm border border-border bg-card p-5 flex flex-col gap-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Indexing</div>

            <div className="flex items-center justify-between py-1 border-b border-border/60">
              <div>
                <div className="text-[13px] font-medium text-foreground">Robots indexing</div>
                <div className="text-[11px] text-muted-foreground">Allow search engines to index the site</div>
              </div>
              <Switch checked={robotsEnabled} onCheckedChange={setRobotsEnabled} />
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <div className="text-[13px] font-medium text-foreground">XML sitemap</div>
                <div className="text-[11px] text-muted-foreground">Generate sitemap.xml for crawlers</div>
              </div>
              <Switch checked={sitemapEnabled} onCheckedChange={setSitemapEnabled} />
            </div>

            {!robotsEnabled && (
              <div className="rounded-sm bg-amber-50 border border-amber-200 px-3 py-2 text-[12px] text-amber-700">
                Search engine indexing is disabled. The site will not appear in search results.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
