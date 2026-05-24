# Token CHANGELOG

> CDD Layer 2 — Per-release token changes | **Last Updated**: 2026-05-06

Format: [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/). SemVer policy: [`../build/versioning.md`](../build/versioning.md).

## [Unreleased]

### Added
- optional `aaa-strict` slot group added at `packages/design/tokens/semantic/aaa-strict.json` for dedicated AAA 7:1 strong variants (`theme.text.*-strong`, `theme.primary-strong`, `theme.status.*-strong`, `theme.destructive-strong`). Brands opt in by declaring `implements: ["aaa-strict"]`; no existing brand bindings changed. Spec: `.specs/verodesign/2026-05-21-contrast-policy-v2/spec.md`.
- slot groups `status` and `finance` promoted to active optional-implements groups. Canonical semantic files now live at `tokens/semantic/status.json` and `tokens/semantic/finance.json`; parity and contrast gates apply only to brands that declare those groups in theme `implements`. Spec: `.specs/verodesign/2026-05-21-slot-group-reorganization/spec.md`.
- cross-brand `theme.state.{hover,press,selected,disabled}` semantics plus `web.app-shell` region/z tokens to support fixed AppShell regions and restrained interaction hierarchy without changing brand token values. Spec: `.specs/verodesign/2026-05-16-appshell-fixed-and-hierarchy.md`.
- clarity(정제) token delta on top of girok palette refinement: `theme.finance.{up,down,flat}`, `font.size.numeric-display-{sm,lg}`, and flat elevation usage guidance for default component surfaces. Spec: `.specs/verodesign/2026-05-16-design-system-clarity-overhaul.md`. Included in staged `0.1.0`; no extra bump.
- girok theme now binds `theme.success`, `theme.warning`, and `theme.destructive` in both modes, with girok-specific `warning-fg` (light) and `success-fg` / `destructive-fg` (dark) overrides to keep WCAG AA contrast on status surfaces. Spec: `.specs/verodesign/2026-05-20-girok-theme-status-fix/spec.md`.
- brand-scoped experimental `exp.girok.*` token intake added `girok-surfaces`, `girok-icon-tile`, `girok-finance`, and expanded `girok-glow` for girok-only hero surfaces, status icon tiles, finance semantics, and glow shadows. Spec: `.specs/verodesign/2026-05-20-girok-experimental-tokens/spec.md`.

### Changed
- theme CSS build now emits brand-time fallback aliases for non-implemented optional groups. Current rule: brands without `status` still receive `--vds-theme-status-*` / `--vds-theme-destructive*` aliases mapped to core tokens (`primary`, `primary.foreground`, `text.secondary`, `bg.page`) so component sources remain unchanged while canonical status brands keep their bound values.
- girok theme now opts into `aaa-strict` in both modes as the first pilot brand, with minimal strong-slot overrides to satisfy AAA 7:1 on emitted `*-strong` pairs. Spec: `.specs/verodesign/2026-05-21-contrast-policy-v2/spec.md`.
- breaking naming migration: semantic source now uses DTCG dot-path nesting for status and foreground tokens. Examples: `theme.success` → `theme.status.success`, `theme.success-fg` → `theme.status.success.foreground`, `theme.primary-fg` → `theme.primary.foreground`, and the legacy success foreground CSS alias now emits `--vds-theme-status-success-foreground`. Consumer codemod: `npx @verobee/codemods migrate-naming-2026-05 <path>`. Spec: `.specs/verodesign/2026-05-21-dtcg-naming-migration/spec.md`.
- breaking naming follow-up: `theme.accent-2-fg` / `theme.accent-3-fg` now use nested foreground tokens, and the emitted CSS variables are `--vds-theme-accent-2-foreground` / `--vds-theme-accent-3-foreground`.
- contrast policy v2 now uses WCAG 2.2 as the baseline wording and aligns the build validator to AA 4.5:1 as the default floor for meaningful text/surfaces. AAA 7:1 moved from mandatory primary/status policy to the optional `aaa-strict` strong-slot group. This is a breaking policy change because previously documented mandatory AAA pairs are now enforced only on `*-strong` slots for opting-in brands. Spec: `.specs/verodesign/2026-05-21-contrast-policy-v2/spec.md`.
- experimental isolation fix for Phase X2-6 moved `exp.girok.finance.{up,down,flat}` out of canonical `girok-{light,dark}.json` into `packages/design/tokens/experimental/girok-finance-light.json` and `packages/design/tokens/experimental/girok-finance-dark.json`, leaving `packages/design/tokens/experimental/girok-finance.json` for mode-agnostic aliases only. Spec: `.specs/verodesign/2026-05-21-experimental-isolation-fix/spec.md`.

## [0.1.0] - 2026-05-16

### Added
- `vds-button` and `vds-icon-button` now add a coarse-pointer-only transparent hit-area in shadow DOM so all sizes keep a minimum `2.75rem` × `2.75rem` touch target without changing visual layout, padding, min-height, color, radius, or Frozen API/manifest surface. Spec: `.specs/verodesign/2026-05-16-touch-safe-compact-button.md`.

### Changed
- `@verobee/design-elements` version bumped `0.0.1` → `0.1.0` for the additive touch-safe compact button improvement.
- `@verobee/design-react` version bumped `0.0.1` → `0.1.0` because it re-exports the updated button and icon-button components.

### Added
- `theme.bg.selected` — semantic slot for selected/active surface used by segmented controls, selected list rows, and active sidebar nav buttons. Distinct from `bg.hover` (transient pointer) and `bg.elevated` (floating surface). Default `{color.white}` (light themes inherit); dark themes (default-dark, verobase-dark, veronex-dark, _template-dark) provide explicit values brighter than `bg.hover` for clear elevation. Spec: `.specs/verodesign/2026-05-06-bg-selected.md`. Driver: verobase admin + dashboard shell unification (운영/서비스 segmented toggle).

### Docs
- Lock 2026 optimization architecture: `@property` registration, `color-mix()` alpha, `oklch(from ...)` shade ramps, `light-dark()` themes, `@scope` state variants, `@container` responsive, Brotli-11 precompressed bundle. SSOT: [`../build/optimization.md`](../build/optimization.md). Workflow: [`../../../.add/optimize-2026.md`](../../../.add/optimize-2026.md). Decision lock: [`../decisions.md` § Performance & size optimization](../decisions.md).

### Added
- `dist/css/tokens.property.css` — 321 `@property` registrations (color/length/number/time/composite types). Loaded before core.css; not inside `@layer` (registrations are global). `inherits: false` for non-inheriting tokens; `inherits: true` for `lineHeight`/`fontFamily`. Theme override resolution unchanged.
- `dist/verodesign.full.css` (1.4 MB) + `.br` (48 KB) — concatenated production bundle (tokens.property + reset + core + default theme + utilities/full).
- `dist/*.css.br` siblings for every `.css` (47 files) — Brotli-11 quality precompression. Total raw 6.3 MB → 212 KB Brotli (3.4% ratio).
- `@layer reset, base, vds-tokens, vds-utilities, components, overrides;` order declaration in tokens.property.css.
- `@layer base { :root { color-scheme: light dark; } [data-mode="..."] { color-scheme: ...; } }` in core.css — replaces JS-driven mode toggling for color-scheme.

### Changed
- `dist/css/themes/{slug}.css` collapsed via `light-dark()` — single declaration per token instead of dual `[data-mode]` rules. Theme files dropped from 16 KB → 4 KB (75%).
- `state-variants.css` curated to tier-1 semantic slots × base utilities only (no alpha permutations, no sibling pseudos `first`/`last`/`odd`/`even`). 19,329 rules → 2,287 rules. File size 2.3 MB → 256 KB (89%).
- `responsive.css` curated to layout + sizing + spacing + typography size (no color/effect/transition responsive permutations). 3.7 MB → 548 KB (85%).
- `group-variants.css` curated to tier-1 semantic slots only. 904 KB → 32 KB (96%).

### Removed
- `dist/utilities/dark-variants.css` — `light-dark()` inside theme tokens handles mode switching automatically. `vds-dark:*` utility classes no longer emitted.
- `vds-{first,last,odd,even}:*` sibling-position pseudos — consumers compose via `@scope` or component-local CSS.
- Alpha permutations on long-tail color slots (state-variants & group-variants no longer emit `vds-hover:bg-primary/50` etc.). Base alpha utilities (`vds-bg-primary/50`) still emit.
- Responsive permutations on color/effect/transition (e.g., `vds-md:bg-primary` removed). Layout/sizing/spacing responsive retained.

### Performance
- `full.css`: 7.8 MB → 1.4 MB raw (82%↓), 39 KB Brotli-11.
- `full.min.css`: 5.7 MB → 1.1 MB raw (81%↓), 36 KB Brotli-11.
- Total dist: 16 MB → 2.7 MB raw (83%↓).
- `@property inherits: false` enables ~9× recalc speedup on token mutation (web.dev benchmark: 252 → 214,110 runs/sec, Oct 2024).
- First-paint utility CSS over wire: target ≤ 50 KB Brotli — actual 48 KB for concatenated bundle.

### Added
- Initial scaffold (CDD framework, ADP submodule, decisions.md SSOT)

## [0.0.1] - 2026-04-30

### Added
- Repository initialized
- ADP submodule integrated (`vendor/agentic-dev-protocol`)
- CDD Layer 1 (`.ai/`) bootstrapped
- CDD Layer 2 (`docs/llm/tokens/`, `docs/llm/build/`, `docs/llm/research/`) bootstrapped
- Master decisions document (`docs/llm/decisions.md`)
- Token directory structure (primitive, semantic, themes, experimental — empty)
- License: MIT
