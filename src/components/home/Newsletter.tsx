"use client";

import { motion, useReducedMotion } from "motion/react";
import { easings, durations } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { NewsletterProps } from "@/lib/mock/home";

export function Newsletter({ eyebrow, heading, subhead, placeholder, buttonLabel, className }: NewsletterProps & { className?: string }) {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.ambient, ease: easings.entrance },
    },
  };

  return (
    <section
      aria-label="Newsletter signup"
      className={`bg-card py-24 md:py-32 lg:py-40${className ? ` ${className}` : ""}`}
    >
      <Container>
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.p
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
            variants={itemVariants}
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground"
            variants={itemVariants}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="max-w-[520px] text-[16px] leading-[26px] text-muted-foreground"
            variants={itemVariants}
          >
            {subhead}
          </motion.p>

          <motion.div
            className="mt-4 w-full max-w-[680px] text-left"
            variants={itemVariants}
          >
            <NewsletterForm
              placeholder={placeholder}
              buttonLabel={buttonLabel}
              className="w-full max-w-none"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
