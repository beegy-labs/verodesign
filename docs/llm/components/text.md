# Text

> Tag: `<vds-text>` · React: `Text` · Status: v0.2.0-alpha · APG pattern: none (typography primitive)

## Purpose
Token-bound text primitive for body copy, labels, and metadata.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | System-authored text that should stay on the canonical type scale. |
| Use | Simple tone, weight, and alignment changes without ad hoc classes. |
| Do not use | Semantic headings; use Heading. |
| Do not use | Rich prose blocks where wrapper styles own the flow. |

## Design rationale
Text provides bounded typography controls at the component layer so consumers can stay inside the token system for small text decisions.

## A11y narrative
The chosen `as` value determines semantics. Tone and truncation should not hide critical information without alternate access.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-text>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `size` | `size` | `Size | undefined` | — |
| `tone` | `tone` | `Tone | undefined` | — |
| `weight` | `weight` | `Weight | undefined` | — |
| `align` | `align` | `Align | undefined` | — |
| `as` | `as` | `AsTag | undefined` | — |
| `truncate` | `truncate` | `boolean` | `false` |
| `uppercase` | `uppercase` | `boolean` | `false` |
| `mono` | `mono` | `boolean` | `false` |
| `tabular` | `tabular` | `boolean` | `false` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | text content |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-text tone="muted">Secondary copy</vds-text>
```

```tsx
import { Text } from '@verobee/design-react';

<Text tone="muted">Secondary copy</Text>
```

