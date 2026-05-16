"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { easings, durations } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import type { BrandStoryProps } from "@/lib/mock/home";

export function BrandStory({
  eyebrow,
  heading,
  body,
  cta,
  image,
}: BrandStoryProps) {
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

  const rightVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: durations.ambient, ease: easings.entrance },
    },
  };

  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <section
      aria-label="Brand story"
      className="bg-background py-24 md:py-32 lg:py-40"
    >
      <Container>
        <div className="grid grid-cols-12 items-start gap-8 md:gap-12">
          {/* Left: portrait image */}
          <div className="col-span-12 md:col-span-5">
            <motion.div
              className="relative aspect-[5/6] w-full overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={imageVariants}
              transition={{
                duration: shouldReduce ? 0 : 0.9,
                ease: easings.image,
              }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </motion.div>
          </div>

          {/* Right: editorial text */}
          <motion.div
            className="col-span-12 flex flex-col gap-8 md:col-span-7 md:pt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={rightVariants}
          >
            <motion.p
              className="font-serif text-[22px] font-light italic leading-[30px] text-muted-foreground"
              variants={childVariants}
            >
              &ldquo;a slow practice of inherited hands.&rdquo;
            </motion.p>

            <div className="flex flex-col gap-4">
              <motion.p
                className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
                variants={childVariants}
              >
                {eyebrow}
              </motion.p>
              <motion.h2
                className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground"
                variants={childVariants}
              >
                {heading}
              </motion.h2>
            </div>

            <div className="flex flex-col gap-4">
              {paragraphs.length > 0
                ? paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      className="text-[18px] leading-[28px] text-muted-foreground"
                      variants={childVariants}
                    >
                      {p}
                    </motion.p>
                  ))
                : (
                    <motion.p
                      className="text-[18px] leading-[28px] text-muted-foreground"
                      variants={childVariants}
                    >
                      {body}
                    </motion.p>
                  )}
            </div>

            <motion.div variants={childVariants}>
              <Link
                href={cta.href}
                className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground underline-offset-4 hover:underline"
              >
                Read Our Story
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
