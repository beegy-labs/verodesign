# Menu

> Tag: `<vds-menu>` (with `<vds-menu-item>` children) · Import: `@verobee/design-elements/components/menu` · React: `Menu` + `MenuItem` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Menu · Status: v0.2.0-alpha

**Lookup**: menu, dropdown menu, action menu, context menu, popover menu.

## Purpose
List of actions revealed by a trigger.

## When to use
- 3+ secondary actions that don't fit inline.
- Context menu on a row.

## When NOT to use
- Selection from values → use `<vds-select>`.
- Single primary action → use `<vds-button>`.

## Slots
| Name | Description |
| ---- | ----------- |
| `trigger` | Element that opens the menu (e.g., a button) |
| (default) | `<vds-menu-item>` children |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `select` | `{ value: string }` | Fires when a menu-item is activated |

## A11y (WAI-ARIA AP 1.2 § Menu)
- Trigger: `aria-haspopup="menu"`, `aria-expanded`.
- Menu: `role="menu"`. Items: `role="menuitem"`.
- Keyboard: ↑↓ navigate, Enter/Space activate, Esc close, Home/End jump, type-ahead.

## Examples

```html
<vds-menu>
  <vds-button slot="trigger">Actions</vds-button>
  <vds-menu-item value="rename">Rename</vds-menu-item>
  <vds-menu-item value="duplicate">Duplicate</vds-menu-item>
  <vds-menu-item value="delete" tone="destructive">Delete</vds-menu-item>
</vds-menu>
```

```tsx
import { Menu, MenuItem, Button } from '@verobee/design-react';

<Menu onSelect={(e) => handle(e.detail.value)}>
  <Button slot="trigger">Actions</Button>
  <MenuItem value="rename">Rename</MenuItem>
  <MenuItem value="delete" tone="destructive">Delete</MenuItem>
</Menu>
```

## Related
[`<vds-select>`](select.md), [`<vds-button>`](button.md), [`<vds-tooltip>`](tooltip.md)
