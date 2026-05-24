# Workflow: Component Deprecate

> ADD execution prompt | Last Updated: 2026-05-21

## Purpose

컴포넌트 API 또는 컴포넌트 자체의 제거를 안전하게 준비하기 위한 표준 워크플로우. breaking change 는 즉시 삭제가 아니라 deprecation notice, codemod, 유예기간, removal SDD 를 거친다.

## Pre-reads (mandatory)

| File |
| ---- |
| `docs/llm/decisions.md` |
| `docs/llm/components/README.md` |
| `docs/llm/components/{slug}.md` |
| `PUBLIC_API.md` |
| `./codex-delegate.md` |

## Trigger conditions

| Trigger | Requires workflow |
| ------- | ----------------- |
| prop 제거 | Yes |
| slot 제거 | Yes |
| role / APG semantics 변경 | Yes |
| component rename / replacement | Yes |
| full component retirement | Yes |

## Steps

| # | Action |
| - | ------ |
| 1 | Verify deprecation target and replacement path |
| 2 | Add deprecation notice in package CHANGELOG and component canonical doc status |
| 3 | Mark replacement / migration path in docs |
| 4 | Write codemod in `@verobee/codemods` for supported migration |
| 5 | Confirm deprecation window is at least 6 months per `decisions.md` |
| 6 | Keep deprecated API working during window with warning/docs coverage |
| 7 | After window, author removal SDD and execute actual deletion there |

## Acceptance gates

| Stage | Gate |
| ----- | ---- |
| Deprecate | CHANGELOG notice added |
| Deprecate | `docs/llm/components/{slug}.md` status updated |
| Deprecate | codemod added in `@verobee/codemods` |
| Deprecate | removal target date is >= 6 months out |
| Remove | separate removal SDD exists |
| Remove | build/tests/docs pass after removal |

## Failure modes

| Symptom | Action |
| ------- | ------ |
| Replacement path unclear | Block deprecation until replacement is defined |
| Codemod infeasible | Escalate before removal; breaking changes require migration support |
| Consumer usage still high near removal date | Extend window or stage extra compatibility release |
| Change is additive only | Redirect to `component-modify.md` |

## Versioning impact

| Change | Bump |
| ------ | ---- |
| deprecation notice + codemod | minor |
| actual removal after window | major |
