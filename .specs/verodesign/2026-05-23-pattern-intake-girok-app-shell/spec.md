# Pattern Intake — girok app shell (9 patterns)

> Date: 2026-05-23
> Driver consumer: app-girok (E1-E5 작업)
> Reference SSOT: `/Users/vero/workspace/beegy/app-girok/target.html` + design_demo
> Workflow: `.add/pattern-intake.md` (Pre-reads 생략 — driver consumer 가 이미 사용 중)
> Sibling: `app-girok/.specs/app-girok/2026-05-23-p23-pattern-adopt.md`
> 정책: Pattern Spacing Contract (이미 LOCKED) — 모든 신규 패턴 padding internal only, outer spacing 은 consumer 책임. CSS `@scope` wrapping 필수.

## 동기

E1-E5 작업에서 app-girok 가 9개 신규 컴포넌트를 `.girok-*` CSS 로 prototype. `no-local-design-primitives` 정책에 따라 verodesign 정식 패턴으로 흡수.

## 9 신규 패턴

| Slug | 흡수 대상 (`.girok-*`) | Source | Use |
| ---- | ---------------------- | ------ | --- |
| `girok-page-toolbar` | `.girok-invest-toolbar` | target.html L655-664 | sticky page toolbar (좌 sub-tabs + 우 액션) |
| `girok-currency-toggle` | `.girok-invest-currency-toggle`, `.girok-invest-toggle-pill`, `.girok-stock-currency-toggle/pill/badge` | L660-663 | KRW=zinc / USD=blue 활성 분리 |
| `girok-snowball-hero` | (SnowballChallengeCard tsx 의 inline class 전부) | L671-741 | 큰 gradient hero + progress + sub-card + grid2 |
| `girok-position-card` | `.girok-invest-market-head`, `.girok-invest-ticker-avatar`, `.girok-invest-holding-price`, `.girok-invest-sell-chip` | L758-832 | 보유 포지션 행 카드 |
| `girok-fx-summary-card` | `.girok-assets-fx-card`, `.girok-assets-fx-balance-*`, `.girok-assets-fx-live-*` | L929-945 | 환율 통합 카드 |
| `girok-fx-history-card` | `.girok-assets-fx-history-*` | L947-963 | 환전 히스토리 행 카드 |
| `girok-category-progress-list` | `.girok-ledger-category-*` | L549-571 | 카테고리별 지출 진행바 리스트 |
| `girok-select-card` | `.girok-settings-currency-*` | L975-981 | label + select 카드 |
| `girok-ledger-swapper` | `.girok-ledger-swapper`, `.girok-ledger-weekday*` | L481-499 | weekday header ↔ filter tabs swap row |

## 작업 (verodesign 측)

### A. tokens/experimental/girok-redesign.json — 필요시 신규 토큰 추가

각 패턴 audit 후 기존 토큰으로 충분한지 확인. 보통 충분 (이미 P15-P21 에서 girok-redesign 토큰 충분히 추가됨). 신규 토큰이 정말 필요하면:
- `exp.girok-redesign.{component}.{property}` 명명 규칙
- 모드 무관 단일 값 (girok 은 dark only)

### B. packages/design/src/build/emit-static.mjs — 9 패턴 CSS 정의

각 패턴은 `@scope` 로 wrapping. 예:

```css
@scope (.vds-pattern-girok-currency-toggle) {
  :scope { /* container */ ... }
  .vds-pattern-girok-currency-toggle__pill { ... }
  .vds-pattern-girok-currency-toggle__pill.is-active.is-krw { background: ...; color: ...; }
  .vds-pattern-girok-currency-toggle__pill.is-active.is-usd { background: ...; color: ...; }
}
```

BEM child (`__pill`, `__head`, `__row`, ...) + modifier (`is-active`, `is-krw`, `is-usd`, ...).

각 패턴은 internal styling 만 (padding/색/font/radius/gap). 외부 margin / 좌우 page padding 은 패턴이 갖지 않음 (spacing-contract 준수).

`@scope (.X) to (.X *)` anti-pattern 금지 (P20 회귀 사례).

### C. docs/llm/research/pattern-catalog.md — 9 행 추가

각 행:
```
| {slug} | experimental | internal:app-girok/target.html | 2026-05-23 | clean | {one-line note} |
```

### D. audit-pattern-spacing 통과

```sh
pnpm --filter @verobee/design audit:pattern-spacing
```

신규 패턴들이 `margin` 또는 outer `padding shorthand` 가지면 fail. 통과 보장.

### E. 빌드 + dist 확인

```sh
pnpm --filter "@verobee/*" build
```

dist css 에 9 신규 패턴 모두 출현 검증.

## 응답 (≤500 토큰)

- 9 패턴별 emit-static.mjs 의 라인 위치 (어디부터 어디까지 추가했는지)
- 신규 토큰이 추가됐다면 이름·값
- pattern-catalog 9행 verbatim
- @scope wrapping anti-pattern 검증
- audit-pattern-spacing 결과
- build 결과
- 예외/엣지케이스 (어떤 패턴이 BEM 분해가 까다로웠는지 등)
