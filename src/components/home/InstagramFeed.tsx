"use client";

import Image from "next/image";
import { Heart, ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/layout/Container";
import type { InstagramFeedProps } from "@/lib/mock/home";

export function InstagramFeed({ eyebrow, heading, href, images }: InstagramFeedProps) {
  return (
    <section
      aria-label="Instagram feed"
      className="bg-background py-16 md:py-24 lg:py-32"
    >
      {/* Header row — inside container */}
      <Container>
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {eyebrow}
            </p>
            <p className="mt-1 font-serif text-[22px] font-light leading-[30px] text-foreground">
              {heading}
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.05em] text-foreground underline-offset-4 hover:underline"
          >
            Follow us on Instagram
            <ArrowRight size={16} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </Container>

      {/* Edge-to-edge image strip */}
      <div className="flex flex-wrap md:flex-nowrap gap-[1px] md:gap-0">
        {images.map((img, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative aspect-square basis-1/3 md:flex-1 md:basis-auto overflow-hidden${
              i >= 3 ? " hidden md:block" : ""
            }`}
            aria-label={`Instagram photo: ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 17vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <Heart
                size={24}
                weight="regular"
                className="text-foreground"
                aria-hidden="true"
              />
              <span className="text-[12px] font-medium text-foreground">
                {img.likeCount.toLocaleString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
