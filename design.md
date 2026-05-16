# Ms Weaver — Design System
**Handwoven Elegance** | Owner: Ashfia Khatun | Market: Bangladesh (BDT)

---

## 1. Brand Essence

**Adjectives:** Considered. Unhurried. Tactile. Refined. Intimate.

**Brand voice:** Ms Weaver does not shout. Every word, every frame, every interaction is deliberate — the way a skilled hand counts stitches before committing to the next row. The tone is warm but not saccharine, authoritative but never cold. We speak to people who already know what they want: something made slowly, made well, made to last. Copy is spare. Sentences breathe. We describe texture, process, and provenance — never discount codes or urgency.

---

## 2. Color Palette

### Tokens

| Name              | Hex       | Role                  |
|-------------------|-----------|-----------------------|
| Ivory             | `#F7F3EC` | Background            |
| Charcoal          | `#1F1B16` | Foreground            |
| Terracotta        | `#B5613D` | Primary               |
| Taupe             | `#9C8B73` | Secondary             |
| Sage              | `#8A9279` | Accent                |
| Cream             | `#EDE5D6` | Muted                 |
| Stone             | `#6B5E4D` | Muted-foreground      |
| Bone              | `#DCD2BF` | Border                |
| Pearl             | `#FBF8F2` | Card background       |

### Tailwind v4 `@theme` block — paste into `globals.css`

```css
@import "tailwindcss";

@theme {
  /* ── Light mode ── */
  --color-background:       #F7F3EC;
  --color-foreground:       #1F1B16;
  --color-primary:          #B5613D;
  --color-primary-foreground: #FBF8F2;
  --color-secondary:        #9C8B73;
  --color-secondary-foreground: #1F1B16;
  --color-accent:           #8A9279;
  --color-accent-foreground: #FBF8F2;
  --color-muted:            #EDE5D6;
  --color-muted-foreground: #6B5E4D;
  --color-border:           #DCD2BF;
  --color-card:             #FBF8F2;
  --color-card-foreground:  #1F1B16;
  --color-destructive:      #B5613D;
  --color-destructive-foreground: #FBF8F2;
  --color-ring:             #B5613D;
  --color-input:            #DCD2BF;
}

.dark {
  --color-background:       #1F1B16;
  --color-foreground:       #F7F3EC;
  --color-primary:          #8C4A2C;   /* muted terracotta */
  --color-primary-foreground: #F7F3EC;
  --color-secondary:        #6B5E4D;
  --color-secondary-foreground: #EDE5D6;
  --color-accent:           #6B7262;
  --color-accent-foreground: #EDE5D6;
  --color-muted:            #2A241D;
  --color-muted-foreground: #9C8B73;
  --color-border:           #3A3029;
  --color-card:             #252019;
  --color-card-foreground:  #F7F3EC;
  --color-destructive:      #8C4A2C;
  --color-destructive-foreground: #F7F3EC;
  --color-ring:             #8C4A2C;
  --color-input:            #3A3029;
}
```

---

## 3. Typography

**Heading face:** Fraunces (variable — `opsz` 9–144, `SOFT` 0–100). Use `SOFT 50` at display sizes for the distinctive softness without caricature.
**Body face:** Inter (variable — `wght` 100–900).
**Accent:** Fraunces Italic — pull-quotes, taglines, editorial captions.

### `next/font` import snippet (`app/layout.tsx`)

```ts
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-inter",
  display: "swap",
});

// Apply to <html>: className={`${fraunces.variable} ${inter.variable}`}
```

### Type Scale

| Token        | Size  | Line-height | Weight | Tracking  | Face              |
|--------------|-------|-------------|--------|-----------|-------------------|
| Display      | 72px  | 76px        | 300    | -0.03em   | Fraunces variable |
| H1           | 56px  | 62px        | 300    | -0.02em   | Fraunces variable |
| H2           | 40px  | 48px        | 300    | -0.015em  | Fraunces variable |
| H3           | 28px  | 36px        | 400    | -0.01em   | Fraunces variable |
| H4           | 22px  | 30px        | 400    | -0.005em  | Fraunces variable |
| Tagline      | 22px  | 30px        | 300    | 0         | Fraunces italic   |
| Body LG      | 18px  | 28px        | 400    | 0         | Inter             |
| Body         | 16px  | 26px        | 400    | 0         | Inter             |
| Body SM      | 14px  | 22px        | 400    | 0         | Inter             |
| Caption      | 13px  | 20px        | 400    | 0.01em    | Inter             |
| Eyebrow      | 11px  | 16px        | 500    | 0.12em    | Inter uppercase   |
| Label        | 12px  | 16px        | 500    | 0.05em    | Inter uppercase   |

---

## 4. Spacing & Layout

- **Container:** `max-w-[1440px] mx-auto`
- **Gutters:** `px-6` (mobile) → `md:px-12` (tablet) → `lg:px-20` (desktop)
- **Section padding:** `py-24` → `md:py-32` → `lg:py-40`
- **Grid base:** 12 columns, `gap-6 md:gap-8`
- **Preferred asymmetric layouts:**
  - Editorial split: `col-span-5` / `col-span-7`
  - Feature product: `col-span-4` / `col-span-8`
  - Lookbook alternating: `col-span-7` / `col-span-5` flipped every row
- **Vertical rhythm unit:** `8px` — all spacing values are multiples
- **Card gap in grids:** `gap-4 md:gap-6`

---

## 5. Imagery & Art Direction

**Visual grammar:** Natural north or east light. Warm grade — lift shadows to taupe, pull highlights to ivory. Surfaces: raw linen, unfinished oak, matte terracotta clay, undyed wool. No plastic. No synthetic backgrounds.

**Content split:** 60% finished product on body or surface, 30% process (hands, hooks, yarn wound on a bobbin), 10% material studies (close-up fiber texture, dye bath, label detail).

### Aspect ratios by placement

| Context               | Ratio     | Notes                                    |
|-----------------------|-----------|------------------------------------------|
| Hero — desktop        | 16:9      | Full-bleed, text overlaid bottom-left    |
| Hero — mobile         | 4:5       | Crop to face/hands + product             |
| Product card          | 4:5       | Consistent grid, portrait orientation    |
| Lookbook primary      | 3:4       | Tall editorial                           |
| Lookbook secondary    | 21:9      | Wide cinematic strip, alternating rows   |
| Journal cover         | 3:2       | Landscape, generous breathing room       |
| Process thumbnail     | 1:1       | Square grid strip                        |

---

## 6. Component Design Notes (shadcn/ui customization)

**Buttons**
- Primary: `rounded-none h-12 bg-primary text-primary-foreground uppercase tracking-[0.05em] text-[12px] font-medium px-8 hover:bg-primary/90 transition-colors duration-200`
- Secondary: `rounded-sm h-12 border border-foreground bg-transparent text-foreground uppercase tracking-[0.05em] text-[12px]`
- Ghost: `rounded-none h-12 bg-transparent text-foreground underline-offset-4 hover:underline`

**Cards**
- `bg-card border border-border rounded-none shadow-none`
- Image hover: `scale-[1.03]` over `700ms` with `cubic-bezier(0.22, 1, 0.36, 1)` — apply to `<img>` inside `overflow-hidden` wrapper, never to the card itself

**Inputs**
- `border-0 border-b border-border rounded-none bg-transparent focus:border-foreground focus-visible:ring-0 focus-visible:outline-none transition-colors duration-200 px-0 h-11`
- Labels sit above, `text-[11px] uppercase tracking-[0.1em] text-muted-foreground`

**Navigation**
- Top bar: `h-20 flex items-center gap-10`
- Logo centered or left, links in eyebrow style, icons 24px Phosphor regular
- No background blur — flat ivory at all times (add `border-b border-border` on scroll)

**Badges**
- `border border-foreground bg-transparent text-foreground rounded-none text-[10px] uppercase tracking-[0.08em] px-2 py-0.5`
- Never filled, never rounded pill

**Sheets (Cart / Filters)**
- `w-[480px] rounded-none border-l border-border` — slides from right
- Header inside sheet: `h-20 flex items-center justify-between border-b border-border px-8`

---

## 7. Motion Language

**Duration tiers**

| Tier     | Duration | Use case                                 |
|----------|----------|------------------------------------------|
| Micro    | 200ms    | Hover states, color swaps, opacity fades |
| Standard | 500ms    | Modals, sheet open/close, tab switches   |
| Ambient  | 800ms    | Hero entrance, section reveals           |

**Easings**

| Name          | Curve                             | Use                          |
|---------------|-----------------------------------|------------------------------|
| Default        | `cubic-bezier(0.22, 1, 0.36, 1)` | General transitions          |
| Entrance       | `cubic-bezier(0.16, 1, 0.3, 1)`  | Elements entering viewport   |
| Image reveal   | `cubic-bezier(0.65, 0, 0.35, 1)` | Clip-path wipes on images    |

**Patterns**

- **Page transition:** 600ms cross-fade (`opacity: 0 → 1`) + `y: 12px → 0` translate, entrance easing
- **Image clip-path reveal:** `clipPath: "inset(100% 0 0 0)" → "inset(0 0 0 0)"` over 900ms, image-reveal easing. Wipes upward — content is revealed as if lifted into frame.
- **Scroll reveals:** `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 24 }`, `viewport={{ once: true, margin: "-80px" }}`, 80ms stagger between children via `staggerChildren`
- **`prefers-reduced-motion`:** Wrap all Motion components with a `useReducedMotion()` check. When true: duration → 0, clip-path skipped, translate removed — keep opacity only.

```ts
const shouldReduce = useReducedMotion();
const variants = {
  hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
  visible: { opacity: 1, y: 0 },
};
```

---

## 8. Page-by-Page Tone

| Page       | Editorial direction                                                                                          |
|------------|--------------------------------------------------------------------------------------------------------------|
| Home       | A single breath — hero image, tagline, nothing more until the eye has settled.                               |
| Shop       | The collection laid out like a well-curated shelf: generous space, no crowding, filters understated.         |
| Product    | The object deserves the full frame — multiple images, fiber notes, care instructions treated as poetry.       |
| About      | Ashfia's voice, direct and warm — the story of two hands and a hook, told without sentimentality.             |
| Journal     | Long-form at reading width, 65ch max, images interrupt the prose like plates in a printed book.              |
| Cart       | Quiet confidence — the customer has already decided; friction is the only enemy here.                        |
| Checkout   | Clinical clarity dressed in the brand's warmth — every field earns its place, nothing decorative.            |
| Account    | Personal, private, efficient — order history and saved addresses in the same unhurried type as the storefront.|

---

## 9. Iconography

**Library:** Phosphor Icons (`@phosphor-icons/react`)

| Context         | Size  | Weight  |
|-----------------|-------|---------|
| Navigation bar  | 24px  | Regular |
| Default / body  | 20px  | Regular |
| Inline / label  | 16px  | Regular |

Stroke simulation: regular weight renders at approximately 1.25px equivalent stroke. Never use `fill` or `bold` weight. Icons are purely functional wayfinding — decorative icon use is prohibited.

---

## 10. Accessibility

**Standard:** WCAG 2.2 AA minimum throughout.

### Contrast ratios (light mode)

| Pair                              | Ratio   | Pass AA |
|-----------------------------------|---------|---------|
| Foreground `#1F1B16` / Background `#F7F3EC` | ~15.8:1 | AAA     |
| Muted-foreground `#6B5E4D` / Background `#F7F3EC` | ~5.9:1  | AA      |
| Primary `#B5613D` / Background `#F7F3EC`  | ~4.6:1  | AA (normal text ≥14px bold or ≥18px) |
| Primary-foreground `#FBF8F2` / Primary `#B5613D` | ~4.5:1  | AA      |
| Stone `#6B5E4D` / Cream `#EDE5D6` | ~4.2:1  | AA      |

**Focus ring:** `outline: 2px solid #B5613D; outline-offset: 2px` — applied globally via `*:focus-visible`. Never remove outline for keyboard users.

**Touch targets:** All interactive elements minimum `44px × 44px`. Icon-only buttons wrap in a `p-3` container to pad hit area.

**Alt text standard:** Describe what the image communicates, not what it is.
- Correct: `"Hand-knotted cream throw draped over an oak bench in afternoon light"`
- Correct: `"Close-up of merino yarn in terracotta arranged in loose coils"`
- Incorrect: `"image1.jpg"`, `"product photo"`, `"crochet"`

**Motion:** All animated components check `useReducedMotion()`. See Section 7.

**Semantic HTML:** `<nav>`, `<main>`, `<article>`, `<section aria-label>`, `<h1>–<h6>` in document order. No heading levels skipped.

---

## 11. Admin Panel

The admin shares the storefront's fonts and color tokens but adopts a quieter, higher-density register — a back-of-house that respects the brand without performing it.

**Typography density:** Table cells and form labels use `text-[12px] leading-4`. Section headers use H4 (22px Fraunces). Body copy remains Inter.

**Layout:** Sidebar `240px` wide, collapsible to `64px` icon-rail via a toggle that stores preference in `localStorage`. Sidebar background: Pearl `#FBF8F2`. Main content area background: Ivory `#F7F3EC`.

**Cards:** `bg-card border border-border rounded-sm shadow-sm` — the `shadow-sm` distinguishes admin cards from storefront cards (which have no shadow).

**Table rows:** Zebra striping — odd rows transparent, even rows `bg-muted/50` (`#EDE5D6` at 50% opacity). Row hover: `bg-muted` solid. No external borders on table, only a bottom `border-border` per row.

**Button hierarchy in admin**

| Action type      | Style                                                                 |
|------------------|-----------------------------------------------------------------------|
| Destructive (Delete, Archive) | `bg-primary text-primary-foreground rounded-sm h-9 text-[12px] uppercase tracking-[0.05em]` — terracotta signals irreversibility |
| Utility (Save, Update) | `border border-border bg-card text-foreground rounded-sm h-9 text-[12px]` — ghost on pearl |
| Utility (Edit, View) | `text-foreground underline-offset-2 hover:underline text-[12px]` — plain link weight |
| Cancel / Back    | `text-muted-foreground text-[12px] hover:text-foreground`             |

**Sidebar navigation items:** `text-[13px] font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-sm hover:bg-muted transition-colors duration-150`. Active state: `text-foreground bg-muted font-semibold`.

**Data density principle:** The admin earns efficiency through compression, not decoration. Whitespace is reduced but never eliminated — row height `h-10`, not `h-8`. The person managing orders should feel in control, not squeezed.
