# SDD: girok experimental tokens (Phase B)

> Authored: 2026-05-20 | Workflow: `.add/pattern-intake.md` (multi-pattern) + `.add/token-add.md`
> 선행: `.specs/verodesign/2026-05-20-girok-theme-status-fix/` (Phase A, completed)
> Scope: app-girok catalog `docs/design/units/` 의 cross-screen 신설 후보 중 **brand-scoped experimental** (canonical 미진입). 모두 `exp.girok.*` namespace.

## Why

app-girok catalog audit (`b・jr5tjvp9.output`) 가 7 pattern-intake spec 의 "0 new tokens" 자가선언을 reject. 6 spec 이 design.txt 원본 색·그라데이션을 generic semantic 으로 표현 불가. 또 `verodesign/.specs/verodesign/2026-05-20-token-additions-inventory/inventory.md` 가 cross-screen 토큰 후보 12+ 를 인벤토리화.

본 SDD 는 그 후보 중 **girok brand 의미가 dominant** 한 것들을 `exp.girok.*` experimental 로 신설. canonical 진입은 promotion (≥14일 soak + ≥2 cross-brand consumer + manual approval) 후속.

## Source

- `app-girok/docs/design/units/*.md` — 각 token 후보가 등장한 unit
- `verodesign/.specs/verodesign/2026-05-20-token-additions-inventory/inventory.md` — 후보 그룹화 SSOT
- `verodesign/packages/design/tokens/experimental/girok-glow.json` — 기존 `shadow.glow.accent` (통합 대상)

## Tokens to add (4 files, ~14 tokens)

### file 1: `packages/design/tokens/experimental/girok-surfaces.json`

```
exp.girok.surface.hero.start       — design.txt: linear-gradient from-#1C1A14
exp.girok.surface.hero.end         — design.txt: to-#14120E (또는 #12110E)
exp.girok.surface.hero.border      — design.txt: border-#3A3326
exp.girok.bg.segmented-active      — design.txt: bg-#2E281C (selected chip surface)
```

source unit:
- hero.{start,end,border}: invest-snowball-hero, debt-summary, assets-overview-total
- bg.segmented-active: household-ledger-records-toolbar, tab-household-ledger

### file 2: `packages/design/tokens/experimental/girok-icon-tile.json`

```
exp.girok.icon-tile.info     — design.txt: bg-indigo-500/10  (alpha tint surface)
exp.girok.icon-tile.success  — design.txt: bg-emerald-500/10
exp.girok.icon-tile.warning  — design.txt: bg-amber-500/10
exp.girok.icon-tile.danger   — design.txt: bg-rose-500/10
```

source unit:
- settings-system-links, settings-data-log, invest-quick-actions

각 token 은 alpha-tinted background. Codex 가 `color-mix(in oklab, var(--vds-theme-{info,success,warning,destructive}) 10%, transparent)` 또는 등가 OKLCH alpha-mix 로 산출.

### file 3: `packages/design/tokens/experimental/girok-finance.json`

```
exp.girok.market.up               — design.txt: text-rose-400  (한국 finance UI 관습: 빨강=상승)
exp.girok.market.down             — design.txt: text-blue-400  (한국 finance UI 관습: 파랑=하락)
exp.girok.loan.priority           — design.txt: priority repayment pill — 일반 destructive 와 의미 분리
exp.girok.progress.goal-fill-start — design.txt: amber gradient progress start
exp.girok.progress.goal-fill-end  — design.txt: emerald gradient progress end (목표 도달)
```

source unit:
- market.up/down: invest-positions
- loan.priority: debt-loans
- progress.goal-fill-*: invest-snowball-hero

**중요**: `market.up/down` 의 한국 finance 관습 (빨강=상승, 파랑=하락) 은 미국 관습 (녹색=상승, 빨강=하락) 과 정반대. brand-scoped 인 이유 — 다른 brand 가 미국 관습이면 `theme.success/destructive` 직매핑 가능, girok 은 별 슬롯 필요.

### file 4: `packages/design/tokens/experimental/girok-glow.json` (확장)

기존 파일 (`shadow.glow.accent` 만 존재) 확장:

```
exp.girok.shadow.glow.accent       — 기존 유지 (active tab underline glow)
exp.girok.shadow.glow.warning      — 신설: CTA button colored shadow (shadow-amber-500/20)
exp.girok.shadow.glow.warning-soft — 신설: dialog/calculator soft amber glow (shadow-amber-500/20 약함)
```

source unit:
- accent: global-depth-tabs, global-bottom-nav
- warning: settings-data-log (save CTA)
- warning-soft: modal-scalp-calculator

## DTCG format

각 .json:

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "$extensions": {
    "verobee": {
      "status": "experimental",
      "since": "v0.X.Y",
      "source": "app-girok/docs/design/units/{file}.md, ...",
      "implements": ["girok-scoped"],
      "brand": "girok"
    }
  },
  "exp": {
    "girok": {
      "{group}": {
        "{slot}": {
          "$value": "oklch(...)",
          "$type": "color",
          "$description": "..."
        }
      }
    }
  }
}
```

CSS 출력은 `--vds-exp-girok-{group}-{slot}` prefix.

## Source value mapping (design.txt → OKLCH)

Codex 가 변환 수행. 변환 기준:

| Tailwind class | hex (Tailwind v3) | OKLCH (Codex 산출) |
|----------------|-------------------|---------------------|
| `text-rose-400` | `#FB7185` | ... |
| `text-blue-400` | `#60A5FA` | ... |
| `text-amber-500` | `#F59E0B` | ... |
| `text-emerald-400` | `#34D399` | ... |
| `text-indigo-400` | `#818CF8` | ... |
| `bg-indigo-500/10` | rgba(99 102 241 / 10%) | `color-mix(... 10%, transparent)` 또는 OKLCH alpha |
| `bg-emerald-500/10` | rgba(16 185 129 / 10%) | 동일 |
| `bg-amber-500/10` | rgba(245 158 11 / 10%) | 동일 |
| `bg-rose-500/10` | rgba(244 63 94 / 10%) | 동일 |
| `#1C1A14` | hero gradient start | ... |
| `#14120E` | hero gradient end | ... |
| `#3A3326` | hero gradient border | ... |
| `#2E281C` | segmented active surface | ... |

Codex 변환 결과 OKLCH ↔ hex round-trip ΔE ≤ 1 자가검증.

**Mode-aware contrast 정책 (Round 1 implementation 보강, audit `bpoqn12o5`)**:
- `text-rose-400 #fb7185`, `text-blue-400 #60a5fa`, `text-emerald-400 #34d399` 는 girok-light theme 의 warm-light bg.page (`oklch(93%)`) 위에서 contrast 부족 (≈ 3:1)
- 그래서 `exp.girok.{market,finance}.up/down` 은 mode-aware alias 로 구현:
  - light: 동일 hue 더 어두운 톤 (rose: ~`oklch(50% 0.17 28)` = `#af2b25`, blue: ~`oklch(47% 0.11 255)` = `#2b5c97`)
  - dark: 원본 톤 유지 또는 살짝 밝게 (`oklch(70% 0.17 28)` / `oklch(73% 0.11 255)`)
- `progress.goal-fill-end` 는 emerald-500 `#10b981` 사용 (decorative, source 의도 보존)
- 이 변경은 catalog source 서술 (Tailwind class) 의 **시각 의도** 를 유지하되 girok 모드별 AA contrast 보장. spec C 재작성 시 mode-aware 사실을 인용한다.

**Scope 추가 사항**: `exp.girok.finance.flat` (중립 톤) 가 향후 finance 표시 일관성을 위해 함께 신설됨. 본 SDD 범위 밖이지만 보수적 보존. 후속 doc-sync 에서 catalog 갱신 또는 SDD scope expand 둘 중 하나로 정리.

## Acceptance gates (`.add/pattern-intake.md` + `.add/token-add.md`)

| Gate | 요구사항 |
|------|---------|
| DTCG schema valid | Codex `pnpm build` 통과 |
| `$extensions.verobee.status` = "experimental" | 각 file 4개 모두 |
| `$extensions.verobee.brand` = "girok" | 각 file 4개 모두 (brand-scoped) |
| `$extensions.verobee.source` URL | catalog unit 경로 명시 (≥1 unit per token) |
| WCAG contrast | text-on-token / token-on-bg 가 AA 4.5:1 또는 decorative-only 명시 |
| `--vds-exp-girok-*` prefix | 산출 CSS 에 14개 변수 정의 |
| canonical 토큰 unchanged | `tokens/semantic/`, `tokens/themes/` (girok 외) 수정 0 |
| pattern-catalog.md 갱신 | 각 신설 token (또는 group) row 추가, status: experimental |
| CHANGELOG | `docs/llm/tokens/CHANGELOG.md` Unreleased 섹션 row 추가 |

## Contrast intent (Claude scope)

- **hero surface (gradient)**: decorative background. text 가 hero 위에 오면 `--vds-theme-text-primary` 사용 → 별 contrast 검증 필요. AA 4.5:1.
- **icon-tile (alpha)**: tinted background. icon stroke 색은 일반 status (success/warning/destructive/info). icon tile 자체는 decorative.
- **market.up/down**: text color (text-rose-400 / text-blue-400). 본문 위 (`bg.page`) 또는 카드 위 (`bg.card`) 에서 AA 4.5:1 필수.
- **loan.priority**: pill 색. text-on-pill AA 통과. decorative tolerance 가능 (의미적 강조).
- **progress.goal-fill**: progress bar fill. decorative (text 없음).
- **glow shadow**: 그림자. text 없음, decorative only.

Codex 가 각 토큰 별로 AA / decorative 명시.

## Self-check (pattern-intake.md 요구)

```
[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: brand-scoped experimental tokens (girok-finance, girok-surfaces, girok-icon-tile, girok-glow).
External authority needed: no — source is internal (app-girok design.txt via catalog units).
```

## Out-of-scope (별 SDD 필요)

- canonical 진입 (promotion: 14일 soak + ≥2 cross-brand consumer + manual approval)
- `mobile-shell.*` (app-shell slot group future activation 필요)
- 단일 unit P3 (`wordmark-accent`, `action-emphasis`, `motion.bounce.short`)
- verobase / veronex / *-light system-wide status parity
- semantic slot 신설 (`tokens/semantic/`)
- canonical theme 수정 (girok 외)
- 컴포넌트 코드
- pattern-intake spec 7 재작성 (Phase C 영역)

## Validation steps (Codex 자가검증)

1. design.txt 원본 색 → OKLCH 변환 (culori). round-trip ΔE ≤ 1.
2. 4 .json file 생성, DTCG + $extensions 표준
3. `pnpm build` 또는 등가 — 산출 CSS 에 `--vds-exp-girok-*` 변수 14개 정의
4. contrast 측정 (각 token decorative or AA, 위 contrast intent 표 기준)
5. pattern-catalog.md 에 row 4개 (file 단위) 또는 14 row (token 단위, file 별로 묶음 가능)
6. CHANGELOG Unreleased 섹션 row 추가
7. `git diff --stat` 확인 = 4 new files + pattern-catalog + CHANGELOG + dist (artifact)
8. Codex 보고 (≤ 150줄): 14 token 의 OKLCH 값 표, contrast 표, build 결과, pattern-catalog row count

## Layer-3 audit (별 세션)

본 SDD 구현 후 read-only audit 가:
- 4 file 의 $extensions 메타 정확성
- OKLCH ↔ design.txt 원본 hex round-trip
- AA contrast 또는 decorative 명시 정합
- pattern-catalog.md row 정합
- canonical 토큰 unchanged (semantic/themes/girok 외)
