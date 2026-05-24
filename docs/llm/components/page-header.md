# Page Header

> Tag: `<vds-page-header>` · React: `PageHeader` · Status: v0.2.0-alpha · APG pattern: none (page chrome)

## Purpose
Page-level title row with optional leading and action regions.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Screen headers that need stable title and action alignment. |
| Use | Reusable app-shell page chrome without ad hoc flex wrappers. |
| Do not use | Small card headers or inline section titles. |
| Do not use | Complex hero layouts with bespoke media and marketing content. |

## Design rationale
PageHeader standardizes a frequent layout seam between navigation context, title hierarchy, and top-right actions.

## A11y narrative
The internal title should remain the primary page heading. Slotted actions keep their native semantics.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-page-header>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `heading` | `heading` | `string | undefined` | — |
| `subtitle` | `subtitle` | `string | undefined` | — |

#### Slots
| Name | Description |
| ---- | ----------- |
| `leading` | optional leading content (back button, brand, etc.) |
| `actions` | right-aligned action elements (buttons, etc.) |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-page-header heading="Accounts" subtitle="Overview">
  <vds-button slot="actions">New</vds-button>
</vds-page-header>
```

```tsx
import { PageHeader } from '@verobee/design-react';

<PageHeader heading="Accounts" />
```

