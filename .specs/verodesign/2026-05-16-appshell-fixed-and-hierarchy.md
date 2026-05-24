# 2026-05-16 — AppShell 고정 region + 절제된 위계(elevation/state) 정식화

> 사용자 페르소나 5R 단일 결정(안 B): 앱셸 구조 + 위계 표현을 verodesign
> 컴포넌트·토큰 레이어로 정식화, consumer 는 소비만. 증상: 하단 탭바가
> viewport 고정 안 되고 콘텐츠와 함께 스크롤됨(과거 "자연흐름" 결정이
> `position:fixed` 와 `overflow:auto` 중첩 스크롤러를 혼동) + 컴포넌트가
> 단조(위계 부재).

## 강제 계약 (스킬 — 무조건)

- `.add/skills/brand-isolation.md`: 신규 슬롯/컴포넌트는 cross-brand 자명
  (셸/elevation/state 는 전 브랜드 UI 공통) — 입증 1줄 기록. 타 브랜드
  theme diff 0.
- `.add/skills/token-ssot.md`: 크기·치수는 type.role/스케일 토큰만.
- 용어 "toss/토스" 산출물 금지(중립어).
- EU EAA(WCAG 2.1 AA 법적 바닥): elevation/state 대비 AA 유지.

## Pre-reads / 정합

`docs/llm/decisions.md`, `.specs/verodesign/2026-05-16-design-system-clarity-overhaul.md`,
`2026-05-16-girok-modern-expression.md`(원칙 10 — calm/flat/모션 절제),
`.add/codex-delegate.md`.

## Goals

1. **AppShell 고정 region 컴포넌트** (design-react, hand-written — P1 신뢰
   패턴): `position:fixed` 헤더(top, safe-area-top) + `position:fixed`
   하단 nav 슬롯(bottom, safe-area-bottom) + 그 사이 **단일 문서 스크롤**
   콘텐츠. 탭바/헤더는 콘텐츠와 절대 함께 움직이지 않음.
   - **명문화**: `position:fixed` = viewport 핀. 검정화면 사고가 금지한
     것은 `overflow:auto/scroll` **중첩 스크롤러**이며 fixed 와 무관.
     컴포넌트는 중첩 스크롤러를 만들지 않는다(콘텐츠는 문서 스크롤).
   - 콘텐츠 영역은 헤더/탭바 높이 + safe-area 만큼 padding 확보(겹침 0).
2. **elevation 사용 규칙(단조 탈피, 절제)**: base=flat(그림자 0).
   interactive(버튼/행/카드 액션) 및 floating(고정 탭바/시트/팝오버)만
   미세 elevation(≤ `--vds-elevation-1` 상당). dense 리스트/표는 평면.
   기존 elevation 토큰 값 변경 없이 **사용 규칙 + 컴포넌트 기본값**만.
3. **state 토큰 + 버튼 variant 시각 차등**: hover/press(active)/selected/
   disabled 의미 슬롯 정비(없으면 추가 — `theme.bg.selected`·`bg.hover`
   기존 활용, `press`/`disabled` 보강). `solid`(주 1) / `tonal`(보조) /
   `ghost`(3차) 가 배경·테두리·상태에서 **명확히 구분**되게(현재 단조 →
   위계 부여). accent(brass)·finance(exp.girok) 색은 의도 지점만.
4. **모션**: 탭 전환·press 만 `--vds-motion-*` 1종, `prefers-reduced-motion`
   존중. 신규 모션 라이브러리 금지.

## Non-goals

- 앱별 셸 하드코딩(consumer 재발명) / 로컬 프리미티브.
- girok hue·기존 토큰 값·다른 brand theme 값 변경.
- 화려한 그림자/그라데이션, dense 화면 glass, 기능/도메인 변경.
- 중첩 `overflow:auto/scroll` 스크롤러 신설(검정화면 제약 유지).

## 설계 (정책 고정)

- `AppShell` props: `header?`, `bottomNav?`, `children`(콘텐츠).
  구조: 루트 = 일반 문서 흐름; `header`/`bottomNav` 래퍼만 `position:
  fixed` + z-index 토큰 + safe-area inset; 콘텐츠 래퍼 = `padding-top`/
  `padding-bottom` = 헤더/탭바 region 높이(토큰) + env(safe-area).
  스크롤은 문서(body/html) 1개.
- z-index/region 높이/safe-area = 토큰(`--vds-z-*`, spacing/role). 하드
  코딩 px 금지(token-ssot).
- state: `theme.state.{hover,press,selected,disabled}` 또는 기존 bg.*
  슬롯 매핑 표를 컴포넌트 문서에 고정. Button variant 별 (bg/border/
  text/elevation/state) 매트릭스 명시 — 3 variant 가 시각적으로 또렷이
  다름이 수용 기준.
- 전부 `var(--vds-theme-*)`/`--vds-spacing-*`/role 토큰. 브랜드 무관.

## SemVer

신규 컴포넌트(AppShell)+state 슬롯 보강+사용규칙 = additive/비파괴 →
**minor**(미배포 0.1.0 포함, 추가 bump 없음). 공개 태그/기존 props/import
불변. `CHANGELOG.md`+`docs/llm/tokens/CHANGELOG.md` 중립 1줄.

## 검증 (게이트)

- `pnpm --filter "@verobee/*" build` pass + slot parity + contrast audit
  (AA, state/elevation 포함) pass.
- brand-isolation 스킬: 검출 1·3·4=0, 검출 2 입증 기록. token-ssot:
  검출 1·2=0(역할/토큰만), 검출 3 통과.
- design-react 단위테스트(AppShell mount, variant 시각차 스냅샷) — env
  러너 부재 시 그 사유 보고(억지 우회 금지).
- consumer 검증(별도, app-girok): AppShell 소비 후 iOS 시뮬에서 탭바가
  스크롤과 무관히 **하단 고정**, 헤더 상단 고정, 콘텐츠 겹침 0, 버튼
  variant 위계 또렷.

## Phases (codex-delegate 분할)

| P | 범위 | 게이트 |
|---|---|---|
| S1 | `AppShell` 고정 region 컴포넌트 + z/safe-area 토큰 + 문서 명문화(fixed≠중첩스크롤러) | build, 스킬, mount |
| S2 | elevation 사용규칙 + state 슬롯 보강 + Button variant 시각차등 매트릭스 | build, contrast AA, 스킬 |
| Cs | app-girok consumer-update: 로컬 AppShell→verodesign AppShell 소비, 탭바 고정·위계 적용, 시뮬 검증 | tsc/build, 시뮬 |
