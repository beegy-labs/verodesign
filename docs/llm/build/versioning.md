# Versioning Policy

> CDD Layer 2 — SemVer rules for verodesign | **Last Updated**: 2026-04-30

Standard: [SemVer 2.0.0](https://semver.org/spec/v2.0.0.html). Pre-1.0 conventions noted below.

## Version path

| Stage | Version | Trigger |
| ----- | ------- | ------- |
| Scaffold | `v0.0.1` | First commit (CDD only, no build) |
| Iteration | `v0.0.x` | Pre-build commits |
| First build | `v0.1.0` | All 6 build gates pass |
| Iteration | `v0.x.y` | Feature additions |
| Beta | `v0.9.0` | Feature-stable, public consumer testing |
| Release candidate | `v1.0.0-rc.x` | All 1.0 criteria met, awaiting feedback |
| Stable | `v1.0.0` | Production release |
| Post-1.0 | strict SemVer | — |

## Bump policy

| Change | Pre-1.0 bump | Post-1.0 bump |
| ------ | ------------ | ------------- |
| New token (added slot in existing group, no consumer breaking) | patch | patch |
| New utility class (additive) | patch | patch |
| New slot group (additive) | minor | minor |
| New theme (additive) | minor | minor |
| Token value change (visible diff, no name change) | minor | minor |
| Default theme color change | minor | minor |
| Token rename | minor | major |
| Token remove | minor | major |
| Slot group slot remove | minor | major |
| Slot group remove | minor | major |
| Theme remove | minor | major |
| `--vds-*` prefix change | minor | major |
| CLI signature breaking change | minor | major |
| Build output structure change | minor | major |
| WCAG policy stricter (could fail existing themes) | minor | minor (with migration) |

Pre-1.0: SemVer convention permits breaking changes in minor bumps. Annotate with `BREAKING CHANGE:` footer in commit.

## Tag and release

```bash
# 1. Update CHANGELOG.md (move [Unreleased] → [X.Y.Z])
# 2. Update version in package.json
# 3. Rebuild
npm run rebuild
npm run validate

# 4. Commit
git add dist/ CHANGELOG.md package.json
git commit -m "chore(release): v0.X.Y"

# 5. Tag
git tag v0.X.Y

# 6. Push
git push origin main --tags

# 7. GitHub Release (manual or via gh)
gh release create v0.X.Y --notes-from-tag
```

## Consumer pinning

```json
{
  "dependencies": {
    "@verobee/design": "github:beegy-labs/verodesign#v0.X.Y"
  }
}
```

| Pinning style | Use case |
| ------------- | -------- |
| `#v0.X.Y` (exact tag) | Production stable |
| `#main` | Bleeding edge (not recommended) |
| `#develop` | Pre-release testing |

## CHANGELOG format

[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/):

```markdown
## [Unreleased]
### Added
- ...

## [0.2.0] - 2026-XX-XX
### Added
- New theme `acme` (slot groups: core, web)
- Token `theme.status.neutral`
### Changed
- `theme.primary` for default theme: oklch(55% 0.18 250) → oklch(58% 0.20 245)
### Deprecated
- `theme.brand.tertiary` (use `theme.accent` instead, removed in v1.0.0)
### Removed
- (none)
### Fixed
- `dist/utilities/web.css` missing `vds-z-popover`
### Security
- (none)
```

## Pre-1.0 stability commitments

What we DO commit to even before 1.0:

| Commitment |
| ---------- |
| `--vds-*` prefix is permanent |
| `[data-theme]` mechanism is permanent |
| W3C DTCG format adherence |
| WCAG AA mandatory enforcement |
| 3-tier model |

What we explicitly DO NOT commit before 1.0:

| Free to change |
| -------------- |
| Specific token names (rename allowed minor) |
| Default theme color values |
| Slot group composition |
| CLI command signatures |

## Post-1.0 stability commitments

After 1.0:

| Stability tier | Commitment | Change requires |
| -------------- | ---------- | --------------- |
| Token names | Stable | Major version |
| `--vds-*` CSS variable names | Stable | Major version |
| `vds-*` utility class names | Stable | Major version |
| Build output file structure | Stable | Major version |
| CLI command signatures | Stable | Major version |
| DTCG format | Stable | External standard change |

## Migration guides

For every major version bump (post-1.0), maintain a migration guide:

```
docs/llm/migration/
├── v1-to-v2.md
└── v2-to-v3.md
```

Pre-1.0: notable breaks documented in `CHANGELOG.md` under specific version section.

## Yanking / un-publishing

If a release contains a critical bug:

| Severity | Action |
| -------- | ------ |
| Build artifact corrupted | Tag `v0.X.Y` deleted, `v0.X.Y+1` published immediately |
| Token value violates WCAG | Patch release immediately |
| Security issue | Patch + GitHub Security Advisory |
| Breaking unintended | Patch fixing the break (not a major bump unless intentional) |

## 1.0 entry criteria (recap)

| Required for v1.0.0 |
| ------------------- |
| 1+ external production user |
| `core` slot group schema unchanged for 3 months |
| Test coverage ≥ 80% |
| English README + docs site |
| `examples/` directory (Vite + Next.js + Astro) |
| All 6 build gates green for 3 months |
