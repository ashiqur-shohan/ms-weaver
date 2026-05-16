"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Initialises Lenis smooth scrolling for the storefront.
 * Only runs in the browser; does nothing on the server.
 *
 * Respects prefers-reduced-motion: if the user has requested reduced motion,
 * Lenis is not initialised (native scroll takes over). A `change` listener
 * re-evaluates at runtime if the OS setting is toggled.
 *
 * Duration: 1.2s
 * Easing: quartic ease-out (t => 1 - (1-t)^4)
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    function initLenis() {
      if (lenisRef.current) return; // already running
      const lenis = new Lenis({
        gestureOrientation: "vertical",
        smoothWheel: true,
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    }

    function destroyLenis() {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    }

    function evaluate() {
      if (mq.matches) {
        // Reduced motion requested — destroy if running.
        destroyLenis();
      } else {
        initLenis();
      }
    }

    evaluate();

    mq.addEventListener("change", evaluate);

    return () => {
      mq.removeEventListener("change", evaluate);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
