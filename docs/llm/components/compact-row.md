# Compact Row

> Tag: `<vds-compact-row>` · React: `CompactRow` · Status: v0.2.0-alpha · APG pattern: list row / action row

## Purpose
Single-row entity item that can render as button or anchor.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Dense lists where leading, body, and trailing affordances must align. |
| Use | Clickable rows that still need a bounded token contract. |
| Do not use | Large editorial cards with multi-line layout. |
| Do not use | Tabular data where column semantics matter. |

## Design rationale
Phase E2 promoted CompactRow into Lit so the canonical contract now lives at the custom-element layer. `as`, `href`, `tone`, and `show-chevron` cover the main navigation-row variants without splintering into app-specific row components.

## A11y narrative
The row keeps native button or anchor semantics depending on `as`. Disabled state and selected state remain host-level signals instead of custom roles.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-compact-row>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `as` | `as` | `RowAs` | `button` |
| `href` | `href` | `string | null` | `null` |
| `tone` | `tone` | `Tone` | `neutral` |
| `selected` | `selected` | `boolean` | `false` |
| `disabled` | `disabled` | `boolean` | `false` |
| `showChevron` | `show-chevron` | `boolean` | `false` |

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
<vds-compact-row as="a" href="/accounts/1" show-chevron>
  Account summary
</vds-compact-row>
```

```tsx
import { CompactRow } from '@verobee/design-react';

<CompactRow as="button" selected tone="primary">Portfolio</CompactRow>
```

