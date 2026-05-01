# WCAG Contrast Policy

> CDD Layer 2 — Contrast validation rules | **Last Updated**: 2026-04-30

## Standards

| Standard | Status |
| -------- | ------ |
| WCAG 2.1 | Current legal baseline (US ADA, EU EAA, Section 508) |
| WCAG 2.2 | 2023 release; contrast rules unchanged from 2.1 |
| WCAG 3 (APCA) | Working draft; deferred until stable |

verodesign enforces WCAG 2.1 minimums. Forward compatibility with 2.2 verified.

## Tier requirements (mandatory)

| Tier | Requirement | Exception |
| ---- | ----------- | --------- |
| Body text / meaningful information | AA 4.5:1 | Forbidden |
| Brand primary emphasis | AAA 7:1 | Forbidden |
| Large text (≥18pt or ≥14pt bold) | AA 3:1 | None |
| UI component / graphical boundary | AA 3:1 | None |
| Decorative text (faint, hint) | AA 3:1 + `$extensions.verobee.contrast.allow` declaration | Required to override |
| Inactive borders, dividers (no text) | None | Decorative only |

WCAG Level A does NOT define text contrast — it covers other accessibility concerns. AA is the floor for contrast.

## Pairs validated at build (per theme, per mode)

| Foreground token | Background token | Required |
| ---------------- | ---------------- | -------- |
| `theme.text.primary` | `theme.bg.page` | AAA 7:1 |
| `theme.text.primary` | `theme.bg.card` | AAA 7:1 |
| `theme.text.secondary` | `theme.bg.card` | AAA 7:1 |
| `theme.text.dim` | `theme.bg.card` | AAA 7:1 |
| `theme.text.faint` | `theme.bg.card` | AA 4.5:1 (or AA-large 3:1 with override) |
| `theme.primary` | `theme.bg.page` | AAA 7:1 |
| `theme.primary.foreground` | `theme.primary` | AAA 7:1 |
| `theme.status.success` | `theme.bg.card` | AAA 7:1 |
| `theme.status.error` | `theme.bg.card` | AAA 7:1 |
| `theme.status.warning` | `theme.bg.card` | AAA 7:1 |
| `theme.status.info` | `theme.bg.card` | AAA 7:1 |
| `theme.destructive.foreground` | `theme.destructive` | AAA 7:1 |
| `theme.border.focus` | `theme.bg.page` | AA 3:1 (UI component) |

Both light and dark modes validated independently per theme.

## Build failure output

```
[contrast] FAIL veronex/light: theme.text.faint on theme.bg.card = 3.8:1 (required AA 4.5:1)
[contrast] FAIL verobase/dark: theme.primary on theme.bg.page = 6.2:1 (required AAA 7:1)
[contrast] PASS 24 / 26

Build aborted. Fix theme tokens or declare contrast.allow override (AA-large with rationale).
```

## Implementation

| Component | Tool |
| --------- | ---- |
| Ratio computation | `wcag-contrast` npm package |
| Color parsing (OKLCH → sRGB) | `culori` |
| Validation script | `scripts/validate-contrast.mjs` (called by `npm run build`) |
| Report | `dist/data/contrast-report.json` (full pair list with ratios per theme/mode) |

## Exception process

Downgrade requires explicit declaration:

```json
{
  "theme": {
    "text": {
      "faint": {
        "$value": "{color.slate.5}",
        "$type": "color",
        "$extensions": {
          "verobee": {
            "contrast": {
              "allow": "AA-large",
              "rationale": "Decorative use only — never primary information"
            }
          }
        }
      }
    }
  }
}
```

| Allow value | Effective requirement |
| ----------- | --------------------- |
| (none) | AA 4.5:1 strict |
| `AA-large` | AA 3:1 (large text rule) |
| (no other values permitted) | — |

`AA-large` requires `rationale` (non-empty string). Build emits warning but does not abort.

## Audit workflow

| Action | Workflow |
| ------ | -------- |
| Re-validate all themes | `.add/contrast-audit.md` |
| Audit specific token usage | `dist/data/contrast-report.json` |
| Update WCAG standard | Track in `docs/llm/research/llm-knowledge-gaps.md` |

## Forward compatibility

| Future standard | Action |
| --------------- | ------ |
| WCAG 3 (APCA) stable | Add APCA Lc validation alongside WCAG 2.1 |
| `prefers-contrast: more` mainstream | Add `high-contrast` mode to themes |
| Color-blind simulation in build | Add deuteranopia/protanopia/tritanopia checks |
