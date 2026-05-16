# Phase 1B — Home Page Section Briefs

**Ms Weaver | Storefront | 2026-05-16**

All sections live in `src/components/home/`. Each receives its typed props directly from the `HomeSection` discriminated union. Motion imports come from `motion/react`; easing values from `src/lib/motion.ts`. The canonical `<Container>` (`src/components/layout/Container.tsx`) provides gutters: `px-6 md:px-12 lg:px-20`, `max-w-[1440px] mx-auto`.

---

## 1. Hero

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │  col-span-5                  │  │  col-span-7  (full-bleed image)     │  │
│  │                              │  │                                     │  │
│  │  EYEBROW: THE SPRING ATELIER │  │  [hero image — right-aligned,       │  │
│  │                              │  │   extends to screen edge,           │  │
│  │  Knotted by hand,            │  │   clip-path reveals upward          │  │
│  │  made to be lived with.      │  │   on mount]                         │  │
│  │  [display/h1 Fraunces]       │  │                                     │  │
│  │                              │  │                                     │  │
│  │  Each piece leaves the Dhaka │  │                                     │  │
│  │  atelier carrying the hours… │  │                                     │  │
│  │  [body]                      │  │                                     │  │
│  │                              │  │                                     │  │
│  │  [PRIMARY BTN] [GHOST BTN]   │  │                                     │  │
│  └──────────────────────────────┘  └─────────────────────────────────────┘  │
│                         ↓  ──  SCROLL  ──  ↓                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile behavior:** Stack vertically — mobile image (4:5) at top full-width, text block below with `px-6 py-12`; no asymmetric split.

**Grid spec:**
```
section: min-h-[90vh] relative overflow-hidden bg-background
inner:   <Container> grid grid-cols-12 gap-6 md:gap-8 min-h-[90vh] items-center
left:    col-span-12 md:col-span-5 py-24 lg:py-40 z-10
right:   col-span-12 md:col-span-7 absolute inset-y-0 right-0 md:relative md:inset-auto
         (on desktop the image column is `relative` and the next/image fills it;
          the image itself uses `object-cover object-center` and is `h-full w-full`)
```
The right image column must escape the container gutter on the right edge: wrap in a `relative` element that uses negative right margin `-mr-6 md:-mr-12 lg:-mr-20` to bleed to the viewport edge.

**Typography map:**
- Eyebrow text ("THE SPRING ATELIER") — `eyebrow` token: `text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground font-sans`
- Headline — `display`: Fraunces, `text-[56px] lg:text-[72px] leading-[62px] lg:leading-[76px] font-light tracking-[-0.03em] font-serif`
- Subhead — `body`: Inter, `text-[16px] leading-[26px] text-muted-foreground mt-4`
- CTA labels — `label`: `text-[12px] font-medium uppercase tracking-[0.05em]`

**Imagery:**
- Desktop: `desktopImage` (1920×1080, 16:9). `sizes="(max-width: 768px) 0px, 58vw"`. `fill` within the right col wrapper. `object-cover object-center`. Extend to the right viewport edge via `-mr-6 md:-mr-12 lg:-mr-20`.
- Mobile: `mobileImage` (900×1125, 4:5). `sizes="100vw"`. Full-width above text. `aspect-[4/5] w-full`.
- A translucent overlay `bg-background/30` on the desktop left portion protects text legibility where image overlaps.

**Motion choreography:**
- On mount (`useEffect` / `AnimatePresence`): image clip-path `inset(100% 0 0 0) → inset(0 0 0 0)`, duration `0.9s`, easing `easings.image`.
- Eyebrow: `opacity 0→1, y 16→0`, delay `0.4s`, duration `durations.ambient`, `easings.entrance`.
- Headline: `opacity 0→1, y 24→0`, delay `0.55s`, same curve.
- Subhead: delay `0.7s`.
- CTA row: delay `0.85s`.
- Scroll indicator: `opacity 0→1` delay `1.2s`, then a looping `y: 0→8→0` over `2s` infinite, `ease-in-out`.

**CTAs:**
- Primary: `props.cta` — label "Discover the Atelier", href `/about`. Button variant: primary (`bg-primary text-primary-foreground rounded-none h-12 px-8 uppercase tracking-[0.05em] text-[12px]`).
- Secondary: `props.secondaryCta` — label "Shop New Pieces", href `/shop`. Button variant: secondary/ghost (`h-12 border border-foreground bg-transparent rounded-sm text-[12px] uppercase tracking-[0.05em]`).

**Scroll indicator:** Absolutely positioned `bottom-8 left-1/2 -translate-x-1/2`. A `div` containing a `w-px h-8 bg-foreground/40` line then `text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-2` text "SCROLL". Use Phosphor `ArrowDown` 16px below, or the thin line alone.

**Reduced-motion fallback:** Skip clip-path reveal (image appears instantly at full opacity). All `y` translates removed. Only opacity fades retained with durations halved.

---

## 2. FeaturedCollection

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌────────────────────────────────────────────────┐   │
│  │  col-span-4      │  │  col-span-8  — 3-up product grid               │   │
│  │                  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  EYEBROW         │  │  │ [4:5 img]│  │ [4:5 img]│  │ [4:5 img]│      │   │
│  │                  │  │  │          │  │          │  │          │      │   │
│  │  Heirloom Home   │  │  │ Name     │  │ Name     │  │ Name     │      │   │
│  │  [h2 Fraunces]   │  │  │ BDT 8500 │  │ BDT 3600 │  │ BDT 4800 │      │   │
│  │                  │  │  └──────────┘  └──────────┘  └──────────┘      │   │
│  │  Objects that    │  └────────────────────────────────────────────────┘   │
│  │  outlast trends. │                                                        │
│  │  [body]          │                                                        │
│  │                  │                                                        │
│  │  EXPLORE →       │                                                        │
│  └──────────────────┘                                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile behavior:** Single column; info block stacks above a horizontally scrollable snap-carousel of product cards (`flex overflow-x-auto snap-x snap-mandatory gap-4`, each card `snap-start shrink-0 w-[72vw]`).

**Grid spec:**
```
section:   py-24 md:py-32 lg:py-40 bg-background
container: <Container> grid grid-cols-12 gap-6 md:gap-8 items-start
left:      col-span-12 md:col-span-4 flex flex-col gap-6
right:     col-span-12 md:col-span-8
  desktop: grid grid-cols-3 gap-4 md:gap-6
  mobile:  flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6 md:mx-0 md:px-0
```

**Typography map:**
- Eyebrow — `eyebrow` token
- Collection name (`props.heading` "Heirloom Home") — `h2`: Fraunces, `text-[40px] leading-[48px] font-light tracking-[-0.015em] font-serif`
- Subhead (`props.subhead`) — `body`: Inter `text-[16px] leading-[26px] text-muted-foreground`
- CTA link — `label` `text-[12px] uppercase tracking-[0.05em]` + `ArrowRight` 16px inline, underline on hover
- Product name — `h4`: `text-[22px] leading-[30px] font-[400] tracking-[-0.005em] font-serif` (or `body-lg` Inter if simpler)
- Price — `body-sm`: Inter `text-[14px] leading-[22px] text-muted-foreground`

**Imagery:**
- Each product card image: 4:5 ratio, `overflow-hidden` wrapper with `aspect-[4/5]`. `<Image>` inside `object-cover`.
- `sizes="(max-width: 768px) 72vw, (max-width: 1280px) 25vw, 320px"`.
- Hover: `scale-[1.03]` on `<img>` over `700ms` `cubic-bezier(0.22, 1, 0.36, 1)`. Apply `transition-transform` to the `<img>`, not the wrapper.

**Motion choreography:**
- Left info block: `whileInView opacity 0→1, x -24→0`, `easings.entrance`, `durations.ambient`, `once: true, margin: "-80px"`.
- Product cards: `whileInView` stagger container, `staggerChildren: 0.08`, each card `opacity 0→1, y 24→0`.

**CTAs:**
- Ghost link: `props.cta` → `/collections/heirloom-home`. Render as `<Link>` with arrow icon, no button shell — inline ghost style.

**Reduced-motion fallback:** No `x`/`y` translates, no stagger delays. Opacity fade only.

---

## 3. BrandStory

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────┐  ┌───────────────────────────────────────┐ │
│  │  col-span-5  [portrait img] │  │  col-span-7                           │ │
│  │                             │  │                                       │ │
│  │  [3:4 or 9:11 tall image]   │  │  "a slow practice of                  │ │
│  │  clip-path reveal from btm  │  │   inherited hands."                   │ │
│  │                             │  │  [tagline — Fraunces italic]          │ │
│  │                             │  │                                       │ │
│  │                             │  │  EYEBROW: THE ATELIER                 │ │
│  │                             │  │  One pair of hands. No shortcuts.     │ │
│  │                             │  │  [h2 Fraunces]                        │ │
│  │                             │  │                                       │ │
│  │                             │  │  [body paragraph(s)]                  │ │
│  │                             │  │                                       │ │
│  │                             │  │  READ OUR STORY →                     │ │
│  └─────────────────────────────┘  └───────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile behavior:** Image full-width (4:5) at top; text block below with standard section padding.

**Grid spec:**
```
section:   py-24 md:py-32 lg:py-40 bg-background
container: <Container> grid grid-cols-12 gap-8 md:gap-12 items-start
left:      col-span-12 md:col-span-5
right:     col-span-12 md:col-span-7 flex flex-col gap-8 md:pt-8
```

**Typography map:**
- Tagline at top of right col (italic editorial opener, not from props — authored in component or sourced from `props.heading` with an italic wrapper): `tagline`: Fraunces italic, `text-[22px] leading-[30px] font-light text-muted-foreground font-serif italic`
- Eyebrow (`props.eyebrow` "The Atelier") — `eyebrow` token
- Heading (`props.heading`) — `h2`: Fraunces `text-[40px] leading-[48px] font-light tracking-[-0.015em]`
- Body (`props.body`) — `body-lg`: Inter `text-[18px] leading-[28px] text-muted-foreground` — split into 2-3 paragraphs at `\n\n` or a single block
- CTA — ghost link `label` style + arrow

**Imagery:**
- `props.image` (900×1100, approx 9:11). Container: `aspect-[5/6] overflow-hidden w-full`.
- `<Image fill object-cover object-top>` to favor face/hands in frame.
- `sizes="(max-width: 768px) 100vw, 42vw"`.
- Clip-path reveal: `inset(100% 0 0 0) → inset(0 0 0 0)` on `whileInView`, `viewport={{ once:true, margin:"-120px" }}`, duration `0.9s`, `easings.image`.

**Motion choreography:**
- Image: clip-path reveal as above.
- Right col children: `staggerChildren: 0.1`, each `opacity 0→1, x 20→0`, `easings.entrance`, `durations.ambient`.

**CTAs:**
- Ghost link: `props.cta` → `/about`. "READ OUR STORY" + `ArrowRight` 16px.

**Reduced-motion fallback:** Image appears at full opacity, no clip-path. No `x` translate. Opacity only.

---

## 4. ProcessShowcase

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  EYEBROW: HOW IT IS MADE                                                     │
│  From fibre to finished piece.   [h2 Fraunces, left-aligned, mb-16]          │
│                                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐             │
│  │  01             │  │  02             │  │  03              │             │
│  │  [Fraunces 8xl] │  │                 │  │                  │             │
│  │  italic         │  │                 │  │                  │             │
│  │                 │  │                 │  │                  │             │
│  │  Material       │  │  Botanical      │  │  Handwork        │             │
│  │  selection      │  │  dyeing         │  │                  │             │
│  │  [h3]           │  │  [h3]           │  │  [h3]            │             │
│  │                 │  │                 │  │                  │             │
│  │  [body 2-sent]  │  │  [body 2-sent]  │  │  [body 2-sent]   │             │
│  │                 │  │                 │  │                  │             │
│  │  [1:1 sq img]   │  │  [1:1 sq img]   │  │  [1:1 sq img]    │             │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘             │
└──────────────────────────────────────────────────────────────────────────────┘
```

Note: `props.steps` has 4 entries ("01"–"04"). Render all 4. On desktop use `grid-cols-4`; on tablet `grid-cols-2`; on mobile `grid-cols-1`.

**Mobile behavior:** Single column; each step card full-width, stacked with `gap-12`.

**Grid spec:**
```
section:     py-24 md:py-32 lg:py-40 bg-muted/30
container:   <Container>
header:      mb-12 md:mb-16
step-grid:   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10
step-card:   flex flex-col gap-4
```

**Typography map:**
- Section eyebrow (`props.eyebrow`) — `eyebrow` token
- Section heading (`props.heading`) — `h2`: Fraunces
- Step number (`step.number` "01"–"04") — oversized Fraunces italic: `font-serif italic text-[80px] leading-none font-light tracking-[-0.03em] text-border` (uses border color for subtlety)
- Step title (`step.title`) — `h3`: Fraunces `text-[28px] leading-[36px] font-[400] tracking-[-0.01em]`
- Step description (`step.description`) — `body-sm`: Inter `text-[14px] leading-[22px] text-muted-foreground`

**Imagery:**
- Each `step.image`: `aspect-square overflow-hidden`. `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`. `object-cover`.
- Place image at bottom of each card so the number, title, and body read top-down first.

**Motion choreography:**
- Section header: `whileInView opacity 0→1, y 24→0`, once.
- Step cards: `whileInView` stagger container, `staggerChildren: 0.08`, each card `opacity 0→1, y 32→0`, `easings.entrance`.

**CTAs:** None.

**Reduced-motion fallback:** No stagger, no `y` translate. Opacity only.

---

## 5. Testimonials

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│               EYEBROW: WORDS FROM THE ATELIER                                │
│                                                                               │
│     "I ordered the bridal veil for my daughter's nikah and it                │
│      arrived folded in the most beautiful linen envelope…"                   │
│              [tagline scale — Fraunces italic, centered, max-w-3xl]          │
│                                                                               │
│                    — Rahela Chowdhury, Dhaka, Bangladesh                     │
│                    [caption / body-sm, centered, text-muted]                 │
│                                                                               │
│                         ● ○ ○ ○  (dot indicators)                           │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile behavior:** Same centered layout, quote wraps naturally; dots remain below. No change in structure.

**Grid spec:**
```
section:   py-24 md:py-32 lg:py-40 bg-background
container: <Container> flex flex-col items-center text-center gap-10
quote-box: max-w-3xl mx-auto
dots:      flex gap-3 items-center justify-center mt-2
```

**Typography map:**
- Eyebrow (hard-code "WORDS FROM THE ATELIER") — `eyebrow` token, `text-muted-foreground`
- Pull quote — `tagline`: Fraunces italic `text-[22px] leading-[30px] font-light italic font-serif` — scale up on desktop: `md:text-[28px] md:leading-[38px]`
- Attribution — `body-sm`: Inter `text-[14px] leading-[22px] text-muted-foreground`

**Data:** Filter `testimonials` where `featured === true` (gives 4 entries: test_01, test_02, test_03, test_06). Display one at a time; rotate via index state.

**Motion choreography:**
- On slide change: outgoing quote `animate={{ opacity: 0 }}` over `0.3s`. After 300ms, set new index; incoming `animate={{ opacity: 1 }}` over `0.5s`. Use `AnimatePresence mode="wait"` keyed on testimonial `id`.
- Auto-rotate: `setInterval` every `8000ms` — advances index. Clicking a dot cancels the interval and resets it.

**Dot indicators:**
- `<button aria-label="View testimonial from {author}">` for each. Active dot: `w-3 h-3 rounded-full bg-foreground`. Inactive: `w-2 h-2 rounded-full bg-border hover:bg-muted-foreground transition-colors duration-200`. Touch target: wrap in `p-2`.

**CTAs:** None.

**Reduced-motion fallback:** No fade transition. Swap quote content instantly on dot click or interval tick.

---

## 6. JournalPreview

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  EYEBROW: FROM THE JOURNAL         [VIEW ALL JOURNAL →]  (right-aligned)    │
│  Notes from the atelier  [h2, left]                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
│  │  [3:2 cover img] │  │  [3:2 cover img] │  │  [3:2 cover img] │           │
│  │                  │  │                  │  │                  │           │
│  │  TAG · 6 MIN     │  │  TAG · 8 MIN     │  │  TAG · 5 MIN     │           │
│  │  [eyebrow]       │  │  [eyebrow]       │  │  [eyebrow]       │           │
│  │                  │  │                  │  │                  │           │
│  │  On the Slowness │  │  Dyeing With     │  │  Notes From      │           │
│  │  of Yarn  [h3]   │  │  Marigold [h3]   │  │  the Atelier[h3] │           │
│  │                  │  │                  │  │                  │           │
│  │  Excerpt 2 lines │  │  Excerpt…        │  │  Excerpt…        │           │
│  │  [body-sm]       │  │                  │  │                  │           │
│  │                  │  │                  │  │                  │           │
│  │  READ →          │  │  READ →          │  │  READ →          │           │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘           │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile behavior:** Horizontal snap-scroll carousel on mobile (`flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6`, cards `snap-start shrink-0 w-[85vw]`). On `md+` switches to 3-col grid.

**Grid spec:**
```
section:      py-24 md:py-32 lg:py-40 bg-background
container:    <Container>
header-row:   flex items-end justify-between mb-10 md:mb-12
card-grid:    grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8
  (mobile):   flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6
card:         flex flex-col gap-3 group cursor-pointer
```

**Typography map:**
- Section eyebrow — `eyebrow` token
- Section heading (`props.heading`) — `h2`: Fraunces
- "VIEW ALL JOURNAL" link — `label` + arrow, ghost style, right-aligned
- Card eyebrow (tag + reading time: `CRAFT · 6 MIN READ`) — `eyebrow` `text-muted-foreground`
- Card title (`post.title`) — `h3`: Fraunces `text-[28px] leading-[36px]`. On hover: underline slides from left using `after:` pseudo-element or `bg-gradient` trick
- Card excerpt — `body-sm`: Inter `text-[14px] leading-[22px] text-muted-foreground line-clamp-2`
- "READ →" — `label` style + `ArrowRight` 16px

**Imagery:**
- Cover image: `aspect-[3/2] overflow-hidden`. `<Image fill object-cover>`. `sizes="(max-width: 768px) 85vw, (max-width: 1280px) 33vw, 400px"`.
- Clip-path reveal on `whileInView`: `inset(100% 0 0 0) → inset(0 0 0 0)`, staggered 80ms between cards, `durations.ambient`, `easings.image`.
- Hover: `scale-[1.03]` on `<img>`, `transition-transform duration-700`.

**Motion choreography:**
- Image reveals: staggered clip-path per card as above.
- Card text: `staggerChildren: 0.08`, `opacity 0→1, y 16→0`.
- Title hover underline: `scaleX 0→1` from left, `duration: 0.2s`.

**CTAs:**
- Per-card "READ →" link: `href="/journal/${post.slug}"`.
- Header "VIEW ALL JOURNAL": `props.cta` → `/journal`.

**Reduced-motion fallback:** No clip-path, no `y` translate. Images appear. Opacity only.

---

## 7. Newsletter

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                      [section bg-card, py-40]                                │
│                                                                               │
│                    EYEBROW: THE ATELIER LETTER                               │
│                                                                               │
│               Unhurried correspondence.    [h2, Fraunces, centered]          │
│                                                                               │
│     Occasional notes on new pieces, seasonal dyeing…  [body, centered]      │
│                                                                               │
│               ┌─────────────────────────────────────┐                       │
│               │  email input (underline style)  [→]  │                       │
│               └─────────────────────────────────────┘                       │
│               [max-w-[680px] mx-auto — <NewsletterForm />]                   │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile behavior:** Identical layout; `max-w-[680px]` constrains width on all breakpoints. Text and form centered.

**Grid spec:**
```
section:    py-24 md:py-32 lg:py-40 bg-card
container:  <Container> flex flex-col items-center text-center gap-6
form-wrap:  w-full max-w-[680px] mx-auto text-left mt-4
```
The `<NewsletterForm />` is left-aligned within the centered max-width wrapper (the label+input pattern already baked in). Override the form's `max-w-sm` by passing `className="w-full max-w-none"` if the component accepts it, or wrap and let it stretch.

**Typography map:**
- Eyebrow (`props.eyebrow` "The Atelier Letter") — `eyebrow` token
- Heading (`props.heading` "Unhurried correspondence.") — `h2`: Fraunces, centered
- Subhead (`props.subhead`) — `body`: Inter `text-[16px] leading-[26px] text-muted-foreground`, `max-w-[520px] mx-auto`

**Imagery:** None. Section background `bg-card` (Pearl `#FBF8F2`) provides tonal separation.

**Motion choreography:**
- `whileInView` container, `staggerChildren: 0.1`, each element `opacity 0→1, y 20→0`, `easings.entrance`, `durations.ambient`, once.

**CTAs:**
- The `<NewsletterForm />` submit button ("Subscribe") — already styled with `ArrowRight` icon. No additional CTAs.

**Reduced-motion fallback:** No `y` translate, opacity only.

---

## 8. InstagramFeed

### ASCII Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [full-bleed section — no Container gutters on the image strip]              │
│                                                                               │
│  <Container>                                                                  │
│    EYEBROW: @MSWEAVER.BD       FOLLOW US ON INSTAGRAM →                     │
│  </Container>                                                                 │
│                                                                               │
│  ┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐              │
│  │[sq img]││[sq img]││[sq img]││[sq img]││[sq img]││[sq img]│              │
│  │  hover:││        ││        ││        ││        ││        │              │
│  │  ivory ││        ││        ││        ││        ││        │              │
│  │  wash +││        ││        ││        ││        ││        │              │
│  │  heart ││        ││        ││        ││        ││        │              │
│  └────────┘└────────┘└────────┘└────────┘└────────┘└────────┘              │
│  [edge-to-edge — 6 images at `w-[calc(100%/6)]` each, no gap or `gap-0.5`] │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile behavior:** Show 3 images in a 3-col grid (not a strip) with `gap-0.5`; hide the remaining 3 (`hidden`). Or show a 2-col then 3-col at `sm`. The header row uses `<Container>` gutters as normal.

**Grid spec:**
```
section:      py-16 md:py-24 lg:py-32 bg-background
header-row:   <Container> flex items-center justify-between mb-6 md:mb-8
image-strip:  w-full flex  (no container wrapping)
each-cell:    flex-1 relative aspect-square overflow-hidden group
              (6 cells, flex-1 means equal widths edge-to-edge)
```
On mobile, swap from `flex` strip to `grid grid-cols-3`:
```
image-strip:  grid grid-cols-3 md:flex gap-0 (use gap-[1px] on mobile for hairline)
```

**Typography map:**
- Eyebrow (`props.handle` "@msweaver.bd") — `eyebrow` token
- "FOLLOW US ON INSTAGRAM" — `label` style + `ArrowRight` 16px as `<a href={props.href} target="_blank" rel="noopener noreferrer">`

**Imagery:**
- 6 mock square images sourced from existing product/process image URLs in the mock data. Use a static array of 6 curated URLs from `products.ts` and `journal.ts` images. `sizes="(max-width: 768px) 33vw, 17vw"`. `fill object-cover`.
- Hover overlay: `<div>` sibling to `<Image>`, `absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2`. Inside: Phosphor `Heart` 24px `text-foreground` + like count `text-[12px] text-foreground`.

**Motion choreography:**
- Hover overlay: `transition-opacity duration-200` (`durations.micro`). No scroll animation — the strip is visual texture, not a content reveal.

**CTAs:**
- Header link: `props.href` → `https://instagram.com/msweaver.bd`, opens in new tab.

**Reduced-motion fallback:** Hover overlay appears instantly (duration 0). No other motion in this section.

---

## HomePage Container

`src/components/home/HomePageSections.tsx`

```
Props: { sections: HomeSection[] }
Filter: sections.filter(s => s.enabled)
Render: switch on s.type — each arm imports the matching component and spreads s.props
```

Switch pattern (pseudocode):
```ts
switch (section.type) {
  case "hero":               return <Hero {...section.props} />
  case "featuredCollection": return <FeaturedCollection {...section.props} />
  case "brandStory":         return <BrandStory {...section.props} />
  case "processShowcase":    return <ProcessShowcase {...section.props} />
  case "testimonials":       return <Testimonials {...section.props} />
  case "journalPreview":     return <JournalPreview {...section.props} />
  case "newsletter":         return <Newsletter {...section.props} />
  case "instagramFeed":      return <InstagramFeed {...section.props} />
}
```

Wrap the map in `<main>` with `aria-label="Ms Weaver home"`. Use `section.type` as the React `key`.

---

## Smoke-Test Page Replacement

Replace `src/app/(storefront)/page.tsx` entirely:

```tsx
import { homePage } from "@/lib/mock/home";
import { HomePageSections } from "@/components/home/HomePageSections";

export default function HomePage() {
  return <HomePageSections sections={homePage} />;
}
```

Remove all Phase 1A placeholder content. The Phase 1A scroll/header tests are now covered by the real page's scroll depth.

---

## Section File Convention

```
src/components/home/
  Hero.tsx               ← receives HeroSectionProps
  FeaturedCollection.tsx ← receives FeaturedCollectionProps
  BrandStory.tsx         ← receives BrandStoryProps
  ProcessShowcase.tsx    ← receives ProcessShowcaseProps
  Testimonials.tsx       ← receives TestimonialsProps
  JournalPreview.tsx     ← receives JournalPreviewProps
  Newsletter.tsx         ← receives NewsletterProps
  InstagramFeed.tsx      ← receives InstagramFeedProps
  HomePageSections.tsx   ← orchestrator; imports all above
```

- Every file is a named export matching the filename: `export function Hero(props: HeroSectionProps) { ... }`.
- Client directive (`"use client"`) only on components that use `useState`, `useEffect`, `useReducedMotion`, or Motion. Hero, Testimonials, and InstagramFeed (hover state) require `"use client"`. BrandStory, ProcessShowcase, JournalPreview require it for `whileInView`. FeaturedCollection and Newsletter require it for hover/form. Mark all 8 as `"use client"` for simplicity; `HomePageSections.tsx` can remain a server component since it only maps and renders.
- Import type re-exports from `@/lib/mock/home` — no prop redeclaration in each file.
- Data joins (e.g. resolving `productIds` to `Product[]`, `postIds` to `JournalPost[]`) happen inside each component by importing from `@/lib/mock/products` and `@/lib/mock/journal` and filtering. Do not pass resolved objects through `HomePageSections` — keep the orchestrator thin.
