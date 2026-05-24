# Distribution Policy (platform-gitops → agentic-dev-protocol)

> SSOT for how the organization standard reaches `agentic-dev-protocol`. **Distribution is manual + versioned. Never auto-cron.** **Last reviewed**: 2026-05-24.

## Scope boundary (CRITICAL)

This policy covers **ONLY** the `platform-gitops → agentic-dev-protocol` leg. The downstream leg (`agentic-dev-protocol → consumer repos: verobase / verobee / giterm / ...`) is **OUT OF SCOPE** for this repo and is governed by `agentic-dev-protocol`'s own distribution policy.

| Leg | Owner | This file applies? |
|---|---|---|
| platform-gitops → agentic-dev-protocol | platform-gitops (this repo) | ✅ Yes |
| agentic-dev-protocol → verobase / verobee / giterm / other consumers | agentic-dev-protocol | ❌ No |

We push tagged releases to `agentic-dev-protocol` and stop. How `agentic-dev-protocol` then fans those releases out to consumer repos (sub-module pin, pull-mirror, manual import, branch protection on the consumer side) is decided in `agentic-dev-protocol`'s own repo and is not maintained here.

Codex + 2026 web search agreed: manual `workflow_dispatch` + semver tag is the enterprise-grade pattern for policy-as-code distribution. Auto cron mirror is refuted (defeats human gate). See [organization-standard.md](organization-standard.md) for the position of this repo as Tier-0 SSOT.

## Flow (this repo's responsibility ends at the dotted line)

```
[ Developer / LLM ]
        │
        │ (1) PR with policy change (touches /docs/llm/policies/ or /.agents/skills/ or AGENTS.md etc.)
        ▼
[ platform-gitops repo, main branch ]
        │
        │ (2) CODEOWNERS-enforced review approval        ← Safeguard #1
        │ (3) PR merge → main
        ▼  (merge alone does NOT trigger sync)
        │
        │ (4) Human pushes "Run workflow" button         ← Safeguard #2: manual gate
        │     [GitHub Actions: workflow_dispatch]
        ▼
[ Dry-run preview job ]                                   ← Safeguard #3
        │  Computes diff between current main and last published tag
        │  Posts preview as a GitHub Actions summary
        │
        │ (5) Required reviewer in GitHub Environment    ← Safeguard #4: 2-person integrity
        │     "policy-distribution" approves
        ▼
[ Sync job ]
        │  - Assign semver tag (vX.Y.Z, computed from change scope)
        │  - Push tag to platform-gitops as the canonical tag
        │  - Push tagged tree to `agentic-dev-protocol` main + same tag
        │     (one-way; never read back from agentic-dev-protocol)
        │  - Generate `CHANGELOG.md` entry from commit messages
        ▼
[ agentic-dev-protocol ]
        │  Receives tagged release
        │
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  END OF THIS REPO'S SCOPE. Below is agentic-dev-protocol's responsibility.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        │
        │ Whatever agentic-dev-protocol decides:
        │   - sub-module pin propagation to consumer repos
        │   - pull-mirror, manual import, or another channel
        │   - consumer-side validation gates
        ▼
[ Consumer repos (verobase / verobee / giterm / …) ]
        Receives the standard via agentic-dev-protocol's mechanism.
```

## Four safeguards (Codex + 2026 enterprise practice)

### Safeguard 1 — CODEOWNERS-enforced PR review
- File: `.github/CODEOWNERS`
- Effect: every PR touching standard files requires the listed owner to approve before merge.
- Why: prevents accidental policy edits sneaking through.

### Safeguard 2 — Manual `workflow_dispatch` (no auto trigger)
- File: `.github/workflows/policy-sync.yml` (future scope; not implemented this turn)
- Trigger: `workflow_dispatch` only. Never `push:`, `schedule:`, or `pull_request:`.
- Why: PR merge ≠ release. Release is a deliberate human action.

### Safeguard 3 — Dry-run diff preview
- First job in the dispatch workflow.
- Output: a summary of which files / paths the release will change in `agentic-dev-protocol`.
- Why: reviewer sees the actual scope before clicking approve.

### Safeguard 4 — GitHub Environment with required reviewers
- Environment name: `policy-distribution`.
- Required reviewer: a second person (not the dispatcher).
- Why: 2-person integrity for the release action.

Additional hardening:

- **Injection hardening** — workflow steps that consume LLM-generated text (commit messages, etc.) MUST sanitize before passing to any agentic prompt. Source: arXiv 2605.07135 (agent prompt injection 2026).
- **No `--no-verify` bypass on standard files** — pre-commit hook on this repo (`lefthook.yml`) blocks; CI re-runs the same check server-side.
- **Tag immutability** — once a tag is pushed, it is NEVER force-moved. A bad release is corrected by issuing a new tag.

## Semver decision (which bump)

| Change scope | Bump |
|--------------|------|
| New skill added to `.agents/skills/`, new policy file in `docs/llm/policies/`, new hard-check in `check-agent-portability.sh` that consumers can opt into | MINOR (v1.1.0) |
| Breaking change to required frontmatter keys, tier role redefinition, directory move requiring consumer migration | MAJOR (v2.0.0) — requires `docs/llm/operations/upgrade-v1-to-v2.md` |
| Typo, link repair, ADR addition (no policy text change), anti-pattern bullet add | PATCH (v1.0.1) |

The dispatch workflow computes the recommended bump from the diff, but the reviewer can override.

## Consumer contract (out of scope here)

Consumer-repo integration is owned by `agentic-dev-protocol`'s own distribution policy, not this file. The only constraint this repo places on consumers (via [organization-standard.md](organization-standard.md)) is:

- NEVER edit standard files in-place in a consumer repo — upstream all changes to `platform-gitops` via PR.
- Everything else (sub-module pin vs vendored copy, upgrade cadence, validation) is `agentic-dev-protocol`'s call.

## Anti-patterns

- ❌ Cron-based auto-sync from platform-gitops to agentic-dev-protocol (the very thing we removed earlier this session).
- ❌ PR merge auto-triggers release (skips human gate).
- ❌ Force-moving a published tag.
- ❌ Editing standard files in a consumer repo.
- ❌ Releasing a MAJOR bump without a migration guide.
- ❌ `--no-verify` bypassing the pre-commit hook on standard files.

## Related

- [organization-standard.md](organization-standard.md) — what counts as "the standard"
- [cdd.md](cdd.md) — Core Values + Fail-Fast
- [anti-drift-checklist.md](anti-drift-checklist.md) — edit-time pre-merge checks
- [tool-portability.md](tool-portability.md) — every standard file must satisfy this
- `.github/CODEOWNERS` — Safeguard #1
- `lefthook.yml` — local pre-commit gate
- `scripts/docs/check-agent-portability.sh` — enforcement (local + CI)
- `.github/workflows/policy-sync.yml` (future) — Safeguards #2-4 implementation
