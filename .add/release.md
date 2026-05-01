# Workflow: Release

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Tag and release a new version of verodesign.

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/build/versioning.md` |
| `docs/llm/tokens/CHANGELOG.md` (current state) |
| `.ai/git-flow.md` |

## Inputs

| Field | Required |
| ----- | -------- |
| Target version (`vX.Y.Z`) | Yes (per SemVer rules) |
| Release notes summary | Yes (1-3 sentences) |

## Steps

| # | Action | Output |
| - | ------ | ------ |
| 1 | Verify on `main` branch, working tree clean | Confirmed |
| 2 | Determine bump type per [`versioning.md`](../docs/llm/build/versioning.md) | Bump determined |
| 3 | Move `[Unreleased]` section to `[X.Y.Z] - YYYY-MM-DD` in `docs/llm/tokens/CHANGELOG.md` | Updated CHANGELOG |
| 4 | Update `version` in `package.json` | Updated package.json |
| 5 | Run `npm run rebuild` (clean + build) | Fresh `dist/` |
| 6 | Run `npm run validate` (all 6 gates) | Validation passes |
| 7 | Verify `dist/data/contrast-report.json` shows zero failures | Confirmed |
| 8 | Stage: `dist/`, `CHANGELOG.md`, `package.json` | Staged |
| 9 | Commit: `chore(release): vX.Y.Z` | Commit |
| 10 | Tag: `git tag vX.Y.Z` | Tag |
| 11 | Push: `git push origin main --tags` | Pushed |
| 12 | GitHub Release: `gh release create vX.Y.Z --notes-from-tag` (or with explicit body) | Release published |
| 13 | (Future) Trigger Renovate / Dependabot for downstream consumers | Notification |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| All build gates pass (DTCG / refs / parity / WCAG / naming / dedup) | Yes |
| `dist/` regenerated and committed | Yes |
| CHANGELOG entry exists for this version | Yes |
| `package.json` version matches tag | Yes |
| Tag is signed (`-s`) — when GPG configured | Encouraged |

## Failure modes

| Symptom | Action |
| ------- | ------ |
| Validation fails | Fix the underlying issue, do NOT release until green |
| Working tree dirty | Stash or commit pending changes first |
| Version conflict (tag exists) | Bump higher; never re-tag |
| Forgot CHANGELOG | Add entry, amend commit BEFORE tag/push |

## Pre-1.0 nuance

Pre-1.0 (current state):
- Breaking changes permitted in minor bumps
- Annotate breaking commits with `BREAKING CHANGE: ...` footer
- Migration notes inline in CHANGELOG section, not separate file

## Post-1.0 nuance

Post-1.0:
- Breaking changes require major bump
- Migration guide required in `docs/llm/migration/vN-to-vN+1.md`
- Linked from CHANGELOG entry

## Example

```bash
# Releasing v0.2.0 — minor with new theme
git checkout main
git pull

# CHANGELOG: move [Unreleased] → [0.2.0] - 2026-05-15
# package.json: 0.1.5 → 0.2.0

npm run rebuild
npm run validate

git add dist/ docs/llm/tokens/CHANGELOG.md package.json
git commit -m "chore(release): v0.2.0"
git tag v0.2.0
git push origin main --tags

gh release create v0.2.0 \
  --title "v0.2.0 — Coral Bloom theme + new neutral status" \
  --notes "$(awk '/^## \[0.2.0\]/,/^## \[/{if(!/^## \[/||/^## \[0.2.0\]/)print}' docs/llm/tokens/CHANGELOG.md)"
```
