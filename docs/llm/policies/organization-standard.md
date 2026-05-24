# Organization Standard (platform-gitops as Tier-0 SSOT)

> SSOT for **what platform-gitops itself is** in the organization: the canonical source for CDD/SDD/ADD standard, distributed via `agentic-dev-protocol` to all consumer repos. **Last reviewed**: 2026-05-24. **Standard version**: v1.0.0.

## Position in the organization

```
[ platform-gitops ]            ← THIS REPO — Tier-0 SSOT (the truth)
        │  AGENTS.md, .agents/skills/, docs/llm/policies/, scripts/docs/
        │
        │  Manual workflow_dispatch + semver tag (no auto cron)
        ▼
[ agentic-dev-protocol ]       ← distribution layer (the proxy / fan-out)
        │  same standard mirrored, versioned tag
        │
        ├─→ [ verobase ]       ← consumer (sub-module pin)
        ├─→ [ verobee ]        ← consumer (sub-module pin)
        └─→ [ giterm / 다른 repos ]   ← consumer (sub-module pin)
```

Earlier this session (before 2026-05-24) the flow was inverted (`agentic-dev-protocol` was a sub-module of `platform-gitops` with 6h cron auto-sync) — that was retired because (a) auto-sync to the source-of-truth without human review violated change-management discipline; (b) vendor-lock-style auto-update is REFUTED by 2026 best practice. Direction now strictly **one-way down**, **manual gate at every promotion**.

## What "the standard" covers

The following files in this repo are the canonical organization standard. Changes here propagate (after manual approval) to `agentic-dev-protocol` and from there to consumer repos:

| File / dir | Scope |
|------------|-------|
| `AGENTS.md` + `CLAUDE.md` + `CODEX.md` + `GEMINI.md` | Tier-0 root, tool-neutral body + per-tool addendum |
| `.ai/` | Tier-1 keyword index |
| `.agents/skills/` | Tier-1p skill canonical (agentskills.io spec) |
| `docs/llm/policies/` | Tier-2 SSOT — every cross-cutting policy |
| `docs/llm/decisions/` | Tier-2 ADRs (lessons promoted to policy) |
| `scripts/docs/check-agent-portability.sh` | enforcement script |
| `scripts/docs/sync-skill-symlinks.sh` | per-tool symlink derivation |
| `lefthook.yml` | pre-commit hook config |
| `.github/CODEOWNERS` | review-gate definition |

Repo-specific operational content (Helm values, Terraform modules, ArgoCD Applications) is NOT part of the standard. Only the cross-project policy + skill layer is.

## Versioning (semver)

| Bump | Trigger |
|------|---------|
| **MAJOR (v2.0.0)** | Breaking change to required frontmatter, tier roles, anti-pattern definitions, or a directory move that requires consumer-side migration. |
| **MINOR (v1.1.0)** | Additive policy (new SSOT file, new skill, new hard-check) that consumers can adopt without breaking existing usage. |
| **PATCH (v1.0.1)** | Wording fix, link repair, typo, additional anti-pattern bullet, ADR addition (no policy change). |

Tag is applied to the commit that lands the change on `main`, AFTER manual dispatch (see `distribution.md`).

## Consumer integration contract (scope boundary)

This repo's responsibility ends at pushing the tagged release to `agentic-dev-protocol`. How consumers (verobase / verobee / giterm / ...) then receive and apply the standard is **`agentic-dev-protocol`'s call**, defined in its own repo.

The only constraint this repo places on consumers:

- Treat standard files (AGENTS.md, `.agents/skills/`, `docs/llm/policies/`, `.ai/`, `scripts/docs/check-agent-portability.sh`, `lefthook.yml`, `.github/CODEOWNERS`) as **read-only** on the consumer side.
- Local edits MUST be upstreamed to `platform-gitops` via PR, never made in-place in a consumer repo.

Everything else — sub-module pin vs vendored copy, upgrade cadence, validation gates on the consumer side — is governed by `agentic-dev-protocol` and the consumer repos themselves, not by this policy.

## Anti-patterns the standard rules out

- ❌ Editing a standard file directly in a consumer repo — recreates the drift that this organization model removes.
- ❌ Cron-based auto-sync FROM platform-gitops TO downstream — defeats the manual approval gate.
- ❌ Skipping the version tag — consumers have no reproducible upgrade target.
- ❌ Breaking changes without a `docs/llm/operations/upgrade-vX-to-vY.md` migration guide.
- ❌ Vendor-specific syntax in AGENTS.md body — see [tool-portability.md](tool-portability.md).

## Related

- [distribution.md](distribution.md) — exactly HOW the standard reaches `agentic-dev-protocol` and consumers (workflow_dispatch + semver + safeguards)
- [cdd.md](cdd.md) — Core Values that govern every standard file
- [documentation-tiers.md](documentation-tiers.md) — tier role definitions
- [anti-drift-checklist.md](anti-drift-checklist.md) — edit-time verification
- [tool-portability.md](tool-portability.md) — LLM-tool-neutrality requirement on every standard file
