"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { LookbookRow as LookbookRowData } from "@/lib/mock/lookbook";

interface LookbookRowProps {
  row: LookbookRowData;
}

interface HoverableImageProps {
  url: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  productId?: string;
  sizes?: string;
}

function HoverableImage({
  url,
  alt,
  width,
  height,
  className,
  productId,
  sizes = "100vw",
}: HoverableImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        sizes={sizes}
      />
      {/* Shoppable product overlay on hover */}
      {productId && hovered && (
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href={`/shop/${productId}`}
            className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-200 hover:bg-card"
          >
            View piece
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function LookbookRow({ row }: LookbookRowProps) {
  const firstProductId = row.productIds?.[0];

  if (row.type === "full") {
    const img = row.images[0];
    if (!img) return null;
    return (
      <div className="group w-full">
        <HoverableImage
          url={img.url}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="aspect-[21/9] w-full"
          productId={firstProductId}
          sizes="100vw"
        />
        {row.caption && (
          <p className="mt-3 text-[13px] italic text-muted-foreground">
            {row.caption}
          </p>
        )}
      </div>
    );
  }

  if (row.type === "pair") {
    const [img1, img2] = row.images;
    return (
      <div className="group grid grid-cols-12 gap-4">
        {img1 && (
          <HoverableImage
            url={img1.url}
            alt={img1.alt}
            width={img1.width}
            height={img1.height}
            className="col-span-12 aspect-square md:col-span-6"
            productId={firstProductId}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {img2 && (
          <HoverableImage
            url={img2.url}
            alt={img2.alt}
            width={img2.width}
            height={img2.height}
            className="col-span-12 aspect-[4/5] md:col-span-6"
            productId={row.productIds?.[1] ?? firstProductId}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {row.caption && (
          <p className="col-span-12 mt-1 text-[13px] italic text-muted-foreground">
            {row.caption}
          </p>
        )}
      </div>
    );
  }

  // triple
  return (
    <div className="group grid grid-cols-12 gap-4">
      {row.images.map((img, i) => (
        <HoverableImage
          key={i}
          url={img.url}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="col-span-12 aspect-[4/5] md:col-span-4"
          productId={row.productIds?.[i] ?? firstProductId}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ))}
      {row.caption && (
        <p className="col-span-12 mt-1 text-[13px] italic text-muted-foreground">
          {row.caption}
        </p>
      )}
    </div>
  );
}
