import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Canonical page container. Apply to every full-width section to maintain
 * consistent gutters: px-6 (mobile) → px-12 (tablet) → px-20 (desktop).
 * Max-width: 1440px, centred.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
