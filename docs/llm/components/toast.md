# Toast

> Tag: `<vds-toast>`, `<vds-toast-group>` · React: `Toast + ToastGroup` · Status: v0.2.0-alpha · APG pattern: Alert / Status

## Purpose
Transient notification system with grouped live-region delivery.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Non-blocking success, warning, info, or error feedback. |
| Use | Queued notifications anchored to a predictable viewport region. |
| Do not use | Blocking confirmation or destructive review. |
| Do not use | Persistent form validation that should stay inline. |

## Design rationale
Toast keeps notification chrome and queue behavior centralized. The group owns placement while individual toasts own tone and dismissal behavior.

## A11y narrative
ToastGroup establishes the live region. Error tone escalates to alert semantics while other tones remain polite status messages.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-toast>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `toastTitle` | `toastTitle` | `string | undefined` | — |
| `message` | `message` | `string | undefined` | — |
| `tone` | `data-tone` | `Tone` | `neutral` |
| `duration` | `duration` | `number` | `5000` |
| `dismissible` | `dismissible` | `boolean` | `true` |

#### Slots
None.

#### Events
| Name | Description |
| ---- | ----------- |
| `vds-dismiss` | dispatched when toast is dismissed |

#### CSS Variables
None.

#### CSS Parts
None.

### `<vds-toast-group>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `placement` | `data-placement` | `| 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'` | `bottom-right` |
| `max` | `max` | `number` | `5` |

#### Slots
None.

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-toast-group>
  <vds-toast tone="success">Saved</vds-toast>
</vds-toast-group>
```

```tsx
import { Toast, ToastGroup } from '@verobee/design-react';

<ToastGroup><Toast tone="success">Saved</Toast></ToastGroup>
```

