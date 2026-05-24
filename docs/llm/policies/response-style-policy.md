# Response Style Policy

> SSOT for how LLM agents (Claude Code, Codex, Gemini CLI, ...) answer **non-code-modification** questions in this repo. **Last reviewed**: 2026-05-24.

## Rule (non-negotiable)

For **any answer that is not the code/config change itself**, follow BLUF + 3-section briefing. Stop after Effect. Do not pre-emptively elaborate. Wait for follow-up.

```
<one-sentence BLUF — the conclusion>

**Purpose**: <one sentence — why this is being done>
**Scope**: <files / components / lines / namespaces touched>
**Effect**: <observable outcome — what changes, what unblocks>
```

Optional follow-up — **only when user asks "why?" / "explain" / "근거" / "이유"**:

```
**Why**: <evidence, root-cause chain, references>
**Trade-offs**: <alternatives considered, why rejected>
```

## Why this policy exists

Synthesized from 2026 best practice (Redis, Obvious Works, FourWeekMBA Minto Pyramid, Anthropic prompting guide, arXiv SkillReducer):

- **Cost** — Agentic LLMs are the most token-intensive pattern. Verbose preamble + recap easily doubles tokens per turn. Concise structured responses cut 30–50% baseline (Obvious Works, Redis).
- **Decision speed** — Operator behaves like a senior reviewer ("상사"): needs conclusion first, evidence on demand. Minto Pyramid is the canonical executive-briefing structure.
- **Quality** — "Verbosity only helps when it adds specificity; verbosity alone makes outputs worse, not better" (Anthropic prompting guide 2026). Direct terse prompts deserve direct terse answers.
- **Hallucination surface** — "Cap response length on factual outputs. Long free-form continuations have more surface area for fabrication" (MDPI hallucination mitigation tutorial 2026).
- **User mandate** (2026-05-24) — "보고서처럼 목적, 변경범위, 이펙트, 더 필요하면 상사가 왜바꿔요 할때 이래서 바꾼다 답변."

## Scope — when this applies

- ✅ Status updates ("진행 상태 알려줘", "어디까지 됐어")
- ✅ Diagnostic findings ("왜 안 돼", "어떤 문제야")
- ✅ Design / approach proposals ("어떻게 할 거야")
- ✅ Research / web-search summaries
- ✅ Post-action reports (after edits / commits)
- ✅ Plan mode prose (the plan file itself follows its own structure)

## Scope — when this does NOT apply

- ❌ The code / config diff itself (diff is the answer, no prose needed)
- ❌ Direct tool output the user explicitly requested (e.g., "show me `kubectl get pods`")
- ❌ User explicitly asks for detailed explanation ("자세히 설명해줘", "근거 설명")
- ❌ Operator-only context where the user wants step-by-step narration

## Template

```
<BLUF sentence>.

**Purpose**: <one sentence>
**Scope**: <file:line or component list>
**Effect**: <outcome>
```

Status-update variant (mid-task):
```
<BLUF sentence>.

**Done**: <list>
**Doing**: <current>
**Next**: <next step or blocker>
```

Diagnostic variant:
```
<BLUF — root cause in one sentence>.

**Symptom**: <observable>
**Cause**: <one sentence>
**Fix**: <action / file / commit>
```

## Anti-patterns (do not do)

- ❌ Multi-paragraph preamble before the answer ("Let me explain... First, ... Now, ...")
- ❌ Re-stating the user's question
- ❌ "Here's what I did" recap when the diff is visible
- ❌ Defensive caveats ("It's worth noting...", "Keep in mind that...", "However, ...")
- ❌ Apologetic openers ("Great question!", "Sure!", "Of course!")
- ❌ Trailing wrap-up ("In summary, ...", "To recap, ...")
- ❌ Listing every alternative considered when one was chosen
- ❌ Quoting full tool output back to the user when a 1-line excerpt suffices

## Anti-anti-pattern (do NOT over-compress)

Brevity does not mean omission. The 3 sections must each be present. A 1-line answer with no Purpose/Scope/Effect is too terse — the operator cannot review.

## Validation (informal)

- Average non-code response ≤ 8 sentences
- BLUF visible in the first line of the message
- "Why" / "Trade-offs" only appear when user requested them in the prior turn

## Related

- [token-optimization.md](token-optimization.md) — token-saving policies (document-side)
- [anti-drift-checklist.md](anti-drift-checklist.md) — agent self-check on edits
- [../../AGENTS.md](../../AGENTS.md) — Tier-0 critical rule "Response Style: BLUF + 3-section briefing"
- `.agents/skills/README.md` — trigger map row "Reporting status / diagnostic / design proposal"
