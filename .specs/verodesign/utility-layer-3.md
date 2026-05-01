# SDD: Utility layer (3차) — verobase consumer 갭 (`border` 디폴트 + `outline-*`)

> Status: staged in `[Unreleased]` | Driver: verobase consumer migration | Reference: `docs/llm/decisions.md` § Utility layer | Predecessor: [`utility-layer-2.md`](./utility-layer-2.md)

## Why

`utility-layer-2.md` 머지 후 verobase consumer 빌드/스크린샷 검증에서 두 가지 갭 추가 식별:

1. **`vds-border` (bare, no width/color suffix) 부재** — Tailwind `border` 는 `border: 1px solid var(--tw-border-color)` 디폴트 출력. shadcn 패턴 (Card / Input / Button outline) 의 핵심. verobase 사용 빈도 분석 (2026-05-01) 으로 `className=".. border .."` 사용 70+ 회 — 카드/입력/구분선 윤곽의 **시각적 정의** 가 전부 이 한 클래스에 의존. verodesign 은 width-only (`border-1`) 와 color-only (`border-default`) 를 분리 emit 하지만, 디폴트 단축형이 없어 consumer 가 SSOT 로 전환하면 외곽선이 통째로 사라짐.
2. **`outline-*` family 부재** — `.vds-outline-none` 0 회, `.vds-outline-{size}` 0 회. Tailwind `outline-none` 은 `:focus-visible:outline-none` 과 결합해 native 포커스 outline 을 제거하고 `ring-*` 으로 커스텀 포커스 indicator 를 그리는 표준 관용구. verodesign reset.css 가 `:focus-visible { outline: 2px solid border-focus }` 을 제공하므로 native 제거 utility 만 있으면 충분 (size/color outline utility 는 본 SDD 범위 외).

원칙: 두 갭 모두 a11y/시각적 정의의 **표준 관용구** — consumer 가 명명을 verodesign 에 맞추는 차원이 아닌 **utility 자체가 부재** 한 케이스라 verodesign 흡수.

## 추가 범위

### A. `vds-border` (bare default border utility)

`packages/design/src/build/utilities/effect.mjs` 의 border-width 루프에 디폴트 단축형 추가.

#### 출력 사양

```css
.vds-border    { border-width: 1px; border-style: solid; border-color: var(--vds-theme-border-default); }
.vds-border-t  { border-top-width:    1px; border-top-style:    solid; border-top-color:    var(--vds-theme-border-default); }
.vds-border-r  { border-right-width:  1px; border-right-style:  solid; border-right-color:  var(--vds-theme-border-default); }
.vds-border-b  { border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: var(--vds-theme-border-default); }
.vds-border-l  { border-left-width:   1px; border-left-style:   solid; border-left-color:   var(--vds-theme-border-default); }
.vds-border-x  { border-left-width:   1px; border-right-width:  1px; border-left-style:  solid; border-right-style:  solid; border-left-color:  var(--vds-theme-border-default); border-right-color:  var(--vds-theme-border-default); }
.vds-border-y  { border-top-width:    1px; border-bottom-width: 1px; border-top-style:   solid; border-bottom-style: solid; border-top-color:   var(--vds-theme-border-default); border-bottom-color: var(--vds-theme-border-default); }
```

설계 결정:
- **디폴트 width 1px** — Tailwind 와 동일. verodesign 의 `border.width.1` 토큰 (`var(--vds-border-width-1)` = 1px) 을 직접 참조 대신 hardcoded `1px` 사용 — `.vds-border` 가 토큰 시스템보다 **CSS standard 단축형의 의미를 지니므로** width 토큰 변경에 휘둘릴 필요 없음. (= shadcn `border` 와 의미 동일)
- **디폴트 style: solid** — Tailwind 와 동일.
- **디폴트 color** — `var(--vds-theme-border-default)`. theme 별 dark/light 자동 전환됨. 별도 `.vds-border-{color}` 로 override 가능 (cascade 순서: `vds-border` 가 먼저, 색상 utility 가 나중에 emit 되므로 자연스럽게 override 동작).
- **width-only utility (`vds-border-1`, `vds-border-2`, ...) 와의 cascade** — 기존 `.vds-border-1 { border-width: var(--vds-border-width-1) }` 은 width 만 변경. 사용자가 `class="vds-border vds-border-2"` 로 쓰면 `border-width: 2px` 가 우선 적용 — 의도된 동작.

#### 다른 emit 위치와의 호환

- `color.mjs:22` 의 `.vds-border-${slotName}` 은 색상만 변경 — 본 SDD 의 디폴트 color 를 override.
- `effect.mjs:56-59` 의 `.vds-border-{solid,dashed,dotted,none}` 은 style 만 변경 — 본 SDD 의 디폴트 style 을 override.

### B. `vds-outline-none` + state variant

`packages/design/src/build/utilities/effect.mjs` 에 outline 갭 utility 1 종 추가.

```css
.vds-outline-none { outline: 2px solid transparent; outline-offset: 2px; }
```

설계 결정:
- **2px solid transparent** — Tailwind v3 의 정확한 정의. 0 width 가 아니라 **transparent** 인 이유: high-contrast 모드에서 forced-colors 가 `outline-color` 를 system color 로 강제 변환하므로 width 가 보존되어야 visibility 유지.
- `vds-outline-none` 단독 사용은 흔치 않음 — 보통 `:focus-visible` 과 조합 → state-variants 로 자동 생성.

`state-variants.mjs` 의 `STATES` 배열의 `applyTo` 에 `outline` family 추가 (또는 generic propagation):

```js
{ prefix: 'focus-visible', pseudo: ':focus-visible', applyTo: new Set([..., 'outline']) }
```

생성될 클래스:
- `.vds-focus-visible\:outline-none:focus-visible { outline: 2px solid transparent; outline-offset: 2px; }`
- (`hover:`, `active:` 등도 결합되지만 `outline-none` 은 의미상 focus-visible 외 거의 안 쓰임 — 출력 양은 미미)

### C. CHANGELOG `[Unreleased]` 추가 항목

```
- Added: `vds-border` bare utility (1px solid var(--vds-theme-border-default)) — Tailwind-compat default border shortcut
- Added: `vds-border-{t,r,b,l,x,y}` directional bare utilities (1px solid default color)
- Added: `vds-outline-none` utility (2px solid transparent + 2px offset) — high-contrast safe focus-ring suppressor
- Added: `vds-focus-visible:outline-none` state variant — pair with `vds-focus-visible:ring-*` for custom focus indicators
```

### D. `decisions.md` § Utility layer update

`docs/llm/decisions.md` 의 `[Unreleased]` Utility layer 표에서:

- Effect 행 갱신: 기존 `vds-border-{0..8}` + 본 SDD 의 `vds-border` (bare) + `vds-border-{t,r,b,l,x,y}` (bare directional)
- State variants 행: `outline` family 를 `focus-visible:` applyTo 에 추가
- 신규 행: Outline → `vds-outline-none` (single utility)

## Out of scope (의도적 제외)

- **`vds-outline-{1,2,4,8}` size scale** — Tailwind `outline-{0,1,2,4,8}` 은 width 만 바꾸는 거라 의미는 있지만 verobase 사용 0 회. YAGNI — 추후 사용처 발견 시 별도 SDD.
- **`vds-outline-{color}` slot utilities** — 동일하게 verobase 사용 0 회. focus-visible color 는 reset.css 의 `border-focus` 로 충분.
- **`vds-outline-offset-{n}`** — 동일.
- **`vds-divide-{color}` 디폴트 (color 없는 `vds-divide`)** — verobase 에서 항상 `divide-color` 와 함께 사용 (`divide-y divide-border`). 디폴트 단축형 수요 없음.
- **`vds-border` 의 디폴트 color 를 `border-subtle` 로 — vs `border-default` 결정** — `border-default` 채택 (Tailwind 기본 해석에 가까움; subtle 은 분리 utility 로 사용 권장).

## 구현 순서

1. `effect.mjs` border-width 루프 직후 `.vds-border` (+ `t/r/b/l/x/y`) emit 추가
2. `effect.mjs` 끝부분에 `.vds-outline-none` emit 추가
3. `state-variants.mjs` 의 `STATES` 배열에서 `focus-visible` entry 의 `applyTo` 에 `outline` 추가 (혹은 outline 전용 STATE entry — 구현 시 단순한 쪽 선택)
4. `pnpm --filter @verobee/design build` → `dist/utilities/full.css` 검증
5. `decisions.md` + `CHANGELOG.md` update
6. showcase 앱에 `<div class="vds-border vds-rounded-md vds-p-4">` + `<input class="vds-focus-visible:outline-none vds-focus-visible:ring-2 vds-focus-visible:ring-primary">` 시각 확인

## 검증

| 항목 | 방법 |
| ---- | ---- |
| `.vds-border ` (bare) 생성 | `grep -cE '^\.vds-border ' dist/utilities/full.css` ≥ 1 |
| 방향별 7 종 | `grep -oE '\.vds-border-(t\|r\|b\|l\|x\|y)\b' dist/utilities/full.css \| sort -u` 7 줄 |
| `.vds-outline-none` 생성 | `grep -c 'vds-outline-none' dist/utilities/full.css` ≥ 1 |
| `.vds-focus-visible\:outline-none` 생성 | `grep -c 'vds-focus-visible\\\\:outline-none' dist/utilities/full.css` ≥ 1 |
| 기존 `.vds-border-1` (width-only) 유지 | `grep -c '^\.vds-border-1 ' dist/utilities/full.css` = 1 |
| Build size 증가 | < 1% (~14 rules) |

## verobase 와의 인터페이스

이 SDD 머지 후 verobase 는:

1. `verodesign` re-vendor (`scripts/vendor-verodesign.mjs` 재실행) 만으로 `vds-border` / `vds-outline-none` / `vds-focus-visible:outline-none` 동작 — codemod / tsx 변경 불필요.
2. 카드/입력 외곽선 자동 복원 (codemod 출력 `vds-border` 가 즉시 살아남).
3. `vds-focus-visible:outline-none vds-focus-visible:ring-2 vds-focus-visible:ring-primary` 조합이 동작 — Tailwind 시절 포커스 indicator 와 동일.
