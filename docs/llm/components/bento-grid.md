# Bento Grid

Status: experimental (component exists; canonization pending soak).

## Purpose

`BentoGrid` + `BentoItem` provide a **constrained** grid system for module hierarchy (“bento layout”).

## Tokens

- Spacing: `--vds-spacing-*`
- Radius: `--vds-radius-*`
- Elevation: `--vds-elevation-*`

## API

### `BentoGrid`

- Role: layout container
- Props: `React.HTMLAttributes<HTMLDivElement>` + `children`
- Behavior: fixed 4-column grid, `gap: var(--vds-spacing-3)`

### `BentoItem`

- Role: module card
- Props: `colSpan?: 1|2|3|4`, `rowSpan?: 1|2|3`
- Default: `colSpan=2`, `rowSpan=1`
- Styling: card surface, `--vds-elevation-2`, border + radius

## Accessibility

- The grid itself is neutral layout; semantics must be provided by the content (headings, links, buttons).

## Usage rules

- Do not use arbitrary auto-placement as a content strategy; spans must be intentional.
- If a screen becomes dense/scroll-heavy, prefer calm flat lists over bento.

## Example

```tsx
<BentoGrid>
  <BentoItem colSpan={4}>Hero</BentoItem>
  <BentoItem colSpan={2} rowSpan={2}>Progress</BentoItem>
  <BentoItem colSpan={2}>Shelf</BentoItem>
</BentoGrid>
```

