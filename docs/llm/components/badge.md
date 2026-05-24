# Badge

> Tag: `<vds-badge>` · React: `Badge` · Status: v0.2.0-alpha · APG pattern: none (decorative)

## Purpose
Inline non-interactive status or count indicator.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Short state labels, counts, and categorical markers. |
| Use | A compact inline signal next to text or metadata. |
| Do not use | Primary actions or navigation. |
| Do not use | Long-form status explanation that needs more than a chip. |

## Design rationale
Badge stays intentionally narrow: semantic tone, small size range, and slot-based icon support cover the common system cases without turning it into a generic pill button.

## A11y narrative
The host is decorative by default. If the badge conveys live status, the containing region should own the announcement contract with `role="status"` or `aria-live`.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-badge>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `variant` | `variant` | `Variant` | `soft` |
| `tone` | `tone` | `Tone` | `neutral` |
| `size` | `size` | `Size` | `md` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | badge label |
| `start` | leading icon |
| `end` | trailing icon |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-badge tone="success">Active</vds-badge>
<vds-badge variant="outline" tone="primary">Beta</vds-badge>
```

```tsx
import { Badge } from '@verobee/design-react';

<Badge tone="success">Active</Badge>
```

