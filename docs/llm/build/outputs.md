# Build Outputs

> CDD Layer 2 — `dist/*` file specifications | **Last Updated**: 2026-05-02

Master decisions: [`../decisions.md`](../decisions.md). Optimization architecture: [`./optimization.md`](./optimization.md).

## Output tree (v0.2.0)

```
dist/
├── css/
│   ├── tokens.property.css        @property registrations (no @layer wrapper)
│   ├── reset.css                  @layer reset { modern-normalize + minimal additions }
│   ├── core.css                   @layer vds-tokens { primitives + semantic schema }
│   └── themes/
│       ├── default.css            light-dark() collapsed; @layer vds-tokens
│       ├── default.css.br         Brotli-11 precompressed sibling
│       ├── veronex.css
│       ├── veronex.css.br
│       ├── verobase.css
│       └── verobase.css.br
├── utilities/
│   ├── full.css                   ≤ 1.5 MB raw — all utility classes (less perms; see below)
│   ├── full.css.br                ≤ 200 KB Brotli-11
│   ├── full.min.css               LightningCSS minified
│   ├── full.min.css.br
│   ├── core.css                   core slot group only
│   ├── core.css.br
│   ├── web.css                    web slot group only
│   ├── web.css.br
│   ├── state-variants.css         curated subset (≤ 100 KB) — @supports fallback included
│   ├── state-variants.css.br
│   ├── responsive.css             curated subset for OS prefs + page chrome (≤ 200 KB)
│   ├── responsive.css.br
│   ├── by-category/               unchanged: per-category split for tree-shake builds
│   │   ├── color.css
│   │   ├── spacing.css
│   │   └── ...
│   └── plugins/
│       ├── unocss-preset.js       UnoCSS preset (JIT mode)
│       └── tailwind-plugin.js     Tailwind plugin (legacy migration)
├── verodesign.full.css            production-grade concatenated bundle (reset + tokens.property + core + active-theme + utilities/full)
├── verodesign.full.css.br         Brotli-11 — first-paint target ≤ 50 KB Brotli-11
├── animations.css                 @keyframes only — split for app-controlled motion budgets
├── animations.css.br
├── types/
│   ├── tokens.d.ts                token name TS unions (incl. registered @property type info)
│   └── utilities.d.ts             utility class TS unions (post-optimization, fewer permutations)
├── data/
│   ├── tokens.json                flat token map (per theme/mode)
│   ├── contrast-report.json       WCAG audit per pair per theme per mode
│   ├── size-report.json           v0.2+ — file sizes + Brotli sizes per build
│   ├── recalc-report.json         v0.2+ — token recalc benchmark per build
│   └── visual-parity-report.json  v0.2+ — ΔE2000 sample diffs per theme/mode
└── cli/
    └── vds.js                     CLI entry (vds + verodesign bin)
```

### Removed in v0.2.0

| File | Replaced by |
| ---- | ----------- |
| `dist/utilities/dark-variants.css` | `light-dark()` inside theme tokens — toggle is token-internal |
| `dist/utilities/group-variants.css` | `@scope` blocks authored by consumers; curated set in `state-variants.css` |
| `dist/theme-init.js` | Native `color-scheme: light dark` declaration on `:root` (no FOUC script needed) |

## File specs

### `dist/css/tokens.property.css` (NEW v0.2.0)

`@property` registrations for every leaf token. Top-level (NOT inside `@layer`) per CSS Properties and Values spec. Loaded before `core.css` and any theme file.

```css
/* Auto-generated. Do not edit. */
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
@property --vds-shadow-md {
  syntax: "*";
  inherits: false;
}
/* ... per-token, generated from primitive + semantic + theme tier values */
```

### `dist/css/reset.css`

```css
@layer reset {
  @import "modern-normalize";
  *, *::before, *::after { box-sizing: border-box; }
  /* + minimal additions per decisions.md */
}
```

### `dist/css/core.css`

Primitives + semantic slot definitions. Theme-agnostic. Required by all themes.

```css
@layer vds-tokens {
  :root {
    color-scheme: light dark;

    /* primitives — sRGB hex fallback then OKLCH */
    --vds-color-slate-1: #f8f9fa;
    --vds-color-slate-1: oklch(98% 0 240);
    /* ... */

    /* semantic slot stubs (overridden by theme files) */
    --vds-theme-bg-page: oklch(98% 0 0);
    /* ... */
  }
  [data-mode="light"] { color-scheme: light; }
  [data-mode="dark"]  { color-scheme: dark; }
}
```

### `dist/css/themes/{theme}.css`

Per-theme CSS. Light + dark **collapsed via `light-dark()`** into a single emission. Dependencies: `tokens.property.css`, `core.css`.

```css
@layer vds-tokens {
  :root,
  [data-theme="veronex"] {
    --vds-theme-bg-page: light-dark(
      oklch(0.98 0.005 145),
      oklch(0.10 0.005 145)
    );
    --vds-theme-text-primary: light-dark(
      oklch(0.20 0.01 145),
      oklch(0.95 0.01 145)
    );
    --vds-theme-primary: light-dark(
      oklch(0.30 0.06 150),
      oklch(0.72 0.16 165)
    );
    /* ... */
  }
}

/* Optional fallback for browsers without light-dark() — emitted only when --legacy-light-dark flag set */
@supports not (color: light-dark(white, black)) {
  /* legacy [data-mode] dual emission */
}
```

### `dist/utilities/full.css`

Token-driven utility classes from active slot groups. v0.2.0 contains:

- **Base utilities** (one rule per token): `vds-bg-primary`, `vds-text-bright`, `vds-p-4`, `vds-rounded-md`, etc.
- **Alpha utilities** via `color-mix(in oklab, ..., transparent)` — emitted only for actually-used alpha steps (manifest-driven from consumer scan)
- **Shade utilities** via `oklch(from var(--token) ...)` — full 50/100/.../900 ramp, RCS-driven
- **Curated state variants**: hover/focus/focus-visible/active/disabled on bg/text/border for primary/accent/destructive/success/warning/info tokens — long tail moves to `@scope`
- **Curated responsive variants**: viewport-bound layout primitives only — component-scope moves to `@container`

```css
@layer vds-utilities {
  /* base — token reference */
  .vds-bg-page { background-color: var(--vds-theme-bg-page); }
  .vds-bg-primary { background-color: var(--vds-theme-primary); }
  .vds-text-primary { color: var(--vds-theme-primary); }
  .vds-p-4 { padding: var(--vds-spacing-4); }
  .vds-rounded-md { border-radius: var(--vds-radius-md); }

  /* alpha — color-mix() runtime */
  .vds-bg-primary\/50 {
    background-color: color-mix(in oklab, var(--vds-theme-primary) 50%, transparent);
  }

  /* shade — relative color syntax */
  .vds-bg-primary-50 { background-color: oklch(from var(--vds-theme-primary) 0.97 calc(c * 0.3) h); }
  .vds-bg-primary-100 { background-color: oklch(from var(--vds-theme-primary) 0.92 calc(c * 0.5) h); }
  /* ... 9 steps */

  /* curated state — kept for high-frequency cases */
  .vds-hover\:bg-primary:hover { background-color: var(--vds-theme-primary); }

  /* curated responsive — viewport-bound only (page chrome) */
  @media (min-width: 768px) {
    .vds-md\:flex { display: flex; }
  }
}
```

### `dist/utilities/state-variants.css`

Curated subset. Long tail is consumer-authored via `@scope`. Includes `@supports` fallback for `@scope` itself when used elsewhere.

```css
@layer vds-utilities {
  /* High-frequency: hover/focus/focus-visible/active/disabled on bg/text/border for tier-1 tokens */
  .vds-hover\:bg-primary:hover { background-color: var(--vds-theme-primary); }
  .vds-focus-visible\:ring-primary:focus-visible {
    outline: 2px solid var(--vds-theme-primary);
    outline-offset: 2px;
  }
  /* ... */
}
```

### `dist/utilities/responsive.css`

Curated subset. Component-scoped responsiveness migrates to `@container` (consumer-authored).

```css
@layer vds-utilities {
  /* Viewport-bound layout — page chrome thresholds only */
  @media (min-width: 768px) {
    .vds-md\:block { display: block; }
    .vds-md\:flex { display: flex; }
    .vds-md\:hidden { display: none; }
  }
  @media (min-width: 1024px) {
    .vds-lg\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
    /* ... */
  }
  /* OS preferences */
  @media (prefers-reduced-motion: reduce) {
    /* curated set */
  }
}
```

### `dist/utilities/{group}.css`

Per-slot-group utilities. Use when consumer wants minimal subset.

| File | Contains |
| ---- | -------- |
| `utilities/core.css` | Core slot group utilities (color, spacing, radius, typography, shadow, animation, opacity, border) |
| `utilities/web.css` | Web slot group utilities (responsive prefixes from breakpoints, z-index utilities) |
| `utilities/full.css` | All active slot groups combined |

### `dist/utilities/by-category/*`

Per-category split. Unchanged from v0.1.0 — used by tree-shake build pipelines (e.g., verobase's `filter-vds-css.mjs`).

### `dist/verodesign.full.css` (NEW v0.2.0)

Production-grade concatenated bundle. Includes:

```
1. tokens.property.css        @property registrations (top-level)
2. @layer declaration:        @layer reset, vds-tokens, vds-utilities, components, overrides;
3. reset.css contents
4. core.css contents
5. {default-or-active}.css     theme — selectable via build flag --bundle-theme
6. utilities/full.css contents
```

Designed for CDN delivery where one Brotli-compressed file beats many small files (per CSS Wizardry's "3 Cs" rule, dictionary efficiency favors larger inputs). Brotli-11 sibling `verodesign.full.css.br` ships alongside.

### `dist/utilities/plugins/unocss-preset.js`

UnoCSS preset for JIT-mode utility generation. Unchanged.

```js
// uno.config.ts
import { presetVerodesign } from '@verobee/design/uno-preset'
export default { presets: [presetVerodesign({ theme: 'veronex' })] }
```

### `dist/utilities/plugins/tailwind-plugin.js`

Tailwind plugin for legacy projects mid-migration. Unchanged.

### `dist/types/tokens.d.ts`

```typescript
// Includes @property type info for editor tooling
export type ColorToken =
  | '--vds-theme-bg-page'
  | '--vds-theme-primary'
  /* ... */;

export type LengthToken = `--vds-spacing-${number}` | `--vds-radius-${'sm'|'md'|'lg'}`;
export type NumberToken = '--vds-line-height-base' | '--vds-opacity-disabled';

export interface RegisteredProperty {
  name: ColorToken | LengthToken | NumberToken;
  syntax: '<color>' | '<length>' | '<number>' | '<time>' | '*';
  inherits: boolean;
  initialValue: string;
}

export const registeredProperties: ReadonlyArray<RegisteredProperty>;
```

### `dist/types/utilities.d.ts`

```typescript
export type UtilityClass =
  | 'vds-bg-page'
  | 'vds-bg-primary'
  | `vds-bg-primary\/${5|10|15|20|25|30|40|50|60|70|75|80|90|95|100}`  // alpha steps actually emitted
  | `vds-bg-primary-${50|100|200|300|400|500|600|700|800|900}`           // shade ramp
  | 'vds-text-primary'
  | `vds-p-${number}`
  /* ... */;
```

### `dist/data/tokens.json`

Flat token map per theme. v0.2.0 emits **resolved** light-dark pairs since `light-dark()` is the canonical CSS form:

```json
{
  "veronex": {
    "--vds-theme-bg-page": {
      "light": "oklch(0.98 0.005 145)",
      "dark":  "oklch(0.10 0.005 145)",
      "css":   "light-dark(oklch(0.98 0.005 145), oklch(0.10 0.005 145))"
    },
    "--vds-theme-primary": { "light": "...", "dark": "...", "css": "..." }
  }
}
```

### `dist/data/contrast-report.json`

```json
{
  "veronex": {
    "light": {
      "theme.text.primary on theme.bg.page": { "ratio": 14.4, "required": "AAA", "pass": true }
    },
    "dark": { /* ... */ }
  }
}
```

### `dist/data/size-report.json` (NEW v0.2.0)

Per-build size telemetry. Build aborts when any file exceeds 1.2× cap.

```json
{
  "buildId": "2026-05-02T...",
  "files": {
    "dist/utilities/full.css": { "raw": 1387264, "brotli11": 178432, "cap": { "raw": 1572864, "brotli11": 204800 } },
    "dist/css/themes/verobase.css": { "raw": 7456, "brotli11": 1820, "cap": { "raw": 8192, "brotli11": 2048 } }
  },
  "firstPaintBundleBrotli": 47104,
  "firstPaintCap": 51200
}
```

### `dist/data/recalc-report.json` (NEW v0.2.0)

Headless-Chrome benchmark of token mutation cost (changing `--vds-theme-primary` on `:root`).

```json
{
  "buildId": "2026-05-02T...",
  "samples": 100,
  "median_ms": 0.42,
  "p95_ms": 0.81,
  "cap_ms": 1.0
}
```

### `dist/data/visual-parity-report.json` (NEW v0.2.0)

ΔE2000 diffs vs reference render set. Build aborts if any sample exceeds JND threshold.

```json
{
  "buildId": "2026-05-02T...",
  "threshold_dE2000": 1.0,
  "samples": [
    { "page": "verobase/dashboard", "theme": "verobase", "mode": "dark", "max_dE": 0.34, "median_dE": 0.08, "pass": true }
  ]
}
```

### `dist/cli/vds.js`

CLI entry point for `vds` and `verodesign` bins. Commands:

```bash
vds build [--theme <theme>] [--out <dir>] [--legacy-light-dark]   # rebuild with options
vds build-theme --light <file> --dark <file> --name <slug>        # external theme
vds validate                                                        # run all gates
vds audit-contrast [--theme <theme>]                                # WCAG audit
vds audit-recalc [--samples <n>]                                    # token recalc benchmark (v0.2+)
vds audit-visual --reference-dir <dir>                              # ΔE2000 parity (v0.2+)
vds compress                                                        # emit .br siblings (v0.2+)
vds promote-pattern <pattern-slug>                                  # experimental → canonical
```

## Git tracking

| File | Tracked? |
| ---- | -------- |
| `dist/css/*` | YES |
| `dist/utilities/*` | YES |
| `dist/types/*` | YES |
| `dist/data/*` | YES |
| `dist/cli/*` | YES |
| `dist/*.css.br` | YES (precompressed, deterministic) |
| `dist/verodesign.full.css*` | YES |

`dist/` committed because consumers install via `github:beegy-labs/verodesign#v0.x.y` — they never run the build themselves.

## File size caps (v0.2.0)

| File | Raw cap | Brotli-11 cap |
| ---- | ------- | ------------- |
| `css/core.css` | 8 KB | 2 KB |
| `css/tokens.property.css` | 12 KB | 3 KB |
| `css/themes/{theme}.css` | 8 KB | 2 KB |
| `utilities/full.css` | 1.5 MB | 200 KB |
| `utilities/core.css` | 800 KB | 110 KB |
| `utilities/state-variants.css` | 100 KB | 18 KB |
| `utilities/responsive.css` | 200 KB | 32 KB |
| `verodesign.full.css` (concatenated) | 2.0 MB | 250 KB |
| `types/tokens.d.ts` | 5 KB | — |

Build aborts when any file exceeds 1.2× cap. Tracked in `dist/data/size-report.json` per build.
