# Workflow: Pattern Research

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Search 2026 design system patterns and update verodesign's awareness. Output: enriched `pattern-catalog.md` and `trend-snapshot.md`.

## Pre-reads (mandatory)

| File | Why |
| ---- | --- |
| `docs/llm/research/llm-knowledge-gaps.md` | LLM training may be stale; web search required |
| `docs/llm/research/discovery-sources.md` | Authoritative source list |
| `docs/llm/research/pattern-catalog.md` | What's already known |
| `docs/llm/research/trend-snapshot.md` | Last quarter snapshot |

## Self-check (mandatory output)

Agent MUST output at workflow start:

```
[knowledge-gap-check] Read llm-knowledge-gaps.md.
Topics in scope: <list>.
Web search required: yes.
Most recent training cutoff acknowledged: <month> <year>.
```

## Inputs

| Field | Required |
| ----- | -------- |
| Research focus area (e.g., "color tokens", "AI chat UI") | Yes |
| Time horizon (e.g., "since last snapshot") | Yes |
| Priority sources (Tier 1/2/3 from discovery-sources.md) | Recommended |

## Steps

| # | Action |
| - | ------ |
| 1 | Read pre-reads. Output self-check block. |
| 2 | Web search using query templates from `discovery-sources.md` |
| 3 | For each new pattern found: capture (name, source URL, status, notes) |
| 4 | Compare against `pattern-catalog.md` — skip if already known |
| 5 | For each new pattern: classify (researched / candidate for experimental) |
| 6 | Append rows to `pattern-catalog.md` under appropriate section |
| 7 | If quarter changed: append new snapshot to `trend-snapshot.md` (do not edit prior snapshots) |
| 8 | Commit: `docs(research): pattern research {YYYY-Qx}` |

## Search query templates

| Pattern | Template |
| ------- | -------- |
| Year + topic | `2026 design tokens {topic}` |
| Spec status | `W3C DTCG stable {feature}` |
| Tier 1 + topic | `Vercel Geist {topic}` |
| Comparison | `oklch vs hsl token authoring 2026` |
| Site filter | `site:adobe.com spectrum {topic}` |

## Anti-sources

Do NOT base decisions on:
- Blog posts older than 2 years
- StackOverflow answers older than 3 years
- LLM-generated articles without citations
- Influencer "tier list" videos

## Output

| Artifact | Update |
| -------- | ------ |
| `pattern-catalog.md` | New rows |
| `trend-snapshot.md` | New section (if quarter changed) |
| Optionally: `llm-knowledge-gaps.md` | If new topic identified outside training |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| Self-check block present | Yes |
| At least one Tier 1 source consulted | Yes (per scope) |
| All new entries have source URL | Yes |
| Format follows token-optimization | Yes |

## Quarterly snapshot template

```markdown
## YYYY Q{n} (date)

### Color & Tokens
| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| ... | emerging/mainstream/standard | YES/Evaluate/Defer/NO | ≤80 chars |

### Components
...

### CSS Capabilities
...

### Accessibility
...

### Tooling
...
```
