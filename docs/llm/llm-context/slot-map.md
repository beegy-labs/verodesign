# Slot Map

> CDD Layer 2 — Slot to consumer usage mapping | **Last Updated**: 2026-04-30

Maps each semantic slot to where it's typically consumed in real UI. Helps LLM agents pick correct slot for a given UI need.

## Core slot group

| Slot | Typical use | Common UI element |
| ---- | ----------- | ----------------- |
| `theme.bg.page` | Page-level background | `<body>` background |
| `theme.bg.card` | Surface above page | Cards, panels, modals |
| `theme.bg.elevated` | Elevated surface (slight contrast) | Dropdowns, tooltips, popovers |
| `theme.bg.hover` | Hover state surface | Hovered list items, button hover |
| `theme.bg.muted` | Subtle background | Code blocks, info boxes |
| `theme.bg.inverse` | Inverted surface | Dark elements on light theme |
| `theme.text.primary` | Primary readable text | Body copy, headings |
| `theme.text.secondary` | Supporting text | Subheadings, descriptions |
| `theme.text.dim` | De-emphasized text | Metadata, captions |
| `theme.text.faint` | Decorative text | Hints, placeholders |
| `theme.text.bright` | High emphasis text | Important data |
| `theme.text.inverse` | Text on inverted surface | Dark theme text on light bg |
| `theme.border.subtle` | Soft separator | Dividers between sections |
| `theme.border.default` | Standard border | Cards, inputs |
| `theme.border.strong` | Pronounced border | Hovered/active inputs |
| `theme.border.focus` | Focus indicator | `:focus-visible` outline |
| `theme.primary` | Brand emphasis | Primary buttons, brand accents |
| `theme.primary.foreground` | Text on primary | Button label on `theme.primary` |
| `theme.primary.ring` | Focus ring on primary | Active state ring |
| `theme.destructive` | Destructive action | Delete buttons, danger states |
| `theme.destructive.foreground` | Text on destructive | Delete button label |
| `theme.status.success` | Success indicator | Success badges, checkmarks |
| `theme.status.error` | Error indicator | Error badges, X icons |
| `theme.status.warning` | Warning indicator | Warning banners |
| `theme.status.info` | Informational | Info badges |
| `theme.status.neutral` | Neutral state | Pending, draft labels |
| `theme.status.{x}.fg` | Status foreground | Status text variants |
| `theme.chart.{1-5}` | Chart series colors | Data viz |

## Web slot group

| Slot | Typical use |
| ---- | ----------- |
| `breakpoint.xs` (360) | Small mobile responsive cutoff |
| `breakpoint.sm` (480) | Large mobile |
| `breakpoint.md` (768) | Tablet portrait |
| `breakpoint.lg` (1024) | Tablet landscape / small laptop |
| `breakpoint.xl` (1280) | Laptop |
| `breakpoint.2xl` (1536) | Desktop |
| `breakpoint.3xl` (1920) | Dashboard / large desktop |
| `zindex.base` (0) | Default flow |
| `zindex.raised` (10) | Hover lift |
| `zindex.dropdown` (100) | Dropdown menus |
| `zindex.sticky` (200) | Sticky headers |
| `zindex.overlay` (300) | Dimmed background |
| `zindex.modal` (400) | Modal dialogs |
| `zindex.popover` (500) | Popovers |
| `zindex.tooltip` (600) | Tooltips |
| `zindex.toast` (700) | Toasts / notifications |
| `zindex.max` (9999) | Escape hatch (avoid) |

## Spacing slot guidance

| Step | Typical use |
| ---- | ----------- |
| `spacing.0.5` (2px) | Hairline gap |
| `spacing.1` (4px) | Tight icon padding |
| `spacing.2` (8px) | Inline element gap |
| `spacing.3` (12px) | Small section gap |
| `spacing.4` (16px) | Default body padding |
| `spacing.6` (24px) | Card internal padding |
| `spacing.8` (32px) | Section gap |
| `spacing.12` (48px) | Major section gap |
| `spacing.16` (64px) | Hero section padding |
| `spacing.24` (96px) | Page-level gap |

## Decision rules for slot picking

| If you need to | Use slot |
| -------------- | -------- |
| Color a button background — primary action | `theme.primary` |
| Color a button background — secondary | `theme.bg.elevated` |
| Color a button background — danger | `theme.destructive` |
| Card background | `theme.bg.card` |
| Page background | `theme.bg.page` |
| Hover bg | `theme.bg.hover` |
| Body text | `theme.text.primary` |
| Caption / metadata | `theme.text.dim` or `theme.text.faint` |
| Default border | `theme.border.default` |
| Focus ring | `theme.border.focus` (or `theme.primary.ring`) |
| Success indicator | `theme.status.success` |
| Chart series | `theme.chart.{N}` |

## Reverse map (find slot from common request)

| User request | Slot |
| ------------ | ---- |
| "blue button" | `theme.primary` (regardless of theme color) |
| "red error" | `theme.status.error` |
| "background of the dashboard card" | `theme.bg.card` |
| "subtle text" | `theme.text.dim` |
| "page background" | `theme.bg.page` |
| "border around input" | `theme.border.default` |
| "glow when input focused" | `theme.border.focus` or `theme.primary.ring` |
