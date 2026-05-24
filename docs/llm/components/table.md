# Table

> Tag: `<vds-table>` · React: `Table` · Status: v0.2.0-alpha · APG pattern: native table wrapper

## Purpose
Semantic table wrapper that standardizes table chrome.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Real row/column relationships that benefit from native table semantics. |
| Use | System tables that need token-consistent surface styling. |
| Do not use | Responsive card lists or key-value layouts. |
| Do not use | Interactive data grids with spreadsheet-like behavior. |

## Design rationale
Table keeps the native HTML table model and limits system opinion to spacing, borders, and framing.

## A11y narrative
Uses actual table semantics. Header associations, captions, and sortable behavior still depend on the authored table content.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-table>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `density` | `density` | `Density` | `normal` |

#### Slots
| Name | Description |
| ---- | ----------- |
| `caption` | <caption> |
| (default) | table contents (thead/tbody/tfoot) |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-table>
  <table>
    <thead><tr><th>Name</th></tr></thead>
    <tbody><tr><td>Alpha</td></tr></tbody>
  </table>
</vds-table>
```

```tsx
import { Table } from '@verobee/design-react';

<Table>...</Table>
```

