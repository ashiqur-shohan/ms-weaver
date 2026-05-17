# Ms Weaver — Project Conventions for Claude Code

## Project

**Ms Weaver** is a luxury crochet e-commerce site for **Ashfia Khatun**.
Primary market: **Bangladesh (BDT — Bangladeshi Taka)**.
Tagline: *Handwoven Elegance*. Brand register: quiet, considered, tactile, refined.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (radix-nova style, stone base, CSS variables) · Motion (Framer) · Lenis (smooth scroll) · Zustand · React Hook Form + Zod · Phosphor Icons (regular weight)

## Key pointers

| File / Directory | Purpose |
|---|---|
| `design.md` | **Canonical visual system.** Read before touching styles, fonts, or colors. |
| `src/app/globals.css` | Tailwind v4 `@theme` + all brand color/font tokens |
| `src/lib/mock/*` | Current data layer — Phase 1 uses typed mock JSON shaped like future Drizzle schemas |
| `src/lib/fonts.ts` | Fraunces + Inter via `next/font/google` |
| `src/lib/utils.ts` | `cn()` + `formatBDT()` |
| `src/lib/motion.ts` | Shared `easings` and `durations` constants |
| `src/lib/store/` | Zustand stores (cart, UI drawers/modals) |
| `src/components/ui/` | shadcn/ui primitives — do not hand-edit; re-run `pnpm dlx shadcn@latest add` to update |
| `src/components/layout/` | Header, Footer, AnnouncementBar, MobileNav |
| `src/components/home/` | Hero, FeaturedCollection, BrandStory, ProcessShowcase, Testimonials, JournalPreview, Newsletter |
| `src/components/shop/` | ProductCard, ProductGrid, FilterSidebar, SortDropdown |
| `src/components/product/` | ImageGallery, ProductInfo, VariantSelector, CustomOrderOptions, ProductTabs, RelatedProducts |
| `src/components/cart/` | CartDrawer, CartItem, CartSummary |
| `src/components/checkout/` | AddressForm, ShippingMethod, PaymentForm (stub), OrderReview |
| `src/components/forms/` | ContactForm, NewsletterForm, CustomOrderForm |
| `src/components/admin/` | AdminSidebar, AdminHeader, DataTable, BlockEditor, MediaPicker |
| `src/components/rich-text/` | RichText renderer for CMS blocks |

## Conventions

### Components
- **Server Components by default.** Add `"use client"` only when the component needs browser APIs, event handlers, or React state/effects.
- Keep components small and composable. Lift state only when shared across siblings.
- File names: PascalCase for components, kebab-case for pages/routes.

### Pricing
- **Always format prices with `formatBDT(amount)` from `@/lib/utils`.** Never display raw numbers or hardcode currency symbols.
- Example output: `৳ 1,200`

### Images
- Alt text is **editorial prose** describing what the image communicates.
  - Correct: `"Hand-knotted cream throw draped over an oak bench in afternoon light"`
  - Incorrect: `"product photo"`, `"image1.jpg"`, `"crochet"`
- Aspect ratios by context are documented in `design.md` Section 5.

### Styling
- **Design tokens come from `@theme` in `globals.css`.** Never hardcode hex values in JSX or CSS.
  - Use `bg-background`, `text-foreground`, `text-primary`, `border-border`, etc.
- Tailwind v4 — utility classes work out of the box from `@theme` variables; no `tailwind.config.ts` needed.
- Brand radius is minimal: default `--radius: 0.125rem` (nearly square). Buttons and cards use `rounded-none` unless noted.

### Motion
- Import `easings` and `durations` from `@/lib/motion` — never hardcode curve values.
- Wrap all animated components with a `useReducedMotion()` check. When true: set duration to 0, skip clip-path, remove translate — keep opacity transitions only.
- Lenis (smooth scroll) is initialized in `(storefront)/layout.tsx` — not in the root layout.

### Icons
- Use `@phosphor-icons/react` at **regular weight** for all decorative and navigational icons.
- **Exception:** `weight="fill"` is permitted ONLY on state-indicator icons where the filled form communicates a meaningful toggle state (e.g., `Heart` when an item is wishlisted, `Star` when rated). Use fill weight solely for the "active" state; the inactive/default state always uses regular.
- Never use `bold` weight.
- Sizes: 24px navigation, 20px default/body, 16px inline/label.
- Icon-only buttons: wrap in `p-3` container for a 44px touch target.
- **lucide-react** is permitted ONLY inside `components/ui/` (the shadcn/ui primitives use it internally). Ms Weaver-authored components in `components/{layout,home,shop,product,cart,admin,...}` must import Phosphor exclusively.

### Forms
- All forms use **React Hook Form + Zod**. Schema lives alongside the form component.
- Validation errors display inline below the field in the underline-input style.

### Accessibility
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section aria-label>`. Never skip heading levels.
- Focus ring: `outline: 2px solid #B5613D; outline-offset: 2px` — applied globally. Never suppress for keyboard users.
- Touch targets: minimum 44x44px for all interactive elements.

## Known deferred items

- **Stock avatars / placeholder portraits** — Ashfia's real imagery to be supplied in Phase 2. Do not replace until confirmed assets are available.

## Admin panel / storefront data divergence

**Admin stores (`src/lib/store/admin/`) and storefront pages read from different sources and do NOT share state in Phase 1.**

| Area | Admin reads from | Storefront reads from |
|---|---|---|
| Home sections | `useAdminHomeBuilder` (Zustand + localStorage) | `src/lib/mock/home.ts` |
| Pages / CMS | `useAdminPages` (Zustand + localStorage) | `src/lib/mock/about.ts`, `faq.ts`, `careGuide.ts`, `legal.ts` |
| Journal | `useAdminJournal` (Zustand + localStorage) | `src/lib/mock/journal.ts` |
| Testimonials | `useAdminTestimonials` (Zustand + localStorage) | `src/lib/mock/testimonials.ts` |
| Lookbook | `useAdminLookbook` (Zustand + localStorage) | `src/lib/mock/lookbook.ts` |
| Site settings | `useAdminSiteSettings` (Zustand + localStorage) | `src/lib/mock/site.ts` |

**This is intentional for Phase 1** — the admin panel demonstrates full CRUD UI without requiring a database. In Phase 2 (Drizzle + server actions), both the admin and storefront will read from the same database tables. Until then:

- Do not refactor storefront pages to read from admin stores.
- Do not add bridge logic (e.g. seeding mock from store on mount) — it creates a circular dependency.
- If a storefront value appears "stale" after an admin edit, this is expected Phase 1 behaviour.

## Phase rules

**Phase 1 = UI with mock data only.**
- Do NOT add database connections, authentication, or payment integrations.
- Do NOT install Drizzle, Better Auth, SSLCommerz, Resend, or Cloudinary.
- These are explicitly Phase 2 — await explicit user approval before proceeding.

## Subagent shortcuts

Available in `.claude/agents/`:

| Agent | When to use |
|---|---|
| `frontend-developer` | Component implementation, motion choreography, responsive layout |
| `ui-ux-designer` | Design new section layouts, refine spacing/typography before building |
| `backend-architect` | Phase 2 only — Drizzle schemas, Server Actions, payment provider interface |
| `database-architect` | Phase 2 only — schema review, indexing, migration plan |
| `code-reviewer` | After each phase milestone, before moving on |
| `seo-analyzer` | Phase 2 only — meta, JSON-LD, sitemap, performance audit |
