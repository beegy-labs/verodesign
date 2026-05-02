# Token CHANGELOG

> CDD Layer 2 — Per-release token changes | **Last Updated**: 2026-05-02

Format: [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/). SemVer policy: [`../build/versioning.md`](../build/versioning.md).

## [Unreleased]

### Docs
- Lock 2026 optimization architecture: `@property` registration, `color-mix()` alpha, `oklch(from ...)` shade ramps, `light-dark()` themes, `@scope` state variants, `@container` responsive, Brotli-11 precompressed bundle. SSOT: [`../build/optimization.md`](../build/optimization.md). Workflow: [`../../../.add/optimize-2026.md`](../../../.add/optimize-2026.md). Decision lock: [`../decisions.md` § Performance & size optimization](../decisions.md).

### Planned (v0.2.0)
- BREAKING: `dist/utilities/dark-variants.css` removed — `light-dark()` toggles tokens internally
- BREAKING: `vds-dark:*` utility classes removed
- BREAKING: alpha permutations consolidated into `color-mix(in oklab, ..., transparent)`
- BREAKING: shade ramps regenerated via `oklch(from var(--token) ...)` (sub-JND value shifts possible)
- BREAKING: long-tail state variants and viewport-prefixed responsive utilities removed; consumers migrate to `@scope` / `@container`
- Added: `dist/css/tokens.property.css` with `@property` registrations
- Added: `dist/verodesign.full.css` concatenated production bundle + `.br` Brotli-11 sibling
- Added: `dist/data/{size,recalc,visual-parity}-report.json` per-build telemetry
- Added: `--legacy-light-dark` build flag for `@supports`-gated fallback emit
- Removed: `dist/theme-init.js` (subsumed by native `color-scheme`)

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
