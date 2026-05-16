import { siteConfig } from "@/lib/mock/site";
import { isExternalHref, isSafeHref } from "@/lib/links";
import { AnnouncementBarDismiss } from "./AnnouncementBarDismiss";

/**
 * Top-of-page announcement strip.
 * Server component — reads from siteConfig.
 * Delegates client-side dismiss state to AnnouncementBarDismiss.
 */
export function AnnouncementBar() {
  const { announcementBar } = siteConfig;

  if (!announcementBar.enabled) return null;
  if (!isSafeHref(announcementBar.linkHref)) return null;

  if (announcementBar.dismissible) {
    return (
      <AnnouncementBarDismiss
        message={announcementBar.message}
        linkText={announcementBar.linkText}
        linkHref={announcementBar.linkHref}
        isExternal={isExternalHref(announcementBar.linkHref)}
      />
    );
  }

  const isExternal = isExternalHref(announcementBar.linkHref);

  return (
    <div className="flex h-10 items-center justify-center bg-foreground px-6 text-background">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.1em]">
        {announcementBar.message}
        {" · "}
        <a
          href={announcementBar.linkHref}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
        >
          {announcementBar.linkText}
        </a>
      </p>
    </div>
  );
}
