# Token Architecture

> CDD Layer 2 — 3-tier token model | **Last Updated**: 2026-04-30

Master decisions: [`../decisions.md`](../decisions.md).

## Tier model

| Tier | Source | Reference target | Brand-aware | Status |
| ---- | ------ | ---------------- | ----------- | ------ |
| 1 primitive | `tokens/primitive/*.json` | none (raw OKLCH/dimension) | NO | active |
| 2 semantic | `tokens/semantic/*.json` | primitive only | NO (schema only) | active |
| 3 component | (in `@verobee/design-react` future) | semantic only | optional | reserved |

Strict rule: never reference upward (component never references primitive directly).

## Theme — orthogonal binding

Theme is NOT a tier. Theme = JSON file binding semantic slots → primitive references.

```
                  THEMES (orthogonal)
              default / veronex / verobase / ...
                       │ binds
                       ▼
        ┌──────────────────┐    ┌──────────────────┐
        │ Tier 1 primitive │ ←─ │ Tier 2 semantic  │
        │  raw OKLCH       │    │  slot definitions│
        └──────────────────┘    └──────────────────┘
```

Each theme provides values for the same semantic schema.

## Slot groups (semantic tier subdivision)

Slot groups partition the semantic tier by domain. Theme declares which groups it implements.

| Group | Status | Scope |
| ----- | ------ | ----- |
| core | active | Cross-platform UI tokens |
| web | active | Web/webview-only (breakpoints, z-index, cursor, scrollbar) |
| app-shell | reserved | Tauri/PWA desktop window chrome |
| mobile-shell | reserved | Tauri/PWA mobile (safe-area, touch-target) |
| code | reserved | Code editor (gutter, syntax, diff, terminal) |
| chat | reserved | AI chat UI (user/assistant/tool messages) |

Theme example:

```json
{
  "$extensions": {
    "verobee": {
      "implements": ["core", "web"]
    }
  }
}
```

## DTCG format

All token files use W3C Design Tokens Community Group spec.

```json
{
  "color": {
    "slate": {
      "7": {
        "$value": "oklch(50% 0.02 240)",
        "$type": "color",
        "$description": "Mid-neutral, brand-agnostic"
      }
    }
  }
}
```

| Required | Notes |
| -------- | ----- |
| `$value` | OKLCH literal or `{path.to.token}` reference |
| `$type` | `color`, `dimension`, `fontFamily`, `fontWeight`, `cubicBezier`, `duration`, `number` |
| `$description` | Optional but encouraged for semantic and theme tiers |

## Build inputs per theme

| Theme | Files combined |
| ----- | -------------- |
| veronex | `primitive/*` + `semantic/{group}.json` (per implements) + `themes/veronex-light.json` + `themes/veronex-dark.json` |
| verobase | same with `themes/verobase-*.json` |
| default | same with `themes/default-*.json` |

Same semantic schema, different binding values per output file.

## Output mapping

| DTCG path | CSS Variable | Utility class |
| --------- | ------------ | ------------- |
| `theme.bg.page` | `--vds-theme-bg-page` | `vds-bg-page` |
| `theme.text.primary` | `--vds-theme-text-primary` | `vds-text-primary` |
| `theme.primary` | `--vds-theme-primary` | `vds-bg-primary` (per property) |
| `radius.md` | `--vds-radius-md` | `vds-rounded-md` |
| `spacing.4` | `--vds-spacing-4` | `vds-p-4`, `vds-m-4`, `vds-gap-4` |

Transform: dot → dash, lowercase, `--vds-` prefix.

## Color value emission

Source `oklch(50% 0.02 240)` produces dual emission:

```css
:root {
  --vds-color-slate-7: #5a6470;                  /* sRGB hex fallback */
  --vds-color-slate-7: oklch(50% 0.02 240);      /* OKLCH (modern browsers override) */
}
```

Modern browsers parse second line. Legacy browsers stop at first.

## `@property` registration (v0.2.0+)

Every leaf token is registered as a typed custom property. Architecture detail: [`../build/optimization.md#technique-1--property-registration`](../build/optimization.md). Decision lock: [`../decisions.md#performance--size-optimization-v020`](../decisions.md).

### Why register

| Without `@property` | With `@property inherits: false` |
| ------------------- | -------------------------------- |
| Token change → subtree style invalidation walk | Only the matched element invalidates |
| 252 runs/sec (web.dev benchmark) | 214,110 runs/sec — ~849× faster |
| No type checking on values | Invalid values rejected at parse time |
| No interpolation/animation | Animatable per declared `<color>` / `<length>` / `<number>` syntax |

### Per DTCG type → `syntax` map

| DTCG `$type` | `syntax` | `inherits` | Example |
| ------------ | -------- | ---------- | ------- |
| `color` | `"<color>"` | `false` | `--vds-color-primary` |
| `dimension` (spacing/sizing/radius/borderWidth) | `"<length>"` | `false` | `--vds-spacing-4` |
| `dimension` (fontSize, may be fluid `clamp()`) | `"<length-percentage>"` | `false` | `--vds-font-size-base` |
| `number` (lineHeight) | `"<number>"` | **`true`** | `--vds-line-height-base` (must inherit) |
| `number` (opacity, fontWeight, zIndex) | `"<number>"` | `false` | `--vds-opacity-disabled` |
| `time` (duration) | `"<time>"` | `false` | `--vds-duration-fast` |
| `cubicBezier` (easing) | `"*"` | `false` | `--vds-ease-out` |
| `shadow` / `gradient` (composite) | `"*"` | `false` | `--vds-shadow-md` |
| `fontFamily` | `"*"` | `true` | `--vds-font-sans` (font inherits naturally) |

### File placement rule

`@property` is a top-level at-rule. Registrations are global and **not subject to `@layer` ordering** — putting them inside `@layer` parses but is meaningless. Build emits `dist/css/tokens.property.css` un-layered, loaded before `core.css`. The actual `--vds-*: value` declarations live inside `@layer vds-tokens`.

### Initial-value rule

`initial-value` must be **computationally independent**: no `em` (font-relative), no `%` referring to parent, no `currentColor`. Use `rem`, `px`, absolute color literals, or named values. Build validates each `initial-value` round-trips through `CSS.registerProperty()` shim — invalid registrations silently get dropped by browsers, so we catch them at build time.

### Theme override interaction

`[data-theme="X"] { --vds-token: ... }` works identically with or without `@property`. Registration affects type/inheritance/initial-value; the cascade resolves overrides normally. `inherits: false` semantics ensure the override applies only at the matched element, which is what subtree-scoped theming wants.

### Build emission

The build collects all leaf tokens (across primitive, semantic, and theme tiers — uses default theme's value for `initial-value`) and emits one `@property` block per unique CSS variable name. Theme files override the value; the registration is shared across themes.

## Cross-platform extensibility

Token source is platform-agnostic. Output formatters can target any platform without changing source. See [`platforms.md`](./platforms.md).

## Theme parity check (build gate)

Build aborts if any theme:
- Misses a slot from a group it implements
- References a non-existent primitive
- Has light/dark mode mismatch

## Token tier reservation (component tier)

Directory `tokens/component/` is reserved but empty in this package. When `@verobee/design-react` ships, it will populate this tier. Adding component tier later is non-breaking.
