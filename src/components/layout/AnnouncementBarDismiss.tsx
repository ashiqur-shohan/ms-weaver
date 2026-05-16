"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "msweaver:announcement:dismissed";

interface AnnouncementBarDismissProps {
  message: string;
  linkText: string;
  linkHref: string;
  isExternal?: boolean;
}

/**
 * Dismissible announcement bar.
 *
 * CLS strategy: the bar is visible on the initial SSR pass. The root layout
 * injects a tiny blocking <script> that adds `html.announcement-dismissed`
 * before first paint if localStorage says so. The CSS rule:
 *
 *   html.announcement-dismissed [data-announcement-bar] { display: none; }
 *
 * hides the bar instantly without a React state update, eliminating CLS.
 * The `isDismissed` state below then mirrors this for React-controlled hiding
 * after the user clicks dismiss during the same session.
 */
export function AnnouncementBarDismiss({
  message,
  linkText,
  linkHref,
  isExternal = false,
}: AnnouncementBarDismissProps) {
  // Start as false (visible) — the blocking script handles the pre-paint hide.
  // We only need React state for dismissals that happen during this session.
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Sync React state with what the blocking script already set on <html>.
    // Wrapped in try/catch for Safari Private Mode and storage quota errors.
    try {
      setIsDismissed(
        localStorage.getItem(STORAGE_KEY) === "1",
      );
    } catch {
      // If localStorage is unavailable, keep bar visible.
    }
  }, []);

  function handleDismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // If storage is unavailable, still dismiss visually for this session.
    }
    document.documentElement.classList.add("announcement-dismissed");
    setIsDismissed(true);
  }

  return (
    <div
      data-announcement-bar
      aria-hidden={isDismissed}
      className={cn(
        "relative flex h-10 items-center justify-center bg-foreground px-10 text-background",
        isDismissed && "hidden",
      )}
    >
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.1em]">
        {message}
        {" · "}
        {isExternal ? (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
          >
            {linkText}
          </a>
        ) : (
          <Link
            href={linkHref}
            className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
          >
            {linkText}
          </Link>
        )}
      </p>

      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 flex h-[44px] w-[44px] items-center justify-center text-background transition-opacity duration-200 hover:opacity-70"
      >
        <X size={16} weight="regular" aria-hidden="true" />
      </button>
    </div>
  );
}
