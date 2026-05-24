# `.ai/` — Tier-1 Index (LLM trigger-phrase lookup)

> Tier-1 keyword/trigger index. **No SSOT content** — every row resolves to a Tier-2 SSOT in `docs/llm/` or a Tier-1p skill in `.agents/skills/`. Progressive disclosure: read this first, fetch only the SSOT you need. **Last reviewed**: 2026-05-24.

## Read order for any new task

1. [AGENTS.md](../AGENTS.md) — Tier-0 Critical Rules (Core Values + SSOT links).
2. This file — find the matching trigger row below.
3. The linked Tier-2 SSOT or Tier-1p skill — full reasoning.

## Trigger → SSOT (1-hop)

| Intent / trigger phrase | Go to |
|------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| Core values / fail-fast / when to STOP / escalate | [docs/llm/policies/cdd.md](../docs/llm/policies/cdd.md) |
| Spec / scope / WHAT to build | [docs/llm/policies/sdd.md](../docs/llm/policies/sdd.md) |
| Execute task / agent-driven workflow | [docs/llm/policies/add.md](../docs/llm/policies/add.md) |
| LLM tool swap / vendor lock-in / per-tool addendum | [docs/llm/policies/tool-portability.md](../docs/llm/policies/tool-portability.md) |
| Response style / BLUF / 보고서 형식 | [docs/llm/policies/response-style-policy.md](../docs/llm/policies/response-style-policy.md) |
| Doc tier / where does this content live | [docs/llm/policies/documentation-tiers.md](../docs/llm/policies/documentation-tiers.md) |
| Token optimization / cache hygiene / hallucination prevention | [docs/llm/policies/token-optimization.md](../docs/llm/policies/token-optimization.md) |
| Edit AGENTS.md / sync variants / drift check | [docs/llm/policies/anti-drift-checklist.md](../docs/llm/policies/anti-drift-checklist.md) |
| Secrets / `.secrets/` / never commit | [docs/llm/policies/secrets-management.md](../docs/llm/policies/secrets-management.md) |
| Organization standard / Tier-0 SSOT for the org / semver v1.0 | [docs/llm/policies/organization-standard.md](../docs/llm/policies/organization-standard.md) |
| Distribution / consumer repos / workflow_dispatch | [docs/llm/policies/distribution.md](../docs/llm/policies/distribution.md) |
| Task complete / commit / CDD sync (run BEFORE every commit) | [.agents/skills/post-task-cdd-sync/](../.agents/skills/post-task-cdd-sync/) |
| Other skills | [.agents/skills/README.md](../.agents/skills/README.md) (catalog) |
