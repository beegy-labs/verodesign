# Binary Pill Toggle

> Tag: `<vds-binary-pill-toggle>`, `<vds-binary-pill-toggle-option>` · React: `BinaryPillToggle` · Status: canonical · APG pattern: Radio Group

## Purpose
Two-option segmented choice with form submission support.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | A mutually exclusive binary choice such as Buy/Sell or On/Off. |
| Use | Cases where both options should remain visible at once. |
| Do not use | Tabs-style panel navigation where the selection swaps visible panels; use Tabs when the control is for view navigation rather than form choice. |
| Do not use | A delayed boolean form control where checkbox semantics fit better. |

## Design rationale
BinaryPillToggle is a form choice, not a navigation primitive. Tabs bind labels to panels and move users across views, while this control keeps both options visible as one submitted field value. The pill treatment preserves immediate comparison between two mutually exclusive outcomes without implying route or panel changes.

## A11y narrative
Implements the APG radio-group contract: the host exposes `radiogroup`, each option behaves as a radio, roving tabindex keeps one tabbable option, Arrow keys move selection, Home and End jump to the first and last enabled options, Space commits the focused option, and FACE submits the selected value with the owning form.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-binary-pill-toggle>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `emphasis` | `emphasis` | `Emphasis` | `neutral` |
| `size` | `size` | `Size` | `md` |
| `disabled` | `disabled` | `boolean` | `false` |
| `ariaLabel` | `aria-label` | `string | null` | `null` |

#### Slots
None.

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.

### `<vds-binary-pill-toggle-option>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `disabled` | `disabled` | `boolean` | `false` |
| `checked` | `checked` | `boolean` | `false` |
| `emphasis` | `emphasis` | `Emphasis` | `neutral` |
| `size` | `size` | `Size` | `md` |

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
<vds-binary-pill-toggle name="resolution" value="approve" emphasis="success" aria-label="Review decision">
  <vds-binary-pill-toggle-option value="approve">Approve</vds-binary-pill-toggle-option>
  <vds-binary-pill-toggle-option value="reject" emphasis="destructive">Reject</vds-binary-pill-toggle-option>
</vds-binary-pill-toggle>
```

```tsx
import { BinaryPillToggle } from '@verobee/design-react';

<BinaryPillToggle
  name="resolution"
  aria-label="Review decision"
  value={resolution}
  emphasis="success"
  onVdsChange={(event) => setResolution(event.detail.value)}
>
  <button value="approve">Approve</button>
  <button value="reject">Reject</button>
</BinaryPillToggle>
```

