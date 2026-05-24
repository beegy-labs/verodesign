# Tool Portability Policy

> SSOT for LLM-tool neutrality. The project MUST work identically under any 2026 coding agent (Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, OpenCode, ...) and MUST allow multiple agents to operate concurrently. **Last reviewed**: 2026-05-24.

## Why this is a core value, not a nice-to-have

- **Vendor lock-in is now a documented systemic risk.** Anthropic blocked third-party tools from Claude subscriptions in January 2026; Cursor enforces server-side code sync. Tool-specific docs (`CLAUDE.md`-only rules) make the project unmovable.
- **Concurrent multi-tool is increasingly common** in 2026: a single repo may host a Claude Code session for planning + a Codex session for execution + a Gemini agent for review, all reading the same SSOT.
- **Industry consensus 2026**: `AGENTS.md` SSOT + thin per-tool variants (symlink or byte-equal body) is the recommended pattern across Augment Code, Morph, Zeroshot Studio, Agentlint, SSW Rules.

The first core value ([cdd.md § Core Values B](cdd.md)) makes this non-negotiable.

## What "portable" means concretely

1. **Identical observable behavior on tool swap** — switching from Claude Code to Codex CLI on the same repo MUST produce the same actions (modulo tool-specific CLI affordances) without any policy file rewrite.
2. **Identical retrieval surface** — same `.ai/` index, same `.agents/skills/` playbooks, same `docs/llm/` SSOTs, same trigger phrases activate the same skills.
3. **Concurrent safety** — two agents (different tools or same tool, different sessions) MUST be able to read the repo simultaneously without one tool's locks/state breaking another.

## Required structure

- **Tier-0 root SSOT** = `AGENTS.md`. Tool-neutral language ONLY.
- **Per-tool variants** = `CLAUDE.md`, `CODEX.md`, `GEMINI.md`. Body BYTE-EQUAL to `AGENTS.md` body (between `<!-- BEGIN AGENTS.md body -->` / `<!-- END AGENTS.md body -->` markers). Per-tool behavior lives in `## <Tool> Addendum` block AFTER the body.
- **Skills / playbooks** = `.agents/skills/*.md` with YAML frontmatter (`name`, `description`, `when`, `tags`) — `description` is the cross-tool semantic-discovery anchor (agentskills.io spec).
- **Indexes** = `.ai/README.md` is the keyword-trigger index, tool-neutral.
- **Validation** = `scripts/docs/check-agent-portability.sh` enforces byte-equality, no tool-keyword leak in shared body, no orphan playbooks.

## Anti-patterns (lock-in vectors — never do)

- ❌ **`CLAUDE.md`-only rule** — a behavior rule that lives only in `CLAUDE.md`. Codex / Gemini / future tools cannot see it. → If the rule applies to ALL agents, put it in `AGENTS.md` body. If it is genuinely tool-specific, document the equivalent in the other variants' addenda.
- ❌ **Tool-specific keyword in `AGENTS.md` body** — words like the Claude Code task system primitives, the Codex CLI command names, MCP-only tools, vendor slash commands. → Belongs in the variant's addendum only.
- ❌ **MCP-only dependency** — a workflow that only works via MCP (Model Context Protocol) and has no equivalent for tools without MCP. → Provide a non-MCP fallback or do not depend on the workflow.
- ❌ **Hard-coded tool binary** — Helm values, scripts, or docs that reference a specific tool's CLI binary (e.g., `claude run ...`) instead of generic shell or a tool-neutral wrapper.
- ❌ **Tool-locked memory** — relying on a tool's proprietary memory store for project-level facts. → Promote durable facts to `docs/llm/decisions/` (ADR) so they survive tool swap.
- ❌ **Tool-divergent variant body** — manually editing `CLAUDE.md` body without editing `AGENTS.md` first. Drift breaks the swap contract.
- ❌ **Concurrent-unsafe lock file** — assuming only one agent will touch the repo (e.g., a tool-specific lock that another tool ignores).

## Swap-test set (checklist before declaring a feature "portable")

Run through this checklist for any change touching `AGENTS.md`, `.agents/skills/`, `.ai/`, or any `docs/llm/policies/*.md`:

- [ ] `./scripts/docs/check-agent-portability.sh` exits 0 (byte-equal AGENTS/CLAUDE/CODEX/GEMINI body, no tool keyword in shared body, no orphan playbook).
- [ ] `grep -rE "(Claude Code|Codex|MCP|TaskCreate|/loop|/ultrareview|Skill|Anthropic|OpenAI Codex|Gemini CLI)" AGENTS.md .ai/ docs/llm/policies/ .agents/skills/` returns NOTHING outside `cdd.md` / `tool-portability.md` / `anti-drift-checklist.md` self-references (these meta-docs may name tools).
- [ ] Every behavior rule lives in `AGENTS.md` body OR in a clearly labeled `## <Tool> Addendum` block — never both.
- [ ] If a rule is tool-specific, the rule is documented in EACH per-tool variant's addendum (same intent, tool-native expression).
- [ ] `.agents/skills/*.md` frontmatter `description` is written as semantic trigger phrases (not a gloss), so cross-tool skill discovery works (per agentskills.io spec).
- [ ] Concurrent run test: imagine two agents (different tools) opening this repo simultaneously. No file lock / proprietary state assumption should break.
- [ ] Tool-swap test: pick a representative task from `.agents/skills/`. Mentally simulate executing it under each of Claude Code, Codex CLI, Gemini CLI. Same playbook, same SSOT lookup, same end state — no rule "missed" by a non-Claude tool.

## When to update this file

- A new tool joins the supported set → add it to "Required structure" and add a variant file.
- A new anti-pattern is observed → append to the anti-pattern list with the date and incident reference.
- The swap-test set finds a regression → tighten the check script.

## Related

- [cdd.md](cdd.md) — Core Values (the source mandate)
- [documentation-tiers.md](documentation-tiers.md) — Tier-0 SSOT + variant definition
- [anti-drift-checklist.md](anti-drift-checklist.md) — drift detection at edit time
- [response-style-policy.md](response-style-policy.md) — BLUF response style (tool-neutral)
- `scripts/docs/check-agent-portability.sh` — enforcement
- [../../AGENTS.md](../../AGENTS.md) — Tier-0 root
