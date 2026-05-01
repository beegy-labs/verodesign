# Changelog

All notable changes to this project are documented here.

Format: [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning 2.0](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

> Pre-release work in progress on top of `0.0.1` scaffold. Versions are not bumped until tested + approved by maintainer. Below is a running log of `[Unreleased]` work staged for the next release decision.

### Added (staged, untested)
- W3C DTCG primitive tokens: 144 OKLCH colors (12 hue families × 12 L scale), spacing (18 steps), radius (8 steps), typography (size/weight/family/lineHeight/letterSpacing), shadow (Material elevation 0-6), animation (5 durations + 5 easings), opacity (13 steps), border widths (5 steps)
- Semantic `core` slot group: bg / text / border / brand roles (primary, accent, destructive, success, warning, error, info, neutral with `-fg` pairs) / chart 1-5
- Semantic `web` slot group: 7 breakpoints (xs-3xl) + 10 z-index slots
- 3 themes (light + dark each): `default` (universal blue), `veronex` (Verde Nexus green w/ teal accent + brand-aligned chart palette), `verobase` (Vero Base navy w/ orange accent + brand-aligned chart palette)
- Theme templates: `_template-light.json` and `_template-dark.json`
- Token build pipeline (`packages/design/scripts/build.mjs`) producing `dist/css/core.css`, `dist/css/themes/{theme}.css`, `dist/utilities/full.css`, `dist/types/tokens.d.ts`, `dist/data/tokens.json`, `dist/data/contrast-report.json`, `dist/theme-init.js`, `dist/css/reset.css`, `dist/cli/vds.js`
- OKLCH dual emit (sRGB hex fallback first, OKLCH second)
- Build gates (fail-fast): naming pattern, slot parity, DTCG reference resolution, WCAG contrast (AA / AAA / AA-large with `$extensions.verobee.contrast.allow` downgrade)
- CSS Cascade Layer support: `@layer reset, vds-tokens, vds-utilities, components, overrides`
- Theme switching via `[data-theme]` and `[data-mode]` attributes; `prefers-color-scheme: dark` auto-binding
- CLI: `vds build` / `vds validate` / `vds version`
- Monorepo restructure: pnpm workspaces + Turborepo. `packages/design` (tokens), `packages/design-elements` (Lit 3 web components), `packages/design-react` (React 19 adapters)
- `packages/design-elements` (Lit 3 + Web Components, framework-agnostic):
  - 8 components: `vds-button`, `vds-text-field`, `vds-text-area`, `vds-card`, `vds-dialog`, `vds-tabs` (+ `vds-tab`, `vds-tab-panel`), `vds-menu` (+ `vds-menu-item`), `vds-toast` (+ `vds-toast-group`)
  - WAI-ARIA Authoring Practices 1.2 patterns (button, dialog modal, tabs, menu button, live region)
  - Form-Associated Custom Elements (FACE) via `ElementInternals` for `vds-button`, `vds-text-field`, `vds-text-area`
  - Focus trap utility used by Dialog
  - Firefox ARIA reflection fallback via `utils/attribute-mirror.ts`
  - Custom Elements Manifest auto-generated (`dist/custom-elements.json`)
  - SSR support via `@lit-labs/ssr` — all 8 components render Declarative Shadow DOM in smoke test
- `packages/design-react` (React 19 adapter):
  - Thin wrappers via `@lit/react`'s `createComponent`
  - Exports: `Button`, `Card`, `TextField`, `TextArea`, `Dialog`, `Tabs`/`Tab`/`TabPanel`, `Menu`/`MenuItem`, `Toast`/`ToastGroup`
- Package manager: `npm@10` → `pnpm@9.15.0`
- **Utility layer 1차 확장** (verobase 마이그 대비, [SDD](.specs/verodesign/utility-layer-1.md) + decisions § Utility layer):
  - `packages/design/src/build/utilities/` 분해: color / spacing / typography / layout / sizing / effect / transition / state-variants / responsive
  - 신규 utility families: typography (text-align, font-style, text-decoration, line-height, letter-spacing, transform, truncate, whitespace, break) / layout (display, position, flex, grid, overflow, cursor, select, pointer-events) / sizing (w/h/min/max with spacing tokens + named widths xs..7xl + prose) / effect (border-width directional, border-style) / transition (transition + duration + ease)
  - State variants: `vds-{hover,focus,focus-visible,active,disabled}:*` for color / opacity / shadow / cursor families (selective)
  - Responsive variants: `vds-{xs,sm,md,lg,xl,2xl,3xl}:*` wrapping all base utilities (breakpoint tokens drive `@media (min-width)`)
  - Output: `dist/utilities/full.css` (480 KB raw, **~59 KB gzip**) + `dist/utilities/by-category/{color,spacing,typography,layout,sizing,effect,transition}.css` + `dist/utilities/{state-variants,responsive}.css`
- **Prose sub-export** (`@verobee/design/prose`):
  - `dist/css/prose.css` (~1 KB gzip) — long-form markdown styling for verodocs
  - `.vds-prose` wrapper class; styles h1–h6 / p / a / code / pre / ul / ol / li / blockquote / table / hr / img / kbd / strong / em
  - Token-driven; dark mode auto via cascading `[data-mode]` token redefinition
  - Replaces `@tailwindcss/typography` for verodesign consumers
- `package.json` exports 추가: `./prose`, `./utilities/full`, `./utilities/state-variants`, `./utilities/responsive`, `./utilities/by-category/*`
- Build pipeline 정리: 구식 `emit-utilities.mjs` 제거, `utilities/index.mjs` 가 통합 orchestrator

### Pending verification before any version bump
- Real browser smoke (Chromium / Firefox / WebKit) via Web Test Runner
- axe-core a11y audit on the 8 components
- **verobase application integration trial** (1차) — utility layer + 8 컴포넌트 + prose 실사용 검증
- veronex application integration trial (2차)
- Bundle-size audit against documented targets in `docs/llm/build/outputs.md`
- Utility layer real-world coverage check (verobase 가 실제 필요로 하는 모든 utility 가 생성되어 있는지)

## [0.0.1] - 2026-04-30

### Added
- Repository initialized
- ADP submodule integrated (`vendor/agentic-dev-protocol`)
- CDD Layer 1 (`.ai/`) bootstrapped: README, rules, architecture, git-flow
- CDD Layer 2 (`docs/llm/`) bootstrapped:
  - decisions.md (master decision SSOT)
  - tokens/ (architecture, naming, themes, platforms, contrast, CHANGELOG)
  - build/ (style-dictionary, outputs, consumer, versioning)
  - research/ (README, llm-knowledge-gaps, discovery-sources, pattern-catalog, trend-snapshot)
  - llm-context/ (snapshot, slot-map, unknown-territory, reference-cheatsheet)
- ADD workflows (`.add/`) bootstrapped:
  - token-add, theme-add, release, consumer-update, doc-sync, deprecate, contrast-audit
  - pattern-research, pattern-intake, pattern-promote, pattern-deprecate
- License: MIT
- Package: `@verobee/design` scaffold (pre-build)

### Notes
- This release contains no built tokens or CSS output.
