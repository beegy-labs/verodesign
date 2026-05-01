# Badge

> Tag: `<vds-badge>` · Import: `@verobee/design-elements/components/badge` · React: `Badge` from `@verobee/design-react` · Pattern: none (decorative) · Status: v0.2.0-alpha

**Lookup**: badge, chip, pill, tag, label, status indicator, count indicator.

## Purpose
Inline non-interactive status / count indicator.

## When to use
- Show label / count next to text (e.g., `Inbox (3)`).
- Show entity status (e.g., `Active`, `Pending`).

## When NOT to use
- Need interaction → use `<vds-button>` or anchor.
- Long content → use `<vds-card>` or status banner.

## Anatomy
```
[ start-icon  label  end-icon ]
```

## Props (attributes)
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `"solid"` \| `"soft"` \| `"outline"` | `"soft"` | Fill style |
| `tone` | `"primary"` \| `"accent"` \| `"neutral"` \| `"destructive"` \| `"success"` \| `"warning"` \| `"info"` | `"neutral"` | Color role |
| `size` | `"sm"` \| `"md"` | `"md"` | Visual size |

## Slots
| Name | Description |
| ---- | ----------- |
| (default) | Badge label |
| `start` | Leading icon (optional) |
| `end` | Trailing icon (optional) |

## Events
None.

## A11y (WAI-ARIA AP 1.2)
- No interactive role (decorative). Renders as inline element.
- For status announcements, the parent / container should set `role="status"` or `aria-live`.

## Tokens consumed
- `--vds-theme-{primary,accent,neutral,destructive,success,warning,info}` (and `-fg`)
- `--vds-theme-{success,error,warning,info}-bg` (soft variant)
- `--vds-theme-bg-muted`, `--vds-theme-text-primary`, `--vds-theme-border-default`
- `--vds-spacing-{1,2_5}`, `--vds-radius-full`, `--vds-font-{family-sans,size-{xs,sm},weight-500}`

## Examples

### HTML
```html
<vds-badge tone="success">Active</vds-badge>
<vds-badge variant="solid" tone="destructive">Failed</vds-badge>
<vds-badge variant="outline" tone="primary">Beta</vds-badge>
```

### React
```tsx
import { Badge } from '@verobee/design-react';

<Badge tone="success">Active</Badge>
<Badge variant="solid" tone="destructive">Failed</Badge>
<Badge variant="outline" tone="primary">Beta</Badge>
```

## Related
[`<vds-button>`](button.md), [`<vds-toast>`](toast.md)
