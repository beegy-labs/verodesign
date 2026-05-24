# Scope — design-react Dialog 바텀시트 진입 슬라이드업 + 세로 길이 (색 불변)

> #34: flush·무테×는 정상. 남은 2건: ① 열릴 때 **아래서 위로
> 자연스럽게 슬라이드**(현재 즉시 뜸=팝업), 위로만·아래로 안 움직임.
> ② 시트 **세로 길이 더 길게**. 색/토큰 불변, center·소비자·cross-brand
> zero diff. 대상 `packages/design-react/src/components/Dialog.tsx`(+dist).

## 근본원인(소스 실측)

`Dialog.tsx:73 if (!open) return null` + 소비자(EntryFormDialog)가
닫힘 시 unmount → Dialog 는 **항상 open=true 로만 첫 렌더** → panel
transform 이 첫 페인트부터 `translateY(0)` → `translateY(100%)→0`
전이 프레임이 없어 **애니메이션 없이 즉시 표시**(팝업처럼).

## 변경 (isBottom 한정)

1. **진입 슬라이드업**: Dialog 내부 `entered` 상태(`React.useState
   (false)`) 추가. isBottom 마운트 시: 초기 렌더 `translateY(100%)`
   (화면 아래), `useLayoutEffect`+`requestAnimationFrame` 으로 다음
   페인트에 `entered=true` → `translateY(0)` 로 기존
   `transition: transform var(--vds-duration-medium) var(--vds-easing-
   ease-out)` 가 **아래→위 슬라이드**를 그림. `prefers-reduced-motion`
   (기존 `reduceMotion`): 애니메이션 생략(즉시 0, transition none).
   - **위로만**: 초기=아래(100%), 진입=0. 닫힘은 소비자 unmount 라
     하강 애니메이션 없음(요구사항 "아래로는 안 움직임" 충족) — 닫힘
     동작/`vds-close`/복원 불변.
   - 중복 transform 라인 정리: isBottom transform 단일 소스(merge
     순서에서 entered 기반 값이 최종이 되도록). center: transform
     `undefined` 유지(회귀 0).
2. **세로 길이 증가**: isBottom `maxHeight` 의 상단 인셋 축소 — 현재
   `calc(100dvh - var(--vds-spacing-20))` → 더 작은 spacing 토큰으로
   (예 `var(--vds-spacing-8)`; 토큰만, raw 금지). 추가로 isBottom
   `minHeight` 지정해 콘텐츠 적어도 시트가 길게(예 `60dvh` — dvh
   뷰포트단위는 기존 코드에 이미 사용 중이라 허용, 색/스페이싱
   토큰 규칙 위반 아님). center `maxHeight`/`minHeight` 불변.

## 제약

- 색/토큰 변경 0 (hex·새 토큰·raw px 금지, 기존 `var(--vds-*)`만;
  dvh 뷰포트단위는 기존 패턴 유지). scrim/blur·focus-trap·Esc·
  backdrop close·초기 포커스(panel)·닫기 무테(키보드 focusRing)·
  geometry(상단-only radius·width100%·maxWidth none)·backdrop flush
  **불변**. center 기본·기존 소비자(EntryDialog 등)·cross-brand
  **zero diff**. additive. `Dialog.tsx`+design-react dist만(레포
  기존 드리프트 미접촉).

## 검증

- `@verobee/design-react` build/타입체크(기존 baseline test-type
  실패는 무관) 통과까지 자체 재시도(최대3회). 가능 시 회귀 테스트:
  center 무변, isBottom 초기 translateY(100%)→entered 0, reduced-
  motion 즉시, maxHeight 인셋 축소.
- dist grep: entered 기반 transform, isBottom maxHeight 축소+minHeight.
  **app 재동기화 절차 명시**: design-react dist 를 **모든**
  `@verobee+design-react@*` pnpm 인스턴스에 강제 복사 + 앱 실제
  resolve(realpath) 기준 검증 + `.vite` 클리어 + `simctl uninstall`
  후 재설치 필요(file: 스냅샷·WKWebView 캐시·멀티 인스턴스 트랩).

## 응답(≤400토큰, 코드/diff 금지)
- 변경 파일(경로 — 의도)
- 진입 슬라이드업(entered 상태/rAF, 위로만, reduced-motion) + 세로
  길이(maxHeight 인셋 축소+minHeight) + center 회귀 0 근거
- 색/토큰 무변경 + build + dist grep + app 재동기화(전 인스턴스+
  uninstall) 절차
- cross-brand zero diff / 범위 일탈
