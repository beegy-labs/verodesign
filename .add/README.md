# ADD Workflows Index

> Autonomous Development Engine — execution workflows | **Last Updated**: 2026-05-02

Each workflow is a structured prompt for an LLM agent. Read the relevant CDD doc first, then follow the workflow.

## Token lifecycle

| Workflow | When to run |
| -------- | ----------- |
| [`token-add.md`](./token-add.md) | Adding a new token (primitive or semantic) |
| [`theme-add.md`](./theme-add.md) | Adding a new theme |
| [`deprecate.md`](./deprecate.md) | Marking a token deprecated |
| [`contrast-audit.md`](./contrast-audit.md) | Re-validate WCAG contrast for all themes |

## Pattern absorption

| Workflow | When to run |
| -------- | ----------- |
| [`pattern-research.md`](./pattern-research.md) | Searching for new design patterns |
| [`pattern-intake.md`](./pattern-intake.md) | Ingesting an external pattern reference |
| [`pattern-promote.md`](./pattern-promote.md) | Promoting experimental → canonical |
| [`pattern-deprecate.md`](./pattern-deprecate.md) | Removing unused experimental token |

## Release / consumer

| Workflow | When to run |
| -------- | ----------- |
| [`release.md`](./release.md) | Tag and release a new version |
| [`consumer-update.md`](./consumer-update.md) | Update veronex/verobase to new verodesign version |
| [`doc-sync.md`](./doc-sync.md) | Sync docs after token/theme changes |

## Architecture migration

| Workflow | When to run |
| -------- | ----------- |
| [`optimize-2026.md`](./optimize-2026.md) | Execute v0.2.0 size + perf optimization (`@property`, `light-dark()`, `color-mix()`, `@scope`, `@container`, Brotli-11) |

## Workflow execution rules

| Rule | Detail |
| ---- | ------ |
| Read CDD first | Each workflow declares required pre-reads |
| Use SDD spec for non-trivial changes | Token rename, theme add, slot group add |
| Build gates must pass | Workflow ends with successful `npm run build` |
| Update CHANGELOG | Every workflow that adds/changes tokens updates `docs/llm/tokens/CHANGELOG.md` |
| Commit by Conventional Commits | `<type>(<scope>): <subject>` |
| No AI mention in commits | Per AGENTS.md commit rule |
