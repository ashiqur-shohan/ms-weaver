import Link from "next/link";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemDef {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItemDef[];
}

/**
 * Breadcrumb component using shadcn/ui primitives.
 * Server component. The last item without an href renders as the current page.
 */
export function ProductBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <BreadcrumbRoot>
      <BreadcrumbList className="text-[12px] uppercase tracking-[0.05em]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbPage className="text-foreground">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href ?? "#"}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
