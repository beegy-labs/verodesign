# Documentation Tiers (Tier-0 → Tier-4)

> Single SSOT for the documentation hierarchy. All other docs referring to "Tier N" or "4-tier CDD" point here. **Last reviewed**: 2026-05-24.

This repo separates documentation into **5 tiers by audience and depth**, following 2026 best practice for agentic codebases:

- AI-traffic vs human-traffic separation (Redocly, GitBook guides)
- Progressive disclosure — short index → deep SSOT on demand (Microsoft DeepWiki, arXiv SkillReducer 2603.29919, MindStudio)
- AGENTS.md as root + per-subdir override (Codebase Context Specification, Augment Code, Morph)

## Two Core Values this tiering serves

Tier structure exists to satisfy [cdd.md § Core Values](cdd.md):

1. **Token optimization** — Tier-0 (≤150 lines) + Tier-1 (≤50 lines/file, pointer-only) keep agent system prompt small. Tier-2 deep SSOT loads only on demand. SkillReducer-style progressive disclosure reduces baseline context ~90% vs monolithic prompts (per agentskills.io spec measurement).
2. **LLM-tool-neutrality** — Tier-0 SSOT is `AGENTS.md` (tool-neutral). Per-tool variants (CLAUDE.md, CODEX.md, GEMINI.md, ...) carry the AGENTS.md body byte-equal plus a `## <Tool> Addendum` block. Verified by `scripts/docs/check-agent-portability.sh`. Anti-patterns + swap-test set in [tool-portability.md](tool-portability.md).

## Tier table

| Tier | Path | Audience | Role | Size limit | Editable |
|------|---------------------|----------------|-----------------------------------------|------------------------|---------------|
| **0** | `AGENTS.md` (root) | All LLM tools | Root router → points into Tier-1 index | ≤150 lines | Yes (SSOT) |
| **1** | `.ai/` | LLM | Index / TOC, pure pointers, no SSOT | ≤50 lines per file | Yes |
| **1p** | `.agents/skills/` | LLM | Playbooks (decision-tree TOC + per-task) | ≤200 lines per file | Yes |
| **2** | `docs/llm/` | LLM | Deep technical SSOT, full reasoning | (no hard cap; split when >300 lines) | Yes |
| **3** | `docs/en/` | Human (en) | Generated / curated site (MkDocs) | (free) | No (generated) |
| **4** | `docs/kr/` | Human (ko) | Translation of Tier-3 | (free) | No (generated) |

Tier-1 (`.ai/`) and Tier-1p (`.agents/skills/`) are sibling Tier-1 layers — `.ai/` indexes concepts/domains; `.agents/skills/` indexes triggers/tasks ("how do I add X?").

## Tool variants at Tier 0

`AGENTS.md` is the SSOT. Per-tool variants (`CLAUDE.md`, `CODEX.md`, `GEMINI.md`, ...) carry the **identical AGENTS.md body verbatim** plus a **`## <Tool> Addendum` block** for tool-specific behavior (slash commands, native skills, MCP tools, etc.).

| File | Source | Used by |
|--------------|-----------------------------------|----------------------------------------|
| `AGENTS.md` | SSOT — edit here | All tools (some via symlink/import) |
| `CLAUDE.md` | AGENTS.md body + Claude addendum | Claude Code |
| `CODEX.md` | AGENTS.md body + Codex addendum | OpenAI Codex CLI |
| `GEMINI.md` | AGENTS.md body + Gemini addendum | Gemini CLI (placeholder for future) |

**Sync** is currently manual — editors MUST follow `anti-drift-checklist.md`. Future scope: CI generation via `scripts/docs/generate-agent-files.sh`.

## What goes where

- **Tier 0 (`AGENTS.md`)**: project identity (1-2 lines), critical rules (≤10 lines), pointer table into Tier-1. No deep content. Tool-neutral language.
- **Tier 1 (`.ai/`)**: one-screen index per topic. Each file is a TOC mapping concept → Tier-2 SSOT path. Never a SSOT itself.
- **Tier 1p (`.agents/skills/`)**: trigger-driven playbooks. `.agents/skills/README.md` is a decision-tree TOC ("If you want X, go to playbook Y"). Each playbook is self-contained (≤200 lines) with frontmatter `{name, when, tags}`.
- **Tier 2 (`docs/llm/`)**: SSOT. The only place to write *why*, *how*, full constraints, edge cases. Subdirs:
  - `policies/` — cross-cutting rules / constraints / naming
  - `architecture/` — topology, layer maps, shared system views
  - `components/` — one component per file
  - `operations/` — runbooks, recovery, staged procedures
  - `flows/` — Mermaid process flows
  - `decisions/` — ADRs (Architecture Decision Records), one per decision
  - `guides/` — focused how-to
  - `incidents/` — failure history with lessons
- **Tier 3 (`docs/en/`)**: built from Tier-2 by `scripts/docs/build-site.sh`. Adds nav, search, prose. Never hand-edited.
- **Tier 4 (`docs/kr/`)**: translation of Tier-3. Never hand-edited.

## Size-limit policy

When a file exceeds its tier's limit:

- **Tier 0**: extract any sub-topic to Tier-1 index + Tier-2 SSOT; keep AGENTS.md a router.
- **Tier 1 (.ai/)**: split file by sub-topic or push detail into Tier-2.
- **Tier 1p (.agents/skills/)**: if a playbook grows past 200 lines, it usually means it covers multiple decision branches — either (a) split into sibling playbooks linked from a decision-tree TOC in `.agents/skills/README.md`, or (b) move the long *reasoning* to a Tier-2 doc and keep `.agents/skills/` as the action checklist.
- **Tier 2**: split by component / sub-policy when >300 lines.

## Cross-tier rules

- Tier 0 ↔ Tier 1: Tier-0 points to Tier-1 files; Tier-1 files MAY point back to Tier-0 only via `AGENTS.md` link (not the per-tool variants).
- Tier 1 → Tier 2: every Tier-1 row eventually resolves to a Tier-2 SSOT file. If a row has no Tier-2 backing, it is incomplete.
- Tier 2 → Tier 3/4: Tier-3 and Tier-4 are generated only — never linked from Tier-0/1/2.
- Tier 1p (`.agents/skills/`) MAY link to Tier-2; Tier-2 SHOULD NOT link back to Tier-1p (avoid SSOT pointing into TOC).

## Validation

- `wc -l AGENTS.md` ≤ 150
- `for f in .ai/*.md; do [ $(wc -l < $f) -le 50 ] || echo "OVER: $f"; done`
- Every `.agents/skills/*.md` has YAML frontmatter (`name`, `when`, `tags`).
- `grep -rL "^---$" .agents/skills/*.md` → empty (no missing frontmatter).

## Related

- [cdd.md](cdd.md) — historical Context-Driven Development framing (tier definitions defer to this file)
- [anti-drift-checklist.md](anti-drift-checklist.md) — concrete steps when editing across tiers
- [../../AGENTS.md](../../AGENTS.md) — Tier-0 SSOT
