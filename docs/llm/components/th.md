# Th

> Tag: `<vds-th>` · React: `Th` · Status: v0.2.0-alpha · APG pattern: native table header cell

## Purpose
Token-bound table header cell wrapper that preserves real `<th>` semantics.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Within `vds-table` or any semantic table needing consistent header styling. |
| Use | Table headers that need alignment and compact variants without custom CSS. |
| Do not use | Body cells or non-table layouts. |
| Do not use | Spreadsheet-grade interactions. |

## Design rationale
Th uses light DOM intentionally so header cells participate in native table layout while still exposing a token-safe API.

## A11y narrative
Because it renders a real `<th>`, screen-reader header associations and native table semantics remain intact.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-th>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `align` | `align` | `Align` | `left` |
| `compact` | `compact` | `boolean` | `false` |
| `dim` | `dim` | `boolean` | `false` |
| `colspan` | `colspan` | `number | undefined` | — |

#### Slots
None.

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
| Name | Description |
| ---- | ----------- |
| `cell` | underlying <th> |
<!-- CEM:END -->

## Examples
```html
<tr>
  <vds-th align="left">Name</vds-th>
</tr>
```

```tsx
import { Th } from '@verobee/design-react';

<Th dim>Name</Th>
```

