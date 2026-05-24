# Tooltip

> Tag: `<vds-tooltip>` · React: `Tooltip` · Status: v0.2.0-alpha · APG pattern: Tooltip

## Purpose
Non-interactive descriptive tip shown on hover or focus.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Short clarifications and icon-only labels. |
| Use | Supplemental help that does not block the primary task. |
| Do not use | Interactive content or long explanations. |
| Do not use | Critical information that must always be visible. |

## Design rationale
Tooltip is intentionally passive. It handles the wiring between trigger and tip while staying out of richer popover territory.

## A11y narrative
Implements APG tooltip behavior with `aria-describedby`, focus and hover triggers, and Escape dismissal.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-tooltip>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `placement` | `placement` | `Placement` | `top` |
| `delay` | `delay` | `number` | `200` |
| `disabled` | `disabled` | `boolean` | `false` |

#### Slots
| Name | Description |
| ---- | ----------- |
| `trigger` | the element that triggers the tooltip |
| (default) | the tooltip content |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-tooltip>
  <vds-button slot="trigger">Info</vds-button>
  Helpful context
</vds-tooltip>
```

```tsx
import { Tooltip } from '@verobee/design-react';

<Tooltip>Helpful context</Tooltip>
```

