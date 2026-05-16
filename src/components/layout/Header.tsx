import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/mock/site";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { CartButton } from "./CartButton";
import { AccountButton } from "./AccountButton";
import { HeaderScrollWrapper } from "./HeaderScrollWrapper";
import { Container } from "./Container";

/**
 * Site-wide sticky header.
 * - Left: hamburger (mobile) / empty (desktop)
 * - Centre: MS WEAVER wordmark
 * - Right: primary nav (desktop) + search/account/cart icons
 *
 * Scroll behaviour is handled by HeaderScrollWrapper (client component).
 */
export function Header() {
  const { primary } = siteConfig.nav;

  return (
    <HeaderScrollWrapper>
      <Container className="flex h-full items-center justify-between gap-4">
        {/* Left — hamburger on mobile, spacer on desktop */}
        <div className="flex w-[44px] items-center md:w-auto">
          <MobileNav />
          {/* Desktop spacer so logo stays centred */}
          <span className="hidden md:block md:w-[44px]" aria-hidden="true" />
        </div>

        {/* Centre — wordmark.
            pointer-events-none on the wrapper prevents the absolutely-positioned
            container from capturing clicks on the hamburger that overlap it on mobile.
            pointer-events-auto on the inner Link re-enables the logo tap target. */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 md:pointer-events-auto md:relative md:left-auto md:translate-x-0">
          <Logo className="pointer-events-auto" />
        </div>

        {/* Right — desktop nav + icon cluster */}
        <div className="flex items-center gap-1">
          {/* Primary nav — desktop only */}
          <nav aria-label="Primary navigation" className="hidden md:flex md:items-center md:gap-8 md:pr-6">
            {primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icon cluster */}
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-[44px] w-[44px] items-center justify-center text-foreground transition-opacity duration-200 hover:opacity-60"
          >
            <MagnifyingGlass size={24} weight="regular" aria-hidden="true" />
          </Link>

          <AccountButton />

          <CartButton />
        </div>
      </Container>
    </HeaderScrollWrapper>
  );
}
