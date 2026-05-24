# Surface

> Tag: `<vds-surface>` · React: `Surface` · Status: v0.2.0-alpha · APG pattern: none (layout primitive)

## Purpose
Bordered container primitive for simple token-bound surfaces.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | A lighter-weight container than Card when only surface treatment is needed. |
| Use | Token-safe background and border composition. |
| Do not use | Structured card chrome with dedicated regions. |
| Do not use | Complex app-specific wrappers that deserve their own component. |

## Design rationale
Surface offers the minimum surface contract without implying card anatomy.

## A11y narrative
Surface is semantic-neutral and should inherit meaning from its content.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-surface>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `variant` | `variant` | `Variant` | `default` |
| `radius` | `radius` | `Radius` | `xl` |
| `borderless` | `borderless` | `boolean` | `false` |

#### Slots
None.

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-surface>Plain surface</vds-surface>
```

```tsx
import { Surface } from '@verobee/design-react';

<Surface>Plain surface</Surface>
```

