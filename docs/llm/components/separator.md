# Separator

> Tag: `<vds-separator>` · React: `Separator` · Status: v0.2.0-alpha · APG pattern: Separator

## Purpose
Visual divider with optional semantic exposure.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Section breaks and inline group dividers. |
| Use | Menu grouping or simple horizontal rules within system surfaces. |
| Do not use | A layout crutch for spacing problems. |
| Do not use | Interactive resize handles or custom splitter widgets. |

## Design rationale
Separator keeps the contract minimal: orientation plus decorative-vs-semantic choice.

## A11y narrative
Decorative separators stay out of the accessibility tree. Semantic separators expose orientation when the divider itself has meaning.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-separator>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `orientation` | `orientation` | `Orientation` | `horizontal` |
| `decorative` | `decorative` | `boolean` | `true` |

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
<vds-separator></vds-separator>
```

```tsx
import { Separator } from '@verobee/design-react';

<Separator orientation="vertical" />
```

