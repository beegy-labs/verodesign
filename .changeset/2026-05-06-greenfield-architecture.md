---
"@verobee/spec": major
"@verobee/primitive": major
"@verobee/theme-verobase": major
"@verobee/theme-veronex": major
"@verobee/theme-default": major
"@verobee/utilities": major
"@verobee/codemods": major
"@verobee/cli": major
---

Initial 7-layer split release.

Splits the monolithic `@verobee/design` package into independently-versioned
packages per the architecture defined in `.specs/verodesign/2026-05-06-greenfield-architecture.md`.

- `@verobee/spec` — DTCG schema (slot definitions only)
- `@verobee/primitive` — raw color ramps, spacing scale, etc.
- `@verobee/theme-{verobase,veronex,default}` — brand-specific token implementations
- `@verobee/utilities` — `vds-*` utility CSS classes
- `@verobee/codemods` — migration scripts (first transform: `v0-to-v1`)
- `@verobee/cli` — `vds new-brand`, `vds doctor`

Migration: see `docs/llm/migrations/v0-to-v1.md`.
