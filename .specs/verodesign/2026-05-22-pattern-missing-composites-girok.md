# Pattern Intake: Missing composites for girok-redesign (ProgressBar, Calendar, SettingsRow, Tabs slide-indicator)

> Slug: `pattern-missing-composites-girok` · Created: 2026-05-22 · Status: **proposed** · Owner: vero · Driver app: **app-girok redesign** (mock `/Users/vero/workspace/beegy/app-design-2.txt`)

## 1. Knowledge-gap check

- 2026-05-22 verodesign 표면 점검 결과 mock이 요구하는 composite 중 **4종 부재/한계** 확정:
  | 패턴 | 현재 상태 | mock 사용처 |
  |---|---|---|
  | ProgressBar | 없음 (토큰 `exp.girok.progress.goal-fill-*`만 존재) | 스노우볼 챌린지 진행률, TOP5 카테고리 비율, 부채 상환 비율 |
  | Calendar (DateGrid) | 없음 | 가계부 records L2 (7×6 그리드, 일자별 점, 토/일 색, 선택 강조, 클릭) |
  | SettingsRow | 없음 (CompactRow는 일반 row, settings 전용 아님) | 설정 페이지 시스템/데이터 그룹 |
  | Tabs slide-indicator | Tabs.segmented는 정적 색 전환만 — translateX 슬라이드 미지원 | 가계부/투자 L2 세그먼트 (mock의 시각 시그니처) |
- 본 SDD 범위 밖(이미 충족): StatTile, CompactRow, Badge, TextField, Dialog, Toast, BinaryPillToggle.

## 2. Source & Rationale

- **Source**: mock 전수 — 위 4종이 실제 등장하는 좌표(파일:line) 본 SDD에 명시.
- **Why**: app-girok 리디자인은 mock 1:1 구현(`whitebox-no-blackbox-deps`, `app-girok-redesign-overhaul`). 부재 패턴은 컨슈머 인라인 재발명(`no-local-design-primitives` 위반) 또는 mock 불일치 — 둘 다 거부. verodesign 정식 패턴으로 진입.
- **Consumer-driven scope**: 4개 모두 app-girok 즉시 필요(`pattern-intake-consumer-driven`). Hero gradient card, 그 외 mock-specific composite는 app-girok widget으로 두고 promote는 별도 SDD.

## 3. Cross-cutting decisions

- **WC-first**: 4개 모두 Lit element + React 어댑터(`@verobee/design-elements` + `@verobee/design-react`). 아이콘 SDD에서 React-only 예외 처리한 것과 다르게, 이 4개는 행동/상태가 있어서 WC가 정당.
- **Token namespace**: 신규 토큰은 `exp.girok-redesign.*` (Phase 0b SDD와 정합).
- **a11y**: 각 패턴 WAI-ARIA APG 1.2 매핑 필수(progressbar role, grid + gridcell role, list role, tablist + tab + tabpanel role).
- **Color**: `currentColor` 또는 vds 토큰만. hex/tailwind 0건.
- **무시 안 함**: G7 사전 조건 — react/react-dom 워크스페이스 버전 mismatch(19.2.5 vs 19.2.6) 해결되어야 test gate 통과 가능. 본 SDD Codex 위임 전 별도 fix 필요.

---

## 4. Pattern P1 — ProgressBar (`<vds-progress>`)

### 4.1 Why (mock 사용처)
- `app-design-2.txt` L596-731 (투자 현황 스노우볼 챌린지 진행률 바)
- `app-design-2.txt` L656-711 (가계부 analysis TOP5 카테고리 비율 바)
- `app-design-2.txt` L927-970 (부채 카드 상환률 바, 미세하지만 가능)

### 4.2 API
```html
<vds-progress 
  value="65" 
  max="100"
  tone="primary"          <!-- primary | success | destructive | warning | neutral -->
  size="md"               <!-- sm | md | lg -->
  indeterminate
  label="진행률 65%">     <!-- aria-label or visually-hidden label -->
</vds-progress>
```

React:
```tsx
<Progress value={65} max={100} tone="success" label="누적 실현손익" />
```

### 4.3 Tokens
신규(Phase 0b에서 이미 일부 예약):
- 기존: `exp.girok.progress.goal-fill-start`, `exp.girok.progress.goal-fill-end` (그라데이션) — 재사용
- 신규: `exp.girok-redesign.progress.track-bg` (`#1A1813` 또는 토큰 alias), `exp.girok-redesign.progress.height-{sm,md,lg}` (4/6/10px)

### 4.4 a11y
`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` 또는 `aria-labelledby`. `indeterminate` 시 `aria-valuenow` 생략.

---

## 5. Pattern P2 — Calendar / DateGrid (`<vds-date-grid>`)

### 5.1 Why (mock 사용처)
- `app-design-2.txt` L502-541 (가계부 records L2 records 7×N 월 캘린더, 일자별 거래 점, 선택 일자 highlight, 일자 클릭 → 일간시트)

### 5.2 API
```html
<vds-date-grid
  year="2026"
  month="7"                       <!-- 1-12 -->
  selected-date="2026-07-20"
  dot-dates="2026-07-02,2026-07-10,2026-07-15,2026-07-18,2026-07-19"
  first-day-of-week="mon"         <!-- mon | sun (locale aware) -->
></vds-date-grid>
```

이벤트:
- `vds-date-select` (`detail: { date: "2026-07-20" }`) — 일자 클릭 시
- `vds-month-change` (`detail: { year, month }`) — 다음/이전 월 이동(있다면)

React:
```tsx
<DateGrid
  year={2026}
  month={7}
  selectedDate="2026-07-20"
  dotDates={transactions.map(t => t.date)}
  firstDayOfWeek="mon"
  onSelect={(date) => setSelectedDate(date)}
/>
```

> **범위 제한**: Date Picker(입력기) 아님. 헤더(◀ 2026년 7월 ▶), 외부 이동 버튼은 컨슈머가 별도 배치. `<vds-date-grid>`는 7×N 본문만 책임. 향후 wrapping `<vds-calendar>` 별도 SDD.

### 5.3 Tokens
신규:
- `exp.girok-redesign.calendar.cell-size` (`44px` for tap target)
- `exp.girok-redesign.calendar.dot-color` (점 색, 기본 amber)
- `exp.girok-redesign.calendar.weekday-color` (평일 텍스트)
- `exp.girok-redesign.calendar.weekend-sat` — 이미 존재 (재사용)
- `exp.girok-redesign.calendar.weekend-sun` (신규, rose-400 매핑)
- `exp.girok-redesign.calendar.selected-bg`, `.selected-fg`, `.selected-border`

### 5.4 a11y
WAI-ARIA Grid Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/grid/).
- 컨테이너 `role="grid"` + `aria-label="2026년 7월"`
- 요일 헤더 `role="row"` + `role="columnheader"` × 7
- 일자 셀 `role="gridcell"` + `aria-selected`, `aria-current="date"`, `tabindex` 동적(roving tabindex)
- 키보드: 좌/우/상/하/Home/End/PgUp/PgDn

---

## 6. Pattern P3 — SettingsRow (`<vds-settings-row>`)

### 6.1 Why (mock 사용처)
- `app-design-2.txt` L975-1015 (설정 페이지 KIS 자격증명 카드)
- app-girok 현재 `SettingsPage.tsx`도 이미 `ds-settings-icon-tile-*` 클래스로 유사 패턴 사용 — 로컬 prim 발명 회피.

### 6.2 API
```html
<vds-settings-row 
  tone="indigo"                <!-- indigo | emerald | amber | rose | zinc -->
  title="KIS 자격증명 정보"
  description="API 연결 수립 완료"
  description-tone="success"   <!-- 상태 컬러 -->
  chevron                      <!-- 우측 chevron 표시 -->
>
  <vds-icon slot="leading" name="shield-check"></vds-icon>
  <span slot="trailing">…</span>   <!-- chevron 대신 커스텀 trailing 시 -->
</vds-settings-row>
```

React:
```tsx
<SettingsRow
  tone="indigo"
  leadingIcon={<ShieldCheck size={18} />}
  title="KIS 자격증명 정보"
  description="API 연결 수립 완료"
  descriptionTone="success"
  trailing="chevron"
  onClick={...}
/>
```

### 6.3 Tokens
- `exp.girok-redesign.settings-row.icon-tile-bg.{indigo,emerald,amber,rose,zinc}` (5종, app-girok의 `ds-settings-icon-tile-*` 매핑)
- `exp.girok-redesign.settings-row.icon-tile-fg.{indigo,emerald,amber,rose,zinc}` (5종)
- 기존 `exp.girok.icon-tile.{info,success,warning,danger}` 와 의미 중첩 검사. 동일이면 alias.

### 6.4 a11y
- `role="button"` 또는 native `<button>` 슬롯
- `aria-label` 자동 합성(title + description)
- 키보드 활성화

---

## 7. Pattern P4 — Tabs slide-indicator extension

### 7.1 Why (mock 사용처)
- `app-design-2.txt` L440-449 (가계부 L2 세그먼트 — 3-way, translateX 슬라이드 활성배경)
- `app-design-2.txt` L587-592 (투자 L2 세그먼트 — 2-way, translateX)
- 현재 `Tabs variant="segmented"` 는 정적 색 전환만 지원 → 시각 시그니처 미충족.

### 7.2 API 확장
기존 Tabs 컴포넌트에 새 prop:

```html
<vds-tabs 
  variant="segmented"
  indicator="slide"              <!-- "none" (default) | "underline" | "slide" -->
>...</vds-tabs>
```

React:
```tsx
<Tabs variant="segmented" indicator="slide">
  <Tab value="ledger">내역 조회</Tab>
  <Tab value="analysis">소비 분석</Tab>
  <Tab value="management">가계부 관리</Tab>
</Tabs>
```

### 7.3 구현 노트
- shadow DOM 내부에 absolute-positioned indicator `<div class="indicator">` 추가
- 활성 탭 변경 시 `transform: translateX(...)` 갱신 (탭 폭과 인덱스 기반)
- CSS `transition: transform var(--vds-exp-motion-duration-base) var(--vds-exp-motion-easing-decelerate)`
- 비활성화 가능: `indicator="none"` 또는 prefers-reduced-motion 시 즉시 점프

### 7.4 Tokens
- 기존 `exp.girok-redesign.toggle.active-bg`(0b SDD 신규 예정) 재사용 indicator 배경
- 기존 `exp.girok-redesign.border.active` 재사용 indicator border
- 기존 `exp.girok.bg.segmented-active` 재사용 가능 (의미 중첩 검사 0b SDD에서 결정)

### 7.5 a11y
ARIA Tablist 그대로 유지(`role="tablist"`, `role="tab"`, `role="tabpanel"`). indicator는 `aria-hidden="true"` 장식 div.

---

## 8. Out of scope (defer to later SDDs)

- **HeroGradientCard** — 부채 요약, 챌린지 hero. mock의 `bg-gradient-to-br from-[#1C1A14] to-[#12110E]` 패턴. 토큰만 있고 컴포넌트 없음. **현 시점 app-girok widget으로 충분**(`Stack + Card + ProgressBar` 조합). 2번째 consumer 등장 시 promote.
- **CurrencyField** — 금액 입력 + ₩/원 suffix + 천단위 콤마. TextField로 가능하지만 사용 빈도 높음. 본 SDD 1차 범위 밖.
- **ScalpCalculator card** — 매우 도메인-specific. app-girok widget.
- **PortfolioRow** (종목 카드, 평단가 vs 현재가 색 변동) — finance-specific 시각. app-girok widget. finance.up/down 토큰만 verodesign.
- **iPhone hardware mockup** (frame, notch, status bar) — 디자인 캔버스용. 실 앱에서 불필요(OS 그림).

## 9. Slot groups

- ProgressBar / Calendar / SettingsRow → 신규 slot 추가 (`girok-redesign`)
- Tabs slide indicator → 기존 Tabs slot group 확장

## 10. Cross-brand zero-diff plan

- 신규 컴포넌트 3종은 새 customElement 등록 → 다른 brand 컴포넌트 영향 0
- Tabs 확장은 새 prop `indicator` 추가, default 동작 변경 없음 → 기존 사용처 회귀 0
- 새 토큰 ~12종 전부 `exp.girok-redesign.*` 또는 `exp.girok.*` → 타 brand 출력 영향 0

## 11. Promotion criteria

- 2주 soak (≥ 2026-06-05)
- ≥ 1 consumer 실사용 (app-girok)
- ProgressBar/Calendar는 generic — 2번째 consumer 등장 시 canonical 후보
- SettingsRow는 app/web app 공통 패턴 — generic
- Tabs slide-indicator는 즉시 Tabs canonical 통합 (기존 컴포넌트 확장)

## 12. Open questions

- (Q1) ProgressBar: 그라데이션 fill (`exp.girok.progress.goal-fill-{start,end}`) vs 단색 — mock은 그라데이션. tone="primary" 외 다른 tone은 단색으로 단순화?
- (Q2) Calendar: 6주(42셀) 고정 vs 5/6주 동적. mock은 5×7=35셀이지만 실제 한 달은 6주에 걸칠 수 있음(예: 2024-08, 2026-01). 동적 권장.
- (Q3) SettingsRow tone 5종이 적절한가, 아니면 app-girok 기존 `ds-settings-icon-tile-*` 클래스명 그대로 인계?

---

## Deliverables

### design-elements (≈ 24 신규/수정 파일)
1. `packages/design-elements/src/components/progress/vds-progress.ts` + define.ts + index.ts + test
2. `packages/design-elements/src/components/date-grid/vds-date-grid.ts` + define.ts + index.ts + test (가장 큰 컴포넌트)
3. `packages/design-elements/src/components/settings-row/vds-settings-row.ts` + define.ts + index.ts + test
4. `packages/design-elements/src/components/tabs/vds-tabs.ts` 확장 — indicator prop + slide animation
5. CEM 갱신 (자동)

### design-react (≈ 5 신규)
6. `packages/design-react/src/components/Progress.tsx`
7. `packages/design-react/src/components/DateGrid.tsx`
8. `packages/design-react/src/components/SettingsRow.tsx`
9. `packages/design-react/src/components/Tabs.tsx` — `indicator` prop passthrough
10. `packages/design-react/src/index.ts` — 4개 named export 추가

### design (tokens)
11. `packages/design/tokens/experimental/girok-redesign.json` 확장 — ProgressBar(2) + Calendar(7) + SettingsRow(10) + Tabs(0, 0b SDD 재사용) = **신규 ~19종 토큰**
12. Style Dictionary 재빌드 → `--vds-exp-girok-redesign-progress-*`, `-calendar-*`, `-settings-row-*` 등장

### docs
13. `docs/llm/research/pattern-catalog.md` — 4행 추가 (progress / date-grid / settings-row / tabs-slide)
14. `CHANGELOG.md` (3 패키지)

---

## Verification gates (for Codex; 비-게임가능)

| Gate | Pass criterion |
|---|---|
| **G1: TypeScript** | `pnpm -w build` 통과(turbo full, 캐시 인정 안 함 — `pnpm -w build --force`) |
| **G2: CEM** | `custom-elements.json`에 `vds-progress`, `vds-date-grid`, `vds-settings-row` 3종 등록 + 기존 `vds-tabs`에 `indicator` attribute 등장 |
| **G3: 신규 토큰 CSS 변수** | `grep -cE '^\s*--vds-exp-girok-redesign-(progress|calendar|settings-row)-' dist/css/canonical.css` ≥ 19 |
| **G4: React exports** | `grep -cE "^export.*\b(Progress\|DateGrid\|SettingsRow)\b.*from" packages/design-react/src/index.ts` = 3 |
| **G5: Tests** | `pnpm -w test` 통과 (react/react-dom 버전 동기화 전제 — 본 SDD 위임 **전** 사전 fix 필요). 각 신규 패턴 smoke 1개 이상 |
| **G6: a11y smoke** | progressbar role / grid+gridcell role / button-like settings-row / tablist+tab role 검증 테스트 |
| **G7: Tabs 회귀 0** | 기존 Tabs 사용 컨슈머(`grep -rE "Tabs.*variant" packages/`) 동작 변화 없음 — 기본값 `indicator="none"` |
| **G8: Whitebox 위반 0** | 신규 파일에서 `grep -cE "(tailwind|lucide-react|@heroicons|@radix|#[0-9a-fA-F]{6,})" packages/design-elements/src/components/{progress,date-grid,settings-row}/ packages/design-react/src/components/{Progress,DateGrid,SettingsRow}.tsx` = 0 |
| **G9: Catalog** | `pattern-catalog.md`에 progress / date-grid / settings-row / tabs-slide 4행 |
| **G10: Q1/Q2/Q3** | Codex 최종 리포트에 3개 open question 각각 결정 + 근거 명시 |

**비-게임가능**: 모든 gate는 디스크 grep/count/build 결과. 자가선언 불인정. **2연속 클린 측정 후 종료**.

## Pre-condition (Codex 위임 전 처리)

- **react/react-dom 버전 동기화** (19.2.5 ↔ 19.2.6 mismatch) — Phase 0a G7 블로커. 위임 전 워크스페이스 fix 필요.
- 처리 옵션:
  - (a) `pnpm install` 또는 `pnpm up react react-dom --latest` 으로 sync
  - (b) pnpm-lock.yaml 수동 reconcile
  - (c) Codex에 별도 1-step `codex-reply` 로 위임
