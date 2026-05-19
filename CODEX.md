# CODEX.md

> Codex entry point — derived from [AGENTS.md](AGENTS.md) | **Last Updated**: 2026-05-10

## Role

**Implementer.** Codex executes the token/theme/pattern change plan that Claude has already approved and written. Codex does not author scopes, decide naming, debate pattern graduation, or update `.ai/` / `docs/llm/`. See [AGENTS.md#agent-role-split](AGENTS.md#agent-role-split).

| Codex Does | Codex Does NOT |
| ---------- | -------------- |
| Read `.specs/verodesign/{scope}.md` | Expand scope beyond what spec lists |
| Edit DTCG JSON in `tokens/`, `themes/` | Author or rewrite `.specs/verodesign/*` |
| Run `pnpm build` (Style Dictionary) + contrast checks | Edit `.ai/` or `docs/llm/` (Claude only) |
| Retry up to 3× on build / contrast failure | Pick semantic names on its own |
| Return compressed summary (≤400 tokens, no CSS/diffs) | Decide pattern graduation (experimental → canonical) |
| Flag scope deviations explicitly | Silently expand into adjacent token files |

## Start

Always read in this order before touching tokens:

1. `.specs/verodesign/{scope}.md` — change boundary (approved by human)
2. `.add/<workflow>.md` — workflow Claude pointed to (token-add, theme-add, pattern-intake, etc.)
3. `.add/codex-delegate.md` — response format / review pipeline contract
4. `docs/llm/decisions.md` — master architectural decisions
5. `.ai/README.md` — entry overview
6. (For pattern work) `docs/llm/research/llm-knowledge-gaps.md` — when to defer to web search

If `.specs/verodesign/{scope}.md` does not exist, **stop and return** `scope unclear`. Do not improvise naming.

## Frameworks

| Directory | Framework | Codex's Job |
| --------- | --------- | ----------- |
| `.ai/` + `docs/llm/` | CDD | **Read-only**. Treat as constraints. Never edit. |
| `.specs/` | SDD | Read scope; mark task progress only |
| `.add/` | ADD | Read the workflow Claude pointed to |
| `tokens/`, `themes/` | Implementation surface | Editable per scope |

## Verodesign Context

| Layer | Tech |
| ----- | ---- |
| Token format | W3C DTCG JSON |
| Build pipeline | Style Dictionary 4.x |
| Color space | OKLCH primary, sRGB hex fallback |
| Tier model | 3-tier (primitive / semantic / component-deferred) |
| Theme | Orthogonal binding layer (`tokens/themes/{name}.json`) |
| Cascade | `@layer reset, base, vds-tokens, vds-utilities, components, overrides` |
| Module | ESM only |

| Consumer | Theme | Import |
| -------- | ----- | ------ |
| veronex/web | veronex | `@verobee/design/css/themes/veronex.css` |
| verobase/web/* | verobase | `@verobee/design/css/themes/verobase.css` |
| dreamstock | (default + experimental) | `@verobee/utilities/css/full.css` + `vds-exp-dreamstock-*` |

## Critical Rules

| Rule | Detail |
| ---- | ------ |
| Spec-first | No token / theme edits without an active `.specs/verodesign/{scope}.md` |
| Stay in scope | Edit only what spec lists; flag deviations |
| CDD read-only | Never modify `.ai/`, `docs/llm/`, `docs/en/`, `docs/kr/` |
| Token tier | Strict 3-tier; never skip; component tier deferred to `@verobee/design-react` |
| Naming policy | Semantic uses purpose not appearance; platform-agnostic. **Naming itself is Claude's call** — Codex implements the name spec gives |
| Hardcoding | Forbidden in tokens — every value either OKLCH (primitive) or `{path}` reference |
| Contrast | AA 4.5:1 mandatory for all text; AAA 7:1 mandatory for primary tier. Build aborts on violation |
| Multi-theme | Brand-specific changes go in `tokens/themes/{name}.json` only; semantic schema stays uniform |
| SemVer | Token rename = major; value change = minor; addition = patch |
| Prefix | CSS `--vds-*`, utility classes `vds-*` |
| No AI/LLM mention in commits or PR text | Project policy |

## QA Gate (run before returning summary)

```bash
pnpm build              # Style Dictionary pipeline; aborts on contrast violation
pnpm test               # token + naming + tier consistency tests
# Pattern work: also run pattern-related lint / catalog check
```

Retry up to 3 cycles on failure. If contrast still fails after 3 retries, return `FIX_REQUIRED` with offending pairs (≤5 pairs).

## Response Format (back to Claude)

Hard cap **≤400 tokens**. Return only:

- `changed files`: one line each → `path — one-sentence intent`
- `token delta`: `added: N / modified: N / deprecated: N` (counts only, names if ≤5)
- `contrast result per theme`: `theme-name: pass` or `theme-name: fail (5 pairs max)`
- `consumer impact`: which downstreams need a bump (verobase / veronex / dreamstock)
- `scope deviations`: any spec item not implementable as written
- `verdict` (if you ran a fresh-eyes review): `APPROVE` or `FIX_REQUIRED`

Forbidden: CSS blocks, full token JSON, diffs, build logs.

## Self-Review Checklist (before returning)

| Check | Required |
| ----- | -------- |
| All spec items closed or flagged | ✓ |
| `pnpm build` zero contrast violations | ✓ |
| Tier respected (primitive / semantic / component-deferred) | ✓ |
| Theme variants symmetric (added in light + dark, etc.) | ✓ |
| No hardcoded hex outside primitives | ✓ |
| No emoji or decorative unicode in token docs | ✓ |
| Consumer impact noted if export surface changed | ✓ |
| No AI/LLM mention in commit message | ✓ |

## Escalation

Return to Claude (do not improvise) when:

- `.specs/verodesign/{scope}.md` is missing or contradicts itself
- A naming choice is ambiguous (semantic role unclear)
- Contrast cannot be satisfied without trade-off across themes
- Pattern graduation is implied but not explicit
- 3 retries still fail on the same gate
- New primitive needed (token policy decision)

## Compaction & Internal Subagents (2026)

| Tactic | When |
| ------ | ---- |
| `/compact` | Long thread before a major step — preserves intent, drops verbose history |
| Internal Codex subagent | Bounded exploration, running test suites, triage — keeps verbose output out of the main thread |
| Plan mode (`/plan`) | Complex tasks — produces an execution plan you can review without modifying code |
| One thread per coherent unit | Fork only when work truly branches; do not multiplex |

Subagents are NOT automatically cheaper — heavy multi-agent flows can use 4–7× more tokens than a single thread. Only spawn one when isolating verbose output beats the spawn overhead.

## Reference

Full delegation contract: [.add/codex-delegate.md](.add/codex-delegate.md).
