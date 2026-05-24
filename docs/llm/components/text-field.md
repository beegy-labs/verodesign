# Text Field

> Tag: `<vds-text-field>` · React: `TextField` · Status: v0.2.0-alpha · APG pattern: textbox

## Purpose
Single-line FACE text input with helper and validation support.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Email, password, search, number, and standard short text inputs. |
| Use | Forms that need a consistent field shell. |
| Do not use | Multi-line or rich content. |
| Do not use | Strict value lists that should use Select. |

## Design rationale
Text Field centralizes the common single-line field contract, including validation, helper copy, and icon slot composition.

## A11y narrative
Uses native input semantics, propagates required and invalid state, and keeps helper/error messaging associated with the control.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-text-field>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `name` | `name` | `string | undefined` | — |
| `label` | `label` | `string | undefined` | — |
| `helper` | `helper` | `string | undefined` | — |
| `errorMessage` | `errorMessage` | `string | undefined` | — |
| `placeholder` | `placeholder` | `string | undefined` | — |
| `type` | `type` | `| 'text' | 'email' | 'password' | 'tel' | 'url' | 'search'     | 'number' | 'date' | 'datetime-local' | 'time' | 'month' | 'week'     | 'color' | 'range' | 'file' | 'hidden'` | `text` |
| `size` | `size` | `Size` | `md` |
| `disabled` | `disabled` | `boolean` | `false` |
| `required` | `required` | `boolean` | `false` |
| `readonly` | `readonly` | `boolean` | `false` |
| `autocomplete` | `autocomplete` | `string | undefined` | — |
| `minlength` | `minlength` | `number | undefined` | — |
| `maxlength` | `maxlength` | `number | undefined` | — |
| `pattern` | `pattern` | `string | undefined` | — |

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
<vds-text-field type="email" placeholder="you@example.com"></vds-text-field>
```

```tsx
import { TextField } from '@verobee/design-react';

<TextField type="email" />
```

