# Core Rules

> CDD Layer 1 — NEVER/ALWAYS quick reference | **Last Updated**: 2026-04-30

Full decisions: `docs/llm/decisions.md`. This file is operational shorthand only.

## Language

ALL code, documentation, commits MUST be in English. Korean docs only at user-facing surfaces (README, future blog posts) until OSS release.

## Doc layers

| Layer | Path | Editable |
| ----- | ---- | -------- |
| 1 | `.ai/` | Yes (≤50 lines per file) |
| 2 | `docs/llm/` | Yes (SSOT, machine-optimized) |
| 3 | `docs/en/`, `docs/kr/` | No (symlink/generated) |

Never edit Layer 3.

## Token tier

| Tier | Source | References | Status |
| ---- | ------ | ---------- | ------ |
| 1 primitive | `tokens/primitive/*.json` | none (raw values) | active |
| 2 semantic | `tokens/semantic/*.json` | primitive only | active |
| 3 component | (deferred) | semantic only | reserved for `@verobee/design-react` |

Theme is orthogonal to tier (binding layer, not a tier).

## Slot groups

| Group | Status | Scope |
| ----- | ------ | ----- |
| core | active | Cross-platform UI tokens |
| web | active | Web/webview-only (breakpoints, z-index, cursor, scrollbar) |
| app-shell | reserved | Tauri/PWA desktop |
| mobile-shell | reserved | Tauri/PWA mobile |
| code | reserved | Code editor |
| chat | reserved | AI chat |

## NEVER

| Rule | Alternative |
| ---- | ----------- |
| Hardcode hex/rgb in semantic or theme tokens | Reference primitive: `{color.slate.7}` |
| Reference primitive directly from CSS Modules | Use semantic: `var(--vds-theme-primary)` |
| Skip tier (component → primitive) | Always go through semantic |
| Edit `docs/en/` or `docs/kr/` | Edit `.ai/` or `docs/llm/` only |
| Add Tailwind dependency to `@verobee/design` | Output is framework-agnostic CSS |
| Bump `--vds-*` value in patch release | Value change = minor |
| Skip CSS variable prefix (`--theme-*`) | Always `--vds-theme-*` |
| Skip utility class prefix (`bg-primary`) | Always `vds-bg-primary` |
| Add brand-specific value to `semantic/` | Brand specifics belong in `themes/{name}.json` |
| Use Tailwind/CSS-only terms in semantic naming | Semantic must be platform-agnostic |
| Promote experimental token without 2-week soak + manual approval | Use `.add/pattern-promote.md` workflow |
| Reference Claude/GPT/Copilot/AI/LLM in commits, PRs | Per AGENTS.md commit rule |
| Use AAA-only or AA-only — neither alone is correct | Body=AA mandatory, primary=AAA mandatory |
| Skip OKLCH source value | Source values stored as OKLCH (hex fallback at output) |

## ALWAYS

| Rule | Detail |
| ---- | ------ |
| OKLCH source values | Source `$value` in OKLCH; hex fallback at output |
| Validate WCAG on every theme build | Build aborts on AA violation (4.5:1 normal, 7:1 primary) |
| Output CSS Variables + Tailwind-compatible alternative | Migration support |
| Tag SemVer after every release | `v0.x.y` rules in `docs/llm/build/versioning.md` |
| Maintain `docs/llm/tokens/CHANGELOG.md` | Keep a Changelog 1.1.0 format |
| Cite source URL in `$extensions.verobee.source` for experimental tokens | Traceability |
| Read `docs/llm/research/llm-knowledge-gaps.md` before pattern-research | LLM may have stale knowledge |
| Use `[data-theme]` for theme switching | HTML attribute standard |
| Snapshot `dist/contrast-report.json` per release | Audit trail |
| Apply `@layer reset, base, vds-tokens, vds-utilities, components, overrides` | Cascade isolation |

## Multi-brand / multi-theme

| Aspect | Rule |
| ------ | ---- |
| Semantic schema | Identical across themes (same `--vds-*` names) |
| Palette | Theme-specific (`tokens/themes/{name}-{light,dark}.json`) |
| Output | One CSS file per theme |
| Consumer | Each app imports exactly one theme file (or all + `[data-theme]` switch) |

## Cross-platform

| Aspect | Rule |
| ------ | ---- |
| Token source | Platform-agnostic (DTCG JSON) |
| Output (current) | Web CSS only |
| Output (future) | iOS Swift / Android XML / Flutter Dart formatters as add-ons |
| Naming | Avoid CSS-only / web-only terms in semantic tier |
| Tauri | Uses webview, consumes web output as-is |

## SemVer (pre-1.0)

| Change | Bump |
| ------ | ---- |
| Token rename / remove / slot group remove / theme remove / prefix change | major (post-1.0); minor (pre-1.0 with note) |
| Token value change | minor |
| Token addition | patch |
| New slot group / new theme | minor |

## Format (token-optimization)

| Rule | Detail |
| ---- | ------ |
| No emoji | None in code, docs, commits |
| No decorative ASCII | No box-drawing chars |
| Tables over prose | Default to tables |
| Headers | H1 + H2 + H3 only |
| Indent | 2 spaces, max 2 levels |
| Format priority | Tables > YAML > bullets > code > prose |

## Scope boundary

| In scope | Out of scope |
| -------- | ------------ |
| Token JSON, CSS Variables, utility classes, TS types | React/Vue/Svelte/Solid components (separate packages, future) |
| Light/dark + brand theme variants | No-code builder runtime, animation libraries, icon library |
| WCAG contrast validation | Marketing site |
| Build pipeline, CLI, contrast audit | Documentation site (defer to OSS release) |
