# Pattern Intake: scrollbar-hide

[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: css-utility.
External authority needed: no — source is internal (app-girok design.txt via catalog units).

## Source
- catalog: `app-girok/docs/design/units/global-main-routing.md`, `app-girok/docs/design/units/tab-assets.md`, `app-girok/docs/design/units/tab-debt.md`, `app-girok/docs/design/units/tab-invest.md`, `app-girok/docs/design/units/tab-settings.md`
- INDEX cross-cutting row: `css-pattern.scrollbar-hide | css-pattern | global-main-routing, tab-assets, tab-debt, tab-invest, tab-settings | P2`

## Why
`scrollbar-hide`는 component가 아니라 scroll container에 적용되는 web-only utility pattern이다. app-girok에서는 메인 라우팅 래퍼와 각 탭 shell이 모두 touch-first full-screen 앱처럼 보이도록 같은 규칙을 반복한다.

이 패턴은 canonical overflow utility만으로는 대체되지 않는다. 핵심은 scrollability는 유지하면서 브라우저별 scrollbar chrome만 숨기는 점이며, webview와 모바일 web shell에서 반복되므로 intake 단계에서 utility 후보로 보관할 가치가 있다.

## Pattern surface (구조)
- target: horizontally or vertically scrollable container
- behavior: scrolling preserved, scrollbar chrome visually hidden
- scope: web/webview only
- states: none
- variants: `x`, `y`, `both`는 구현 검토 대상이지만 intake 범위에서는 단일 utility로 취급

## Tokens added
- no new tokens — utility-only pattern using existing `web` slot group and static browser rules

## Slot group
existing `web`

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| scrollbar chrome hidden utility | decorative only, no text rendered | N/A | Yes |

## Component API (drafted, not implemented)
```ts
type Props = {
  className?: string;
};
```

## Cross-brand zero-diff plan
brand와 무관한 browser utility이므로 `girok`, `default`, `veronex`, `verobase` 모두 동일 selector와 declaration을 공유한다. Phase A/B에 의존하지 않는 web-only utility — token-free pattern.

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
- catalog INDEX row `css-pattern.scrollbar-hide | css-pattern | global-main-routing, tab-assets, tab-debt, tab-invest, tab-settings | P2` 와 source unit 5곳의 `매핑 불가: scrollbar-hide utility alias`가 직접 일치한다.
- Phase A/B token과 무관하므로 이번 재작성은 설명 보강만 수행한다.
