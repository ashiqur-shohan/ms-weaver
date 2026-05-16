"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { easings, durations } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { ProcessShowcaseProps } from "@/lib/mock/home";

export function ProcessShowcase({
  eyebrow,
  heading,
  steps,
}: ProcessShowcaseProps) {
  const shouldReduce = useReducedMotion();

  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.ambient, ease: easings.entrance },
    },
  };

  return (
    <section
      aria-label="Our process"
      className="bg-muted/30 py-24 md:py-32 lg:py-40"
    >
      <Container>
        {/* Section header — simple y-fade scroll reveal */}
        <ScrollReveal className="mb-12 md:mb-16" margin="-80px">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
            {heading}
          </h2>
        </ScrollReveal>

        {/* Steps grid — stagger container stays as motion.div */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={gridVariants}
        >
          {steps.map((step) => (
            <motion.article
              key={step.number}
              className="flex flex-col gap-4"
              variants={cardVariants}
            >
              {/* Oversized italic number */}
              <p
                className="font-serif text-[80px] font-light italic leading-none tracking-[-0.03em] text-border"
                aria-hidden="true"
              >
                {step.number}
              </p>

              {/* Title */}
              <h3 className="font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] leading-[22px] text-muted-foreground">
                {step.description}
              </p>

              {/* Square image at bottom */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src={step.image.url}
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
