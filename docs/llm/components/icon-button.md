# Icon Button

> Tag: `<vds-icon-button>` · React: `IconButton` · Status: v0.2.0-alpha · APG pattern: Button

## Purpose
Square icon-only button with required accessible naming.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Toolbar actions and dense trailing actions. |
| Use | A compact affordance where visible text would add noise. |
| Do not use | Primary CTA where text matters. |
| Do not use | A toggle state that needs clearer two-state semantics. |

## Design rationale
IconButton intentionally reuses the system button contract but narrows the content model to icon-only interaction.

## A11y narrative
Requires an accessible name through `aria-label` or equivalent. Keyboard and disabled behavior match the base button pattern.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-icon-button>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `variant` | `variant` | `Variant` | `ghost` |
| `tone` | `tone` | `Tone` | `neutral` |
| `size` | `size` | `Size` | `md` |
| `disabled` | `disabled` | `boolean` | `false` |
| `ariaLabelText` | `aria-label` | `string | null` | `null` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | icon content (svg recommended) |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
| Name | Description |
| ---- | ----------- |
| `button` | underlying button |
<!-- CEM:END -->

## Examples
```html
<vds-icon-button aria-label="More actions">...</vds-icon-button>
```

```tsx
import { IconButton } from '@verobee/design-react';

<IconButton aria-label="Delete">...</IconButton>
```

