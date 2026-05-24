# app-girok 디자인 완전 개편 — verodesign 패턴 인테이크

> Date: 2026-05-23
> Builder: Codex (verodesign + app-girok 양쪽)
> Reviewer: Claude
> Refs:
>   - `target.html` (app-girok 저장소 루트, 1446 lines — 시각 SoT)
>   - 사용자 image #6 (헤더+탭), image #7 (전체+캘린더), image #8 (stats+캘린더 사이드바이)
> 정책: **Claude=spec, Codex=구현** (verodesign 워크플로우 엄수)

## 배경

지금까지 app-girok 의 컴포지션 CSS (`.girok-*` 룰)는 consumer side 에서 ad-hoc 으로 만들어졌고,
사이즈/스타일이 target.html 의도와 미세하게 어긋남. 사용자가 verodesign 정책에 맞게 패턴 차원에서
재정비를 요청. 이 spec 은 app-girok 의 모든 핵심 UI 패턴을 verodesign 토큰/유틸 기반으로 정확히
target.html 매핑한 뒤, 사용자 image #6-#8 의 사이즈/형태와 일치시키는 것이 목표.

## 작업 영역

### Phase A — verodesign 토큰 점검 + 보강

`tokens/experimental/girok-redesign.json` 에 다음 토큰들이 정확한 값인지 확인 + 보강:

| 토큰 경로 | 역할 | target.html / 사용자 image 기반 추천 값 |
|---|---|---|
| `exp.girok-redesign.shell.frame-surface` | 헤더/탭바/바텀nav 배경 | `oklch(15.91% ...)` (현재값 검증) |
| `exp.girok-redesign.shell.content-surface` | 메인 컨텐츠 배경 | `oklch(15.47% ...)` 약간 더 어둡게 |
| `exp.girok-redesign.font-family.display` | wordmark 폰트 | `'Plus Jakarta Sans', system-ui, ...` (이미 추가됨) |
| `exp.girok-redesign.wordmark.size` | wordmark 크기 | `1.875rem` (30px, target image #6 우측 기준) |
| `exp.girok-redesign.wordmark.weight` | wordmark 굵기 | `800` (ExtraBold) |
| `exp.girok-redesign.wordmark.tracking` | letter-spacing | `-0.05em` |
| `exp.girok-redesign.tab.l1.font-size` | 1-Depth 탭 폰트 | `1.125rem` (18px) — target.html L488 `text-[15px]` 보다 사용자 시각 image 가 큼, image 우선 |
| `exp.girok-redesign.tab.l1.weight.active` | active 탭 굵기 | `800` |
| `exp.girok-redesign.tab.l1.weight.inactive` | inactive 탭 굵기 | `700` |
| `exp.girok-redesign.tab.l1.underline-height` | active underline 두께 | `3px` |
| `exp.girok-redesign.tab.l1.underline-glow` | underline glow shadow | `0 0 8px var(--vds-exp-girok-redesign-nav-tab-active)` |
| `exp.girok-redesign.tab.l2.font-size` | 2-Depth segmented 폰트 | `0.875rem` (14px) |
| `exp.girok-redesign.tab.l2.cell-padding` | segmented 셀 패딩 | `var(--vds-spacing-2_5) var(--vds-spacing-3)` |
| `exp.girok-redesign.stats.cell-bg` | stats 셀 배경 | `oklch(15.47% ...)` content-surface 보다 약간 밝게 |
| `exp.girok-redesign.stats.divider-color` | stats 셀 사이 1px 라인 | `oklch(...)` zinc-800 매칭 |
| `exp.girok-redesign.stats.label-size` | stats 라벨 크기 | `0.875rem` (14px) |
| `exp.girok-redesign.stats.value-size` | stats 숫자 크기 | `1rem` (16px) |
| `exp.girok-redesign.stats.value-weight` | stats 숫자 굵기 | `800` |
| `exp.girok-redesign.calendar.weekday-size` | 요일 헤더 크기 | `0.875rem` (14px) |
| `exp.girok-redesign.calendar.weekday-weight` | 요일 굵기 | `700` |
| `exp.girok-redesign.calendar.cell-size` | 날짜 셀 너비/높이 | `2.5rem` (40px) — 사용자 image 우측 기준 더 크게 |
| `exp.girok-redesign.calendar.number-size` | 날짜 숫자 크기 | `1rem` (16px) |
| `exp.girok-redesign.calendar.number-weight` | 날짜 숫자 굵기 | `600` |
| `exp.girok-redesign.calendar.today-bg` | 오늘 highlight 배경 | `var(--vds-exp-girok-surface-hero-start)` (amber alpha) |
| `exp.girok-redesign.calendar.today-fg` | 오늘 텍스트 색 | `var(--vds-exp-girok-redesign-nav-tab-active)` |
| `exp.girok-redesign.calendar.today-border` | 오늘 border | `var(--vds-exp-girok-redesign-border-modal-strong)` |
| `exp.girok-redesign.calendar.dot-color` | 거래 dot 색 | amber-400 |
| `exp.girok-redesign.calendar.dot-size` | dot 크기 | `4px` |
| `exp.girok-redesign.calendar.row-gap` | 주 사이 간격 | `1.5rem` (24px) |
| `exp.girok-redesign.bottomsheet.height-daily` | DailySheet 높이 | `65%` |
| `exp.girok-redesign.bottomsheet.radius-top` | rounded-t | `1.5rem` (24px) |
| `exp.girok-redesign.bottomsheet.handle-color` | drag 손잡이 | `zinc-700` |

### Phase B — 패턴 카탈로그 (verodesign 측)

새 verodesign 유틸/패턴 CSS 클래스 (`packages/utilities` 또는 `packages/design` 의 patterns):

| 패턴 | 클래스 | 토큰 의존성 |
|---|---|---|
| Wordmark | `.vds-pattern-girok-wordmark` | display 폰트, wordmark.* 토큰 |
| L1 Tab Bar | `.vds-pattern-girok-tab-l1`, `.vds-pattern-girok-tab-l1__item`, `.is-active` | tab.l1.* |
| L2 Segmented | `.vds-pattern-girok-tab-l2`, `__cell`, `__indicator` | tab.l2.* |
| Stats Grid | `.vds-pattern-girok-stats`, `__cell`, `__label`, `__value`, `.is-income/.is-expense/.is-remaining` | stats.* |
| Calendar Grid | `.vds-pattern-girok-calendar`, `__weekdays`, `__weekday`, `.is-saturday/.is-sunday`, `__grid`, `__cell`, `__date`, `.is-today`, `__dot` | calendar.* |
| Daily Bottom Sheet | `.vds-pattern-bottomsheet`, `__backdrop`, `__sheet`, `__handle`, `__header`, `__title`, `__subtitle`, `__close`, `__body`, `__cta`, `.is-daily` | bottomsheet.* |

각 패턴 CSS 는 verodesign 패키지가 emit. consumer 는 `import "@verobee/design/patterns/girok-app.css"` 한 줄로 사용.

### Phase C — app-girok consumer 측 적용

`src/index.css` 의 page-level `.girok-*` 룰들 중 위 패턴이 커버하는 것은 **삭제** 후, JSX 는
`.vds-pattern-girok-*` 클래스로 교체.

남는 것:
- App.tsx 레이아웃 컨테이너 (shell-root, shell-main)
- 페이지별 컨텐츠 (HoldingsList, SnowballCard 등) — 이는 별도 패턴화 후속

### Phase D — DailySheet 정확 구현

target.html L1124-1181 그대로:
- backdrop: `bg-black/60 backdrop-blur-sm`
- sheet: `absolute bottom-0 w-full h-65% bg-content-surface rounded-t-3xl border-top zinc-800/80`
- handle: 40x4 zinc-700 rounded-full 중앙 정렬
- header row: 좌(title "7월 N일" + subtitle "선택한 일자 거래 내역") + 우(X 닫기)
- 데이터 있을 때만 mini stats (수입+/지출-/잔액, 3-cell 가로 정렬, `text-[10px]`)
- transactions list (scrollable, 빈 경우 "기록된 거래가 없습니다.")
- CTA "+ 새로운 거래 등록" amber 가득찬 버튼, scale-95 active

### Phase E — 검증

각 페이지/모달 393x852 Puppeteer 캡처 + iOS 26.1 sim 캡처. 사용자 image #6 #7 #8 의도와 시각 비교.
- G1: 5 페이지 캡처 sha256
- G2: 8 모달 캡처 sha256
- G3: src/ hex/tailwind/lucide 0 hits
- G4: iOS sim 캡처 (블랭크 아님, safe-area OK, bottom nav fixed)
- G5: verodesign 빌드 + dist resync OK

## 진행 순서

1. **Phase A** — DTCG 토큰 추가/검증 → verodesign build → girok.css 에 신규 토큰 hit 확인
2. **Phase B** — `packages/design/dist/patterns/girok-app.css` 신규 emit (또는 inline themes/girok.css 끝에 추가). build + app-girok resync.
3. **Phase C** — app-girok `src/index.css` 의 중복 `.girok-*` 룰 삭제 + JSX 클래스 교체.
4. **Phase D** — DailySheet/widgets/modals/daily-sheet/ui/DailySheet.tsx 정확히 target.html 매칭.
5. **Phase E** — Puppeteer + iOS sim 캡처 + sha256 보고.

## 제약

- 사용자 image #6-#8 의 우측 (target) 사이즈/형태가 최우선. target.html 라인은 구조 참조, 픽셀
  값은 사용자 image 우선.
- 한국 주식 색 (rose↑/blue↓) 보존.
- 기존 P0-P5 의 데이터 mock 보존.
- Tauri/iOS sim 환경 픽스 (vendor-ui chunk, safe-area UA detect) 보존.
- 본 spec 후 추가 패턴 카탈로그 graduate 는 사용자 별도 승인.

## 보고

```
Phase A 토큰: 추가 N개, 보정 M개
Phase B 패턴 CSS: girok-app.css 라인 수
Phase C app-girok 변경: 삭제된 .girok-* 룰 N개, 교체된 JSX 클래스 M개
Phase D DailySheet 변경: target.html 라인 매칭 OK
Phase E 캡처:
  - 페이지 sha256 ×5
  - 모달 sha256 ×8
  - iOS sim sha256
G1-G5: <pass/fail 핵심 1줄씩>
```
