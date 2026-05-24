# Select

> Tag: `<vds-select>`, `<vds-option>` · React: `Select + Option` · Status: v0.2.0-alpha · APG pattern: Combobox + Listbox (select-only)

## Purpose
Select-only combobox with FACE submission and type-ahead.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Choosing one value from a bounded list. |
| Use | Forms that need a custom-element select while preserving keyboard semantics. |
| Do not use | Free-text entry or async search. |
| Do not use | Contextual command menus where actions, not values, are the goal. |

## Design rationale
Select keeps the interaction contract narrow: a select-only combobox rather than a generalized autocomplete.

## A11y narrative
Implements APG select-only combobox behavior with listbox options, active option management, type-ahead, and form-associated value submission.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-select>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `placeholder` | `placeholder` | `string` | `Select…` |
| `label` | `label` | `string | undefined` | — |
| `helper` | `helper` | `string | undefined` | — |
| `errorMessage` | `errorMessage` | `string | undefined` | — |
| `disabled` | `disabled` | `boolean` | `false` |
| `required` | `required` | `boolean` | `false` |
| `name` | `name` | `string | undefined` | — |

#### Slots
None.

#### Events
| Name | Description |
| ---- | ----------- |
| `change` | { detail: { value: string } } |

#### CSS Variables
None.

#### CSS Parts
None.

### `<vds-option>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `selected` | `selected` | `boolean` | `false` |
| `disabled` | `disabled` | `boolean` | `false` |

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
<vds-select name="country">
  <vds-option value="kr">Korea</vds-option>
  <vds-option value="us">United States</vds-option>
</vds-select>
```

```tsx
import { Select, Option } from '@verobee/design-react';

<Select><Option value="kr">Korea</Option></Select>
```

