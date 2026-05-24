# Pattern Intake: view-toggle

[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: component.
External authority needed: no — source is internal (app-girok design.txt via catalog units).

## Source
- catalog: `app-girok/docs/design/units/household-ledger-records-toolbar.md`, `app-girok/docs/design/units/invest-quick-actions.md`
- INDEX cross-cutting row: `<ViewToggle> | component | household-ledger-records-toolbar, invest-quick-actions | P2`

## Why
`view-toggle`는 아이콘 중심의 compact two-state view switch다. text-first `binary-pill-toggle`와 달리 좁은 footprint, toolbar embedding, icon emphasis가 핵심이다.

`household-ledger-records-toolbar`는 active chip surface로 `#2E281C`, active icon tone으로 amber 계열을 사용한다. 따라서 Phase A `theme.warning`과 Phase B `exp.girok.bg.segmented-active`, `exp.girok.shadow.glow.accent` 의존성을 분리해서 기록해야 한다.

## Pattern surface (구조)
- container: compact rail inside toolbar or header
- item: icon-only or icon-first button
- selected item: filled sub-surface + emphasized icon color
- unselected item: transparent sub-surface + muted icon color
- states: default, hover, selected, focus-visible, disabled
- variants: `icon-only`, `icon+label`

## Tokens added
- existing canonical: `theme.bg.card`, `theme.text.primary`, `theme.text.secondary`, `theme.border.default`
- existing canonical (Phase A 보강): `theme.warning` (active icon tone — amber-style)
- new experimental (Phase B): `exp.girok.bg.segmented-active` (warm selected chip surface)
- new experimental (Phase B): `exp.girok.shadow.glow.accent` (선택적 — active underline glow)

## Slot group
existing `core`

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| `theme.text.secondary` on `theme.bg.card` | light 8.39:1, dark 10.13:1 (repo `contrastRatio()` direct calc — contrast-report.json 미수록 pair) | AA 4.5:1 | Yes |
| `theme.warning-fg` on `theme.warning` | light 4.80:1, dark 9.00:1 | AA 4.5:1 | Yes |
| `exp.girok.bg.segmented-active` | decorative only, no text rendered | N/A | Yes |
| `exp.girok.shadow.glow.accent` | decorative only, no text rendered | N/A | Yes |

## Component API (drafted, not implemented)
```ts
type ViewToggleItem<T extends string> = {
  value: T;
  label: string;
  icon: React.ReactNode;
};

type Props<T extends string> = {
  value: T;
  items: [ViewToggleItem<T>, ViewToggleItem<T>];
  size?: "sm" | "md";
  disabled?: boolean;
  onValueChange?: (value: T) => void;
};
```

## Cross-brand zero-diff plan
`exp.girok.bg.segmented-active`와 `exp.girok.shadow.glow.accent`는 girok-only 분위기 token이다. 다른 brand는 같은 geometry와 interaction density만 유지하면 되고, warm chip surface나 glow를 그대로 binding할 필요는 없다. canonical `theme.warning`은 system-wide slot이지만 현재 실측 보장은 girok light/dark 범위다.

## Promotion criteria (canonical로 승격될 조건)
- 2주 soak (intake 후 ≥ 14일)
- catalog 기준 ≥2 cross-screen 사용 유지
- ≥1 SDD spec에서 actual feature 사용
- WCAG 재검증
- 사용자 manual approval

## Removal criteria (rejection path)
- 90일 zero usage → auto-flag
- canonical equivalent로 대체됨
- contrast 근본 실패

## Notes
- catalog INDEX row `<ViewToggle> | component | household-ledger-records-toolbar, invest-quick-actions | P2` 와 `icon-only 2-state view toggle` 메모가 직접 대응한다.
- Phase B token은 catalog 기준 ≥2 cross-screen + 14일 soak 후에만 promote 가능하다.
