# Phase X2 Master Plan — verodesign v1 정공법 시정

> Authored: 2026-05-21 | 6 SDD 통합 plan
> Inputs: X1 BLOCKER 12 + X1-A P1 4 + 사용자 정공법 결정 (slot group 세분화 / AA baseline + AAA optional / CEM-backed docs / component workflow 신설 / DTCG naming source migration / brand registry v2 별 roadmap)

## SDD Index

| # | SDD | 폴더 | scope | depends |
|---|-----|------|-------|---------|
| X2-1 | Slot group reorganization | `.specs/verodesign/2026-05-21-slot-group-reorganization/spec.md` | core / status / finance / web group 재구조 + group-aware validator | none |
| X2-2 | DTCG naming source migration | `.specs/verodesign/2026-05-21-dtcg-naming-migration/spec.md` | `theme.success` → `theme.status.success.foreground` 등 source 마이그레이션 + `@verobee/codemods` 신설 | X2-1 |
| X2-3 | Contrast policy v2 | `.specs/verodesign/2026-05-21-contrast-policy-v2/spec.md` | AA 4.5:1 baseline + AAA-strict optional + WCAG 2.2 wording + APCA pathway | X2-1 |
| X2-4 | Component workflow 신설 | `.specs/verodesign/2026-05-21-component-workflow/spec.md` | `.add/component-{add,modify,deprecate}.md` + codex-delegate Matrix 갱신 | none (병렬) |
| X2-5 | CEM-backed canonical docs | `.specs/verodesign/2026-05-21-cem-backed-docs/spec.md` | components/*.md prose-only + CEM auto-gen API table + Storybook 9 MDX (optional) | X2-4 |
| X2-6 | Experimental token isolation | `.specs/verodesign/2026-05-21-experimental-isolation-fix/spec.md` | Phase B 의 `exp.girok.finance.*` canonical theme 안 → experimental 안으로 분리 | X2-1, X2-2 |

## 의존 그래프

```
X2-1 (slot group) ──┬──> X2-2 (naming migration) ──> X2-6 (exp isolation)
                    └──> X2-3 (contrast policy)
X2-4 (workflow) ─────────> X2-5 (CEM docs)
```

## Cross-impact

| X1 / X1-A drift | 해소 SDD |
|---|---|
| G1 BLOCKER — Component docs 누락 | X2-5 |
| G2 BLOCKER — Theme semantic parity 붕괴 | X2-1 (group-aware parity) |
| G6 BLOCKER — Naming schema drift | X2-2 |
| G6 BLOCKER — Experimental in canonical theme | X2-6 |
| G7 BLOCKER — Contrast policy vs validator mismatch | X2-3 |
| G8 BLOCKER — 7 theme status slot 누락 | X2-1 (implements 안 함 = 정상) |
| G10 INFO — .add component workflow gap | X2-4 |
| X1-A P1 — Component docs canon outdated | X2-5 |
| X1-A P1 — SSR maturity wording | X2-3 (contrast.md 옆 SSR 정책 갱신) |
| X1-A P1 — WCAG 2.2 baseline | X2-3 |
| X1-A P1 — Component workflow 부재 | X2-4 |
| X1-A P2 — `light-dark()` adoption | X2-3 (post-X2-3 별 작업 가능) |
| X1-A P2 — Style Dictionary v4/v5 호환성 | 별 작업 (post-v1) |
| X1-A P3 — brand guide stale | X2-1 + X2-2 + X2-3 자동 갱신 영역 |

## 진행 순서 (사용자 선택: 일괄 X3)

X3 phase 에서 다음 순서로 Codex 위임:

1. **X3 Round 1 (병렬)**: X2-1 (slot group) + X2-4 (component workflow)
2. **X3 Round 2 (병렬)**: X2-2 (naming migration) + X2-3 (contrast policy v2) — Round 1 완료 후
3. **X3 Round 3 (병렬)**: X2-5 (CEM docs) + X2-6 (experimental isolation) — Round 1+2 완료 후

각 Round 마다 Codex 위임 → Layer-3 audit (별 세션 read-only) → PASS 확인 후 다음 Round.

## Breaking changes

- X2-2 (naming migration) = major semver bump (v1 → v2)
- X2-3 (contrast policy 약화 + AAA-strict slot 신설) = minor semver
- X2-1 (slot group 재구조) = major semver (theme.success 사라짐)
- X2-5 (docs canon 변경) = doc 변경, semver 무관
- X2-4 (workflow 신설) = .add 변경, semver 무관
- X2-6 (experimental file split) = experimental 영역, semver patch

→ 통합 semver bump = **major (v1 → v2)**.

## Codemod scope

`@verobee/codemods` 패키지 (X2-2 에서 신설):
- naming transform (X2-2)
- experimental file restructure transform (X2-6)
- slot group implements 명시 transform (X2-1) — theme 파일 갱신

CLI: `npx @verobee/codemods migrate-v1-to-v2`

## Consumer impact

| consumer | 영향 | 마이그레이션 |
|---|---|---|
| app-girok | CSS variable rename + 일부 토큰 rename | codemod 적용 |
| verobase / veronex / dreamstock | 동일 | codemod 적용 |
| 모든 brand theme | implements 명시 + slot 분리 반영 | 자동 (X2-1 SDD 본문) |

## v2.0 roadmap (별 phase, X2-7 영역)

- Brand manifest JSON + registry (Material 3 dynamic color style)
- brand 1000+ 확장성
- 본 X2 phase 와 분리

## Acceptance (Phase X2 종료)

- 6 SDD 본문 완성 (이번 phase = outline 완료, X3 에서 본문 보강 + 실행)
- 사용자 review + 동의
- Phase X3 진입 가능
