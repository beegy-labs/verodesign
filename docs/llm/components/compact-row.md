# CompactRow

> React: `CompactRow` from `@verobee/design-react` · Status: 2026-05-13 canonical

## Purpose
Compact, single-row list item for entity rows: leading / label+meta / trailing actions.

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `leading` | `ReactNode` | — | Left icon/badge |
| `label` | `ReactNode` | — | Primary text |
| `meta` | `ReactNode` | — | Secondary text |
| `trailing` | `ReactNode` | — | Right-aligned actions |
| `onClick` | `() => void` | — | Row click handler (becomes a button) |
| `selected` | `boolean` | `false` | Selected styling |
| `className` | `string` | — | Optional class |

## A11y
- If `onClick` is provided, renders as `<button type="button">`.

## Tokens consumed
- `--vds-theme-{bg-card,border-default,text-primary,text-secondary}`
- `--vds-spacing-*`, `--vds-radius-lg`, `--vds-border-width-sm`

## Examples
```tsx
import { CompactRow, IconButton } from '@verobee/design-react';

<CompactRow
  label="삼성전자"
  meta="10주 · ₩72,500"
  trailing={<IconButton aria-label="delete">✕</IconButton>}
/>;
```

