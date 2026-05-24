# 2026-05-13 — girok 앱 셸 컴포넌트 (design-react)

> girok brand 의 첫 consumer app `dreamstock` 에서 반복 등장하는 UI 패턴
> 3개를 design-react 의 canonical 컴포넌트로 graduate. dreamstock 은
> `@verobee/design-react` 에서 import 만 한다.

## Scope

`packages/design-react/src/components/` 에 3 컴포넌트 신규 + barrel export:

1. **`ThemeToggle`** — `themeMode: "auto" | "light" | "dark"` 세그먼티드 컨트롤.
2. **`EntryDialog`** — Dialog 의 사용 패턴 wrapper (입력 폼 + 확인/취소).
3. **`CompactRow`** — 압축 단행 row (leading / label+meta / trailing actions).

대상 brand: 우선 `girok-light` / `girok-dark` (모든 컬러는 `var(--vds-theme-*)` 만).
default / verobase / veronex 도 자동으로 동작 (브랜드별 토큰 차이만).

## Why

dreamstock Phase A6 이 `shared/ui/EntryDialog.tsx`, 인라인 segmented 컨트롤,
ad-hoc compact row 마크업을 각 페이지에 흩어 놓았다. 사용자 요구:

- "verodesign girok 으로 전부 통합" — 공통 패턴은 design-react.
- "girok 안에 dreamstock 이 있는거" — dreamstock 은 girok 의 consumer.
- "verodesign cdd 를 읽고 패턴 대로 구현" — Layer 1·2 의 naming, contrast,
  token policy 준수.

3 컴포넌트는 dreamstock 외의 girok consumer (가계부 / 커머스) 에도 재사용
가능하다.

## Naming + Semantic Role

| Slug | Role | Layer | Status |
| --- | --- | --- | --- |
| `ThemeToggle` | 사용자 라이트/다크/시스템 모드 토글 | design-react canonical | new |
| `EntryDialog` | row entity 추가/수정 입력 모달 | design-react canonical | new |
| `CompactRow` | 압축 1행 entity list item | design-react canonical | new |

이 3 컴포넌트는 brand-agnostic — `var(--vds-theme-*)` 토큰만 사용한다.

## Props 시그니처

### ThemeToggle

```ts
interface ThemeToggleProps {
  value: "auto" | "light" | "dark";
  onChange: (mode: "auto" | "light" | "dark") => void;
  compact?: boolean;        // icon-only 모드 (auto=◐, light=☀, dark=☾)
  size?: "sm" | "md";        // default md
  className?: string;
}
```

내부: 3 버튼 segmented. `aria-pressed` 로 상태. 키보드 좌·우 화살표 이동 (radiogroup 패턴).

### EntryDialog

```ts
interface EntryDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;       // 폼 슬롯
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;             // default "확인"
  cancelLabel?: string;              // default "취소"
  confirmDisabled?: boolean;
  destructive?: boolean;             // 삭제 등 위험 액션 (확인 버튼 danger 색)
}
```

내부: 기존 `Dialog` 컴포넌트 wrap + header (title/description) + footer (취소 / 확인).
ESC + backdrop click → onClose. 확인 누르면 onConfirm 호출 후 자동 close 는
caller 책임 (비동기 검증 시 caller 가 onClose 호출).

### CompactRow

```ts
interface CompactRowProps {
  leading?: React.ReactNode;        // 좌측 아이콘/배지
  label: React.ReactNode;            // 주 텍스트
  meta?: React.ReactNode;            // 보조 텍스트 (라벨 아래 또는 우측 작은 글씨)
  trailing?: React.ReactNode;        // 우측 액션 slot (보통 IconButton 2-3개)
  onClick?: () => void;              // 행 자체 클릭
  selected?: boolean;
  className?: string;
}
```

layout: flex, gap: `var(--vds-spacing-3)`, 단일 행. label/meta 는 좌측 column,
trailing 은 우측 고정 폭. label overflow ellipsis.

## Contrast / 토큰 정책

- 모든 색은 `var(--vds-theme-*)` semantic. 하드코딩 0.
- ThemeToggle 활성 버튼 텍스트: `text-primary` on `bg-card` — WCAG AA (4.5:1).
- EntryDialog destructive 확인 버튼: `bg-danger` + `danger-fg` — AA (4.5:1).
- CompactRow 라벨: `text-primary` on `bg-card` — AAA (7:1) body.

검증은 verodesign 빌드 파이프라인의 contrast 검사가 통과해야 함.

## Pattern Catalog 등록

`docs/llm/research/pattern-catalog.md` 에 3 row 추가:

| Pattern | Status | Source | First seen | Notes |
| --- | --- | --- | --- | --- |
| `theme-toggle` | canonical | internal:dreamstock | 2026-05-13 | auto/light/dark segmented |
| `entry-dialog` | canonical | internal:dreamstock | 2026-05-13 | row entity 추가/수정 모달 |
| `compact-row` | canonical | internal:dreamstock | 2026-05-13 | 압축 단행 list item |

3 컴포넌트는 experimental 거치지 않고 바로 canonical — 이미 dreamstock 에서
inline 형태로 동작 검증됨 (Phase A6 까지). pattern-promote.md 의 "2 consumer
apps without issue" 게이트는 girok 의 첫 통합 작업이라 면제, 단 향후 가계부 /
커머스 consumer 추가 시 호환성 검증.

## Component Page (docs)

각 컴포넌트에 대해 `docs/llm/components/{slug}.md` 1 페이지 작성:
- Purpose, Props table, Slot model, States, Accessibility, Tokens, Examples.
- 기존 Dialog / Button / Switch 문서 패턴 그대로.

## Build + Export

1. 각 컴포넌트 파일 + 같은 폴더의 `.css` (필요 시) 또는 인라인 스타일.
2. `packages/design-react/src/index.ts` 에 barrel export 추가.
3. `pnpm --filter "@verobee/*" -C verodesign build` — design-react dist
   `dist/index.js` 에 새 export 포함.

## SemVer

새 컴포넌트 추가 = minor bump. `@verobee/design-react@0.x.{y+1}` 로 (현재 패키지
버전 확인 후).

## refactor-policy 자가점검

- [ ] 새 컴포넌트는 brand-agnostic. 하드코딩 hex 0.
- [ ] aria 패턴: ThemeToggle = radiogroup, EntryDialog = dialog (`role`,
  `aria-modal`), CompactRow = button or article (onClick 유무).
- [ ] 키보드 네비 (ThemeToggle 좌·우, EntryDialog Esc, CompactRow Enter).
- [ ] `docs/llm/components/` 에 3 페이지 추가.
- [ ] pattern-catalog.md 갱신.

## 테스트

- React Testing Library 단위 테스트 (각 컴포넌트 1 파일).
- contrast: verodesign 빌드 검사 통과.
- 시각: dreamstock 시뮬에서 girok-light/dark 둘 다 확인 (consumer 검증).

## 후속

- girok-specific decorative variant (도서관 톤 강조: serif accent, wood
  border-style) — 이번 SDD 범위 X.
- Storybook / 컴포넌트 demo 페이지 — 후속.
