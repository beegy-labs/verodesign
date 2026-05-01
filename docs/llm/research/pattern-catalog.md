# Pattern Catalog

> CDD Layer 2 — Discovered patterns and their lifecycle status | **Last Updated**: 2026-04-30

## Status Definitions

| Status | Meaning | DTCG `$extensions.verobee.status` |
| ------ | ------- | --------------------------------- |
| researched | Identified, not yet ingested | (no token files) |
| experimental | DTCG file present in `tokens/experimental/`, build-isolated | `experimental` |
| candidate | Proposed for promotion, soak period started | `candidate` |
| canonical | In `tokens/{primitive,semantic,brand}/`, fully integrated | `canonical` |
| deprecated | Marked for removal in next major | `deprecated` |
| rejected | Considered, declined; documented for future awareness | (no token files) |

## Catalog (initial — empty)

| Pattern | Status | Source | First seen | Notes |
| ------- | ------ | ------ | ---------- | ----- |
| _none yet_ | | | | |

## Entry Template

When adding a pattern via `.add/pattern-intake.md`, append a row using this template:

```markdown
| {pattern-slug} | experimental | {source-url} | {YYYY-MM-DD} | {one-line note} |
```

## Required Fields per Entry

| Field | Format | Example |
| ----- | ------ | ------- |
| Pattern slug | `kebab-case` | `glassmorphism-card` |
| Status | enum from above | `experimental` |
| Source | URL or doc reference | `https://linear.app/blog/...` |
| First seen | `YYYY-MM-DD` | `2026-04-30` |
| Notes | <80 chars | `frosted bg with backdrop-filter` |

## Promotion Criteria

| From | To | Required gates |
| ---- | -- | -------------- |
| researched | experimental | `pattern-intake` workflow completed; DTCG file written |
| experimental | candidate | 4-week soak passed; cited in ≥1 SDD spec |
| candidate | canonical | 2 consumer apps using it without issue OR 8-week soak |
| canonical | deprecated | No consumer reference for 3 months OR explicit replacement |

## Deprecation Criteria

| Trigger | Action |
| ------- | ------ |
| `usageCount === 0` for 90 days | Auto-flag; `.add/pattern-deprecate.md` workflow |
| Token replaced by canonical equivalent | Manual flag with replacement reference |
| Brand removed | Cascade deprecate brand-specific tokens |

## Audit Frequency

| Action | Cadence |
| ------ | ------- |
| Re-scan trends | Quarterly |
| Validate experimental sources still live | Quarterly |
| Promotion review | Monthly |
| Deprecation sweep | Monthly |
