# Git Flow

> CDD Layer 1 — Branch & commit strategy | **Last Updated**: 2026-05-01

## Branch flow

```
feat/* ──squash──▶ main ──tag──▶ vX.Y.Z
                   (SSOT)         (consumer pin)
```

GitHub Flow. Library (not service) → no staging environment → `develop` 분리 불필요. Tag 가 곧 release. 자세한 근거는 [docs/llm/decisions.md](../docs/llm/decisions.md) § Branch strategy 참조.

## Merge strategy

| Source → Target | Type | Command |
| --------------- | ---- | ------- |
| feat → main | squash | `gh pr merge --squash --delete-branch` |

## Feature workflow

```bash
git checkout -b feat/{slug}
# work
pnpm build
pnpm validate
git commit -m "{type}({scope}): {subject}"
git push -u origin feat/{slug}
gh pr create --base main
gh pr merge --squash --delete-branch
```

## Release workflow

```bash
# on main, after feat merge
pnpm rebuild
pnpm validate
git add dist/ CHANGELOG.md package.json packages/*/package.json
git commit -m "chore(release): v{version}"
git tag v{version}
git push origin main --tags
gh release create v{version} --notes-file CHANGELOG.md  # extracts current section
```

## Hotfix workflow

```bash
# from main (no separate hotfix branch needed for solo maintainer at small scale)
git checkout -b fix/{slug}
# fix
git commit -m "fix({scope}): {subject}"
gh pr create --base main
gh pr merge --squash --delete-branch
# tag with patch bump
git tag v{patch}
git push origin main --tags
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
| prose | Prose stylesheet |
| components | Lit web components |
| react | React adapter |
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

## Why GitHub Flow (not GitFlow)

| Reason | Detail |
| ------ | ------ |
| Library, not service | No production deploy environment → `develop`/`main` 이중화 불필요 |
| Tag = release | 소비자는 `github:beegy-labs/verodesign#vX.Y.Z` 로 tag pin → main 이 곧 next-release source |
| Solo maintainer | 1인 운영 규모에서 develop 단계 PR 은 overhead |
| 같은 패턴 사용처 | Shoelace, Web Awesome, Adobe Spectrum WC, Material UI 등 대부분 design system |

큰 팀 / 다중 major 유지보수가 필요해지면 `release/X.Y` 브랜치를 도입 (post-1.0 재평가).
