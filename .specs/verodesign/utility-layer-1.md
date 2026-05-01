# SDD: Utility layer (1차) — verobase 마이그 대비

> Status: staged in `[Unreleased]` | Driver: verobase 1차 적용 | Reference: `docs/llm/decisions.md` § Utility layer

## Why

verobase 의 Tailwind v4 utility 빈도 분석 (2026-05-01) 결과 `vds-*` utility 가 약 15% 만 커버. 옵션 A (verodesign-only, 타협 없음) 채택 → 사용 빈도 높은 영역만 1차 추가.

## 추가 범위 (현재 `emit-utilities.mjs` 갭)

### A. 신규 generator (분리 파일)

| 파일 | 책임 |
| ---- | ---- |
| `src/build/utilities/spacing.mjs` | p/m/gap (기존) + space-x/space-y (sibling margin) + inset/top/right/bottom/left |
| `src/build/utilities/typography.mjs` | font-size (기존) + font-weight (기존) + line-height + letter-spacing + text-align |
| `src/build/utilities/layout.mjs` | display + position + flex (direction/wrap/items/justify/self/grow/shrink) + grid (cols/rows/col-span/row-span) + overflow + cursor |
| `src/build/utilities/sizing.mjs` | w/h/min-w/min-h/max-w/max-h (spacing tokens + named sizes + full/auto/screen/fit) |
| `src/build/utilities/effect.mjs` | shadow (기존) + opacity (기존) + border-width + border-radius (기존) |
| `src/build/utilities/transition.mjs` | transition + transition-property + duration + ease |
| `src/build/utilities/color.mjs` | bg/text/border (기존 — 분리만) |
| `src/build/utilities/state-variants.mjs` | wrapper: hover/focus/focus-visible/active/disabled |
| `src/build/utilities/responsive.mjs` | wrapper: xs/sm/md/lg/xl/2xl/3xl breakpoint media queries |
| `src/build/utilities/index.mjs` | orchestrator — full.css + by-category/* 생성 |
| `src/build/emit-prose.mjs` | prose.css 생성 |

기존 `emit-utilities.mjs` 는 `index.mjs` 가 호출하는 `color.mjs` + `spacing.mjs` 등으로 분해 → 기존 동작 보존.

### B. 신규 utility 목록

#### Spacing (확장)
- `vds-space-x-{step}` → `> * + * { margin-left: ... }` (sibling margin)
- `vds-space-y-{step}` → `> * + * { margin-top: ... }`
- `vds-inset-{0,auto,full}`, `vds-{top,right,bottom,left}-{0,auto,full}` (positioning offset)

#### Typography (확장)
- `vds-leading-{none,tight,normal,relaxed,loose}` (line-height — 기존 토큰 `font.lineHeight.*` 매핑)
- `vds-tracking-{tighter,tight,normal,wide,widest}` (letter-spacing — 기존 토큰 `font.letterSpacing.*`)
- `vds-text-{left,center,right,justify}` (text-align — static, 토큰 무관)
- `vds-font-{normal,medium,semibold,bold}` (기존 — 확인)

⚠️ `vds-text-*` 충돌 회피: `text-align` 의 `left/center/right/justify` 와 color slot 이름이 겹치지 않음 보장 (현재 slot 에 left/center/right/justify 없음 — OK).

#### Layout (전부 신규)
- Display: `vds-{block,inline-block,inline,flex,inline-flex,grid,inline-grid,hidden,contents}` (static)
- Position: `vds-{static,relative,absolute,fixed,sticky}` (static)
- Flex direction: `vds-flex-{row,row-reverse,col,col-reverse}`
- Flex wrap: `vds-{flex-wrap,flex-nowrap,flex-wrap-reverse}`
- Flex items/justify/self/content: `vds-{items,justify,self,content}-{start,center,end,between,around,evenly,stretch,baseline}`
- Flex grow/shrink: `vds-flex-{1,auto,initial,none}`, `vds-{grow,shrink}-{0,1}`
- Grid: `vds-grid-cols-{1..12}`, `vds-col-span-{1..12,full}`, `vds-grid-rows-{1..6}`, `vds-row-span-{1..6,full}`
- Overflow: `vds-overflow-{auto,hidden,visible,scroll}` + `-x-` / `-y-`
- Cursor: `vds-cursor-{auto,default,pointer,wait,not-allowed}`

#### Sizing (전부 신규)
- `vds-{w,h}-{spacing-tokens, full, screen, fit, auto, min, max}`
- `vds-{min-w,min-h,max-w,max-h}-{...}` 동일
- 명명 너비: `vds-max-w-{xs,sm,md,lg,xl,2xl,3xl,4xl,5xl,6xl,prose,full,none}` (Tailwind 기본 사이즈와 호환)

#### Effect (확장)
- `vds-border-{0,1,2,4,8}` — border-width (현재 `border.width.*` 토큰 5종 매핑)
- `vds-border-{t,r,b,l}-{0,1,2,4,8}` — 방향별 border-width
- `vds-shadow-{0..6}` (기존)
- `vds-opacity-*` (기존)

#### Transition (전부 신규)
- `vds-transition` — `transition: all var(--vds-animation-duration-base) var(--vds-animation-easing-ease-in-out)`
- `vds-transition-{none,colors,opacity,transform,all}` — property scope
- `vds-duration-{token-names}` — `transition-duration`
- `vds-ease-{token-names}` — `transition-timing-function`

#### State variants (wrapping 메커니즘)

색상/opacity utility 만 자동 확장 (다른 카테고리는 거의 의미 없음):

| Variant | Selector | 적용 utility |
| ------- | -------- | ------------ |
| `vds-hover:` | `.vds-hover\:foo:hover` | bg, text, border, opacity, shadow |
| `vds-focus:` | `.vds-focus\:foo:focus` | bg, text, border, opacity |
| `vds-focus-visible:` | `.vds-focus-visible\:foo:focus-visible` | bg, text, border (a11y 권장 — 키보드 포커스만) |
| `vds-active:` | `.vds-active\:foo:active` | bg, text, opacity |
| `vds-disabled:` | `.vds-disabled\:foo:disabled, .vds-disabled\:foo[aria-disabled="true"]` | opacity, cursor |

#### Responsive variants (wrapping)

7개 breakpoint 토큰 (`xs/sm/md/lg/xl/2xl/3xl`) 에 대해 모든 utility 를 `@media (min-width: ...)` 로 래핑.

```css
@media (min-width: var(--vds-breakpoint-md)) {
  .vds-md\:flex { display: flex; }
  .vds-md\:hidden { display: none; }
  ...
}
```

⚠️ `var()` 는 `@media` 안에서 작동 안 함 → token 값을 build 시점에 inline (e.g., `768px` 직접) 로 변환.

State + responsive 조합: `vds-md:vds-hover:bg-primary` — generator 가 두 wrapping 중첩.

### C. Prose system

`dist/css/prose.css` 단일 파일. `.vds-prose` wrapper class 안의 마크다운 요소를 토큰으로 스타일.

스타일 매핑 (요약):
- `h1` ~ `h6` → `font.size.{6xl,5xl,4xl,3xl,2xl,xl}` + `font.weight.bold` + `lineHeight.tight`
- `p` → `font.size.base` + `lineHeight.relaxed` + `spacing.4` margin
- `a` → `theme.text.primary` (semantic) + `text-decoration: underline`
- `code` (inline) → `theme.bg.elevated` + `font.size.sm` + `radius.xs`
- `pre` → `theme.bg.elevated` + `radius.md` + `spacing.4` padding + 가로 스크롤
- `blockquote` → `border-left: 4px solid var(--vds-theme-border)` + 여백
- `table`, `th`, `td` → 토큰 기반 border + spacing
- `ul/ol/li` → 들여쓰기 spacing + bullet 색
- `hr` → `theme.border` + 여백
- `kbd` → 입체감 (border + shadow)

Dark mode: `[data-mode="dark"] .vds-prose` 자동 cascade — 토큰이 mode 별로 바뀌므로 prose CSS 자체는 mode 독립.

### D. Output paths

```
packages/design/dist/
├── css/
│   ├── core.css                  # (기존)
│   ├── reset.css                 # (기존)
│   ├── prose.css                 # 신규
│   └── themes/
│       ├── default.css
│       ├── veronex.css
│       └── verobase.css
├── utilities/
│   ├── full.css                  # (기존, 확장)
│   └── by-category/              # 신규
│       ├── spacing.css
│       ├── typography.css
│       ├── layout.css
│       ├── sizing.css
│       ├── effect.css
│       ├── transition.css
│       └── color.css
├── ...
```

### E. `package.json` exports 추가

```json
"exports": {
  "./prose": "./dist/css/prose.css",
  "./utilities/full": "./dist/utilities/full.css",
  "./utilities/spacing": "./dist/utilities/by-category/spacing.css",
  "./utilities/typography": "./dist/utilities/by-category/typography.css",
  "./utilities/layout": "./dist/utilities/by-category/layout.css",
  "./utilities/sizing": "./dist/utilities/by-category/sizing.css",
  "./utilities/effect": "./dist/utilities/by-category/effect.css",
  "./utilities/transition": "./dist/utilities/by-category/transition.css",
  "./utilities/color": "./dist/utilities/by-category/color.css"
}
```

### F. CHANGELOG `[Unreleased]` 추가 항목

- Utility layer 확장 (spacing/typography/layout/sizing/effect/transition/color/state-variants/responsive)
- Prose sub-export (`@verobee/design/prose`)
- Build pipeline 분해 (`src/build/utilities/{category}.mjs`)

## 검증 (manual + automated)

| 항목 | 방법 |
| ---- | ---- |
| Build pass | `pnpm --filter @verobee/design build` |
| Class count sanity | utility 클래스 총 개수 측정 — 추정 ~1500 (state/responsive 곱셈 포함) |
| File size | `dist/utilities/full.css` ≤ 100 KB (gzip ≤ 15 KB) 가이드라인 |
| Cascade order | `@layer vds-utilities` 안에 모두 위치 |
| Verobase 통합 | dashboard `globals.css` 에 import 후 빌드 통과 확인 |

## Out of scope (이번 SDD)

- Arbitrary values (의도적 제외)
- Container queries (Baseline 미달)
- Group/peer (architectural mismatch)
- 추가 토큰 (이번에는 토큰 → utility 매핑만)
