# @verobee/design

> Token-driven CSS package — primitives, semantic schema, themes, build pipeline.

Part of the [verodesign monorepo](../../README.md). For master decisions, see [`../../docs/llm/decisions.md`](../../docs/llm/decisions.md).

## Build

```bash
pnpm build       # generate dist/
pnpm validate    # gates only (naming, slot parity, WCAG contrast)
pnpm rebuild     # clean + build
```

## Outputs (dist/)

| File | Purpose |
| ---- | ------- |
| `css/core.css` | Primitives + semantic schema (theme-agnostic) |
| `css/themes/{theme}.css` | Per-theme light + dark in one file |
| `css/reset.css` | modern-normalize subset + minimal additions |
| `utilities/full.css` | Pre-built utility classes |
| `types/tokens.d.ts` | TypeScript token name unions |
| `data/tokens.json` | Flat token map (per theme/mode) |
| `data/contrast-report.json` | WCAG audit per pair |
| `theme-init.js` | FOUC prevention snippet |
| `cli/vds.js` | CLI entry (`vds`, `verodesign` bins) |

## Themes

| Theme | Light primary | Dark primary |
| ----- | ------------- | ------------ |
| default | OKLCH(50% 0.19 250) blue | OKLCH(70% 0.17 250) blue |
| veronex | OKLCH(30% 0.06 150) Deep Ivy | OKLCH(72% 0.16 165) Bio-Emerald |
| verobase | OKLCH(32% 0.07 250) Deep Navy | OKLCH(75% 0.14 250) Electric Blue |

## License

MIT — see [LICENSE](../../LICENSE).
