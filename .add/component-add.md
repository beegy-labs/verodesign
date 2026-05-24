# Workflow: Component Add

> ADD execution prompt | Last Updated: 2026-05-21

## Purpose

신설 컴포넌트 (Lit element + React adapter + a11y test + CEM) 를 verodesign 에 추가하는 표준 워크플로우.

## Pre-reads (mandatory)

| File |
| ---- |
| `docs/llm/decisions.md` |
| `docs/llm/tokens/naming.md` |
| `docs/llm/research/llm-knowledge-gaps.md` |
| `docs/llm/components/README.md` |
| `./skills/brand-isolation.md` |
| `./skills/token-ssot.md` |
| `./pattern-intake.md` |
| `./codex-delegate.md` |

Focus:
- `decisions.md`: Lit 3 + FACE + `@lit/react` + WAI-ARIA APG 1.2
- `docs/llm/components/README.md`: Capability Matrix + canonical component page contract
- `brand-isolation.md`: 검출 1-4
- `token-ssot.md`: 검출 1-3

## Self-check

```
[knowledge-gap-check] Read docs/llm/research/llm-knowledge-gaps.md.
Component domain: <component slug / UI pattern>.
External authority needed: maybe — use current APG / platform authority when pattern or FACE support is unclear.
```

## Inputs

| Field | Required |
| ----- | -------- |
| Component slug (kebab-case) | Yes |
| Intended usage (어떤 UI pattern) | Yes |
| APG pattern (Radio Group / Tabs / Dialog 등) | Yes |
| Form-association (FACE) 필요 여부 | Yes |
| Tokens consumed (semantic only — no brand prefix) | Yes |
| Slot composition (children / leading / trailing / etc.) | Yes |

## Steps

| # | Action |
| - | ------ |
| 1 | Output self-check |
| 2 | Author SDD scope: `.specs/verodesign/{date}-component-{slug}/spec.md` |
| 3 | Confirm slot group 정합 — 사용 토큰이 `core` 또는 implements 한 group 안인지 |
| 4 | Run `brand-isolation.md` 검출 1-4 — 결과 0 이어야 함 |
| 5 | Run `token-ssot.md` 검출 1-3 — 결과 0 이어야 함 |
| 6 | Write Lit element: `packages/design-elements/src/components/{slug}/vds-{slug}.ts` |
| 7 | Add component entrypoint/export: `packages/design-elements/src/components/{slug}/index.ts`, `define.ts`, root exports |
| 8 | Write React adapter: `packages/design-react/src/components/{Name}.tsx` via `@lit/react` |
| 9 | Confirm CEM auto-gen registration in `packages/design-elements/dist/custom-elements.json` via existing analyzer/pipeline |
| 10 | Add a11y test with Web Test Runner + `@open-wc/testing` — APG pattern keyboard/role 검증 |
| 11 | Add CHANGELOG entry for touched package(s) |
| 12 | Run doc-sync target for component canonical docs — `docs/llm/components/{slug}.md` prose page 신설 |
| 13 | Run `pnpm build` and relevant tests |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| Lit element + React adapter 신설 | Yes |
| CEM 등록 (`dist/custom-elements.json`) | Yes |
| a11y test (APG 패턴 검증) | Yes |
| `brand-isolation` 검출 1-4 = 0 | Yes |
| `token-ssot` 검출 1-3 = 0 | Yes |
| `pnpm build` 통과 | Yes |
| CHANGELOG entry | Yes |
| `docs/llm/components/{slug}.md` prose 신설 | Yes |

## Failure modes

| Symptom | Action |
| ------- | ------ |
| a11y 패턴 모호 | Escalate to SDD scope for APG 선택 |
| 기존 컴포넌트 prop 확장으로 해결 가능 | Redirect to `component-modify.md` |
| canonical token 부재 (brand-specific 시각 필요) | `exp.brand.*` 또는 slot group 신설 SDD 선행 |
| slot group 불일치 | X2-1 slot-group scope 선행 |

## Versioning impact

| Change | Bump |
| ------ | ---- |
| 새 컴포넌트 추가 | minor |
| 새 slot group 활성화 필요 | minor |
