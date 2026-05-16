import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-2">
          Coming in Part 2
        </div>
        <h1 className="font-serif text-[36px] font-light tracking-[-0.02em] text-foreground">
          Not yet built
        </h1>
        <p className="mt-3 text-[14px] text-muted-foreground max-w-sm">
          This section of the admin panel is scheduled for Part 2, which will
          cover Pages CMS, Home Builder, Journal, Testimonials, Lookbook, Media
          Library, and all Settings screens.
        </p>
      </div>
      <Link href="/admin">
        <Button
          variant="outline"
          className="rounded-sm border-border text-[12px] uppercase tracking-[0.05em] h-9"
        >
          Back to dashboard
        </Button>
      </Link>
    </div>
  );
}
