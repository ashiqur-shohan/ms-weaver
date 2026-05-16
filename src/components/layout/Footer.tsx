import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
  PinterestLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/mock/site";
import { isExternalHref, isSafeHref } from "@/lib/links";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const socialIcons = {
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  pinterest: PinterestLogo,
  whatsapp: WhatsappLogo,
} as const;

const socialLabels: Record<keyof typeof socialIcons, string> = {
  instagram: "Visit Ms Weaver on Instagram",
  facebook: "Visit Ms Weaver on Facebook",
  pinterest: "Visit Ms Weaver on Pinterest",
  whatsapp: "Contact Ms Weaver on WhatsApp",
};

/**
 * Site-wide footer.
 * Server component — all data from siteConfig.
 * Newsletter form is a client subcomponent.
 */
export function Footer() {
  const { footer, socials, description } = siteConfig;

  // Server Components evaluate per request — new Date() is always fresh.
  const copyright = footer.copyrightTemplate.replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <footer className="border-t border-border bg-card" aria-label="Site footer">
      <Container className="py-20">
        {/* ── Top grid: nav columns ────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground">
                {column.title}
              </h3>
              <ul role="list" className="flex flex-col gap-3">
                {column.links.map((link) => {
                  if (!isSafeHref(link.href)) return null;
                  const isExternal = isExternalHref(link.href);
                  return (
                    <li key={link.href}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Middle row: brand description + newsletter ────────────────── */}
        <div className="mt-16 flex flex-col gap-10 border-t border-border pt-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="full" className="mb-4 items-start" />
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground">
              The Atelier Letter
            </h3>
            <p className="mb-4 max-w-xs text-[13px] text-muted-foreground">
              Occasional notes on new pieces, seasonal dyeing, and the atelier.
              Never promotional.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* ── Bottom row: copyright + social icons ─────────────────────── */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
            <p className="text-[12px] text-muted-foreground">{copyright}</p>
            <p className="text-[12px] text-muted-foreground">
              {footer.shippingNote}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {(
              Object.entries(socials) as Array<
                [keyof typeof socialIcons, string]
              >
            ).map(([platform, href]) => {
              const Icon = socialIcons[platform];
              return (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLabels[platform]}
                  className="flex h-[44px] w-[44px] items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <Icon size={20} weight="regular" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
