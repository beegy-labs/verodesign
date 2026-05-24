# Heading

> Tag: `<vds-heading>` · React: `Heading` · Status: v0.2.0-alpha · APG pattern: none (typography primitive)

## Purpose
Token-bound heading primitive for system typography hierarchy.

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
| Use | Reusable section and page headings inside system-authored UI. |
| Use | Cases where heading level and visual size should stay coordinated. |
| Do not use | Body copy or metadata. |
| Do not use | A consumer-specific display treatment that diverges from the canonical scale. |

## Design rationale
Heading avoids ad hoc type stacks. It centralizes typographic role choices while letting consumers pick semantic level intentionally.

## A11y narrative
The chosen level still matters to document outline and screen-reader navigation. Consumers should not skip heading levels without a structural reason.

## API
> Auto-generated from `packages/design-elements/dist/custom-elements.json`.

<!-- CEM:START -->
### `<vds-heading>`

#### Props
| Prop | Attribute | Type | Default |
| ---- | --------- | ---- | ------- |
| `level` | `level` | `Level` | `1` |
| `as` | `as` | `AsTag | undefined` | — |
| `tone` | `tone` | `Tone` | `bright` |

#### Slots
| Name | Description |
| ---- | ----------- |
| (default) | heading content (text) |

#### Events
None.

#### CSS Variables
None.

#### CSS Parts
| Name | Description |
| ---- | ----------- |
| `heading` | the underlying h1..h4 element |
<!-- CEM:END -->

## Examples
```html
<vds-heading level="2">Portfolio</vds-heading>
```

```tsx
import { Heading } from '@verobee/design-react';

<Heading level="2">Portfolio</Heading>
```

