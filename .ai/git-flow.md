# Git Flow

> CDD Layer 1 — Branch & commit strategy | **Last Updated**: 2026-04-30

## Branch flow

```
feat/* ──squash──▶ develop ──merge──▶ main ──tag──▶ vX.Y.Z
                    (Dev)              (Prod)        (consumer pin)
```

## Merge strategy

| Source → Target | Type | Command |
| --------------- | ---- | ------- |
| feat → develop | squash | `gh pr merge --squash` |
| develop → main | merge | `gh pr merge --merge` |

## Feature workflow

```bash
git checkout -b feat/{slug}
# work
npm run build
npm test
git commit -m "{type}({scope}): {subject}"
gh pr create --base develop
gh pr merge --squash --delete-branch
```

## Release workflow

```bash
# on main, after develop merge
npm run rebuild
npm run validate
git add dist/ CHANGELOG.md
git commit -m "chore(release): v{version}"
git tag v{version}
git push origin main --tags
gh release create v{version} --notes-file CHANGELOG.md  # extracts current section
```

## Commit format

```
<type>(<scope>): <subject>

[optional body]

[optional footer: BREAKING CHANGE: ..., Refs: #123]
```

| Field | Rule |
| ----- | ---- |
| type | feat, fix, refactor, docs, test, chore, perf, ci, build, revert, style |
| scope | `[a-z0-9-]+` only |
| subject | non-empty, lowercase start, ≤72 chars |

| Common scopes | Use case |
| ------------- | -------- |
| tokens | Token JSON additions/changes |
| themes | Theme additions/changes |
| build | Style Dictionary, build scripts |
| utilities | Utility class generator |
| cli | `vds` / `verodesign` CLI |
| docs | CDD documentation |
| release | Version bumps |
| theme-veronex / theme-verobase / theme-default | Theme-specific |

CI pattern (when added): `^(feat|fix|refactor|docs|test|chore|perf|ci|build|revert|style)\([a-z0-9-]+\): .+`

## SemVer mapping

| Footer | Version bump |
| ------ | ------------ |
| `BREAKING CHANGE:` (post-1.0) | major |
| `feat:` | minor |
| `fix:`, `perf:`, `revert:` | patch |
| `docs:`, `test:`, `chore:`, `style:`, `refactor:` (no API impact) | none (still tag with patch) |

Pre-1.0: BREAKING CHANGE permits minor bump (SemVer convention).

## CHANGELOG format

Keep a Changelog 1.1.0:

```markdown
## [Unreleased]

## [0.1.0] - 2026-05-XX
### Added
- ...
### Changed
- ...
### Deprecated
- ...
### Removed
- ...
### Fixed
- ...
### Security
- ...
```

## No-AI rule

Never reference Claude, GPT, Copilot, AI, LLM in commits, PR titles, PR bodies. No `Co-Authored-By` AI trailers.
