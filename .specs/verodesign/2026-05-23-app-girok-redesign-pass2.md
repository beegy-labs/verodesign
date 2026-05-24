# app-girok 디자인 — Pass 2 시각 보정 (5개 항목)

> Date: 2026-05-23
> Builder: Codex
> Reviewer: Claude
> Ref: 사용자 image 좌(현재 9:46) vs 우(target 16:45)
> 정책: verodesign 패턴 + 토큰 차원에서만 수정. consumer JSX 변경 최소.

## 회귀 픽스 (P12-fix) 이후 남은 시각 diff

### Diff 1 — girok wordmark 굵기 부족

- 현재: ExtraBold (800) 느낌, "g/i/r/o/k" 획이 가늠
- 타겟: Black (900) 느낌, 획이 묵직하고 둥글게 두꺼움
- 픽스: `exp.girok-redesign.wordmark.weight` 토큰 800 → **900**
- 검증: 패턴 CSS `.vds-pattern-girok-wordmark` 의 font-weight 값 출력 확인

### Diff 2 — 1-Depth 활성 탭 underline 길이

- 현재: underline 이 탭 셀 전체 너비 - spacing-4 (거의 풀폭, 약 90%)
- 타겟: underline 이 텍스트 폭(약 50-60%) 만큼만, 중앙 정렬, 약간 더 굵음
- 픽스: 패턴 CSS `.vds-pattern-girok-tab-l1__item.is-active::after` (또는 동급 룰)
  - `right/left: spacing-2` → `left: 50%; transform: translateX(-50%); width: 60%`
  - height: 3px → **4px** (약간 더 두껍게)
  - 또는 underline 폭을 텍스트 너비로 맞추는 방법 (em 기반 width 또는 `content-box` 모양)
- 검증: 393x852 캡처에서 underline 이 텍스트 아래 중앙에 보이고 셀 전체 폭이 아님

### Diff 3 — 2-Depth segmented control 셀 구분 없음

- 현재: 어두운 단일 pill bar 안에 3 텍스트만, 활성 셀 시각적 구분 약함 (텍스트 색만 바뀜)
- 타겟: 각 셀이 독립된 rounded button 처럼 보이고, 활성 "내역 조회" 셀은 약간 더 밝은 bg + 미세 border 로 확실히 분리됨
- 픽스: 패턴 CSS `.vds-pattern-girok-tab-l2__cell.is-active` (또는 동급)
  - 활성 셀에 `background: var(--vds-exp-girok-redesign-surface-card)` 또는 toolbar 보다 한 단계 밝은 surface
  - `border: 1px solid var(--vds-exp-girok-redesign-border-modal-strong)` 또는 동등 토큰
  - 비활성 셀은 투명
  - 인디케이터 div 가 별도로 있다면 `is-active` 셀 자체에 background 적용으로 단순화
- 검증: 캡처에서 "내역 조회" 셀의 박스가 명확히 보이고 나머지 두 셀과 구분됨

### Diff 4 — "등록" 버튼은 filled amber

- 현재: 어두운 bg + amber border + amber text (outlined chip)
- 타겟: amber 가득 채워진 solid button + 어두운/검정 text
- 픽스: 패턴 CSS `.vds-pattern-girok-ledger-register-chip` (또는 동급)
  - `background: var(--vds-exp-girok-redesign-nav-tab-active)` (amber)
  - `color: var(--vds-exp-girok-redesign-shell-frame-surface)` 또는 black
  - `border: none`
  - 글자 굵기 800 유지
- 검증: 캡처에서 amber 가득 채운 버튼이 보이고 "등록" 텍스트가 어둡게 (검정/짙은 갈색)

### Diff 5 — Stats card 3-cell 분리 시각적으로 부족

- 현재: gap: 1px 의 line 색이 cell bg 와 거의 같아 분리감 약함
- 타겟: 3 셀이 각각 분리된 카드처럼 보임 — 1px gap 라인이 cell 보다 명확히 밝거나 어두움
- 픽스: 두 방법 중 선택
  - (a) 패턴 CSS `.vds-pattern-girok-stats` container background 를 cell 보다 **밝은** dark color (e.g. zinc-800 톤) 로 → 1px gap 사이 라인이 보임
  - (b) 또는 각 `__cell` 에 `border: 1px solid var(--vds-exp-girok-redesign-border-modal-strong)` 자체적으로 추가하고 container gap 제거
- 검증: 캡처에서 3 셀 사이 분리 라인이 명확히 보임

### Diff 6 — DailySheet (캘린더 클릭 바텀시트) 디자인

- 현재 (사용자 image #12 좌측):
  - 헤더: title "7월 10일" + 부제 "선택한 일자 거래 내역" + X 아이콘 (round bg 없음, 단순 텍스트)
  - mini stats: 별도 박스로 "수입/지출/잔액" 3-col, 라벨 위 + 숫자 아래
  - CTA: "+ 새로운 거래 등록" 텍스트만 (no filled bg)
  - 시트 높이: 65%
- 타겟 (사용자 image #12 우측):
  - 헤더: title "7월 10일" + **inline mini-stats "수입 +3,500,000 | 지출 -0"** (emerald/rose + "|" 회색 구분자) — 별도 박스 없이 헤더 안에 통합
  - X 아이콘: **circular dark bg button** (zinc-800 round 배경 + X 흰색)
  - 거래 카드: 동일 ("월급" 동그라미 + "7월 급여 / 월급" + amount)
  - CTA: **filled amber button** with text "**+ 이 날짜에 새로 등록하기**" (검정/어두운 text)
  - 시트 높이: 약간 더 큼 (체감상 70% — 단 65%여도 inline stats로 인해 컨텐츠 공간 늘어남)
- 픽스:
  - `widgets/modals/ui/DailySheet.tsx` (consumer 측) 또는 verodesign 패턴 CSS 갱신:
    - 부제 영역 제거, 대신 title 아래 inline-flex 로 "수입 emerald + | 회색 + 지출 rose" 텍스트 렌더
    - X 버튼에 circular bg (`background: var(--vds-exp-girok-redesign-surface-card)` + radius-full + padding)
    - mini stats 별도 박스 제거 (헤더에 inline 으로 들어갔으니 중복)
    - CTA 텍스트 변경: "+ 새로운 거래 등록" → "+ 이 날짜에 새로 등록하기"
    - CTA 스타일: filled amber bg + 검정 text (Diff 4 패턴과 동일)
- 검증: 캡처에서 헤더 한 줄에 "수입+ | 지출-" inline 표시, X 동그라미 버튼, CTA filled amber

## 작업 순서

1. Diff 1, 2, 4: verodesign 패턴 CSS (`packages/design/dist/patterns/girok-app.css` 또는 build emit 소스)
2. Diff 3, 5: 같은 패턴 CSS 또는 girok-redesign.json 토큰 보정
3. `pnpm --filter @verobee/design build` 후 app-girok resync
4. Puppeteer 393x852 + iOS sim 캡처
5. 사용자 image 우측과 시각 비교 보고

## 보고

```
변경 토큰: <목록 with old → new>
변경 패턴 CSS 룰: <목록>
캡처 sha256: browser=<>, ios=<>
시각 묘사:
  - Diff 1 wordmark: <묘사>
  - Diff 2 underline: <묘사>
  - Diff 3 segmented: <묘사>
  - Diff 4 등록 button: <묘사>
  - Diff 5 stats divider: <묘사>
```

각 시각 묘사는 비-게임가능 — 캡처를 보고 직접 언어로 묘사.
