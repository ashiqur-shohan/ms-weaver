"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { easings, durations } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  ease?: readonly [number, number, number, number];
  className?: string;
  once?: boolean;
  margin?: string;
};

export function ScrollReveal({
  children,
  y = 24,
  delay = 0,
  duration = durations.ambient,
  ease = easings.entrance,
  className,
  once = true,
  margin = "-15%",
}: Props) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      transition={{ duration, delay, ease: [...ease] }}
    >
      {children}
    </motion.div>
  );
}
