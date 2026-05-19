# Scope — design-react Dialog: 진짜 바텀시트(edge-to-edge·아래서 슬라이드) (색 불변)

> 소비자 #18 의도인데 현재 "팝업처럼 뜨고 꽉 안 참". 근본원인 3가지(소스 실측).
> 색/토큰 일절 불변. center·모든 기존 소비자·cross-brand zero diff.
> 대상: `packages/design-react/src/components/Dialog.tsx` (+dist 재빌드).

## 근본원인 → 수정 (isBottom 한정)

1. **backdrop 패딩이 시트를 인셋**: 현재 isBottom backdrop
   `padding: var(--vds-spacing-4) var(--vds-spacing-4) calc(var(--vds-spacing-4)+safeArea)`
   → 좌우/상단 spacing-4 여백으로 시트가 화면에서 떠 보임.
   **수정**: isBottom backdrop 패딩 = 좌우 0·상단 0·하단만
   `env(safe-area-inset-bottom)` (panel 이 화면 좌/우/하단에 flush,
   맨 아래에서 올라옴). center 패딩 불변.
2. **닫힘 transform 이 미세 오프셋 → 팝업처럼**: 현재 닫힘
   `translateY(calc(var(--vds-spacing-12)+safeArea))` (≈작음).
   **수정**: 닫힘 = `translateY(100%)` (뷰포트 완전 아래),
   열림 = `translateY(0)` → 아래서 위로 슬라이드. transition 토큰
   기존 유지, `prefers-reduced-motion` 시 transition 제거(즉시) 기존 로직 유지.
3. **소비자 style 이 시트 지오메트리를 덮음**: panel `style={{...geometry,
   ...style}}` 에서 `...style` 가 **마지막** → 소비자(EntryFormDialog)
   `borderRadius: var(--vds-radius-lg)`(4모서리)가 시트 상단-only
   라디우스를 덮어 카드처럼 보임. **수정**: isBottom 일 때 시트
   지오메트리(`borderRadius` 상단-only, `width:100%`, `maxWidth:none`,
   `transform`, position 관련)는 **소비자 style 보다 우선**(geometry 를
   `...style` 뒤에 재적용하거나, isBottom 에서 해당 키를 소비자 override
   에서 제외). center 모드는 **기존대로 소비자 style 우선**(회귀 0).

## 제약

- 색/토큰/raw 변경 0 (기존 `var(--vds-*)`만, 새 토큰·hex·raw px 금지).
  scrim/blur·focus-trap·Esc·backdrop close·`vds-close`·복원·aria·초기
  포커스(panel)·닫기버튼 무테(키보드 focusRing) **불변**. center 기본·
  기존 소비자(EntryDialog 등)·cross-brand **zero diff**. additive.
- `Dialog.tsx` + design-react dist만. 레포 기존 드리프트(design-pkg
  dist/typography/build script) 미접촉.

## 검증

- `@verobee/design-react` build/타입체크 통과(최대3회 자체재시도).
  가능 시 회귀 테스트: center 렌더·소비자 style 우선 유지, isBottom
  닫힘 translateY(100%)·backdrop 좌우패딩 0.
- dist grep: isBottom backdrop 좌우/상단 패딩 0, 닫힘 translateY(100%),
  isBottom geometry 가 소비자 style 뒤. app 재동기화 절차 명시
  (file: dist stale → 강제 교체 + 앱 simctl uninstall 후 재설치 필요 보고).

## 응답(≤400토큰, 코드/diff 금지)
- 변경 파일(경로 — 의도)
- 3 근본원인 처리(backdrop flush / translateY(100%) 슬라이드 / geometry
  소비자우선 차단) + center 회귀 0 근거
- 색/토큰 무변경 + build + dist grep + app 재동기화(uninstall 포함) 절차
- cross-brand zero diff / 범위 일탈
