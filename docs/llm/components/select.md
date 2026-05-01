# Select

> Tag: `<vds-select>` (with `<vds-option>` children) · Import: `@verobee/design-elements/components/select` · React: `Select` + `Option` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Combobox (select-only) · Status: v0.2.0-alpha

**Lookup**: select, dropdown, combobox, picker.

## Purpose
Single-select combobox with listbox popup. Form-associated.

> Phase 1 ships **select-only** (no inline text input). Editable combobox planned for v0.3.

## When to use
- Pick one of many predefined options (3+ items).
- Tied to form submission (`name="..."`).

## When NOT to use
- 2 mutually-exclusive choices → consider `<vds-switch>` or radio.
- Free text input → use `<vds-text-field>`.
- Multi-select → not yet supported (use checkbox group).

## Anatomy
```
[ trigger ▼ ]    ← always visible
  ┌────────────┐
  │ Option A   │ ← listbox (visible when open)
  │ Option B   │
  │ Option C   │
  └────────────┘
```

## Props (vds-select)
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `string` | `""` | Currently selected option value |
| `placeholder` | `string` | `"Select…"` | Shown when no value |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Form validation |
| `name` | `string` | — | Form field name |

## Props (vds-option)
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `string` | `""` | Option value |
| `selected` | `boolean` | `false` | Reflected from select |
| `disabled` | `boolean` | `false` | Skip in nav |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `change` | `{ value: string }` | Fires when user commits a selection |

## A11y (WAI-ARIA AP 1.2 § Combobox)
- `role="combobox"` on host with `aria-expanded`, `aria-haspopup="listbox"`.
- Listbox has `role="listbox"`, options `role="option"`.
- Keyboard:
  - `Enter` / `Space` / `↓` (closed) → open + activate first or selected option.
  - `↑` / `↓` (open) → move active option.
  - `Home` / `End` → first / last.
  - `Esc` → close.
  - Type-ahead (any letter) → jump to matching option (500ms buffer).
  - `Enter` / `Space` (open) → commit active option.

## Tokens consumed
- `--vds-theme-{bg-card,bg-hover,text-primary,text-faint,border-default,border-focus,primary,primary-fg}`
- `--vds-spacing-{1,1_5,2,2_5,3}`, `--vds-radius-md`, `--vds-shadow-3`
- `--vds-zindex-popover`, `--vds-font-{family-sans,size-sm}`

## Examples

### HTML
```html
<vds-select name="country" placeholder="Select country">
  <vds-option value="kr">Korea</vds-option>
  <vds-option value="us">United States</vds-option>
  <vds-option value="jp">Japan</vds-option>
</vds-select>
```

### React
```tsx
import { Select, Option } from '@verobee/design-react';

<Select
  name="country"
  value={country}
  onChange={(e) => setCountry(e.detail.value)}
>
  <Option value="kr">Korea</Option>
  <Option value="us">United States</Option>
  <Option value="jp">Japan</Option>
</Select>
```

## Related
[`<vds-menu>`](menu.md), [`<vds-text-field>`](text-field.md)
