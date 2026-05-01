# Separator

> Tag: `<vds-separator>` · Import: `@verobee/design-elements/components/separator` · React: `Separator` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Separator · Status: v0.2.0-alpha

**Lookup**: separator, divider, hr, rule, horizontal/vertical line.

## Purpose
Visual separator between content sections. Optionally semantic.

## When to use
- Between sections that don't warrant a heading.
- Inside menus to group items.
- Sidebar item dividers.

## When NOT to use
- Around interactive groups → consider `border` on a container instead.
- Between tabs → tabs already provide separation.

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Direction |
| `decorative` | `boolean` | `true` | If false, exposes `role="separator"` for AT |

## A11y
- `decorative=true` → `role="presentation"` (no AT announcement).
- `decorative=false` → `role="separator"` + `aria-orientation`.

## Tokens consumed
- `--vds-theme-border-subtle`

## Examples

### HTML
```html
<section>...</section>
<vds-separator></vds-separator>
<section>...</section>

<div style="display: flex; align-items: center; gap: 12px">
  <span>A</span>
  <vds-separator orientation="vertical" style="height: 24px"></vds-separator>
  <span>B</span>
</div>
```

### React
```tsx
import { Separator } from '@verobee/design-react';

<Separator />
<Separator orientation="vertical" style={{ height: 24 }} />
```

## Related
[`<vds-menu>`](menu.md), [`<vds-card>`](card.md)
