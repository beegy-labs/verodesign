# Box

> Tag: `<vds-box>` · React: `Box` · Status: v0.2.0-alpha · APG pattern: none (layout primitive)

## Purpose
Generic spacing and width wrapper bound to tokenized props.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | A light wrapper for padding, inline mode, or constrained width. |
| Use | Replacing repeated utility bundles when a component wants an explicit layout primitive. |
| Do not use | Complex vertical or horizontal flow; use Stack, Cluster, or Grid. |
| Do not use | Freeform brand styling that belongs in consumer composition. |

## Design rationale
Box exists to encode the most common container adjustments as bounded props, keeping layout token-safe without introducing a brand-specific component meaning.

## A11y narrative
The host is semantic-neutral. Consumers must still provide the right landmark or content semantics for the wrapped content.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-box>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `p` | `p` | `Spacing | undefined` | — |
| `px` | `px` | `Spacing | undefined` | — |
| `py` | `py` | `Spacing | undefined` | — |
| `maxWidth` | `max-width` | `MaxWidth | undefined` | — |
| `inline` | `inline` | `boolean` | `false` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | content |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-box p="4" max-width="lg">
  <p>Constrained content</p>
</vds-box>
```

```tsx
import { Box } from '@verobee/design-react';

<Box p="4" maxWidth="lg">Constrained content</Box>
```

