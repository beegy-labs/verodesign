# Workflow: Doc Sync

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Keep CDD docs in sync with current state after token / theme / build changes.

## Pre-reads (required)

| File |
| ---- |
| `vendor/agentic-dev-protocol/docs/llm/policies/cdd.md` (CDD policy) |
| `vendor/agentic-dev-protocol/docs/llm/policies/token-optimization.md` (format rules) |
| Files affected by recent change |

## Trigger conditions

| Recent change | Files needing update |
| ------------- | -------------------- |
| New token added | `tokens/CHANGELOG.md`, `llm-context/slot-map.md`, `llm-context/snapshot.md` (auto) |
| New theme added | `decisions.md` themes table, `tokens/themes.md`, `tokens/CHANGELOG.md`, AGENTS.md consumer table |
| New slot group activated | `decisions.md`, `tokens/architecture.md`, `tokens/themes.md`, `llm-context/slot-map.md`, `.add/README.md` (if new workflow) |
| Build pipeline change | `build/style-dictionary.md`, `build/outputs.md`, `build/consumer.md` |
| WCAG policy change | `tokens/contrast.md`, `decisions.md` |
| Versioning policy change | `build/versioning.md`, `decisions.md` |
| New external pattern absorbed | `research/pattern-catalog.md`, `tokens/CHANGELOG.md` |

## Steps

| # | Action |
| - | ------ |
| 1 | Identify which docs are affected (use trigger table) |
| 2 | Update content for each — apply token-optimization format rules |
| 3 | Verify cross-references still valid (linked file paths exist) |
| 4 | Update `Last Updated` field on each modified doc |
| 5 | If `decisions.md` changed: bump `Last Updated`, ensure consistency with `.ai/rules.md` |
| 6 | Verify `MEMORY.md` not stale (if applicable) |
| 7 | Run `git diff` to confirm only intended files changed |
| 8 | Commit: `docs(scope): sync after {trigger}` |

## Format rules (token-optimization)

| Rule | Detail |
| ---- | ------ |
| No emoji | None |
| No decorative ASCII | No box-drawing |
| Tables over prose | Default to tables |
| H1 + H2 + H3 only | No H4 / H5 |
| Indent 2 spaces, 2 levels max | No deeper nesting |
| Format priority | Tables > YAML > bullets > code > prose |

## Cross-reference map

| Source of truth | Mirrored in |
| --------------- | ----------- |
| `decisions.md` | All other docs reference this; never contradict |
| `tokens/architecture.md` | `.ai/architecture.md` (summary) |
| `tokens/CHANGELOG.md` | Top-level `CHANGELOG.md` (root, less detailed) |
| `decisions.md` themes table | AGENTS.md consumer integration table |
| `decisions.md` lifecycle | `research/pattern-catalog.md` status enum |

When updating one, check the others for consistency.

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| All affected docs updated | Yes |
| `Last Updated` fields current | Yes |
| Cross-references valid | Yes |
| Token-optimization format applied | Yes |
| `decisions.md` consistency | Yes |

## Common patterns

### After theme add

1. `decisions.md`: Add row to themes table (slug, concept, OKLCH primary)
2. `tokens/themes.md`: Add row to "Themes shipped" table
3. `tokens/CHANGELOG.md`: Add `### Added` entry
4. AGENTS.md (PROJECT CUSTOM block): Update consumer integration if a vero* product adopts it

### After WCAG policy stricter

1. `decisions.md` WCAG section
2. `tokens/contrast.md`
3. `.ai/rules.md` (NEVER/ALWAYS)
4. `build/style-dictionary.md` (validation gate spec)

### After slot group activation

1. `decisions.md` slot groups table
2. `tokens/architecture.md` slot groups table
3. `tokens/themes.md` (file layout)
4. `llm-context/slot-map.md` (add new section)
5. `llm-context/unknown-territory.md` (move from "uncovered" to active)
