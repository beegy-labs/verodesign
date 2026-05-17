# Glass Surface

Status: experimental (component exists; canonization pending soak).

## Purpose

`GlassSurface` is a **surgical** frosted surface for **floating layers only** (tab bar container, dialogs, bottom sheets).

## Tokens

- Blur: `--vds-blur-*`
- Elevation: `--vds-elevation-*`
- Borders: `--vds-theme-border-*`

## API

- Props: `React.HTMLAttributes<HTMLDivElement>` + `children`
- `strength?: "subtle" | "base" | "strong"` (default: `"base"`)

## Accessibility

- Text is rendered using `--vds-theme-text-primary`.
- Use glass only where text density is low and readability is maintained.
- Contrast policy: WCAG 2.1 **AA minimum** for body text (4.5:1). Higher is optional.

## Usage rules (non-negotiable)

- Allowed: floating layers (dialogs/sheets/portal nav).
- Forbidden: dense content surfaces (records lists, wealth tables).
- Always pair blur with separation (border/elevation) to maintain hierarchy.

## Example

```tsx
<GlassSurface strength="base" style={{ borderRadius: 'var(--vds-radius-lg)' }}>
  <header>Title</header>
  <div>Content</div>
</GlassSurface>
```
