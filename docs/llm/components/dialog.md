# Dialog

> Tag: `<vds-dialog>` · React: `Dialog` · Status: v0.2.0-alpha · APG pattern: Dialog (Modal)

## Purpose
Modal dialog with focus trap, dismiss controls, and slot composition.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Interruptive confirmation or short-form editing. |
| Use | Flows that must temporarily block background interaction. |
| Do not use | Passive guidance or hover help. |
| Do not use | Long, page-scale tasks that deserve their own route. |

## Design rationale
Dialog owns the tricky platform behavior: trap, restore, and dismissal reasons. Content structure remains slot-driven so consumers do not fork modal chrome for every workflow.

## A11y narrative
Implements the APG modal dialog contract with `aria-modal`, focus containment, Escape dismissal when allowed, and trigger focus restoration.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-dialog>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `open` | `open` | `boolean` | `false` |
| `size` | `size` | `'sm' | 'md' | 'lg' | 'xl' | '2xl'` | `md` |
| `placement` | `placement` | `'center' | 'bottom'` | `center` |
| `closeOnBackdrop` | `close-on-backdrop` | `boolean` | `true` |
| `closeOnEscape` | `close-on-escape` | `boolean` | `true` |
| `ariaLabelText` | `aria-label` | `string | null` | `null` |

#### Slots
| Name | Description |
| ---- | ----------- |
| `title` | dialog heading |
| (default) | main content |
| `footer` | footer (typically buttons) |

#### Events
| Name | Description |
| ---- | ----------- |
| `vds-open` | dispatched when opened |
| `vds-close` | dispatched when closed |

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-dialog open>
  <h3 slot="header">Confirm delete</h3>
  <p>This cannot be undone.</p>
</vds-dialog>
```

```tsx
import { Dialog } from '@verobee/design-react';

<Dialog open={open}>...</Dialog>
```

