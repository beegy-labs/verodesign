# Card

> Tag: `<vds-card>` · React: `Card` · Status: v0.2.0-alpha · APG pattern: none (surface container)

## Purpose
Surface container with structured header, body, and footer slots.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Grouped content that needs consistent chrome. |
| Use | Dashboard modules or list items with optional actions. |
| Do not use | A modal interruption; use Dialog. |
| Do not use | Tabular relationships that need real table semantics. |

## Design rationale
Card is intentionally composition-first. The system exposes stable regions instead of opinionated internal subcomponents so consumers can structure content without forking chrome.

## A11y narrative
Card does not impose a role. Heading hierarchy, links, and actions must be authored by the consumer inside the slots.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-card>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `variant` | `variant` | `Variant` | `surface` |
| `elevation` | `elevation` | `Elevation` | `1` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | main body content |
| `header` | top header content |
| `footer` | bottom footer content |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-card>
  <h3 slot="header">Title</h3>
  <p>Body</p>
</vds-card>
```

```tsx
import { Card } from '@verobee/design-react';

<Card><p>Body</p></Card>
```

