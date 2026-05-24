# Checkbox

> Tag: `<vds-checkbox>` · React: `Checkbox` · Status: v0.2.0-alpha · APG pattern: Checkbox

## Purpose
Tri-state checkbox with FACE integration.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Boolean opt-in or list-row selection. |
| Use | Parent selection that needs an indeterminate state. |
| Do not use | Immediate settings toggles; use Switch. |
| Do not use | Mutually exclusive choices; use radio-group patterns. |

## Design rationale
Checkbox keeps form semantics central. The component owns true/false/mixed signaling and validation while keeping visual customization limited to token-backed size and tone.

## A11y narrative
Uses APG checkbox semantics with `aria-checked` including `mixed`, Space activation, and form-associated value submission.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-checkbox>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `checked` | `checked` | `boolean` | `false` |
| `indeterminate` | `indeterminate` | `boolean` | `false` |
| `disabled` | `disabled` | `boolean` | `false` |
| `required` | `required` | `boolean` | `false` |
| `name` | `name` | `string | undefined` | — |
| `value` | `value` | `string` | `on` |
| `size` | `size` | `Size` | `md` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | label text (rendered after the checkbox) |

#### Events
| Name | Description |
| ---- | ----------- |
| `change` | { detail: { checked: boolean } } |

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-checkbox indeterminate>Select all</vds-checkbox>
```

```tsx
import { Checkbox } from '@verobee/design-react';

<Checkbox checked={value}>Subscribe</Checkbox>
```

