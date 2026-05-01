# Switch

> Tag: `<vds-switch>` · Import: `@verobee/design-elements/components/switch` · React: `Switch` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Switch · Status: v0.2.0-alpha

**Lookup**: switch, toggle, on/off, immediate.

## Purpose
Two-state toggle with immediate effect (unlike checkbox which usually applies on submit).

## When to use
- Setting that takes effect immediately (e.g., "Dark mode", "Email notifications").
- Boolean preference.

## When NOT to use
- Boolean form value submitted later → use `<vds-checkbox>`.
- Tri-state → use `<vds-checkbox>` (supports `indeterminate`).

## Anatomy
```
[ ●○ ]  label-slot
  ↑
 track + thumb
```

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `checked` | `boolean` | `false` | On/off state |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Form validation |
| `name` | `string` | — | Form name |
| `value` | `string` | `"on"` | Form value when on |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `change` | `{ checked: boolean }` | Fires on Space, Enter, click |

## A11y (WAI-ARIA AP 1.2 § Switch)
- `role="switch"`.
- `aria-checked` reflects `checked`.
- Keyboard: Space and Enter both toggle.

## Tokens consumed
- `--vds-theme-{primary,border-default,bg-card,border-focus,text-primary}`
- `--vds-spacing-2`, `--vds-font-{family-sans,size-{sm,base,lg}}`
- `--vds-duration-fast`

## Examples

### HTML
```html
<vds-switch>Email notifications</vds-switch>
<vds-switch checked size="lg">Dark mode</vds-switch>
```

### React
```tsx
import { Switch } from '@verobee/design-react';

<Switch
  checked={dark}
  onChange={(e) => setDark(e.detail.checked)}
>
  Dark mode
</Switch>
```

## Related
[`<vds-checkbox>`](checkbox.md), [`<vds-label>`](label.md)
