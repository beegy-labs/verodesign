# SDD: Phase 1 — Consumer Coverage (verobase + veronex)

> Status: in_progress | Driver: Tailwind 독립 + verobase·veronex 마이그 준비 | Ref: `docs/llm/decisions.md`

## Why

verobase + veronex 의 실 사용 표면 (web 검증, 2026-05-01) 을 측정한 결과 verodesign 의 현재 dist 는 **token / utility / component 세 layer 모두 갭**이 있다. 사용자 의도는 "Tailwind 같은 디자인 프레임워크의 독립" → 갭을 메워 verobase/veronex 가 verodesign 만으로 동작하는 상태로 가져간다.

## Scope

- **Token layer** — verobase·veronex 가 실제 쓰는 의미 슬롯 추가.
- **Utility layer** — opacity-on-color (`color-mix()` 기반), `vds-group-hover:*`, animation primitives (`vds-anim-{spin,pulse,bounce}`), transform / ring / backdrop / decoration 류 보강.
- **Component layer** — 8개 신규 (Badge, Checkbox, Label, Select, Separator, Switch, Table, Tooltip).
- **Showcase** — `packages/showcase` Vite 정적 사이트 (theme switcher + token palette + utility gallery + component playground).
- **CDD** — `docs/llm/components/{name}.md` 페이지 16개 + index 1개 (LLM 이 컴포넌트 즉시 식별 가능).

## Non-goals (Phase 1)

- Arbitrary value 처리 (`vds-w-[420px]`) — `decisions.md` § Out of scope 유지. 소비자는 inline `style={}` 또는 신규 named token.
- 컴포넌트별 keyframe (벗어난 보편 keyframe 3종만 ship). 그 외는 컴포넌트 내부 정의.
- React 19 미만, Vue/Svelte adapter — 현 phase 는 web component + React adapter 만.

## Decisions Adopted (web-verified)

| 항목 | 결정 | 근거 |
| ---- | ---- | ---- |
| Opacity on color | `color-mix(in oklab, var(--token) N%, transparent)` | Tailwind v4 동일 패턴, Baseline Widely Available 2026 |
| Naming | `vds-*` SSOT 유지, shadcn alias 제공 안 함 | VA / Adobe Spectrum / IBM Carbon 모두 자체 prefix |
| `group-hover:` | vds 컴포넌트 내부 ban 유지 + 소비자 light DOM 사용 OK → `vds-group-hover:*` ship | shadow DOM 충돌은 컴포넌트 한정 이슈 |
| Animation primitives | `vds-anim-{spin,pulse,bounce}` 3종 한정 ship (`dist/animations.css`, opt-in) | Tailwind/Bootstrap 모두 기본 제공, custom keyframe 은 컴포넌트 |
| Arbitrary value | 거절 유지 (escape hatch = inline style or token) | Tailwind 본가 권고 |
| `dark:` 접두 | 이미 `vds-dark:*` 로 rename 되어 있음 | 변경 없음 |

## A. Token additions

### A.1 신규 semantic 슬롯 (`packages/design/tokens/semantic/core.json`)

| Slot path | Type | Description |
| --------- | ---- | ----------- |
| `theme.bg.code` | color | 코드 surface (인라인 + 블록 공통). `bg.elevated` 와 별개로 분리 |
| `theme.success-bg` | color | success 의 soft tinted 배경 (5-15% 톤) |
| `theme.error-bg` | color | error soft 배경 |
| `theme.warning-bg` | color | warning soft 배경 |
| `theme.info-bg` | color | info soft 배경 |
| `theme.neutral-bg` | color | neutral soft 배경 |
| `theme.cancelled` | color | cancelled / disabled status (verobase 사용) |
| `theme.cancelled-fg` | color | cancelled 텍스트 |
| `theme.accent-2` | color | 2차 accent (veronex `accent-power`) |
| `theme.accent-3` | color | 3차 accent (veronex `accent-gpu`) |
| `theme.accent-2-fg` | color | accent-2 foreground |
| `theme.accent-3-fg` | color | accent-3 foreground |
| `theme.logo.start` | color | 로고 그라디언트 시작 |
| `theme.logo.end` | color | 로고 그라디언트 끝 |
| `theme.logo.inner` | color | 로고 inner accent (선택) |

> 모든 슬롯은 `core.json` 에 default 값을 주고, 각 theme 가 override. parity 보장.

### A.2 Theme override 추가

- `default-light.json` / `default-dark.json` → 새 슬롯 값
- `verobase-light.json` / `verobase-dark.json` → 기존 verobase tokens.css 매핑 (logo gradient 등)
- `veronex-light.json` / `veronex-dark.json` → veronex 도메인 (accent-gpu/power 매핑)

## B. Utility additions

### B.1 Opacity-on-color (신규)

소비자 빈도 최상위. 모든 색상 utility (`vds-bg-*`, `vds-text-*`, `vds-border-*`) 에 대해 11 step opacity 변형 ship.

- Steps: `0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100`
- Class form: `vds-bg-primary\/30`, `vds-text-foreground\/60`, `vds-border-border\/40`
- CSS:
  ```css
  .vds-bg-primary\/30 { background-color: color-mix(in oklab, var(--vds-theme-primary) 30%, transparent); }
  ```
- Generator: 신규 `src/build/utilities/color.mjs` 확장 — 각 색상 슬롯 × 16 step 출력.

### B.2 Group variant (신규)

소비자 light DOM 한정 ship. vds Lit 컴포넌트 내부 사용 금지 (rules.md 추가).

- Trigger class: `.vds-group` (parent 마커)
- Variant prefix: `vds-group-hover:*`
- CSS:
  ```css
  .vds-group:hover .vds-group-hover\:bg-primary { background-color: var(--vds-theme-primary); }
  ```
- 적용 family: `bg`, `text`, `border`, `opacity`
- 신규 generator: `src/build/utilities/group-variants.mjs`

### B.3 Animation primitives (신규)

`dist/animations.css` 단일 파일 (opt-in import). `prefers-reduced-motion` 자동 비활성.

```css
@layer vds-utilities {
  @keyframes vds-spin { to { transform: rotate(360deg); } }
  @keyframes vds-pulse { 50% { opacity: 0.5; } }
  @keyframes vds-bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); } }

  .vds-anim-spin { animation: vds-spin 1s linear infinite; }
  .vds-anim-pulse { animation: vds-pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
  .vds-anim-bounce { animation: vds-bounce 1s infinite; }

  @media (prefers-reduced-motion: reduce) {
    .vds-anim-spin, .vds-anim-pulse, .vds-anim-bounce { animation: none; }
  }
}
```

### B.4 Transform / ring / backdrop / decoration 보강

| Family | Utilities | 비고 |
| ------ | --------- | ---- |
| Transform | `vds-rotate-{0,45,90,180,270,-45,-90,-180}`, `vds-scale-{50,75,90,95,100,105,110,125,150}`, `vds-translate-x-{full,1/2,1/4}` (and -y), `vds-translate-x-{spacing-step}` (and negative) | static + spacing 토큰 |
| Ring | `vds-ring-{0,1,2,4,8}`, `vds-ring-{slot}` (color), `vds-ring-offset-{0,1,2,4}`, `vds-ring-inset` | `box-shadow: 0 0 0 N currentColor` |
| Backdrop | `vds-backdrop-blur-{none,sm,md,lg,xl}` | static |
| Decoration | `vds-underline-offset-{auto,0,1,2,4,8}`, `vds-decoration-{thin,medium,thick}`, `vds-line-clamp-{1,2,3,4,5,6,none}`, `vds-tabular-nums`, `vds-sr-only`, `vds-not-sr-only`, `vds-divide-y`, `vds-divide-x`, `vds-divide-{slot}` | static + tabular-nums via `font-variant-numeric` |

## C. Component additions

각 컴포넌트는 다음 구조를 따른다 (기존 button 패턴):

```
packages/design-elements/src/components/{name}/
  vds-{name}.ts          # LitElement implementation
  define.ts              # customElements.define guard
  index.ts               # re-export
```

```
packages/design-react/src/components/{Name}.tsx     # @lit/react wrapper
```

| # | Tag | Pattern (WAI-ARIA AP 1.2) | Form-associated | Slots | Key props |
| - | --- | -------------------------- | --------------- | ----- | --------- |
| 1 | `vds-badge` | none (decorative) | no | default, start, end | `tone`, `variant`, `size` |
| 2 | `vds-checkbox` | Checkbox | yes (`checked`, `indeterminate`) | label | `checked`, `indeterminate`, `disabled`, `name`, `value`, `required` |
| 3 | `vds-label` | none (label/for) | no | default | `for`, `required`, `size` |
| 4 | `vds-select` + `vds-option` | Combobox + Listbox (1.2 § Select-Only) | yes | option (slot), placeholder | `value`, `name`, `disabled`, `required`, `placeholder` |
| 5 | `vds-separator` | Separator (decorative or semantic) | no | none | `orientation`, `decorative` |
| 6 | `vds-switch` | Switch | yes | label | `checked`, `disabled`, `name`, `value`, `required` |
| 7 | `vds-table` | none (semantic wrapper) | no | caption, head, body, foot | `density` (compact/normal/comfortable) |
| 8 | `vds-tooltip` | Tooltip | no | trigger, default | `placement`, `delay`, `disabled` |

`vds-table` 는 슬롯 기반 wrapper — 내부 마크업은 표준 `<table>` 사용 (light DOM 권장 via `<slot>` projection 또는 표준 HTML wrapper). 단순 스타일 컴포넌트.

`vds-select` 는 Phase 1 에서 select-only combobox (검색어 입력 X). 필요 시 v0.3 에서 editable combobox 추가.

`vds-tooltip` 은 CSS Anchor Positioning 미사용 (Baseline 미달, 2026-05). `position: absolute` + JS 위치 계산.

## D. Showcase (`packages/showcase`)

신규 패키지. Vite 5 정적 사이트.

```
packages/showcase/
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  src/
    main.ts                      # Lit-based router
    pages/
      home.ts
      tokens.ts                  # color/spacing/typography palette
      utilities.ts               # utility class gallery
      components/
        button.ts, badge.ts, ...
    components/
      app-shell.ts
      theme-switcher.ts
    styles/
      app.css
```

라우팅: hash-based (`#/components/button`). 단순.

테마 스위처: localStorage `vds:theme`, attribute `[data-theme]` + `[data-mode]`.

빌드 출력: `dist/` (정적). 배포는 `verodesign.beegy.dev` 또는 GitHub Pages — Phase 1 에서는 빌드만, 배포 별도.

## E. CDD docs (`docs/llm/components/`)

LLM 이 컴포넌트 사양을 즉시 흡수할 수 있는 구조.

```
docs/llm/components/
  README.md                      # capability matrix + index
  button.md
  badge.md
  card.md
  checkbox.md
  dialog.md
  label.md
  menu.md
  select.md
  separator.md
  switch.md
  table.md
  tabs.md
  text-area.md
  text-field.md
  toast.md
  tooltip.md
```

각 페이지 표준 섹션:

```markdown
# Component Name

> Tag: `<vds-name>` | Import: `@verobee/design-elements/components/name` | React: `Name` from `@verobee/design-react`

## Purpose
한 줄 — 무엇을 위한 컴포넌트인가.

## When to use / not to use
- ✓ ...
- ✗ ...

## Anatomy
ASCII 또는 SVG diagram.

## Props (attributes)
| Name | Type | Default | Description |

## Slots
| Name | Description |

## Events
| Name | detail | Description |

## A11y (WAI-ARIA AP 1.2 §)
- Pattern: ...
- Keyboard: Tab / Space / Enter / Arrow / Esc 동작
- ARIA roles/states emitted

## Tokens consumed
`--vds-theme-primary`, `--vds-spacing-2`, ...

## Examples
HTML / React 두 형태.

## Related
다른 컴포넌트 cross-link.
```

`docs/llm/components/README.md` — 한 줄 요약 + 사용 가능 props 한 눈 매트릭스. LLM 이 인덱스 한 번 읽고 정확한 페이지로 점프.

## Validation

- `pnpm build` (verodesign root) — turbo 전체 통과
- `pnpm validate` — naming + parity + contrast 통과
- `pnpm --filter @verobee/showcase build` — Vite 빌드 통과
- 시각 점검: `pnpm --filter @verobee/showcase dev` 후 4 themes × {light,dark} × 16 components 렌더 확인

## Branch / commits

브랜치: `feat/consumer-coverage-phase-1`. 단일 PR.

커밋 분할 (논리적):
1. `docs(specs): phase-1 consumer coverage SDD` (specs + decisions update)
2. `feat(tokens): add status-bg/cancelled/accent-2-3/logo/code surface slots`
3. `feat(utilities): opacity-on-color via color-mix`
4. `feat(utilities): group-hover variant + animation primitives`
5. `feat(utilities): transform/ring/backdrop/decoration utilities`
6. `feat(elements): badge/checkbox/label/separator/switch components`
7. `feat(elements): select/table/tooltip components`
8. `feat(react): adapters for 8 new components`
9. `feat(showcase): Vite static site for component preview`
10. `docs(cdd): per-component LLM-discoverable pages`

> 커밋 메시지에 Claude 참조 (Co-Authored-By 등) 넣지 않음.
