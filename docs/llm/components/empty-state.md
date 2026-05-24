# Empty State

> Tag: `<vds-empty-state>` · React: `EmptyState` · Status: v0.2.0-alpha · APG pattern: none (feedback container)

## Purpose
Reusable no-data or first-run placeholder with structured slots.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | An empty collection, no-results state, or onboarding gap. |
| Use | A neutral placeholder that should stay consistent across screens. |
| Do not use | Transient success/error feedback; use Toast or inline validation. |
| Do not use | Dense instructional content that deserves a full page. |

## Design rationale
EmptyState keeps the visual frame standardized while leaving copy and action composition to the consumer through slots.

## A11y narrative
Semantics come from the slotted heading, body, and action controls. The component does not override region or alert behavior.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-empty-state>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `size` | `size` | `Size` | `md` |
| `heading` | `heading` | `string | undefined` | — |
| `description` | `description` | `string | undefined` | — |

#### Slots
| Name | Description |
| ---- | ----------- |
| `icon` | optional leading icon |
| (default) | default slot: title text (also accepts `heading` prop) |
| `description` | optional description text |
| `action` | optional action button |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-empty-state>
  <span slot="title">No transactions yet</span>
  <span slot="description">Create the first one to get started.</span>
</vds-empty-state>
```

```tsx
import { EmptyState } from '@verobee/design-react';

<EmptyState />
```

