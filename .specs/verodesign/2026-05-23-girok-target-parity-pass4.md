# girok-redesign 패턴 픽셀 패리티 Pass4 — target.html 매칭

> Date: 2026-05-23
> Consumer: `app-girok` (P17, iPhone 17 Pro 시뮬)
> Reference: `app-girok/target.html` 단일 React JSX mock — Tailwind 값을 SSOT 로 사용
> Sibling: `.specs/app-girok/2026-05-23-p17-shell-cleanup.md`
> 영향 범위: girok 전용 (`exp.girok-redesign.*` 네임스페이스). 타 소비자(veronex/verobase/dreamstock) 무영향.

## 배경

P15→P16 후 시각 비교 결과 5개 패턴(wordmark/tab-l1/tab-l2/stats/calendar-dot)의 크기·padding·border 가 target.html 과 어긋남. 모두 토큰 차원에서 보정 가능.

## 변경 (tokens/experimental/girok-redesign.json)

### A. Wordmark (target.html L401: `text-xl font-extrabold tracking-tighter`)
- `wordmark.size`     : 1.875rem → **1.25rem** (20px)
- `wordmark.weight`   : 900 → **800**
- `wordmark.tracking` : -0.05em (유지) 또는 -0.025em 조정 검토 — target `tracking-tighter` = -0.05em 이므로 유지 OK
- dot 색 : 현 `nav-tab-active` 유지 (target `text-amber-500` 와 정합)

### B. Tab-L1 (target.html L411-415: 1-Depth 탭)
- `tab-l1.font-size`        : 현 값 → **0.9375rem** (15px)
- `tab-l1.weight-inactive`  : → **700**
- `tab-l1.weight-active`    : → **700** (target 도 동일 font-bold, extrabold 아님)
- `tab-l1.underline-height` : 4px → **3px**
- 신규 `tab-l1.padding-x`   : **1rem** (px-4)
- 신규 `tab-l1.padding-y`   : **0.75rem** (py-3)
- 신규 `tab-l1.min-width`   : **4rem** (min-w-[64px])
- 신규 `tab-l1.scroll-padding-x` : **0.5rem** (px-2)
- 신규 `tab-l1.underline-inset` : **0.5rem** (left-2 right-2 = 양쪽 8px inset, 100%-16px 폭)
- `tab-l1.underline-glow`   : **삭제 또는 none** (target 에 glow 없음 — 디자인 클린함이 목적)
- CSS 변경: `.vds-pattern-girok-tab-l1__scroll` padding 토큰 참조, `.vds-pattern-girok-tab-l1__item` padding·min-width 토큰 참조, underline `width:78%` → `left/right: inset` 방식으로 변경 (translateX 제거하고 `left: var(--inset); right: var(--inset);` 사용해도 동일).

### C. Tab-L2 (target.html L429-432: 세그먼티드 가계부/분석/관리)
- `.vds-pattern-girok-tab-l2` min-height : 3.5625rem → **자연 높이** (min-height 제거 또는 2.5rem)
- 패딩: 0.625rem → **0.25rem** (p-1 = 4px 가 target)
- 셀 padding (`.__cell`): `0.75rem var(--vds-spacing-2)` → **0.375rem 0** (py-1.5)
- 신규 또는 갱신 token `tab-l2.padding` = 0.25rem, `tab-l2.cell-padding-y` = 0.375rem
- 활성 chip border 색 : 현 `border-active` 토큰 값을 target `#483E2C` 와 일치 확인. 다르면 토큰값 조정.
- 활성 chip bg : 현 `toggle-active-bg` 값이 target `#2E281C` 와 일치 확인. 다르면 조정.

### D. Stats (target.html L466-483)
- `.vds-pattern-girok-stats` border-radius : 1.25rem → **0.75rem** (rounded-xl = 12px)
- `.__cell` min-height : 7.375rem → **삭제 또는 4.5rem** (target 자연 높이 ~72)
- `.__cell` padding : `1.125rem 0.75rem 1rem` → **0.75rem** (p-3 사방 12px)
- `stats.label-size`  : 현 값 → **0.625rem** (10px)
- `stats.value-size`  : 현 값 → **0.75rem** (12px)
- `stats.value-weight` : → **700**
- `.__value` margin-top : 0.625rem → **0.25rem** (mb-1 = 4 사이)
- 색: income emerald-400 / expense rose-400 / remaining amber-400 — 기존 토큰값 확인, 다르면 보정.

### E. Calendar dot (target.html L499: `w-1 h-1 bg-amber-400`)
- `calendar.dot-size` : 7px → **4px** (w-1 h-1)
- `calendar.dot-color` : amber-400 매칭 확인

### F. 1-Depth bottom-border (target.html L409)
- `.vds-pattern-girok-tab-l1` border-bottom : 현 `color-mix(border-subtle 42%, transparent)` 가 target `border-zinc-800/80` 와 정합인지 확인. zinc-800 ≈ #27272A 의 80% alpha. 시각 비교 후 보정.

## CSS 소스 수정 위치

`packages/design/src/build/emit-static.mjs` 의 girok 패턴 정의 부분 — 그룹별로 토큰 변수 사용으로 교체. 새 토큰 6-8개 추가.

## 빌드 & 인계

- `pnpm --filter "@verobee/*" build` 통과
- app-girok 쪽 install 은 sibling spec 의 첫 단계에서 처리

## 검증

빌드 후 dist 의 `.vds-pattern-girok-wordmark` font-size 가 1.25rem, `.__cell` (stats) padding 이 0.75rem, calendar `__dot` width/height 가 4px 인지 grep 으로 확인.

## 응답 (≤400 tokens)

- 변경 파일 목록
- 추가/변경된 토큰 이름 + 값 (전체)
- 토큰명 충돌이나 의미상 더 적절한 이름이 있으면 제안
- 빌드 결과
