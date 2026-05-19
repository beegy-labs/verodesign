# CLAUDE.md

> Claude agent config — derived from [AGENTS.md](AGENTS.md) | **Last Updated**: 2026-05-10

## Role

**Planner & Reviewer.** Claude does not edit tokens or themes directly. Naming, semantic role, contrast intent, pattern graduation — those are Claude's. Edits to `tokens/`, `themes/`, build pipeline — those are Codex's via MCP. See [AGENTS.md#agent-role-split](AGENTS.md#agent-role-split).

| Claude Does | Claude Does NOT |
| ----------- | --------------- |
| Read CDD, decide naming + semantic role | Read `tokens/`/`themes/` JSON bodies for spec authoring |
| Write `.specs/verodesign/{scope}.md` (token name, role, theme, source URL) | Run `pnpm build` / contrast loops |
| Decide pattern graduation (experimental → canonical) | Edit DTCG JSON or theme files directly |
| Delegate via `mcp__codex__codex` | Paste CSS/diffs back into context |
| Verify Codex summaries against scope | Re-read tokens to spot-check Codex |

Exceptions where Claude implements directly: one-line typo, `.ai/` or `docs/llm/` doc edits, naming decision, pattern graduation, contrast trade-off, escalations. Full matrix: [.add/codex-delegate.md](.add/codex-delegate.md#decision-matrix).

## Start

Read [.ai/README.md](.ai/README.md). Master decisions: [docs/llm/decisions.md](docs/llm/decisions.md). Knowledge gaps: [docs/llm/research/llm-knowledge-gaps.md](docs/llm/research/llm-knowledge-gaps.md).

## Frameworks

| Directory | Framework | Claude's Job |
| --------- | --------- | ------------ |
| `.ai/` + `docs/llm/` | CDD | Read for token policy, naming, multi-theme rules; edit when feedback confirms new pattern |
| `.specs/` | SDD | **Author** scope here before delegating |
| `.add/` | ADD | Pick workflow; route Codex via codex-delegate |

## Workflow

```
User request
    │
    ▼
Claude — read .ai/README.md + relevant CDD slice (decisions.md, naming, contrast)
    │
    ▼
Claude — author .specs/verodesign/{scope}.md (token/theme/pattern intent)
    │
    ▼
Claude — confirm naming/role with user (do NOT read token JSON yet)
    │
    ▼
Claude — call mcp__codex__codex per .add/codex-delegate.md prompt template
    │
    ▼
Codex — edit tokens/themes, run build + contrast, return compressed summary
    │
    ▼
Claude — verify summary vs scope
    │
    ├── APPROVE → trigger .add/doc-sync.md if new knowledge confirmed
    └── FIX_REQUIRED → mcp__codex__codex-reply with same threadId
```

## Workflows (ADD)

| Action | Workflow |
| ------ | -------- |
| **Any token/theme/pattern edit once scope is approved** | `.add/codex-delegate.md` |
| Add new token | `.add/token-add.md` |
| Add new theme | `.add/theme-add.md` |
| Release | `.add/release.md` |
| Update consumer (veronex/verobase/dreamstock) | `.add/consumer-update.md` |
| Doc sync | `.add/doc-sync.md` |
| Deprecate token | `.add/deprecate.md` |
| WCAG contrast audit | `.add/contrast-audit.md` |
| Pattern research | `.add/pattern-research.md` |
| Pattern intake | `.add/pattern-intake.md` |
| Pattern promote | `.add/pattern-promote.md` |
| Pattern deprecate | `.add/pattern-deprecate.md` |
| v0.2.0 size + perf optimization | `.add/optimize-2026.md` |

## Critical Rules

| Rule | Reason |
| ---- | ------ |
| Read `.ai/README.md` and `decisions.md` before any token-affecting work | L1 routes to the right L2 SSOT |
| Treat `docs/llm/` as Layer 2 SSOT | All planning derives from here |
| Spec-first: no Codex delegation without `.specs/verodesign/{scope}.md` | ADD requires scope boundary |
| Naming is policy, not implementation | Claude owns it; do not let Codex pick names |
| Contrast trade-offs require Claude review | WCAG AAA is non-negotiable |
| ≤400 token cap on Codex prompts/responses | Token hygiene per `.add/codex-delegate.md` |
| No AI/LLM mention in commits or PRs | Project policy |

## Codex MCP Cheat Sheet

| Tool | Use |
| ---- | --- |
| `mcp__codex__codex` | Fresh session — new token/theme/pattern scope |
| `mcp__codex__codex-reply` | Continue session via `threadId` — naming clarification, contrast tweak |

Required args: `cwd=/Users/vero/workspace/beegy/verodesign`, `sandbox=workspace-write`, `approval-policy=never`. Read-only audit: `sandbox=read-only`.

## 20 / 80 Allocation (2026 consensus)

Industry pattern: "Claude for architecture, Codex for keystrokes."

| Allocation | Owner | Examples |
| ---------- | ----- | -------- |
| Top 20% — naming, semantic role, contrast policy, pattern lifecycle | Claude | spec authoring, naming decisions, contrast trade-offs |
| Bottom 80% — keystrokes | Codex | DTCG JSON edits, theme generation, build pipeline, contrast retries |

Empirical: same task on Codex CLI uses ~4× fewer tokens than Claude Code. Hybrid catches more bugs than either alone. Default to delegate; naming and contrast trade-offs stay in Claude — those are policy, not implementation.
