# Anti-drift Checklist

> Concrete steps an LLM agent (or human) must verify before / during / after edits to keep CDD/ADD docs and AGENTS.md tool variants in sync. **Last reviewed**: 2026-05-24.

This list is the **post-edit verification** for any change to root-level docs, `.ai/`, `.agents/skills/`, or `docs/llm/policies/` + `docs/llm/decisions/`. Run mentally before committing.

## When editing AGENTS.md

- [ ] Stays ≤ 150 lines
- [ ] No tool-specific keywords in body: `grep -E "(Claude Code|Codex|MCP|TaskCreate|/loop|/ultrareview|Skill|Anthropic|OpenAI Codex|Gemini CLI)" AGENTS.md` returns nothing
- [ ] **Body changes synced verbatim into CLAUDE.md and CODEX.md** (and GEMINI.md placeholder when present)
- [ ] CLAUDE.md `## Claude Code Addendum` block carries Claude-specific text only
- [ ] CODEX.md `## Codex Addendum` block carries Codex-specific text only
- [ ] Critical Rules section still references the 5 core SSOTs (see §Critical SSOT links below)

## When editing CLAUDE.md or CODEX.md (or GEMINI.md)

- [ ] Body above `## <Tool> Addendum` is **byte-identical** to AGENTS.md
- [ ] Only the addendum block carries tool-specific behavior
- [ ] No new section invented outside the addendum (if needed, promote to AGENTS.md instead)

## When adding a new `.agents/skills/*.md` playbook

- [ ] Has YAML frontmatter with REQUIRED keys: `name`, `description`, `when`, `tags`, `tier`.
- [ ] `description` field MUST contain real trigger phrases from the playbook body (semantic-discovery anchor per agentskills.io spec — NOT a paraphrase of `when`).
- [ ] Listed in `.agents/skills/README.md` decision-tree TOC + file-ownership table
- [ ] ≤ 200 lines (soft cap; > 500 is hard fail in check script)
- [ ] If it overlaps an existing playbook, consolidate instead of duplicating

## When removing a `.agents/skills/*.md` playbook

- [ ] Removed from `.agents/skills/README.md` TOC + file-ownership table
- [ ] No cross-link in other `.agents/skills/`, `docs/llm/`, `AGENTS.md`, `.ai/` references it (grep)

## When adding a new `docs/llm/policies/*.md`

- [ ] Listed (or implicitly indexed) under `.ai/` or referenced from AGENTS.md if it is one of the **core SSOTs**
- [ ] Bi-directional links: this doc links to related docs AND they link back
- [ ] If it is a "do not do X" policy, it includes an Anti-patterns section
- [ ] If it codifies an incident lesson, an ADR exists in `docs/llm/decisions/`

## When adding an `docs/llm/decisions/*.md` ADR

- [ ] Filename starts with date (`YYYY-MM-DD-<slug>.md`) for incident ADRs
- [ ] Cross-links the policy doc(s) that codify the lesson
- [ ] Lists the anti-patterns the ADR rules out

## When adding a new workload (Helm values, AppProject, etc.)

- [ ] Image source follows [image-source-policy.md](image-source-policy.md): upstream form, in `mirror-list.txt`, NOT a direct mirror URL
- [ ] nodeSelector / tolerations follow [workload-placement.md](workload-placement.md)
- [ ] Cluster needs `/etc/hosts` pin? Verify [host-netns-precondition.md](host-netns-precondition.md)
- [ ] Layer (L0/L1/L2) follows [deployment-flow.md](deployment-flow.md)
- [ ] Response to operator follows [response-style-policy.md](response-style-policy.md)

## When mirror-list.txt changes

- [ ] New entry added BEFORE the workload referencing it
- [ ] `mirror-reconciler` next run verified or manually triggered
- [ ] Mirror availability HTTP-checked: `curl -sk -o /dev/null -w '%{http_code}' https://gitea.beegy.net/v2/<scope>/<image>/manifests/<tag>` → 200/401

## Critical SSOT links (must always be reachable from AGENTS.md)

These NINE files form the policy core. AGENTS.md must contain a one-line link or table row for each (verified by `check-agent-portability.sh` §6):

1. [cdd.md](cdd.md) — Core Values + Fail-Fast (source mandate)
2. [tool-portability.md](tool-portability.md) — LLM-tool-neutrality + anti-patterns + swap-test
3. [documentation-tiers.md](documentation-tiers.md) — tier roles
4. [response-style-policy.md](response-style-policy.md) — BLUF + 3-section briefing
5. [image-source-policy.md](image-source-policy.md) — mirror, never direct upstream
6. [workload-placement.md](workload-placement.md) — hub-spoke, nodeSelector, K8s topology
7. [deployment-flow.md](deployment-flow.md) — L0 → L1 → L2 single direction
8. [host-netns-precondition.md](host-netns-precondition.md) — /etc/hosts pin
9. This file ([anti-drift-checklist.md](anti-drift-checklist.md))

## Future CI placeholder

`scripts/docs/check-agent-portability.sh` will fail-build on:
- `grep` matches tool-specific keywords in AGENTS.md
- diff between AGENTS.md body and CLAUDE.md / CODEX.md / GEMINI.md body (addendum stripped)
- any `.agents/skills/*.md` lacking frontmatter
- any `.agents/skills/*.md` not indexed in `.agents/skills/README.md`

Until that lands, this checklist is the manual gate.

## Related

- [documentation-tiers.md](documentation-tiers.md)
- [../../AGENTS.md](../../AGENTS.md)
- `.agents/skills/README.md`
