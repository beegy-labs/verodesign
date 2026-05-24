# WCAG Contrast Policy

> CDD Layer 2 — Contrast validation rules | **Last Updated**: 2026-05-21

## Standards

| Standard | Status |
| -------- | ------ |
| WCAG 2.2 | Current legal baseline; W3C Recommendation since 2023-10-05 |
| ISO/IEC PAS 9241-161 | WCAG 2.2 aligned accessibility baseline since 2025-09-15 |
| WCAG 3 (APCA) | Working Draft; deferred until stable |

verodesign enforces WCAG 2.2 minimums. WCAG 3/APCA stays deferred until the standard is stable enough to ship as a build gate.

## Tier requirements (mandatory)

| Tier | Requirement | Exception |
| ---- | ----------- | --------- |
| Body text / meaningful information | AA 4.5:1 | Forbidden |
| Brand primary emphasis | AA 4.5:1 baseline + AAA 7:1 optional via `*-strong` slot | `aaa-strict` implements only |
| Large text (≥18pt or ≥14pt bold) | AA 3:1 | None |
| UI component / graphical boundary | AA 3:1 | None |
| Decorative text | AA 3:1 + `$extensions.verobee.contrast.allow` declaration | Required to override |
| Inactive borders, dividers (no text) | None | Decorative only |

WCAG Level A does NOT define text contrast. AA is the legal floor for text contrast in this system.

## Optional implements

| Implements | Meaning | Validator rule |
| ---------- | ------- | -------------- |
| `status` | Brand binds `theme.status.*` and `theme.destructive` surfaces | Status foreground/background pairs must pass AA 4.5:1 |
| `aaa-strict` | Brand opts into dedicated AAA-only strong slots | `*-strong` pairs must exist and pass AAA 7:1 |

If a brand declares `implements: [..., "aaa-strict"]`, it MUST bind the canonical strong slots in `tokens/semantic/aaa-strict.json`. The validator only enforces AAA 7:1 on those `*-strong` slots.
`aaa-strict` is optional; zero opt-in brands is valid, and a brand only enters this audit scope when it adds `aaa-strict` to `implements`.

## Pairs validated at build (per theme, per mode)

| Foreground token | Background token | Required |
| ---------------- | ---------------- | -------- |
| `theme.text.primary` | `theme.bg.page` | AA 4.5:1 |
| `theme.text.primary` | `theme.bg.card` | AA 4.5:1 |
| `theme.text.primary-strong` | `theme.bg.page` | AAA 7:1 (`aaa-strict` implements brand only) |
| `theme.text.secondary` | `theme.bg.card` | AA 4.5:1 |
| `theme.text.dim` | `theme.bg.card` | AA 4.5:1 |
| `theme.text.faint` | `theme.bg.card` | AA 3:1 (decorative) |
| `theme.primary` | `theme.bg.page` | AA 4.5:1 |
| `theme.primary.foreground` | `theme.primary` | AA 4.5:1 |
| `theme.primary-strong.foreground` | `theme.primary-strong` | AAA 7:1 (optional) |
| `theme.status.success` | `theme.bg.card` | AA 4.5:1 (`status` implements) |
| `theme.status.success-strong` | `theme.bg.card` | AAA 7:1 (`aaa-strict` + `status`) |
| `theme.status.error` | `theme.bg.card` | AA 4.5:1 (`status` implements) |
| `theme.status.error-strong` | `theme.bg.card` | AAA 7:1 (`aaa-strict` + `status`) |
| `theme.status.warning` | `theme.bg.card` | AA 4.5:1 (`status` implements) |
| `theme.status.warning-strong` | `theme.bg.card` | AAA 7:1 (`aaa-strict` + `status`) |
| `theme.status.info` | `theme.bg.card` | AA 4.5:1 (`status` implements) |
| `theme.status.info-strong` | `theme.bg.card` | AAA 7:1 (`aaa-strict` + `status`) |
| `theme.status.neutral` | `theme.bg.card` | AA 4.5:1 (`status` implements) |
| `theme.status.neutral-strong` | `theme.bg.card` | AAA 7:1 (`aaa-strict` + `status`) |
| `theme.destructive.foreground` | `theme.destructive` | AA 4.5:1 |
| `theme.destructive-strong.foreground` | `theme.destructive-strong` | AAA 7:1 (optional) |
| `theme.border.focus` | `theme.bg.page` | AA 3:1 (UI component) |

Both light and dark modes are validated independently per theme.

## Build failure output

```text
[contrast] FAIL veronex/light: theme.text.faint on theme.bg.card = 2.8:1 (required AA 3:1 decorative)
[contrast] FAIL verobase-admin/light: theme.primary on theme.bg.page = 3.9:1 (required AA 4.5:1)
[contrast] FAIL girok/light: theme.status.success-strong on theme.bg.card = 5.8:1 (required AAA-strict 7:1)
[contrast] PASS 23 / 26

Build aborted. Fix theme tokens or declare contrast.allow override (AA-large with rationale).
```

## Implementation

| Component | Tool |
| --------- | ---- |
| Ratio computation | `wcag-contrast` npm package |
| Color parsing (OKLCH → sRGB) | `culori` |
| Validation script | `packages/design/src/audit/contrast.mjs` via `packages/design/scripts/validate.mjs` |
| Report | `packages/design/dist/data/contrast-report.json` (pair list with required level, tier, group, ratio per theme/mode) |

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
| WCAG 3 (APCA) stable | Add APCA Lc validation alongside WCAG 2.2 |
| `prefers-contrast: more` mainstream | Add `high-contrast` mode to themes |
| Color-blind simulation in build | Add deuteranopia/protanopia/tritanopia checks |
