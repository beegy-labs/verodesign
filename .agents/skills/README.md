# `.agents/skills/` — Skill Catalog (book TOC)

> Tier-1p decision-tree TOC for LLM coding agents. Each skill is an `agentskills.io`-compliant directory with `SKILL.md`. Per-tool symlinks (`.claude/skills/`, `.codex/skills/`, `.gemini/skills/`, `.cursor/skills/`) auto-resolve here via `scripts/docs/sync-skill-symlinks.sh`. **Last reviewed**: 2026-05-24.

## Read order for any task

1. AGENTS.md Critical Rules
2. `.ai/README.md` — keyword → SSOT 1-hop index (policies + skills)
3. This catalog — pick the skill for your intent
4. Open `<skill-name>/SKILL.md`

## Skills (this repo)

| Intent | Skill |
|--------|-------|
| **Wrap up task, run CDD sync, draft commit (RUN AT TASK END)** | [post-task-cdd-sync](post-task-cdd-sync/) |

## File ownership

Canonical SSOT is `.agents/skills/<name>/SKILL.md`. Per-tool dirs (`.claude/skills/`, `.codex/skills/`, `.gemini/skills/`, `.cursor/skills/`) hold ONLY symlinks back here. Re-derive with `scripts/docs/sync-skill-symlinks.sh`.

## Related

- [.ai/README.md](../../.ai/README.md) — Tier-1 keyword index (policies + skills)
- [docs/llm/policies/cdd.md](../../docs/llm/policies/cdd.md) — Core Values + Fail-Fast
- [docs/llm/policies/tool-portability.md](../../docs/llm/policies/tool-portability.md) — why we use `.agents/skills/` canonical
- [docs/llm/policies/documentation-tiers.md](../../docs/llm/policies/documentation-tiers.md) — tier roles
