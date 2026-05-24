# Pattern Intake: Token audit + mock→vds mapping (girok-redesign)

> Slug: `pattern-token-audit-girok` · Created: 2026-05-22 · Status: **proposed** · Owner: vero · Driver app: **app-girok redesign** (mock `/Users/vero/workspace/beegy/app-design-2.txt`, 1342줄)

## 1. Knowledge-gap check

- 2026-05-22 양면 인벤토리 수집 완료(Claude 세션 내 Explore 에이전트). 16종 hex 색, 12종 tailwind 색 가족, 12종 unique radius/size 발견. 기존 `--vds-exp-girok-redesign-*` 23종 + `--vds-exp-girok-{surface,bg,market,loan,progress,finance,icon-tile,shadow}-*` 약 40종이 mock의 ~70% 표면을 이미 커버.
- 갭: 디바이스/시트/모달용 large radius(52/32/28), 라벨/마이크로 폰트 사이즈(10/11/13/15), pill 색 가족(rose/blue/emerald/purple semantic), 색별 glow shadow.

## 2. Source & Rationale

- **Source**: mock 전수 grep (16 hex + 모든 tailwind class).
- **Why**: app-girok 리디자인 mock의 모든 시각 리터럴을 verodesign 토큰으로 traceable 매핑. **whitebox 원칙**(`feedback_whitebox_no_blackbox_deps`)에 따라 모든 값이 토큰에서 출처를 가져야 함. arbitrary tailwind 값(예: `rounded-[52px]`, `text-[11px]`)은 컨슈머가 인라인 박지 않고 토큰 alias로 호출.
- **Driver**: app-girok 첫 화면이 토큰 부재로 그려질 수 없음. 추상적 토큰 시스템 미관 아니라 app-girok 즉시 사용분만 도입(`feedback_pattern_intake_consumer_driven`).

## 3. Scope — three tracks

| 트랙 | 작업 | 결과물 |
|---|---|---|
| **T1: 매핑 레퍼런스** | mock 리터럴 → 기존 vds 토큰 표 작성 | `docs/llm/research/girok-redesign-token-map.md` |
| **T2: 신규 토큰** | 갭 ~14종 추가 (radius, font size, pill 색, glow) | `tokens/experimental/girok-redesign.json` 확장 + 신규 파일 |
| **T3: 일관화** | 기존 `girok-redesign` 네이밍 정합 (`incomeactive` → `income-active` 등 CSS 변수 카멜→케밥) | 기존 JSON 정리 + dist 재빌드 |

모든 신규 토큰은 `exp.girok-redesign.*` 또는 `exp.girok.*` 네임스페이스(experimental). canonical 승격은 별도 SDD/2주 soak 후.

## 4. T1 — Mapping reference (deliverable)

**파일**: `docs/llm/research/girok-redesign-token-map.md` (신규)

내용 형식(예시 행):
```
| Mock 리터럴 | 등장 (회) | 의미 | vds 토큰 | CSS var |
|---|---|---|---|---|
| `#0E0D0A` | 31 | 디바이스 프레임/메인 배경 | `exp.girok-redesign.shell.frame-surface` | `--vds-exp-girok-redesign-shell-frame-surface` |
| `#1C1A14` | 17 | 카드 표면 | `exp.girok-redesign.surface.card` | `--vds-exp-girok-redesign-surface-card` |
| `#14120E` | 17 | 서브 카드/리스트 항목 | `exp.girok-redesign.surface.card-subtle` | `--vds-exp-girok-redesign-surface-card-subtle` |
| `#3A3326` | 9 | 모달 강한 테두리 | `exp.girok-redesign.border.modal-strong` | `--vds-exp-girok-redesign-border-modal-strong` |
| `#2E281C` | 8 | 활성 토글 pill | `exp.girok-redesign.toggle.active-bg` (신규 T2-1) | `--vds-exp-girok-redesign-toggle-active-bg` |
| `#2B271E` | 6 | 세그먼트 컨트롤 테두리 | `exp.girok-redesign.border.card-subtle` | (기존) |
| `#483E2C` | 5 | 활성 pill 테두리 | `exp.girok-redesign.border.active` | (기존) |
| `bg-zinc-950` | 8 | 외곽 화면 배경 | `theme.bg.page` (dark 테마) | `--vds-theme-bg-page` |
| `text-amber-400` | 8 | 활성 텍스트 | `exp.girok-redesign.nav.tab-active` | (기존) |
| `bg-amber-500` | 28 | 등록 CTA 배경 | `theme.primary.$root` (girok-dark) | `--vds-theme-primary` |
| `text-emerald-400` | 7 | 수입 금액 | `exp.girok-redesign.stats.income-text` | (기존) |
| `text-rose-400` | 6 | 지출 금액 | `exp.girok-redesign.stats.expense-text` | (기존) |
| `rounded-[52px]` | 1 | 디바이스 프레임 | `exp.girok-redesign.radius.device-frame` (신규 T2-2) | `--vds-exp-girok-redesign-radius-device-frame` |
| `rounded-[32px]` | 2 | 바텀시트 상단 | `exp.girok-redesign.radius.sheet` (신규 T2-3) | `--vds-exp-girok-redesign-radius-sheet` |
| `rounded-[28px]` | 4 | 모달 | `exp.girok-redesign.radius.modal` (신규 T2-4) | `--vds-exp-girok-redesign-radius-modal` |
| `text-[10px]` | 다수 | 캡션/배지 | `exp.girok-redesign.font-size.caption` (신규 T2-5) | `--vds-exp-girok-redesign-font-size-caption` |
| `text-[11px]` | 다수 | 라벨 (micro) | `exp.girok-redesign.font-size.micro` (신규 T2-6) | `--vds-exp-girok-redesign-font-size-micro` |
| `text-[13px]` | 다수 | 리스트 제목 | `exp.girok-redesign.font-size.body-sm` (신규 T2-7) | `--vds-exp-girok-redesign-font-size-body-sm` |
| `text-[15px]` | 다수 | 메뉴 항목 | `exp.girok-redesign.font-size.menu` (신규 T2-8) | `--vds-exp-girok-redesign-font-size-menu` |
| `shadow-[0_-2px_8px_rgba(251,191,36,0.5)]` | 1 | 탭 언더라인 glow | `exp.girok.shadow.glow.accent` | (기존) |
| `shadow-[0_0_15px_rgba(16,185,129,0.4)]` | 1 | 수입 버튼 glow | `exp.girok-redesign.shadow.glow.income` (신규 T2-9) | `--vds-exp-girok-redesign-shadow-glow-income` |
| `shadow-[0_0_30px_rgba(251,191,36,0.15)]` | 1 | 모달 소프트 glow | `exp.girok-redesign.shadow.glow.modal-soft` (신규 T2-10) | `--vds-exp-girok-redesign-shadow-glow-modal-soft` |
| `shadow-md shadow-rose-500/20` | 2 | 매수 토글 glow | `exp.girok-redesign.shadow.glow.expense-soft` (신규 T2-11) | `--vds-exp-girok-redesign-shadow-glow-expense-soft` |
| `shadow-md shadow-blue-500/20` | 2 | 매도 토글 glow | `exp.girok-redesign.shadow.glow.info-soft` (신규 T2-12) | `--vds-exp-girok-redesign-shadow-glow-info-soft` |
| `bg-rose-500/20` (배지) | 2 | 지출/우선 pill bg | `exp.girok-redesign.pill.expense-bg` (신규 T2-13) | `--vds-exp-girok-redesign-pill-expense-bg` |
| `bg-blue-500/20`, `bg-emerald-500/20`, `bg-indigo-500/10` | 각 1+ | 카테고리 pill bg | `exp.girok-redesign.pill.{info,success,info-soft}-bg` (신규 T2-14a~c) | 동명 CSS var |

매핑 표는 **모든 16 hex + 모든 tailwind 색/사이즈 사용처**(총 ~80행) 망라. T2/T3 작업 결과 반영하여 최종 작성.

## 5. T2 — 신규 토큰 (정확한 추가 목록)

### 5.1 Radius (3개 신규)

`tokens/experimental/girok-redesign.json` 의 `radius` 그룹에 추가:

```json
{
  "exp": {
    "girok-redesign": {
      "radius": {
        "device-frame": { "$value": "52px", "$type": "dimension", "$description": "iPhone 17 frame outer radius (mock fixture)" },
        "sheet":        { "$value": "32px", "$type": "dimension", "$description": "Bottom sheet top-rounded corners" },
        "modal":        { "$value": "28px", "$type": "dimension", "$description": "Centered modal radius" }
      }
    }
  }
}
```

### 5.2 Font sizes (4개 신규)

```json
{
  "exp": {
    "girok-redesign": {
      "font-size": {
        "caption": { "$value": "10px", "$type": "dimension", "$description": "Caption/badge label" },
        "micro":   { "$value": "11px", "$type": "dimension", "$description": "Button micro label" },
        "body-sm": { "$value": "13px", "$type": "dimension", "$description": "List item title" },
        "menu":    { "$value": "15px", "$type": "dimension", "$description": "Top-level menu item" }
      }
    }
  }
}
```

> 가능하면 canonical `font.size.2xs / 2xs-strong / sm / md` 와 sync 확인. 기존 canonical `font.size.xs=12px` 과의 1px 차이가 의도적이면 별도 토큰 유지, 아니면 canonical 사용으로 대체 가능. Codex가 비교 후 결정.

### 5.3 Glow shadows (4개 신규)

```json
{
  "exp": {
    "girok-redesign": {
      "shadow": {
        "glow": {
          "income":       { "$value": "0 0 15px rgba(16, 185, 129, 0.4)",  "$type": "shadow", "$description": "Income action button green glow" },
          "modal-soft":   { "$value": "0 0 30px rgba(251, 191, 36, 0.15)", "$type": "shadow", "$description": "Modal amber soft glow" },
          "expense-soft": { "$value": "0 4px 8px rgba(244, 63, 94, 0.20)", "$type": "shadow", "$description": "Buy/expense toggle rose glow" },
          "info-soft":    { "$value": "0 4px 8px rgba(59, 130, 246, 0.20)","$type": "shadow", "$description": "Sell/info toggle blue glow" }
        }
      }
    }
  }
}
```

> 기존 `exp.girok.shadow.glow.{accent, warning, warning-soft}` 와 의미 중첩 검사. 중복 시 정리(T3 일환).

### 5.4 Pill backgrounds (4개 신규, 카테고리 배지)

```json
{
  "exp": {
    "girok-redesign": {
      "pill": {
        "expense-bg":      { "$value": "rgba(244, 63, 94, 0.20)",  "$type": "color", "$description": "Rose pill bg (priority repay, expense badge)" },
        "info-bg":         { "$value": "rgba(59, 130, 246, 0.20)", "$type": "color", "$description": "Blue pill bg (sell, info)" },
        "success-bg":      { "$value": "rgba(16, 185, 129, 0.20)", "$type": "color", "$description": "Emerald pill bg (savings, success)" },
        "indigo-tile-bg":  { "$value": "rgba(99, 102, 241, 0.10)", "$type": "color", "$description": "Indigo tile (KIS credential icon)" }
      }
    }
  }
}
```

### 5.5 Toggle active bg (1개 신규)

기존 `toggle.expense-active`, `toggle.income-active`, `toggle.active-foreground`만 있고 **neutral active(가계부/투자 세그먼트 활성)** 토큰 부재. mock `#2E281C` 매핑 토큰 추가:

```json
{
  "exp": {
    "girok-redesign": {
      "toggle": {
        "active-bg": { "$value": "#2E281C", "$type": "color", "$description": "Neutral active toggle (segment, view-switch)" }
      }
    }
  }
}
```

> 또는 기존 `exp.girok.bg.segmented-active`(있다면)와 의미 중첩. Codex가 dist CSS 검사 후 중복이면 alias, 아니면 신규.

### 5.6 신규 토큰 총합

**14개 추가** (radius 3 + font-size 4 + glow 4 + pill 4 + toggle 1 = **14** … pill 카운트 4면 16. 실제는 위 표 기준):

| 카테고리 | 신규 개수 |
|---|---|
| radius | 3 |
| font-size | 4 |
| shadow.glow | 4 |
| pill | 4 |
| toggle | 1 |
| **합계** | **16** |

## 6. T3 — 네이밍 일관화 (consolidation)

### 6.1 카멜→케밥 정리

기존 girok-redesign.json 에서 camelCase가 CSS 변수로 lowercased 되어 발생한 비일관 정리:

| 현재 (JSON token path → 출력 CSS var) | 변경 후 |
|---|---|
| `toggle.incomeActive` → `--vds-exp-girok-redesign-toggle-incomeactive` | `toggle.income-active` → `--vds-exp-girok-redesign-toggle-income-active` |
| `toggle.activeForeground` → `…-toggle-activeforeground` | `toggle.active-foreground` → `…-toggle-active-foreground` |
| `nav.tabUnderlineGlow` → `…-nav-tabunderlineglow` | `nav.tab-underline-glow` → `…-nav-tab-underline-glow` |

> **Breaking**: 기존 변수명을 참조하는 컨슈머 코드(app-girok TabBar 등) 동시 마이그레이션 필요. 본 SDD는 verodesign 측만 변경, app-girok 측은 후속 foundation SDD(Phase 1)에서 정리. 임시 alias(deprecated) 1주 유지.

### 6.2 의미 중첩 통합 (있을 시)

- `exp.girok.bg.segmented-active` vs 신규 `exp.girok-redesign.toggle.active-bg` — 동일 값이면 alias로 통합, 아니면 둘 다 유지하되 description으로 구분.
- `exp.girok.shadow.glow.warning-soft` vs 신규 `exp.girok-redesign.shadow.glow.modal-soft` — Codex가 값 비교 후 alias 결정.

## 7. Slot group

기존 `girok-redesign` slot group 에 확장. 새 slot 신설 안 함.

## 8. Cross-brand zero-diff

- 본 SDD가 추가하는 토큰은 모두 `exp.girok-redesign.*` 또는 `exp.girok.*` 네임스페이스 → 다른 brand/theme 출력에 영향 없음.
- T3 카멜→케밥 변경은 **breaking** — 기존 변수명 참조하는 verodesign 외부 컨슈머가 있는지 grep:
  - `/Users/vero/workspace/beegy/app-girok` 전체에서 `--vds-exp-girok-redesign-` grep 결과 행 수 측정 후 마이그레이션 plan.
  - 기타 컨슈머(`verobase`, `veronex`) grep 결과 0이어야(아니면 별도 dialog).

## 9. Promotion criteria

- 2주 soak (≥ 2026-06-05).
- app-girok 리디자인 머지 후 토큰 누락/오용 0건.
- ≥ 1회 incremental 토큰 추가 PR(예: 17번째 토큰) 패턴 검증.
- 그 시점에 canonical 승격 후보(`radius.{sheet,modal}`, `font.size.{caption,micro,body-sm}`) 별도 SDD.

## 10. Out of scope (defer)

- Canonical 승격 (별도 SDD).
- 다른 brand 영향 분석 (현재 girok 외 컨슈머 0).
- Tailwind 플러그인 자동 생성 (verodesign에 tailwind 도입 자체가 금지: `feedback_verodesign_only`).
- `gap-[2.6px]` 같은 calc derivative — 토큰화 안 함, 코드에서 `calc(33.333% - var(--vds-spacing-…))` 직접 사용.
- light 모드 mock — mock은 dark만 그려져 있음. light 매핑은 후속.

## 11. Open questions

- (Q1) `font.size.{caption,micro,body-sm,menu}` 가 canonical font.size 와 1px 차이만 있다면 (예: micro 11px vs xs 12px) 분리 정당화. Codex가 canonical 값 확인 후 결정.
- (Q2) `exp.girok.shadow.glow.warning-soft` 와 `exp.girok-redesign.shadow.glow.modal-soft` 의 값 비교 — 동일이면 alias, 아니면 둘 다 유지.
- (Q3) toggle.active-bg 의 `#2E281C` 가 `exp.girok.bg.segmented-active` 와 같은가? 같으면 alias만.

---

## Deliverables

1. **`packages/design/tokens/experimental/girok-redesign.json`** 확장 — 새 그룹 5개(radius, font-size, shadow.glow, pill, toggle.active-bg) 추가, 기존 카멜케이스 path 케밥 통일.
2. **`docs/llm/research/girok-redesign-token-map.md`** 신규 — Section 4 매핑 표 전수(모든 mock 리터럴 망라, ≥ 80행).
3. **Style Dictionary 재빌드** → `packages/design/dist/css/canonical.css` 와 girok 테마 출력에 신규 변수 16개 등장.
4. **`docs/llm/research/pattern-catalog.md`** 1행 추가 (`| token-audit-girok | experimental | internal:app-girok | 2026-05-22 |`).
5. **`CHANGELOG.md`** (design 패키지) — 신규 토큰 16개 + breaking rename 3개 명시.
6. **임시 alias 토큰**(deprecated) — 기존 카멜 변수명 1주 유지를 위해 alias 토큰 3개 추가(`toggle.incomeActive → toggle.income-active`).

---

## Verification gates (for Codex; 비-게임가능)

| Gate | Pass criterion |
|---|---|
| **G1: 신규 토큰 CSS 변수 개수** | `grep -c '^\s*--vds-exp-girok-redesign-(radius-device-frame\|radius-sheet\|radius-modal\|font-size-caption\|font-size-micro\|font-size-body-sm\|font-size-menu\|shadow-glow-income\|shadow-glow-modal-soft\|shadow-glow-expense-soft\|shadow-glow-info-soft\|pill-expense-bg\|pill-info-bg\|pill-success-bg\|pill-indigo-tile-bg\|toggle-active-bg)' dist/css/canonical.css` ≥ 16 |
| **G2: 카멜→케밥 변경** | `grep -c 'incomeactive\|activeforeground\|tabunderlineglow' dist/css/canonical.css` = 0 (deprecated alias 제외 검색은 별도 alias 파일 grep으로) |
| **G3: 케밥 신규명 존재** | `grep -cE 'toggle-income-active\|toggle-active-foreground\|nav-tab-underline-glow' dist/css/canonical.css` = 3 |
| **G4: 매핑 doc 행 수** | `wc -l docs/llm/research/girok-redesign-token-map.md` ≥ 100 (표 + 헤더 + 설명) AND grep으로 mock 16 hex 모두 1행 이상 등장 |
| **G5: 매핑 doc — mock 16 hex 망라** | `for hex in 0E0D0A 1C1A14 14120E 3A3326 2E281C 2B271E 483E2C 232018 1A1813 0D0C0A 25221B 1A1812 3D3425 1F1C15 161410 12110E; do grep -c "$hex" token-map.md; done` 모두 ≥ 1 |
| **G6: WCAG contrast** | 신규 색 토큰(pill bg 4종) 각각 위에 텍스트 색 매칭 시 WCAG AA(4.5:1) 만족 — Codex가 WCAG 산식 적용 결과 보고 |
| **G7: 빌드** | `pnpm -w build` 전체 통과 + Style Dictionary `dist/` 갱신 |
| **G8: 외부 컨슈머 회귀 0** | `grep -rE 'incomeactive\|activeforeground\|tabunderlineglow' /Users/vero/workspace/beegy/app-girok/src /Users/vero/workspace/beegy/verobase/src /Users/vero/workspace/beegy/veronex/src` → app-girok에서 발견된 갯수만 deprecated alias로 커버 가능함을 보고; 다른 두 곳은 0 |
| **G9: deprecated alias 존재** | 카멜 변수명 3개가 case-sensitive로 alias로 살아있음 — `grep -E '^\s*--vds-exp-girok-redesign-toggle-incomeactive' dist/css/canonical.css` ≥ 1 |
| **G10: pattern catalog** | `grep -c 'token-audit-girok' docs/llm/research/pattern-catalog.md` ≥ 1 |
| **G11: Q1/Q2/Q3 명시 해결** | Codex 최종 리포트에 Q1/Q2/Q3 각각의 결정 + 근거(grep 결과 또는 canonical 값 비교) 기재 |

**비-게임가능**: 모든 gate는 디스크 산출물(CSS, JSON, MD)에 대한 grep/count 측정. 자가선언/주석 우회 불가. **2연속 클린 측정 후 작업 종료**.
