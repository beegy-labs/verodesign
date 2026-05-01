# Tabs

> Tags: `<vds-tabs>`, `<vds-tab>`, `<vds-tab-panel>` · Import: `@verobee/design-elements/components/tabs` · React: `Tabs` + `Tab` + `TabPanel` from `@verobee/design-react` · Pattern: WAI-ARIA AP 1.2 § Tabs · Status: v0.2.0-alpha

**Lookup**: tabs, tabbed, tab panel, tab list.

## Purpose
Switch among views in the same surface.

## When to use
- Top-level sections of a page (Overview / Usage / API).
- Settings categories.

## When NOT to use
- Sequential flow → use `<vds-stepper>` (TBD).
- One panel that's always visible — tabs add overhead.

## Anatomy
```
[ Tab1 | Tab2 | Tab3 ]   ← role=tablist
─────────────
content for Tab1         ← role=tabpanel
```

## Props
| Tag | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| `vds-tabs` | `value` | `string` | — | Controlled active tab value |
| `vds-tabs` | `default-value` | `string` | first tab | Uncontrolled initial |
| `vds-tab` | `value` | `string` | — | Identity match with panel |
| `vds-tab` | `disabled` | `boolean` | `false` | Skip in nav |
| `vds-tab-panel` | `value` | `string` | — | Identity match with tab |

## Events
| Name | detail | Description |
| ---- | ------ | ----------- |
| `change` | `{ value: string }` | Fires when active tab changes |

## A11y (WAI-ARIA AP 1.2 § Tabs)
- `role="tablist"`, `role="tab"`, `role="tabpanel"`.
- Keyboard: ←→ between tabs, Home/End first/last, Tab leaves to first focusable in panel.
- `aria-selected`, `aria-controls`, `aria-labelledby` wired automatically.

## Examples

```html
<vds-tabs default-value="overview">
  <vds-tab value="overview">Overview</vds-tab>
  <vds-tab value="usage">Usage</vds-tab>
  <vds-tab-panel value="overview">Overview content</vds-tab-panel>
  <vds-tab-panel value="usage">Usage content</vds-tab-panel>
</vds-tabs>
```

```tsx
import { Tabs, Tab, TabPanel } from '@verobee/design-react';

<Tabs defaultValue="overview" onChange={(e) => log(e.detail.value)}>
  <Tab value="overview">Overview</Tab>
  <Tab value="usage">Usage</Tab>
  <TabPanel value="overview">Overview content</TabPanel>
  <TabPanel value="usage">Usage content</TabPanel>
</Tabs>
```

## Related
[`<vds-menu>`](menu.md), [`<vds-card>`](card.md)
