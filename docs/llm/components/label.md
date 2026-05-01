# Label

> Tag: `<vds-label>` · Import: `@verobee/design-elements/components/label` · React: `Label` from `@verobee/design-react` · Pattern: HTML `<label>` semantics · Status: v0.2.0-alpha

**Lookup**: label, form label, field label.

## Purpose
Accessible form-field label. Mirrors HTML `<label for="">` behavior — clicks focus / activate the bound control.

## When to use
- Every visible form input (text-field, text-area, checkbox, switch, select).
- Required-field marker (`required` attribute renders red asterisk).

## When NOT to use
- Decorative caption → use `<p>` or heading.
- Inside a button (button has its own label slot).

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `for` | `string` | — | ID of the form control to bind to |
| `required` | `boolean` | `false` | Append visual `*` |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |

## Slots
| Name | Description |
| ---- | ----------- |
| (default) | Label text |

## A11y
- Click on label → focuses bound control. For checkbox/radio, also toggles.
- The required `*` is `aria-hidden="true"`; convey "required" semantically via `aria-required` on the input.

## Tokens consumed
- `--vds-theme-text-primary`, `--vds-theme-destructive`
- `--vds-spacing-1`, `--vds-font-{family-sans,size-{sm,base,lg},weight-500}`

## Examples

### HTML
```html
<vds-label for="email" required>Email</vds-label>
<vds-text-field id="email" type="email" required></vds-text-field>
```

### React
```tsx
import { Label, TextField } from '@verobee/design-react';

<Label htmlFor="email" required>Email</Label>
<TextField id="email" type="email" required />
```

> Note: in React JSX, use `for` attribute via `htmlFor` per React convention. Lit uses native `for=""`.

## Related
[`<vds-text-field>`](text-field.md), [`<vds-checkbox>`](checkbox.md), [`<vds-switch>`](switch.md)
