# SDD: Contrast policy v2 (X2-3)

> Authored: 2026-05-21 | Phase X2 — 정공법 시정 #3 | Depends: X2-1 (slot group)
> Inputs: X1 BLOCKER G7 (policy vs validator mismatch) + X1-A P1 (WCAG 2.2 baseline wording + APCA pathway) + user decision (AA baseline + AAA optional slot 분리)

## Why

현 `contrast.md` 정책:
- WCAG 2.1 baseline (legal)
- Brand primary emphasis: AAA 7:1
- status (success/error/warning/info) on bg.card: AAA 7:1

현 validator/report:
- AA 4.5:1 가 floor 로 적용됨 (AAA 강제 부재)
- girok primary-fg 6.95 등 sub-AAA 값이 통과 (policy 모순)

또 WCAG 2.2 가 2023-10 정식 권고, 2025-09-15 ISO/IEC PAS 9241-161, baseline 으로 갱신 필요. WCAG 3 (APCA) Working Draft 진행 중 (Defer 유지).

**정공법 = AA 4.5:1 baseline (legal floor) + AAA optional slot 분리 + WCAG 2.2 wording 갱신 + APCA future pathway 명시**.

## Scope

### 1. `contrast.md` 정책 갱신

| Tier | 신 요구 | 비고 |
|------|---------|------|
| Body text / meaningful information | AA 4.5:1 (legal) | 동일 |
| Brand primary emphasis | AA 4.5:1 baseline + AAA 7:1 **optional** | 강제 → optional |
| Large text (≥18pt) | AA 3:1 | 동일 |
| UI component / graphical boundary | AA 3:1 | 동일 |
| Decorative | AA 3:1 + override declaration | 동일 |

새 optional slot tier (AAA-strict): brand 가 `implements: [...., "aaa-strict"]` 선언 시 강제

### 2. 새 semantic slot 신설 (AAA-strict 필요 brand 용)

| 신 slot | scope |
|---------|-------|
| `theme.text.primary-strong` | AAA 7:1 강제 (brand 선택) |
| `theme.primary.foreground-strong` | AAA 7:1 강제 |
| `theme.status.success.foreground-strong` | AAA 7:1 강제 |
| ... | 모든 status × foreground 의 strong variant |

brand 가 AAA-strict 필요한 surface 만 `*-strong` 사용, 일반 `*-foreground` 는 AA. naming.md 갱신 (variant 표기 추가).

### 3. Validator 갱신

- `pnpm build` validator 가 group-aware (X2-1 의존) + tier-aware:
  - `aaa-strict` group 또는 `*-strong` slot 만 AAA 7:1 강제
  - 일반 status/primary pair = AA 4.5:1 강제
- contrast-report.json 갱신 (`required: "AA"` 또는 `"AAA-strict"` 명시)

### 4. WCAG wording

- WCAG 2.2 정식 baseline (legal)
- WCAG 3 / APCA: Working Draft, defer until stable (현 wording 유지)

### 5. brand guide 갱신

- `docs/llm/brands/girok.md` 의 contrast snapshot 표 갱신 (AA baseline 명시)
- 다른 brand guide 도 (있다면)

## Acceptance gates

| Gate | 요구 |
|------|------|
| `contrast.md` AA baseline + AAA-strict optional 정책 | ✓ |
| `tokens/semantic/*` 의 strong variant slot 신설 (선택 brand 만 binding) | ✓ |
| Validator group-aware + tier-aware (`pnpm build` 통과) | ✓ |
| `contrast-report.json` 의 `required` 가 정책 정합 | ✓ |
| `naming.md` variant 표기 (`*-strong`) 보강 | ✓ |
| `brands/girok.md` snapshot 갱신 | ✓ |
| `tokens/CHANGELOG.md` 갱신 | ✓ |
| WCAG 2.2 wording 적용, WCAG 3/APCA defer 명시 | ✓ |

## Out-of-scope

- slot group 분리 — X2-1 영역
- naming format migration — X2-2 영역
- 다른 brand 의 AAA-strict 채택 결정 = brand 자체 의사결정 (consumer-update 단계)

## Cross-impact

- X1 G7 BLOCKER (policy vs validator mismatch) → 시정
- girok 의 현 primary-fg 6.95 / destructive-fg 4.51 = AA 통과 (정상)
- 다른 brand 가 AAA 필요하면 `*-strong` slot 채택 + binding

## Validation steps

1. X2-1 완료 확인 (slot group)
2. X2-2 결정 (naming format) 정합
3. `contrast.md` AA baseline + AAA-strict 정책 작성
4. Strong variant slot semantic 추가
5. Validator 코드 갱신 (group-aware + tier-aware)
6. 모든 brand contrast-report 재산출
7. `pnpm build` 통과
8. brands/girok.md + CHANGELOG 갱신
9. 보고
