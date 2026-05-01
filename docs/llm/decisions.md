# Locked Decisions

> CDD Layer 2 — Master decision SSOT | **Last Updated**: 2026-05-01

All architectural and policy decisions for verodesign. Every other doc references this file. Changes require SDD spec.

## Identity

| Field | Value |
| ----- | ----- |
| System | Verobee Design System (VDS) |
| Repo | `beegy-labs/verodesign` |
| npm | `@verobee/design` |
| License | MIT |
| First version | `0.0.1` |
| Doc language | Korean primary, English at OSS release (1.0+) |

## Architecture

| Decision | Value |
| -------- | ----- |
| Methodology | Token-Driven CSS Architecture |
| Tier model | 3-tier (primitive / semantic / component) |
| Component tier | `@verobee/design-elements` (Lit 3 web components) — v0.2.0-alpha |
| Theme model | Orthogonal binding layer (not a tier) |
| Slot groups | core (cross-platform) + web (web-only) + future (code, chat, app-shell, mobile-shell) |
| Output layers | CSS variables + Utility classes + TypeScript types (3-Layer) |
| Cascade | CSS `@layer reset, base, vds-tokens, vds-utilities, components, overrides` |
| Format standard | W3C DTCG (Design Tokens Community Group) |
| Build tool | Style Dictionary 4.x |
| Module format | ESM only |
| Distribution | GitHub git URL + Releases (npm publish deferred to 1.0) |
| Repo layout | monorepo (pnpm workspaces + Turborepo) — `packages/design`, `packages/design-elements`, `packages/design-react` |

## Component layer (v0.2.0+)

| Decision | Value | Rationale (2026 industry research) |
| -------- | ----- | ---------------------------------- |
| Component core | **Lit 3** + Web Components | Adobe Spectrum WC / Microsoft Fluent UI WC / IBM Carbon WC / Salesforce Lightning / Web Awesome (Shoelace v3) all converged. Only architecture satisfying cross-framework + no-code builder + solo-maintainer simultaneously. |
| a11y patterns | WAI-ARIA Authoring Practices 1.2 (manual implementation per pattern) | 1.3 still Working Draft. shadcn/Radix is React-only and incompatible with builder needs. |
| Form association | `ElementInternals` + Form-Associated Custom Elements (FACE) | Stable in all 3 engines (Safari 16.4+, Firefox 98+, Chrome 90+). Firefox ARIA reflection gap mitigated via `utils/attribute-mirror.ts`. |
| SSR | `@lit-labs/ssr` + Declarative Shadow DOM | DSD Baseline Newly Available 2024-08-05; Widely Available projected 2026-08. |
| React adapter | **`@lit/react`** thin wrappers (~0.25 KB gzip per component) | React 19 has native Custom Elements support; @lit/react adds typed events + React-style props. |
| Vue/Svelte/Solid/Astro | Native Web Components consumption (no per-framework adapter) | Web Components are framework-agnostic by spec; adapters only needed for ergonomic event/prop typing. |
| No-code builder integration | Raw `<vds-*>` custom element tags | HTML is the universal serialization interface; builders emit element tags directly. |
| First component set (v0.2.0-alpha) | 8: Button, TextField, TextArea, Card, Dialog, Tabs, Menu, Toast | YAGNI — minimum viable for veronex/verobase use cases. |
| State machines | Self-contained Lit reactive properties (Zag.js deferred) | Zag v1 vanilla API is React/Vue/Solid-first; direct Lit implementation more reliable for v0.2 scope. May revisit in v0.3+. |
| Component name prefix | `vds-*` custom element names |
| React component names | PascalCase (Button, TextField...) |
| Build per-package | Vite library mode + per-component preserve-modules | Tree-shake friendly per-component import paths. |
| Test toolchain | Web Test Runner + `@open-wc/testing` + Playwright launcher (Chromium + Firefox + WebKit) |
| Custom Elements Manifest | Auto-generated `dist/custom-elements.json` (CEM analyzer with Lit plugin) | IDE intellisense + downstream tooling consumption. |

## Utility layer (`[Unreleased]`)

> Tailwind-independent utility classes. Scope is **bounded by what consumers actually need**, not 1:1 with Tailwind. Driven by verobase frequency analysis (2026-05-01).

### In scope (verobase 1차 마이그 기준)

| Family | Utilities | Token source |
| ------ | --------- | ------------ |
| Spacing | `vds-{p,m,gap,space-y,space-x}-{0..64}` (4px grid 16 steps) | `spacing.*` |
| Typography size | `vds-text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl}` | `typography.size.*` |
| Typography weight | `vds-font-{normal,medium,semibold,bold}` | `typography.weight.*` |
| Line height | `vds-leading-{none,tight,normal,relaxed,loose}` | `typography.lineHeight.*` |
| Letter spacing | `vds-tracking-{tighter,tight,normal,wide,widest}` | `typography.letterSpacing.*` |
| Text align | `vds-text-{left,center,right,justify}` | static |
| Color (bg/text/border) | `vds-{bg,text,border}-{slot-name}` | semantic slots (existing) |
| Layout display | `vds-{block,inline,inline-block,flex,inline-flex,grid,inline-grid,hidden}` | static |
| Position | `vds-{static,relative,absolute,fixed,sticky}` + `vds-{inset,top,right,bottom,left}-{0,auto,full}` | static |
| Flexbox | `vds-flex-{row,col,wrap,nowrap}`, `vds-{items,justify,self}-{start,center,end,between,stretch}`, `vds-flex-{1,auto,none}` | static |
| Grid | `vds-grid-cols-{1..12}`, `vds-col-span-{1..12}`, `vds-grid-rows-{1..6}` | static |
| Sizing | `vds-{w,h,min-w,min-h,max-w,max-h}-{spacing-tokens, full, screen, fit, auto}` + named widths (`sm`, `md`, `lg`, `xl`, `2xl`, ...) | `spacing.*` + breakpoints |
| Border default (bare) | `vds-border` + `vds-border-{t,r,b,l,x,y}` (1px solid `border-default`, `:where()` 0,0,0 specificity) | static + theme color |
| Border width | `vds-border-{0,1,2,4,8}` + `vds-border-{t,r,b,l}-{0,1,2,4,8}` | `border.width.*` |
| Outline | `vds-outline-none` (2px solid transparent + 2px offset, forced-colors safe) | static |
| Border radius | `vds-rounded-{none,xs,sm,md,lg,xl,2xl,full}` | `radius.*` |
| Effect | `vds-shadow-{0..6}` + alias `{none,xs,sm,md,lg,xl,2xl,inner}`, `vds-opacity-{0,5,10,...,95,100}` | `shadow.*`, `opacity.*` |
| Transition | `vds-transition`, `vds-transition-{none,colors,opacity,transform,all}`, `vds-duration-{token-names}`, `vds-ease-{token-names}` | `animation.duration.*`, `animation.easing.*` |
| Cursor | `vds-cursor-{auto,default,pointer,wait,not-allowed}` | static |
| Overflow | `vds-overflow-{auto,hidden,visible,scroll}` + `-x-` / `-y-` | static |
| Z-index | `vds-z-{slot-names}` | `zIndex.*` (web slot) |

### State variants

| Prefix | Pattern | Output |
| ------ | ------- | ------ |
| Hover | `vds-hover:*` | `.vds-hover\:bg-primary:hover { ... }` |
| Focus | `vds-focus:*` | `:focus` |
| Focus-visible | `vds-focus-visible:*` | `:focus-visible` (a11y 권장; outline family 포함 — `outline-none` paired with `ring-*`) |
| Active | `vds-active:*` | `:active` |
| Disabled | `vds-disabled:*` | `:disabled, [aria-disabled="true"]` |
| Placeholder | `vds-placeholder:*` | `::placeholder` (text/opacity family only) |
| Dark mode | `vds-dark:*` | `[data-mode="dark"] .vds-dark\:bg-foo` |

### Responsive variants

| Prefix | min-width | Token source |
| ------ | --------- | ------------ |
| `vds-xs:*` | 360px | `breakpoint.xs` |
| `vds-sm:*` | 480px | `breakpoint.sm` |
| `vds-md:*` | 768px | `breakpoint.md` |
| `vds-lg:*` | 1024px | `breakpoint.lg` |
| `vds-xl:*` | 1280px | `breakpoint.xl` |
| `vds-2xl:*` | 1536px | `breakpoint.2xl` |
| `vds-3xl:*` | 1920px | `breakpoint.3xl` |

조합 가능: `vds-md:vds-hover:bg-primary` (responsive prefix → state prefix → utility).

### Opacity on color (`[Unreleased]` since Phase 1)

색상 utility 에 alpha modifier 지원 (`vds-bg-primary/30`, `vds-text-foreground/60`).

| 항목 | 값 |
| ---- | -- |
| 구현 | `color-mix(in oklab, var(--vds-theme-X) N%, transparent)` |
| Steps | `0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100` (16) |
| 적용 family | `bg`, `text`, `border` (모든 슬롯) |
| Browser baseline | `color-mix()` Baseline · Widely Available 2026 (Chrome 111+, Safari 15.4+, Firefox 113+) |
| 근거 | Tailwind v4 동일 패턴, OKlab 보간이 perceptually 안정적 |

### Group variant (`[Unreleased]` since Phase 1)

소비자 light DOM 한정 ship. vds Lit 컴포넌트 내부 사용 금지.

| 항목 | 값 |
| ---- | -- |
| Parent class | `.vds-group` |
| Variant prefix | `vds-group-hover:*` |
| 적용 family | `bg`, `text`, `border`, `opacity` |
| Selector form | `.vds-group:hover .vds-group-hover\:foo` |
| Constraint | vds Lit shadow DOM 안에서는 선택자가 경계를 못 넘으므로 **컴포넌트 작성자는 사용 금지**. 소비자 React/Vue/Svelte 마크업의 light DOM 에서만 사용. |

### Animation primitives (`[Unreleased]` since Phase 1)

3종 보편 keyframe 만 ship — `dist/animations.css` opt-in import.

| Class | Keyframe | Use case |
| ----- | -------- | -------- |
| `vds-anim-spin` | `360deg` rotation, 1s linear infinite | loading spinner |
| `vds-anim-pulse` | opacity 1→0.5→1, 2s ease-in-out infinite | skeleton loader |
| `vds-anim-bounce` | translateY -25% bounce, 1s infinite | attention indicator |

Component-specific keyframe 은 여전히 컴포넌트 내부 정의. 위 3종은 cross-component primitive 로 간주.

`prefers-reduced-motion: reduce` 시 자동 비활성.

### Out of scope (explicit, deferred or never)

| Excluded | Reason | Revisit at |
| -------- | ------ | ---------- |
| Arbitrary values (`vds-p-[13px]`) | 토큰 SSOT 위배 — 모든 값은 토큰을 거쳐야 함. Tailwind 본가도 escape hatch 권고 (소비자는 inline `style={}`) | Never (by design) |
| Container queries (`@container`) | Baseline 미달 (2026-05 기준 newly available, widely 미도달) | v1.0+ 재평가 |
| Peer selectors (`peer-*:`) | sibling 의존 → 컴포넌트화 권장 | Never (architectural) |
| `aspect-{video,square,...}` | YAGNI — verobase/veronex 사용 사례 없음 | 다음 소비자 요청 시 |
| Component-specific keyframe | 컴포넌트가 자신의 keyframe 정의 (3종 primitive 제외 — 위 참조) | Never (consumer concern) |
| `dark:` 접두 (Tailwind 호환) | 우리는 `[data-mode]` 속성 기반 → `vds-dark:*` 또는 cascade 자동 처리 | Never (architectural choice) |
| JIT extractor | AOT 발행 + responsive/state wrap 만으로 충분 (`full.css` ~30KB gzip 예상) | v0.3+ UnoCSS preset 추가 시 재평가 |

### Output structure

```
dist/utilities/
├── full.css                      # 전체 (단일 import 용)
├── by-category/
│   ├── spacing.css
│   ├── typography.css
│   ├── layout.css
│   ├── effect.css
│   ├── transition.css
│   └── color.css
├── state-variants.css            # hover/focus/active/disabled
└── responsive.css                # xs/sm/md/lg/xl/2xl/3xl wrapper
```

`package.json` exports:
- `@verobee/design/utilities/full` — 전체 (verobase 1차 권장)
- `@verobee/design/utilities/{category}` — 카테고리별
- `@verobee/design/prose` — 별도 sub-export (아래 참조)

### Prose sub-export (`@verobee/design/prose`)

Long-form markdown 용 (verodocs 사용). Tailwind `@tailwindcss/typography` 대체.

| 항목 | 값 |
| ---- | -- |
| Selector | `.vds-prose` (적용할 wrapper 클래스) |
| 대상 요소 | `h1`-`h6`, `p`, `a`, `ul`, `ol`, `li`, `blockquote`, `code`, `pre`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `hr`, `img`, `strong`, `em`, `kbd` |
| 토큰 출처 | typography.size/weight/lineHeight + spacing + color (semantic slots) |
| Dark mode | `[data-mode="dark"] .vds-prose` 자동 적용 |
| Output | `dist/css/prose.css` (단일 파일) |

### Build pipeline

| Step | 책임 |
| ---- | ---- |
| Token → utility 매핑 | `packages/design/src/build/generate-utilities.mjs` (신규) — 토큰 카테고리별로 utility class 생성 |
| State variant generation | 모든 색상/opacity utility 에 대해 state 5종 자동 확장 |
| Responsive wrapping | breakpoint 토큰 7종에 대해 `@media (min-width: ...)` wrapper 생성 |
| Prose generation | `packages/design/src/build/generate-prose.mjs` (신규) — 토큰 → prose 스타일 매핑 |
| Cascade layer | 모든 utility 는 `@layer vds-utilities` 안에 — overrides 가능 |
| **CSS minify (Rust)** | **`scripts/build.mjs` 의 `[optimize]` 단계 — `lightningcss` `transform()` 으로 dist/ 모든 `.css` → `.min.css` 생성. browserslist 2026-Q1 baseline (Chrome 111+/Firefox 113+/Safari 15.4+). `full.css` 7.4MB raw → 5.2MB min (gzip 403KB / brotli ~106KB).** |
| **Bundle 최적화 정책** | **State variants 는 SEMANTIC_SLOTS 화이트리스트 (`primary/accent/destructive/...` + `text-dim/faint/bright` 등) 에만 emit. primitive ramp (`slate-1/blue-50` 등) 은 base utility 만 — opacity 변형 미생성. 알파가 필요한 ramp 색은 inline `style={{}}` 또는 semantic slot 으로 대체.** |

### Versioning

- Utility layer 추가는 **새 export 추가** = SemVer minor (1.0+ 기준)
- Pre-1.0 (`0.0.x`) 에서는 `[Unreleased]` 에 staged. 모든 검증 (verobase 통합 + a11y + bundle size) 통과 후에야 maintainer 승인 하 release 결정.

## Naming

| Layer | Convention |
| ----- | ---------- |
| Token name | DTCG dot-path lowercase (`theme.bg.page`) |
| CSS variable | `--vds-{path-with-dashes}` (e.g., `--vds-theme-bg-page`) |
| Utility class | `vds-{property}-{token}` (e.g., `vds-bg-primary`) |
| Bin commands | `vds` and `verodesign` (both registered) |

## Color

| Decision | Value |
| -------- | ----- |
| Color space | OKLCH primary, sRGB hex fallback via `@supports` |
| Lightness scale | Systematic 12-step: L=98/95/90/80/70/60/50/40/30/20/12/5 |
| Hue families | 12 (slate + red/amber/green/blue + indigo/violet/pink/teal/cyan/lime/orange) |
| Wide gamut | Display-P3 automatic (OKLCH provides) |

## Spacing

| Decision | Value |
| -------- | ----- |
| Base unit | 4px (DPR integer alignment) |
| Step count | 16 (0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 48, 64) |
| Unit | rem with px equivalent |

## Radius

| Decision | Value |
| -------- | ----- |
| Steps | none(0), xs(2), sm(4), md(8), lg(12), xl(16), 2xl(24), full(9999) |

## Typography

| Decision | Value |
| -------- | ----- |
| Type scale ratio | Modular Perfect Fourth (1.333) |
| Anchor | base = 16px (1rem) |
| Steps | xs(12), sm(14), base(16), lg(18), xl(21), 2xl(28), 3xl(38), 4xl(51), 5xl(67), 6xl(90) |
| Default sans | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Default mono | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |
| Weights | 400, 500, 600, 700 |
| Line heights | 1, 1.25, 1.5, 1.75, 2 |
| Letter spacing | -0.02em, -0.01em, 0, 0.01em, 0.05em |

## Breakpoints (web slot group)

| Step | px | Source |
| ---- | -- | ------ |
| xs | 360 | Small mobile |
| sm | 480 | Large mobile |
| md | 768 | Tablet portrait |
| lg | 1024 | Tablet landscape / small laptop |
| xl | 1280 | Laptop |
| 2xl | 1536 | Desktop |
| 3xl | 1920 | Large desktop / dashboard |

## Shadow / Elevation

| Step | offset-Y | blur | spread | opacity |
| ---- | -------- | ---- | ------ | ------- |
| 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 2 | 0 | 0.05 |
| 2 | 2 | 4 | -1 | 0.06 |
| 3 | 4 | 8 | -2 | 0.08 |
| 4 | 8 | 16 | -4 | 0.10 |
| 5 | 16 | 32 | -8 | 0.12 |
| 6 | 24 | 48 | -12 | 0.16 |

System: Material elevation, light-source consistent.

## Animation

| Duration | ms | Use |
| -------- | -- | --- |
| instant | 0 | reduced-motion |
| fast | 100 | UI feedback (Donder's threshold) |
| medium | 200 | hover/focus standard |
| slow | 400 | layout shift |
| slower | 700 | hero animation |

| Easing | bezier |
| ------ | ------ |
| linear | linear |
| ease-out | cubic-bezier(0, 0, 0.2, 1) |
| ease-in | cubic-bezier(0.4, 0, 1, 1) |
| ease-in-out | cubic-bezier(0.4, 0, 0.2, 1) |
| spring | cubic-bezier(0.5, 1.25, 0.75, 1.25) |

`prefers-reduced-motion: reduce` → all durations 0.

## Z-index (web slot group)

| Slot | Value |
| ---- | ----- |
| base | 0 |
| raised | 10 |
| dropdown | 100 |
| sticky | 200 |
| overlay | 300 |
| modal | 400 |
| popover | 500 |
| tooltip | 600 |
| toast | 700 |
| max | 9999 |

## Theme switching

| Decision | Value |
| -------- | ----- |
| Mechanism | `[data-theme="..."]` HTML attribute on root |
| FOUC prevention | `dist/theme-init.js` inline script before hydration |
| LocalStorage key | `vds:theme` |

## WCAG (non-negotiable)

| Tier | Requirement | Exception |
| ---- | ----------- | --------- |
| Body / meaningful text | AA 4.5:1 | Forbidden |
| Brand primary emphasis | AAA 7:1 | Forbidden |
| Large text (18pt+ or 14pt bold+) | AA 3:1 | None |
| UI component / graphical | AA 3:1 | None |
| Decorative text (faint, hint) | AA 3:1 + `$extensions.verobee.contrast.allow` | Required to override |

WCAG 2.1 AA = legal minimum (US ADA, EU EAA). AAA primary = OSS reliability standard.

## Browser support

| browserslist | `last 2 years, > 0.5% globally, not dead, not ie 11` |
| ------------ | ----------------------------------------------------- |

Enables: OKLCH, `@layer`, `@scope`, `color-mix`, `:has`.

## Build gates (build aborts on failure)

| Gate | Tool |
| ---- | ---- |
| DTCG schema validity | custom validator |
| Reference resolution | Style Dictionary |
| Slot group parity per theme | custom validator |
| WCAG contrast (per theme, per mode) | wcag-contrast + culori |
| Token name pattern | regex |
| Output dedup | custom |

## DTCG `$extensions.verobee.*` standard keys

| Key | Type | Use |
| --- | ---- | --- |
| status | enum | `experimental` / `candidate` / `canonical` / `deprecated` |
| since | string | First-introduced version (`v0.1.0`) |
| source | string | External reference URL (required for experimental) |
| deprecated | object | `{ since, replacement, remove_in }` |
| contrast | object | `{ allow: "AA-large", rationale }` for downgrade |
| implements | string[] | Slot groups a theme provides (themes only) |
| platform | string[] | Target platforms (primitive only) |
| mode | string[] | Modes a theme implements (themes only) |

## SemVer policy

| Change | Bump |
| ------ | ---- |
| New token | patch |
| New slot group | minor |
| New theme | minor |
| New utility class | patch |
| Token value change (visible diff) | minor |
| Token rename / remove | major |
| Slot group slot remove | major |
| Theme remove | major |
| Default theme color change | minor |
| Build CLI signature change | major |
| `--vds-*` prefix change | major |

Pre-1.0: breaking changes allowed in minor (SemVer convention).

## Lifecycle (absorption system)

| Transition | Gate signals (all required) | Min time |
| ---------- | --------------------------- | -------- |
| research → experimental | source URL + `pattern-intake` workflow + WCAG pass | immediate |
| experimental → candidate | 1 SDD spec citation + manual approval | 2 weeks |
| candidate → canonical | 2 distinct usages + manual approval | 2 weeks |
| canonical → deprecated | 90 days zero usage auto-flag + manual approval | 90 days |

## Release version path

| Stage | Version |
| ----- | ------- |
| First commit (CDD scaffold) | `v0.0.1` |
| Build success + 6 gates pass | `v0.1.0` |
| Feature additions | `v0.x.y` |
| Feature-stable beta | `v0.9.0` |
| Release candidate | `v1.0.0-rc.x` |
| Production stable | `v1.0.0` |

## 1.0 entry criteria

| Required |
| -------- |
| 1+ external production user |
| `core` slot group schema unchanged for 3 months |
| Test coverage ≥ 80% |
| English README |
| `examples/` directory (Vite + Next.js + Astro minimum) |
| Public docs site (Astro Starlight recommended) |

## Reset CSS

| Decision | Value |
| -------- | ----- |
| Base | `modern-normalize` |
| Additions | minimal opinionated (box-sizing, line-height, focus-visible, prefers-reduced-motion) |
| Distribution | optional import (`@verobee/design/css/reset.css`) |

## Default theme brand

| Property | Value |
| -------- | ----- |
| Concept | Universal blue (color-blind safe) |
| OKLCH | `oklch(55% 0.18 250)` |
| Hex fallback | `#0066ff` (approximate) |

## Tooling

| Decision | Value |
| -------- | ----- |
| Package manager | `npm@10` (`packageManager` field) |
| Node engine | `>=20` (LTS) |
| `sideEffects` | `false` (CSS files marked separately) |
| Conventional Commits | enforced (manual) |
| Pre-commit hooks | none until OSS release |
| CHANGELOG format | Keep a Changelog 1.1.0 |
| ADP submodule update | manual monthly until OSS release |

## Consumer support matrix

| Consumer type | Support |
| ------------- | ------- |
| Web (Next.js, Vite, Astro, Remix, Qwik, ...) | Yes |
| Tauri Desktop (any frontend) | Yes (webview) |
| Tauri Mobile (iOS/Android) | Yes (webview) |
| Electron, Capacitor, PWA | Yes (webview) |
| Pure native iOS (Swift) | Deferred (formatter add-on if needed) |
| Pure native Android (Kotlin) | Deferred (formatter add-on if needed) |
| Pure native Flutter | Deferred (formatter add-on if needed) |

Frameworks supported automatically (CSS layer): React, Vue, Svelte, Solid, Angular, Astro, Qwik, Lit, Preact, vanilla.

## Themes shipped at v0.1.0

| Theme | Brand concept | Light primary | Dark primary |
| ----- | ------------- | ------------- | ------------ |
| default | Neutral universal | OKLCH(55% 0.18 250) blue | OKLCH(70% 0.16 250) blue |
| veronex | Verde Nexus (green) | OKLCH(30% 0.06 150) Deep Ivy | OKLCH(72% 0.16 165) Bio-Emerald |
| verobase | Vero Base (navy) | OKLCH(32% 0.07 250) Deep Navy | OKLCH(75% 0.14 250) Electric Blue |

## Slot groups

| Group | Status | Purpose |
| ----- | ------ | ------- |
| core | active | Cross-platform UI tokens (color, spacing, radius, typography, shadow, animation, opacity, border) |
| web | active | Web/webview-only (breakpoints, z-index, cursor, scrollbar) |
| app-shell | reserved | Future: Tauri/PWA desktop (titlebar, window-controls) |
| mobile-shell | reserved | Future: Tauri/PWA mobile (safe-area, touch-target) |
| code | reserved | Future: code editor (gutter, syntax, diff, terminal) |
| chat | reserved | Future: AI chat UI (user/assistant/tool messages) |

## Branch strategy

| Decision | Value | Rationale |
| -------- | ----- | --------- |
| Workflow | **GitHub Flow** (`feat/* → main → tag`) | Library (not service); no staging environment; tag 이 곧 release |
| Long-lived branches | `main` only | Solo maintainer; develop 이중 트리는 overhead without benefit |
| Feature branches | `feat/{slug}`, `fix/{slug}` 등 short-lived | squash merge → 깨끗한 history |
| Release | tag on main (`vX.Y.Z`) + `gh release create` | 소비자가 `github:beegy-labs/verodesign#vX.Y.Z` 로 pin |
| Maintenance branches | not used pre-1.0 | 단일 major 유지. post-1.0 다중 major 유지보수가 필요해지면 `release/X.Y` 도입 재평가 |
| 참고 사례 | Shoelace, Web Awesome, Adobe Spectrum WC, Material UI 등 대부분 design system 이 동일 패턴 | |

상세: [.ai/git-flow.md](../../.ai/git-flow.md).

## Out of scope (explicit)

| Item | Reason |
| ---- | ------ |
| React components | `@verobee/design-react` separate package, future |
| Vue/Svelte/Solid components | Per-framework future packages |
| No-code builder runtime | Separate product, consumes verodesign |
| Animation library (motion presets) | Tokens only; libraries are downstream |
| Icon library | Out of scope; downstream |
| Marketing site | Defer to docs site at OSS release |

## Decision change protocol

| Change type | Process |
| ----------- | ------- |
| Token value | SDD spec → PR → contrast validation → minor bump |
| Token rename | SDD spec → PR → migration guide → major bump |
| Architecture (tier, layer, prefix) | SDD spec with rationale → major bump |
| Standards (DTCG, WCAG, OKLCH) | Out of our control; track via `research/llm-knowledge-gaps.md` |
