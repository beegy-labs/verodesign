# Tabs

> Tag: `<vds-tabs>`, `<vds-tab>`, `<vds-tab-panel>` · React: `Tabs + Tab + TabPanel` · Status: v0.2.0-alpha · APG pattern: Tabs

## Purpose
Single-surface view switching using the APG tabs model.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Peer views that share one container. |
| Use | Short, mutually exclusive sections where persistent visibility is valuable. |
| Do not use | Linear multi-step flows. |
| Do not use | Long content where all sections should remain visible. |

## Design rationale
Tabs owns roving focus and panel wiring while keeping labels and panel content fully consumer-authored.

## A11y narrative
Implements APG tabs semantics with `tablist`, `tab`, `tabpanel`, roving focus, Home/End, and managed selected state.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-tabs>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `orientation` | `data-orientation` | `'horizontal' | 'vertical'` | `horizontal` |
| `activation` | `activation` | `'auto' | 'manual'` | `auto` |
| `variant` | `variant` | `'underline' | 'segmented'` | `underline` |
| `indicator` | `indicator` | `'none' | 'underline' | 'slide'` | `none` |

#### Slots
None.

#### Events
| Name | Description |
| ---- | ----------- |
| `vds-change` | dispatched on active tab change with detail { value } |

#### CSS Variables
None.

#### CSS Parts
None.

### `<vds-tab>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |
| `disabled` | `disabled` | `boolean` | `false` |

#### Slots
None.

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
None.

### `<vds-tab-panel>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `value` | `value` | `string` | `` |

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
<vds-tabs default-value="overview">
  <vds-tab value="overview">Overview</vds-tab>
  <vds-tab-panel value="overview">Overview content</vds-tab-panel>
</vds-tabs>
```

```tsx
import { Tabs, Tab, TabPanel } from '@verobee/design-react';

<Tabs defaultValue="overview"><Tab value="overview">Overview</Tab></Tabs>
```

