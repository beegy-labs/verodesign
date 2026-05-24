# Button

> Tag: `<vds-button>` · React: `Button` · Status: v0.2.0-alpha · APG pattern: Button

## Purpose
Action trigger with FACE-backed submit and reset behavior.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Primary and secondary actions in forms, dialogs, and toolbars. |
| Use | Cases where async/loading and semantic tone need to stay inside the system contract. |
| Do not use | Pure navigation that should remain an anchor. |
| Do not use | Persistent selection state; use checkbox, switch, or tabs depending on the pattern. |

## Design rationale
Button keeps the API additive and token-driven: the public contract is size, tone, variant, and form semantics, not arbitrary visual knobs.

## A11y narrative
Uses APG button behavior with keyboard activation, disabled signaling, and coarse-pointer touch-target expansion without changing fine-pointer geometry.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-button>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `variant` | `variant` | `Variant` | `solid` |
| `tone` | `tone` | `Tone` | `primary` |
| `size` | `size` | `Size` | `md` |
| `type` | `type` | `'button' | 'submit' | 'reset'` | `button` |
| `disabled` | `disabled` | `boolean` | `false` |
| `loading` | `data-loading` | `boolean` | `false` |
| `name` | `name` | `string | undefined` | — |
| `value` | `value` | `string | undefined` | — |
| `ariaLabelText` | `aria-label` | `string | null` | `null` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | button label |
| `start` | leading icon |
| `end` | trailing icon |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
| Name | Description |
| ---- | ----------- |
| `button` | the underlying button element |
<!-- CEM:END -->

## Examples
```html
<vds-button>Save</vds-button>
<vds-button tone="destructive" loading>Delete</vds-button>
```

```tsx
import { Button } from '@verobee/design-react';

<Button variant="outline">Cancel</Button>
```

