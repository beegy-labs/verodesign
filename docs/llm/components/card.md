# Card

> Tag: `<vds-card>` · Import: `@verobee/design-elements/components/card` · React: `Card` from `@verobee/design-react` · Pattern: none (decorative container) · Status: v0.2.0-alpha

**Lookup**: card, panel, surface, container.

## Purpose
Surface container with optional header / body / footer. Theme tokens drive bg / border / shadow.

## When to use
- Content groupings on a page (e.g., dashboard tiles).
- Articles / list items with structured chrome.

## When NOT to use
- Tabular data → use `<vds-table>`.
- Modal flow → use `<vds-dialog>`.

## Slots
| Name | Description |
| ---- | ----------- |
| `header` | Title / actions row |
| (default) | Body content |
| `footer` | Action / metadata row |

## Tokens consumed
- `--vds-theme-{bg-card,border-subtle,text-primary}`
- `--vds-spacing-{3,4}`, `--vds-radius-lg`, `--vds-shadow-1`

## Examples

```html
<vds-card>
  <h3 slot="header">Title</h3>
  <p>Body</p>
  <div slot="footer"><vds-button>Action</vds-button></div>
</vds-card>
```

```tsx
import { Card, Button } from '@verobee/design-react';

<Card>
  <h3 slot="header">Title</h3>
  <p>Body</p>
  <div slot="footer"><Button>Action</Button></div>
</Card>
```

## Related
[`<vds-dialog>`](dialog.md), [`<vds-separator>`](separator.md)
