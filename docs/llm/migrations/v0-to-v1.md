# Migration: v0 → v1 — DTCG naming migration (2026-05)

> Status: ready | Breaking change: yes | Codemod: `npx @verobee/codemods migrate-naming-2026-05`

## What changed

The naming source now follows canonical DTCG dot-path semantics end-to-end.
Legacy dashed foreground aliases are removed from source, CSS variables,
and consumer references.

## Breaking change scope

| Surface | Change | Impact |
| ------- | ------ | ------ |
| Source token references | dashed alias → dot-path | Token JSON, docs, audits, custom transforms |
| CSS variables | dashed suffix → nested foreground suffix | Component CSS, app CSS, inline `var(...)` |
| Contrast report keys | report pair names now use dot-path only | Snapshot tests, audit parsers |

## Token rename map

Legacy dashed foreground aliases and root-level status aliases now map to exact DTCG token strings.

| Before | After |
| ------ | ----- |
| `theme.primary-fg` | `theme.primary.foreground` |
| `theme.accent-fg` | `theme.accent.foreground` |
| `theme.destructive-fg` | `theme.destructive.foreground` |
| `theme.cancelled-fg` | `theme.cancelled.foreground` |
| `theme.success-fg` | `theme.status.success.foreground` |
| `theme.error-fg` | `theme.status.error.foreground` |
| `theme.warning-fg` | `theme.status.warning.foreground` |
| `theme.info-fg` | `theme.status.info.foreground` |
| `theme.neutral-fg` | `theme.status.neutral.foreground` |
| `theme.success` | `theme.status.success` |
| `theme.error` | `theme.status.error` |
| `theme.warning` | `theme.status.warning` |
| `theme.info` | `theme.status.info` |
| `theme.neutral` | `theme.status.neutral` |

## CSS variable rename map

Consumer CSS and inline `var(...)` calls must use the exact variable strings below.

| Legacy variable family | After |
| ---------------------- | ----- |
| primary foreground dashed alias | `--vds-theme-primary-foreground` |
| accent foreground dashed alias | `--vds-theme-accent-foreground` |
| destructive foreground dashed alias | `--vds-theme-destructive-foreground` |
| cancelled foreground dashed alias | `--vds-theme-cancelled-foreground` |
| success foreground dashed alias | `--vds-theme-status-success-foreground` |
| error foreground dashed alias | `--vds-theme-status-error-foreground` |
| warning foreground dashed alias | `--vds-theme-status-warning-foreground` |
| info foreground dashed alias | `--vds-theme-status-info-foreground` |
| neutral foreground dashed alias | `--vds-theme-status-neutral-foreground` |
| success root alias | `--vds-theme-status-success` |
| error root alias | `--vds-theme-status-error` |
| warning root alias | `--vds-theme-status-warning` |
| info root alias | `--vds-theme-status-info` |
| neutral root alias | `--vds-theme-status-neutral` |

## Codemod

```bash
npx @verobee/codemods migrate-naming-2026-05 .
```

Expected rewrites:

- Token references move from legacy dashed aliases to nested `.foreground` paths
- CSS variables move from dashed foreground suffixes to nested `-foreground` names
- JSX, TSX, Lit template strings, and CSS files containing the old variable names

## Consumer examples

### app-girok

```css
.hero-cta {
  background: var(--vds-theme-primary);
  color: var(--vds-theme-primary-foreground);
}
```

### verobase

```tsx
<Badge
  style={{
    background: 'var(--vds-theme-status-success)',
    color: 'var(--vds-theme-status-success-foreground)',
  }}
/>
```

### veronex

```ts
const destructiveText = 'var(--vds-theme-destructive-foreground)';
```

## Recommended migration order

1. Run `npx @verobee/codemods migrate-naming-2026-05 .`
2. Search for leftover dashed names in source and generated snapshots.
3. Rebuild with `pnpm --filter "@verobee/*" build`.
4. Re-run any contrast snapshot or CSS snapshot assertions.

## Validation grep

Use the repository audit grep set from the migration spec and confirm zero
legacy dashed foreground aliases remain in source or documentation.
