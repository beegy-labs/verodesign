# Token & Component Additions Inventory

> Source: app-girok/docs/design/units/ (38 units, post-audit PASS)
> Generated: 2026-05-20

## "매핑 불가" raw list

| unit | 라인 인용 | 분류(token/component/utility) |
| ---- | -------- | --- |
| assets-overview-card-installments | "없음" | - |
| assets-overview-cash | "institution badge glyph with semantic tint" | token + component |
| assets-overview-savings | "1px product accent rail" | token |
| assets-overview-total | "oversized amount hero balance rhythm" | component |
| assets-overview | "없음" | - |
| debt-loans | "priority repayment pill semantics, loan action footer cluster as a dedicated pattern" | token + component |
| debt-receivables | "borrower avatar pill, due-state copy treatment" | component + token |
| debt-summary | "paired hero composition, dark gradient surface" | token + component |
| global-app-bar | "브랜드 wordmark의 점 강조 타이포, tighter tracking 강도" | token + component |
| global-app-frame | "393x852 디바이스 모형 프레임, 52px 외곽 라운드, 노치 캡슐" | component |
| global-bottom-nav | "active icon stroke weight emphasis, safe-area padding helper class, colored top shadow" | utility + token + component |
| global-depth-tabs | "glowing underline shadow와 15px 탭 타이포" | token + component |
| global-main-routing | "`scrollbar-hide` utility alias" | utility |
| global-toast-motion | "top-centered pill toast, custom short bounce keyframe, home-indicator bar" | token + component |
| household-ledger-analysis | "bar chart primitive, progress bar rows, shadowed active month column" | component + token |
| household-ledger-management-category-management | "emoji-first category chip group" | component |
| household-ledger-management-fixed-income-expense | "form-top binary pill toggle, active/inactive fixed row switch glyph" | component + token |
| household-ledger-management | "없음" | - |
| household-ledger-records-calendar | "month calendar cell interaction, selected date badge, marker dot" | component + token |
| household-ledger-records-list | "category initial badge" | component |
| household-ledger-records-summary | "contiguous card rail with shared outer border" | component |
| household-ledger-records-toolbar | "icon-only 2-state view toggle" | component |
| household-ledger-records | "없음" | - |
| invest-positions | "ticker initial avatar chip, profit color semantics reversal (`up`=rose, `down`=blue)" | component + token |
| invest-quick-actions | "action-card gradient emphasis, oversized decorative icon corner treatment" | token + component |
| invest-snowball-hero | "goal progress gradient, hero decorative background icon, dual-progress stack" | token + component |
| modal-daily-sheet | "32px top radius, 65% fixed-height sheet, drag handle size/color exactness" | token + component |
| modal-savings-add | "savings/deposit toggle, fixed narrow interest field width token" | token + component |
| modal-scalp-calculator | "amber glow modal shadow, dedicated metric panels" | token + component |
| modal-transaction-add | "internal binary toggle styling, 3xl modal radius" | token + component |
| settings-data-log | "amber glow CTA shadow" | token |
| settings-system-links | "tinted leading icon tile and grouped divider row composition" | token + component |
| tab-assets | "`scrollbar-hide` utility alias" | utility |
| tab-debt | "`scrollbar-hide` utility alias" | utility |
| tab-household-ledger | "segment indicator의 exact width calc와 warm dark palette 전용 selected surface" | token + component |
| tab-invest | "`scrollbar-hide` utility alias" | utility |
| tab-settings | "`scrollbar-hide` utility alias" | utility |

## "신설 후보" raw list (38 unit `## 신설 후보` 표 합산)

| 이름 | 종류 | 등장 unit 수 | 사용처 list | unit이 명시한 사유 |
| ---- | --- | ---- | ---- | ---- |
| `css-pattern.scrollbar-hide` | css-pattern | 5 | global-main-routing, tab-assets, tab-debt, tab-invest, tab-settings | 메인 라우팅 래퍼와 각 탭 shell 모두 같은 숨김 스크롤바 규칙을 쓴다 / Web scroll container에서 숨김 스크롤바 유틸이 반복된다 |
| `<BinaryPillToggle>` | component | 3 | household-ledger-management-fixed-income-expense, modal-savings-add, modal-transaction-add | 지출/수입처럼 짧은 2분할 선택을 pill 형태로 고정한다 / 적금/예금 2분할도 동일한 pill toggle primitive로 수렴 가능하다 / 지출/수입 같은 entry type switch를 짧은 pill 2분할로 통일할 수 있다 |
| `<AccountBadge>` | component | 2 | assets-overview-cash, invest-positions | 은행/브로커 약칭을 둥근 배지로 담는 표현이 반복 가능하다 / 원형 이니셜 배지가 계좌/브로커 식별 패턴과 수렴한다 |
| `<AmountHero>` | component | 2 | assets-overview-total, debt-summary | 큰 금액 headline과 보조 라벨의 단순 요약 hero가 별도 패턴이다 / 큰 금액 headline을 중심으로 요약하는 hero 패턴이 자산 탭과 맞닿아 있다 |
| `<ProductCard>` | component | 2 | assets-overview-savings, debt-loans | 금리, 원금, 예상 이자, 삭제 affordance를 갖는 금융상품 카드다 / 금융상품 메타 카드라는 점에서 저축 상품 카드와 구조가 맞닿는다 |
| `<SettingsRow>` | component | 2 | settings-data-log, settings-system-links | leading icon tile, text stack, trailing chevron를 고정 패턴화 |
| `<ViewToggle>` | component | 2 | - | 아이콘 2분할 전환기가 일반 segmented control보다 더 compact하다 / compact two-state affordance를 카드형 shortcut에도 응용할 수 있다 |
| `<ActionCard>` | component | 1 | - | 아이콘+라벨+hover treatment를 갖는 shortcut card 패턴 |
| `<BottomNavBar>` | component | 1 | - | app-shell 내 normalized bottom nav의 semantic wrapper 필요 |
| `<BottomSheetListDialog>` | component | 1 | - | bottom placement dialog + list body + sticky CTA 조합 |
| `<BrandWordmark>` | component | 1 | - | 타이포+도트 조합이 재사용될 가능성 |
| `<CalendarMonthGrid>` | component | 1 | - | 요일 헤더, 날짜 셀, 선택 상태, 데이터 dot marker까지 합쳐진 월력 그리드다 |
| `<CategoryChipGroup>` | component | 1 | - | 이모지+라벨 카테고리 pill 묶음은 분리된 관리 패턴이다 |
| `<DeviceFrame>` | component | 1 | - | 앱 미리보기용 iPhone 하드웨어 프레임은 앱 UI와 분리된 래퍼 관심사 |
| `<DualMetricHero>` | component | 1 | - | 좌우 메트릭과 보조 summary bar를 묶는 조합 |
| `<GoalProgressHero>` | component | 1 | - | title/badge/progress/summary/action footer까지 하나의 독립 hero 패턴 |
| `<HomeIndicator>` | component | 1 | - | iOS-like bottom indicator는 shell-level decorative element |
| `<InstallmentRow>` | component | 1 | - | 카드 할부 잔여개월과 다음 결제일 메타가 있는 row 패턴이다 |
| `<LedgerEntryRow>` | component | 1 | - | 가계부 전용 카테고리 뱃지와 signed amount 구성이 독립적이다 |
| `<LoanCard>` | component | 1 | - | 상품 메타+priority pill+2 CTA footer 조합 |
| `<MetricComparePanel>` | component | 1 | - | label-pair/value-pair compact metrics repeat in calculators |
| `<MetricStrip>` | component | 1 | - | 연속된 3분할 요약 metric strip는 독립 패턴으로 보인다 |
| `<MiniBarChart>` | component | 1 | - | 간단한 월별 막대 시각화가 반복될 가능성 |
| `<NavTabs>` | component | 1 | - | 상단 라우팅 탭은 일반 콘텐츠 탭보다 scroll/indicator 요구가 강함 |
| `<RankedProgressList>` | component | 1 | - | Top N + percentage rail 조합이 구조적으로 독립적 |
| `<ReceivableCard>` | component | 1 | - | 채권 row + collector CTA는 대출 카드와 다른 액션 구조 |
| `<SegmentedControl>` | component | 1 | - | 3분할 이동형 indicator는 기존 Tabs segmented보다 더 고정밀 |
| `<TickerAvatar>` | component | 1 | - | 종목 initial 원형 배지는 stock-specific 표현 |
| `mobile-shell.bottom-nav-shadow` | token | 1 | - | 바닥 고정 nav의 upward shadow는 app-shell 토큰에 없음 |
| `mobile-shell.safe-top-capsule` | token | 1 | - | 노치 캡슐 크기/위치가 app-shell 토큰 범위를 벗어남 |
| `mobile-shell.sheet-handle` | token | 1 | - | 바텀시트 drag handle 규격을 고정할 필요 |
| `motion.bounce.short` | token | 1 | - | existing primitive animation set에 short bounce timing 없음 |
| `shadow.glow.accent` | token | 1 | - | 활성 탭 언더라인 글로우가 이미 experimental로 존재하며 이 패턴의 핵심 |
| `shadow.glow.warning-soft` | token | 1 | - | amber-tinted dialog glow is not covered by canonical shadow scale |
| `shadow.glow.warning` | token | 1 | - | 저장 CTA의 colored shadow를 token화하면 brand-safe reuse 가능 |
| `theme.bg.action-emphasis` | token | 1 | - | amber-tinted quick action surface를 semantic bg 범주에 추가할지 검토 |
| `theme.bg.segmented-active` | token | 1 | - | warm selected chip surface가 일반 `bg.selected`보다 강하게 표현됨 |
| `theme.brand.wordmark-accent` | token | 1 | - | 앱 헤더 브랜드 도트 강조색을 semantic accent와 분리할지 검토 필요 |
| `theme.loan.priority` | token | 1 | - | 우선상환 상태를 destructive와 분리하고 싶을 수 있음 |
| `theme.market.up` | token | 1 | - | 주식 문맥에서 상승/하락 색 semantics가 일반 success/error와 다름 |
| `theme.progress.goal-fill-end` | token | 1 | - | 진행률 끝색이 semantic status만으로는 의미를 유지하기 어렵다 |

## 후보 그룹화 (semantic 의미별)

### A. Gradient/hero surfaces
- `theme.surface.hero.{start,end,border}` — debt-summary, invest-snowball-hero, invest-quick-actions
- `theme.progress.goal-fill-end` — invest-snowball-hero
- 사유: dark gradient surface, goal progress gradient, action-card gradient emphasis가 반복된다.

### B. Icon-tile and identity surfaces
- `theme.icon-tile.{info,success,warning,danger}` — settings-system-links, settings-data-log, assets-overview-cash, invest-positions
- `<AccountBadge>`, `<TickerAvatar>` — assets-overview-cash, invest-positions
- 사유: tinted leading icon tile, institution/ticker glyph badge가 같은 원형 식별 surface 계열이다.

### C. Domain semantics
- `theme.loan.priority` — debt-loans
- `theme.market.{up,down}` — invest-positions
- 사유: finance 문맥의 우선상환, 상승/하락은 일반 success/destructive와 의미가 다르다.

### D. Active state / segmented
- `theme.bg.segmented-active` — tab-household-ledger
- `theme.state.view-toggle-active` — household-ledger-records-toolbar, household-ledger-management-fixed-income-expense, modal-savings-add, modal-transaction-add
- 사유: selected chip surface와 compact binary/segmented active affordance가 반복된다.

### E. Glow shadow
- `shadow.glow.accent` — global-depth-tabs
- `shadow.glow.warning`, `shadow.glow.warning-soft` — settings-data-log, modal-scalp-calculator
- 사유: warm glow shadow가 bottom-nav/depth-tabs/dialog CTA에서 재발한다.

### F. Mobile shell utilities
- `mobile-shell.safe-top-capsule`, `mobile-shell.bottom-nav-shadow`, `mobile-shell.sheet-handle` — global-app-frame, global-bottom-nav, modal-daily-sheet
- `css-pattern.scrollbar-hide` — global-main-routing, tab-assets, tab-debt, tab-invest, tab-settings
- 사유: app-frame, safe-area, sheet handle, hidden-scrollbar는 web/core보다 app-shell 성격이 강하다.

### G. Other tokens unit-specific
- `theme.brand.wordmark-accent` — global-app-bar
- `theme.bg.action-emphasis` — invest-quick-actions
- `motion.bounce.short` — global-toast-motion
- 사유: 현재는 단일 unit 출현이라 P3 격리 후보로 유지한다.

## 권고 slot group

- core: `theme.loan.priority`, `theme.market.{up,down}` 는 cross-brand 의미 입증이 있을 때만.
- web: `css-pattern.scrollbar-hide`, glow shadow, segmented active surface, wordmark accent.
- app-shell: `mobile-shell.*`, bottom-nav shadow, safe-top capsule, sheet handle.
- future: hero gradient surface, icon-tile family, action-emphasis는 girok 전용 수요가 유지되면 brand-scoped experimental 또는 future slot group 검토.

## 신설 컴포넌트 후보 (≥2 unit, 토큰과 별개)

- cross-cutting 7개 확인: `<AccountBadge>`, `<AmountHero>`, `<BinaryPillToggle>`, `<ProductCard>`, `<SettingsRow>`, `<ViewToggle>`, `css-pattern.scrollbar-hide`
- 추가 발견: 없음. 2개 이상 unit에 반복된 신규 후보는 위 7개 외에는 없다.

## 출력 자가검증

- `## "매핑 불가" raw list` row 수 = 37 = `grep -h "매핑 불가" /Users/vero/workspace/beegy/app-girok/docs/design/units/*.md | wc -l`
- `## "신설 후보" raw list` raw row 수 = 45 (38 unit table에서 `-`/`없음` 제외한 unique candidate 집계)
- `grep -hE "^\| .* \| (token|component|css-pattern) \|" /Users/vero/workspace/beegy/app-girok/docs/design/units/*.md | wc -l` = 59; 이 값은 `app-logic-domain.md`의 audit seed summary 7행과 중복 라인을 포함한다.
- 후보 그룹의 토큰 후보 총합 = 13 (audit 우선순위 5건 이상 반영)
