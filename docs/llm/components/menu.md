# Menu

> Tag: `<vds-menu>`, `<vds-menu-item>` · React: `Menu + MenuItem` · Status: v0.2.0-alpha · APG pattern: Menu Button

## Purpose
Action menu revealed from a trigger element.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Overflow or row-level secondary actions. |
| Use | Command groups that do not fit inline. |
| Do not use | Value selection; use Select. |
| Do not use | Single critical action; keep it directly visible as a Button. |

## Design rationale
Menu separates trigger composition from item semantics so any trigger can open a consistent action list.

## A11y narrative
Implements APG menu-button behavior: `aria-haspopup`, `aria-expanded`, menuitem roles, arrow navigation, Home/End, Escape, and type-ahead.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-menu>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `open` | `open` | `boolean` | `false` |
| `placement` | `placement` | `'bottom-start' | 'bottom-end'` | `bottom-start` |

#### Slots
None.

#### Events
| Name | Description |
| ---- | ----------- |
| `vds-select` | dispatched when an item is activated, detail { value } |

#### CSS Variables
None.

#### CSS Parts
None.

### `<vds-menu-item>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `disabled` | `disabled` | `boolean` | `false` |
| `tone` | `data-tone` | `'default' | 'destructive'` | `default` |

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
<vds-menu>
  <vds-button slot="trigger">Actions</vds-button>
  <vds-menu-item value="rename">Rename</vds-menu-item>
</vds-menu>
```

```tsx
import { Menu, MenuItem } from '@verobee/design-react';

<Menu><MenuItem value="rename">Rename</MenuItem></Menu>
```

