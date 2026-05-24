# @verobee/design

> Token-driven CSS package — primitives, semantic schema, themes, build pipeline.

Part of the [verodesign monorepo](../../README.md). For master decisions, see [`../../docs/llm/decisions.md`](../../docs/llm/decisions.md).

## Build

```bash
pnpm build       # generate dist/
pnpm dev         # watch patterns/tokens and rebuild on change
pnpm validate    # gates only (naming, slot parity, WCAG contrast)
pnpm audit:tokens-dtcg # DTCG shape/reference audit
pnpm rebuild     # clean + build
```

## Token Writing Rules

`tokens/{primitive,semantic,experimental,themes}/*.json` must stay DTCG-compliant: every leaf token uses `$value` + `$type`, `$type` must be a standard DTCG token type, `{path.to.token}` references must resolve without cycles, and `$description` is strongly recommended. Run `pnpm audit:tokens-dtcg` before commit when editing token JSON.

`pnpm dev` watches `src/patterns/girok/**/*.css` and `tokens/**/*.json` with a 200ms debounce. Set `VERODESIGN_AUTO_SYNC_TARGETS=/abs/path/app-girok[:/abs/path/another-app]` to run `pnpm install --prefer-offline` in each target after a successful rebuild.

## Girok Pattern CSS Rules

`src/patterns/girok/*.css` is concatenated by `src/build/emit-static.mjs` inside one outer `@layer components { ... }`. Source files must stay layer-free.

| Rule | Detail |
| ---- | ------ |
| Top-level at-rules | `@layer`, `@import`, `@charset`, `@namespace` forbidden |
| Standard file shape | First top-level rule must be exactly 1 `@scope (...) { ... }` block |
| Scope prefix | Use `@scope (.vds-pattern-girok-*)`; file-specific exceptions are linted explicitly |
| Shared exceptions | `shared.css` may start with shared top-level rules such as `@keyframes` and shared selectors |
| Noise | No top-level selectors or stray rules outside the allowed wrapper/exception set |

Run `pnpm --filter @verobee/design audit:pattern-files` before commit when editing girok pattern CSS.

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
