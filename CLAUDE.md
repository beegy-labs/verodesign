# CLAUDE.md

> Claude agent config — derived from [AGENTS.md](AGENTS.md) | **Last Updated**: 2026-04-30

## Start

Read [.ai/README.md](.ai/README.md). Master decisions: [docs/llm/decisions.md](docs/llm/decisions.md).

## Frameworks

| Directory | Framework | Role |
| --------- | --------- | ---- |
| `.ai/` + `docs/llm/` | CDD | System SSOT — token policies, patterns, multi-theme, multi-platform |
| `.specs/` | SDD | Change plans — token additions, theme changes |
| `.add/` | ADD | Execution — workflow prompts, policy selection |

## Workflows (ADD)

| Action | Workflow |
| ------ | -------- |
| Add new token | `.add/token-add.md` |
| Add new theme | `.add/theme-add.md` |
| Release | `.add/release.md` |
| Update consumer (veronex/verobase) | `.add/consumer-update.md` |
| Doc sync | `.add/doc-sync.md` |
| Deprecate token | `.add/deprecate.md` |
| WCAG contrast audit | `.add/contrast-audit.md` |
| Pattern research | `.add/pattern-research.md` |
| Pattern intake | `.add/pattern-intake.md` |
| Pattern promote | `.add/pattern-promote.md` |
| Pattern deprecate | `.add/pattern-deprecate.md` |
