# Scope — design-react Dialog 시트 chrome 폴리시 (색상 불변, 디자인만)

> 레퍼런스 이미지#18(목표) vs #19(현재). **색상·토큰 일절 변경 금지**,
> 레이아웃/형태만 정제. 대상: `packages/design-react/src/components/
> Dialog.tsx` (+dist). additive·center 기본 동작 회귀 0.

## #19→#18 차이 (디자인만)

1. **닫기 `×` 무테화**: 현재 `borderRadius: var(--vds-radius-sm)` +
   `...focusRing` 가 rest 상태에서도 박스/링처럼 보임(#19 원형 테).
   #18 = 테/박스 없는 순수 `×` 글리프. 수정: 닫기버튼 **rest =
   border/box/ring 없음**(배경·테두리 transparent, `×`만, 색은 기존
   `var(--vds-theme-text-dim)` 유지). hover = 기존 미묘 bg 토큰 유지.
   `focusRing` 은 **`:focus-visible`(키보드)에서만** 적용(rest 무조건
   적용 금지 — 이게 박스로 보이는 원인). 색값 신규 없음.
2. **헤더 구분선 제거(시트 한정)**: `isBottom` 일 때 title 영역
   `borderBottom: ... border-subtle` **제거**(#18은 하드 divider 없음,
   여백으로 분리). center 모드는 기존 divider 유지(회귀 0).
3. **시트 여백/핸들 정제**: #18 처럼 헤더 위 핸들 → 제목 사이,
   본문/푸터 패딩이 더 여유롭게(기존 `--vds-spacing-*` 토큰 재사용,
   새 값/raw 금지). 제목과 그 아래 보조텍스트(소비자가 description
   으로 넘김)가 **타이트한 2줄 헤더 블록**으로 보이도록 — 현재
   description 을 body 최상단 caption 으로 렌더하는데, `isBottom`
   에서는 **헤더(title 블록) 안 title 바로 아래**에 위치시켜 #18
   처럼 "큰 제목 + 바로 아래 보조" 가 되게(타이포 토큰 기존,
   description 노드는 기존 전달 그대로 사용).

## 제약

- **색/토큰 변경 0** (hex·새 토큰·색 교체 금지, 기존 `var(--vds-*)`
  그대로). placement/scrim/blur/초기포커스/focus-trap/Esc/backdrop/
  `vds-close`/복원/aria 동작 불변. center 기본·기존 소비자 회귀 0.
  raw px 금지(spacing/radius 토큰만). EntryDialog 등 타 컴포넌트 불변.
- design-react dist 재빌드. app-girok·레포 기존 드리프트(build
  스크립트/typography/design-pkg dist) 손대지 말 것. brand-isolation/
  token-ssot 준수, cross-brand zero diff.

## 검증

- `@verobee/design-react` build/타입체크 통과까지 자체 재시도(최대3회).
  (validate/test 기존 baseline 실패는 무관 — 회귀 테스트는 가능 시 추가:
  center divider 유지, sheet divider 없음, 닫기버튼 rest 무테.)
- dist grep: 닫기버튼 rest 무테(focusRing 비-rest), sheet borderBottom
  none, center 불변. app 재동기화 필요 절차 명시(file: 스냅샷 stale —
  강제 dist 교체 필요 보고).

## 응답(≤400토큰)
- 변경 파일(경로 — 의도)
- 닫기 무테/포커스링 조건부 처리 + 시트 divider 제거 + 헤더 2줄 방식
- 색/토큰 무변경·center 회귀 0 근거
- build + dist grep + app 재동기화 절차
- cross-brand zero diff / 범위 일탈
