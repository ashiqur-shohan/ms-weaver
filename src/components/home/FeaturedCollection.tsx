"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { easings, durations } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/mock/products";
import type { FeaturedCollectionProps } from "@/lib/mock/home";

export function FeaturedCollection({
  eyebrow,
  heading,
  subhead,
  productIds,
  cta,
}: FeaturedCollectionProps) {
  const shouldReduce = useReducedMotion();

  const featuredProducts = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const infoVariants = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: durations.ambient, ease: easings.entrance },
    },
  };

  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.ambient, ease: easings.entrance },
    },
  };

  return (
    <section
      aria-label="Featured collection"
      className="bg-background py-24 md:py-32 lg:py-40"
    >
      <Container>
        <div className="grid grid-cols-12 items-start gap-6 md:gap-8">
          {/* Left: editorial copy */}
          <motion.div
            className="col-span-12 flex flex-col gap-6 md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={infoVariants}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
              {heading}
            </h2>
            <p className="text-[16px] leading-[26px] text-muted-foreground">
              {subhead}
            </p>
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground underline-offset-4 hover:underline"
            >
              {cta.label}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Right: product grid / carousel */}
          <div className="col-span-12 md:col-span-8">
            {/* Desktop: 3-col grid */}
            <motion.div
              className="hidden grid-cols-3 gap-4 md:grid md:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={gridVariants}
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard
                    product={product}
                    sizes="(max-width: 1280px) 25vw, 320px"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile: snap carousel */}
            <div className="-mx-6 flex gap-4 overflow-x-auto px-6 snap-x snap-mandatory md:hidden">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[72vw] shrink-0 snap-start"
                >
                  <ProductCard product={product} sizes="72vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

