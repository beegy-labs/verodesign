# Workflow: Pattern Intake

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Ingest an external design pattern (URL, screenshot, spec) into verodesign's experimental zone. Output: `tokens/experimental/{name}.json` + SDD spec.

## Pre-reads (mandatory)

| File |
| ---- |
| `docs/llm/research/llm-knowledge-gaps.md` |
| `docs/llm/research/pattern-catalog.md` |
| `docs/llm/tokens/architecture.md` |
| `docs/llm/tokens/naming.md` |
| `docs/llm/tokens/contrast.md` |
| `docs/llm/llm-context/unknown-territory.md` |

## Self-check

```
[knowledge-gap-check] Read llm-knowledge-gaps.md.
Pattern domain: <e.g., glassmorphism / AI chat UI / code editor>.
External authority needed: yes — fetching source.
```

## Inputs

| Field | Required |
| ----- | -------- |
| Pattern slug (kebab-case) | Yes |
| Source (URL, screenshot path, written spec) | Yes |
| Intended slot group | Yes (existing or "request new group") |
| Intended use (which UI element) | Yes |

## Steps

| # | Action |
| - | ------ |
| 1 | Output self-check |
| 2 | If URL: fetch source (WebFetch) and analyze |
| 3 | Extract design values (colors via eyedropper, spacings, radii, shadows) |
| 4 | For each color: convert to OKLCH (use culori or online tool) |
| 5 | Map each value to existing primitive (closest L step, hue) OR identify need for new primitive |
| 6 | Identify slot group: existing OR mark as "needs new group" (out of scope without escalation) |
| 7 | Run WCAG contrast on all foreground/background pairs the pattern uses |
| 8 | If contrast fails: adjust derived OKLCH values until pass OR mark as `AA-large` decoratives |
| 9 | Write `tokens/experimental/{slug}.json` (DTCG format with `$extensions.verobee.status: "experimental"` + `source`) |
| 10 | Write SDD spec: `.specs/verodesign/{date}-pattern-{slug}/spec.md` |
| 11 | Run `npm run build` — experimental tokens emit with `--vds-exp-*` prefix |
| 12 | Append entry to `docs/llm/research/pattern-catalog.md` (status: experimental) |
| 13 | Commit: `feat(experimental): intake pattern {slug}` |

## Token file structure

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "$extensions": {
    "verobee": {
      "status": "experimental",
      "since": "v0.X.Y",
      "source": "https://example.com/pattern-page",
      "implements": ["{slot-group}"]
    }
  },
  "exp": {
    "{pattern-domain}": {
      "{slot-name}": {
        "$value": "...",
        "$type": "color",
        "$description": "..."
      }
    }
  }
}
```

Note prefix `exp.*` keeps experimental tokens namespaced even within DTCG dot path. Output as `--vds-exp-*` CSS variable.

## SDD spec template

```markdown
# Pattern Intake: {slug}

## Source
{URL or screenshot reference}

## Why
{Rationale for considering this pattern}

## Tokens added
- `exp.{domain}.{slot}` ($value: ...)
- ...

## Slot group
{existing or proposed new}

## Contrast results
| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| ...  | ...   | ...      | ...  |

## Promotion criteria (when to promote to canonical)
- Used in 1+ SDD spec for actual feature
- 2-week soak passes
- Re-validation against current WCAG policy
- Manual approval

## Removal criteria (if rejected)
- 90 days zero usage → auto-flag
- Pattern superseded by canonical equivalent
```

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| `tokens/experimental/{slug}.json` exists with proper extension fields | Yes |
| `source` URL recorded | Yes |
| WCAG contrast pass (or explicit override) | Yes |
| SDD spec exists | Yes |
| Catalog entry added | Yes |
| `--vds-exp-*` prefix in output | Yes |
| No canonical token modified | Yes |

## Failure modes

| Symptom | Action |
| ------- | ------ |
| Pattern requires new slot group | File a separate SDD spec for new slot group; intake blocked until group activated |
| Contrast fails fundamentally | Reject pattern OR introduce only as decorative `AA-large` |
| Pattern conflicts with existing canonical | Reject — patterns must extend, not override |
| Source not authoritative | Find Tier 1/2/3 alternative or reject |

## Promotion path

After intake, pattern lives in experimental for soak period. Promotion: [`.add/pattern-promote.md`](./pattern-promote.md).

## Rejection path

Some patterns will be researched but never absorbed (off-brand, technically unsound, etc.). Document in `pattern-catalog.md` with status `rejected` + rationale.
