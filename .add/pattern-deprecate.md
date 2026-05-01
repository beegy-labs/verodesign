# Workflow: Pattern Deprecate

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Remove unused or superseded experimental tokens from `tokens/experimental/`.

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/research/pattern-catalog.md` |
| `tokens/experimental/{slug}.json` |
| `docs/llm/decisions.md` (lifecycle policy) |

## Trigger conditions

| Trigger | Auto / Manual |
| ------- | ------------- |
| 90 days zero usage in any consumer / spec | Auto-flag (manual confirmation) |
| Replaced by canonical equivalent | Manual |
| Pattern rejected after intake | Manual |
| Source URL no longer authoritative | Manual |

## Steps

| # | Action |
| - | ------ |
| 1 | Verify trigger condition (audit `git grep` for token usage across veronex, verobase, .specs/) |
| 2 | If 90-day rule: confirm zero usage in consumer git history past 90 days |
| 3 | Update `tokens/experimental/{slug}.json` `$extensions.verobee.status: "deprecated"` |
| 4 | Add `$extensions.verobee.deprecated: { since, replacement, remove_in }` |
| 5 | Build emits warning for any remaining usage |
| 6 | Update `pattern-catalog.md`: status `experimental` → `deprecated` |
| 7 | Wait one minor release cycle |
| 8 | If still zero usage: delete `tokens/experimental/{slug}.json` |
| 9 | Update `pattern-catalog.md` final status: `removed` |
| 10 | Update `tokens/CHANGELOG.md` (Removed section) |
| 11 | Commit: `chore(experimental): deprecate / remove pattern {slug}` |

## Acceptance gates

| Stage | Gate |
| ----- | ---- |
| Deprecate | `$extensions.verobee.deprecated` populated |
| Deprecate | Pattern catalog status updated |
| Remove | Zero references in any consumer / spec |
| Remove | One minor release passed since deprecation |
| Remove | CHANGELOG Removed entry |

## Versioning impact

| Action | Bump |
| ------ | ---- |
| Deprecate experimental | patch |
| Remove deprecated experimental | patch (no canonical impact since experimental was opt-in) |

## Auto-flag implementation

Build script emits warning per release for experimental tokens with no usage in git history past 90 days:

```
[experimental-stale] exp.glassmorphism.surface.bg: 95 days since last reference. Consider deprecation.
```

User reviews monthly and runs this workflow.

## Failure modes

| Symptom | Action |
| ------- | ------ |
| Token actually used but not detected | Improve usage scanner; add SDD spec citing it |
| Token superseded but consumer still uses experimental name | Update consumer first; then deprecate |
| Token referenced in `pattern-catalog.md` only | Acceptable; catalog reference doesn't count as usage |
