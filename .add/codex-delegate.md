# Codex Delegate

> ADD Reference | Delegate implementation to Codex MCP. Claude plans, Codex executes.

## Purpose

Token-economical split: Claude owns scope, contrast policy, pattern lifecycle decisions. Codex owns token edits, theme generation, doc sync, build verification, and retry loops.

## MCP Tools

| Tool | Use |
|------|-----|
| `mcp__codex__codex` | Start new Codex session — `prompt`, `cwd`, `sandbox`, `approval-policy` |
| `mcp__codex__codex-reply` | Continue same session via `threadId` |

## Required Args

| Arg | Default | Notes |
|-----|---------|-------|
| `cwd` | `/Users/vero/workspace/beegy/verodesign` | Always absolute |
| `sandbox` | `workspace-write` | `read-only` for token survey or pattern audit |
| `approval-policy` | `never` | Codex retries without round-tripping Claude |
| `prompt` | — | Reference target workflow + result format |

## Decision Matrix

| Task | Delegate | Stay in Claude |
|------|----------|----------------|
| Add primitive or semantic token via `token-add.md` | ✓ | ✗ |
| Add theme via `theme-add.md` | ✓ | ✗ |
| Mark deprecated via `deprecate.md` | ✓ | ✗ |
| Run `contrast-audit.md` (WCAG validation across themes) | ✓ | ✗ |
| Pattern intake via `pattern-intake.md` | ✓ | ✗ |
| Pattern promote / deprecate per `pattern-promote.md` / `pattern-deprecate.md` | ✓ | ✗ |
| Consumer update — bump in verobase / veronex / dreamstock | ✓ | ✗ |
| Doc sync via `doc-sync.md` | ✓ | ✗ |
| `optimize-2026.md` execution (`@property`, `light-dark()`, `color-mix()`, `@scope`) | ✓ | ✗ |
| Naming a new semantic role (`text-warning-strong` vs `feedback-warn`) | ✗ | ✓ |
| Decide if a pattern graduates from experimental to canonical | ✗ | ✓ |
| Contrast trade-off between themes | ✗ | ✓ |
| One-line typo / single var rename | ✗ | ✓ |

## Handoff Pattern

| Step | Owner | Action |
|------|-------|--------|
| 1 | Claude | Pick workflow from `.add/README.md`, write scope (token name, theme target, pattern source URL, etc.) |
| 2 | Claude | Confirm naming/role decisions; do NOT read source files |
| 3 | Claude | Call `mcp__codex__codex` with template below |
| 4 | Codex | Edit tokens/themes/patterns, run build + contrast checks, retry on failure |
| 5 | Codex | Return compressed summary |
| 6 | Claude | Verify against scope; trigger `doc-sync.md` if needed |

## Prompt Template

```
Workflow: <e.g. token-add.md>
Scope:
  - <token name / theme name / pattern URL / consumer version>
  - <semantic role / primitive value / contrast intent>

Follow .add/<workflow>.md exactly. Respect:
- WCAG AAA contrast targets across all themes (run contrast-audit.md if uncertain)
- No emoji, no decorative unicode in any token doc
- Semantic naming over primitive (`text-success` not `green-700`)
- Light/dark variants for every semantic token

Run: pnpm build, pnpm test, contrast checks. Retry up to 3 times on failure.

Return ONLY:
- changed files (path — one-sentence intent)
- token count delta (added / modified / deprecated)
- contrast verdict per theme (pass/fail with offending pairs)
- consumer impact (which consumers need a bump)
DO NOT paste CSS, code, or build logs. ≤400 tokens.
```

## Review Pipeline

Three layers. Layers 1–2 cost zero Claude tokens.

| Layer | Runner | Scope | Claude tokens |
|-------|--------|-------|---------------|
| 1. Mechanical | Codex (impl session) | build, contrast, lint, workflow checklist | 0 |
| 2. Fresh-eyes | Codex (new session, no impl context) | naming consistency, semantic vs primitive leakage, theme symmetry | 0 |
| 3. Gate | Claude | reads Layer 2 report; spot-reads only flagged tokens/files | ≤500 |

### Layer 2 Prompt

Start a fresh `mcp__codex__codex` session:

```
Review the diff at HEAD against the workflow used: <name>.md.
You did NOT write this — review with fresh eyes.

Report ONLY:
- naming drift (primitive name leaked into semantic API)
- missing theme variants (added in light, missing in dark, etc.)
- contrast regressions (pairs failing AAA)
- forbidden patterns (emoji, decorative unicode, hardcoded hex outside primitives)
- consumer breaking changes not flagged in workflow
- verdict: APPROVE / FIX_REQUIRED
DO NOT paste CSS or code. ≤300 tokens.
```

### When Claude Reads Source

| Trigger | Reason |
|---------|--------|
| Layer 2 `FIX_REQUIRED` with naming ambiguity | Naming is policy |
| Pattern graduation decision | SSOT call |
| Contrast trade-off between themes | Judgment call |
| User explicitly requests Claude review | Intent |

## Response Compression Rules

| Rule | Reason |
|------|--------|
| No CSS / code in response | Pasting back into Claude defeats savings |
| Token delta as counts only | Names matter only when flagged |
| Contrast result as `theme: pass/fail + offending pairs` | Cap at 5 pairs |
| Consumer impact as version bump list, not diff | Detail lives in changelog |
| ≤400 tokens default | Adjust for full theme add |

## Sandbox Selection

| Goal | Sandbox |
|------|---------|
| Token survey, pattern audit | `read-only` |
| Token add / theme generate / pattern absorb | `workspace-write` |
| Touch consumer repos (verobase/veronex/dreamstock) | Stay in Claude — cross-repo work needs explicit scope |

## Continuation

Reuse `codex-reply` with `threadId` when:

| Case | Why |
|------|-----|
| Layer 2 flagged a naming fix | Avoid re-priming |
| Contrast pair failed, single tweak | Cheaper than fresh session |
| Adding a follow-up token in same family | Keep context warm |

Start fresh on workflow change or release tag.

## Token Hygiene

| Anti-pattern | Fix |
|--------------|-----|
| Claude reads token files to write spec | Ask Codex (read-only) for token survey |
| Codex returns full CSS | Enforce 400-token cap |
| Claude reviews every contrast pair | Trust Layer 2 verdict; spot-check failures only |
| Multiple fresh sessions for related tokens | Use `codex-reply` |

## Escalation

If Codex flags `FIX_REQUIRED` due to naming ambiguity, contrast trade-off, or pattern lifecycle uncertainty — return to Claude. Update scope, then redelegate. Naming is policy, not implementation.

## Empirical Targets (2026 data)

| Source | Reduction |
| ------ | --------- |
| GitHub Agentic Workflows post-fix | 62% sustained over 109 runs |
| Focused-task case studies | 40–70% |
| Anthropic prompt caching (static-first layout) | up to 90% on cached prefix tokens |
| This repo's hybrid Claude+Codex target | 25–30% conservative, 40–50% achievable |

Risk: subagent-heavy / multi-session workflows can use **4–7× more** tokens than single-thread sessions if used for small tasks. Skip delegation for one-line typo fixes or single var renames — naming itself stays in Claude regardless.

Cache hygiene (Anthropic 5-min TTL since 2026 Q1):

| Rule | Reason |
| ---- | ------ |
| Static prefix before per-request material | Tools, system, `.ai/`, `decisions.md`, this file |
| No dynamic timestamps in static sections | One shifting byte invalidates the whole prefix |
| Reuse `mcp__codex__codex-reply` over fresh sessions | Forks reuse parent prompt cache |

## Sources (2026)

- [Anthropic Prompt Caching 2026](https://aicheckerhub.com/anthropic-prompt-caching-2026-cost-latency-guide)
- [GitHub Agentic Workflows token efficiency](https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/)
- [OpenAI Codex Best Practices](https://developers.openai.com/codex/learn/best-practices)
- [Claude Code Subagents 2026 Guide](https://nimbalyst.com/blog/claude-code-subagents-guide/)
- [Codex CLI vs Claude Code 2026](https://particula.tech/blog/codex-vs-claude-code-cli-agent-comparison)
