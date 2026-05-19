# ThemeToggle

> React: `ThemeToggle` from `@verobee/design-react` · Status: 2026-05-13 canonical

## Purpose
User-facing theme mode control: `auto` (system) / `light` / `dark`.

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `"auto"` \| `"light"` \| `"dark"` | — | Selected mode |
| `onChange` | `(mode) => void` | — | Mode change callback |
| `compact` | `boolean` | `false` | Icon-only buttons |
| `size` | `"sm"` \| `"md"` | `"md"` | Control density |
| `className` | `string` | — | Optional class |

## States
- Active: uses `--vds-theme-primary` + `--vds-theme-primary-fg`.
- Inactive: transparent background, `--vds-theme-text-primary`.

## A11y
- `role="radiogroup"` with 3 `role="radio"` items.
- ArrowLeft / ArrowRight changes selection.

## Tokens consumed
- `--vds-theme-{bg-card,border-default,primary,primary-fg,text-primary}`
- `--vds-spacing-*`, `--vds-radius-full`, `--vds-border-width-sm`

## Examples
```tsx
import { ThemeToggle } from '@verobee/design-react';

<ThemeToggle value="auto" onChange={(m) => setThemeMode(m)} />;
<ThemeToggle compact value="dark" onChange={(m) => setThemeMode(m)} />;
```

