# SDD: Promote dashboard patterns — verobase dashboard 가 verodesign 만으로 빌드되도록 누락 컴포넌트/variant 흡수

> Status: staged in `[Unreleased]` | Driver: verobase dashboard verodesign migration | Reference: `verobase/.specs/verobase/scopes/dashboard-verodesign-migration.md`

## Why

verobase dashboard (`web/dashboard`) 가 tailwind 를 제거하면서 자체적으로
17 종 wrapper 컴포넌트를 누적했음. verodesign 이 멀티 브랜딩 공통
디자인 시스템임에도 `@verobee/design-react` 는 import 0 건 — verodesign
이 단순 CSS 라이브러리로 격하된 상태.

dashboard 측 마이그레이션 spec(verobase 측 `dashboard-verodesign-migration.md`)
이 verodesign 으로 전부 흡수 진행을 결정. 본 SDD 는 그 의존성으로
**verodesign 자체에 부족한 컴포넌트** 를 흡수하는 작업을 정의.

원칙:
- **이미 존재하는 컴포넌트는 절대 자체 wrapper 로 우회시키지 않는다** —
  Button/Card/TextField/Dialog 등은 그대로 직접 사용.
- **반복되는 layout / typography / compound 패턴** 을 verodesign 컴포넌트
  로 표준화 — 의미를 분명히 하기 위함이지 utility class 자체를 없애는
  것이 목적이 아님 (`vds-*` utility 는 verodesign 자체 디자인 시스템).
- 기본 토큰만 사용해 멀티 브랜딩 (theme-verobase / theme-veronex /
  theme-default) 모든 곳에서 동작.

## 추가 범위

### A. Layout primitives

verodesign 은 현재 layout 컴포넌트가 0 종 (Card 만 있음). consumer 가
`<div class="vds-flex vds-flex-col vds-gap-4">` 처럼 inline 으로 layout
을 표현하는 자리가 많은데, 같은 패턴이 반복될 때는 semantic primitive
가 의미상 더 정확함 (`<Stack gap="4">`).

| 컴포넌트 | 태그 | 핵심 props | 흡수 패턴 |
|---------|------|-----------|----------|
| `Stack` | `<vds-stack>` | `direction="column\|row"` (default column), `gap="0..6"`, `align`, `justify`, `wrap` | `vds-flex vds-flex-{col\|row} vds-gap-N vds-items-* vds-justify-*` |
| `Cluster` | `<vds-cluster>` | `gap="0..6"`, `align="center"` (default), `justify`, `wrap=true` (default) | `vds-flex vds-flex-wrap vds-items-center vds-gap-N` |
| `Grid` | `<vds-grid>` | `cols="1..12"`, `gap="0..6"`, `responsive` (object) | `vds-grid vds-grid-cols-N vds-gap-N` |
| `Box` | `<vds-box>` | `padding`, `paddingX/Y/T/B/L/R`, `margin*`, `maxWidth` (token name 또는 px) | `vds-p-N vds-px-N vds-max-w-*` |
| `Spacer` | `<vds-spacer>` | `axis="vertical\|horizontal"`, `size="N"` 또는 자동 grow | `<div className="vds-flex-1" />` 등 |

설계 결정:
- 모든 spacing 은 `--vds-spacing-{0..6}` 토큰 참조 — Tailwind 의 4px scale
  과 호환 (이미 verodesign tokens.property.css 에 정의돼 있음).
- light DOM (Shadow DOM 미사용) 또는 Shadow DOM + slot fallback — Lit의
  `display: contents` 또는 `<slot>` 패턴.
- React adapter 는 `@lit/react` 동일 패턴.

### B. Typography

`Heading` 만 promote — `<h1..h4>` semantic + 시각적 sizing 분리.
일반 텍스트 (`<p>`, `<span>` + `vds-text-*`) 는 token 직접 사용을
허용 (모든 글자에 컴포넌트 강제는 과도).

| 컴포넌트 | props |
|---------|-------|
| `Heading` | `level="1..4"` (시각 + semantic 동시), `as` (semantic override), `tone="bright\|default\|muted"` |

선택적 (검토):
| `Text` | `size`, `weight`, `tone`, `truncate`, `mono` — inline 사용성 보강용. 미흡수 시 `<span style={{ font-size: var(--vds-font-size-sm) }}>` 도 허용 |

### C. Compound 컴포넌트

dashboard 에서 빈도 ≥ 30 인 compound:

| 컴포넌트 | 슬롯/Props |
|---------|-----------|
| `PageHeader` | `title`, `subtitle`, `actions` slot |
| `EmptyState` | `icon` slot, `title`, `description`, `action` slot, `size="sm\|md\|lg"` |
| `StatTile` | `label`, `value`, `delta` (optional, +/-), `icon` slot, `loading` |
| `Skeleton` | `width`, `height`, `radius` |
| `SkeletonRows` | `count`, `cols`, `height` |

### D. 기존 컴포넌트 보강

- **Dialog**: `size` 에 `xl` (max-w-xl), `2xl` (max-w-2xl) 추가. 현재
  sm/md/lg. dashboard 의 inline 모달이 `max-w-lg` (43건), `max-w-xl` (1건),
  `max-w-2xl` (1건) 까지 다양.
- **Dialog**: `scrollable` boolean prop — `max-h: 90dvh; overflow-y: auto`
  적용 (긴 폼/리스트 용).
- **Button**: `variant="ghost"` 보강. icon-only 케이스에서 `<vds-button
  size="sm">` 안에 `<svg>` 만 있는 경우 padding 균등화 (현재 left/right
  padding 비대칭일 수 있음).
- **Table**: header cell 명시 컴포넌트 검토. dashboard 는 `<th
  className="vds-px-4 vds-py-3 vds-text-left vds-font-medium">` 패턴이
  135 회. `<vds-table-header-cell align="left\|right" compact dim>` 형태.

### E. utilities.css export 정책

verodesign 이 현재 `utilities.css` 를 export 해서 consumer 가 raw class
를 쓸 수 있게 함. 본 흡수가 끝나면 consumer 에게 utilities.css 글로벌
import 를 권장하지 않게 문서 갱신 필요. (실제 file 제거는 후속 작업 —
veronex 등 다른 consumer 의 마이그레이션 기다려야 함.)

## 비범위

- veronex 등 다른 consumer 의 마이그레이션.
- 새 토큰 추가 — 본 SDD 는 컴포넌트만, 토큰은 별도 SDD.
- accounts (web/accounts/) 흡수 — verobase dashboard 와 별도.

## 작업 순서

1. **Pattern intake** (`.add/pattern-intake.md` 워크플로):
   dashboard 자체 wrapper 17 종 분석 + 사용 빈도 + props 매핑 표 작성.
2. **Pattern promote** 별 SDD:
   - `promote-layout-primitives.md` (Stack/Cluster/Grid/Box/Spacer)
   - `promote-typography.md` (Heading + 옵션 Text)
   - `promote-compound.md` (PageHeader/EmptyState/StatTile/Skeleton)
   - `promote-dialog-sizes.md` (Dialog xl/2xl + scrollable)
   - `promote-button-icon.md` (Button ghost + icon-only)
   - `promote-table-header-cell.md` (Table header cell)
3. **구현** — `packages/design-elements/src/components/` 에 Lit element +
   `packages/design-react/src/components/` 에 React adapter.
4. **Showcase** — `packages/showcase/` 에 시연 페이지 추가 + 토큰별
   시각 검증.
5. **Release** (`.add/release.md`) — verodesign 새 버전 publish 또는
   workspace 직접 link 갱신.
6. **Consumer update** — verobase dashboard 의 Phase D/E 진행 (verobase
   측 SDD).

## 영향

- `@verobee/design-elements` 신규 컴포넌트 ~12 종.
- `@verobee/design-react` 신규 export ~12 종.
- 기존 토큰만 사용 — token 추가 없음.
- breaking change 없음 (모두 신규 추가).
