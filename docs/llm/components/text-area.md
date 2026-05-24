# Text Area

> Tag: `<vds-text-area>` · React: `TextArea` · Status: v0.2.0-alpha · APG pattern: native textarea

## Purpose
Multi-line FACE text input with helper and validation support.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Comments, descriptions, notes, and other free-form text. |
| Use | Forms that need token-consistent multi-line fields. |
| Do not use | Single-line data; use Text Field. |
| Do not use | Rich text editing. |

## Design rationale
Text Area keeps the native textarea mental model while aligning chrome and validation signaling with the rest of the field system.

## A11y narrative
Relies on the underlying textarea semantics, required state, and helper/error associations.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-text-area>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `name` | `name` | `string | undefined` | — |
| `label` | `label` | `string | undefined` | — |
| `helper` | `helper` | `string | undefined` | — |
| `errorMessage` | `errorMessage` | `string | undefined` | — |
| `placeholder` | `placeholder` | `string | undefined` | — |
| `disabled` | `disabled` | `boolean` | `false` |
| `required` | `required` | `boolean` | `false` |
| `readonly` | `readonly` | `boolean` | `false` |
| `minlength` | `minlength` | `number | undefined` | — |
| `maxlength` | `maxlength` | `number | undefined` | — |
| `rows` | `rows` | `number` | `4` |
| `resize` | `data-resize` | `Resize` | `vertical` |
| `showCount` | `show-count` | `boolean` | `false` |

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
<vds-text-area rows="6" placeholder="Your message"></vds-text-area>
```

```tsx
import { TextArea } from '@verobee/design-react';

<TextArea rows={6} />
```

