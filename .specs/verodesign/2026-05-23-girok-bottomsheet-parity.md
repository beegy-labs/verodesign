# girok-redesign 데일리 바텀시트 패리티

> Date: 2026-05-23
> Consumer: app-girok (P18)
> Reference: app-girok/target.html L996-1045

## 변경

### A. CTA 버튼 색상 반전 (`.vds-pattern-bottomsheet__cta`)

target.html L1038: `bg-[#2E281C] border border-[#483E2C] text-amber-400`. 현재는 솔리드 amber. 어두운 배경 + amber outline + amber 텍스트로:

```diff
 .vds-pattern-bottomsheet__cta {
-  background-color: var(--vds-exp-girok-redesign-nav-tab-active);
-  color: var(--vds-exp-girok-redesign-shell-frame-surface);
+  background-color: var(--vds-exp-girok-redesign-toggle-active-bg);
+  color: var(--vds-exp-girok-redesign-nav-tab-active);
+  border: var(--vds-border-width-1) solid var(--vds-exp-girok-redesign-border-active);
   ...
-  box-shadow:
-    inset 0 -1px 0 color-mix(in oklab, var(--vds-exp-girok-redesign-shell-frame-surface) 24%, transparent),
-    var(--vds-shadow-lg);
+  box-shadow: var(--vds-shadow-lg);
 }
```

### B. 슬라이드 애니메이션 부드럽게 (verodesign 패턴 + 토큰)

현 `.vds-pattern-bottomsheet__sheet` 의 `animation: girok-modal-sheet-up var(--vds-motion-duration-base)` 가 사용하는 keyframes 는 app-girok 의 index.css 에 정의됨 (`translateY(2rem) → 0`, 32px 만 슬라이드). verodesign 차원에서 keyframes 정의 + 토큰화:

신규 keyframes (`packages/design/dist/patterns/girok-app.css` 내에 정의 — emit-static.mjs 수정):

```css
@keyframes vds-pattern-bottomsheet-slide-up {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

`.vds-pattern-bottomsheet__sheet` 의 animation 을 새 keyframes 로 + duration 늘림:

```diff
-animation: girok-modal-sheet-up var(--vds-motion-duration-base) var(--vds-motion-easing-emphasized);
+animation: vds-pattern-bottomsheet-slide-up var(--vds-motion-duration-slow) var(--vds-motion-easing-emphasized) both;
```

`var(--vds-motion-duration-slow)` 가 `.4s` 일 것. 적당. emphasized easing 유지.

### C. 시트 height 적용 보장 (`.vds-pattern-bottomsheet__sheet.is-daily`)

현 `height: var(--vds-exp-girok-redesign-bottomsheet-height-daily)` (= 70%) 가 부모 flex 컨텍스트에서 무시되는 경우 있음 (align-items: flex-end + align-self: flex-end 조합). `min-height` 보강:

```diff
 .vds-pattern-bottomsheet__sheet.is-daily {
   height: var(--vds-exp-girok-redesign-bottomsheet-height-daily);
+  min-height: 60vh;
   ...
 }
```

또는 token 추가: `bottomsheet.min-height-daily = 60vh`.

### D. Stats 색상 — target.html L467-481 정합

target: 컨테이너 `bg-zinc-800 border border-zinc-800 rounded-xl`, 셀 `bg-[#14120E]`.

- `.vds-pattern-girok-stats` border / background : `color-mix(theme.border-strong 38%)` → **zinc-800 (rgb 39 39 42)** 또는 신규 토큰 `stats.divider-bg`. 현 토큰 그대로 두고 값만 zinc-800 alpha-100 % 로 조정 (`oklch` 또는 `#27272A`).
- `.vds-pattern-girok-stats__cell` background : `color-mix(shell-content-surface 90%, black 10%)` → **#14120E** 와 정합 (또는 토큰 `stats.cell-bg` 신설하여 `#14120E` 직접). P17 에서 `stats.radius 0.75rem` 이미 완료.

### E. Tab-L2 라운드 둔화 — target L429-430

target 컨테이너 `rounded-xl` = 12px, indicator `rounded-lg` = 8px. 현재 verodesign 은 컨테이너 1.25rem(20px) / indicator·active 1rem(16px) — **너무 둥글다**.

```diff
 .vds-pattern-girok-tab-l2 {
-  border-radius: 1.25rem;
+  border-radius: 0.75rem;
 }
 .vds-pattern-girok-tab-l2__indicator {
-  border-radius: 1rem;
+  border-radius: 0.5rem;
 }
 .vds-pattern-girok-tab-l2__cell.is-active {
-  border-radius: 1rem;
+  border-radius: 0.5rem;
 }
```

가능하면 신 토큰 `tab.l2.radius = 0.75rem`, `tab.l2.cell-radius = 0.5rem` 추가.

## 응답 (≤400 토큰)

- 변경 파일 + CSS 변경 요약 (A~E)
- keyframes 정의 위치 (pattern CSS vs index.css)
- 추가/조정 토큰 이름·값
- 빌드 통과 여부
