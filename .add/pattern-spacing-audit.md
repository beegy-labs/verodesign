# Workflow: Pattern Spacing Audit

> ADD execution prompt | **Last Updated**: 2026-05-23

## Purpose

Audit pattern CSS for spacing-contract compliance. Output: pass/fail report, violating selectors, remediation notes.

## Inputs

| Field | Required |
| ----- | -------- |
| Pattern family | Yes |
| CSS source path | Yes |
| Consumer wrapper context | Yes |

## Automation

| Item | Path |
| ---- | ---- |
| Audit script | `packages/design/scripts/audit-pattern-spacing.mjs` |
| Audit logic | `packages/design/src/audit/pattern-spacing.mjs` |
| Primary source under audit | `packages/design/src/build/emit-static.mjs` |

## Steps

| # | Action |
| - | ------ |
| 1 | Read `docs/llm/patterns/spacing-contract.md` |
| 2 | Run `pnpm --filter @verobee/design audit:pattern-spacing` |
| 3 | Review failures by selector and declaration |
| 4 | Classify each pattern row as `clean`, `migrating`, or `violating` |
| 5 | Remove `margin` declarations |
| 6 | Move outer spacing to consumer wrapper when pattern root owns page placement |
| 7 | Preserve documented internal-padding exceptions only |
| 8 | Wrap pattern rules in `@scope` |
| 9 | Re-run build and audit |
| 10 | Update `docs/llm/research/pattern-catalog.md` |

## Violation Report Format

```text
[pattern-spacing-audit] FAIL
- pattern: girok-calendar
  selector: .vds-pattern-girok-calendar
  issue: outer padding
  declaration: padding: 0 0 var(--vds-spacing-6)
```

## Remediation Guide

| Symptom | Fix |
| ------- | --- |
| Root-level trailing padding used as section spacing | Move to consumer wrapper |
| Child `margin-top` used as vertical rhythm | Replace with parent `gap` or child `padding` |
| Wrapper selector leaks into pattern internals | Add `@scope` around pattern rules |
| Ambiguous internal inset | Document exception in spacing-contract.md and audit module |

## Acceptance Gates

| Gate | Required |
| ---- | -------- |
| Audit script exits `0` | Yes |
| Pattern CSS contains `0` margin properties | Yes |
| Documented outer-padding violations resolved | Yes |
| Exceptions are named and justified | Yes |
| `@scope` coverage exists for audited girok roots | Yes |
