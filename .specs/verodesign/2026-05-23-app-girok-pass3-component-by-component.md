# app-girok Pass 3 — 컴포넌트별 픽셀 단위 매칭

> Date: 2026-05-23
> Builder: Codex
> Reviewer: Claude
> Image ref: `/tmp/target-comparison.png` (왼쪽=현재 11:00, 오른쪽=타겟 16:45)
> 정책: verodesign 토큰/패턴만 수정. 일반화/추측 금지. **타겟 이미지 우측을 직접 분석하여 각 컴포넌트의 픽셀·색·테두리·radius 를 그대로 매칭.**

## 진행 방식

### Phase 0 — 이미지 분석 (Codex)

`codex exec --image /tmp/target-comparison.png` 또는 동급 도구로 타겟 이미지 우측 (오른쪽 phone)
을 직접 분석. 각 컴포넌트에 대해:

1. 폭/높이 (CSS px 추정)
2. 패딩 (좌우 / 상하)
3. border 두께 / 색 (oklch 또는 hex 추정)
4. background 색 (oklch 또는 hex 추정)
5. border-radius
6. 텍스트 색 / weight / size
7. shadow / glow 강도

→ `.specs/verodesign/2026-05-23-target-measurements.md` 에 표 형식으로 기록

### Phase 1 — 차이 매핑

같은 컴포넌트의 **현재 (왼쪽)** 값 vs **타겟 (오른쪽)** 값을 표로 정리. 패턴 CSS 의 어떤 토큰/룰
이 타겟 값과 다른지 명시.

### Phase 2 — 토큰/패턴 보정

verodesign 토큰 값 + 패턴 CSS 보정. 보정 우선순위:
1. **dimension / spacing**: 패딩, 너비, 높이, gap, radius
2. **border**: 폭, 색
3. **background**: 색 (oklch), alpha
4. **typography**: size, weight, letter-spacing
5. **effect**: shadow, glow

### Phase 3 — 검증

- `pnpm --filter @verobee/design build` + app-girok resync
- 393x852 Puppeteer 캡처 + sha256
- iOS sim 캡처 + sha256
- 사용자 image 우측과 시각 일치 보고 (각 컴포넌트별 픽셀 차이 5px 이하)

## 감사 대상 컴포넌트 (왼쪽→오른쪽 정확 매칭)

각 항목에 대해 위 Phase 0-2 적용:

1. **헤더 wordmark (girok.)** — 크기, 굵기, dot 색 + 크기
2. **알림/설정 아이콘 button** — 박스 크기, hover state
3. **1-Depth 탭 (가계부 ~ 설정)** — 탭 폭, 패딩, 텍스트 크기, active 색, underline 길이/두께/glow
4. **2-Depth segmented (내역조회/소비분석/가계부관리)** — 컨테이너 패딩 + radius + border + bg / 활성 셀 패딩 + radius + border + bg + shadow / 비활성 텍스트 색
5. **월 nav pill (<2026년 7월>)** — pill 패딩 + radius + bg + border + 화살표 색 / 라벨 폰트
6. **등록 button** — padding + radius + bg (amber filled) + text color + font-weight
7. **뷰 토글 (캘린더/리스트 아이콘)** — 컨테이너 패딩 + radius / 활성 셀 bg + 비활성 색
8. **Stats card 컨테이너** — outer border + radius + shadow / cell bg / divider 두께/색 / cell 내부 패딩
9. **Stats label** — 폰트 크기 + 색 + weight + margin-bottom
10. **Stats value (income/expense/remaining)** — 폰트 크기 + weight + 색 (emerald/rose/amber)
11. **캘린더 weekday row** — 폰트 크기 + 색 (week/sat/sun) + margin
12. **캘린더 grid row-gap** — 주 사이 간격
13. **캘린더 date chip** — 폭/높이 + 폰트 크기/weight / 일반 색 / **오늘 chip** bg + border + 색
14. **캘린더 dot** — 크기 + 색 + margin
15. **바텀 nav 탭 5개** — 아이콘 크기 + 라벨 크기 + active 색

## 제약

- 매 컴포넌트마다 측정 근거 (target 이미지의 어느 영역) 표기
- 추측 시 명시 ("ratio 기반 추정")
- 토큰 추가/수정은 girok-redesign experimental scope 내에서만
- 사용자 한국 주식 색 규칙 (rose↑ / blue↓) 보존
- import 순서 (patterns 가 index.css 뒤로) 와 background→background-color 픽스 보존

## 보고

```
Phase 0: 측정 N개 컴포넌트 → /tmp/measurements.md (라인 수)
Phase 1: 차이 N개 → 가장 큰 5개 표시
Phase 2: 변경 토큰 / 패턴 CSS 룰
Phase 3 캡처:
  - browser sha256
  - ios sim sha256
  - 컴포넌트별 매칭 OK/NG 묘사
```

Phase 0: 측정 15개 컴포넌트 → `.specs/verodesign/2026-05-23-target-measurements.md` (23 lines)
Phase 1: 차이 15개 → 가장 큰 5개 표시
- 캘린더 그리드 세로 리듬: 현재 좌측은 week gap 과 date chip 이 모두 큼, 타겟 우측은 숫자와 dot 이 더 타이트함
- 상단 1-depth 탭: 현재 좌측은 탭 폭/패딩이 커서 underline 이 무겁고 길어 보임, 타겟은 더 조밀함
- 2-depth segmented: 현재 좌측은 outer rail 과 active cell 이 모두 더 큼, 타겟은 57px 높이로 더 정제됨
- stats 카드: 현재 좌측은 card height 및 warm divider 가 강함, 타겟은 neutral divider 와 낮은 shadow
- 툴바 행: 현재 좌측은 month pill / 등록 / view toggle 가 전반적으로 큼, 타겟은 한 줄 안에서 더 compact 함
Phase 2: 변경 토큰 / 패턴 CSS 룰
- 변경 토큰
  - `exp.girok-redesign.wordmark.size` `1.875rem → 1.6875rem`
  - `exp.girok-redesign.wordmark.tracking` `-0.05em → -0.055em`
  - `exp.girok-redesign.tab.l1.font-size` `1.125rem → 1rem`
  - `exp.girok-redesign.tab.l2.font-size` `0.875rem → 0.9375rem`
  - `exp.girok-redesign.stats.label-size` `0.875rem → 0.8125rem`
  - `exp.girok-redesign.stats.value-size` `1rem → 0.9375rem`
  - `exp.girok-redesign.calendar.cell-size` `2.5rem → 2rem`
  - `exp.girok-redesign.calendar.weekday-size` `0.875rem → 0.8125rem`
  - `exp.girok-redesign.calendar.number-weight` `600 → 700`
  - `exp.girok-redesign.calendar.dot-size` `4px → 7px`
  - `exp.girok-redesign.calendar.today-bg` `hero alias → oklch(26.9% 0.026 76)`
  - `exp.girok-redesign.calendar.today-border` `modal alias → oklch(37.5% 0.04 77)`
  - `exp.girok-redesign.calendar.row-gap` `1.5rem → 2.125rem`
- 변경 패턴 CSS 룰
  - `.vds-pattern-girok-wordmark`, `__dot`: size 축소, dot visual scale 보정
  - `.vds-pattern-girok-tab-l1*`: scroll gap, item min-width/padding, inactive tone, underline width/border line 보정
  - `.vds-pattern-girok-tab-l2*`: outer rail height/radius, indicator inset, active cell border/background 보정
  - `.vds-pattern-girok-stats*`: neutral divider, shadow 제거, cell min-height/padding, label weight 보정
  - `.vds-pattern-girok-calendar*`: weekday margin, cell min-height, dot margin 보정
  - 신규 pattern helper: `.vds-pattern-girok-icon-actions`, `.vds-pattern-girok-icon-button`, `.vds-pattern-girok-toolbar`, `.vds-pattern-girok-month-pill*`, `.vds-pattern-girok-register-chip`, `.vds-pattern-girok-view-toggle*`, `.vds-pattern-girok-bottom-nav*`
Phase 3 캡처:
  - browser sha256
    - `0950a13147382be0380bf6ecb41c5995cbfdd0fafab509aeecf5eedbcebee821`
  - ios sim sha256
    - `1a250f2487a274c3b735bdeae1e5b4434588550c9a148f608e7479ab23fbfb02`
  - 컴포넌트별 매칭 OK/NG 묘사
    - 1. 헤더 wordmark: OK. 좌측 대비 더 작고 두꺼운 비율로 이동했지만 타겟보다 약간 더 낮게 깔림
    - 2. 알림/설정 아이콘 button: OK. 회색 outline 아이콘 톤은 근접, 타겟보다 spacing 약간 넓음
    - 3. 1-Depth 탭: OK. 언더라인 길이와 두께는 근접, inactive 글자 간격은 여전히 조금 넓음
    - 4. 2-Depth segmented: OK. active cell 분리가 명확해졌고 rail 톤도 근접
    - 5. 월 nav pill: NG. 브라우저 캡처에서는 폭을 줄여 한 줄 유지에 우선했고, 타겟보다 폭이 좁음
    - 6. 등록 button: OK. filled amber-brown 성격과 weight 는 맞음, 타겟보다 폭이 좁음
    - 7. 뷰 토글: OK. active tile 처리와 icon tone 은 맞음, 전체 폭은 축소됨
    - 8. Stats card 컨테이너: OK. divider 를 neutral 로 바꾸고 shadow 를 줄여 타겟에 가까워짐
    - 9. Stats label: OK. 크기와 색이 target 쪽으로 내려감
    - 10. Stats value: OK. size 축소 후 타겟과 더 근접
    - 11. 캘린더 weekday row: OK. 크기/색 모두 target 쪽으로 수렴
    - 12. 캘린더 grid row-gap: NG. 전체 프레임 내 바텀탭 동시 노출을 위해 실제 타겟보다 압축됨
    - 13. 캘린더 date chip: OK. 오늘 chip 은 더 작고 어두운 amber brown 으로 이동
    - 14. 캘린더 dot: OK. 7px 로 키워 target 에 근접
    - 15. 바텀 nav 탭 5개: OK. 브라우저 캡처는 노출 완료. iOS sim 은 Safari 오버레이가 겹쳐 순수 비교 불가
