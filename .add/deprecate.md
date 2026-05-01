# Workflow: Deprecate Token

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Mark a token deprecated for eventual removal.

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/build/versioning.md` |
| `docs/llm/tokens/architecture.md` |

## Inputs

| Field | Required |
| ----- | -------- |
| Token name (DTCG dot-path) | Yes |
| Replacement token (if any) | Yes if deprecating in favor of new token |
| Removal target version | Yes (e.g., `v1.0.0`) |
| Reason | Yes |

## Steps

| # | Action |
| - | ------ |
| 1 | Verify token currently exists in `tokens/` |
| 2 | Add `$extensions.verobee.deprecated` field: `{ since: "v0.X.Y", replacement: "...", remove_in: "v..." }` |
| 3 | Add `$extensions.verobee.status: "deprecated"` |
| 4 | If replacement exists: ensure replacement is canonical, document in deprecation note |
| 5 | Update `docs/llm/tokens/CHANGELOG.md` (Deprecated section) |
| 6 | Run `npm run build` — verify no breakage (deprecated token still emits) |
| 7 | Commit: `refactor(tokens): deprecate {token-name}` |

## Build behavior

Deprecated tokens still emit to `dist/` until `remove_in` version. Build emits warning:

```
[deprecated] theme.brand.tertiary deprecated since v0.5.0, remove in v1.0.0. Use theme.accent instead.
```

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| `$extensions.verobee.deprecated` present | Yes |
| `replacement` field if applicable | Yes |
| `remove_in` version specified | Yes |
| CHANGELOG updated | Yes |

## Versioning impact

| Action | Bump |
| ------ | ---- |
| Deprecate (mark only) | minor |
| Remove (after deprecation period) | major (post-1.0) / minor (pre-1.0 with note) |

## Removal workflow (after deprecation period)

| # | Action |
| - | ------ |
| 1 | Verify `remove_in` version reached |
| 2 | Verify zero consumer references (search across veronex, verobase) |
| 3 | Delete token from JSON |
| 4 | Update CHANGELOG (Removed section) |
| 5 | Run build, verify no dangling references |
| 6 | Commit: `feat(tokens)!: remove deprecated {token}` |

`!` after type indicates breaking change in Conventional Commits.

## Auto-deprecation candidates (90 days zero usage)

Workflow: [`pattern-deprecate.md`](./pattern-deprecate.md) handles experimental tokens. This workflow handles canonical tokens.
