# Refactor 2026 Baseline

> Date: 2026-05-19
> Knip: 5.63.1
> Scope: `.specs/verodesign/2026-05-19-knip-baseline-setup.md`
> Build: `pnpm build` pass

## Package Summary

| Package | Unused Files | Unused Exports | Unused Deps |
| --- | ---: | ---: | ---: |
| `@verobee/cli` | 0 | 0 | 2 |
| `@verobee/codemods` | 1 | 0 | 1 |
| `@verobee/design` | 0 | 0 | 1 |
| `@verobee/design-elements` | 0 | 0 | 0 |
| `@verobee/design-react` | 0 | 0 | 0 |
| `@verobee/primitive` | 0 | 0 | 1 |
| `@verobee/showcase` | 0 | 0 | 6 |
| `@verobee/spec` | 0 | 0 | 0 |
| `@verobee/theme-default` | 0 | 0 | 2 |
| `@verobee/theme-verobase` | 0 | 0 | 2 |
| `@verobee/theme-veronex` | 0 | 0 | 2 |
| `@verobee/utilities` | 0 | 0 | 1 |

## Baseline Notes

| Item | Value |
| --- | --- |
| `pnpm refactor:knip` | pass (`--no-exit-code`) |
| `pnpm refactor:knip:prod` | pass (`--production --no-exit-code`) |
| Non-summary findings | unresolved imports in `packages/utilities/src/*.mjs` |
| Existing drift | pre-existing uncommitted changes under `packages/**`, `tokens/**`, `dist/**` remained untouched |

## Follow-up Priority Candidates

| Priority | Candidate | Reason |
| --- | --- | --- |
| 1 | `@verobee/showcase` dependency audit | highest unused dep count (6) |
| 2 | theme package devDependency audit | `theme-default`, `theme-verobase`, `theme-veronex` each 2 |
| 3 | `@verobee/cli` dependency audit | 2 unused deps in a small package |
| 4 | `@verobee/codemods` dead file review | only unused file in baseline |
| 5 | `@verobee/design`, `@verobee/primitive`, `@verobee/utilities` dependency review | 1 unused dep each |
