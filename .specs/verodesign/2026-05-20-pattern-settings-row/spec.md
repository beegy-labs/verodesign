# Pattern Intake: settings-row

[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: component.
External authority needed: no — source is internal (app-girok design.txt via catalog units).

## Source
- catalog: `app-girok/docs/design/units/settings-system-links.md`, `app-girok/docs/design/units/settings-data-log.md`
- INDEX cross-cutting row: `<SettingsRow> | component | settings-system-links, settings-data-log | P2`

## Why
`settings-row`는 tinted leading icon tile, text stack, trailing chevron, grouped divider rhythm을 함께 갖는 navigation row 패턴이다. 단순 compact row보다 정보 계층과 affordance가 더 강하다.

source unit은 `bg-indigo-500/10`, `bg-emerald-500/10`, `bg-amber-500/10`, `bg-rose-500/10`을 직접 사용하므로, Phase B의 `exp.girok.icon-tile.*` 없이는 row의 핵심 surface를 설명할 수 없다.

## Pattern surface (구조)
- container: full-width button or link row
- leading: optional icon tile
- body: title + description or status text
- trailing: chevron or status adornment
- group behavior: optional divider between sibling rows
- states: default, hover, focus-visible, disabled
- variants: `info`, `success`, `warning`, `danger`, `neutral`

## Tokens added
- existing canonical: `theme.bg.card`, `theme.bg.hover`, `theme.border.subtle`, `theme.text.primary`, `theme.text.secondary`
- existing canonical (Phase A 보강 + 기존 info): `theme.success`, `theme.warning`, `theme.info`, `theme.destructive`
- new experimental (Phase B): `exp.girok.icon-tile.{info, success, warning, danger}` (leading icon tile alpha tints)

## Slot group
existing `core`

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| `theme.text.primary` on `theme.bg.card` | light 15.11:1, dark 14.37:1 | AAA 7:1 | Yes |
| `theme.text.primary` on `theme.bg.hover` | light 14.68:1, dark 12.55:1 (repo `contrastRatio()` direct calc — contrast-report.json 미수록 pair) | AA 4.5:1 | Yes |
| `theme.info-fg` on `theme.info` | light 6.95:1, dark 7.38:1 | AA 4.5:1 | Yes |
| `theme.success-fg` on `theme.success` | light 5.89:1, dark 5.10:1 | AA 4.5:1 | Yes |
| `theme.warning-fg` on `theme.warning` | light 4.80:1, dark 9.00:1 | AA 4.5:1 | Yes |
| `exp.girok.icon-tile.{info,success,warning,danger}` | decorative only, no text rendered | N/A | Yes |

## Component API (drafted, not implemented)
```ts
type Props = {
  title: string;
  description?: string;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  showChevron?: boolean;
  onClick?: () => void;
};
```

## Cross-brand zero-diff plan
`exp.girok.icon-tile.*`는 brand-scoped experimental token으로, 다른 brand는 동일 alpha tint tile을 구현하지 않아도 된다. canonical status slot parity 역시 미완이므로 본 spec은 girok-only contrast와 row anatomy 유지에 초점을 둔다. divider placement, row height, hit-area는 zero-diff 대상이고 tint mapping은 brand별 override를 허용한다.

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
- catalog INDEX row `<SettingsRow> | component | settings-system-links, settings-data-log | P2` 와 source unit의 `tinted leading icon tile` 메모가 직접 일치한다.
- `settings-data-log.md`의 amber CTA glow는 별도 `exp.girok.shadow.glow.warning` 범주이며, row 자체 contrast 표에는 포함하지 않는다.
