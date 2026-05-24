# Cluster

> Tag: `<vds-cluster>` · React: `Cluster` · Status: v0.2.0-alpha · APG pattern: none (layout primitive)

## Purpose
Horizontal wrapping layout primitive for controls, chips, and inline groups.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Toolbars, tag rows, and compact action groups. |
| Use | Layouts that should wrap naturally across widths. |
| Do not use | Strict vertical rhythm or grid alignment. |
| Do not use | Page-level navigation structures that need bespoke semantics. |

## Design rationale
Cluster exposes the most common inline-wrap behavior as a bounded primitive instead of repeated flex-wrap utility bundles.

## A11y narrative
Cluster is semantic-neutral; child controls keep their native roles and order.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-cluster>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `gap` | `gap` | `Gap` | `2` |
| `align` | `align` | `Align | undefined` | — |
| `justify` | `justify` | `Justify | undefined` | — |
| `nowrap` | `nowrap` | `boolean` | `false` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | children laid horizontally, wrapping by default |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-cluster gap="2">
  <vds-badge>One</vds-badge>
  <vds-badge>Two</vds-badge>
</vds-cluster>
```

```tsx
import { Cluster } from '@verobee/design-react';

<Cluster gap="2">...</Cluster>
```

