# Workflow: 2026 Optimization (v0.1 → v0.2.0)

> ADD execution prompt | **Last Updated**: 2026-05-02

## Purpose

Execute the v0.2.0 size + runtime performance optimization. Reduces `dist/utilities/full.css` from 7.8 MB → ≤ 1.5 MB raw (≤ 200 KB Brotli-11) and cuts token recalc cost ~9× via `@property inherits: false`. Function and design preserved (per-pixel ΔE2000 < 1.0 JND threshold).

## Pre-reads (required)

| File | Why |
| ---- | --- |
| [`docs/llm/decisions.md` § Performance & size optimization](../docs/llm/decisions.md) | Locked decisions table — every step references this |
| [`docs/llm/build/optimization.md`](../docs/llm/build/optimization.md) | Architecture SSOT |
| [`docs/llm/build/outputs.md`](../docs/llm/build/outputs.md) | Target dist tree |
| [`docs/llm/tokens/architecture.md` § @property](../docs/llm/tokens/architecture.md) | Registration syntax map |
| [`docs/llm/tokens/themes.md` § Mode handling](../docs/llm/tokens/themes.md) | `light-dark()` emit pattern |
| [`docs/llm/build/versioning.md`](../docs/llm/build/versioning.md) | SemVer impact (Phase 3+ is breaking) |

## Inputs

| Field | Required | Default |
| ----- | -------- | ------- |
| Phase to execute | Yes | one of `1`, `2`, `3`, `4`, `5`, `6` |
| Visual parity reference snapshot dir | Yes for phases 3-5 | `dist/data/visual-reference/` (built once at start of phase 1) |
| Skip `--legacy-light-dark` fallback | No | `true` (Baseline-only emit) |
| Bundle theme for `verodesign.full.css` | No (phase 6) | `default` |

## Phase plan

| Phase | Subject | Breaking? | Version |
| ----- | ------- | --------- | ------- |
| 1 | CDD docs locked (this workflow + supporting docs) | No | `[Unreleased]` Docs |
| 2 | `@property` registrations + `@layer` enforcement | No | `[Unreleased]` Added |
| 3 | `light-dark()` themes + delete `dark-variants.css` | **Yes** | `[Unreleased]` Changed/Removed |
| 4 | `color-mix()` alpha + relative color shade ramps | **Yes** (within JND) | `[Unreleased]` Changed |
| 5 | Curated state-variants + `@container` migration | **Yes** | `[Unreleased]` Removed |
| 6 | Brotli-11 siblings + concatenated bundle | No | `[Unreleased]` Added |

Cumulative release: tag **`v0.2.0`** after Phase 5. Phase 6 ships as **`v0.2.1`** patch.

---

## Phase 1 — CDD lock-in

| # | Action | Output |
| - | ------ | ------ |
| 1 | Verify all six pre-read docs exist and reference each other correctly | Pre-reads satisfied |
| 2 | Run `npm run build` on `main` baseline; record `dist/utilities/full.css` size, file tree, and current `data/contrast-report.json` to `dist/data/visual-reference/baseline.json` | Baseline captured |
| 3 | Headless-Chrome screenshot reference set for each (theme × mode × major page). Save to `dist/data/visual-reference/{theme}-{mode}/*.png` | Reference frozen |
| 4 | Update `docs/llm/tokens/CHANGELOG.md` `[Unreleased]` § Docs: link to optimization architecture | CHANGELOG line |
| 5 | Commit `docs(cdd): lock 2026 optimization architecture` | Single commit, no `dist/` change |

**Acceptance gates**

| Gate | Required |
| ---- | -------- |
| `optimization.md`, decisions § Performance, outputs.md, tokens § @property, themes § light-dark all present | Yes |
| Reference snapshots committed under `dist/data/visual-reference/` | Yes |
| No code/CSS change in this phase | Yes |

---

## Phase 2 — `@property` + `@layer` enforcement (non-breaking)

| # | Action | Output |
| - | ------ | ------ |
| 1 | Add `src/build/emit-property.mjs` — generates `@property` block per leaf token using DTCG `$type` → `syntax` map from architecture.md | New emitter |
| 2 | Wire emitter into `scripts/build.mjs` to produce `dist/css/tokens.property.css` | Build emits new file |
| 3 | Add build gate: every emitted `@property` block round-trips through `CSS.registerProperty()` shim (jsdom or happy-dom) | Validation step |
| 4 | Verify every utility/theme/core file is wrapped in declared `@layer` per [decisions.md](../docs/llm/decisions.md) layer order | Layer audit pass |
| 5 | Update `package.json` exports map: add `./css/tokens.property.css` entry | Exports patched |
| 6 | Run `npm run build`; verify size report shows no regression on existing files | Build green |
| 7 | Run `npm run validate` — all 6 existing gates plus new `@property round-trip` gate pass | Validation green |
| 8 | Update `dist/data/recalc-report.json` baseline with current measurement (pre-`@property` for comparison after consumer adopts) | Baseline recorded |
| 9 | Update `docs/llm/tokens/CHANGELOG.md` `[Unreleased]` § Added: `@property` registrations | CHANGELOG line |
| 10 | Commit: `feat(build): emit @property registrations for typed tokens` | Single commit |

**Acceptance gates**

| Gate | Required |
| ---- | -------- |
| `dist/css/tokens.property.css` exists; one `@property` per leaf token | Yes |
| Each `@property` round-trips registration | Yes |
| Existing `dist/*` byte sizes unchanged within ± 1% | Yes |
| Visual diff vs Phase 1 reference: ΔE2000 < 1.0 on all samples | Yes |

**Failure modes**

| Symptom | Action |
| ------- | ------ |
| `@property` registration fails at runtime | Check `initial-value` is computationally independent (no `em`, `%`, `currentColor`); check `syntax` matches DTCG `$type` |
| Visual regression detected | Verify `inherits: false` not applied to natively-inheriting properties (lineHeight, color in inheritance contexts) |
| Build size grew | Token registration adds bytes — confirm against cap; tighten emit if needed |

---

## Phase 3 — `light-dark()` themes (BREAKING)

| # | Action | Output |
| - | ------ | ------ |
| 1 | Write SDD spec: `.specs/verodesign/2026-05-02-light-dark-themes/spec.md` | Spec |
| 2 | Update `src/build/emit-theme.mjs` to merge `{slug}-light.json` + `{slug}-dark.json` into `light-dark(L, D)` per slot | New emitter |
| 3 | Emit `color-scheme: light dark` on `:root` in `core.css`; emit `[data-mode]` overrides | core.css updated |
| 4 | Delete generation of `dist/utilities/dark-variants.css` | Removed file |
| 5 | Delete generation of `dist/theme-init.js` | Removed file |
| 6 | Add `--legacy-light-dark` build flag — when set, emit `@supports not (...)` block with legacy `[data-mode]` rules for fallback | Optional flag |
| 7 | Run `npm run build` — verify `themes/{slug}.css` ≤ 8 KB, `dark-variants.css` absent | Build green |
| 8 | Visual parity: ΔE2000 < 1.0 on all reference samples in **both** light and dark mode, in **all** browsers (Chrome, Firefox, Safari) | Parity pass |
| 9 | Token recalc benchmark: median < 1 ms when changing `:root` mode | Recalc pass |
| 10 | Update consumer guide (`docs/llm/build/consumer.md`): how `[data-mode]` works now (no JS init needed); migration note for `vds-dark:*` removal | Consumer doc |
| 11 | Update `docs/llm/tokens/CHANGELOG.md` `[Unreleased]` — § Changed: themes use `light-dark()`; § Removed: `dark-variants.css`, `theme-init.js`, `vds-dark:*` utilities; § BREAKING CHANGE footer with migration | CHANGELOG |
| 12 | Commit: `feat(themes)!: collapse light/dark via light-dark()` with `BREAKING CHANGE` footer | Single commit |

**Acceptance gates**

| Gate | Required |
| ---- | -------- |
| `dist/css/themes/{slug}.css` ≤ 8 KB (raw) for all 3 themes | Yes |
| `dist/utilities/dark-variants.css` no longer in build output | Yes |
| `dist/theme-init.js` no longer in build output | Yes |
| Visual parity ΔE2000 < 1.0 in all 3 browsers × 2 modes × N pages | Yes |
| Consumer migration documented | Yes |

**Failure modes**

| Symptom | Action |
| ------- | ------ |
| Color in dark mode subtly off | Verify color-mix interpolation space; ensure no `color()` fallback shadowing `light-dark()` |
| Subtree forcing dark doesn't work | Confirm `color-scheme: dark` set on subtree element, not just `[data-mode="dark"]` |
| Old browser rendering broken | Set `--legacy-light-dark` flag; verify `@supports not(...)` block emits |

---

## Phase 4 — `color-mix()` alpha + RCS shade ramps (BREAKING within JND)

| # | Action | Output |
| - | ------ | ------ |
| 1 | Write SDD spec: `.specs/verodesign/2026-05-02-color-mix-alpha/spec.md` | Spec |
| 2 | Update `src/build/utilities/color.mjs`: emit alpha utility class with embedded `color-mix(in oklab, var(--token) X%, transparent)` for the **manifest-driven** alpha steps actually used (default: 5/10/15/20/25/30/40/50/60/70/75/80/90/95) | Updated emitter |
| 3 | Replace shade ramp emission (`-50` through `-900`) with `oklch(from var(--token) ...)` formulas. Verify each step ΔE2000 < 1.0 against v0.1.0 precomputed values | RCS-driven ramps |
| 4 | Drop the N×M precomputed alpha permutations from primitive token emit; keep base `--vds-color-X-{1..12}` ramps unchanged | Smaller core.css |
| 5 | Add Pattern B custom-property opacity slot for power users — document in consumer.md | Documented escape hatch |
| 6 | Run `npm run build` — `dist/utilities/full.css` ≤ 1.5 MB raw | Build green |
| 7 | Run visual parity gate — every shade and alpha sample within ΔE2000 < 1.0 | Parity pass |
| 8 | Run contrast audit — all WCAG ratios still meet thresholds | Contrast pass |
| 9 | Update `docs/llm/tokens/CHANGELOG.md` `[Unreleased]` — § Changed: alpha + shade utilities; possibly imperceptible value shifts; mention RCS adoption | CHANGELOG |
| 10 | Commit: `feat(utilities)!: color-mix() alpha + RCS shade ramps` with `BREAKING CHANGE` footer (sub-JND value shifts) | Single commit |

**Acceptance gates**

| Gate | Required |
| ---- | -------- |
| `dist/utilities/full.css` ≤ 1.5 MB raw | Yes |
| Each `vds-bg-X/{step}` and `vds-bg-X-{50..900}` ΔE2000 < 1.0 vs Phase 1 reference | Yes |
| Contrast audit unchanged (no token pair drops below WCAG threshold) | Yes |

**Failure modes**

| Symptom | Action |
| ------- | ------ |
| RCS shade ramp diverges by ΔE > 1.0 | Pin specific steps to precomputed values; emit hybrid table |
| Mixing in `oklab` desaturates unexpectedly | Confirm `transparent` mixing uses `oklab` (rectangular); use `oklch` only for non-zero-chroma operands |
| Browser doesn't support RCS | Baseline check: Chrome 119+, Firefox 128+, Safari 16.4+ — all 2026-supported. If older needed, drop to precomputed for that color set |

---

## Phase 5 — Curated state-variants + `@container` migration (BREAKING)

| # | Action | Output |
| - | ------ | ------ |
| 1 | Write SDD spec: `.specs/verodesign/2026-05-02-scope-container/spec.md` | Spec |
| 2 | Decide curated state-variant set — high-frequency: `hover\|focus\|focus-visible\|active\|disabled` × `bg\|text\|border` × `primary\|accent\|destructive\|success\|warning\|info` (≈ 90 rules) | Curated list |
| 3 | Update `src/build/utilities/state-variants.mjs` to emit only curated set (≤ 100 KB) | Updated emitter |
| 4 | Add `@supports not (selector(:scope))` fallback block emitting traditional pseudos for the curated set | Fallback included |
| 5 | Update `src/build/utilities/responsive.mjs` to emit only viewport-bound utilities for OS prefs + page chrome breakpoints — drop component-level responsive permutations | Updated emitter |
| 6 | Document `@container` migration pattern in `docs/llm/build/consumer.md` — when to use container vs media | Consumer doc |
| 7 | Document `@scope` pattern for component-local CSS in consumer.md | Consumer doc |
| 8 | Run `npm run build` — `state-variants.css` ≤ 100 KB; `responsive.css` ≤ 200 KB | Build green |
| 9 | Visual parity gate (rendered pages must match — most uses are component-local so verobase/veronex consumer tests catch regressions) | Parity pass |
| 10 | Update `docs/llm/tokens/CHANGELOG.md` `[Unreleased]` — § Removed: long-tail state and responsive permutations; § BREAKING CHANGE migration to `@scope`/`@container` | CHANGELOG |
| 11 | Commit: `feat(utilities)!: curate state variants, @container for responsive` with `BREAKING CHANGE` footer | Single commit |

**Acceptance gates**

| Gate | Required |
| ---- | -------- |
| `dist/utilities/state-variants.css` ≤ 100 KB | Yes |
| `dist/utilities/responsive.css` ≤ 200 KB | Yes |
| `@supports not (selector(:scope))` fallback emits for curated state set | Yes |
| Verobase + Veronex consumer test suites still green (after consumer-update workflow) | Yes |

**Failure modes**

| Symptom | Action |
| ------- | ------ |
| Curated subset misses a high-frequency class | Re-survey consumer manifests; add to curated list |
| Consumer relies on dropped `vds-md:*` utility | Migrate that consumer to `@container`; if blocking, keep specific media-query utility with deprecation notice |
| `@scope` proximity rule surprises consumer | Add lint rule and example to consumer.md |

**After Phase 5: tag `v0.2.0`**

| # | Action |
| - | ------ |
| A | Move `[Unreleased]` to `[0.2.0] - YYYY-MM-DD` in CHANGELOG |
| B | Bump `package.json` version to `0.2.0` |
| C | `pnpm rebuild && pnpm validate` |
| D | Stage `dist/`, `CHANGELOG.md`, `package.json` |
| E | `git commit -m "chore(release): v0.2.0"` |
| F | `git tag -s v0.2.0 -m "v0.2.0"` |
| G | `git push origin main --tags` |
| H | `gh release create v0.2.0` with full breaking-change migration notes |
| I | Run [`consumer-update.md`](./consumer-update.md) for veronex and verobase |

---

## Phase 6 — Brotli-11 siblings + concatenated bundle (additive)

| # | Action | Output |
| - | ------ | ------ |
| 1 | Add `src/build/emit-compress.mjs` — emits `.br` Brotli-11 sibling for every `.css` in `dist/` | Compress step |
| 2 | Add `src/build/emit-concat.mjs` — assembles `dist/verodesign.full.css` (tokens.property + reset + core + bundle-theme + utilities/full) and emits `.br` sibling | Concat step |
| 3 | Wire both into `scripts/build.mjs` after main emit, before validation | Pipeline updated |
| 4 | Add build gate: `dist/utilities/full.css.br` ≤ 200 KB; `dist/verodesign.full.css.br` ≤ 250 KB | Size cap |
| 5 | Add CLI command `vds compress` to re-emit `.br` siblings without full rebuild | CLI updated |
| 6 | Update `package.json` exports: add `./full`, `./full.br` entries | Exports patched |
| 7 | Run `npm run build`; confirm `.br` siblings present and within budget | Build green |
| 8 | Update `docs/llm/build/consumer.md`: CDN/Vercel/Cloudflare config for serving `.br` automatically | Consumer doc |
| 9 | Update `docs/llm/tokens/CHANGELOG.md` `[Unreleased]` — § Added: Brotli-11 precompression, concatenated bundle | CHANGELOG |
| 10 | Commit: `feat(build): emit Brotli-11 precompressed bundles` | Single commit |
| 11 | Tag `v0.2.1`, release, run consumer-update | Patch released |

**Acceptance gates**

| Gate | Required |
| ---- | -------- |
| Every `dist/*.css` has matching `.css.br` sibling | Yes |
| `dist/verodesign.full.css.br` ≤ 250 KB | Yes |
| `dist/utilities/full.css.br` ≤ 200 KB | Yes |
| Brotli quality 11 confirmed (header / metadata) | Yes |

---

## Cross-phase tooling

### Visual parity harness

| Tool | Purpose |
| ---- | ------- |
| Headless Chrome (Puppeteer or Playwright) | Render reference pages × theme × mode |
| `pixelmatch` + `delta-e` | Per-pixel ΔE2000 in OKLCH |
| `dist/data/visual-parity-report.json` | Build-emitted diff report |

### Token recalc benchmark

| Tool | Purpose |
| ---- | ------- |
| Headless Chrome `Performance.measure*` API | Measure recalc duration on `:root` token mutation |
| 100 samples per token category | Median + p95 captured |
| `dist/data/recalc-report.json` | Build-emitted benchmark |

### Bundle size gate

| Tool | Purpose |
| ---- | ------- |
| Custom Node script using `Buffer.byteLength` + `zlib.brotliCompressSync` | Per-file raw + Brotli-11 size |
| `dist/data/size-report.json` | Build-emitted report; build aborts on cap exceedance |

## Rollback strategy

Each phase is a single commit on `main`. Rollback = revert that commit. Phases 1–2 are non-breaking and stay in v0.1.x patch chain — safe to revert without consumer impact. Phases 3–5 stack into v0.2.0; if a downstream consumer can't migrate, hold the v0.2.0 tag and ship phases as v0.1.x with feature flags `--legacy-light-dark`, `--legacy-alpha-permutations`, `--legacy-responsive-permutations` to preserve old emit surface.

## Versioning impact

| Phase | Version |
| ----- | ------- |
| 1 (CDD only) | `[Unreleased]` Docs — no version bump |
| 2 (`@property` + `@layer` enforcement) | `[Unreleased]` Added — patch on next release |
| 3 + 4 + 5 (breaking trio) | `[Unreleased]` § Changed/Removed + `BREAKING CHANGE` footers; tag **v0.2.0** after Phase 5 |
| 6 (Brotli + concat) | `[Unreleased]` Added — tag **v0.2.1** |

## Example (Phase 2 only)

```bash
git checkout -b feat/property-registration

# Implement src/build/emit-property.mjs
# Wire into scripts/build.mjs

npm run build
npm run validate

# Verify dist/css/tokens.property.css emitted, all gates pass

# CHANGELOG entry under [Unreleased] § Added
git add dist/ src/build/emit-property.mjs scripts/build.mjs docs/llm/tokens/CHANGELOG.md
git commit -m "feat(build): emit @property registrations for typed tokens"
git push -u origin feat/property-registration

gh pr create --title "feat(build): @property registrations" --body "..."
```
