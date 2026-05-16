"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { MagnifyingGlassPlus, ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProductImage } from "@/lib/mock/products";

interface ImageGalleryProps {
  images: ProductImage[];
}

/**
 * Product image gallery — client component.
 * Desktop: thumbnail strip on left + large primary image.
 * Mobile: horizontal snap carousel with dot indicators.
 *   - IntersectionObserver on each slide updates activeIndex as the user swipes
 *     so dots accurately reflect the current visible slide.
 * Clicking the main image or zoom icon opens a lightbox Dialog.
 * Arrow keys navigate within the lightbox.
 * Focus is restored to the triggering element when the lightbox closes.
 */
export function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  // Ref to restore focus when lightbox closes
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Refs for mobile carousel slides — used by IntersectionObserver
  const slideRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeImage = images[activeIndex] ?? images[0];

  // ── Mobile IntersectionObserver — sync dots with swipe position ───────────

  useEffect(() => {
    const slides = slideRefs.current;
    if (slides.length === 0) return;

    const observers: IntersectionObserver[] = [];

    slides.forEach((slide, idx) => {
      if (!slide) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // A slide is "active" when at least 60% of it is visible.
            if (entry.isIntersecting) {
              setActiveIndex(idx);
            }
          });
        },
        { threshold: 0.6 },
      );
      observer.observe(slide);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [images.length]);

  // ── Lightbox navigation ───────────────────────────────────────────────────

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, lightboxNext, lightboxPrev]);

  function openLightbox(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  function handleLightboxOpenChange(open: boolean) {
    setLightboxOpen(open);
    if (!open) {
      // Restore focus to the element that opened the lightbox
      triggerRef.current?.focus();
    }
  }

  const lightboxImage = images[lightboxIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <>
      {/* ── Desktop Gallery ─────────────────────────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-[80px_1fr] md:gap-4">
        {/* Thumbnail strip */}
        <div className="flex flex-col gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}: ${img.alt}`}
              className={`relative aspect-[4/5] w-full overflow-hidden border transition-colors duration-200 ${
                idx === activeIndex
                  ? "border-foreground"
                  : "border-transparent hover:border-border"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="relative">
          <button
            ref={(el) => {
              // Store main image button ref so focus can be restored on close
              if (el) triggerRef.current = el;
            }}
            onClick={(e) => openLightbox(activeIndex, e.currentTarget)}
            className="group relative block aspect-[4/5] w-full overflow-hidden bg-muted"
            aria-label={`Zoom: ${activeImage.alt}`}
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              priority
              sizes="(min-width: 1280px) 45vw, (min-width: 1024px) 55vw, 100vw"
              className={`object-cover ${shouldReduce ? "" : "transition-transform duration-700 ease-luxe group-hover:scale-[1.02]"}`}
            />
            {/* Zoom icon */}
            <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-background/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <MagnifyingGlassPlus
                size={20}
                weight="regular"
                className="text-foreground"
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Carousel ─────────────────────────────────────────────── */}
      <div className="md:hidden">
        <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              onClick={(e) => openLightbox(idx, e.currentTarget)}
              className="relative aspect-[4/5] w-[85vw] shrink-0 snap-start overflow-hidden bg-muted"
              aria-label={`Image ${idx + 1}: ${img.alt}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="85vw"
                priority={idx === 0}
                className="object-cover"
              />
            </button>
          ))}
        </div>
        {/* Dot indicators — reflect swipe position via IntersectionObserver */}
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-200 ${
                idx === activeIndex
                  ? "w-4 bg-foreground"
                  : "w-1 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      <Dialog open={lightboxOpen} onOpenChange={handleLightboxOpenChange}>
        <DialogContent
          className="max-w-[90vw] border-0 bg-transparent p-0 shadow-none sm:max-w-[80vw] md:max-w-[70vw]"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {lightboxImage?.alt ?? "Product image"}
          </DialogTitle>

          <div className="relative">
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              {lightboxImage && (
                <Image
                  src={lightboxImage.url}
                  alt={lightboxImage.alt}
                  fill
                  sizes="80vw"
                  className="object-contain"
                  priority
                />
              )}
            </div>

            {/* Close */}
            <button
              onClick={() => handleLightboxOpenChange(false)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-background/80 text-foreground transition-colors duration-200 hover:bg-background"
              aria-label="Close lightbox"
            >
              <X size={20} weight="regular" aria-hidden="true" />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={lightboxPrev}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-background/80 text-foreground transition-colors duration-200 hover:bg-background"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} weight="regular" aria-hidden="true" />
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={lightboxNext}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-background/80 text-foreground transition-colors duration-200 hover:bg-background"
                aria-label="Next image"
              >
                <ArrowRight size={20} weight="regular" aria-hidden="true" />
              </button>
            )}

            {/* Index indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 text-[12px] uppercase tracking-[0.05em] text-foreground">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
