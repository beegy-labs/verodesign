# Spacer

> Tag: `<vds-spacer>` · React: `Spacer` · Status: v0.2.0-alpha · APG pattern: none (layout primitive)

## Purpose
Explicit empty space primitive bound to spacing tokens.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | A deliberate structural gap in a composition. |
| Use | Places where margin ownership is ambiguous and a neutral spacer is clearer. |
| Do not use | General layout flow where Stack or Cluster should own spacing. |
| Do not use | Content separation that needs a visual rule; use Separator. |

## Design rationale
Spacer exists for the narrow cases where empty space itself is the clearest layout unit and token ownership should remain explicit.

## A11y narrative
Spacer is presentational only and should not carry content or interactive affordances.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-spacer>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `axis` | `axis` | `Axis` | `vertical` |
| `size` | `size` | `Size | undefined` | — |
| `grow` | `grow` | `boolean` | `false` |

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
<vds-spacer size="4"></vds-spacer>
```

```tsx
import { Spacer } from '@verobee/design-react';

<Spacer size="4" />
```

