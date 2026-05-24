# 2026-05-16 — Design System Overhaul: clarity(정제) clarity + reliable React delivery

> 사용자 결정(페르소나 5R 수렴, 안 B): 외부 핀테크 앱 레퍼런스 수준의 "명확한" 디자인을
> verodesign 에 적용. 비주얼 토큰 정교화 + **consumer 에서 실제 렌더되는
> 컴포넌트 전달층** 동반 개편(현 Lit+@lit/react 래퍼가 consumer 에서 default
> 로 깨짐 — raw 엘리먼트도 동일 확인).

## Pre-reads / SSOT 정합

- `docs/llm/brands/girok.md` (warm wood, brass 1점, 대비 기준)
- `.specs/verodesign/2026-05-16-girok-modern-expression.md` (원칙 10 — 본
  스펙은 그 원칙의 **구체화 + 전달층 수정**)
- `.specs/verodesign/2026-05-15-girok-palette-refinement.md` (표면계층·brass
  절제 = **본 스펙의 토큰 베이스**. 값 재정의 아님, 델타만 얹음)
- `.add/codex-delegate.md`, `.add/pattern-promote.md`, `consumer-update.md`

## Goals

1. **전달층(핵심)**: `@verobee/design-react` 의 Button/IconButton/Card/
   StatTile/Tabs/PageHeader 를 **hand-written React** 로 재구현(검증된
   ThemeToggle/CompactRow 패턴). 시맨틱 DOM + `vds-*` 클래스/`--vds-*` 토큰
   출력. 공개 API(컴포넌트명·props·import 경로)·DOM/클래스 계약 **불변**.
   → consumer 렌더 결함 근본 해소.
2. **토큰 델타**: palette-refinement 위에 — (a) 평면화(컴포넌트 기본
   elevation/shadow 미사용, 표면차는 명도 1단계로만), (b) 타이포 스케일에
   **대형 numeric tier** 추가(핵심 금액/지표용), (c) **finance semantic
   토큰 신설** `--vds-theme-finance-{up,down,flat}` — 증감 전용, 브랜드
   accent(brass)와 역할 분리.
3. **레이아웃 규범**: 정돈 row(좌 아이콘/이름·보조 / 우 값·%), 카드=모듈,
   화면당 채운 CTA 1·보조=ghost/회색 pill·구분선 0, 모션 토큰 1종.
   컴포넌트 기본값 + `docs/llm/components/*` 에 명문화.

## Non-goals

- Lit `@verobee/design-elements` 웹컴포넌트 제거/태그·attribute·slot·event·
  manifest 변경(프레임워크중립 자산 유지 — React consumer 만 신뢰 경로 전환).
- 공개 컴포넌트 API/props/import 경로 변경(매핑 유지).
- girok hue 정체성 변경(명도/스케일/신규 semantic 만; 값 정밀=Codex,
  contrast audit 게이트 내).
- 다른 brand(default/verobase/veronex) 토큰 변경.
- app-girok 코드 변경(별도 consumer-update 절차).

## Layer 1 — Token deltas (naming/role=정책; 값=Codex, contrast 게이트 내)

| 항목 | 결정(정책) | 대비/제약 |
|---|---|---|
| 평면화 | 컴포넌트 기본 그림자 미사용. 표면 = `bg.page` < `bg.card` 명도 1단계. `elevation` 토큰은 떠있는 레이어(dialog/sheet/popover)에서만 | 비텍스트 경계 ≥3:1 |
| 타이포 | 기존 스케일에 **numeric-display** tier 추가(핵심 금액/지표 대형). 라벨은 `text-secondary/tertiary` 소형 | 본문 AAA, 큰텍스트 AA |
| finance semantic | 신규 슬롯 `--vds-theme-finance-up` / `-down` / `-flat`. 역할=증감/손익 표기 전용. 브랜드 accent(brass)와 분리. 한국장(상승=red/하락=blue) vs 미장(상승=green) **로케일 매핑은 consumer 정책** — 토큰은 의미 슬롯만 제공, 값은 girok 테마 기본 1세트 | finance 색 on bg.card AA(≥4.5:1) |

> girok 다크 베이스는 palette-refinement 결과를 사용(재정의 금지). 본 델타는
> 그 위 추가 슬롯/스케일 + 평면 사용 규칙.

## Layer 2 — Component delivery (핵심 수정)

- 대상: `packages/design-react/src/components/{Button,IconButton,Card,
  StatTile,Tabs,Tab,TabPanel,PageHeader}.tsx`.
- 변경: `createComponent(vds-*)` 래퍼 → **hand-written React**. 시맨틱
  엘리먼트(`<button>`, `<section>`, `<nav>` 등) + `vds-*` 유틸 클래스 +
  `var(--vds-theme-*)` 만. ThemeToggle/CompactRow 와 동일 구현 결.
- **공개 계약 불변**: 컴포넌트명, props 시그니처/기본값, barrel export
  경로, 출력 DOM/클래스(consumer 스냅샷·a11y role/aria) 동일하게 매핑.
  Button: variant `solid|soft|outline|ghost`, tone, size `sm|md|lg`,
  full-width, disabled, type — 모두 유지(값별 시각도 동등).
- `@verobee/design-elements`(Lit) 는 **건드리지 않음** — vds-button 등 태그/
  manifest 그대로(프레임워크중립 consumer 경로 보존).
- a11y: 키보드/role/aria 기존 동등(Tabs=tablist, Button=button,
  PageHeader=banner/heading). 포커스 링·reduced-motion 토큰 유지.

## Layer 3 — Layout norms

- `CompactRow`/`Card`/`StatTile` 기본이 정돈 row·모듈·평면을 강제.
- `docs/llm/components/{button,card,stat-tile,tabs,page-header,
  compact-row}.md` 에 "Layout/Usage" 1절: 화면당 채운 CTA 1, 보조 ghost,
  구분선 0, accent 1점(브랜드)·finance색은 증감 한정.

## SemVer (의도적 — 자동 아님)

- 공개 API/props/import/태그/manifest 불변. 내부 구현(전달 메커니즘) +
  신규 finance 토큰 + 타이포 tier 추가 = **additive/비파괴 → minor**.
  codemod 불필요. 미배포 0.1.0 사이클에 포함(추가 bump 없음).
- `CHANGELOG.md` + `docs/llm/tokens/CHANGELOG.md` 1줄: "design-react:
  hand-written React primitives (reliable consumer render) + finance
  semantic tokens + flat/numeric-display token deltas".

## 검증 (게이트)

- `pnpm --filter "@verobee/*" -C verodesign build` pass.
- contrast audit(`.add/contrast-audit.md`) pass: 본문 AAA, 버튼/컴포넌트/
  finance 색 AA, 경계 3:1.
- `pnpm --filter @verobee/design-elements -C verodesign test:ssr` pass(Lit
  미변경 확인).
- design-react 단위테스트: Button/Card/Tabs/StatTile/PageHeader/IconButton
  mount + variant/슬롯 렌더 단언(consumer 결함 회귀 방지) green.
- **consumer 실측**: app-girok `consumer-update.md` 절차 후 iOS 시뮬에서
  Button variant·라벨·탭·카드가 레퍼런스 톤으로 정상 렌더.

## Phases (codex-delegate 분할)

| P | 범위 | 게이트 |
|---|---|---|
| P1 | Layer 2 전달층(Button/IconButton/Card/StatTile/Tabs/PageHeader hand-written, 공개계약 불변) + 단위테스트 | build/test/SSR + 계약 스냅샷 |
| P2 | Layer 1 토큰 델타(평면 규칙·numeric-display tier·finance 토큰) + contrast audit + CHANGELOG | build + contrast |
| P3 | Layer 3 docs/llm 규범 + 컴포넌트 기본값 정합 | build |
| C  | app-girok `consumer-update.md`(재설치·매핑) + iOS 시뮬 검증 | 시뮬 시각 확인 |
