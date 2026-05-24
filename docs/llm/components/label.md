# Label

> Tag: `<vds-label>` · React: `Label` · Status: v0.2.0-alpha · APG pattern: label/for

## Purpose
Accessible form-field label with required marker support.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Visible labels for text fields, text areas, selects, switches, and checkboxes. |
| Use | Cases where click-to-focus binding should stay explicit. |
| Do not use | Decorative captions or helper copy. |
| Do not use | Button text or heading content. |

## Design rationale
Label keeps the standard HTML association model rather than inventing a custom field wrapper API.

## A11y narrative
Preserves label-to-control focus activation. Required asterisk stays visual-only while the control itself owns semantic required state.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-label>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `for` | `for` | `string | undefined` | — |
| `required` | `required` | `boolean` | `false` |
| `size` | `size` | `Size` | `md` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | label text |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-label for="email" required>Email</vds-label>
<vds-text-field id="email"></vds-text-field>
```

```tsx
import { Label } from '@verobee/design-react';

<Label htmlFor="email">Email</Label>
```

