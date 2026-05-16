"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderScrollWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps the header element and applies a border-b + solid ivory bg
 * once the user has scrolled past 80px.
 */
export function HeaderScrollWrapper({
  children,
  className,
}: HeaderScrollWrapperProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    // Run once on mount to capture initial state
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-20 w-full bg-background transition-[border-color,box-shadow] duration-200",
        scrolled
          ? "border-b border-border shadow-none"
          : "border-b border-transparent",
        className,
      )}
    >
      {children}
    </header>
  );
}
