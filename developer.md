# Ms Weaver — Developer Guide

A practical reference for engineers joining this codebase. Pair with [README.md](README.md) for project overview, [CLAUDE.md](CLAUDE.md) for conventions, and [design.md](design.md) for the visual system.

---

## 1. Onboarding (15 min)

```bash
# Prereqs: Node 20+, pnpm 9+
pnpm install
pnpm dev
```

Verify:
- [http://localhost:3000](http://localhost:3000) — storefront home
- [http://localhost:3000/admin](http://localhost:3000/admin) — admin (password `msweaver-admin`)

Then **read in this order**:
1. [README.md](README.md) — what we're building
2. [design.md](design.md) — visual system (tokens, motion, accessibility)
3. [CLAUDE.md](CLAUDE.md) — conventions you must follow
4. This file — how to actually work

Don't read every component up front. Open files as you need them.

---

## 2. Mental model

### Phase 1 = UI with mock data

There is **no database, no real auth, no payments** yet. Everything you see is wired against:

- Typed mock JSON in [src/lib/mock/](src/lib/mock/) — shaped exactly like the future Drizzle schema
- Zustand stores in [src/lib/store/](src/lib/store/) — persisted to `localStorage` for UX (cart, wishlist, auth) and to demo admin CRUD

Phase 2 will swap mocks for Drizzle + Postgres without rewriting components. **That promise depends on you keeping component props and store shapes stable.** When you add a new field, add it to the mock type first, then consume it.

### Two worlds in one app

| World | Layout | Purpose |
|---|---|---|
| **Storefront** | `src/app/(storefront)/` | Public-facing pages with Lenis smooth scroll, Header, Footer |
| **Admin** | `src/app/(admin)/admin/` | Custom shadcn/ui admin panel — pearl sidebar, denser type, no Lenis |
| **Checkout** | `src/app/(checkout)/checkout/` | Monastic single-column flow — no Header/Footer/Lenis |
| **Auth** | `src/app/(auth)/auth/` | Sign-in / register / forgot — minimal centered column |

Each route group has its own `layout.tsx`. Cross-pollination is intentional. Don't merge them.

### Admin / storefront data divergence

In Phase 1, the storefront reads from `src/lib/mock/*` directly. The admin reads from `src/lib/store/admin/*` (which is seeded from those same mocks and then mutated locally). **Admin edits do NOT propagate to the storefront in Phase 1.** This is by design.

When the user reports "I edited the home builder but the home page didn't change," the answer is "yes, that's expected until Phase 2."

---

## 3. Folder map (only the parts you'll touch often)

```
src/
├── app/
│   ├── (storefront)/page.tsx              # home — composes home sections
│   ├── (storefront)/shop/page.tsx         # shop index (filters via URL params)
│   ├── (storefront)/shop/[slug]/page.tsx  # product detail
│   ├── (admin)/admin/page.tsx             # dashboard
│   ├── (admin)/admin/products/[id]/page.tsx  # most complex admin form
│   └── globals.css                        # ALL design tokens via @theme
├── components/
│   ├── ui/                # shadcn primitives — DO NOT hand-edit
│   ├── layout/            # Header, Footer, Container, ScrollReveal, ...
│   ├── home/              # 8 home sections (composable via HomePageSections)
│   ├── shop/              # ProductCard, ProductGrid, FilterSidebar
│   ├── product/           # ImageGallery, ProductActions, ProductTabs
│   ├── cart/              # CartDrawer, CartLineItem
│   ├── checkout/          # 4-step flow + LuxuryField/LuxuryInput
│   ├── account/           # AccountSidebar, OrderTimeline
│   ├── admin/             # AdminShell, DataTable, BlockEditor, TiptapEditor, ...
│   └── rich-text/         # CMS block renderer (paragraph/heading/image/quote/gallery/faq)
├── lib/
│   ├── mock/              # all current data
│   ├── store/             # cart, auth, wishlist + admin/* (14 admin stores)
│   ├── schemas/           # Zod schemas for checkout, ...
│   ├── motion.ts          # easings + durations (use these, NEVER hardcode curves)
│   ├── fonts.ts           # Fraunces + Inter
│   └── utils.ts           # cn() + formatBDT()
```

If you can't find something, grep — but odds are it's in the obvious place.

---

## 4. Conventions you MUST follow

These come from [CLAUDE.md](CLAUDE.md). Violating them creates inconsistency that compounds.

1. **Server Components by default.** Add `"use client"` only when you need state, refs, effects, browser APIs, or event handlers. Push the client boundary as deep as possible — wrap small interactive subcomponents, keep the rest as server.

2. **Always format prices with `formatBDT()`.** Import from `@/lib/utils`. Never hardcode `৳` or call `.toLocaleString()` for currency.

3. **Image alt text is editorial prose.**
   - ✓ `"Hand-knotted cream throw draped over an oak bench in afternoon light"`
   - ✗ `"product photo"`, `"image1.jpg"`, `"crochet"`

4. **Design tokens come from `@theme` in [globals.css](src/app/globals.css).** Use `bg-background`, `text-foreground`, `text-primary`, `border-border`. Never hardcode hex in JSX or CSS.

5. **Phosphor icons only** in our components (regular weight). Lucide is allowed **only** inside `components/ui/` (the shadcn primitives use it internally — that's the documented exception). `weight="fill"` is permitted only for state-indicator icons (e.g., active wishlist heart).

6. **Motion easings/durations come from `@/lib/motion`.** Never hardcode `cubic-bezier(...)` arrays inline. For Tailwind utilities, use the custom `ease-luxe` / `ease-luxe-image` classes already declared in globals.css.

7. **All animated components must respect `useReducedMotion()`.** When true, set duration to 0, skip clip-path / translate, keep opacity-only transitions.

8. **Forms use the design.md underline-input style.**
   - Storefront / checkout: `LuxuryField` + `LuxuryInput` from `src/components/checkout/LuxuryField.tsx`
   - Admin: `FormField` + `AdminInput` / `AdminTextarea` / `AdminSelect` / `ChipInput` from `src/components/admin/AdminFormPrimitives.tsx`

9. **Destructive actions are gated by `<ConfirmDialog>`** (in admin) — never inline `confirm()`.

10. **Editorial copy throughout.** No "Submit!", no "Click here", no Lorem Ipsum. The brand voice is quiet, declarative, sensory. Read the existing copy before writing new copy.

---

## 5. How to do common things

### Add a new storefront page

```tsx
// src/app/(storefront)/<route>/page.tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Page title",
  description: "Editorial description.",
};

export default function MyPage() {
  return (
    <Container className="py-20 md:py-32">
      <PageHeader eyebrow="EYEBROW" title="Page title" subtitle="One editorial sentence." />
      {/* content */}
    </Container>
  );
}
```

Keep it a server component. Add `"use client"` only on subcomponents that genuinely need it.

### Add a new admin page

Two-file pattern:

```tsx
// src/app/(admin)/admin/<route>/page.tsx (server shell)
import { MyContents } from "./MyContents";
export default function Page() { return <MyContents />; }

// src/app/(admin)/admin/<route>/MyContents.tsx (client interactivity)
"use client";
import { PageHeader } from "@/components/admin/PageHeader";
// ...
```

Wire the link into `src/components/admin/AdminSidebar.tsx` under the appropriate group (OVERVIEW / COMMERCE / CONTENT / CONFIG).

### Add a new Zustand store (admin CRUD)

Follow the pattern in `src/lib/store/admin/products.ts`:

1. Define types
2. Seed initial state from `src/lib/mock/*`
3. Expose CRUD methods (`addX`, `updateX`, `deleteX`)
4. Wrap with `persist` + `createJSONStorage(() => localStorage)` + `skipHydration: true`
5. Register the store's `.persist.rehydrate()` call in `src/components/admin/AdminStoresHydration.tsx`

Skipping the hydration step causes SSR/CSR mismatch on first paint. The hydration component is the single place that triggers it.

### Add a new home section

1. Define props interface in `src/lib/mock/home.ts` and add a new variant to the `HomeSection` discriminated union
2. Add the section entry to the `homePage` array (with sensible defaults)
3. Create `src/components/home/<MyNewSection>.tsx`
4. Wire it into the switch in `src/components/home/HomePageSections.tsx`
5. Add an editor component in `src/app/(admin)/admin/home-builder/page.tsx`

The discriminated union narrows automatically — no `as` casts needed.

### Add a new RichText block type

1. Extend the `ContentBlock` union in `src/lib/mock/journal.ts` (or wherever the type lives)
2. Add a renderer in `src/components/rich-text/RichText<Type>.tsx`
3. Wire it into the switch in `src/components/rich-text/RichText.tsx`
4. Add an editor in `src/components/admin/BlockTypes/<Type>Block.tsx`
5. Add it to the "Add block" dropdown in `BlockEditor.tsx`

### Add a new shadcn primitive

```bash
pnpm dlx shadcn@latest add <component>
```

Don't hand-edit existing primitives in `src/components/ui/`. If you need behavior changes, wrap the primitive in your own component under `src/components/<area>/`.

---

## 6. Working with state

### Storefront stores

- `useCart` ([src/lib/store/cart.ts](src/lib/store/cart.ts)) — items, isOpen, openCart/closeCart
- `useAuth` ([src/lib/store/auth.ts](src/lib/store/auth.ts)) — mock customer sign-in (sets user = customers[0])
- `useWishlist` ([src/lib/store/wishlist.ts](src/lib/store/wishlist.ts)) — productId array
- `useCheckout` ([src/lib/store/checkout.ts](src/lib/store/checkout.ts)) — ephemeral multi-step state (sessionStorage)

All persisted stores use `skipHydration: true`. Read derived values via selector hooks (`useCartItemCount`, `useCartSubtotal`) — never via getters on the store object (they don't survive JSON persistence).

### Admin stores

`src/lib/store/admin/*` — one per resource. `useAdminAuth` gates the whole admin route group. All admin stores hydrate via `AdminStoresHydration` mounted in [(admin)/layout.tsx](src/app/(admin)/layout.tsx).

When you mutate admin data, call the store method (don't mutate state directly) and show feedback with `toast()` from `sonner`.

---

## 7. Working with motion

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
import { easings, durations } from "@/lib/motion";

export function MyComponent() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div>{/* no animation */}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: durations.ambient, ease: [...easings.entrance] }}
    >
      {/* content */}
    </motion.div>
  );
}
```

For the common scroll-reveal pattern, use `<ScrollReveal>` from [src/components/motion/ScrollReveal.tsx](src/components/motion/ScrollReveal.tsx).

Lenis smooth-scroll is initialized once in `(storefront)/layout.tsx` and gated on reduced-motion. Don't init Lenis elsewhere. To opt a section out of Lenis (sticky positioning sometimes needs this), add `data-lenis-prevent` to the wrapper.

---

## 8. Working with forms

Storefront / checkout: React Hook Form + Zod. The Zod resolver has a known type-compat workaround at `src/lib/schemas/resolver.ts`.

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/schemas/resolver";
import { mySchema, type MyInput } from "@/lib/schemas/myschema";

const form = useForm<MyInput>({ resolver: zodResolver(mySchema), defaultValues: {...} });
```

Conditional validation uses `superRefine` (see `addressStepSchema` and `paymentStepSchema` in [src/lib/schemas/checkout.ts](src/lib/schemas/checkout.ts)).

For lightweight forms (Phase 1 stubs like Contact / Custom Order), controlled state + manual validation is acceptable.

---

## 9. Type safety

- `strict: true` + `noUncheckedIndexedAccess: true` — every array index access yields `T | undefined`. Use typed helpers like `getPrimaryImage(product)` from [src/lib/mock/products.ts](src/lib/mock/products.ts) instead of `product.images[0].url`.
- Discriminated unions are everywhere. Switch on the discriminator (`section.type`, `block.type`) and TypeScript narrows the rest. No `as` casts.
- Never use `any`. If you need to escape the type system, use `unknown` + a narrowing helper.

Run `pnpm typecheck` before pushing. CI will fail otherwise.

---

## 10. Performance & dev mode

- **Dev mode is slow by design.** First visit to each route triggers compilation (5–15s). Subsequent visits are cached. This is HMR's tradeoff.
- **Production is fast.** Run `pnpm build && pnpm start` for accurate timing. Every storefront page prerenders to static HTML.
- Bundle hot spots: `/admin/journal/[id]` (~279 kB) due to Tiptap; `/shop/[slug]` (~249 kB) due to ImageGallery + ProductActions client bundles. Both acceptable.
- LCP target on storefront pages is < 2.5s. Add `priority` to above-fold `<Image>`s, set explicit `width`/`height` to avoid CLS.

---

## 11. Subagents (for Claude Code users)

Project agents live in [.claude/agents/](.claude/agents/). If you're driving Claude Code in this repo, route work like this:

| Task | Agent |
|---|---|
| New page / component implementation | `frontend-developer` |
| Layout decisions, spacing, typography | `ui-ux-designer` |
| Backend / Drizzle schemas (Phase 2 only) | `backend-architect` |
| DB schema review (Phase 2 only) | `database-architect` |
| Review after each milestone | `code-reviewer` |
| SEO audit (Phase 2 only) | `seo-analyzer` |

---

## 12. Common pitfalls

- **"Why doesn't admin reflect on storefront?"** — Phase 1 divergence. Documented in [CLAUDE.md](CLAUDE.md) and [README.md](README.md). Not a bug.
- **"Why is dev so slow?"** — On-demand compilation. Test with `pnpm build && pnpm start`.
- **"Hydration mismatch warning."** — Almost always a Zustand store without `skipHydration: true`, or a date/random value computed at module scope. Check `siteConfig.copyright` is template-replaced at render, not evaluated at import time.
- **"Cart badge stays 0 after refresh."** — `useCart.persist.rehydrate()` not firing. Verify `<CartHydration />` is mounted in the storefront layout.
- **"Sticky right column doesn't stick."** — Lenis is intercepting scroll. Add `data-lenis-prevent` to the wrapper or move the page outside `(storefront)`.
- **"shadcn component looks off."** — Don't hand-edit primitives. Wrap them, or re-run `pnpm dlx shadcn@latest add <name>` to refresh.
- **"My form submits but Zod doesn't validate."** — You probably bypassed RHF with `useState`. Wire fields via `register()` or `<Controller>` so they reach the resolver.

---

## 13. When you're ready for Phase 2

Phase 2 swaps mocks for real persistence. The interfaces that matter:

1. **Storefront → mock files** must become storefront → server actions / Drizzle queries with the **same return shape**.
2. **Admin stores → admin localStorage** must become admin stores → server actions with the **same store API**.
3. **`useAuth` stub** must be replaced by Better Auth's session hook.
4. **`/checkout` PLACE ORDER stub** must call a server action that creates the order and triggers the SSLCommerz / bKash adapter behind a `PaymentProvider` interface.

If your Phase 1 code couples directly to mock data or has business logic in components, Phase 2 will be painful. Keep components dumb, push logic into `lib/`.

---

## 14. Quick reference

```bash
pnpm dev                  # development
pnpm build && pnpm start  # production-mode test
pnpm typecheck            # tsc --noEmit
pnpm lint                 # eslint
pnpm format               # prettier
```

Admin password: `msweaver-admin`
Customer demo sign-in: any email + password (mocks to `customers[0]`)
Cart key in localStorage: `msweaver:cart:v1`
Admin auth key: `msweaver:admin:auth:v1`

---

When in doubt, follow the existing patterns. If you're about to write something that has no precedent in the codebase, pause and ask whether a similar problem is already solved somewhere (usually it is — grep first).
