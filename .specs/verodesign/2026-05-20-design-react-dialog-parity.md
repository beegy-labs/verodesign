# Scope — design-react Dialog: placement + scrim backdrop + panel focus (②⑩⑯ React 레이어 이식)

> 근본 원인: 소비자(app-girok)는 `@verobee/design-react` 의 **React
> `Dialog`**(웹컴포넌트 `vds-dialog` 와 별개 재구현)를 렌더한다.
> 2026-05-19~20 의 ②(scrim)·⑩(초기포커스/닫기링)·⑯(placement=bottom)
> 은 `vds-dialog`(design-elements)에만 들어가 **app 에 0 반영**. 이
> 파일이 진짜 소비 지점이므로 동등 이식한다. ⑭ Tabs 와 동일 패턴.

대상: `packages/design-react/src/components/Dialog.tsx` (+ dist 재빌드).

## 현재 (확인됨)

- backdrop: `background: color-mix(in oklab, var(--vds-theme-text-primary)
  50%, transparent)` — **scrim 토큰 미사용·blur 없음** → 약한 딤.
- 항상 center(`alignItems/justifyContent: center`), `placement` prop
  없음 → bottom-sheet 불가.
- 열릴 때 `firstFocusable.focus()` = 닫기 `×` 포커스 → 포커스 링 박스
  상시 노출. 닫기버튼 `...focusRing`.
- panel: `var(--vds-theme-bg-elevated)`, radius-lg, shadow.

## 변경 (additive·기본 동작 보존)

1. `placement?: 'center' | 'bottom'` prop 추가, **기본 `'center'`**
   (기존 모든 소비자 회귀 0). `bottom`:
   - backdrop `alignItems: flex-end`(하단 정렬).
   - panel: `width:100%`, `maxWidth:none`, 상단만 `var(--vds-radius-lg)`
     (하단 0), 하단 `env(safe-area-inset-bottom)` 패딩/여백, 아래→위
     슬라이드(`transform: translateY(...)` open 시 0; `prefers-reduced-
     motion` 시 transition 제거).
   - panel 상단 중앙 **드래그 핸들**(시각, 토큰 색/크기 — `--vds-theme-
     border-*`/spacing/radius-full). 제스처 닫기는 선택, 최소=핸들+
     기존 backdrop/Esc 닫기.
2. backdrop `background` → **`var(--vds-theme-scrim)`** (text-primary
   50% 대체) + `backdrop-filter: blur(var(--vds-blur-lg))` 및
   `-webkit-backdrop-filter`. center/bottom 공통 적용(② 의도대로
   scrim 토큰이 실제 반영, 강한 블러+딤). raw 값 금지(토큰만).
3. 초기 포커스: 열릴 때 `firstFocusable`(=닫기 ×) 대신 **panel
   컨테이너**(`role="dialog"` div, `tabIndex={-1}`)에 focus → 마운트
   시 닫기버튼 포커스 링 미노출(⑩). Tab 으로 닫기 도달 시 `focusRing`
   은 그대로(WCAG 가시 포커스 — 제거 금지, 자동노출만 차단). focus
   trap·Esc·backdrop 닫기·`vds-close`·복원·`aria-modal`/`labelledby`
   불변.

## 제약 (verodesign skills)

- additive·기본 center·기본 동작/소비자 회귀 0. cross-brand: 색은
  `var(--vds-theme-*)` 토큰만, 브랜드 분기 없음 → zero diff. semantic/
  theme 토큰 신설 없음(scrim 은 ② 에서 이미 신설됨, 재사용).
- `Dialog.tsx` 만(+ design-react dist 재빌드). app-girok·레포 기존
  미커밋 드리프트(build 스크립트/typography/design-pkg dist) 손대지
  말 것. EntryDialog 등 다른 컴포넌트 불변.

## 검증

- `pnpm --filter @verobee/design-react validate` / build / 타입체크
  통과까지 자체 재시도(최대3회). 회귀 테스트(있으면): center 기본
  렌더, bottom 렌더, Esc/backdrop/focus-trap/복원 보존, 초기 포커스가
  닫기버튼이 아님.
- dist grep: `placement` 처리, backdrop 가 `var(--vds-theme-scrim)`+
  `blur`, 초기 포커스 panel. app-girok 가 새 dist 집으려면 필요한
  절차 명시(file: 스냅샷 stale 가능 — `pnpm install` 만으론 갱신
  안 될 수 있음, 강제 재동기화 필요 보고).

## 응답(≤400토큰, 코드/diff/로그 금지)
- 변경 파일(경로 — 의도)
- placement bottom 구현 + backdrop scrim/blur + 초기 포커스 처리
- center/소비자 회귀 0 근거 + 사용 토큰(신설 없음)
- 빌드/validate + dist grep + app 재동기화 필요 절차
- cross-brand zero diff / 범위 일탈
