# Dialog

> Tag: `<vds-dialog>` · Import: `@verobee/design-elements/components/dialog` · React: `Dialog` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Dialog (Modal) · Status: v0.2.0-alpha

**Lookup**: dialog, modal, popup, overlay, alert dialog.

## Purpose
Modal dialog with focus trap, scroll lock, and backdrop dismiss.

## When to use
- Confirm destructive action.
- Form that interrupts the current flow.
- Critical info that demands attention.

## When NOT to use
- Non-modal info → use `<vds-toast>` or inline alert.
- Brief description → use `<vds-tooltip>`.

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `open` | `boolean` | `false` | Visibility |
| `title` | `string` | — | Programmatic title (also via `header` slot) |
| `dismissible` | `boolean` | `true` | Backdrop click + Escape close |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Width |

## Slots
| Name | Description |
| ---- | ----------- |
| `header` | Dialog title row |
| (default) | Body |
| `footer` | Action row |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `open` | — | Fires on opening |
| `close` | `{ reason: "backdrop"\|"escape"\|"programmatic" }` | Fires on close |

## A11y (WAI-ARIA AP 1.2 § Dialog)
- `role="dialog"`, `aria-modal="true"`.
- Focus trap (Tab/Shift+Tab cycle inside).
- Initial focus on first focusable element.
- Returns focus to trigger on close.
- Esc dismisses (when `dismissible`).

## Tokens consumed
- `--vds-theme-{bg-card,bg-page,border-subtle,text-primary}`
- `--vds-shadow-5`, `--vds-radius-lg`, `--vds-zindex-modal`
- `--vds-spacing-{3,4,6}`

## Examples

```html
<vds-dialog open>
  <h3 slot="header">Confirm delete?</h3>
  <p>This cannot be undone.</p>
  <div slot="footer">
    <vds-button variant="outline">Cancel</vds-button>
    <vds-button tone="destructive">Delete</vds-button>
  </div>
</vds-dialog>
```

```tsx
import { Dialog, Button } from '@verobee/design-react';

<Dialog open={open} onClose={() => setOpen(false)}>
  <h3 slot="header">Confirm</h3>
  <p>Body</p>
  <div slot="footer">
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button tone="destructive" onClick={confirm}>Delete</Button>
  </div>
</Dialog>
```

## Related
[`<vds-toast>`](toast.md), [`<vds-button>`](button.md)
