# Build — Optimization Architecture

> CDD Layer 2 — 2026 size + runtime perf strategy | **Last Updated**: 2026-05-02

Master decisions: [`../decisions.md`](../decisions.md). This doc is the SSOT for verodesign's CSS optimization architecture; outputs.md, tokens/architecture.md, and tokens/themes.md reference it.

## Goals

| Metric | v0.1.0 baseline | v0.2.0 target | Mechanism |
| ------ | --------------- | ------------- | --------- |
| `dist/utilities/full.css` | 7.8 MB raw / 5.7 MB min | **≤ 1.5 MB raw / ≤ 1.0 MB min** | drop alpha + dark + responsive permutations |
| `dist/utilities/full.css.br` (Brotli-11) | not emitted | **≤ 200 KB** | precompressed sibling |
| `dist/utilities/dark-variants.css` | 496 KB | **0 (deleted)** | `light-dark()` |
| `dist/utilities/responsive.css` | 3.7 MB | **≤ 200 KB** | `@container` for component-scope; keep media for OS prefs only |
| `dist/utilities/state-variants.css` | 2.3 MB | **≤ 100 KB** | `@scope` + native pseudos |
| `dist/css/themes/{slug}.css` | 14 KB × 3 | **≤ 8 KB × 3** | `light-dark()` collapses light+dark |
| Token recalc cost (changing `:root` var) | baseline (subtree walk) | **~1/9 (no walk)** | `@property inherits: false` |
| First-paint utility CSS over wire | ~140 KB Brotli (default-4) | **≤ 50 KB Brotli-11** | static dictionary + level 11 precompress |

## Non-goals

| Item | Why excluded |
| ---- | ------------ |
| Visual or token-API change | "기능과 디자인은 유지" — every existing token name and rendered pixel must match |
| `oklch()` source migration | Already OKLCH; only emission patterns change |
| Switching off Style Dictionary | SD5 path covered separately; v0.2.0 keeps SD4 |
| HTTP/3 SD compression (RFC 9842) | Browser support too thin May 2026 — defer to v0.3+ |
| New token tiers | Component tier still reserved; not impacted |

## Where the bytes come from

Mechanical decomposition of v0.1.0 `full.css`:

| Bucket | Size | % of full.css | After optimization |
| ------ | ---: | ------------: | ----------------- |
| Color × alpha permutations (`-bg-X/0`...`/100`) | ~3.0 MB | 38% | 0 — `color-mix()` runtime |
| Color × shade permutations (`-bg-X-50`...`-900`) | ~1.4 MB | 18% | 0 — relative color `oklch(from ...)` |
| Dark mode duplicates (`vds-dark:*`) | 0.5 MB (as separate file) | — | 0 — `light-dark()` |
| Responsive permutations (xs/sm/md/lg/xl/2xl/3xl × every util) | ~2.0 MB embedded + 3.7 MB sep | ~25% | container queries for layout; keep small set for OS-level |
| State permutations (hover/focus/active/disabled × every util) | ~1.2 MB embedded + 2.3 MB sep | ~15% | `@scope` + native pseudos |
| Base + reset + true tokens | ~0.4 MB | 5% | unchanged |

The 4 categories at top account for >90% of bloat. Each has a specific 2026 native-CSS replacement.

## Technique 1 — `@property` registration (perf, no size delta)

Register every leaf token as a typed custom property with `inherits: false` (except `line-height` family which must inherit). Delivers a ~9× recalc speedup on theme/token mutation by skipping subtree invalidation.

### Syntax map

| DTCG type | `syntax` | `inherits` |
| --------- | -------- | ---------- |
| `color` | `"<color>"` | `false` |
| `dimension` (spacing/sizing/radius/border-width) | `"<length>"` | `false` |
| `dimension` (fontSize, may be `clamp()` fluid) | `"<length-percentage>"` | `false` |
| `number` (lineHeight) | `"<number>"` | **`true`** |
| `number` (opacity, fontWeight, zIndex) | `"<number>"` | `false` |
| `time` (duration) | `"<time>"` | `false` |
| `cubicBezier` (easing) | `"*"` | `false` |
| `shadow` / `gradient` / composite | `"*"` | `false` |

### File placement

`@property` is a top-level at-rule. Registrations are global (not layered). Emit them in a dedicated file `dist/css/tokens.property.css` loaded **before** `core.css` and theme files. The actual `--vds-*: value` declarations stay inside `@layer vds-tokens` per existing decision.

```css
/* dist/css/tokens.property.css — no @layer wrapper */
@property --vds-color-primary {
  syntax: "<color>";
  inherits: false;
  initial-value: oklch(0.55 0.18 250);
}
@property --vds-spacing-4 {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}
@property --vds-line-height-base {
  syntax: "<number>";
  inherits: true;
  initial-value: 1.5;
}
```

### Gotchas

| Gotcha | Mitigation |
| ------ | ---------- |
| `initial-value` must be computationally independent — `3em` invalid because parent-relative | Use `rem`/`px`/absolute; build emits validated initial values from primitive token values |
| Invalid `@property` block silently dropped (any field wrong → whole rule discarded) | Build gate: every emitted `@property` must round-trip through `CSS.registerProperty` shim in test harness |
| Two `@property` for same name — last in source order wins | Single-file emit, deterministic order from primitive→semantic→theme |

### Browser support

Baseline Newly Available 2024-07-09 (Chrome 85+, Safari 16.4+, Firefox 128+). May 2026: Widely Available.

## Technique 2 — `color-mix()` for alpha utilities

Replace precomputed `vds-bg-primary/{0,5,10,15,20,25,30,40,50,60,70,75,80,90,95,100}` (16 alpha steps × N colors × {bg,text,border,fill,stroke}) with a single rule + custom property slot.

### Pattern A — Static utility class with embedded `color-mix()` (Tailwind v4 style)

```css
@layer vds-utilities {
  .vds-bg-primary\/50 {
    background-color: color-mix(in oklab, var(--vds-color-primary) 50%, transparent);
  }
  /* ... only emit alpha steps actually used; 16 → 4-6 typical via dashboard scan */
}
```

For the consumer-side filter pipeline (verobase already implements one), Pattern A still tree-shakes correctly because each `.X/Y` selector exists as a discrete rule.

### Pattern B — Custom-property opacity slot (power-user)

```css
@property --vds-bg-alpha {
  syntax: "<number>";
  inherits: false;
  initial-value: 1;
}
@layer vds-utilities {
  .vds-bg-primary {
    background-color: color-mix(
      in oklab,
      var(--vds-color-primary) calc(var(--vds-bg-alpha) * 100%),
      transparent
    );
  }
}
/* consumer override */
.my-button { --vds-bg-alpha: 0.5; }
```

verodesign emits Pattern A for shipped tokens and documents Pattern B as the escape hatch; consumers needing arbitrary alpha avoid permutation explosion.

### Color space rule

| Operation | Space | Reason |
| --------- | ----- | ------ |
| Alpha (mix with `transparent`) | **`in oklab`** | Rectangular coords keep chroma stable when one operand has chroma 0 |
| Tint (`color-mix(..., white X%)`) | **`in oklch`** | Polar interpolates hue along shortest arc |
| Shade (`color-mix(..., black X%)`) | **`in oklch`** | Same |
| Cross-hue gradient | **`in oklch longer hue`** | Explicit hue path for design intent |

### Performance

- Resolved at computed-value time and cached on computed style
- Token change invalidates only matched element's mix when `@property inherits: false` is in effect
- Per-resolution cost (sRGB → Oklab → mix → sRGB) is tens of nanoseconds — irrelevant vs DOM recalc
- No public benchmark of `color-mix()` parse cost vs precomputed `oklch()` literal; treated as equivalent for budgeting

## Technique 3 — Relative color for shade utilities

Replace precomputed `vds-bg-primary-{50,100,...,900}` with channel-precise relative-color emission.

```css
:root {
  --vds-color-primary: oklch(0.55 0.18 250);
}
@layer vds-utilities {
  .vds-bg-primary-50  { background-color: oklch(from var(--vds-color-primary) 0.97 calc(c * 0.3) h); }
  .vds-bg-primary-100 { background-color: oklch(from var(--vds-color-primary) 0.92 calc(c * 0.5) h); }
  /* ... 9 steps */
  .vds-bg-primary-900 { background-color: oklch(from var(--vds-color-primary) 0.20 c h); }
}
```

vs v0.1.0 which emitted N×9 precomputed colors per theme. With RCS, **one set of 9 rules** drives every brand token automatically. Theme switch only changes `--vds-color-primary`; ramps regenerate at computed-value time.

### Browser support

`oklch(from ...)` Baseline Widely Available since Dec 2024 (Firefox 128 was the gate; Chrome 119+, Safari 16.4+).

## Technique 4 — `light-dark()` theme collapse

Replace the dual-rule emission `[data-theme="X"][data-mode="light"] {...}` + `[data-theme="X"][data-mode="dark"] {...}` with a single `light-dark()` value per token.

```css
@layer base {
  :root              { color-scheme: light dark; }     /* respect OS by default */
  [data-mode="light"] { color-scheme: light; }          /* explicit override */
  [data-mode="dark"]  { color-scheme: dark; }
}

@layer vds-tokens {
  [data-theme="verobase"] {
    --vds-theme-bg-page:    light-dark(oklch(0.99 0 0),     oklch(0.15 0 0));
    --vds-theme-text-bright:light-dark(oklch(0.20 0 0),     oklch(0.95 0 0));
    --vds-theme-primary:    light-dark(oklch(0.32 0.07 250),oklch(0.75 0.14 250));
  }
}
```

### Effect

| File | v0.1.0 | v0.2.0 |
| ---- | ------ | ------ |
| `themes/verobase.css` | 14 KB (light + dark + media query duplication) | **≤ 8 KB** (single rule per token) |
| `utilities/dark-variants.css` | 496 KB (`vds-dark:bg-X` permutations) | **0** — toggle is now token-internal |

### Fallback

Pre-Chrome 123 / Firefox 120 / Safari 17.5 (released May 2024) cannot resolve `light-dark()`. May 2026: <0.5% global. If support needed, wrap in `@supports`:

```css
@supports not (color: light-dark(white, black)) {
  :root { /* emit legacy [data-mode] rules */ }
}
```

verodesign default: no fallback emit (Baseline-only). Add via `--legacy-light-dark` build flag if required.

### `data-mode="auto"`

Native: `:root { color-scheme: light dark }` already produces auto behavior. No JS needed for system-pref tracking; explicit `[data-mode]` overrides only when set.

## Technique 5 — `@layer` cascade

Existing decision: `@layer reset, vds-tokens, vds-utilities, components, overrides`. Implementation gap in v0.1.0 — emit doesn't fully wrap utility files. v0.2.0 enforces:

```css
/* Every emitted file declares its layer */
@layer reset { /* reset.css contents */ }
@layer vds-tokens { /* core.css, themes/*.css */ }
@layer vds-utilities { /* utilities/* */ }
```

Consumers can override without `!important`:

```css
@layer overrides {
  .my-button { background: my-color; }  /* always wins, no specificity hack */
}
```

Bundlers can drop entire layers (e.g., `@layer reset` removed when consumer brings own reset).

## Technique 6 — `@scope` for state variants

Replace the `state-variants.css` permutation (`hover|focus|focus-visible|active|disabled|first|last|odd|even × every utility`) with native pseudos inside scoped blocks.

### Before (v0.1.0 — 2.3 MB)

```css
@layer vds-utilities {
  .vds-hover\:bg-page:hover  { background: var(--vds-theme-bg-page); }
  .vds-focus\:bg-page:focus  { background: var(--vds-theme-bg-page); }
  /* × N states × M tokens */
}
```

### After (v0.2.0 — ≤ 100 KB)

```css
@layer vds-utilities {
  /* Keep ONLY the small set actually used in compiled apps;
     consumers compose pseudos inline via @scope */
  .vds-hover\:bg-primary:hover { background: var(--vds-theme-primary); }
}

/* New idiom: scope inside component CSS */
@scope (.vds-card) to (.vds-card-content) {
  :scope:hover { box-shadow: var(--vds-shadow-md); }
  button:focus-visible { outline: 2px solid var(--vds-theme-border-focus); }
}
```

### Strategy

- Emit a curated set of state utilities for high-frequency cases (hover/focus on bg/text/border for primary/accent/destructive only)
- For the long tail, document the `@scope` pattern in `consumer.md` and let consumers write component-local CSS
- Net effect: 2.3 MB → ≤ 100 KB and an idiom shift toward component-scoped CSS

### Browser support

`@scope` reached Baseline Newly Available 2026-01 (Firefox 146 closed gap). v0.2.0 ships with `@supports` fallback for the curated set:

```css
@supports not (selector(:scope)) {
  /* emit traditional .vds-hover:bg-primary:hover variant */
}
```

## Technique 7 — `@container` for responsive utilities

Replace `vds-{xs,sm,md,lg,xl,2xl,3xl}:*` viewport-prefixed permutations with container queries on component roots.

### Before (v0.1.0 — 3.7 MB)

```css
@media (min-width: 768px) {
  .vds-md\:flex { display: flex; }
  .vds-md\:grid-cols-12 { grid-template-columns: repeat(12, 1fr); }
  /* × 7 breakpoints × every layout utility */
}
```

### After (v0.2.0 — ≤ 200 KB)

```css
/* Components opt in via container-type */
@layer components {
  .vds-card { container-type: inline-size; container-name: card; }
}

/* Only viewport-bound layout (page chrome) keeps media queries */
@layer vds-utilities {
  @media (min-width: 768px) {
    .vds-md\:flex { display: flex; }     /* curated subset only */
  }
}

/* The bulk moves to container queries authored by consumers */
@container card (min-width: 30em) {
  :scope > .vds-flex-row { flex-direction: row; }
}
```

### What stays in media queries

- Top-level page chrome (header, sidebar, drawer thresholds)
- OS preferences: `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, `print`
- Anything where the container *is* the viewport

### What moves to container queries

- Component layout (card grids, modal width-aware variants, etc.)
- Component typography fluidity (`font-size: clamp(1rem, 4cqi, 1.5rem)`)

### Logical units

Use `cqi` (inline-size %) over `cqw`. Survives RTL and vertical writing modes. Ban `cqw`/`cqh` in emit; primitive tokens for fluid type use `cqi`/`cqb`.

## Technique 8 — Brotli-11 precompressed siblings

Emit `dist/utilities/full.css.br` and `dist/css/themes/{slug}.css.br` alongside originals at build time. Brotli quality 11 ratio: utility CSS at ~8% of source size. CDN with auto-detect (Vercel, Cloudflare Pages, Netlify) serves precompressed automatically when `Accept-Encoding: br` present.

### Build snippet

```js
// scripts/compress.mjs
import { brotliCompressSync, constants } from 'node:zlib';
import { readFileSync, writeFileSync } from 'node:fs';

const TARGETS = [
  'dist/css/core.css',
  'dist/css/themes/default.css',
  'dist/css/themes/veronex.css',
  'dist/css/themes/verobase.css',
  'dist/utilities/full.css',
];

for (const t of TARGETS) {
  const buf = readFileSync(t);
  const br = brotliCompressSync(buf, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  });
  writeFileSync(t + '.br', br);
}
```

### Single concatenated build

Per CSS Wizardry's "3 Cs" research (still authoritative in 2026), HTTP/3 multiplexing reduces but does not eliminate per-stream cost. Concatenating utility files for production yields ~16% better Brotli dictionary efficiency vs separate small files.

```
dist/
├── verodesign.full.css       # core + theme + utilities concatenated
├── verodesign.full.css.br    # Brotli-11 precompressed
```

Both shipped: split files for tree-shake builds, concatenated for production CDN.

### Shared dictionary compression (RFC 9842)

Cross-deploy delta encoding launched April 2026 (Cloudflare Phase 1 beta). Massive savings between releases (delta vs prior version). v0.2.0 does not adopt — Firefox not yet shipping. Reassess for v0.3+.

## Output structure (v0.2.0)

See [`outputs.md`](./outputs.md) for full file tree. Summary:

```
dist/
├── css/
│   ├── tokens.property.css        @property registrations (no @layer)
│   ├── reset.css
│   ├── core.css                   @layer vds-tokens, primitives
│   └── themes/
│       ├── default.css            light-dark() collapsed
│       ├── default.css.br
│       ├── veronex.css
│       ├── veronex.css.br
│       ├── verobase.css
│       └── verobase.css.br
├── utilities/
│   ├── full.css                   ≤ 1.5 MB raw
│   ├── full.css.br                ≤ 200 KB Brotli-11
│   ├── full.min.css
│   ├── by-category/               unchanged (per-category split)
│   └── plugins/                   tailwind/uno presets — unchanged
├── verodesign.full.css            new: concatenated production bundle
├── verodesign.full.css.br
├── types/                         unchanged
├── data/                          unchanged
└── theme-init.js                  removed (no longer needed — light-dark() handles auto)
```

### Removed

- `dist/utilities/dark-variants.css` (`light-dark()` makes it redundant)
- `dist/utilities/group-variants.css` (consumers compose via `@scope`; curated subset stays in `state-variants.css`)
- `dist/theme-init.js` (FOUC prevention now handled by native `color-scheme`)

## Migration phases

| Phase | Scope | Breaking? | CHANGELOG section |
| ----- | ----- | --------- | ----------------- |
| 1 — CDD | This doc + decisions + token/theme architecture updates | No | `[Unreleased]` Docs |
| 2 — `@property` + `@layer` enforcement | Add `tokens.property.css`, wrap all emit in declared layers | No | `[Unreleased]` Added |
| 3 — `light-dark()` themes | Collapse `themes/{slug}.css` to single light-dark emission. Delete `dark-variants.css`. | **Yes** — `vds-dark:*` classes removed | `[Unreleased]` Changed / Removed |
| 4 — `color-mix()` + RCS shade ramps | Replace alpha permutations + emit RCS-driven shade ramps | **Yes** — exact computed values may shift fractionally (within JND) | `[Unreleased]` Changed |
| 5 — `@scope` + `@container` | Curate state-variants subset; replace responsive permutations with container-query primitives | **Yes** — most `vds-{state}:*` and `vds-{breakpoint}:*` permutations removed | `[Unreleased]` Removed |
| 6 — Brotli-11 + concatenated bundle | Build emits `.br` siblings + `verodesign.full.css` | No | `[Unreleased]` Added |

Phases 1–2 land first as non-breaking foundation. Phases 3–5 ship together as the v0.2.0 breaking release. Phase 6 finalizes.

## Validation strategy

### Visual parity gate

Every phase that changes computed CSS values runs a screenshot diff harness against a reference set (verobase + veronex sample pages × light + dark mode × Chrome + Firefox + Safari). Threshold: **per-pixel ΔE2000 < 1.0** in OKLCH (just-noticeable-difference). Bail if exceeded.

### Token recalc benchmark

Headless Chrome script changes `--vds-theme-primary` on `:root` and measures `Performance.measureUserAgentSpecificMemory()` + style-recalc duration via Performance Observer. Pass: **median recalc < 1 ms** post-`@property` (currently ~9 ms baseline).

### Bundle size gate

Build aborts when `dist/utilities/full.css.br` exceeds **200 KB**. Hard cap on regression.

### Lighthouse CI

Per-theme rendered page hits **Performance ≥ 95** at `slow-4G` profile. CSS-related metrics (FCP, LCP) tracked.

## Risks and rollback

| Risk | Mitigation | Rollback |
| ---- | ---------- | -------- |
| `@property inherits:false` breaks intentional inheritance | Audit list per token type; lineHeight family explicitly marked `inherits:true` | Drop to plain custom property; no consumer-facing change |
| `light-dark()` fallback gap on Safari 17.4 | <0.5% global May 2026; build flag `--legacy-light-dark` regenerates `[data-mode]` rules | Re-enable flag |
| Visual regression on shade ramps from RCS approximation | Per-step ΔE2000 gate at build | Pin specific steps to precomputed values; emit hybrid table |
| Container-query adoption requires consumer code changes | Migration guide + lint rule (`vds-md:` → `@container`) | Keep curated breakpoint subset as utility classes |
| Concatenated bundle invalidates per-deploy if any token changes | Use shared dictionary compression once Firefox ships (v0.3+) | Brotli-11 alone covers v0.2.0 |
| `@scope` cascade-proximity surprises consumers | Document explicitly in `consumer.md`; deny-list in lint | Revert curated state-variants subset |

## References

- [@property performance benchmark — web.dev (Oct 2024)](https://web.dev/blog/at-property-performance) — `inherits: false` 214,110 runs/sec vs 252 runs/sec
- [@property MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property)
- [color-mix() MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix)
- [Relative color syntax — Chrome Developers](https://developer.chrome.com/blog/css-relative-color-syntax)
- [light-dark() — web.dev (May 2024)](https://web.dev/articles/light-dark)
- [@scope CSS at-rule — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope) — Baseline Newly Available 2026-01
- [Limit selector reach with @scope — Chrome Developers](https://developer.chrome.com/docs/css-ui/at-scope)
- [@container queries — web.dev Learn](https://web.dev/learn/css/container-queries)
- [Container query units cqi/cqb — CSS-Tricks](https://css-tricks.com/container-query-units-cqi-and-cqb/)
- [Cascade Layers Guide — CSS-Tricks](https://css-tricks.com/css-cascade-layers/)
- [Tailwind CSS v4.0 release notes](https://tailwindcss.com/blog/tailwindcss-v4) — first major DS shipping `@property` + `color-mix()` end-to-end
- [Cranking Brotli up to 11 — Cloudflare Pro guide](https://nooshu.com/blog/2025/01/05/cranking-brotli-up-to-11-with-cloudflare-pro-and-11ty/)
- [The 3 Cs — CSS Wizardry](https://csswizardry.com/2023/10/the-three-c-concatenate-compress-cache/)
- [DTCG specification first stable version](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [Style Dictionary v5 migration](https://styledictionary.com/versions/v5/migration/)
- [Open Props v2 beta](https://www.npmjs.com/package/open-props/v/2.0.0-beta.1)
- [OKLCH in CSS — Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
