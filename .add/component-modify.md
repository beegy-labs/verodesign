# Workflow: Component Modify

> ADD execution prompt | Last Updated: 2026-05-21

## Purpose

기존 컴포넌트의 additive 변경 (prop/variant/state/slot/a11y enhancement) 을 verodesign 계약 안에서 수행하는 표준 워크플로우.

## Pre-reads (mandatory)

| File |
| ---- |
| `docs/llm/decisions.md` |
| `docs/llm/tokens/naming.md` |
| `docs/llm/research/llm-knowledge-gaps.md` |
| `docs/llm/components/README.md` |
| `docs/llm/components/{slug}.md` |
| `./skills/brand-isolation.md` |
| `./skills/token-ssot.md` |
| `./component-add.md` |
| `./codex-delegate.md` |

## Trigger conditions

| Trigger | Allowed here |
| ------- | ------------ |
| prop 추가 (additive) | Yes |
| variant 확장 | Yes |
| state 추가 (hover/focus/active/disabled/loading) | Yes |
| slot 추가 | Yes |
| a11y enhancement | Yes |
| prop 제거 / slot 제거 / role 변경 | No — use `component-deprecate.md` first |

## Self-check

```
[knowledge-gap-check] Read docs/llm/research/llm-knowledge-gaps.md.
Component target: <slug>.
Contract type: additive change only.
External authority needed: maybe — verify APG/platform behavior when semantics or keyboard behavior expands.
```

## Inputs

| Field | Required |
| ----- | -------- |
| Component slug | Yes |
| Change type (prop / variant / state / slot / a11y) | Yes |
| Consumer impact summary | Yes |
| APG impact | Yes |
| Tokens consumed (semantic only) | Yes |
| Breaking 여부 | Yes |

## Steps

| # | Action |
| - | ------ |
| 1 | Output self-check |
| 2 | Author SDD scope for additive change |
| 3 | If breaking signal exists (prop remove, slot remove, role change), stop and redirect to `component-deprecate.md` |
| 4 | Review existing component doc + source + current adapter contract |
| 5 | Run impact analysis on consumers / exports / docs |
| 6 | Run `brand-isolation.md` 검출 1-4 |
| 7 | Run `token-ssot.md` 검출 1-3 |
| 8 | Update Lit element and matching exports |
| 9 | Update React adapter and types |
| 10 | Regenerate / confirm CEM output |
| 11 | Extend a11y tests for new variant/state/slot behavior |
| 12 | Update CHANGELOG entry and component canonical docs |
| 13 | Run `pnpm build` and relevant tests |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| Additive contract only (no silent breaking change) | Yes |
| Lit + React adapter parity 유지 | Yes |
| CEM updated | Yes |
| a11y tests updated | Yes |
| `brand-isolation` 검출 1-4 = 0 | Yes |
| `token-ssot` 검출 1-3 = 0 | Yes |
| `pnpm build` 통과 | Yes |
| CHANGELOG + component docs updated | Yes |

## Failure modes

| Symptom | Action |
| ------- | ------ |
| prop/slot 제거 필요 | Start deprecation path via `component-deprecate.md` |
| role/APG pattern 자체가 바뀜 | Escalate to SDD scope decision before implementation |
| theme/brand token 직접 참조 필요 | Block and resolve via canonical token or `exp.brand.*` path |
| consumer 영향이 additive 범위를 넘음 | Split into deprecate + removal SDD |

## Versioning impact

| Change | Bump |
| ------ | ---- |
| additive prop / variant / state / slot / a11y enhancement | minor |
| docs / tests only with no runtime API change | patch |
