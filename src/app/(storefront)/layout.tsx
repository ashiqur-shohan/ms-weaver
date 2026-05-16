import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CartHydration } from "@/components/layout/CartHydration";
import { CartDrawer } from "@/components/cart/CartDrawer";

/**
 * Storefront layout shell.
 * Wraps every storefront page with:
 *   - Inline blocking script that reads localStorage before paint and adds
 *     html.announcement-dismissed if needed (prevents CLS flash on bar)
 *   - CartHydration (triggers Zustand rehydration after first paint)
 *   - AnnouncementBar (dismissible top strip)
 *   - Header (sticky, with scroll-triggered border)
 *   - SmoothScroll (Lenis, client-only)
 *   - Footer
 */
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*
       * Blocking inline script — runs before any paint so the browser knows
       * whether to hide the announcement bar, eliminating the CLS flash.
       * Wrapped in try/catch for Safari Private Mode and storage quota errors.
       */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem('msweaver:announcement:dismissed')==='1'){document.documentElement.classList.add('announcement-dismissed');}}catch(e){}`,
        }}
      />
      <CartHydration />
      <CartDrawer />
      <SmoothScroll>
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
