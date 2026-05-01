# Workflow: Pattern Promote

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Promote an experimental token to canonical (move from `tokens/experimental/` into appropriate tier).

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/research/pattern-catalog.md` (target pattern entry) |
| `docs/llm/decisions.md` (lifecycle policy) |
| `tokens/experimental/{slug}.json` |

## Inputs

| Field | Required |
| ----- | -------- |
| Pattern slug | Yes |
| Target tier (primitive / semantic) | Yes |
| Target slot group (if semantic) | Yes |

## Promotion gates (all must be true)

| Gate | Required |
| ---- | -------- |
| 2 weeks since intake (minimum) | Yes (per `decisions.md` lifecycle) |
| Cited in 1+ SDD spec for actual feature | Yes |
| WCAG contrast still passes (re-validate against current policy) | Yes |
| Not superseded by other canonical token | Yes |
| Manual approval (user) | Yes |

If any gate fails, promotion blocked.

## Steps

| # | Action |
| - | ------ |
| 1 | Read `tokens/experimental/{slug}.json` and `pattern-catalog.md` entry |
| 2 | Verify all gates above |
| 3 | Determine target tier and file (e.g., `tokens/semantic/{group}.json`) |
| 4 | Determine canonical name (drop `exp.` prefix; rename per `naming.md`) |
| 5 | Move tokens from experimental file to target tier file |
| 6 | Update `$extensions.verobee.status: "canonical"` |
| 7 | Add `$extensions.verobee.promoted_at: "v0.X.Y"` (current version) |
| 8 | If new slot in semantic: update all themes to provide values |
| 9 | Delete `tokens/experimental/{slug}.json` if all tokens promoted |
| 10 | Update `pattern-catalog.md` status: `experimental` → `canonical` |
| 11 | Update `tokens/CHANGELOG.md` (Added section, mention promotion) |
| 12 | Update `llm-context/slot-map.md` if new slot added |
| 13 | Update `llm-context/unknown-territory.md` (remove if domain is now covered) |
| 14 | Run `npm run build` — verify all gates pass |
| 15 | Commit: `feat(tokens): promote pattern {slug} to canonical` |

## Renaming on promotion

Experimental tokens use `exp.` namespace. On promotion, drop the `exp` prefix and integrate into proper tier:

| Experimental | Canonical |
| ------------ | --------- |
| `exp.glassmorphism.surface.bg` | `theme.bg.glass` (in `semantic/core.json`) |
| `exp.code.syntax.keyword` | `code.syntax.keyword` (in `semantic/code.json`, requires code group activation) |
| `exp.particle.glow` | (depends — could be `theme.fx.glow` or rejected) |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| Token now under proper tier file (not experimental) | Yes |
| All themes provide the value (if semantic) | Yes |
| `--vds-*` prefix (no longer `--vds-exp-*`) | Yes |
| WCAG passes | Yes |
| Catalog updated | Yes |
| CHANGELOG entry | Yes |

## Versioning impact

| Promotion type | Bump |
| -------------- | ---- |
| Promotion adding new semantic slot in existing group | minor |
| Promotion adding to new (newly activated) slot group | minor |
| Promotion of primitive only | patch |

## Migration note

If promotion changes the public name (`--vds-exp-*` → `--vds-*`), document in CHANGELOG migration note. External users of experimental tokens get fair warning.

## Failure modes

| Symptom | Action |
| ------- | ------ |
| Insufficient soak | Wait until 2 weeks elapsed |
| No SDD citation | Use experimental more before promoting; do not pre-promote |
| WCAG newly failing | Re-evaluate contrast against current theme palette before promotion |
| Conflicts with canonical | Resolve naming or reject promotion |
