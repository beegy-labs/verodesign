# SDD: Greenfield 2026 Architecture — 7-Layer Package Split + Multi-Brand Isolation + GitOps Deployment

> Status: planned | Driver: multi-brand expansion (verobase, veronex, future) + brand isolation requirement + K8s/ArgoCD deployment infrastructure | Reference: `docs/llm/decisions.md`

## Why

### Current state

- `@verobee/design` is a **single monolithic package** containing token spec, primitive values, brand themes (verobase + veronex + default), utility CSS generator, build pipeline, and types.
- `@verobee/design-elements` (Lit web components) and `@verobee/design-react` (React adapters) exist as separate packages but are unused by `verobase` consumer (0 imports as of 2026-05-06).
- Consumers (`verobase/web/dashboard`, etc.) depend via `file://` or GitHub URL — no semver discipline, no version pinning, no isolation.
- One PR to verodesign main can affect all consumer apps simultaneously.
- Tailwind has been fully removed from `verobase/web/dashboard` (10,000+ class replacements completed 2026-05-06).
- Recovery snapshot exists at git tag `design-system-pre-optimize-20260506-102350` and at `/Users/vero/workspace/beegy/.snapshots/dashboard-pre-optimize-20260506-102350`.

### Constraints (driver)

1. **Multi-brand expansion**: more brands beyond verobase + veronex are planned ("찍어내기").
2. **Brand isolation**: a change to brand X must produce zero rebuild, zero diff, zero deploy on brand Y's app.
3. **Zero deployment delay**: a verodesign change must never delay any consumer app's release schedule.
4. **Brand-driven, not ROI-driven**: technical perfection is the goal; over-engineering is acceptable when it serves brand differentiation or long-term resilience.
5. **Future-proofing against Tailwind decline**: bet on standards-based CSS (OKLCH, `@property`, `light-dark()`, `color-mix()`, `@layer`, `@scope`, container queries) and Web Components (Lit 3) — verodesign already does this.
6. **Existing infrastructure**: GitHub Package Registry (GHPR) + GitHub Container Registry (GHCR) + Kubernetes cluster (kubeadm) + ArgoCD + Cilium Gateway API + `platform-gitops` repo (SSOT for K8s manifests) + per-app GitHub Actions CI.

### Target state

A **7-layer package split** in `verodesign` monorepo, with each layer published independently to GHPR, consumed by apps via exact version pinning, deployed via per-app container images (GHCR) and per-app GitOps manifests (`platform-gitops`) reconciled by ArgoCD. Result: brand X's verodesign work is invisible to brand Y until brand Y explicitly opts in.

## Scope

### Section 1 — Package architecture (7 layers)

```
verodesign/packages/
  spec/              @verobee/spec               — DTCG schema (slot definitions, NO values)
  primitive/         @verobee/primitive          — raw color/spacing/radius scales (brand-agnostic)
  theme-verobase/    @verobee/theme-verobase     — implements spec, references primitive
  theme-veronex/     @verobee/theme-veronex      — implements spec, references primitive
  theme-default/     @verobee/theme-default      — fallback/reference theme
  utilities/         @verobee/utilities          — vds-* CSS generator (theme-agnostic, var(--vds-*))
  primitives/        @verobee/primitives         — Lit 3 web components (theme-agnostic, var(--vds-*))
  react/             @verobee/react              — @lit/react adapters
  codemods/          @verobee/codemods           — migration scripts (jscodeshift)
  cli/               @verobee/cli                — vds new-brand, vds add-token, vds publish
  showcase/          @verobee/showcase           — Astro + MDX docs site (deployed to K8s)
```

#### Per-package responsibility

| Package | Responsibility | Depends on | Brand-aware? |
| ------- | -------------- | ---------- | ------------ |
| `spec` | DTCG schema. Defines slot names + types. No values. | (none) | No |
| `primitive` | Raw color ramps (slate, blue, ...), spacing scale, radius, shadow. | `spec` (peer) | No |
| `theme-{brand}` | Slot → primitive value bindings for one brand. Outputs `dist/css/theme.css` and `dist/types/theme.d.ts`. | `spec` (peer), `primitive` (peer) | Yes (one brand each) |
| `utilities` | `vds-*` utility class CSS generator. Outputs to `dist/utilities/*.css`. References `var(--vds-theme-*)` only. | `spec` (peer) | No |
| `primitives` | Lit 3 web components. Theme-agnostic. References `var(--vds-theme-*)` and `var(--vds-spacing-*)` only. | (none, consumes CSS vars at runtime) | No |
| `react` | @lit/react wrappers. Type-safe React props. | `primitives` | No |
| `codemods` | jscodeshift transforms for breaking changes. Versioned per source verodesign version. | (none, dev tool) | No |
| `cli` | `vds new-brand`, `vds add-token`, `vds publish`, `vds doctor`. | `spec`, `primitive` | No |
| `showcase` | Astro + MDX docs site. Imports all themes for live preview. Deployed to K8s. | All published packages (consumer) | Multi-brand demo |

### Section 2 — Distribution (GHPR + GHCR)

#### npm packages → GHPR

- All 11 packages publish to `https://npm.pkg.github.com` under scope `@verobee`.
- `verodesign/.npmrc`:
  ```
  @verobee:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ```
- Each consumer app (`verobase`, `veronex`, ...) declares the same registry in its own `.npmrc`.

#### Container images → GHCR

- Each consumer app builds its own container image: `ghcr.io/beegy-labs/verobase-dashboard:v1.2.3`, `ghcr.io/beegy-labs/veronex-dashboard:v0.5.0`.
- The verodesign showcase site builds its own image: `ghcr.io/beegy-labs/verodesign-showcase:v0.3.0`.
- Image tags are produced by Changesets-driven version bumps (PR merge → CI builds + tags + pushes).

### Section 3 — Versioning (Changesets, per-package semver)

- Tooling: `@changesets/cli` configured in `verodesign/` monorepo root.
- `.changeset/config.json` lists all 11 packages independently (no fixed-version groups).
- Every PR that touches `packages/**` must include at least one `.changeset/*.md` entry. CI (`changesets/action`) blocks merge otherwise.
- On merge to `main`, CI runs `changeset version` (bumps `package.json`, updates each package's `CHANGELOG.md`) followed by `changeset publish` (publishes to GHPR).
- SemVer policy:

| Change kind | Bump |
| ----------- | ---- |
| New semantic slot in `spec` | minor (consumers may opt-in) |
| Removal/rename in `spec` | **major** (breaks all themes) |
| New value in `theme-X` | patch |
| Color shift in `theme-X` (visual diff) | minor |
| New utility in `utilities` | minor |
| New component in `primitives` | minor |
| Breaking prop/event change in `primitives` | **major** + codemod required |
| New brand `theme-Y` added | patch on `theme-Y@1.0.0` initial release |

### Section 4 — Consumer pinning (zero auto-propagation)

- Apps **never** use `workspace:*` in production `package.json`. That alias auto-pulls the latest workspace version, which violates the "zero deployment delay" constraint.
- Apps pin to a specific version range:
  ```jsonc
  // verobase/web/dashboard/package.json
  {
    "dependencies": {
      "@verobee/spec":            "1.2.0",
      "@verobee/primitive":       "1.0.4",
      "@verobee/theme-verobase":  "1.3.1",
      "@verobee/utilities":       "0.7.2",
      "@verobee/primitives":      "0.5.0",
      "@verobee/react":           "0.5.0"
    }
  }
  ```
- `pnpm-lock.yaml` is committed per app. CI verifies lock matches `package.json`.
- Optional development convenience: `pnpm-workspace.yaml` at the monorepo root can include verodesign packages, but only when developing verodesign locally. Production builds always resolve from GHPR.

### Section 5 — Selective import (bundle-level isolation)

Each app imports only its own theme. Other brands' CSS never enters its bundle.

```css
/* verobase/web/dashboard/app/globals.css */
@import "@verobee/spec/css/tokens.property.css";
@import "@verobee/primitive/css/core.css";
@import "@verobee/theme-verobase/css/theme.css";   /* only verobase */
@import "@verobee/utilities/css/full.css";
```

Result: a change to `theme-veronex` produces zero diff in verobase's built CSS.

### Section 6 — CI/CD matrix

#### Per verodesign package

- Each package has its own `pnpm build`, `pnpm test`, `pnpm lint`.
- Monorepo CI uses Turborepo to skip unchanged packages (`turbo run test --filter=...[main]`).
- Acceptance gates per package: typecheck, unit tests (Vitest or Web Test Runner), `pnpm build`, WCAG contrast (themes only), CEM analyzer (primitives only), schema validation (spec only).

#### Per app

- Each consumer app has its own GitHub Actions workflow with `paths` filter:
  ```yaml
  # .github/workflows/verobase-dashboard.yml
  on:
    push:
      paths:
        - 'verobase/web/dashboard/**'
        - '!verobase/web/dashboard/**.md'
  ```
- App workflow steps: install (resolves pinned verodesign versions from GHPR), typecheck, test, build container image, push to GHCR, update `platform-gitops` manifest with new image tag.

#### verodesign publish workflow

- Triggered only by changes under `verodesign/packages/**`.
- Does NOT trigger any consumer app build.
- Steps: build → test → changeset version → changeset publish → tag GitHub release.

### Section 7 — Kubernetes deployment topology

Reuses existing `platform-gitops` repo + ArgoCD pattern.

```
platform-gitops/apps/
  verobase-dashboard/
    base/                     # Kustomize base (Deployment, Service, HTTPRoute)
    overlays/{dev,prod}/      # env-specific image tags + replicas
  veronex-dashboard/
    base/
    overlays/{dev,prod}/
  verodesign-showcase/        # NEW — Astro static site behind nginx
    base/
    overlays/prod/            # design.verobee.com
```

- Each app has its own ArgoCD `Application` resource. Sync is independent.
- Namespacing: `verobase-prod`, `veronex-prod`, `design-system` (for showcase). PodSecurityStandards: `restricted` (matches existing `app-shared-gateway` policy).
- Cilium Gateway API: separate `HTTPRoute` per app. Hostnames:
  - `verobase.com` → verobase-dashboard
  - `veronex.com`  → veronex-dashboard
  - `design.verobee.com` → verodesign-showcase
- Image rollout strategy: `RollingUpdate` (default). Optional Argo Rollouts for canary/blue-green per app.

### Section 8 — Showcase site (Astro + MDX)

- Located at `verodesign/packages/showcase/` (existing scaffold replaced with Astro).
- Stack: Astro 4+ + MDX + Shiki (syntax highlight) + Pagefind (search) + native `<vds-*>` web components.
- Renders live previews with all themes via theme switcher (data-theme attribute toggle).
- Build output: static HTML in `dist/`. Container image: nginx + dist files.
- Routes: `/` (marketing), `/foundations/*` (color, typography, spacing, ...), `/tokens/*`, `/components/*` (per-component pages with live demos), `/themes/*`, `/changelog`.
- AI/LLM integration: each component page emits a structured JSON sidecar (`/components/button.json`) consumed by AI assistants (Claude/GPT) and the future MCP server.

### Section 9 — Type safety (CEM + token codegen)

- `@custom-elements-manifest/analyzer --litelement` runs in `primitives` build. Output: `dist/custom-elements.json`.
- `@verobee/cli` has `vds gen-types` that:
  - Reads each `theme-X` package's tokens.
  - Emits `@verobee/theme-X/dist/types/tokens.d.ts` with `CssVarName`, `TokenPath` literal types.
  - Apps importing `@verobee/theme-verobase` get compile-time validation of CSS variable references.

### Section 10 — Codemods (breaking change automation)

- `@verobee/codemods` ships transforms keyed by source verodesign version.
- Example: `npx @verobee/codemods v0.5-to-v0.6 ./web/dashboard` rewrites:
  - Renamed CSS classes (`vds-bg-nav-active` → `vds-bg-selected`).
  - Renamed component props.
  - Updated import paths.
- Every breaking-change PR in verodesign MUST include the corresponding codemod. CI verifies presence.

### Section 11 — Brand scaffold (`vds new-brand`)

- `pnpm vds new-brand veroteam --primary "oklch(45% 0.18 30)"` performs:
  1. Copy `_template-{light,dark}.json` to `theme-veroteam/tokens/`.
  2. Compute WCAG-passing accent + text colors from primary input.
  3. Generate `package.json` for `@verobee/theme-veroteam@0.1.0`.
  4. Generate `tsconfig.json`, `build.mjs`.
  5. Add Changeset entry.
  6. Run `pnpm build` to produce CSS.
  7. Run WCAG contrast audit. Block on AA failures.

### Section 12 — Documentation layers

| Layer | Location | Audience |
| ----- | -------- | -------- |
| Spec docs | `verodesign/docs/llm/` | Internal + AI assistants |
| Component reference | `dist/custom-elements.json` (per package) | IDE intellisense + AI |
| Showcase site | `https://design.verobee.com` | External (designers, devs) |
| Changelogs | `packages/{name}/CHANGELOG.md` | Consumer app developers |
| Public API contract | `verodesign/PUBLIC_API.md` | Consumer app developers |
| Migration guides | `verodesign/docs/llm/migrations/{from}-to-{to}.md` | Consumer app developers |

## Out of scope (deferred or rejected)

| Item | Decision |
| ---- | -------- |
| Tailwind reintroduction | Rejected. Migration completed 2026-05-06; verodesign satisfies all consumer needs. |
| Storybook (in addition to showcase) | Deferred. Astro showcase serves both internal + external. Storybook would duplicate effort. |
| `@lit-labs/ssr` + Declarative Shadow DOM | Deferred to Phase 12+. React 19 + Next.js dynamic import is sufficient until Lit components are widely adopted in consumer apps. |
| MCP server (AI-queryable design system) | Deferred to Phase 13+. Showcase JSON sidecars + LLM docs are sufficient for now. |
| Token Studio Figma sync | Deferred indefinitely. 1-person design+code workflow does not need bidirectional sync. |
| `@verobee/headless` (separate from `primitives`) | Rejected. Lit components are already headless-compatible; another abstraction layer is debt. |
| State machine library (XState/Zag) | Rejected. Lit reactive properties suffice (decision locked in `docs/llm/decisions.md`). |
| Verdaccio (private npm proxy) | Rejected. GHPR is the publish target; no proxy needed. |
| `workspace:*` for production | Rejected. Violates zero-auto-propagation requirement. |

## Migration phases

Estimated total: **~3 weeks of focused work** (can be paused/resumed; each phase ships independently).

| Phase | Scope | Days | Risk |
| ----- | ----- | ---- | ---- |
| **A** | Repo restructure: create new package directories, move tokens (no API changes yet). Update `pnpm-workspace.yaml`, `turbo.json`, root `tsconfig`. | 1 | Low (mechanical) |
| **B** | Extract `@verobee/spec` from current `tokens/semantic/*`. Theme files declare peer dependency on spec. | 2 | Low |
| **C** | Extract `@verobee/primitive` from current `tokens/primitive/*`. | 1 | Low |
| **D** | Extract `@verobee/theme-{verobase,veronex,default}` packages. Each builds its own CSS. | 3 | Medium (consumer import paths change) |
| **E** | Extract `@verobee/utilities` (current `src/build/utilities/*` generator). | 2 | Medium (build pipeline restructure) |
| **F** | `@verobee/primitives` and `@verobee/react` already exist as separate packages — verify dependency graph + add CEM auto-gen. | 1 | Low |
| **G** | Set up Changesets in monorepo root; configure GHPR publish workflow. | 1 | Low |
| **H** | Configure GHPR `.npmrc` and authentication for `verobase` consumer. Update its `package.json` to pin specific versions. Run codemod to update import paths. | 1 | Medium (consumer touched) |
| **I** | Build `@verobee/codemods` package with first transform (`v0-to-v1` covering all renames done in Phases B–E). | 2 | Low |
| **J** | Build `@verobee/cli` with `vds new-brand` and `vds doctor`. | 2 | Low |
| **K** | Replace `packages/showcase` Vite scaffold with Astro 4 + MDX. Author homepage + 5 component pages + tokens explorer. | 4 | Low (additive) |
| **L** | Add `verodesign-showcase` to `platform-gitops/apps/`. Configure HTTPRoute for `design.verobee.com`. ArgoCD reconciles. | 1 | Low (existing pattern) |
| **M** | Per-app GitHub Actions: split monolithic CI into per-app workflows with `paths` filters. | 1 | Low |
| **N** | Documentation: write `PUBLIC_API.md`, update `docs/llm/decisions.md` to reference this SDD, create migration guide for v0→v1. | 1 | Low |

## Acceptance gates

Final verification — all must pass before declaring the architecture complete:

- [ ] All 11 packages publish independently to GHPR.
- [ ] Each package has its own `CHANGELOG.md` maintained by Changesets.
- [ ] `verobase/web/dashboard` pins exact versions; `pnpm-lock.yaml` committed.
- [ ] CI for `verodesign` does NOT trigger any consumer app build.
- [ ] CI for `verobase/web/dashboard` does NOT trigger on changes outside its directory.
- [ ] A change to `theme-veronex/tokens/dark.json` produces zero diff in verobase's built CSS bundle (verified by hash comparison before/after).
- [ ] Brand isolation test: bumping `@verobee/theme-veronex@1.x.y → 1.x.y+1`, running `pnpm install` in `verobase/web/dashboard` shows zero changes (because verobase doesn't depend on theme-veronex).
- [ ] `vds new-brand veroteam --primary "oklch(...)"` produces a working brand package in under 5 minutes.
- [ ] `npx @verobee/codemods v0-to-v1 ./web/dashboard` migrates all class renames automatically.
- [ ] `dist/custom-elements.json` exists for `@verobee/primitives`.
- [ ] `@verobee/theme-{verobase,veronex,default}/dist/types/tokens.d.ts` exists with typed `CssVarName` union.
- [ ] Showcase site deployed to `design.verobee.com`, served via Cilium Gateway, reconciled by ArgoCD.
- [ ] PUBLIC_API.md lists every Frozen / Experimental / Internal API.
- [ ] Recovery: rollback to git tag `design-system-pre-optimize-20260506-102350` restores pre-architecture state.

## Risk + rollback

### Risks

| Risk | Probability | Impact | Mitigation |
| ---- | ----------- | ------ | ---------- |
| GHPR auth failure during consumer install | Medium | High | Document `.npmrc` setup; add CI smoke test that installs `@verobee/spec` from GHPR using a service account |
| Schema drift: theme package lags spec | Medium | Medium | CI gate: theme build fails if missing slot. Codemods generated automatically when slot added. |
| Codemod misses an edge case in consumer | Medium | Low | Codemods run as PR draft; reviewer verifies. Manual fix path always available. |
| Astro showcase build > 2 min | Low | Low | Astro is fast; if it grows, switch to incremental builds via Vercel/Astro adapter. |
| Container image bloat from per-app verodesign install | Low | Medium | Multi-stage Docker build: `pnpm install --prod` in builder stage; copy only `dist/` to runtime stage. |
| ArgoCD sync waves wrong order | Low | Medium | Use Argo `sync-wave` annotations: namespace → CRD → Deployment → HTTPRoute. |

### Rollback strategy

Per-phase rollback is supported:

| If broken at phase | Rollback action |
| ------------------ | --------------- |
| A–F (repo restructure) | `git revert` on the restructure commits. No consumer impact (no publish yet). |
| G (Changesets setup) | Revert `.changeset/` directory. Manual versioning resumes. |
| H (consumer pinning) | Revert `verobase/web/dashboard/package.json` and `pnpm-lock.yaml` to pre-pin state (`workspace:*` or `file://`). |
| I (codemods) | Codemod is opt-in (`npx`-invoked). No automatic effect. |
| K (showcase) | Showcase is independent service. Don't deploy until ready. |
| L (K8s deploy) | ArgoCD: disable auto-sync for `verodesign-showcase` Application; delete namespace if needed. |

Full rollback to pre-architecture state: `git checkout design-system-pre-optimize-20260506-102350` (verodesign) + restore `/Users/vero/workspace/beegy/.snapshots/dashboard-pre-optimize-20260506-102350` to verobase.

## Versioning impact (this SDD)

- New packages introduced: `@verobee/spec@1.0.0`, `@verobee/primitive@1.0.0`, `@verobee/theme-verobase@1.0.0`, `@verobee/theme-veronex@1.0.0`, `@verobee/theme-default@1.0.0`, `@verobee/utilities@1.0.0`, `@verobee/codemods@1.0.0`, `@verobee/cli@1.0.0`.
- Existing `@verobee/design` deprecated. v0.x users migrate to the split packages via `@verobee/codemods v0-to-v1`. Final `@verobee/design@0.x.LAST` published with deprecation notice; removal at v1.0 of all replacement packages + 6 month soak.

## Decision lock items (to be added to `docs/llm/decisions.md`)

After this SDD is approved, add to decisions:

- "verodesign uses 7-layer package split with independent semver per package."
- "Brand themes are separate npm packages (`@verobee/theme-{name}`)."
- "Distribution: GHPR for npm packages, GHCR for container images, ArgoCD-reconciled K8s for showcase."
- "Consumer apps must pin exact versions; `workspace:*` is forbidden in production `package.json`."
- "Every breaking change requires a corresponding codemod in `@verobee/codemods`."

## References

- Existing SDDs in `.specs/verodesign/` (utility-layer-1/2/3, consumer-fidelity-fix-1/2, bg-selected).
- `docs/llm/decisions.md` — master decision SSOT.
- `docs/llm/build/optimization.md` — 2026 optimization architecture (already locked).
- `docs/llm/tokens/architecture.md` — current token tier model.
- platform-gitops repo: `https://gitea.beegy.dev/beegy-labs/platform-gitops` (existing GitOps SSOT).
- Recovery snapshot: git tag `design-system-pre-optimize-20260506-102350` + `/Users/vero/workspace/beegy/.snapshots/dashboard-pre-optimize-20260506-102350`.
