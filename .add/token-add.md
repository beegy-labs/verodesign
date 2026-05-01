# Workflow: Add Token

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Add a new token (primitive or semantic) to verodesign.

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/decisions.md` |
| `docs/llm/tokens/architecture.md` |
| `docs/llm/tokens/naming.md` |
| `docs/llm/tokens/contrast.md` |
| `docs/llm/llm-context/unknown-territory.md` |

## Inputs

| Field | Required |
| ----- | -------- |
| Token tier | Yes (primitive or semantic) |
| Slot group (if semantic) | Yes (core, web, ...) |
| Token name (DTCG dot-path) | Yes |
| `$value` (OKLCH for primitive, `{ref}` for semantic) | Yes |
| `$type` | Yes (color, dimension, ...) |
| `$description` | Recommended |
| Reason for addition | Yes (rationale for SDD spec) |

## Steps

| # | Action | Output |
| - | ------ | ------ |
| 1 | Verify name follows `naming.md` rules (lowercase, dot-separated, purpose not appearance) | Approved name |
| 2 | If semantic: verify same slot doesn't already exist | No duplicate |
| 3 | If semantic: identify which slot group; verify all themes need to add the slot | Updated parity expectation |
| 4 | If semantic: write SDD spec under `.specs/verodesign/{date}-{slug}/spec.md` | Spec file |
| 5 | Add token to appropriate JSON file | Updated tokens/ file |
| 6 | If semantic: update all themes (`themes/*.json`) to provide values for the new slot | Updated theme files |
| 7 | Run `npm run build` | All gates pass or specific failures |
| 8 | If contrast fails: adjust theme values until passing | Build passes |
| 9 | Update `docs/llm/tokens/CHANGELOG.md` (Unreleased section) | CHANGELOG row |
| 10 | Commit: `feat(tokens): add {token-name}` | Git commit |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| DTCG schema valid | Yes |
| References resolve | Yes (no dangling) |
| Slot parity (if semantic) | Yes |
| WCAG contrast | Yes |
| Token name pattern | Yes |
| CHANGELOG updated | Yes |

## Failure modes

| Symptom | Action |
| ------- | ------ |
| Name pattern violation | Re-read `naming.md`, propose new name |
| Slot duplicate | Reuse existing slot or use different domain |
| WCAG fail in some theme | Adjust theme palette OR file `$extensions.verobee.contrast.allow` for decorative tokens |
| Slot parity fail | Add slot to all themes that implement the affected group |
| Reference cycle | Restructure reference chain |

## Example

Adding `theme.status.neutral`:

```bash
# Step 4: SDD spec
mkdir -p .specs/verodesign/2026-04-30-status-neutral
cat > .specs/verodesign/2026-04-30-status-neutral/spec.md <<EOF
# Add theme.status.neutral

## Why
Pending / draft state currently has no semantic token.

## Scope
- Add slot to semantic/core.json
- Add value to all themes (default, veronex, verobase)
EOF

# Step 5: Update semantic
# Edit tokens/semantic/core.json — add status.neutral

# Step 6: Update themes
# Edit tokens/themes/{default,veronex,verobase}-{light,dark}.json

# Step 7
npm run build
# Step 9
# Update docs/llm/tokens/CHANGELOG.md

# Step 10
git commit -m "feat(tokens): add theme.status.neutral for pending state"
```

## Versioning impact

| Tier of addition | Bump |
| ---------------- | ---- |
| New primitive | patch |
| New semantic slot in existing group | patch (no consumer break) |
| First slot of a new slot group | minor |
