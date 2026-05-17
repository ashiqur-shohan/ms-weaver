# Ms Weaver

> *Handwoven Elegance* — a luxury custom hand-knitted crochet e-commerce site for **Ashfia Khatun**. Primary market: **Bangladesh (BDT)**.

A storefront + admin panel built with Next.js 15, Tailwind v4, and shadcn/ui. The brand register is quiet, considered, tactile — closer to Hermès and Toteme than to a typical online shop.

---

## Status

**Phase 1 — UI with mock data only.** No database, real auth, or payment integration yet. Every screen is wired against typed mock JSON shaped like the eventual Drizzle schema, so Phase 2 swaps data sources without rewriting components.

What's shipping today:
- **29 storefront routes** — home, shop, product detail, collections, cart, 4-step BD-localized checkout, account (orders, wishlist, addresses, profile), auth shells, about, journal, lookbook, care guide, contact, FAQ, custom order, legal pages
- **28 admin routes** — dashboard, products CRUD, collections, orders, customers, custom-request inbox, home builder, pages CMS with block editor, journal posts with Tiptap, testimonials, lookbook, media library, and 9 settings screens (site, announcement bar, SEO, emails, discounts, shipping, tax, staff, analytics)
- **Full visual design system** with WCAG 2.2 AA contrast, `prefers-reduced-motion` honored throughout

---

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The first time you visit each route in dev mode, Next.js compiles it on demand (5–15s). Subsequent visits are cached. For accurate speed testing run `pnpm build && pnpm start` — every storefront route prerenders.

### Admin panel

Visit [http://localhost:3000/admin](http://localhost:3000/admin).

Phase 1 demo password: `msweaver-admin` (hardcoded — replaced with Better Auth + RBAC in Phase 2).

### Customer account demo

Visit [/auth/sign-in](http://localhost:3000/auth/sign-in). Any email + password will sign you in as the mock customer (Rahela Chowdhury) so you can explore `/account`, `/account/orders`, and `/account/wishlist`.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Components | shadcn/ui (radix-nova preset, stone base, fully themed) |
| Animations | Motion (Framer Motion v11) + Lenis smooth-scroll |
| Icons | Phosphor Icons (regular weight) |
| Forms | React Hook Form + Zod |
| State | Zustand (with `persist` middleware, `skipHydration: true`) |
| Editor | Tiptap (admin journal) |
| Drag & drop | dnd-kit (block editor, home builder, image gallery) |
| Fonts | Fraunces (serif display) + Inter (body) via `next/font/google` |
| Package manager | pnpm |

Deferred to Phase 2: PostgreSQL on Neon, Drizzle ORM, Better Auth, SSLCommerz + bKash payment adapters, Resend, Cloudinary, Upstash Redis, Sentry.

---

## Scripts

```bash
pnpm dev          # dev server (port 3000)
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write
```

---

## Project structure

```
src/
├── app/
│   ├── (storefront)/       # public routes (Header, Footer, Lenis)
│   ├── (admin)/admin/      # admin shell (separate layout, no Lenis)
│   ├── (checkout)/checkout/  # monastic checkout layout
│   ├── (auth)/auth/        # sign-in/register/forgot
│   ├── layout.tsx          # root layout (fonts, metadata)
│   └── globals.css         # Tailwind v4 @theme tokens
├── components/
│   ├── ui/                 # shadcn primitives (do not hand-edit)
│   ├── layout/             # Header, Footer, AnnouncementBar, MobileNav, ...
│   ├── home/               # Hero, FeaturedCollection, BrandStory, ...
│   ├── shop/               # ProductCard, ProductGrid, FilterSidebar, ...
│   ├── product/            # ImageGallery, ProductInfo, VariantSelector, ...
│   ├── cart/               # CartDrawer, CartLineItem, CartPageContents
│   ├── checkout/           # CheckoutFlow, AddressStep, ShippingStep, ...
│   ├── account/            # AccountSidebar, OrderTimeline, AddressCard, ...
│   ├── auth/               # SignInForm, RegisterForm, ForgotForm
│   ├── about/              # About-page sections
│   ├── journal/            # JournalCard, JournalGrid, TagFilter, ...
│   ├── lookbook/           # LookbookRow
│   ├── forms/              # ContactForm, NewsletterForm, CustomOrderForm
│   ├── rich-text/          # CMS block renderer
│   ├── motion/             # ScrollReveal helper
│   └── admin/              # AdminShell, AdminSidebar, DataTable, BlockEditor, TiptapEditor, ...
├── lib/
│   ├── mock/               # typed mock data (Phase 1 source of truth)
│   ├── store/              # Zustand stores (cart, auth, wishlist, checkout, admin/*)
│   ├── schemas/            # Zod schemas (checkout, ...)
│   ├── data/               # static data (BD districts, etc.)
│   ├── fonts.ts            # next/font config
│   ├── motion.ts           # shared easings + durations
│   ├── links.ts            # safe-link helpers
│   └── utils.ts            # cn(), formatBDT()
└── types/                  # shared type aliases
```

---

## Canonical references

- **[design.md](design.md)** — visual system (palette, type scale, motion specs, accessibility, admin tone). Read before touching styles, fonts, or colors.
- **[CLAUDE.md](CLAUDE.md)** — project conventions for Claude Code sessions (component patterns, pricing rules, image alt text style, admin/storefront data divergence).

---

## Admin / storefront data divergence (Phase 1 only)

In Phase 1, admin stores (`src/lib/store/admin/*`) and storefront pages read from **different sources** and do not share state.

| Area | Admin reads from | Storefront reads from |
|---|---|---|
| Home sections | `useAdminHomeBuilder` (Zustand + localStorage) | `src/lib/mock/home.ts` |
| Pages / CMS | `useAdminPages` (Zustand + localStorage) | `src/lib/mock/{about,faq,careGuide,legal}.ts` |
| Journal | `useAdminJournal` (Zustand + localStorage) | `src/lib/mock/journal.ts` |
| Testimonials | `useAdminTestimonials` (Zustand + localStorage) | `src/lib/mock/testimonials.ts` |
| Lookbook | `useAdminLookbook` (Zustand + localStorage) | `src/lib/mock/lookbook.ts` |
| Site settings | `useAdminSiteSettings` (Zustand + localStorage) | `src/lib/mock/site.ts` |

**This is intentional.** Phase 1 demonstrates full admin CRUD UX without a database. In Phase 2 both will read from shared Drizzle tables. Until then, admin edits do not reflect on the storefront — this is expected behaviour.

---

## Subagents installed

Project-scoped agents in [.claude/agents/](.claude/agents/):

| Agent | Role |
|---|---|
| `frontend-developer` | Component implementation, motion, responsive layout |
| `ui-ux-designer` | Section layouts, spacing, typography decisions |
| `backend-architect` | Phase 2 only — Drizzle schemas, server actions, payment provider interface |
| `database-architect` | Phase 2 only — schema review, indexing, migrations |
| `code-reviewer` | After each phase milestone |
| `seo-analyzer` | Phase 2 only — meta, JSON-LD, sitemap, perf audit |

---

## Roadmap

### Phase 1 — UI with mock data ✅ (complete)
Storefront + admin panel, full visual system, all CRUD UX wired against Zustand mocks.

### Phase 2 — Backend
- PostgreSQL (Neon) + Drizzle ORM, schema mirrors Phase 1 mock shapes
- Better Auth (email/password + Google) replacing Phase 1 stubs
- SSLCommerz adapter (bKash / Nagad / Rocket / cards) + optional Stripe behind a `PaymentProvider` interface
- Cloudinary for media uploads (wired via the existing MediaPicker)
- Resend + React Email for transactional mail
- DOMPurify on Tiptap output once admin → storefront unification lands
- Sitemap, robots.txt, OG image generation
- SEO audit, Lighthouse CI, Sentry, Vercel Analytics

### Phase 3 — Launch polish
- Replace stock imagery with Ashfia's real atelier photography
- Multi-language (EN/BN) if scope allows
- Real Instagram feed integration
- Tests (Vitest + Playwright happy paths)

---

## License

Private — all rights reserved. © Ms Weaver / Ashfia Khatun.
