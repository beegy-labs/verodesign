# Pattern Intake: amount-hero

[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: component.
External authority needed: no — source is internal (app-girok design.txt via catalog units).

## Source
- catalog: `app-girok/docs/design/units/assets-overview-total.md`, `app-girok/docs/design/units/debt-summary.md`
- INDEX cross-cutting row: `<AmountHero> | component | assets-overview-total, debt-summary | P2`

## Why
`amount-hero`는 한 화면의 핵심 financial metric을 큰 숫자와 보조 라벨 조합으로 먼저 읽히게 하는 패턴이다. 단순 typography 조합이 아니라, light/dark hero emphasis, paired metric, summary strip까지 포함한 정보 우선순위 패턴이다.

`debt-summary`의 dark gradient surface와 positive/negative metric pair는 Phase A status binding과 Phase B hero surface token 없이는 서술이 불완전하다. 이번 재작성은 그 dependency를 명시하고 mode-aware contrast를 실측값으로 고정한다.

## Pattern surface (구조)
- label: short supporting text above or beside the main value
- value: emphasized numeric headline with compact tracking
- optional: secondary metric, caption, summary strip
- alignment variants: `center`, `start`, `split`
- states: neutral, positive, caution, negative

## Tokens added
- existing canonical: `theme.text.primary`, `theme.text.secondary`, `theme.bg.card`
- existing canonical (Phase A 보강): `theme.success`, `theme.success-fg`, `theme.destructive`, `theme.destructive-fg`, `theme.warning` (girok 양 mode)
- inherited canonical: `theme.warning-fg` (girok-light explicit binding only; girok-dark 는 semantic core inherited 사용 — dark warning surface 위 dark inherited fg 가 9:1 통과. listed 신설 토큰 아님)
- new experimental (Phase B): `exp.girok.surface.hero.{start, end, border}` (gradient hero surface)

## Slot group
existing `core`

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| `theme.text.primary` on `theme.bg.page` | light 13.93:1, dark 15.48:1 | AAA 7:1 | Yes |
| `theme.text.secondary` on `theme.bg.page` | light 7.69:1, dark 10.91:1 | AAA 7:1 | Yes |
| `theme.success-fg` on `theme.success` | light 5.89:1, dark 5.10:1 | AA 4.5:1 | Yes |
| `theme.destructive-fg` on `theme.destructive` | light 7.81:1, dark 4.51:1 | AA 4.5:1 | Yes |
| `theme.warning-fg` on `theme.warning` | light 4.80:1, dark 9.00:1 | AA 4.5:1 | Yes |
| `exp.girok.surface.hero.{start,end,border}` | decorative only, no text rendered | N/A | Yes |

## Component API (drafted, not implemented)
```ts
type Props = {
  label: string;
  value: string;
  align?: "center" | "start" | "split";
  tone?: "neutral" | "positive" | "caution" | "negative";
  secondaryLabel?: string;
  secondaryValue?: string;
  caption?: string;
};
```

## Cross-brand zero-diff plan
`exp.girok.surface.hero.*`는 girok-only token이므로 타 brand가 gradient binding을 그대로 도입할 필요는 없다. canonical status slot은 system-wide schema지만 현재 AA 보장은 girok light/dark 실측 범위로 제한된다. 다른 brand의 parity는 별도 SDD에서 다루고, 본 spec은 amount hierarchy와 layout anatomy의 zero-diff만 요구한다.

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
- catalog INDEX row `<AmountHero> | component | assets-overview-total, debt-summary | P2` 와 `debt-summary.md`의 `paired hero composition, dark gradient surface`가 직접 매칭된다.
- Phase B audit `bpoqn12o5`가 hero surface를 decorative token으로 판정했으므로 본 spec도 text contrast 대상에서 제외한다.
