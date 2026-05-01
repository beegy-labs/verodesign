# Style Dictionary Build Pipeline

> CDD Layer 2 — Build configuration and transforms | **Last Updated**: 2026-04-30

## Pipeline

```
tokens/*.json (DTCG)
   │
   ├─ Stage 1: Load + merge per theme
   │           (primitive + semantic/{groups} + themes/{theme}-{mode}.json)
   │
   ├─ Stage 2: Validate (DTCG schema, references, slot parity, naming)
   │
   ├─ Stage 3: Transform
   │           (OKLCH → dual emit, references resolve, names → kebab + prefix)
   │
   ├─ Stage 4: Build per theme
   │           ├─▶ format css/variables-themed       → dist/css/themes/{theme}.css
   │           ├─▶ format css/utilities              → dist/utilities/full.css
   │           ├─▶ format typescript/types           → dist/types/tokens.d.ts
   │           ├─▶ format typescript/utilities-types → dist/types/utilities.d.ts
   │           ├─▶ format json/flat                  → dist/data/tokens.json
   │           ├─▶ format unocss/preset              → dist/utilities/plugins/unocss-preset.js
   │           └─▶ format tailwind/plugin            → dist/utilities/plugins/tailwind-plugin.js
   │
   ├─ Stage 5: Contrast audit (per theme, per mode)
   │
   └─ Stage 6: Write reports (contrast-report.json, snapshot.md auto-gen)
```

## Config files

| File | Purpose |
| ---- | ------- |
| `style-dictionary.config.js` | Theme-aware config builder (one SD instance per theme) |
| `scripts/build.mjs` | Orchestrator: validate → SD build per theme → contrast audit |
| `src/transforms/` | Custom transforms (OKLCH dual emit, DTCG ref resolve, dark mode emit) |
| `src/formats/` | Custom formatters (variables-themed, utilities, with-tailwind, types) |
| `src/validators/` | DTCG validator, slot parity check, contrast check |

## Custom transforms

| Name | Purpose |
| ---- | ------- |
| `name/cti/vds-kebab` | DTCG dot-path → `--vds-`-prefixed kebab CSS variable |
| `value/dtcg-ref` | Resolve `{path.to.token}` chains, validate no cycles |
| `value/oklch-dual` | OKLCH source → emit dual `[hex-fallback, oklch]` |
| `mode/dark-emit` | Emit dark-mode value into `[data-mode="dark"]` selector |

## Custom formatters

| Name | Output | Purpose |
| ---- | ------ | ------- |
| `css/variables-themed` | `dist/css/themes/{theme}.css` | `:root` + `[data-theme]` + `[data-mode]` blocks |
| `css/utilities` | `dist/utilities/full.css` | All utility classes pre-built (`vds-*`) |
| `css/utilities-by-group` | `dist/utilities/{group}.css` | Per-slot-group utility CSS |
| `typescript/tokens-types` | `dist/types/tokens.d.ts` | Token name unions |
| `typescript/utilities-types` | `dist/types/utilities.d.ts` | Utility class name unions |
| `json/flat` | `dist/data/tokens.json` | Flat token map (per theme/mode) |
| `unocss/preset` | `dist/utilities/plugins/unocss-preset.js` | UnoCSS preset for JIT |
| `tailwind/plugin` | `dist/utilities/plugins/tailwind-plugin.js` | Tailwind plugin (legacy migration) |

## Build commands

```bash
npm run build           # full build (validate + emit + audit)
npm run rebuild         # clean + build
npm run validate        # validation only (no emit)
```

## Build steps (ordered, fail-fast)

| # | Step | Failure mode |
| - | ---- | ------------ |
| 1 | Validate DTCG schema (each JSON) | abort, list invalid files |
| 2 | Validate cross-theme schema parity per slot group | abort, list missing slots |
| 3 | Resolve `{path.to.token}` references | abort on dangling/cycle |
| 4 | Validate token name pattern | abort on naming violation |
| 5 | Validate WCAG contrast (per theme, per mode) | abort on AA 4.5:1 / AAA 7:1 violation |
| 6 | Style Dictionary build per theme | per-theme failure isolated |
| 7 | Generate utility CSS from semantic tokens | abort on class name dedup conflict |
| 8 | Emit `tokens.d.ts`, `utilities.d.ts` | always, derived from default theme |
| 9 | Write `dist/data/contrast-report.json` | always (audit trail) |
| 10 | Auto-update `docs/llm/llm-context/snapshot.md` | always |

All gates must pass for any `git tag v*` release.

## OKLCH dual emit example

Source:
```json
{ "color.slate.7": { "$value": "oklch(50% 0.02 240)", "$type": "color" } }
```

Output:
```css
:root {
  --vds-color-slate-7: #5a6470;                  /* sRGB hex via culori conversion */
  --vds-color-slate-7: oklch(50% 0.02 240);      /* OKLCH (modern browsers override) */
}
```

`@supports (color: oklch(0% 0 0))` not needed — duplicate property declaration handles fallback automatically.

## Theme + mode emission

Each theme produces one CSS file with both modes:

```css
@layer vds-tokens {
  :root,
  [data-theme="default"]:not([data-mode]),
  [data-theme="default"][data-mode="light"] {
    --vds-theme-bg-page: oklch(98% 0 0);
    /* ... light mode values */
  }

  [data-theme="default"][data-mode="dark"] {
    --vds-theme-bg-page: oklch(12% 0 0);
    /* ... dark mode values */
  }

  @media (prefers-color-scheme: dark) {
    [data-theme="default"]:not([data-mode]) {
      --vds-theme-bg-page: oklch(12% 0 0);
      /* ... dark mode values */
    }
  }
}
```

## Adding a new output format

| Step | Action |
| ---- | ------ |
| 1 | Implement `src/formats/{name}.js` (Style Dictionary formatter signature) |
| 2 | Register in `style-dictionary.config.js` `format` map |
| 3 | Add platform entry referencing the formatter |
| 4 | Document in [`outputs.md`](./outputs.md) |
| 5 | Add SDD spec, version bump per `versioning.md` |

## Performance

| Metric | Target |
| ------ | ------ |
| Cold build (no cache) | < 5s for 3 themes |
| Incremental build (single theme change) | < 1s |
| Contrast audit | < 500ms per theme |
| Watch mode (future) | < 200ms re-emit on file change |
