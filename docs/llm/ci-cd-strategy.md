# CI / CD Strategy — gitflow, publish channels, registry

> How verodesign gates changes and publishes packages. Decided 2026-07-12.
> verodesign is a LIBRARY (design system), so it maps to dist-tag CHANNELS, not
> deploy environments. Consumer of the platform-gitops org standard (self-hosted
> CI only; images, when added, build via ARC-independent kaniko — never on the runner).

## Gitflow — main→tag (not develop→stage→prod)

A library has no "environments" to stage into; it has version channels. So the
branch model is 2-tier, unlike an app (verobase is develop→main→tag):

| Branch / event | dist-tag | version | status |
|---|---|---|---|
| `main` push (packages/**) | **`dev`** | `0.0.0-dev.<sha>` (snapshot) | **ACTIVE** |
| `main` tag `vX.Y.Z` | **`latest`** | `X.Y.Z` (semver, changesets) | deferred (dev stage) |

- `main` = trunk. feature branch → PR → main (CI gate). No `develop`.
- **Dev stage now**: every `main` push auto-publishes a `@dev` snapshot — no git
  tags, no version PRs. Consumers use `@verobee/<pkg>@dev` to always get the latest.
- **Stable later**: cut a semver git tag on `main` → `@latest`.

## Registry — Verdaccio (npm.beegy.net)

One registry hosts `@verobee/*` AND pull-through-caches public npmjs deps, so
consumers point at a single URL. gitea's npm registry was considered but can't
cache npmjs, and Verdaccio was already deployed for that cache — so @verobee
publishing was added to it rather than running a second registry.

- Publish auth: htpasswd user `verobee-publisher` seeded in OpenBao
  `secret/platform/verdaccio` → ESO → Verdaccio. Reads public (`$all`), publish
  `$authenticated`. CI uses `NPM_AUTH_B64` (Basic `_auth`) — see `release.yml`.
- **Publishable packages**: `@verobee/{design,design-elements,design-react,
  utilities,spec,theme-*,primitive,cli,codemods}`. The 3 design packages had
  `"private": true` (source-only consumption) — removed so they publish.
  `@verobee/showcase` stays `private` (not a package).

## CI — GitHub Actions on arc-runner-set (never ubuntu-latest)

| Workflow | Trigger | Does |
|---|---|---|
| `ci.yml` | PR (packages/**) | Gate: install · `validate` · `build` · `test` + design-token/pattern audits. |
| `release.yml` | push `main` (packages/**) | Publish all publishable `@verobee/*` as `@dev` snapshot to Verdaccio. |
| `showcase.yml` | push `main` / PR (showcase paths) | Build gate for the Astro showcase (no image — deferred). |
| `sync-to-gitea.yaml` | push/tags | Mirror GitHub → L2 Gitea (`gitea.beegy.net/beegy-labs/verodesign`). |
| `chromatic.yml` | `workflow_dispatch` | DISABLED during re-setup (external SaaS + token). Re-enable later. |

## Consumers

- Dev now: `"@verobee/design": "dev"` (dist-tag) + `.npmrc`
  `@verobee:registry=https://npm.beegy.net/`. Always resolves the latest snapshot.
- This replaces the old `file:`/sibling-vendoring path (verobase web-up.sh staging,
  the ci-web clone hack). verobase switches `file:` → `@verobee/<pkg>@dev` — a
  separate follow-up on the verobase side.

## Deferred (later phases)

- **`@latest` stable** — semver git tag on `main` (changesets). Now = `@dev` only.
- **Showcase image + deploy** — ARC-independent kaniko app in platform-gitops
  (collector-image-build pattern) + ArgoCD deploy. CI only builds the site today.
- **External registry** — `npm.verobee.com` (verobee-zone tunnel + web-gateway
  HTTPRoute → same Verdaccio, read-public) when packages need external consumption.
  npm.beegy.net is internal-only today.
- **Chromatic** — re-enable the visual-regression upload when wanted.
