# Grid

> Tag: `<vds-grid>` · React: `Grid` · Status: v0.2.0-alpha · APG pattern: none (layout primitive)

## Purpose
Token-safe CSS grid layout primitive.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Simple two-dimensional layouts with repeated spacing and column props. |
| Use | System-level composition where utility bundles would otherwise repeat. |
| Do not use | Single-axis spacing; use Stack or Cluster. |
| Do not use | Complex responsive art direction that belongs in app-specific CSS. |

## Design rationale
Grid encodes a narrow set of common layout controls rather than exposing arbitrary CSS grid authoring at the component layer.

## A11y narrative
Grid is purely presentational here. Do not confuse it with ARIA grid semantics; interactive data grids remain out of scope.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-grid>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `cols` | `cols` | `Cols` | `1` |
| `gap` | `gap` | `Gap` | `0` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | children laid in `cols` columns with `gap` |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-grid columns="2" gap="4">
  <div>One</div>
  <div>Two</div>
</vds-grid>
```

```tsx
import { Grid } from '@verobee/design-react';

<Grid columns="2" gap="4">...</Grid>
```

