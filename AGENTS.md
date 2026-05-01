# AGENTS.md

> Universal LLM entry point | **Last Updated**: 2026-04-30

Read [.ai/README.md](.ai/README.md). Master decisions: [docs/llm/decisions.md](docs/llm/decisions.md).

<!-- BEGIN: STANDARD POLICY -->
## Identity

| Term | Definition |
| ---- | ---------- |
| CDD | System SSOT and reconstruction baseline |
| SDD | CDD-derived change plan |
| ADD | Autonomous execution and policy selection engine |

Core loop: `CDD → SDD → ADD → CDD (feedback)`. Definitions: [docs/llm/policies/identity.md](docs/llm/policies/identity.md).

## Frameworks

| Directory | Framework | Role |
| --------- | --------- | ---- |
| `.ai/` + `docs/llm/` | CDD | System SSOT — token policies, naming, multi-theme, multi-platform |
| `.specs/` | SDD | Change plans — token additions, theme changes, deprecations |
| `.add/` | ADD | Execution — token-add, theme-add, release, pattern-* workflows |

## Commit Rules

| Rule | Detail |
| ---- | ------ |
| No AI mention | Never reference Claude, GPT, Copilot, AI, LLM in commits, PR titles, PR bodies |
| No AI co-author | No Co-Authored-By AI trailers |
| Conventional Commits | `<type>(<scope>): <subject>` enforced |
| Full spec | [.ai/git-flow.md](.ai/git-flow.md) |

## Doc Formatting

Applies to `.ai/`, `docs/llm/`, `.add/`. Spec: [docs/llm/policies/token-optimization.md](docs/llm/policies/token-optimization.md).

| Rule | Detail |
| ---- | ------ |
| No emoji | No Unicode emoji |
| No decorative ASCII | No borders, box-drawing chars |
| No prose/filler | Tables over sentences |
| Headers | H1+H2+H3 only |
| Indent | 2-space, max 2 levels |
| Format priority | Tables > YAML > bullets > code > prose |
<!-- END: STANDARD POLICY -->

<!-- BEGIN: PROJECT CUSTOM -->
## Project Identity

Verobee Design System (VDS) — Token-Driven CSS Architecture. W3C DTCG JSON tokens, OKLCH-first, Tailwind-independent, multi-theme, multi-framework, multi-environment (web + Tauri).

## Architecture

| Layer | Tech |
| ----- | ---- |
| Token format | W3C DTCG (Design Tokens Community Group) JSON |
| Build pipeline | Style Dictionary 4.x |
| Color space | OKLCH primary, sRGB hex fallback |
| Tier model | 3-tier (primitive / semantic / component-deferred) |
| Theme | Orthogonal binding layer |
| Slot groups | core (cross-platform) + web + future expansions |
| Output | CSS variables + utility classes + TS types (3-Layer) |
| Cascade | `@layer reset, base, vds-tokens, vds-utilities, components, overrides` |
| Module | ESM only |
| Distribution | GitHub git URL + Releases |

## Core Rules

| Rule | Detail |
| ---- | ------ |
| Token tier | Strict 3-tier; never skip; component tier deferred to `@verobee/design-react` |
| Naming | DTCG dot-path; semantic uses purpose not appearance; platform-agnostic |
| Hardcoding | Forbidden in tokens — every value either OKLCH (primitive) or `{path}` reference |
| Contrast | AA 4.5:1 mandatory all text; AAA 7:1 mandatory primary tier |
| Multi-theme | Brand-specific changes go in `tokens/themes/{name}.json` only; semantic schema stays uniform |
| Vendor lock | Output framework-agnostic CSS; Tailwind plugin is optional migration aid |
| SemVer | Token rename = major; value change = minor; addition = patch |
| Prefix | CSS variables `--vds-*`, utility classes `vds-*` |
| Theme switch | `[data-theme]` HTML attribute |
| WCAG | Build aborts on contrast violation |
| OKLCH | Source values stored as OKLCH; output dual emit (hex + OKLCH) |

## Consumer Integration

| Consumer | Theme | Import |
| -------- | ----- | ------ |
| veronex/web | veronex | `@verobee/design/css/themes/veronex.css` |
| verobase/web/accounts | verobase | `@verobee/design/css/themes/verobase.css` |
| verobase/web/dashboard | verobase | `@verobee/design/css/themes/verobase.css` |
| verobase/web/docs | verobase | `@verobee/design/css/themes/verobase.css` |
| External (any framework) | default or custom | `@verobee/design/css/themes/{name}.css` |
| Tauri (any frontend) | any | webview consumes web output as-is |

Frameworks supported automatically: React, Vue, Svelte, Solid, Angular, Astro, Qwik, Lit, Preact, vanilla.

## Knowledge gap protocol

LLM agents MUST read [docs/llm/research/llm-knowledge-gaps.md](docs/llm/research/llm-knowledge-gaps.md) before pattern-research or pattern-intake workflows. External authority (web search, source URL) takes priority over agent memory for: W3C DTCG, Style Dictionary v4, CSS color spaces, Tailwind v4, browser CSS features, WCAG.
<!-- END: PROJECT CUSTOM -->

## Workflows and Config

| Type | Key | Value |
| ---- | --- | ----- |
| ADD | Token add | `.add/token-add.md` |
| ADD | Theme add | `.add/theme-add.md` |
| ADD | Release | `.add/release.md` |
| ADD | Consumer update | `.add/consumer-update.md` |
| ADD | Doc sync | `.add/doc-sync.md` |
| ADD | Deprecate | `.add/deprecate.md` |
| ADD | Contrast audit | `.add/contrast-audit.md` |
| ADD | Pattern research | `.add/pattern-research.md` |
| ADD | Pattern intake | `.add/pattern-intake.md` |
| ADD | Pattern promote | `.add/pattern-promote.md` |
| ADD | Pattern deprecate | `.add/pattern-deprecate.md` |
| LLM | Claude Code | `CLAUDE.md` |
| LLM | OpenAI Codex | `AGENTS.md` |
| LLM | Gemini CLI | `GEMINI.md` |
