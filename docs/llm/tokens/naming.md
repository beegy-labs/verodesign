# Naming Conventions

> CDD Layer 2 — Token naming rules | **Last Updated**: 2026-04-30

## Primitive naming

Format: `<category>.<scale>.<step>` — describes appearance only, brand-agnostic, platform-agnostic.

| Category | Example | Scale strategy |
| -------- | ------- | -------------- |
| color | `color.slate.7` | 12-step OKLCH L scale (1-12), 12 hue families |
| spacing | `spacing.4` | numeric steps (1=4px, 2=8px, 4=16px, ...) |
| radius | `radius.md` | none, xs, sm, md, lg, xl, 2xl, full |
| font.size | `font.size.base` | xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl |
| font.weight | `font.weight.500` | 400, 500, 600, 700 |
| font.family | `font.family.sans` | sans, mono |
| font.lineHeight | `font.lineHeight.normal` | none, tight, snug, normal, relaxed, loose |
| font.letterSpacing | `font.letterSpacing.normal` | tight, snug, normal, wide, wider |
| shadow | `shadow.3` | 0 to 6 (Material elevation) |
| duration | `duration.medium` | instant, fast, medium, slow, slower |
| easing | `easing.ease-out` | linear, ease-out, ease-in, ease-in-out, spring |
| opacity | `opacity.50` | 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100 |

## Semantic naming

Format: `theme.<domain>.<role>[.<variant>]` — describes purpose, NEVER appearance.

| Domain | Roles |
| ------ | ----- |
| bg | page, card, elevated, hover, muted, inverse |
| text | primary, secondary, dim, faint, bright, inverse |
| border | subtle, default, strong, focus |
| primary | (root), foreground, ring |
| destructive | (root), foreground |
| status | success, error, warning, info, neutral (each with optional `-fg`) |
| accent | (project-specific within theme) |
| chart | 1, 2, 3, 4, 5 |

## Web slot group naming

| Domain | Slots |
| ------ | ----- |
| breakpoint | xs, sm, md, lg, xl, 2xl, 3xl |
| zindex | base, raised, dropdown, sticky, overlay, modal, popover, tooltip, toast, max |
| cursor | (project-specific) |

## Naming rules

| Rule | Reason |
| ---- | ------ |
| Semantic names describe purpose, never appearance | Decouples token name from value; theme can change without renames |
| No theme name in semantic | `theme.bg.page` not `theme.veronex.bg.page` |
| No platform name in semantic | `theme.bg.page` not `theme.css.bg.page` |
| Lowercase, dot-separated | DTCG convention; transforms cleanly to CSS variable |
| One token per concept | Avoid `bg.page-light` and `bg.page-dark` — use mode switching |
| Modes in file location, not name | Light/dark live in `themes/{name}-light.json` and `themes/{name}-dark.json`; semantic name unchanged |

## Forbidden patterns

| Bad | Reason | Good |
| --- | ------ | ---- |
| `theme.green-primary` | Encodes appearance | `theme.primary` |
| `theme.button-bg` | Component-specific in semantic | Move to `@verobee/design-react` component tier |
| `theme.bg.page.light` | Mode in name | Mode lives in file (`themes/default-light.json`), name stays `theme.bg.page` |
| `--vds-theme-primary-veronex` | Brand in CSS variable | Brand split happens via theme files |
| `theme.css-class-primary` | Web/CSS in semantic | Use `theme.primary` |
| `theme.web-bg-page` | Platform in semantic | Use `theme.bg.page` |

## CSS Variable mapping

| DTCG | CSS Variable |
| ---- | ------------ |
| `theme.bg.page` | `--vds-theme-bg-page` |
| `theme.text.primary` | `--vds-theme-text-primary` |
| `theme.status.success.fg` | `--vds-theme-status-success-fg` |
| `radius.md` | `--vds-radius-md` |
| `color.slate.7` | `--vds-color-slate-7` (only emitted if `tailwind-plugin` consumer) |
| `spacing.4` | `--vds-spacing-4` |

Transform pipeline:
1. Lowercase
2. Replace dots with dashes
3. Prefix `--vds-`

## Utility class mapping

Utility class follows pattern: `vds-<property>-<token>`. Property is the CSS property family.

| Token | Property family | Utility class |
| ----- | --------------- | ------------- |
| `theme.bg.page` | bg | `vds-bg-page` |
| `theme.text.primary` | text | `vds-text-primary` |
| `theme.primary` | (multi) | `vds-bg-primary`, `vds-text-primary`, `vds-border-primary` |
| `spacing.4` | (multi) | `vds-p-4`, `vds-m-4`, `vds-gap-4`, `vds-pt-4`, ... |
| `radius.md` | rounded | `vds-rounded-md` |
| `shadow.3` | shadow | `vds-shadow-3` |
| `breakpoint.md` | (responsive prefix) | `md:vds-...` |

## Boolean checklist before adding a token name

| Check | Required |
| ----- | -------- |
| Lowercase, dot-separated | Yes |
| Describes purpose if semantic, appearance if primitive | Yes |
| Brand-agnostic if not in `themes/` | Yes |
| Platform-agnostic if in `core` slot group | Yes |
| Existing token covers same concept? | If yes, reject duplicate |
| Conflicts with existing utility class generation? | Run dedup gate |
