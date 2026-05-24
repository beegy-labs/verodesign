# Switch

> Tag: `<vds-switch>` · React: `Switch` · Status: v0.2.0-alpha · APG pattern: Switch

## Purpose
Immediate on/off control for settings and preferences.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | A state change that takes effect immediately. |
| Use | Binary preferences where “on/off” wording is clearer than checked/unchecked. |
| Do not use | Multi-select forms submitted later; use Checkbox. |
| Do not use | Mutually exclusive choices; use radio-group patterns. |

## Design rationale
Switch separates immediate-setting semantics from checkbox form semantics while still preserving FACE and validation support.

## A11y narrative
Implements APG switch behavior with `aria-checked`, keyboard toggling, and form-associated value submission.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-switch>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `checked` | `checked` | `boolean` | `false` |
| `disabled` | `disabled` | `boolean` | `false` |
| `required` | `required` | `boolean` | `false` |
| `name` | `name` | `string | undefined` | — |
| `value` | `value` | `string` | `on` |
| `size` | `size` | `Size` | `md` |

#### Slots
None.

#### Events
| Name | Description |
| ---- | ----------- |
| `change` | { detail: { checked: boolean } } |

#### CSS Variables
None.

#### CSS Parts
None.
<!-- CEM:END -->

## Examples
```html
<vds-switch checked>Dark mode</vds-switch>
```

```tsx
import { Switch } from '@verobee/design-react';

<Switch checked={dark}>Dark mode</Switch>
```

