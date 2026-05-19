# Dev Best Practices (CDD — Layer 2 SSOT)

> Status: canonical. Authored 2026-05-20. **Manually maintained** — do
> NOT re-research per task; update this doc only when the user approves
> a refreshed web synthesis. Scope: verodesign (design-system code +
> token pipeline). App-consumer counterpart: app-girok
> `.add/refactor-2026.md` §5. Typography: `typography-policy.md`.

## Why this doc

verodesign code/token edits are delegated (Codex) under Claude policy.
Recurring quality rules were implicit/scattered. This is the single
reference so refactors don't re-derive standards each time.

## Token pipeline (SSOT + optimization)

- **Layering, strict**: primitive → semantic → component. Consumers and
  themes bind to **semantic** roles, never primitives directly; raw
  hex/px/rem **0** outside primitive JSON.
- **No duplicate meaning**: two tokens resolving to the same value for
  the same semantic intent = collapse to one. Audit on every token PR.
- **Dead tokens**: a token referenced by no theme/component/consumer is
  dead — deprecate via `.add/deprecate.md` (never silent-delete; check
  cross-brand consumers first).
- **Cross-brand zero diff**: additive/opt-in only; brand divergence via
  theme values, not new component branches. Verify no non-target theme
  output changes.
- Type-role usage map (consumer side) is fixed by `typography-policy.md`.

## Code (design-react / design-elements)

- **Purity**: components/hooks pure & idempotent — no side effects or
  non-local mutation in render; same props → same output. Animation/
  focus/observers go in effects with cleanup (see Dialog `entered`
  rAF + `useLayoutEffect` cleanup pattern).
- **Additive API**: new props default to prior behavior; existing
  consumers regress 0. Geometry/behavior a consumer must not override
  (e.g. bottom-sheet) wins over consumer `style` by spread order.
- **Conciseness**: TS utility types (`Pick/Omit/Partial`) over repeated
  prop shapes; early return; destructure. Abstract only after real
  duplication (no speculative abstraction). One unit = one
  responsibility.
- **Colocate vs extract**: shared logic used 2+ places → `_internal`/
  shared util (pure, stateless). Single consumer → keep adjacent; do
  not over-extract into distant folders.
- **Dead code**: Knip (production mode) baseline =
  `.add/refactor-2026-baseline.md`; remove unused file/export/dep;
  document survivors with reason.

## Invariant (every refactor batch)

Knip / typecheck / build delta **must not worsen**; behavior + visual
regression 0; tokens/colors unchanged; cross-brand zero diff; commits
isolate source + intended dist only (no design-pkg dist / typography /
build-script drift).

## Maintenance

Update trigger = user-approved best-practice refresh only. Edit here
(Claude owns naming/policy), then mirror the consumer-facing delta into
app `.add/refactor-2026.md` §5. Related: [[decisions.md]],
[[typography-policy.md]].
