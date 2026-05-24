# Pattern Intake: account-badge

[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: component.
External authority needed: no — source is internal (app-girok design.txt via catalog units).

## Source
- catalog: `app-girok/docs/design/units/assets-overview-cash.md`, `app-girok/docs/design/units/invest-positions.md`
- INDEX cross-cutting row: `<AccountBadge> | component | assets-overview-cash, invest-positions | P2`

## Why
`account-badge`는 계좌, 은행, 브로커, ticker initial을 짧은 원형 배지로 식별하는 패턴이다. `assets-overview-cash`와 `invest-positions` 모두에서 identity chip으로 쓰이며, status chip과는 다른 읽기 목적을 가진다.

특히 `invest-positions`는 한국 finance 관습을 따르는 `up=red / down=blue` ticker tone을 동반한다. Phase A의 girok status binding과 Phase B의 `exp.girok.market.*`, `exp.girok.icon-tile.*` 없이는 source unit의 시각 언어를 정확히 설명할 수 없다.

## Pattern surface (구조)
- container: fixed square or circle, default 32px to 40px
- shape: `rounded-full`
- content: 1 to 2 character short label or initial
- visual: muted surface + subtle border + emphasized glyph color
- states: default, selected/current-context, disabled
- variants: `size="sm|md"`, `tone="neutral|accent|brand"`

## Tokens added
- existing canonical: `theme.bg.card`, `theme.bg.selected`, `theme.border.default`, `theme.text.primary`, `theme.text.secondary`
- existing canonical (Phase A 보강): `theme.info`, `theme.info-fg` (girok 양 mode)
- new experimental (Phase B): `exp.girok.icon-tile.{info, success, warning, danger}` (tinted leading badge surface)
- new experimental (Phase B): `exp.girok.market.{up, down}` (ticker tone — 한국 finance 관습)

## Slot group
existing `core`

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| `theme.text.primary` on `theme.bg.card` | light 15.11:1, dark 14.37:1 | AAA 7:1 | Yes |
| `theme.info-fg` on `theme.info` | light 6.95:1, dark 7.38:1 | AA 4.5:1 | Yes |
| `exp.girok.market.up` on `theme.bg.page` | light 5.33:1, dark 6.52:1 | AA 4.5:1 | Yes |
| `exp.girok.market.down` on `theme.bg.page` | light 5.53:1, dark 7.85:1 | AA 4.5:1 | Yes |
| `exp.girok.market.up` on `theme.bg.card` | light 5.78:1, dark 6.05:1 | AA 4.5:1 | Yes |
| `exp.girok.market.down` on `theme.bg.card` | light 6.00:1, dark 7.29:1 | AA 4.5:1 | Yes |
| `exp.girok.icon-tile.{info,success,warning,danger}` | decorative only, no text rendered | N/A | Yes |

## Component API (drafted, not implemented)
```ts
type Props = {
  label: string;
  ariaLabel?: string;
  tone?: "neutral" | "accent" | "brand";
  size?: "sm" | "md";
  selected?: boolean;
  disabled?: boolean;
};
```

## Cross-brand zero-diff plan
`exp.girok.*`는 girok brand-scoped experimental token이므로 다른 brand가 동일 binding을 따라야 할 의무는 없다. canonical `theme.*`는 system-wide slot parity가 아직 완결되지 않았고, 다른 brand의 status/light 보강은 별도 SDD 범위다. 본 spec은 girok light/dark에서만 AA를 보장하며, cross-brand 검증은 동일한 geometry와 DOM structure 유지에 한정한다.

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
- catalog INDEX row `<AccountBadge> | component | assets-overview-cash, invest-positions | P2` 와 source unit의 `institution badge glyph with semantic tint`, `profit color semantics reversal` 메모가 직접 연결된다.
- `exp.girok.market.*`는 mode-aware alias다. Phase B audit `bpoqn12o5` 실측값 기준으로 only girok light/dark AA를 보장한다.
