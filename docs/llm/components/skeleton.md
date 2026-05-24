# Skeleton

> Tag: `<vds-skeleton>` · React: `Skeleton` · Status: v0.2.0-alpha · APG pattern: none (loading placeholder)

## Purpose
Animated loading placeholder for shape-preserving skeleton states.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Known layouts where content is loading but chrome should remain stable. |
| Use | Short-lived async boundaries inside cards, lists, and tiles. |
| Do not use | Unknown content shape. |
| Do not use | Long waits where progress text or status messaging is more honest. |

## Design rationale
Skeleton keeps placeholders visually system-consistent and avoids each consumer inventing its own shimmer treatment.

## A11y narrative
Skeleton itself is presentational. Loading state announcements belong to the surrounding region or status messaging, not the placeholder blocks.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-skeleton>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `shape` | `shape` | `Shape` | `rect` |

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
<vds-skeleton width="100%" height="1rem"></vds-skeleton>
```

```tsx
import { Skeleton } from '@verobee/design-react';

<Skeleton />
```

