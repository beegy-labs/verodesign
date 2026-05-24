# Storybook + Chromatic

## Scope

`packages/showcase` contains Storybook 9 configuration for Girok pattern visual regression.

## Commands

```bash
pnpm install
pnpm --filter @verobee/showcase storybook
pnpm --filter @verobee/showcase build-storybook
```

## Files

- `.storybook/main.ts`
- `.storybook/preview.tsx`
- `stories/girok/*.stories.tsx`
- `stories/girok/girok-app.css`
- `.github/workflows/chromatic.yml`

## Chromatic

1. Create a Chromatic project and connect this repository.
2. Add repository secret `CHROMATIC_PROJECT_TOKEN`.
3. Push a branch or open a pull request.
4. GitHub Actions runs `.github/workflows/chromatic.yml`.
5. Chromatic uploads the built Storybook and posts visual diffs on the PR.

## Notes

- Preview sets `html[data-theme="girok"][data-mode="dark"]`.
- Storybook imports `@verobee/design/css/full.css` and `@verobee/design/patterns/girok-app.css`.
- If dependencies are not installed yet, config and stories remain ready for later `pnpm install`.
