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

## Cross-platform extensibility

Token source is platform-agnostic. Output formatters can target any platform without changing source. See [`platforms.md`](./platforms.md).

## Theme parity check (build gate)

Build aborts if any theme:
- Misses a slot from a group it implements
- References a non-existent primitive
- Has light/dark mode mismatch

## Token tier reservation (component tier)

Directory `tokens/component/` is reserved but empty in this package. When `@verobee/design-react` ships, it will populate this tier. Adding component tier later is non-breaking.
