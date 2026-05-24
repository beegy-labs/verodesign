# Migration: v1 → v2 — DTCG naming source alignment

> Status: ready | Codemod: `@verobee/codemods` `migrate-naming-2026-05` | SDD: [`.specs/verodesign/2026-05-21-dtcg-naming-migration/spec.md`](../../../.specs/verodesign/2026-05-21-dtcg-naming-migration/spec.md)

## Breaking change

Semantic source tokens and emitted CSS variables now follow DTCG dot-path nesting for status and foreground tokens.

## Token renames

| Before | After |
| ------ | ----- |
| `theme.success` | `theme.status.success` |
| `theme.success-fg` | `theme.status.success.foreground` |
| `theme.warning` | `theme.status.warning` |
| `theme.warning-fg` | `theme.status.warning.foreground` |
| `theme.error` | `theme.status.error` |
| `theme.error-fg` | `theme.status.error.foreground` |
| `theme.info` | `theme.status.info` |
| `theme.info-fg` | `theme.status.info.foreground` |
| `theme.neutral` | `theme.status.neutral` |
| `theme.neutral-fg` | `theme.status.neutral.foreground` |
| `theme.primary-fg` | `theme.primary.foreground` |
| `theme.accent-fg` | `theme.accent.foreground` |
| `theme.destructive-fg` | `theme.destructive.foreground` |
| `theme.cancelled-fg` | `theme.cancelled.foreground` |

## CSS variable renames

| Legacy variable family | After |
| ---------------------- | ----- |
| success root alias | `--vds-theme-status-success` |
| success foreground dashed alias | `--vds-theme-status-success-foreground` |
| warning root alias | `--vds-theme-status-warning` |
| warning foreground dashed alias | `--vds-theme-status-warning-foreground` |
| error root alias | `--vds-theme-status-error` |
| error foreground dashed alias | `--vds-theme-status-error-foreground` |
| info root alias | `--vds-theme-status-info` |
| info foreground dashed alias | `--vds-theme-status-info-foreground` |
| neutral root alias | `--vds-theme-status-neutral` |
| neutral foreground dashed alias | `--vds-theme-status-neutral-foreground` |
| primary foreground dashed alias | `--vds-theme-primary-foreground` |
| accent foreground dashed alias | `--vds-theme-accent-foreground` |
| destructive foreground dashed alias | `--vds-theme-destructive-foreground` |
| cancelled foreground dashed alias | `--vds-theme-cancelled-foreground` |

## Codemod

```bash
npx @verobee/codemods migrate-naming-2026-05 ./src
npx @verobee/codemods migrate-naming-2026-05 --dry-run ./src
```

Rewrites:
- DTCG JSON token keys and `{theme.*}` references
- CSS variable names inside `.css`, `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`
- Markdown/code examples in docs

## Consumer examples

`app-girok`, `verobase`, `veronex` consumers should update string references such as:

```diff
- color: var(legacy success foreground dashed alias);
+ color: var(--vds-theme-status-success-foreground);

- {theme.primary-fg}
+ {theme.primary.foreground}
```

## Verify

```bash
rg -- '--vds-theme-(success|warning|error|info|neutral|primary|accent|destructive|cancelled)-foreground\\b' src
rg -- 'theme\\.(success|warning|error|info|neutral|primary|accent|destructive|cancelled)-fg' .
pnpm build
```
