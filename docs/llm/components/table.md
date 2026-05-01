# Table

> Tag: `<vds-table>` · Import: `@verobee/design-elements/components/table` · React: `Table` from `@verobee/design-react` · Pattern: native `<table>` semantics · Status: v0.2.0-alpha

**Lookup**: table, data table, grid (data), tabular.

## Purpose
Themed wrapper around native `<table>`. Provides token-driven styling and density modes; defers semantics to standard HTML elements.

## When to use
- Tabular data (rows × columns).
- Comparison views.

## When NOT to use
- Layout (use grid utilities instead).
- Card lists (use grid + `<vds-card>`).

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `density` | `"compact"` \| `"normal"` \| `"comfortable"` | `"normal"` | Vertical rhythm |

## Slots
| Name | Description |
| ---- | ----------- |
| `caption` | `<caption>` element (table caption) |
| (default) | `<thead>`, `<tbody>`, `<tfoot>`, `<colgroup>` etc. |

## A11y
- Inherits standard `<table>` semantics — use proper `<th scope="col|row">`.
- For complex tables, set `aria-describedby` to a caption.

## Tokens consumed
- `--vds-theme-{bg-card,bg-elevated,text-primary,border-subtle}`
- `--vds-font-{family-sans,size-{xs,sm,base}}`

## Examples

### HTML
```html
<vds-table density="compact">
  <caption slot="caption">Q1 metrics</caption>
  <thead>
    <tr>
      <th scope="col">Metric</th>
      <th scope="col">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>DAU</td><td>12,830</td></tr>
    <tr><td>Conversion</td><td>4.2%</td></tr>
  </tbody>
</vds-table>
```

### React
```tsx
import { Table } from '@verobee/design-react';

<Table density="compact">
  <thead>
    <tr><th scope="col">Metric</th><th scope="col">Value</th></tr>
  </thead>
  <tbody>
    <tr><td>DAU</td><td>12,830</td></tr>
  </tbody>
</Table>
```

## Related
[`<vds-card>`](card.md)
