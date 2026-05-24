---
name: post-task-cdd-sync
description: "Use at the END of every task BEFORE git commit. Trigger phrases: 'task complete', 'wrap up', 'finalize', 'ready to commit', 'before commit', 'CDD sync', 'done', 'task end', 'wrapping up', 'finished'."
when: "Run as the final step of any task that changed code, config, or policy. Maps changed files to the CDD doc they belong in, creates ADRs for new incidents, runs anti-drift checks, drafts BLUF commit message."
tags: [cdd-sync, post-task, commit-gate, anti-drift, workflow]
tier: 1-playbook
---

# Post-Task CDD Sync

Close the drift loop: every task ends with CDD updated. This skill is the LAST step before `git commit`. Skipping it is how the project drifts — the agent makes code changes, the operator has to manually request "정리해줘" later, tokens are spent re-investigating.

Trigger: any task that touched `platform/`, `infrastructure/`, `apps/`, `bootstrap/`, `metal/ansible/`, `clusters/`, OR introduced a new incident learning.

## Checklist (run in order)

1. **Map changed files → CDD doc**. Use the table below. For each touched area, confirm the matching CDD doc reflects the change. If not, edit the CDD doc in this turn.
2. **New incident? Create an ADR**. If the task uncovered a new failure mode, anti-pattern, or non-obvious lesson, write `docs/llm/decisions/YYYY-MM-DD-<slug>.md`. Cross-link from the policy doc that codifies the lesson.
3. **Policy edited? Re-run anti-drift checklist**. Walk [`docs/llm/policies/anti-drift-checklist.md`](../../../docs/llm/policies/anti-drift-checklist.md) edit-time gates: AGENTS body sync, frontmatter keys, SSOT references.
4. **Run portability check**. `./scripts/docs/check-agent-portability.sh` must exit 0. Fix any FAIL before committing. WARNs may be deferred only with a follow-up note.
5. **Draft BLUF commit message**. `목적 / 변경범위 / 이펙트` format per [`response-style-policy.md`](../../../docs/llm/policies/response-style-policy.md). Include the SSOT files touched in `변경범위`.

## File → CDD doc mapping

| If you touched … | Update this CDD doc |
|------------------|---------------------|
| Workload placement (nodeSelector, tolerations, master vs home-kr) | `docs/llm/policies/workload-placement.md` |
| Image source / mirror / Kyverno rewrite / mirror-list.txt | `docs/llm/policies/image-source-policy.md` |
| Layer boundary (L0/L1/L2 ownership, Phase E, etc.) | `docs/llm/policies/deployment-flow.md` |
| /etc/hosts pin / k8s-domain-pin / containerd resolution | `docs/llm/policies/host-netns-precondition.md` |
| LLM tool variants / addendum content / per-tool skill location | `docs/llm/policies/tool-portability.md` |
| Doc tier role / pointer-only / progressive disclosure | `docs/llm/policies/documentation-tiers.md` |
| Response brevity / BLUF / 보고서 형식 | `docs/llm/policies/response-style-policy.md` |
| Fail-fast / STOP / human escalation | `docs/llm/policies/cdd.md` § Fail-Fast |
| Distribution / organization standard / semver release | `docs/llm/policies/distribution.md`, `docs/llm/policies/organization-standard.md` |
| New incident / failure mode / anti-pattern | New ADR at `docs/llm/decisions/YYYY-MM-DD-<slug>.md` |
| New component or runtime resource | `.ai/components.md` + `docs/llm/components/<name>.md` |
| New `.add` skill → moved to `.agents/skills/` | `.agents/skills/README.md` (TOC) + run `scripts/docs/sync-skill-symlinks.sh` |
| Architecture / topology / nodes | `.ai/architecture.md` (pointer) + `docs/llm/architecture/layers.md` |
| Namespace / security boundary | `.ai/namespace.md` (pointer) + `docs/llm/policies/namespace-policy.md` |

## Skill chaining (auto-next)

After this skill completes, the agent should auto-chain to **`anti-drift-checklist`** for a final edit-time verification of all cross-references and frontmatter. This is the agentskills.io chained-skill pattern.

## What "DONE" looks like

- [ ] Each touched code area has a matching CDD edit (or a written justification why none was needed)
- [ ] New incident, if any, has an ADR file
- [ ] `./scripts/docs/check-agent-portability.sh` exits 0
- [ ] Commit message drafted in BLUF + 3-section briefing format
- [ ] No file left in inconsistent / half-edited state

## Anti-patterns

- ❌ Marking task DONE without CDD edit when one was needed — recreates the drift this skill is designed to close.
- ❌ "I'll update CDD next session" — never happens; tokens are spent re-investigating instead.
- ❌ Updating CDD before the code change is final — produces churn.
- ❌ Generic commit message ("update files") — defeats grep for future debugging.

## Related

- [docs/llm/policies/anti-drift-checklist.md](../../../docs/llm/policies/anti-drift-checklist.md) — edit-time gate (auto-chained next)
- [docs/llm/policies/cdd.md](../../../docs/llm/policies/cdd.md) — Core Values + Fail-Fast (why this skill exists)
- [docs/llm/policies/response-style-policy.md](../../../docs/llm/policies/response-style-policy.md) — BLUF commit message
- `scripts/docs/check-agent-portability.sh` — automated portion of the check
- `lefthook.yml` — pre-commit hook (calls the check script automatically)
