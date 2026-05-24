# CODEX.md

> Manually synced from [AGENTS.md](AGENTS.md) — DO NOT diverge body. Edit AGENTS.md, then re-sync. Future: CI automation. **Last reviewed**: 2026-05-24.

<!-- ────────────────────────────────────────────────────────────── -->
<!-- BEGIN AGENTS.md body (verbatim sync)                            -->

## Project

**verodesign** — Verobee Design System (VDS). W3C DTCG JSON tokens + Style Dictionary 4.x pipeline producing CSS variables, utility classes, and TypeScript types for vero* product family. Consumer of the platform-gitops organization standard.

## Core Values (non-negotiable — every decision must respect both)

- **Token optimization** — hallucination prevention + consistency + re-work prevention + minimum-hop retrieval + cost reduction. SSOT: [docs/llm/policies/cdd.md § Core Values](docs/llm/policies/cdd.md).
- **LLM-tool-neutrality** — any underlying coding agent must be swappable AND able to run concurrently. Body of this file is tool-neutral; per-tool behavior lives in each variant's addendum only. SSOT: [docs/llm/policies/tool-portability.md](docs/llm/policies/tool-portability.md).
- **Fail-Fast / STOP / Escalate** — enforceable hard caps (max attempts, max wall-clock, mandatory escalation for destructive actions or unverified preconditions). SSOT: [docs/llm/policies/cdd.md § Fail-Fast](docs/llm/policies/cdd.md).

## Critical Rules

- **Response style** — every non-code answer follows BLUF + 3-section briefing (`목적 / 변경범위 / 이펙트`). Elaborate only when asked. SSOT: [docs/llm/policies/response-style-policy.md](docs/llm/policies/response-style-policy.md).
- **Image source** — never pin direct upstream URLs as the final pulled image. Use upstream form, let the in-cluster mirror + Kyverno rewrite do their job. SSOT: [docs/llm/policies/image-source-policy.md](docs/llm/policies/image-source-policy.md).
- **Workload placement** — follow the hub-spoke decision tree. L2 operators on home-KR workers. L1/control-plane on masters. DB on the dedicated DB node. SSOT: [docs/llm/policies/workload-placement.md](docs/llm/policies/workload-placement.md).
- **Deployment flow** — strictly L0 (Ansible) → L1 (Terraform) → L2 (ArgoCD). No reverse deps. L2 must never affect L1/L0. SSOT: [docs/llm/policies/deployment-flow.md](docs/llm/policies/deployment-flow.md).
- **Host-netns precondition** — home-KR workers need `k8s-domain-pin` `/etc/hosts` entries before L2 image pulls work. SSOT: [docs/llm/policies/host-netns-precondition.md](docs/llm/policies/host-netns-precondition.md).
- **Secrets** — never commit to git. OpenBao (L1) + ansible-vault (L0) + ExternalSecrets (L2) only. Local operator working copy: `.secrets/` (gitignored). SSOT: [docs/llm/policies/secrets-management.md](docs/llm/policies/secrets-management.md).
- **GitOps** — git is truth. Never `kubectl apply` for ArgoCD-managed resources.
- **Language** — code, docs, commits in English. (Conversation may be Korean.)
- **Commits** — no AI attribution lines, no "Generated with", no Co-Authored-By bots.

## Quick Start (read in order)

1. [.ai/README.md](.ai/README.md) — Tier-1 keyword index (policies + skills)
2. [.agents/skills/README.md](.agents/skills/README.md) — Tier-1p skill catalog (book-style TOC)
3. [docs/llm/policies/documentation-tiers.md](docs/llm/policies/documentation-tiers.md) — what every doc tier means

## Methodology — CDD / SDD / ADD

| Policy | Purpose | SSOT |
|--------|-----------------------------------------------|------------------------------------------------------|
| CDD | Context-Driven Development (HOW patterns) | [docs/llm/policies/cdd.md](docs/llm/policies/cdd.md) |
| SDD | Spec-Driven Development (WHAT to build) | [docs/llm/policies/sdd.md](docs/llm/policies/sdd.md) |
| ADD | Agent-Driven Development (DO the work) | [docs/llm/policies/add.md](docs/llm/policies/add.md) |

Flow: Human approves SDD scope → LLM generates SDD tasks → LLM executes ADD reading CDD patterns → LLM updates CDD after completion.

## Documentation Tiers

| Tier | Path | Audience | Role | Limit | Editable |
|------|---------------------|----------------|-------------------------------|-------------|-----------------|
| 0 | `AGENTS.md` (root) | All LLM tools | Router → Tier-1 | ≤150 lines | Yes (SSOT) |
| 1 | `.ai/` | LLM | Keyword index / TOC | ≤50/file | Yes |
| 1p | `.agents/skills/` | LLM | Skills (agentskills.io spec) | ≤200/file | Yes |
| 2 | `docs/llm/` | LLM | Deep SSOT | (split >300) | Yes |
| 3 | `docs/en/` | Human (en) | Generated site | — | No (generated) |
| 4 | `docs/kr/` | Human (ko) | Translated site | — | No (generated) |

Definitions: [docs/llm/policies/documentation-tiers.md](docs/llm/policies/documentation-tiers.md).

## Directory Layout

| Directory | Purpose |
|--------------------------|--------------------------------------------------------------------------------------|
| `packages/` | pnpm workspaces — `@verobee/design` tokens, `@verobee/design-react`, `@verobee/utilities`, theme packages |
| `docs/` | Tier-2 LLM SSOT (`docs/llm/`), policies, decisions, build pipeline notes |
| `.ai/` | Tier-1 LLM keyword index |
| `.agents/skills/` | Tier-1p skill canonical (agentskills.io spec) — per-tool symlinks in `.claude/skills/` / `.codex/skills/` / `.gemini/skills/` / `.cursor/skills/` |
| `.specs/` | SDD 3-layer specs |
| `.add/` | ADD workflow prompts |
| `scripts/` | Build / sync / portability scripts |

## Commit Format

```
type(scope): short imperative description

Types: feat, fix, chore, docs, refactor, test
```

## Sync Protocol — tool variants

Currently **manual sync** (future scope: CI generation). When this file changes:

1. Copy AGENTS.md body verbatim into each per-tool variant above its `## <Tool> Addendum` block.
2. Each variant's addendum carries ONLY that tool's specifics (per-tool slash commands, native skill names, vendor-specific tool integrations).
3. Verify body is tool-neutral and run the anti-drift checklist: [docs/llm/policies/anti-drift-checklist.md](docs/llm/policies/anti-drift-checklist.md) — it specifies the exact grep pattern, kept out of this file to avoid self-match.

## Critical SSOT links (the policy core)

- [cdd.md](docs/llm/policies/cdd.md) — Core Values + Fail-Fast (the source mandate)
- [sdd.md](docs/llm/policies/sdd.md) — Spec-Driven Development (WHAT)
- [add.md](docs/llm/policies/add.md) — Agent-Driven Development (DO)
- [tool-portability.md](docs/llm/policies/tool-portability.md) — LLM-tool-neutrality + anti-patterns + swap-test
- [organization-standard.md](docs/llm/policies/organization-standard.md) — platform-gitops as Tier-0 SSOT for the organization (v1.0.0)
- [distribution.md](docs/llm/policies/distribution.md) — manual workflow_dispatch + semver release to `agentic-dev-protocol`
- [response-style-policy.md](docs/llm/policies/response-style-policy.md) — answer brevity
- [token-optimization.md](docs/llm/policies/token-optimization.md) — cache hygiene + retrieval discipline
- [documentation-tiers.md](docs/llm/policies/documentation-tiers.md) — doc tier roles
- [anti-drift-checklist.md](docs/llm/policies/anti-drift-checklist.md) — edit-time verification
- [secrets-management.md](docs/llm/policies/secrets-management.md) — `.secrets/` operator inbox + canonical stores

Recent decisions: [docs/llm/decisions/](docs/llm/decisions/). Skills: [.agents/skills/README.md](.agents/skills/README.md).
<!-- END AGENTS.md body                                              -->
<!-- ────────────────────────────────────────────────────────────── -->

## Codex Addendum

OpenAI-Codex-CLI-specific behavior on top of the shared AGENTS.md policy.

### Response style (reinforces AGENTS body)

- BLUF + 3-section briefing (`목적 / 변경범위 / 이펙트`) is the default for non-code responses, per [response-style-policy.md](docs/llm/policies/response-style-policy.md).
- Avoid lengthy preamble. State result first, evidence on request.

### Tool conventions

- Codex CLI shell commands run in the current working directory; prefer absolute paths in scripts to avoid surprises across sessions.
- When invoking other CLI tools (`kubectl`, `helm`, `terraform`, `git`), batch related read-only checks into a single command with `&&` or `;` to reduce round-trips.

### Plan / multi-step work

- Surface a 3-5 line plan before any multi-file edit. State files to change, in order.
- Confirm before destructive git operations (`reset --hard`, force push, branch delete).

### Memory

- Codex CLI does not have a persistent memory store akin to other tools — rely on `AGENTS.md`, `.ai/`, `.agents/skills/` for cross-session context. Record durable lessons as ADRs in `docs/llm/decisions/`.

### Edits

- Modify existing files in place. Avoid creating parallel `*.new.yaml` files; replace the original and let git track the diff.
