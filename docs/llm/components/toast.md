# Toast

> Tags: `<vds-toast>`, `<vds-toast-group>` · Import: `@verobee/design-elements/components/toast` · React: `Toast` + `ToastGroup` from `@verobee/design-react` · Pattern: WAI-ARIA Alert · Status: v0.2.0-alpha

**Lookup**: toast, snackbar, notification, banner, alert (transient).

## Purpose
Transient notification anchored to a region (usually corner). Auto-dismisses.

## When to use
- Brief feedback after async action ("Saved", "Failed").
- Non-blocking system notice.

## When NOT to use
- Blocking confirmation → use `<vds-dialog>`.
- Persistent inline error → use form helper text.

## Props (vds-toast)
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `tone` | `"success"` \| `"warning"` \| `"error"` \| `"info"` \| `"neutral"` | `"info"` | Color role |
| `duration` | `number` | `5000` | ms before auto-dismiss (0 = persistent) |
| `dismissible` | `boolean` | `true` | Show close button |

## Slots
| Name | Description |
| ---- | ----------- |
| `title` | Toast title |
| (default) | Body text |
| `actions` | Action buttons row |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `close` | `{ reason: "auto"\|"dismiss" }` | Fires when toast removed |

## A11y
- `<vds-toast-group>` has `role="region"` + `aria-live="polite"`.
- Error tone uses `aria-live="assertive"`.
- Each toast has `role="status"` (or `role="alert"` for error).

## Examples

```html
<vds-toast-group>
  <vds-toast tone="success">
    <div slot="title">Saved</div>
    Your changes have been saved.
  </vds-toast>
</vds-toast-group>
```

```tsx
import { Toast, ToastGroup } from '@verobee/design-react';

<ToastGroup>
  <Toast tone="success">
    <div slot="title">Saved</div>
    Your changes have been saved.
  </Toast>
</ToastGroup>
```

## Related
[`<vds-dialog>`](dialog.md), [`<vds-badge>`](badge.md)
