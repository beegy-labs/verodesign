# Workflow: Add Theme

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Add a new theme (light + dark) to verodesign.

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/decisions.md` |
| `docs/llm/tokens/themes.md` |
| `docs/llm/tokens/contrast.md` |
| `docs/llm/tokens/architecture.md` |

## Inputs

| Field | Required |
| ----- | -------- |
| Theme slug (kebab-case) | Yes |
| Brand concept (e.g., "Sky Crystal") | Yes |
| Light primary color (OKLCH) | Yes |
| Dark primary color (OKLCH) | Yes |
| Slot groups to implement | Yes (default: `["core", "web"]`) |
| Source / inspiration URL | Recommended |

## Steps

| # | Action | Output |
| - | ------ | ------ |
| 1 | Verify slug not in use (`tokens/themes/{slug}-light.json` doesn't exist) | Available slug |
| 2 | Write SDD spec under `.specs/verodesign/{date}-theme-{slug}/spec.md` | Spec file |
| 3 | Copy `tokens/themes/_template-light.json` to `tokens/themes/{slug}-light.json` | Light file |
| 4 | Copy `tokens/themes/_template-dark.json` to `tokens/themes/{slug}-dark.json` | Dark file |
| 5 | Edit `$extensions.verobee.implements` array | Declared groups |
| 6 | Edit all semantic slots with appropriate primitive references | Bound theme |
| 7 | Verify primary color OKLCH against bg.page → AAA 7:1 | Contrast pre-check |
| 8 | Register theme in `style-dictionary.config.js` themes array | Registered |
| 9 | Run `npm run build` | Theme builds, all gates pass |
| 10 | Update `docs/llm/decisions.md` themes table | Doc updated |
| 11 | Update `docs/llm/tokens/CHANGELOG.md` | Changelog row |
| 12 | Commit: `feat(themes): add {slug} theme` | Git commit |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| All implemented slot group slots filled (light AND dark) | Yes |
| WCAG AA all text pairs | Yes |
| WCAG AAA primary tier | Yes |
| OKLCH source values | Yes |
| Build emits `dist/css/themes/{slug}.css` | Yes |
| Tokens visible in `dist/data/tokens.json` under `[slug]` | Yes |

## Brand concept guidelines

| Trait | Recommendation |
| ----- | -------------- |
| Primary OKLCH L (light mode) | 30-50 (dark for AAA on light bg) |
| Primary OKLCH L (dark mode) | 65-80 (bright for AAA on dark bg) |
| Primary OKLCH C (chroma) | 0.10-0.20 (vivid but not garish) |
| Primary OKLCH H (hue) | Choose to match brand identity |
| Neutral hue | Inherit from primary hue (cool/warm match) or use slate (240°) |

## Versioning impact

New theme = minor bump (`vX.Y → vX.Y+1.0`).

## Example

```bash
# Theme: "Coral Bloom"
# Light primary: oklch(50% 0.18 25)  (orange-red)
# Dark primary:  oklch(75% 0.16 30)

# Step 3-5
cp tokens/themes/_template-light.json tokens/themes/coral-bloom-light.json
cp tokens/themes/_template-dark.json  tokens/themes/coral-bloom-dark.json
# Edit both files

# Step 8: register
# style-dictionary.config.js: themes: [..., 'coral-bloom']

# Step 9-12
npm run build
# Update decisions.md, CHANGELOG.md
git add tokens/themes/coral-bloom-*.json docs/
git commit -m "feat(themes): add coral-bloom theme"
```
