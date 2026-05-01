# Build Outputs

> CDD Layer 2 — `dist/*` file specifications | **Last Updated**: 2026-04-30

## Output tree

```
dist/
├── css/
│   ├── core.css                       primitives + semantic schema (theme-agnostic)
│   ├── reset.css                      modern-normalize + minimal additions
│   └── themes/
│       ├── default.css                default theme (light + dark)
│       ├── veronex.css                veronex theme
│       └── verobase.css               verobase theme
├── utilities/
│   ├── full.css                       all utility classes pre-built
│   ├── core.css                       core slot group utilities only
│   ├── web.css                        web slot group utilities only
│   └── plugins/
│       ├── unocss-preset.js           UnoCSS preset (JIT mode)
│       └── tailwind-plugin.js         Tailwind plugin (legacy migration)
├── types/
│   ├── tokens.d.ts                    token name TS unions
│   └── utilities.d.ts                 utility class TS unions
├── data/
│   ├── tokens.json                    flat token map (per theme/mode)
│   └── contrast-report.json           WCAG audit per pair per theme per mode
├── theme-init.js                      FOUC prevention snippet
└── cli/
    └── vds.js                         CLI entry (vds + verodesign bin)
```

## File specs

### `dist/css/core.css`

Primitives + semantic slot definitions. Theme-agnostic. Required by all themes.

```css
@layer vds-tokens {
  :root {
    /* primitives */
    --vds-color-slate-1: oklch(98% 0 240);
    /* ... */

    /* semantic slot stubs (overridden by theme files) */
    --vds-theme-bg-page: oklch(98% 0 0);
    /* ... */
  }
}
```

### `dist/css/reset.css`

Optional opinionated reset.

```css
@layer reset {
  @import "modern-normalize";
  *, *::before, *::after { box-sizing: border-box; }
  /* + minimal additions per decisions.md */
}
```

### `dist/css/themes/{theme}.css`

Per-theme CSS. Light + dark modes combined. Dependencies: `core.css`.

```css
@layer vds-tokens {
  :root, [data-theme="veronex"]:not([data-mode]),
  [data-theme="veronex"][data-mode="light"] {
    --vds-theme-bg-page: oklch(98% 0.005 145);
    /* ... */
  }
  [data-theme="veronex"][data-mode="dark"] { /* ... */ }
  @media (prefers-color-scheme: dark) {
    [data-theme="veronex"]:not([data-mode]) { /* ... */ }
  }
}
```

### `dist/utilities/full.css`

All utility classes from active slot groups.

```css
@layer vds-utilities {
  .vds-bg-page { background-color: var(--vds-theme-bg-page); }
  .vds-bg-primary { background-color: var(--vds-theme-primary); }
  .vds-text-primary { color: var(--vds-theme-text-primary); }
  .vds-p-4 { padding: var(--vds-spacing-4); }
  .vds-rounded-md { border-radius: var(--vds-radius-md); }
  /* responsive variants */
  @media (min-width: 768px) {
    .md\:vds-bg-page { background-color: var(--vds-theme-bg-page); }
  }
  /* ... */
}
```

### `dist/utilities/{group}.css`

Per-slot-group utilities. Use when consumer wants minimal subset.

| File | Contains |
| ---- | -------- |
| `utilities/core.css` | Core slot group utilities (color, spacing, radius, typography, shadow, animation, opacity, border) |
| `utilities/web.css` | Web slot group utilities (responsive prefixes from breakpoints, z-index utilities) |
| `utilities/full.css` | All active slot groups combined |

### `dist/utilities/plugins/unocss-preset.js`

UnoCSS preset for JIT-mode utility generation.

```js
// uno.config.ts
import { presetVerodesign } from '@verobee/design/uno-preset'
export default { presets: [presetVerodesign({ theme: 'veronex' })] }
```

### `dist/utilities/plugins/tailwind-plugin.js`

Tailwind plugin for legacy projects mid-migration. Maps Tailwind utilities to verodesign tokens.

```js
// tailwind.config.js
const verodesign = require('@verobee/design/tailwind-plugin')
module.exports = { plugins: [verodesign({ theme: 'veronex' })] }
```

### `dist/types/tokens.d.ts`

```typescript
export type ThemeToken =
  | '--vds-theme-bg-page'
  | '--vds-theme-bg-card'
  | '--vds-theme-text-primary'
  /* ... */;

export type RadiusToken = '--vds-radius-sm' | '--vds-radius-md' | '--vds-radius-lg';
export type SpacingToken = `--vds-spacing-${number}`;
export const themeTokens: ReadonlyArray<ThemeToken>;
```

### `dist/types/utilities.d.ts`

```typescript
export type UtilityClass =
  | 'vds-bg-page'
  | 'vds-bg-card'
  | 'vds-text-primary'
  | `vds-p-${number}`
  /* ... */;
```

### `dist/data/tokens.json`

```json
{
  "veronex": {
    "light": { "--vds-theme-bg-page": "oklch(98% 0.005 145)", "--vds-theme-primary": "..." },
    "dark":  { "--vds-theme-bg-page": "oklch(8% 0.005 145)",  "--vds-theme-primary": "..." }
  },
  "verobase": { "light": { /* ... */ }, "dark": { /* ... */ } },
  "default":  { "light": { /* ... */ }, "dark": { /* ... */ } }
}
```

### `dist/data/contrast-report.json`

```json
{
  "veronex": {
    "light": {
      "theme.text.primary on theme.bg.page": { "ratio": 14.4, "required": "AAA", "pass": true },
      "theme.primary on theme.bg.page":      { "ratio":  9.1, "required": "AAA", "pass": true }
    },
    "dark": { /* ... */ }
  }
}
```

Always emitted, even on success. Audit trail per release.

### `dist/theme-init.js`

```js
(function() {
  var stored = localStorage.getItem('vds:theme');
  var theme = stored || 'default';
  document.documentElement.setAttribute('data-theme', theme);
})();
```

Inline `<script>` before consumer code to prevent FOUC.

### `dist/cli/vds.js`

CLI entry point for `vds` and `verodesign` bins. Commands:

```bash
vds build [--theme <theme>] [--out <dir>]      # rebuild with options
vds build-theme --light <file> --dark <file> --name <slug> --out <file>   # external theme
vds validate                                    # run validation only
vds audit-contrast [--theme <theme>]            # contrast audit
vds promote-pattern <pattern-slug>              # experimental → canonical
```

## Git tracking

| File | Tracked? |
| ---- | -------- |
| `dist/css/*` | YES |
| `dist/utilities/*` | YES |
| `dist/types/*` | YES |
| `dist/data/*` | YES |
| `dist/theme-init.js` | YES |
| `dist/cli/*` | YES |

`dist/` committed because consumers install via `github:beegy-labs/verodesign#v0.x.y` — they never run the build themselves.

## File size targets

| File | Gzip target |
| ---- | ----------- |
| `css/core.css` | ≤ 4 KB |
| `css/themes/{theme}.css` | ≤ 6 KB per theme |
| `utilities/full.css` | ≤ 25 KB |
| `utilities/core.css` | ≤ 18 KB |
| `types/tokens.d.ts` | ≤ 3 KB |

Build aborts (warning) if any file exceeds 1.5x target.
