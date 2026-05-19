# EntryDialog

> React: `EntryDialog` from `@verobee/design-react` · Wraps: `<vds-dialog>` · Status: 2026-05-13 canonical

## Purpose
Canonical “row add/edit” form dialog: title/description + body slot + footer actions.

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `open` | `boolean` | — | Visibility |
| `onClose` | `() => void` | — | Close handler (backdrop/Esc/cancel) |
| `title` | `string` | — | Dialog title |
| `description` | `string` | — | Optional supporting text |
| `children` | `ReactNode` | — | Form content slot |
| `onConfirm` | `() => void \| Promise<void>` | — | Confirm action |
| `confirmLabel` | `string` | `"확인"` | Confirm button label |
| `cancelLabel` | `string` | `"취소"` | Cancel button label |
| `confirmDisabled` | `boolean` | `false` | Disable confirm |
| `destructive` | `boolean` | `false` | Confirm tone becomes destructive |

## Slot model
- Header: rendered via `slot="header"`.
- Footer: rendered via `slot="footer"`.

## A11y
- Delegates to `<vds-dialog>` (focus trap, Esc/backdrop dismiss).

## Tokens consumed
- `--vds-theme-*` only (no hardcoded colors)

## Examples
```tsx
import { EntryDialog, TextField } from '@verobee/design-react';

<EntryDialog open={open} title="Add" onClose={close} onConfirm={save}>
  <TextField value={name} onInput={(e) => setName(e.currentTarget.value)} />
</EntryDialog>
```

