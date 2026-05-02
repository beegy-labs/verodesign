# Theme System

> CDD Layer 2 — Theme as orthogonal binding layer | **Last Updated**: 2026-04-30

## Concept

Theme = JSON file binding semantic slots → primitive references. Theme is NOT a tier; it's an orthogonal dimension to the tier model.

| Same across themes | Different per theme |
| ------------------ | ------------------- |
| Semantic slot names (`theme.bg.page`, `theme.primary`, ...) | Primitive bindings |
| CSS Variable names in output | CSS Variable values |
| Slot count and types | Brand concept and color choices |

Brand is one expression of theme; light/dark is another. Multiple themes can share a brand identity (e.g., `veronex-compact`, `veronex-spacious` if density were ever added).

## Themes shipped at v0.1.0

| Theme | Concept | Light primary (OKLCH) | Dark primary (OKLCH) |
| ----- | ------- | --------------------- | -------------------- |
| default | Universal blue | `oklch(55% 0.18 250)` | `oklch(70% 0.16 250)` |
| veronex | Verde Nexus | `oklch(30% 0.06 150)` Deep Ivy | `oklch(72% 0.16 165)` Bio-Emerald |
| verobase | Vero Base | `oklch(32% 0.07 250)` Deep Navy | `oklch(75% 0.14 250)` Electric Blue |

## File layout

```
tokens/
├── primitive/           shared raw values (brand-agnostic)
│   ├── color.json       OKLCH 12-hue × 12-step
│   ├── spacing.json
│   ├── radius.json
│   ├── typography.json
│   ├── shadow.json
│   ├── animation.json
│   └── opacity.json
├── semantic/            slot definitions (brand-agnostic schema)
│   ├── core.json        cross-platform slots
│   └── web.json         web-only slots
├── themes/              binding files (1 per theme per mode)
│   ├── default-light.json
│   ├── default-dark.json
│   ├── veronex-light.json
│   ├── veronex-dark.json
│   ├── verobase-light.json
│   └── verobase-dark.json
└── experimental/        isolated tokens (status: experimental)
```

## Theme file structure

```json
{
  "$extensions": {
    "verobee": {
      "implements": ["core", "web"],
      "mode": ["light"]
    }
  },
  "theme": {
    "bg": {
      "page": {
        "$value": "{color.slate.2}",
        "$type": "color"
      }
    },
    "primary": {
      "$value": "{color.blue.7}",
      "$type": "color",
      "$description": "Brand primary. AAA against bg.page."
    }
  }
}
```

## Mode handling (v0.2.0+: `light-dark()`)

Each theme provides one file per mode (light, dark). Build collapses them via `light-dark()` — single declaration per token, automatic OS-pref tracking, no JS theme-init script needed. Decision lock: [`../decisions.md#performance--size-optimization-v020`](../decisions.md). Architecture: [`../build/optimization.md#technique-4--light-dark-theme-collapse`](../build/optimization.md).

### Emit pattern

```css
@layer base {
  :root              { color-scheme: light dark; }   /* respect OS by default */
  [data-mode="light"] { color-scheme: light; }        /* explicit user override */
  [data-mode="dark"]  { color-scheme: dark; }
  [data-mode="auto"]  { color-scheme: light dark; }   /* explicit "follow OS" */
}

@layer vds-tokens {
  :root,
  [data-theme="default"] {
    --vds-theme-bg-page: light-dark(
      oklch(0.98 0 0),
      oklch(0.10 0 0)
    );
    --vds-theme-text-primary: light-dark(
      oklch(0.20 0 0),
      oklch(0.95 0 0)
    );
    --vds-theme-primary: light-dark(
      oklch(0.55 0.18 250),
      oklch(0.70 0.16 250)
    );
    /* ... every theme.* slot */
  }
}
```

### Why `light-dark()` over dual `[data-mode]` blocks

- One declaration per token instead of two — themes file ~50% smaller (14 KB → ≤ 8 KB)
- `dark-variants.css` (496 KB) becomes redundant — token automatically toggles when `color-scheme` resolves
- Native auto behavior — no JS theme-init script needed for FOUC prevention
- Explicit override still works via `[data-mode]` selector (writes `color-scheme`, not the token)

### Browser support

`light-dark()`: Chrome 123 / Edge 123 / Firefox 120 / Safari 17.5 — Baseline Newly Available 2024-05-13. As of May 2026 it has crossed the 30-month threshold to **Baseline Widely Available**.

### Fallback (optional)

For browsers older than Safari 17.4: build flag `--legacy-light-dark` regenerates dual-rule emission inside `@supports not (color: light-dark(white, black))`. Default off (Baseline-only emit).

### Subtree theming

`color-scheme` cascades to descendants. To force a region to a specific mode regardless of root:

```html
<aside style="color-scheme: dark">
  <!-- light-dark() inside resolves to dark branch -->
</aside>
```

### 3+ modes (high-contrast etc.)

`light-dark()` only handles two. For high-contrast, sepia, or brand-specific contrast modes, layer additional `[data-theme]` overrides:

```css
[data-theme="hc-light"] {
  color-scheme: light;
  --vds-theme-bg-page: white;
  --vds-theme-text-primary: black;
}
```

## Adding a new theme

| Step | Action |
| ---- | ------ |
| 1 | Copy `tokens/themes/_template-light.json` and `_template-dark.json` |
| 2 | Rename to `{slug}-light.json`, `{slug}-dark.json` |
| 3 | Set `$extensions.verobee.implements` |
| 4 | Fill all required semantic slots (build gate enforces parity) |
| 5 | Set OKLCH brand colors |
| 6 | Run `npm run build` — schema parity + WCAG validates |
| 7 | If pass: theme is shipped. Document in `decisions.md` themes table |
| 8 | Tag minor release (`vX.Y+1.0`) |

Workflow: [`.add/theme-add.md`](../../.add/theme-add.md).

## External theme creation (OSS users)

External users build their own theme without forking:

```bash
# 1. Create theme JSON (copy template)
cp node_modules/@verobee/design/tokens/themes/_template-light.json my-theme-light.json
cp node_modules/@verobee/design/tokens/themes/_template-dark.json my-theme-dark.json

# 2. Edit values

# 3. Build via CLI
npx vds build-theme \
  --light my-theme-light.json \
  --dark my-theme-dark.json \
  --name my-theme \
  --out ./public/my-theme.css

# 4. Use
# @import "./my-theme.css";
```

CLI handles same validation gates (DTCG, parity, WCAG). External theme is a peer to shipped themes.

## Schema parity check (build gate)

Build aborts if any theme misses a slot from the slot groups it declares to implement.

```
[parity] FAIL veronex-light: missing slot theme.status.warning (group: core)
[parity] FAIL verobase-dark: missing slot theme.text.faint (group: core)

Build aborted. Add missing slots or remove from implements.
```

## Multi-theme runtime switch

```html
<!-- Static (build-time) -->
<link rel="stylesheet" href="@verobee/design/css/themes/veronex.css">

<!-- Runtime (import all desired themes, switch via attribute) -->
<link rel="stylesheet" href="@verobee/design/css/themes/veronex.css">
<link rel="stylesheet" href="@verobee/design/css/themes/verobase.css">
<html data-theme="veronex">
  <script>
    document.documentElement.setAttribute('data-theme', userPref);
  </script>
</html>
```

## Theme + mode combinations (matrix output)

| Theme \ Mode | light | dark |
| ------------ | ----- | ---- |
| default | `:root, [data-theme="default"]:not([data-mode]), [data-theme="default"][data-mode="light"]` | `[data-theme="default"][data-mode="dark"]`, media query when no mode set |
| veronex | same pattern | same |
| verobase | same pattern | same |

## Brand vs theme nomenclature

| Term | Meaning in this system |
| ---- | ---------------------- |
| Theme | JSON file producing one CSS output (`{theme}.css`) |
| Brand | Conceptual identity tag (Verde Nexus, Vero Base) — usually 1:1 with theme |
| Mode | Variant within a theme (light, dark, future high-contrast) |
| Slot group | Semantic schema partition (core, web, ...) |
