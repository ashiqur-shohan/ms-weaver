"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { easings, durations } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import type { HeroSectionProps } from "@/lib/mock/home";

export function Hero({
  eyebrow,
  headline,
  subhead,
  cta,
  secondaryCta,
  desktopImage,
  mobileImage,
}: HeroSectionProps) {
  const shouldReduce = useReducedMotion();

  const imageVariants = {
    hidden: {
      clipPath: shouldReduce ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
      opacity: shouldReduce ? 1 : 0,
    },
    visible: {
      clipPath: "inset(0 0 0 0)",
      opacity: 1,
    },
  };

  const textVariants = (delay: number) => ({
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: durations.ambient, ease: easings.entrance },
    },
  });

  const eyebrowVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: durations.ambient, ease: easings.entrance },
    },
  };

  const scrollVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1.2, duration: durations.ambient } },
  };

  return (
    <section
      aria-label="Ms Weaver hero"
      className="relative min-h-[90vh] overflow-hidden bg-background"
    >
      {/* Mobile image — stacks above text on small screens, hidden on md+ */}
      <div className="relative aspect-[4/5] w-full md:hidden">
        <Image
          src={mobileImage.url}
          alt={mobileImage.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Desktop layout: 12-col grid inside Container, image bleeds right */}
      <Container className="relative hidden md:block">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 relative min-h-[90vh] items-center">
          {/* Left text column */}
          <div className="col-start-1 col-span-5 z-10 relative py-24 lg:py-40">
            <motion.p
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
              initial="hidden"
              animate="visible"
              variants={eyebrowVariants}
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              className="mt-4 font-serif text-[56px] font-light leading-[62px] tracking-[-0.03em] text-foreground lg:text-[72px] lg:leading-[76px]"
              initial="hidden"
              animate="visible"
              variants={textVariants(0.55)}
            >
              {headline}
            </motion.h1>

            <motion.p
              className="mt-4 text-[16px] leading-[26px] text-muted-foreground"
              initial="hidden"
              animate="visible"
              variants={textVariants(0.7)}
            >
              {subhead}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={textVariants(0.85)}
            >
              <Link
                href={cta.href}
                className="inline-flex h-12 items-center rounded-none bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                {cta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex h-12 items-center rounded-sm border border-foreground bg-transparent px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground transition-colors duration-200 hover:bg-foreground/5"
              >
                {secondaryCta.label}
              </Link>
            </motion.div>
          </div>

          {/* Right image column — bleeds to viewport right edge */}
          <div className="col-span-7 col-start-6 relative h-full -mr-6 md:-mr-12 lg:-mr-20">
            <motion.div
              className="absolute inset-0"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              transition={{
                duration: shouldReduce ? 0 : 0.9,
                ease: easings.image,
              }}
            >
              <Image
                src={desktopImage.url}
                alt={desktopImage.alt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 0px, 58vw"
              />
              {/* Decorative gradient — protects text legibility where image overlaps */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background/50 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Mobile text block — below the mobile image */}
      <div className="relative z-10 px-6 py-12 md:hidden">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-[40px] font-light leading-[48px] tracking-[-0.03em] text-foreground">
          {headline}
        </h1>
        <p className="mt-4 text-[16px] leading-[26px] text-muted-foreground">
          {subhead}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={cta.href}
            className="inline-flex h-12 items-center rounded-none bg-primary px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            {cta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex h-12 items-center rounded-sm border border-foreground bg-transparent px-8 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground transition-colors duration-200 hover:bg-foreground/5"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Scroll indicator — desktop only (B2) */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial="hidden"
        animate="visible"
        variants={scrollVariants}
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-8 w-px bg-foreground/40" />
          <ArrowDown
            size={16}
            weight="regular"
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </motion.div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
