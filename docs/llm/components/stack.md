# Stack

> Tag: `<vds-stack>` · React: `Stack` · Status: v0.2.0-alpha · APG pattern: none (layout primitive)

## Purpose
Vertical flex layout primitive with tokenized spacing and alignment.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Column layouts and repeated vertical rhythm. |
| Use | Replacing ad hoc `display:flex; flex-direction:column` wrappers. |
| Do not use | Two-dimensional layouts; use Grid. |
| Do not use | Inline wrapping clusters of controls; use Cluster. |

## Design rationale
Stack captures the most repeated vertical layout pattern as a first-class primitive, reducing consumer-side layout drift.

## A11y narrative
Stack is semantic-neutral. Content semantics must come from the children it arranges.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-stack>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `direction` | `direction` | `Direction` | `column` |
| `gap` | `gap` | `Gap` | `0` |
| `align` | `align` | `Align | undefined` | — |
| `justify` | `justify` | `Justify | undefined` | — |
| `wrap` | `wrap` | `boolean` | `false` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | children flowed in `direction` with `gap` |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-stack gap="3">
  <div>One</div>
  <div>Two</div>
</vds-stack>
```

```tsx
import { Stack } from '@verobee/design-react';

<Stack gap="3">...</Stack>
```

