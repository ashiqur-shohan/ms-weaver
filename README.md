# Ms Weaver

> *Handwoven Elegance* — a luxury custom hand-knitted crochet e-commerce platform for **Ashfia Khatun**. Primary market: **Bangladesh (BDT)**.

A storefront and admin panel built with Next.js 15, Tailwind v4, and shadcn/ui. The brand register is quiet, considered, tactile — closer to Hermès and Toteme than to a typical online shop.

---

## Features

- **Storefront** — home, shop with filters/sort, product detail with custom-order options, collections, cart drawer + dedicated cart page, 4-step BD-localized checkout (bKash / Nagad / Rocket / Cash on Delivery / Card), customer account (orders, wishlist, addresses, profile), auth, journal, lookbook, about, care guide, contact, FAQ, custom order, legal pages
- **Admin panel** — dashboard, products CRUD, collections, orders with status timeline, customers, custom-request inbox, home builder, pages CMS with block editor, journal posts with Tiptap, testimonials, lookbook, media library, and full settings (site, SEO, emails, discounts, shipping, tax, staff, analytics)
- **Design system** — bespoke palette, Fraunces + Inter typography, WCAG 2.2 AA contrast, `prefers-reduced-motion` honored throughout

---

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

For production-mode performance testing:

```bash
pnpm build
pnpm start
```

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Components | shadcn/ui (radix-nova preset, stone base) |
| Animations | Motion (Framer Motion v11) + Lenis smooth-scroll |
| Icons | Phosphor Icons |
| Forms | React Hook Form + Zod |
| State | Zustand (with `persist` middleware) |
| Rich text | Tiptap |
| Drag & drop | dnd-kit |
| Fonts | Fraunces (serif) + Inter (sans) via `next/font/google` |
| Package manager | pnpm |

---

## Scripts

```bash
pnpm dev          # development server (port 3000)
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
│   ├── (admin)/admin/      # admin shell
│   ├── (checkout)/checkout/  # monastic checkout layout
│   ├── (auth)/auth/        # sign-in / register / forgot
│   ├── layout.tsx          # root layout (fonts, metadata)
│   └── globals.css         # Tailwind v4 @theme tokens
├── components/
│   ├── ui/                 # shadcn primitives
│   ├── layout/             # Header, Footer, Container, ScrollReveal, ...
│   ├── home/               # home sections
│   ├── shop/               # ProductCard, ProductGrid, FilterSidebar
│   ├── product/            # ImageGallery, ProductInfo, ProductTabs
│   ├── cart/               # CartDrawer, CartLineItem
│   ├── checkout/           # CheckoutFlow, AddressStep, ...
│   ├── account/            # AccountSidebar, OrderTimeline
│   ├── auth/               # SignInForm, RegisterForm, ForgotForm
│   ├── about/              # About-page sections
│   ├── journal/            # JournalCard, JournalGrid, TagFilter
│   ├── lookbook/           # LookbookRow
│   ├── forms/              # ContactForm, NewsletterForm, CustomOrderForm
│   ├── rich-text/          # CMS block renderer
│   ├── motion/             # ScrollReveal helper
│   └── admin/              # AdminShell, DataTable, BlockEditor, TiptapEditor, ...
├── lib/
│   ├── store/              # Zustand stores
│   ├── schemas/            # Zod schemas
│   ├── data/               # static data (BD districts, etc.)
│   ├── fonts.ts            # next/font config
│   ├── motion.ts           # shared easings + durations
│   └── utils.ts            # cn(), formatBDT()
└── types/                  # shared type aliases
```

---

## Documentation

- [design.md](design.md) — visual system (palette, type scale, motion, accessibility)
- [developer.md](developer.md) — developer onboarding and conventions
- [CLAUDE.md](CLAUDE.md) — code conventions

---

## License

Private — all rights reserved. © Ms Weaver / Ashfia Khatun.
