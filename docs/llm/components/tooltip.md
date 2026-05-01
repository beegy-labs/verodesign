# Tooltip

> Tag: `<vds-tooltip>` · Import: `@verobee/design-elements/components/tooltip` · React: `Tooltip` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Tooltip · Status: v0.2.0-alpha

**Lookup**: tooltip, hint, popover (passive), info hover.

## Purpose
Brief, non-interactive descriptive text shown on hover or focus of a trigger element.

## When to use
- Augment an icon-only button with a text label.
- Add a short clarification (e.g., "What is this?").

## When NOT to use
- Long content → use `<vds-dialog>` or popover.
- Interactive content (links, buttons inside) → use Popover (TBD) or `<vds-menu>`.
- Critical info — tooltips are easy to miss.

## Anatomy
```
[ trigger-slot ]
       ↑ hover/focus
    ┌─────────┐
    │  tip    │
    └─────────┘
```

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `placement` | `"top"` \| `"right"` \| `"bottom"` \| `"left"` | `"top"` | Tip position |
| `delay` | `number` | `200` | ms before opening |
| `disabled` | `boolean` | `false` | Suppress tooltip |

## Slots
| Name | Description |
| ---- | ----------- |
| `trigger` | The element that triggers the tooltip |
| (default) | Tooltip content (short text) |

## A11y (WAI-ARIA AP 1.2 § Tooltip)
- Tip element has `role="tooltip"` + auto-generated id.
- Trigger receives `aria-describedby` pointing to the tip id.
- Keyboard: focus trigger → tip appears. Esc dismisses.
- Hover: enter → delay → open. Leave → close.

## Tokens consumed
- `--vds-theme-{bg-inverse,text-inverse}`, `--vds-shadow-2`
- `--vds-spacing-{1_5,2_5}`, `--vds-radius-sm`, `--vds-zindex-tooltip`
- `--vds-font-{family-sans,size-xs}`, `--vds-duration-fast`

## Examples

### HTML
```html
<vds-tooltip placement="top">
  <vds-button slot="trigger" aria-label="Settings">
    <svg slot="start">...</svg>
  </vds-button>
  Open settings
</vds-tooltip>
```

### React
```tsx
import { Tooltip, Button } from '@verobee/design-react';

<Tooltip placement="top">
  <Button slot="trigger" aria-label="Settings"><Icon name="cog" /></Button>
  Open settings
</Tooltip>
```

## Related
[`<vds-button>`](button.md), [`<vds-dialog>`](dialog.md)
