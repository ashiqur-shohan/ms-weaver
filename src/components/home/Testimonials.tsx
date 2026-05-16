"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { testimonials } from "@/lib/mock/testimonials";
import type { TestimonialsProps } from "@/lib/mock/home";

const AUTO_ROTATE_MS = 8000;

export function Testimonials({ featuredOnly }: TestimonialsProps) {
  const shouldReduce = useReducedMotion();

  const featured = featuredOnly
    ? testimonials.filter((t) => t.featured)
    : testimonials;

  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (shouldReduce || featured.length <= 1) return;
    intervalRef.current = setInterval(advance, AUTO_ROTATE_MS);
  }, [advance, shouldReduce, featured.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  function handleDotClick(i: number) {
    setIndex(i);
    startTimer();
  }

  const current = featured[index];
  if (!current) return null;

  return (
    <section
      aria-label="Customer testimonials"
      className="bg-background py-24 md:py-32 lg:py-40"
    >
      <Container>
        <div className="flex flex-col items-center gap-10 text-center">
          {/* Eyebrow */}
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Words from the Atelier
          </p>

          {/* Rotating quote */}
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: shouldReduce ? 0 : 0.5,
                  ease: "easeInOut",
                }}
              >
                <p className="font-serif text-[22px] font-light italic leading-[30px] text-foreground md:text-[28px] md:leading-[38px]">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-[14px] leading-[22px] text-muted-foreground">
                    &mdash; {current.author}, {current.role}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div
            className="mt-2 flex items-center justify-center gap-3"
            aria-label="Testimonial navigation"
          >
            {featured.map((t, i) => (
              <button
                key={t.id}
                aria-label={`View testimonial ${i + 1}`}
                aria-current={i === index ? "true" : "false"}
                onClick={() => handleDotClick(i)}
                className="p-2"
              >
                <span
                  className={
                    i === index
                      ? "block h-3 w-3 rounded-full bg-foreground transition-colors duration-200"
                      : "block h-2 w-2 rounded-full bg-border transition-colors duration-200 hover:bg-muted-foreground"
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
