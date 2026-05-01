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
- **Utility layer 2차** (verobase consumer 갭 채우기, [SDD](.specs/verodesign/utility-layer-2.md)):
  - `vds-placeholder:` state variant 추가 — `text` / `opacity` family 에 적용 (`<input placeholder>` styling)
  - Shadow semantic alias utility 추가: `vds-shadow-{none,xs,sm,md,lg,xl,2xl,inner}` — 토큰은 numeric `shadow.0..6` 그대로, utility 만 alias 출력
  - `vds-hover:shadow-{sm,md,lg,xl,2xl}` 등 modifier × alias 조합 자동 생성
- **Utility layer 3차** (verobase consumer 빌드 검증 후 `border` / `outline` 갭, [SDD](.specs/verodesign/utility-layer-3.md)):
  - `vds-border` (bare) — Tailwind/shadcn-호환 디폴트 외곽선 단축형 (`1px solid var(--vds-theme-border-default)`). 카드/입력 외곽선 정의에 필수.
  - `vds-border-{t,r,b,l,x,y}` (방향 단축형) — 한 변/X·Y 축 디폴트 1px solid
  - `:where()` wrapping 으로 specificity (0,0,0) 보장 — `vds-border-{1,2,...}` (width) 와 `vds-border-{slot}` (color) 가 source order 무관하게 자연 override
  - `vds-outline-none` — `outline: 2px solid transparent; outline-offset: 2px` (high-contrast / forced-colors 안전한 native focus-ring suppressor)
  - `vds-focus-visible:outline-none` state variant — `vds-focus-visible:ring-*` 와 페어로 커스텀 포커스 인디케이터 작성
  - state-variants `outline` family 등록 (`focus-visible:` applyTo 포함)
- **Consumer fidelity fix 1차** ([SDD](.specs/verodesign/consumer-fidelity-fix-1.md)):
  - **reset.css**: anchor `color/text-decoration: inherit`, 헤딩/문단/리스트 마진 reset, 리스트 `list-style: none`, replaced-element `display: block`, button `background-color: transparent` + `cursor: pointer`, `:disabled { cursor: default }` — Tailwind preflight 핵심 룰 흡수. 마이그 회귀 (anchor 디폴트 밑줄, 리스트 디스크, 헤딩 자동 마진) 방지.
  - **theme verobase-dark**: `bg.{page, card, elevated, hover, code}` 슬롯을 `slate.{12,11,10}` ref 에서 직접 OKLCH (13~28% lightness) 로 변경 — 원본 `Obsidian Base` 브랜드 팔레트 (`#0a0c10` ~ `#1f2330`) 정합. WCAG AAA 유지.
- **Consumer fidelity fix 2차** ([SDD](.specs/verodesign/consumer-fidelity-fix-2.md)):
  - **Tailwind-호환 utility 대량 추가** — verobase live audit (442 unique tokens) 0 miss 달성까지 3 회 연속 반복:
    - `color.mjs`: STATIC_COLORS 맵 (`bg/text/border-{black,white,transparent,current,inherit}` + `black/white` 알파 변형) / 프리미티브 ramp (color.{hue}.{1..12}) base utility / Tailwind step alias (`50→1`, `100→2`, …, `950→11`)
    - `effect.mjs`: `vds-border` (bare) + 방향 단축 + `border-collapse` / `border-transparent` (방향 포함) / `vds-rounded` (default) + 방향 라운드 (t/r/b/l/tl/tr/br/bl × steps) / shadow default / numeric `z-{0,10,20,30,40,50}` / `vds-outline-none`
    - `state-variants.mjs`: `outline-` / `underline` / `line-through` / `no-underline` family 추가, `decoration` hover applyTo, `outline` focus + focus-visible applyTo, sibling pseudos (`first/last/odd/even`)
    - `transition.mjs`: numeric ms duration (75/100/150/200/300/500/700/1000) / Tailwind ease 키워드 (linear/in/out/in-out) / delay
    - `backdrop.mjs`: `vds-animate-{spin,pulse,bounce,none}` alias (Tailwind 호환, opt-in import 불필요)
    - `layout.mjs`: cursor (grab/grabbing/zoom-in/zoom-out/col-resize/row-resize/ns-resize/ew-resize/cell) / flex alias (shrink/grow + 0) / display (table 패밀리, list-item, flow-root)
    - `sizing.mjs`: `*-px` (1px) / 뷰포트 (`h-screen/dvh/svh/lvh`, `w-screen/dvw`) / 모달 사이즈 (`max-w-modal-{sm,md,lg}`) / `max-w-mobile-drawer` (80vw) / 애니메이션 collapse (`max-h-{uncapped,half-vh,3-quarter-vh,9-tenth-vh}`) / 위치 anchor (top/bottom/left/right/inset/inset-x/inset-y)
    - `typography.mjs`: micro 사이즈 (text-2xs/3xs/4xs) / tracking 패밀리 / fill·stroke (current/none/transparent) / `line-clamp-{1..6,none}` / `break-keep` (CJK)
    - `ring.mjs`: ring color slot 알파 변형
    - `index.mjs`: SEMANTIC_SLOTS 화이트리스트 — primitive ramp 의 hover/focus 변형 emit 차단 (번들 ~35MB → ~5MB), `text-dim/secondary/faint/bright` 추가, decoration 패밀리 typography 적용
    - `emit-static.mjs`: reset.css 에 Tailwind preflight 흡수 (위 1차 항목과 동일)
    - `emit-theme.mjs`: theme block 에 `color-scheme: light/dark` — native form control (e.g. `<select>`) OS 라이트 디폴트 회귀 방지
  - **Lightning CSS (Rust) 통합** — `scripts/build.mjs` 의 `[optimize]` 단계: `lightningcss` `transform()` 으로 dist/ 의 모든 `*.css` 를 `*.min.css` 로 minify. browserslist target 2026-Q1 (Chrome 111+/Firefox 113+/Safari 15.4+). `full.css` 7.4MB raw → `full.min.css` 5.2MB / gzip 403KB / brotli ~106KB. (SEMANTIC_SLOTS 화이트리스트로 raw 자체가 ~35MB → 7.4MB 로 선축소된 후 minify.)

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
