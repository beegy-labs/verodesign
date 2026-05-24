# Stat Tile

> Tag: `<vds-stat-tile>` · React: `StatTile` · Status: v0.2.0-alpha · APG pattern: none (data summary)

## Purpose
Compact KPI tile with label, value, and optional delta.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Dashboard summaries and at-a-glance metrics. |
| Use | Short metric cards that need consistent hierarchy. |
| Do not use | Rich analytical panels with tables or charts. |
| Do not use | Long-form explanatory text. |

## Design rationale
StatTile packages a repeated dashboard pattern into a stable surface with controlled tone and density.

## A11y narrative
The value and label remain plain content. If the tile itself is interactive, that interaction should be authored around it rather than assumed by default.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-stat-tile>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `label` | `label` | `string` | `` |
| `value` | `value` | `string` | `` |
| `delta` | `delta` | `string | undefined` | — |
| `hint` | `hint` | `string | undefined` | — |
| `deltaTone` | `delta-tone` | `DeltaTone` | `neutral` |
| `tone` | `tone` | `Tone` | `default` |

#### Slots
| Name | Description |
| ---- | ----------- |
| `icon` | leading icon (small, top-right of tile) |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-stat-tile label="Revenue" value="$12.4k"></vds-stat-tile>
```

```tsx
import { StatTile } from '@verobee/design-react';

<StatTile label="Revenue" value="$12.4k" />
```

