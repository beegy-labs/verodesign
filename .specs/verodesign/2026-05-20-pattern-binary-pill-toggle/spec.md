# Pattern Intake: binary-pill-toggle

[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: component.
External authority needed: no — source is internal (app-girok design.txt via catalog units).

## Source
- catalog: `app-girok/docs/design/units/household-ledger-management-fixed-income-expense.md`, `app-girok/docs/design/units/modal-savings-add.md`, `app-girok/docs/design/units/modal-transaction-add.md`
- INDEX cross-cutting row: `<BinaryPillToggle> | component | household-ledger-management-fixed-income-expense, modal-savings-add, modal-transaction-add | P2`

## Why
`binary-pill-toggle`는 지출/수입, 적금/예금처럼 짧은 2분할 선택을 작은 pill rail 안에서 전환하는 compact segmented pattern이다. tabs보다 작고 form choice에 더 가깝다.

이 패턴은 단순 `theme.bg.selected`만으로 끝나지 않는다. girok source unit은 `success`와 `destructive`를 직접 선택 상태에 사용하므로, Phase A의 status binding 보강이 없으면 실제 brand rendering과 spec이 어긋난다.

## Pattern surface (구조)
- container: 2-column pill rail
- item: exactly two options
- selected item: filled surface + emphasized foreground
- unselected item: transparent surface + subdued foreground
- states: default, hover, selected, disabled
- variants: `size="sm|md"`, `emphasis="neutral|success|destructive|brand"`

## Tokens added
- existing canonical: `theme.bg.card`, `theme.bg.selected`, `theme.text.primary`, `theme.text.secondary`, `theme.border.default`, `theme.state.selected`
- existing canonical (Phase A 보강): `theme.success`, `theme.success-fg`, `theme.destructive`, `theme.destructive-fg` (수입/지출 toggle)

## Slot group
existing `core`

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| `theme.text.secondary` on `theme.bg.card` | light 8.39:1, dark 10.13:1 (repo `contrastRatio()` direct calc — contrast-report.json 미수록 pair) | AA 4.5:1 | Yes |
| `theme.success-fg` on `theme.success` | light 5.89:1, dark 5.10:1 | AA 4.5:1 | Yes |
| `theme.destructive-fg` on `theme.destructive` | light 7.81:1, dark 4.51:1 | AA 4.5:1 | Yes |
| shared rail border / divider | decorative only, no text rendered | N/A | Yes |

## Component API (drafted, not implemented)
```ts
type BinaryOption<T extends string> = {
  value: T;
  label: string;
  tone?: "neutral" | "success" | "destructive" | "brand";
};

type Props<T extends string> = {
  value: T;
  options: [BinaryOption<T>, BinaryOption<T>];
  size?: "sm" | "md";
  disabled?: boolean;
  onValueChange?: (value: T) => void;
};
```

## Cross-brand zero-diff plan
이 spec은 canonical structure를 유지하되 girok에서만 Phase A status slot 실측 AA를 보장한다. `theme.success`/`theme.destructive`는 system-wide slot이지만 light-mode parity가 모든 brand에 완료된 상태는 아니므로, 다른 brand binding 보강은 별도 SDD 범위다. brand-scoped experimental token 추가는 없고 anatomy zero-diff만 강제한다.

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
- catalog INDEX row `<BinaryPillToggle> | component | household-ledger-management-fixed-income-expense, modal-savings-add, modal-transaction-add | P2` 와 세 source unit의 `지출/수입`, `적금/예금` 2분할 선택이 동일 패턴으로 수렴한다.
- Phase A 이후 girok light/dark 모두에서 status surface 위 `*-fg`가 AA를 통과하므로 더 이상 `no new tokens`로 기술할 수 없다.
