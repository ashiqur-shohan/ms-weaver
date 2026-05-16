"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { easings, durations } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { journalPosts, type JournalPost } from "@/lib/mock/journal";
import type { JournalPreviewProps } from "@/lib/mock/home";

/** Reusable "view all" link used in both header and mobile footer */
function ViewAllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground underline-offset-4 hover:underline"
    >
      {label}
      <ArrowRight size={16} weight="regular" aria-hidden="true" />
    </Link>
  );
}

export function JournalPreview({ eyebrow, heading, postIds, cta }: JournalPreviewProps) {
  const shouldReduce = useReducedMotion();

  const posts = postIds
    .map((id) => journalPosts.find((p) => p.id === id))
    .filter((p): p is JournalPost => Boolean(p));

  const imageVariants: Variants = {
    hidden: {
      clipPath: shouldReduce ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
      opacity: shouldReduce ? 1 : 0,
    },
    visible: {
      clipPath: "inset(0 0 0 0)",
      opacity: 1,
    },
  };

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.08 },
    },
  };

  const cardTextVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.ambient, ease: easings.entrance },
    },
  };

  return (
    <section
      aria-label="Journal preview"
      className="bg-background py-24 md:py-32 lg:py-40"
    >
      <Container>
        {/* Header row */}
        <div className="mb-10 flex items-end justify-between md:mb-12">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
              {heading}
            </h2>
          </div>
          <div className="hidden md:block">
            <ViewAllLink href={cta.href} label="View All Journal" />
          </div>
        </div>

        {/* Desktop: 3-col grid */}
        <motion.div
          className="hidden grid-cols-3 gap-6 md:grid md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={gridVariants}
        >
          {posts.map((post) => (
            <JournalCard
              key={post.id}
              post={post}
              imageVariants={imageVariants}
              textVariants={cardTextVariants}
              shouldReduce={shouldReduce ?? false}
            />
          ))}
        </motion.div>

        {/* Mobile: snap carousel */}
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 snap-x snap-mandatory md:hidden">
          {posts.map((post) => (
            <div key={post.id} className="w-[85vw] shrink-0 snap-start">
              <JournalCard
                post={post}
                imageVariants={imageVariants}
                textVariants={cardTextVariants}
                shouldReduce={shouldReduce ?? false}
              />
            </div>
          ))}
        </div>

        {/* Mobile "view all" link */}
        <div className="mt-8 flex justify-center md:hidden">
          <ViewAllLink href={cta.href} label="View All Journal" />
        </div>
      </Container>
    </section>
  );
}

interface JournalCardProps {
  post: JournalPost;
  imageVariants: Variants;
  textVariants: Variants;
  shouldReduce: boolean;
}

function JournalCard({ post, imageVariants, textVariants, shouldReduce }: JournalCardProps) {
  const primaryTag = post.tags[0] ?? "Journal";

  return (
    <Link href={`/journal/${post.slug}`} className="group flex flex-col gap-3">
      {/* Cover image with clip-path reveal */}
      <motion.div
        className="relative aspect-[3/2] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={imageVariants}
        transition={{
          duration: shouldReduce ? 0 : durations.ambient,
          ease: easings.image,
        }}
      >
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          fill
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 85vw, (max-width: 1280px) 33vw, 400px"
        />
      </motion.div>

      {/* Card text */}
      <motion.div
        className="flex flex-col gap-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={textVariants}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {primaryTag.toUpperCase()} &middot; {post.readingTimeMin} MIN READ
        </p>

        <h3 className="font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground underline-offset-4 group-hover:underline">
          {post.title}
        </h3>

        <p className="line-clamp-2 text-[14px] leading-[22px] text-muted-foreground">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground">
          Read
          <ArrowRight size={16} weight="regular" aria-hidden="true" />
        </span>
      </motion.div>
    </Link>
  );
}
