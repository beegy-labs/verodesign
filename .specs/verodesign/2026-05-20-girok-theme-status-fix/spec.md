# SDD: girok theme status binding fix

> Authored: 2026-05-20 | Owner: Claude (planner) → Codex (implementation)
> Workflow: `.add/theme-add.md`

## Why

`packages/design/tokens/themes/girok-{dark,light}.json` 에 `theme.success` / `theme.destructive` / `theme.warning` slot binding 부재 (현재 `info` 만 binding). 동시에 `.specs/verodesign/2026-05-15-girok-palette-refinement.md` L44–46 (light) / L65–67 (dark) 는 girok 의 success/warning/danger 값을 이미 명시. 즉 문서 의도와 실제 파일 사이 누락.

이 누락 때문에 2026-05-20 pattern-intake SDD 7건 중 6건이 "uses existing semantic slots (success/destructive/warning)" 자가선언을 했고, Layer-3 audit (`b・jr5tjvp9.output`) 이 G3 FAIL. 따라서 girok status binding 보강이 후속 spec 정합의 선행조건.

본 SDD 의 scope 는 **girok 만**. verobase / veronex / *-light 의 system-wide status parity 미완은 별 SDD 로 분리 (audit finding `.specs/verodesign/2026-05-20-girok-status-binding-audit/finding.md` 참고).

## Source of values

`.specs/verodesign/2026-05-15-girok-palette-refinement.md`:

| theme  | slot          | hex (palette-refinement SSOT) | role 메모 |
|--------|---------------|--------------------------------|-----------|
| light  | `success`     | `#3C6B45`                      | forest    |
| light  | `warning`     | `#9A6516`                      | amber     |
| light  | `destructive` | `#8C2F28`                      | oxblood (palette 의 `danger` 명칭 = semantic `destructive` slot 으로 매핑) |
| dark   | `success`     | `#7FB07A`                      |           |
| dark   | `warning`     | `#D6A04F`                      |           |
| dark   | `destructive` | `#D98279`                      | palette `danger` 명칭 매핑 |

**name reconciliation**: palette-refinement 는 `danger` 명을 썼지만 verodesign canonical semantic slot 은 `theme.destructive`. naming SSOT 는 `docs/llm/tokens/naming.md`. 이 SDD 는 palette-refinement 의 hex 값만 차용하고, slot 명은 canonical `destructive` 사용. palette-refinement 측 후속 doc-sync 는 별 작업.

## Scope of edit

기본 3 슬롯 + fg parity 보강 = 총 11 binding (girok-light 6개 + girok-dark 5개):

**Parity 정책 보강 (Round 2 implementation, 2026-05-20)**: 본래 SDD는 "충돌 케이스만" *-fg override 였으나, 구현 라운드에서 girok-light 에 `success-fg` / `destructive-fg` 도 추가하여 **status × fg pair 가 light/dark mode 간 parity** 를 유지하도록 보강. 이유: girok-light 에서 success/destructive 의 inherited fg (white) 가 작동하더라도, future palette 재조정에서 일관성 유지 + brand-isolation skill 의 "slot parity" 정책에 부합. 따라서 light = 6, dark = 5 (light 에 warning-fg 추가, dark 는 warning-fg inherited 사용 — dark warning surface 위 dark inherited fg 가 이미 4.5:1 통과).

- `packages/design/tokens/themes/girok-dark.json` — `theme.success`, `theme.destructive`, `theme.warning` 신규 binding 3개 + `success-fg`, `destructive-fg` 2개 = 5개
- `packages/design/tokens/themes/girok-light.json` — status 3개 + `success-fg`, `destructive-fg`, `warning-fg` 3개 = 6개

### Round 1 측정 결과 (Codex `bzcd1cfy7` 실측)

| mode | slot | source hex | OKLCH | contrast on bg.page | contrast vs inherited *-fg |
|---|---|---|---|---|---|
| light | success | `#3C6B45` | `oklch(48.32% 0.0798 148.89)` | 5.04:1 ✓ | OK (white-fg) |
| light | warning | `#9A6516` | `oklch(55.11% 0.1108 70.77)` | 3.x:1 ✗ → `#915d04` (`oklch(52.31% 0.1108 71.57)`) 4.52:1 ✓ | dark warning-fg 와 충돌 → **`warning-fg` override 필요** |
| light | destructive | `#8C2F28` | `oklch(44.16% 0.1279 27.78)` | 6.67:1 ✓ | OK (white-fg) |
| dark | success | `#7FB07A` | `oklch(70.82% 0.093 142.27)` | 7.47:1 ✓ | white success-fg 와 충돌 → **`success-fg` override 필요** |
| dark | warning | `#D6A04F` | `oklch(74.11% 0.1171 75.25)` | 8.01:1 ✓ | OK (dark warning-fg) |
| dark | destructive | `#D98279` | `oklch(69.71% 0.1091 26.53)` | 6.61:1 ✓ | white destructive-fg 와 충돌 → **`destructive-fg` override 필요** |

라운드 2 추가 binding:
- `girok-light.json`: `theme.warning-fg` = **light/near-white** (정확한 OKLCH 는 Codex 가 contrast ≥ 4.5:1 on `#915d04` 만족치 산출). 후보 `oklch(99% 0 0)` 또는 `oklch(95% 0 0)`.
- `girok-dark.json`: `theme.success-fg` = **dark** (contrast ≥ 4.5:1 on `#7fb07a`). 후보 `oklch(20% 0 0)` 또는 기존 `bg.page` dark 와 시각언어 매칭.
- `girok-dark.json`: `theme.destructive-fg` = **dark** (contrast ≥ 4.5:1 on `#d98279`). 후보 동일.

OKLCH 변환은 Codex 가 culori 또는 동등 도구 사용. 변환 후 hex round-trip 이 ≤ ΔE 1 인지 자가검증.

## Acceptance gates

`.add/theme-add.md` 표준 + 본 SDD 한정:

| 게이트 | 요구사항 |
|--------|---------|
| DTCG schema valid | Codex `pnpm build` 통과 |
| References resolve | primitive (`color.*`) 참조면 dangling 0 |
| Slot 존재 검증 | `theme.success` / `theme.destructive` / `theme.warning` 이 `tokens/semantic/core.json` (또는 동등) 에 정의되어 있음 — 아니면 본 SDD blocked |
| WCAG contrast | 새 status color 가 `theme.bg.page` 및 `theme.bg.card` 위에서 **AA 4.5:1 이상**. AAA 7:1 통과시 spec 에 표기. fail 시 hex 미세조정 후 palette-refinement 와 ± ΔE 2 이내 |
| Slot parity (girok-only) | girok-dark 와 girok-light 가 동일 status 3 슬롯 binding (fg pair 는 충돌 케이스만 — full parity 보강은 별 SDD) |
| Fg contrast | status surface 위 *-fg ≥ 4.5:1. 측정 round 후 충돌이면 fg override 필수 |
| 시각 회귀 | dreamstock-simulator 또는 기존 girok consumer (verodesign showcase) 빌드에 시각적 break 0 (Codex spot-build) |
| CHANGELOG | `docs/llm/tokens/CHANGELOG.md` Unreleased 섹션에 row 추가 |

**Out-of-scope (별 SDD 필요)**:
- verobase / veronex / *-light 의 status parity 완성
- palette-refinement.md 의 `danger` → `destructive` 명칭 reconciliation
- 신규 semantic slot 추가 (본 SDD 는 existing slot 의 girok binding 만 채움)

## Constraint

- `tokens/semantic/*.json` 수정 금지 (semantic 슬롯 정의는 이미 존재한다는 전제. 정의 부재면 본 SDD blocked → 별 SDD 로 slot 신설 선행)
- 다른 brand theme 파일 수정 금지
- girok-{dark,light} 의 기존 binding 수정 금지 (3 슬롯 추가만)

## Validation steps (Codex 자가검증)

1. `cat packages/design/tokens/semantic/core.json | jq` 등으로 `success`/`destructive`/`warning` slot 정의 존재 확인. 없으면 STOP + 보고.
2. 6 색 hex → OKLCH 변환 (culori `formatOklch` 또는 등가). round-trip 후 ΔE ≤ 1 확인.
3. girok-{dark,light}.json 에 3 슬롯 추가, DTCG 표준 ($value, $type).
4. `pnpm build` 또는 동등 — 산출 CSS 에 `--vds-theme-success` 등 변수 정의 확인.
5. contrast 측정:
   - text(white/dark) on `--vds-theme-success/destructive/warning` ≥ 4.5:1
   - `--vds-theme-success/destructive/warning` on `--vds-theme-bg-page` ≥ 4.5:1
6. CHANGELOG row 추가, slug `feat(themes): bind girok success/destructive/warning`.
7. Codex 보고 (≤ 80줄): 추가 binding 3 슬롯 × 2 mode = 6, OKLCH 값, contrast ratio 표, build 결과.

## Layer-3 audit (별 세션 read-only)

본 SDD 구현 완료 후 독립 audit 가 다음을 검증:
- girok-{dark,light}.json grep 결과 3 슬롯 정확히 존재
- OKLCH ↔ hex round-trip 실측 ΔE ≤ 1
- 산출 CSS 의 contrast ratio 가 spec 표와 ±0.2 일치
- 다른 theme 파일 unchanged (git diff)
