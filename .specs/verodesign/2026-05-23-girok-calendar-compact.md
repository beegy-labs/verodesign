# girok-redesign 캘린더 컴팩트 — 6주 한 화면 fit

> Date: 2026-05-23
> Consumer: `app-girok` (iPhone 17 Pro 시뮬레이터, P16)
> Reference: `app-girok/target.html` L488-505 (단일 React JSX mock)
> Sibling spec: `app-girok/.specs/app-girok/2026-05-23-p16-target-parity-mock-labels.md`

## 문제

`vds-pattern-girok-calendar` 가 1~31 을 한 화면에 못 띄움. iPhone 17 Pro 시뮬에서 1~27 만 보이고 28-31 은 스크롤. target.html 기준은 6주 전체 노출.

## 원인

현재 토큰/CSS (`packages/design/dist/patterns/girok-app.css` L198-241, `tokens/experimental/girok-redesign.json` L255-341):

| 항목 | 현재 | target.html L491-499 (Tailwind) | px |
|---|---|---|---|
| `calendar.row-gap` | `2.125rem` (34px) | `gap-y-5` | 20px |
| `calendar.cell-size` (date chip) | `2rem` (32px) | `w-7 h-7` | 28px |
| `.vds-pattern-girok-calendar__cell` `min-height` (CSS 하드코딩) | `3.75rem` (60px) | `h-11` | 44px |
| `.vds-pattern-girok-calendar__dot` `margin-top` | `0.875rem` (14px) | `mt-1` | 4px |
| `.vds-pattern-girok-calendar__weekdays` `margin` | `1.5rem 0 2rem` | `mb-4 mt-2` | top 8 / bottom 16 |

합산: 6 행 × (60 + 34) ≈ 564px → 너무 큼.
목표: 6 행 × (44 + 20) ≈ 384px.

## 변경

### T1. `tokens/experimental/girok-redesign.json` 값 조정

```diff
 "calendar": {
   "cell-size":     "2rem"     → "1.75rem"
   "row-gap":       "2.125rem" → "1.25rem"
+  "cell-min-height": { "$value": "2.75rem", "$type": "dimension",
+    "$description": "Pass4 calendar cell vertical box (target h-11)." }
+  "weekdays-margin-top":    { "$value": "0.5rem", "$type": "dimension" }
+  "weekdays-margin-bottom": { "$value": "1rem",   "$type": "dimension" }
+  "dot-gap":                { "$value": "0.25rem","$type": "dimension",
+    "$description": "Pass4 gap between date chip and presence dot (target mt-1)." }
 }
```

`cell-size` / `row-gap` 은 값만 변경. 나머지 4개는 신규 토큰 — 기존 CSS 하드코딩을 토큰화.

### T2. `dist/patterns/girok-app.css` 의 캘린더 규칙을 신규 토큰 참조로 변경

```diff
 .vds-pattern-girok-calendar__weekdays {
-  margin: 1.5rem 0 2rem;
+  margin: var(--vds-exp-girok-redesign-calendar-weekdays-margin-top) 0
+          var(--vds-exp-girok-redesign-calendar-weekdays-margin-bottom);
 }
 .vds-pattern-girok-calendar__cell {
-  min-height: 3.75rem;
+  min-height: var(--vds-exp-girok-redesign-calendar-cell-min-height);
 }
 .vds-pattern-girok-calendar__dot {
-  margin-top: 0.875rem;
+  margin-top: var(--vds-exp-girok-redesign-calendar-dot-gap);
 }
```

빌드 파이프라인이 `dist/` 를 산출하므로 실제로는 소스(`src/build/emit-static.mjs` 또는 패턴 소스) 를 고치고 `pnpm build` 로 재생성. Codex 가 파이프라인 구조를 확인해 올바른 소스를 수정.

### T3. 빌드 + 소비처 갱신

1. `pnpm --filter "@verobee/*" build`
2. `pnpm -C ../app-girok install` (app-girok 의 `file:` 의존성이 새 dist 를 끌어가도록)

## 비범위

- 라벨/아이콘/모바일 외 다른 캘린더 패턴 — 손대지 않음.
- 토큰 그래듀에이션(experimental → canonical) — 별도 의사결정.

## 검증

- `pnpm build` 통과, 콘트라스트 변경 없음 (색 토큰 미수정).
- `app-girok` 에서 `pnpm dev:shot /` 후 7월 1~31 + 다음달 1-2 행이 한 화면에 모두 보임. 등록 chip, stats, 하단 nav 와 겹치지 않음.
