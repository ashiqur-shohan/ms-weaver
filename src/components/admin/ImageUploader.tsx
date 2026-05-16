"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { UploadSimple, X, Image } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UploadedImage {
  file: File;
  previewUrl: string;
  altText: string;
}

interface ImageUploaderProps {
  multiple?: boolean;
  value?: UploadedImage[];
  onChange?: (images: UploadedImage[]) => void;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ImageUploader({
  multiple = false,
  value = [],
  onChange,
  className,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>(value);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newImages: UploadedImage[] = [];
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        console.log("[ImageUploader] File selected:", file.name);
        const previewUrl = URL.createObjectURL(file);
        newImages.push({ file, previewUrl, altText: "" });
      });
      const next = multiple ? [...images, ...newImages] : newImages;
      setImages(next);
      onChange?.(next);
    },
    [images, multiple, onChange],
  );

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index]?.previewUrl ?? "");
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    onChange?.(next);
  };

  const updateAlt = (index: number, altText: string) => {
    const next = images.map((img, i) =>
      i === index ? { ...img, altText } : img,
    );
    setImages(next);
    onChange?.(next);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Drop zone */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border",
          "py-8 px-4 text-center cursor-pointer transition-colors duration-150",
          isDragging && "border-primary bg-primary/5",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <UploadSimple size={24} className="text-muted-foreground" />
        <div>
          <p className="text-[13px] text-foreground font-medium">
            Drop images here or click to browse
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            PNG, JPG, WebP accepted
            {multiple ? " — multiple files supported" : ""}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.previewUrl}
                  alt={img.altText || `Upload preview ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/70 text-primary-foreground hover:bg-foreground"
                  aria-label={`Remove image ${i + 1}`}
                >
                  <X size={10} />
                </button>
              </div>
              <input
                type="text"
                value={img.altText}
                onChange={(e) => updateAlt(i, e.target.value)}
                placeholder="Alt text..."
                className="w-full border-b border-border bg-transparent text-[11px] focus:outline-none focus:border-foreground transition-colors px-0"
              />
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <Image size={14} />
          <span>No images uploaded</span>
        </div>
      )}
    </div>
  );
}
