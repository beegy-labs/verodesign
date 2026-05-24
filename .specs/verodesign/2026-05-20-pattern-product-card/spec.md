# Pattern Intake: product-card

[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: component.
External authority needed: no — source is internal (app-girok design.txt via catalog units).

## Source
- catalog: `app-girok/docs/design/units/assets-overview-savings.md`, `app-girok/docs/design/units/debt-loans.md`
- INDEX cross-cutting row: `<ProductCard> | component | assets-overview-savings, debt-loans | P2`

## Why
`product-card`는 금융상품의 title, meta, 상태 pill, metric, action affordance를 하나의 clickable surface 안에 묶는 패턴이다. savings와 loan은 tone이 다르지만 구조가 가깝다.

특히 `debt-loans.md`는 `priority repayment pill semantics`를 일반 destructive와 분리해야 한다고 직접 기록한다. 따라서 이번 spec은 canonical status token과 함께 Phase B의 `exp.girok.loan.priority` 의존성을 명시해야 한다.

## Pattern surface (구조)
- container: bordered card surface
- header: title + optional mini badge or status
- body: key metrics stack
- footer: optional action row
- variants: `savings`, `loan`, `neutral`
- states: default, hover, selected, disabled

## Tokens added
- existing canonical: `theme.bg.card`, `theme.bg.hover`, `theme.border.default`, `theme.text.primary`, `theme.text.secondary`
- existing canonical (Phase A 보강): `theme.success`, `theme.destructive`, `theme.warning` (만기/연체 상태)
- new experimental (Phase B): `exp.girok.loan.priority` (우선상환 pill — 일반 destructive와 의미 분리)

## Slot group
existing `core`

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| `theme.text.primary` on `theme.bg.card` | light 15.11:1, dark 14.37:1 | AAA 7:1 | Yes |
| `theme.text.primary` on `theme.bg.hover` | light 14.68:1, dark 12.55:1 (repo `contrastRatio()` direct calc — contrast-report.json 미수록 pair) | AA 4.5:1 | Yes |
| `theme.warning-fg` on `theme.warning` | light 4.80:1, dark 9.00:1 | AA 4.5:1 | Yes |
| `theme.destructive-fg` on `theme.destructive` | light 7.81:1, dark 4.51:1 | AA 4.5:1 | Yes |
| `exp.girok.loan.priority` | decorative only, no text rendered | N/A | Yes |

## Component API (drafted, not implemented)
```ts
type ProductCardMetric = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  subtitle?: string;
  variant?: "savings" | "loan" | "neutral";
  badge?: string;
  metrics?: ProductCardMetric[];
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  footer?: React.ReactNode;
};
```

## Cross-brand zero-diff plan
`exp.girok.loan.priority`는 girok-only 의미 분리 token이므로 다른 brand가 동일 pill binding을 채택할 의무는 없다. canonical status slot은 system-wide지만 아직 full parity가 아니므로, 본 spec은 girok-only AA와 source-fidelity만 보장한다. 다른 brand는 동일 card anatomy와 spacing을 유지하면서 자체 binding을 선택하면 된다.

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
- catalog INDEX row `<ProductCard> | component | assets-overview-savings, debt-loans | P2` 와 `debt-loans.md`의 `theme.loan.priority` 제안이 직접 연결된다.
- Phase B token은 14일 soak와 ≥2 cross-screen 유지 후에만 promote 후보가 된다.
