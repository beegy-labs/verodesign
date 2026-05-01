# Architecture

> CDD Layer 1 — System overview | **Last Updated**: 2026-04-30

Full token model: `docs/llm/tokens/architecture.md`. Pipeline: `docs/llm/build/style-dictionary.md`.

## Source → Build → Output

```
tokens/                       src/                       dist/
  primitive/*.json   ─┐
  semantic/*.json    ─┼─▶ Style Dictionary 4.x  ──▶  css/{core,reset,themes/*}.css
  themes/*.json      ─┤   + custom transforms        utilities/{full,core,plugins/*}.{css,js}
  experimental/*.json─┘   + custom formatters        types/{tokens,utilities}.d.ts
                                                     data/{tokens,contrast-report}.json
                                                     theme-init.js
                                                     cli/vds.js
```

## Tier model

| Tier | Name | Example value | References | Status |
| ---- | ---- | ------------- | ---------- | ------ |
| 1 | primitive | `color.slate.7 = oklch(50% 0.02 240)` | none | active |
| 2 | semantic | `theme.bg.page = {color.slate.2}` | primitive only | active |
| 3 | component | `button.bg.primary = {theme.primary}` | semantic only | reserved |

## Theme (orthogonal)

```
                           THEMES (binding layer)
                  default / veronex / verobase / ...
                                │
                                │ provides values
                                ▼
              ┌─────────────────┐    ┌─────────────────┐
              │ Tier 1 primitive│ ←─ │ Tier 2 semantic │
              │ raw OKLCH       │    │ slot definitions│
              └─────────────────┘    └─────────────────┘
```

Each theme = JSON file binding semantic slots → primitive references. Build emits one CSS file per theme.

## Slot groups (semantic tier subdivision)

| Group | File | Themes implement |
| ----- | ---- | ---------------- |
| core | `semantic/core.json` | All themes (mandatory) |
| web | `semantic/web.json` | Themes targeting web/webview |
| app-shell | (reserved) | Future Tauri/PWA themes |
| mobile-shell | (reserved) | Future mobile-shell themes |
| code | (reserved) | Future code-editor themes |
| chat | (reserved) | Future chat-UI themes |

Theme declares via `$extensions.verobee.implements: ["core", "web"]`.

## Output layers (3-Layer)

| Layer | Output | Consumer |
| ----- | ------ | -------- |
| L1 CSS Variables | `dist/css/themes/*.css` | Max control: `var(--vds-theme-primary)` |
| L2 Utility classes | `dist/utilities/*.css` | Tailwind-style ease: `class="vds-bg-primary"` |
| L3 TypeScript types | `dist/types/*.d.ts` | TS autocomplete, compile-time validation |

Plus build helpers: UnoCSS preset, Tailwind plugin (legacy migration).

## CSS Cascade Layers

```css
@layer reset, base, vds-tokens, vds-utilities, components, overrides;
```

| Layer | Owner |
| ----- | ----- |
| reset | optional consumer import (`@verobee/design/css/reset.css`) |
| base | consumer (page-level rules) |
| vds-tokens | verodesign (CSS variables) |
| vds-utilities | verodesign (utility classes) |
| components | consumer (component-level styles) |
| overrides | consumer (intentional overrides) |

## Color pipeline

```
Source: oklch(50% 0.02 240)  in tokens/primitive/color.json
   │
   ▼ Style Dictionary transform
:root {
  --vds-color-slate-7: #5a6470;                 /* sRGB hex fallback */
  --vds-color-slate-7: oklch(50% 0.02 240);     /* OKLCH (modern browsers) */
}
```

Modern browsers use 2nd line (override). Legacy browsers stop at 1st line.

## Build gates (ordered)

| # | Gate | Failure |
| - | ---- | ------- |
| 1 | DTCG schema validity | abort |
| 2 | Reference resolution (no dangling, no cycles) | abort |
| 3 | Slot group parity per theme | abort |
| 4 | WCAG contrast (per theme, per mode) | abort |
| 5 | Token name pattern | abort |
| 6 | Output dedup (no class collisions) | abort |

All gates must pass for any release tag.

## Versioning lane

| Stage | Version |
| ----- | ------- |
| Scaffold (now) | v0.0.1 |
| First successful build | v0.1.0 |
| Iteration | v0.x.y |
| Beta | v0.9.0 |
| RC | v1.0.0-rc.x |
| Stable | v1.0.0 |
