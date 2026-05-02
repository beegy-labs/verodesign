# Token CHANGELOG

> CDD Layer 2 — Per-release token changes | **Last Updated**: 2026-05-02

Format: [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/). SemVer policy: [`../build/versioning.md`](../build/versioning.md).

## [Unreleased]

### Docs
- Lock 2026 optimization architecture: `@property` registration, `color-mix()` alpha, `oklch(from ...)` shade ramps, `light-dark()` themes, `@scope` state variants, `@container` responsive, Brotli-11 precompressed bundle. SSOT: [`../build/optimization.md`](../build/optimization.md). Workflow: [`../../../.add/optimize-2026.md`](../../../.add/optimize-2026.md). Decision lock: [`../decisions.md` § Performance & size optimization](../decisions.md).

### Added
- `dist/css/tokens.property.css` — 321 `@property` registrations (color/length/number/time/composite types). Loaded before core.css; not inside `@layer` (registrations are global). `inherits: false` for non-inheriting tokens; `inherits: true` for `lineHeight`/`fontFamily`. Theme override resolution unchanged.
- `dist/verodesign.full.css` (1.4 MB) + `.br` (48 KB) — concatenated production bundle (tokens.property + reset + core + default theme + utilities/full).
- `dist/*.css.br` siblings for every `.css` (47 files) — Brotli-11 quality precompression. Total raw 6.3 MB → 212 KB Brotli (3.4% ratio).
- `@layer reset, base, vds-tokens, vds-utilities, components, overrides;` order declaration in tokens.property.css.
- `@layer base { :root { color-scheme: light dark; } [data-mode="..."] { color-scheme: ...; } }` in core.css — replaces JS-driven mode toggling for color-scheme.

### Changed
- BREAKING: `dist/css/themes/{slug}.css` collapsed via `light-dark()` — single declaration per token instead of dual `[data-mode]` rules. Theme files dropped from 16 KB → 4 KB (75%).
- BREAKING: `state-variants.css` curated to tier-1 semantic slots × base utilities only (no alpha permutations, no sibling pseudos `first`/`last`/`odd`/`even`). 19,329 rules → 2,287 rules. File size 2.3 MB → 256 KB (89%).
- BREAKING: `responsive.css` curated to layout + sizing + spacing + typography size (no color/effect/transition responsive permutations). 3.7 MB → 548 KB (85%).
- BREAKING: `group-variants.css` curated to tier-1 semantic slots only. 904 KB → 32 KB (96%).

### Removed
- BREAKING: `dist/utilities/dark-variants.css` — `light-dark()` inside theme tokens handles mode switching automatically. `vds-dark:*` utility classes no longer emitted.
- BREAKING: `vds-{first,last,odd,even}:*` sibling-position pseudos — consumers compose via `@scope` or component-local CSS.
- BREAKING: alpha permutations on long-tail color slots (state-variants & group-variants no longer emit `vds-hover:bg-primary/50` etc.). Base alpha utilities (`vds-bg-primary/50`) still emit.
- BREAKING: responsive permutations on color/effect/transition (e.g., `vds-md:bg-primary` removed). Layout/sizing/spacing responsive retained.

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
