# Button

> Tag: `<vds-button>` · Import: `@verobee/design-elements/components/button` · React: `Button` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Button · Status: v0.2.0-alpha

**Lookup**: button, action, submit, btn, cta, call to action.

## Purpose
Action trigger. Form-associated when `type="submit" | "reset"`.

## When to use
- Triggering an action (form submit, navigation, dialog open, async work).
- Anchoring a primary or secondary action in a flow.

## When NOT to use
- Pure navigation → use `<a>` (anchor).
- Toggle on/off → use `<vds-switch>`.

## Anatomy
```
[ start-slot  label  end-slot ]
```
Loading replaces `start-slot` with a spinner.

## Props (attributes)
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `"solid"` \| `"soft"` \| `"outline"` \| `"ghost"` | `"solid"` | Fill style |
| `tone` | `"primary"` \| `"accent"` \| `"neutral"` \| `"destructive"` | `"primary"` | Color role |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |
| `type` | `"button"` \| `"submit"` \| `"reset"` | `"button"` | Form behavior |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Show spinner, prevent clicks |
| `name` | `string` | — | Form name (for submit) |
| `value` | `string` | — | Form value |
| `aria-label` | `string` | — | Accessible name when no visible label |

## Slots
| Name | Description |
| ---- | ----------- |
| (default) | Button label |
| `start` | Leading icon |
| `end` | Trailing icon |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `click` | (native MouseEvent) | Suppressed when `disabled` or `loading` |

## A11y (WAI-ARIA AP 1.2 § Button)
- `role="button"` set via ElementInternals.
- Keyboard: Enter and Space activate.
- `aria-disabled` reflected from `disabled` attribute.
- Focus ring uses `--vds-theme-border-focus` (2px outline + 2px offset).

## Tokens consumed
- `--vds-theme-{primary,accent,neutral,destructive}` (with `-fg`)
- `--vds-theme-bg-{muted,hover}`, `--vds-theme-text-primary`
- `--vds-theme-border-{default,focus}`
- `--vds-spacing-{1_5,2,3,4,5}`, `--vds-radius-md`, `--vds-border-width-1`
- `--vds-font-{size-{sm,base,lg},weight-500,family-sans}`
- `--vds-duration-fast`, `--vds-easing-ease-out`

## Examples

### HTML
```html
<vds-button>Save</vds-button>
<vds-button variant="outline" tone="primary">Cancel</vds-button>
<vds-button tone="destructive" loading>Delete</vds-button>

<form action="/save" method="post">
  <vds-button type="submit">Submit</vds-button>
</form>
```

### React
```tsx
import { Button } from '@verobee/design-react';

<Button onClick={() => save()}>Save</Button>
<Button variant="outline" tone="primary">Cancel</Button>
<Button tone="destructive" loading>Delete</Button>
```

## Related
[`<vds-text-field>`](text-field.md), [`<vds-dialog>`](dialog.md)
