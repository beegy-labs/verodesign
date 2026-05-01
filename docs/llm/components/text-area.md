# Text Area

> Tag: `<vds-text-area>` · Import: `@verobee/design-elements/components/text-area` · React: `TextArea` from `@verobee/design-react` · Pattern: native textarea + WAI-ARIA hints · Status: v0.2.0-alpha

**Lookup**: textarea, multi-line, text area, comments, paragraph input.

## Purpose
Multi-line text input. Form-associated.

## When to use
- Comments, descriptions, free-form notes.
- Bio, address (multi-line).

## When NOT to use
- Single-line → `<vds-text-field>`.
- Rich text (bold, links) → use a rich editor (out of vds scope).

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `string` | `""` | Current value |
| `placeholder` | `string` | — | Hint |
| `disabled` | `boolean` | `false` | Disabled |
| `readonly` | `boolean` | `false` | Readonly |
| `required` | `boolean` | `false` | Form required |
| `rows` | `number` | `4` | Initial rows |
| `auto-resize` | `boolean` | `false` | Grow with content |
| `name` | `string` | — | Form field name |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |

## Slots
| Name | Description |
| ---- | ----------- |
| `helper` | Helper / error text below |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `input` | (native) | Fires on every keystroke |
| `change` | `{ value: string }` | Fires on blur |

## A11y
- Internal `<textarea>`.
- Standard textbox semantics.

## Examples

```html
<vds-text-area name="comment" rows="6" placeholder="Your message…"></vds-text-area>
```

```tsx
import { TextArea } from '@verobee/design-react';

<TextArea
  rows={6}
  value={comment}
  onInput={(e) => setComment(e.target.value)}
/>
```

## Related
[`<vds-text-field>`](text-field.md), [`<vds-label>`](label.md)
