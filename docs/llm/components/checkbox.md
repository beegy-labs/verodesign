# Checkbox

> Tag: `<vds-checkbox>` · Import: `@verobee/design-elements/components/checkbox` · React: `Checkbox` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Checkbox · Status: v0.2.0-alpha

**Lookup**: checkbox, check box, tickbox, tri-state, indeterminate.

## Purpose
Tri-state form-associated checkbox (true / false / mixed).

## When to use
- Boolean opt-in / opt-out.
- "Select all" parent that reflects mixed state of children.
- Multi-select rows / lists.

## When NOT to use
- Mutually-exclusive choice → use radio (todo) or `<vds-select>`.
- Toggle setting → use `<vds-switch>` (immediate effect).

## Anatomy
```
[ □/✓/− ]  label-slot
   ↑
  18px box
```

## Props (attributes)
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `checked` | `boolean` | `false` | Boolean state |
| `indeterminate` | `boolean` | `false` | Mixed state (overrides display until toggle) |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Form validation |
| `name` | `string` | — | Form field name |
| `value` | `string` | `"on"` | Form value when checked |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |

## Slots
| Name | Description |
| ---- | ----------- |
| (default) | Label text |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `change` | `{ checked: boolean }` | Fires on Space or click |

## A11y (WAI-ARIA AP 1.2 § Checkbox)
- `role="checkbox"`.
- `aria-checked`: `"true"` / `"false"` / `"mixed"`.
- Keyboard: Space toggles. Enter ignored (per spec).
- Indeterminate→toggle resolves to `checked=true`.

## Tokens consumed
- `--vds-theme-{primary,primary-fg,bg-card,border-default,border-focus,text-primary}`
- `--vds-radius-sm`, `--vds-border-width-1`
- `--vds-font-size-{sm,base,lg}`, `--vds-duration-fast`

## Examples

### HTML
```html
<vds-checkbox name="newsletter" required>Subscribe to newsletter</vds-checkbox>
<vds-checkbox checked>Accepted</vds-checkbox>
<vds-checkbox indeterminate>Some items selected</vds-checkbox>
```

### React
```tsx
import { Checkbox } from '@verobee/design-react';

<Checkbox
  checked={value}
  onChange={(e) => setValue(e.detail.checked)}
>
  Subscribe
</Checkbox>
```

## Related
[`<vds-switch>`](switch.md), [`<vds-label>`](label.md), [`<vds-text-field>`](text-field.md)
