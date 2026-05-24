# 2026-05-16 — Touch-safe compact button (vds-button / vds-icon-button)

> girok consumer(app-girok)의 "버튼을 컴팩트·세련되게" 요구를 충족하려면
> 디자인 시스템이 **컴팩트한 시각 크기와 ≥44pt 탭 타깃을 동시에** 제공해야
> 한다. 현재 `vds-button` sm = `min-height: 2rem`(32px), `vds-icon-button`
> sm = `padding: var(--vds-spacing-1)` 로 coarse pointer 에서 탭 타깃이
> 44pt 미만이다. 본 스코프는 그 갭 하나만 비파괴로 메운다.

SSOT / 정합:
- Brand 규범: `docs/llm/brands/girok.md` (calm/절제 — 시각 불변 원칙)
- 표현 규범: `.specs/verodesign/2026-05-16-girok-modern-expression.md`
  (원칙 5·8 단일 primary, calm). 본 스코프는 그와 충돌 없음(시각 불변).
- 셸 컴포넌트: `.specs/verodesign/2026-05-13-girok-app-shell-components.md`
  (consumer 는 import 만). 본 스코프는 그 정책을 강화.
- Public API: `PUBLIC_API.md` — `vds-button`/`vds-icon-button` 은 Frozen.

## 문제 정의

WCAG 2.5.8 / iOS HIG 는 인터랙티브 타깃 ≥44pt(coarse pointer)를 권한다.
verodesign 의 컴팩트 사이즈(sm)는 시각과 타깃이 동일해 컴팩트해질수록 탭
타깃이 작아진다. consumer 가 "컴팩트하면서 누르기 쉬운" 버튼을 만들 수 없어
각자 로컬 hack(인라인 minHeight 강제 등)을 만든다 → 디자인 시스템 SSOT 붕괴.

## Goals

1. `vds-button`, `vds-icon-button` 의 **모든 size**에서 coarse pointer 시
   포인터/탭 타깃이 최소 `2.75rem`(44px) 이상이 되도록 한다.
2. **시각 박스(레이아웃·padding·min-height·border·그림자)는 불변**. fine
   pointer(마우스) 동작·외형 불변.
3. Frozen 표면 변경 없음: 신규 attribute/property/event/슬롯 0, size enum
   불변, manifest 불변. 순수 shadow DOM 내부 CSS 추가.

## Non-goals

- size 값/스케일 변경, 신규 size 추가 (API 변경 금지).
- 시각 외형 변경(색/radius/elevation/padding/폰트). calm 원칙 유지.
- 다른 컴포넌트(checkbox/switch/select 등) 동시 적용 — 후속 별도 스코프.
- 토큰 신규(elevation/motion/blur)는 modern-expression 후속 SDD 소관.

## 설계 (구현 계약)

각 컴포넌트의 인터랙티브 요소(`.button`)에 레이아웃에 영향을 주지 않는
확장 hit-area 를 추가한다:

- `.button { position: relative; }` (이미 inline-flex; stacking 영향 없음)
- `.button::after { content:""; position:absolute; }` — 중앙 기준 inset 을
  음수로 잡아 클릭 가능 영역을 최소 `2.75rem` × `2.75rem` 보장.
  `min-block-size`/`min-inline-size` 또는 `inset: calc((2.75rem - 100%)/-2 ...)`
  대신 단순·견고하게: `top/left/right/bottom: 50%; translate; width/height:
  max(100%, 2.75rem)` 패턴 권장(구현자가 가장 견고한 방식 선택).
- `@media (pointer: coarse)` 안에서만 확장 활성(마우스 환경 영향 0).
  fine pointer 에서는 `::after` 미생성 또는 0 영향.
- `pointer-events` 는 `.button` 이 받도록(::after 가 host 클릭을 가리지
  않게 — 같은 인터랙티브 노드 영역 확장이어야 함). 인접 버튼 겹침 시
  시각 영역 우선이 되도록 음수 inset 은 `var(--vds-spacing-1)` 수준으로
  과하지 않게(겹침으로 오탭 유발 금지). 목표는 "각 버튼 ≥44pt 확보"이지
  레이아웃을 밀어내는 게 아니다.
- 모든 값은 토큰: `2.75rem` 도 가능하면 spacing 토큰 조합으로(예: 가장
  근접한 `--vds-spacing-*`); 불가하면 컴포넌트 로컬 상수 1개로 주석.

브랜드 무관: `var(--vds-theme-*)` 불필요(투명 영역). 모든 theme 동일 동작.

## SemVer (의도적 판단 — 자동 bump 아님)

- 변경 성격: **순수 additive, 비파괴**. 시각·레이아웃·Frozen attribute/
  event/manifest 불변. fine pointer 외형/동작 동일. coarse pointer 는
  탭 타깃만 확대(기능 개선, 회귀 아님).
- 판정: **minor bump** (codemod 불필요). `@verobee/design-elements` 및
  re-export 하는 `@verobee/design-react` 둘 다 minor. 정확한 버전은
  `.add/release.md` 절차로. (현재 0.0.1 → 0.1.0 권장, pre-1.0 관례상
  additive=minor.)

## 검증

- `pnpm --filter "@verobee/*" -C verodesign build` pass (contrast 검사 포함 —
  색 변경 없으므로 영향 0).
- 컴포넌트 단위 테스트: 기존 vds-button/vds-icon-button 테스트 green 유지 +
  추가 1개 — coarse pointer 시 인터랙티브 타깃 bounding 이 ≥44px 임을
  단언(jsdom 에서 가능한 범위; 불가하면 CSS 스냅샷/계산값 단언).
- 시각 회귀: fine pointer 기준 sm/md/lg 외형 픽셀 불변(레이아웃 박스 동일).
- showcase 의 button/icon-button 페이지 깨지지 않음.

## 문서 / 카탈로그 (refactor-policy 자가점검)

- [ ] `docs/llm/components/button.md` / `icon-button.md` 에 "Touch target"
  섹션 1개 추가(컴팩트 size 도 coarse 에서 44pt 보장 — 정책 명문화).
- [ ] `docs/llm/research/pattern-catalog.md` 에 `touch-safe-target` 1줄
  등록(status: canonical, source: internal:app-girok, 2026-05-16).
- [ ] 하드코딩 hex 0, 토큰/로컬 상수만, aria 영향 0(시각/역할 불변).

## 후속

- checkbox/switch/select/tab 등 타 인터랙티브 컴포넌트로 동일 패턴 확대
  (별도 스코프, pattern-promote 게이트).
- consumer 적용: app-girok 이 로컬 버튼 재발명을 제거하고
  `@verobee/design-react` 소비로 전환(app-girok 측 SDD).
