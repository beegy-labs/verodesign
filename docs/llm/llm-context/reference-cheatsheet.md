# Reference Cheatsheet

> CDD Layer 2 — "I want X effect" → "use this token" quick lookup | **Last Updated**: 2026-04-30

## Color use cases

| Effect | Token | CSS Variable |
| ------ | ----- | ------------ |
| Page background | `theme.bg.page` | `var(--vds-theme-bg-page)` |
| Card background | `theme.bg.card` | `var(--vds-theme-bg-card)` |
| Hover background | `theme.bg.hover` | `var(--vds-theme-bg-hover)` |
| Body text | `theme.text.primary` | `var(--vds-theme-text-primary)` |
| Subdued text | `theme.text.secondary` | `var(--vds-theme-text-secondary)` |
| Caption / metadata | `theme.text.dim` | `var(--vds-theme-text-dim)` |
| Primary button | `theme.primary` (bg) + `theme.primary.foreground` (text) | `var(--vds-theme-primary)` |
| Danger button | `theme.destructive` (bg) + `theme.destructive.foreground` (text) | `var(--vds-theme-destructive)` |
| Border | `theme.border.default` | `var(--vds-theme-border-default)` |
| Focus ring | `theme.border.focus` | `var(--vds-theme-border-focus)` |
| Success badge | `theme.status.success` (bg) + `theme.status.success.fg` (text) | `var(--vds-theme-status-success)` |
| Error badge | `theme.status.error` | same |
| Chart line 1 | `theme.chart.1` | `var(--vds-theme-chart-1)` |

## Spacing use cases

| Effect | Token | px |
| ------ | ----- | -- |
| Tight gap (icon + text) | `spacing.2` | 8 |
| Button internal padding | `spacing.3` (vertical), `spacing.4` (horizontal) | 12 / 16 |
| Card internal padding | `spacing.6` | 24 |
| Section gap | `spacing.8` to `spacing.12` | 32 to 48 |
| Page section gap | `spacing.16` | 64 |
| Hero spacing | `spacing.24` | 96 |

## Typography use cases

| Effect | Token | px |
| ------ | ----- | -- |
| Hint / micro UI | `font.size.xs` | 12 |
| Small UI text (button, label) | `font.size.sm` | 14 |
| Body | `font.size.base` | 16 |
| Comfortable read | `font.size.lg` | 18 |
| Subhead | `font.size.xl` | 21 |
| h3 | `font.size.2xl` | 28 |
| h2 | `font.size.3xl` | 38 |
| h1 | `font.size.4xl` | 51 |
| Display | `font.size.5xl` | 67 |
| Hero display | `font.size.6xl` | 90 |

| Weight effect | Token |
| ------------- | ----- |
| Body normal | `font.weight.400` |
| UI label | `font.weight.500` |
| Subhead | `font.weight.600` |
| Heading | `font.weight.700` |

| Line height effect | Token | Value |
| ------------------ | ----- | ----- |
| Display headings | `font.lineHeight.tight` | 1.25 |
| Body | `font.lineHeight.normal` | 1.5 |
| Loose paragraph | `font.lineHeight.relaxed` | 1.75 |

## Radius use cases

| Effect | Token | px |
| ------ | ----- | -- |
| Sharp / no radius | `radius.none` | 0 |
| Subtle round | `radius.xs` | 2 |
| Inputs / small buttons | `radius.sm` | 4 |
| Standard cards / buttons | `radius.md` | 8 |
| Modals | `radius.lg` | 12 |
| Hero cards | `radius.xl` | 16 |
| Major sections | `radius.2xl` | 24 |
| Pills / avatars | `radius.full` | 9999 |

## Shadow use cases

| Effect | Token |
| ------ | ----- |
| Resting card | `shadow.1` |
| Hover lift | `shadow.2` |
| Dropdown | `shadow.3` |
| Modal | `shadow.4` |
| Toast | `shadow.5` |
| Major overlay | `shadow.6` |

## Animation use cases

| Effect | Token | ms |
| ------ | ----- | -- |
| Reduced motion | `duration.instant` | 0 |
| Button feedback | `duration.fast` | 100 |
| Hover transition | `duration.medium` | 200 |
| Layout shift | `duration.slow` | 400 |
| Hero animation | `duration.slower` | 700 |

| Easing | Token |
| ------ | ----- |
| Mechanical | `easing.linear` |
| Entrance (decelerate) | `easing.ease-out` |
| Exit (accelerate) | `easing.ease-in` |
| Standard transition | `easing.ease-in-out` |
| Springy bounce | `easing.spring` |

## Z-index use cases

| Layer | Token |
| ----- | ----- |
| Default flow | `zindex.base` |
| Hover lift | `zindex.raised` |
| Dropdown menu | `zindex.dropdown` |
| Sticky header | `zindex.sticky` |
| Dim overlay | `zindex.overlay` |
| Modal | `zindex.modal` |
| Popover | `zindex.popover` |
| Tooltip | `zindex.tooltip` |
| Toast | `zindex.toast` |
| Escape hatch (avoid) | `zindex.max` |

## Utility class quick reference

| CSS need | Utility class |
| -------- | ------------- |
| Background | `vds-bg-{slot}` (e.g., `vds-bg-page`, `vds-bg-primary`) |
| Text color | `vds-text-{slot}` |
| Border color | `vds-border-{slot}` |
| Padding | `vds-p-{step}`, `vds-px-{step}`, `vds-py-{step}`, `vds-pt-{step}`... |
| Margin | `vds-m-{step}`, ... |
| Gap | `vds-gap-{step}` |
| Radius | `vds-rounded-{size}` |
| Shadow | `vds-shadow-{level}` |
| Z-index | `vds-z-{layer}` |
| Responsive prefix | `{breakpoint}:vds-...` (e.g., `md:vds-bg-card`) |
| Mode prefix | (none — themes use `[data-mode]` attribute) |

## Common combinations

```css
/* Default button */
.button {
  background: var(--vds-theme-primary);
  color: var(--vds-theme-primary-foreground);
  padding: var(--vds-spacing-3) var(--vds-spacing-4);
  border-radius: var(--vds-radius-md);
  font-size: var(--vds-font-size-sm);
  font-weight: var(--vds-font-weight-500);
  line-height: var(--vds-font-lineHeight-tight);
  transition: background var(--vds-duration-fast) var(--vds-easing-ease-out);
}
```

```html
<!-- Same as utility classes -->
<button class="vds-bg-primary vds-text-primary-fg vds-py-3 vds-px-4 vds-rounded-md vds-text-sm vds-font-medium">
  Click
</button>
```
