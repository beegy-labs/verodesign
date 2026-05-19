# Icon Button

> Tag: `<vds-icon-button>` · Import: `@verobee/design-elements/components/icon-button` · React: `IconButton` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Button · Status: v0.2.0-alpha

**Lookup**: icon button, icon action, ghost icon button.

## Purpose
Compact icon-only action trigger. Always provide an accessible name with `aria-label`.

## When to use
- Single-icon actions like close, more, edit, delete.
- Dense toolbars or card actions where a text label would add noise.

## When NOT to use
- Primary call-to-action with important text context.
- Toggle state → use a dedicated toggle/switch pattern.

## Anatomy
```
[ icon ]
```

## Props (attributes)
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `"ghost"` \| `"soft"` \| `"outline"` | `"ghost"` | Surface style |
| `tone` | `"neutral"` \| `"primary"` \| `"destructive"` | `"neutral"` | Color role |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | — | Required accessible name |

## Slots
| Name | Description |
| ---- | ----------- |
| (default) | Icon content (`svg` recommended) |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `click` | (native MouseEvent) | Suppressed when `disabled` |

## A11y (WAI-ARIA AP 1.2 § Button)
- `role="button"` set via ElementInternals.
- Keyboard: Enter and Space activate.
- `aria-disabled` reflected from `disabled` attribute.
- Visible text is absent by design, so `aria-label` is required.

## Touch target
- Visual size is unchanged across `sm` / `md` / `lg`.
- On coarse pointers only (`@media (pointer: coarse)`), shadow DOM adds a transparent hit-area so the interactive target is at least `2.75rem` × `2.75rem` (44px).
- Fine pointers keep identical layout, padding, border, color, and manifest/API surface.

## Tokens consumed
- `--vds-theme-{primary,destructive}`
- `--vds-theme-{text-secondary,text-primary,bg-hover,bg-muted,border-default,border-focus}`
- `--vds-spacing-{1,1_5,2}`, `--vds-radius-md`, `--vds-border-width-1`
- `--vds-font-size-{sm,base,lg}`
- `--vds-duration-fast`, `--vds-easing-ease-out`

## Examples

### HTML
```html
<vds-icon-button aria-label="More actions">
  <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="1.5" /></svg>
</vds-icon-button>
```

### React
```tsx
import { IconButton } from '@verobee/design-react';

<IconButton aria-label="Delete" tone="destructive">
  <TrashIcon />
</IconButton>
```

## Related
[`<vds-button>`](button.md), [`<vds-dialog>`](dialog.md)
