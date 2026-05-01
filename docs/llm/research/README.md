# Research Domain

> CDD Layer 2 — Pattern discovery and absorption | **Last Updated**: 2026-04-30

## Purpose

Continuously detect design patterns that **post-date the LLM training cutoff** or are otherwise unknown to the agent, evaluate their fit, and absorb them into verodesign through a controlled lifecycle.

## Reading Order

| # | File | Purpose |
| - | ---- | ------- |
| 1 | `llm-knowledge-gaps.md` | What the LLM likely does NOT know (training-cutoff awareness) |
| 2 | `discovery-sources.md` | Where to look for new patterns (concrete URLs) |
| 3 | `pattern-catalog.md` | Patterns we have discovered, with status |
| 4 | `trend-snapshot.md` | Quarterly snapshot of design trends |

## Lifecycle

```
discovery (research workflow)
    │
    ▼
intake → tokens/experimental/{name}.json (status: experimental)
    │
    ▼  (4-week soak OR 2 consumer apps using it)
promote → tokens/{primitive|semantic|brand}/ (status: canonical)
    │
    ▼  (3 months unused)
deprecate → removed in next major
```

## Workflows

| Action | Workflow |
| ------ | -------- |
| Search latest trends | `.add/pattern-research.md` |
| Ingest external reference | `.add/pattern-intake.md` |
| Promote experimental → canonical | `.add/pattern-promote.md` |
| Remove unused experimental | `.add/pattern-deprecate.md` |

## Key Property

The system MUST be designed assuming the LLM agent has incomplete knowledge. Every workflow includes a research step that surfaces external authorities (web search, source URLs) instead of relying on agent memory.
