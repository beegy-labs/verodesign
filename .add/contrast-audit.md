# Workflow: Contrast Audit

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Re-validate WCAG contrast for all themes and modes. Used standalone (not part of a regular build) to verify policy compliance after standard changes or as periodic audit.

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/tokens/contrast.md` |
| `docs/llm/decisions.md` (WCAG section) |

## Trigger conditions

| Trigger | Cadence |
| ------- | ------- |
| WCAG policy stricter | Once per change |
| New theme added | Part of theme-add workflow |
| Random audit | Quarterly |
| Pre-release | Required before `vX.Y.0` minor / major |
| Browser default rendering changes | Verify quarterly |

## Steps

| # | Action |
| - | ------ |
| 1 | Run `npm run validate` (calls `scripts/validate-contrast.mjs`) |
| 2 | Read `dist/data/contrast-report.json` |
| 3 | Identify any pairs failing required ratio |
| 4 | For each failure: classify root cause |
| 5 | Apply fix (theme value adjustment OR add `$extensions.verobee.contrast.allow` for justified decoratives) |
| 6 | Re-run audit |
| 7 | Commit: `fix(tokens): contrast audit {theme}` (if changes made) |

## Failure classifications

| Cause | Fix |
| ----- | --- |
| Theme palette too light/dark for AAA | Adjust OKLCH L of primary |
| Background too similar to text | Increase contrast in light/dark variants |
| Decorative token genuinely needs lower contrast | Add `$extensions.verobee.contrast.allow: "AA-large"` + rationale |
| Required pair test missing | Update `scripts/validate-contrast.mjs` pair list |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| All AAA pairs ≥ 7:1 | Yes |
| All AA-required pairs ≥ 4.5:1 | Yes |
| All UI/large pairs ≥ 3:1 | Yes |
| Decoratives explicit `allow` if below 4.5:1 | Yes |
| `dist/data/contrast-report.json` updated | Yes |

## Output report format

```json
{
  "veronex": {
    "light": {
      "theme.text.primary on theme.bg.page": {
        "ratio": 14.4,
        "required": "AAA 7:1",
        "pass": true
      },
      "theme.text.faint on theme.bg.card": {
        "ratio": 3.8,
        "required": "AA 4.5:1",
        "pass": false,
        "allow": null
      }
    },
    "dark": { ... }
  },
  "summary": {
    "total_pairs": 26,
    "passed": 24,
    "failed": 2,
    "allowed_overrides": 1
  }
}
```

## Audit log retention

`dist/data/contrast-report.json` is committed to git. Each release tag contains the snapshot at that release time. History preserved for compliance / accessibility audit.

## Standards reference

| Standard | Document |
| -------- | -------- |
| WCAG 2.1 | https://www.w3.org/TR/WCAG21/ |
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ |
| Color contrast tool reference | https://webaim.org/articles/contrast/ |
