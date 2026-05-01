# Text Field

> Tag: `<vds-text-field>` · Import: `@verobee/design-elements/components/text-field` · React: `TextField` from `@verobee/design-react` · Pattern: native textbox + WAI-ARIA hints · Status: v0.2.0-alpha

**Lookup**: input, text input, text field, single-line, email, password, number.

## Purpose
Single-line text input. Form-associated, validation-aware.

## When to use
- Email, name, password, search, number, URL.
- Inline editable label.

## When NOT to use
- Multi-line → use `<vds-text-area>`.
- Choice from list → use `<vds-select>`.

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `string` | `""` | Current value |
| `type` | `"text"` \| `"email"` \| `"password"` \| `"number"` \| `"tel"` \| `"url"` \| `"search"` | `"text"` | Input type |
| `placeholder` | `string` | — | Hint text |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Required for form |
| `name` | `string` | — | Form field name |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |

## Slots
| Name | Description |
| ---- | ----------- |
| `start` | Leading icon / addon |
| `end` | Trailing icon / addon |
| `helper` | Helper / error text below input |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `input` | (native InputEvent) | Fires on every keystroke |
| `change` | `{ value: string }` | Fires on commit (blur or Enter) |

## A11y
- Internal `<input>` with proper type.
- `aria-invalid` reflected from validation state.
- `aria-required` from `required` prop.

## Tokens consumed
- `--vds-theme-{bg-card,text-primary,text-faint,border-default,border-focus,destructive}`
- `--vds-spacing-{2,3}`, `--vds-radius-md`, `--vds-font-{family-sans,size-{sm,base,lg}}`

## Examples

```html
<vds-text-field type="email" name="email" placeholder="you@example.com" required>
  <svg slot="start">...</svg>
</vds-text-field>
```

```tsx
import { TextField } from '@verobee/design-react';

<TextField
  type="email"
  value={email}
  onInput={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  required
/>
```

## Related
[`<vds-text-area>`](text-area.md), [`<vds-label>`](label.md)
