"use client";

import { useState } from "react";
import { FloppyDisk } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAdminSiteSettings } from "@/lib/store/admin/siteSettings";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormField, AdminInput, AdminTextarea } from "@/components/admin/AdminFormPrimitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Tab ─────────────────────────────────────────────────────────────────────

type Tab = "branding" | "contact" | "social" | "navigation";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SiteSettingsPage() {
  const { config, updateContact, updateSocials, updateFooter } = useAdminSiteSettings();
  const [tab, setTab] = useState<Tab>("branding");

  // Contact state
  const [email, setEmail] = useState(config.contact.email);
  const [phone, setPhone] = useState(config.contact.phone);
  const [address, setAddress] = useState(config.contact.address);
  const [hours, setHours] = useState(config.contact.hours);

  // Social state
  const [instagram, setInstagram] = useState(config.socials.instagram);
  const [facebook, setFacebook] = useState(config.socials.facebook);
  const [pinterest, setPinterest] = useState(config.socials.pinterest);
  const [whatsapp, setWhatsapp] = useState(config.socials.whatsapp);
  const [copyright, setCopyright] = useState(config.footer.copyrightTemplate);

  const handleSaveContact = () => {
    updateContact({ email, phone, address, hours });
    toast.success("Contact details saved");
  };

  const handleSaveSocial = () => {
    updateSocials({ instagram, facebook, pinterest, whatsapp });
    updateFooter({ copyrightTemplate: copyright });
    toast.success("Social & footer settings saved");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "branding", label: "Branding" },
    { id: "contact", label: "Contact" },
    { id: "social", label: "Social & Footer" },
    { id: "navigation", label: "Navigation" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="CONFIG" title="Site settings" />

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2 text-[13px] font-medium transition-colors border-b-2 -mb-px",
              tab === t.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Branding tab */}
      {tab === "branding" && (
        <div className="rounded-sm border border-border bg-card p-6 flex flex-col gap-6 max-w-xl">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">
              Brand identity
            </div>
            <div className="flex flex-col gap-3">
              <FormField label="Site name">
                <AdminInput value={config.name} readOnly className="text-muted-foreground" />
              </FormField>
              <FormField label="Tagline">
                <AdminInput value={config.tagline} readOnly className="text-muted-foreground" />
              </FormField>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">
              Colour tokens (read-only in Phase 1)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: "Background", value: "#F7F3EC" },
                { name: "Foreground", value: "#1F1B16" },
                { name: "Primary", value: "#B5613D" },
                { name: "Secondary", value: "#9C8B73" },
                { name: "Accent", value: "#8A9279" },
                { name: "Muted", value: "#EDE5D6" },
              ].map((c) => (
                <div key={c.name} className="flex flex-col gap-1">
                  <div
                    className="h-8 w-full rounded-sm border border-border"
                    style={{ backgroundColor: c.value }}
                  />
                  <div className="text-[10px] text-muted-foreground">{c.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground/70">{c.value}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground/70 mt-3">
              Colour overrides will be configurable in Phase 2 via design token management.
            </p>
          </div>
        </div>
      )}

      {/* Contact tab */}
      {tab === "contact" && (
        <div className="rounded-sm border border-border bg-card p-6 flex flex-col gap-4 max-w-xl">
          <FormField label="Email address" required>
            <AdminInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
          <FormField label="Phone number">
            <AdminInput value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormField>
          <FormField label="Physical address">
            <AdminTextarea value={address} onChange={(e) => setAddress(e.target.value)} className="min-h-[64px]" />
          </FormField>
          <FormField label="Business hours">
            <AdminInput value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Saturday – Thursday, 10 am – 6 pm BST" />
          </FormField>
          <Button
            size="sm"
            onClick={handleSaveContact}
            className="self-start rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <FloppyDisk size={14} className="mr-1.5" />
            Save contact
          </Button>
        </div>
      )}

      {/* Social & Footer tab */}
      {tab === "social" && (
        <div className="rounded-sm border border-border bg-card p-6 flex flex-col gap-4 max-w-xl">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">Social links</div>
            <div className="flex flex-col gap-3">
              <FormField label="Instagram URL">
                <AdminInput value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </FormField>
              <FormField label="Facebook URL">
                <AdminInput value={facebook} onChange={(e) => setFacebook(e.target.value)} />
              </FormField>
              <FormField label="Pinterest URL">
                <AdminInput value={pinterest} onChange={(e) => setPinterest(e.target.value)} />
              </FormField>
              <FormField label="WhatsApp URL">
                <AdminInput value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </FormField>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">Footer</div>
            <FormField label="Copyright template" hint='Use "{year}" as the year placeholder'>
              <AdminInput value={copyright} onChange={(e) => setCopyright(e.target.value)} />
            </FormField>
          </div>
          <Button
            size="sm"
            onClick={handleSaveSocial}
            className="self-start rounded-sm bg-primary text-primary-foreground text-[12px] uppercase tracking-[0.05em] h-8 hover:bg-primary/90"
          >
            <FloppyDisk size={14} className="mr-1.5" />
            Save
          </Button>
        </div>
      )}

      {/* Navigation tab */}
      {tab === "navigation" && (
        <div className="rounded-sm border border-border bg-card p-6 max-w-xl">
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">Primary navigation</div>
          <div className="flex flex-col gap-2">
            {config.nav.primary.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/60 last:border-0">
                <span className="text-[13px] font-medium text-foreground flex-1">{item.label}</span>
                <span className="text-[12px] font-mono text-muted-foreground">{item.href}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground/70 mt-4">
            Full nav editor (drag-to-reorder, mega-menu configuration) coming in Phase 2.
          </p>
        </div>
      )}
    </div>
  );
}
