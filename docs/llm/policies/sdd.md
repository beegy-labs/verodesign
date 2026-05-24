# SDD (Spec-Driven Development) Policy

> CDD-derived change plan for AI-native organizations | **Last Updated**: 2026-05-24

## Audience principle (CRITICAL)

`.specs/` is **LLM-only**. Human readability is NOT a default requirement — humans needing to read these MUST request a reformatted view in the conversation. Apply [token-optimization.md](token-optimization.md) rules in full (tight tables, no alignment padding, no decorative formatting, max 2-level nesting, BLUF order).

When a human explicitly asks for an SDD summary or review, generate a human-readable Tier-3-style view ON DEMAND, in the conversation. Do not maintain a parallel human-readable copy in `.specs/`.

## 3-layer structure

`.specs/<unit>/` MUST have these three sub-directories. Each layer has REQUIRED frontmatter and a defined hand-off contract to the next.

| Layer | Path | Owns | Required frontmatter | Hand-off to next |
|---|---|---|---|---|
| 1. Roadmap | `.specs/<unit>/roadmap/` | High-level intent, scope boundaries, prior decisions | `unit`, `status`, `owner`, `updated` | When `status: approved`, generate scopes |
| 2. Scopes | `.specs/<unit>/scopes/<id>/` | Decomposed scope per phase or component, constraints, acceptance criteria | `id`, `roadmap_ref`, `status`, `acceptance` | When `status: approved` AND `acceptance` defined, decompose into tasks |
| 3. Tasks | `.specs/<unit>/tasks/<id>/` | Atomic executable task, file-level changes, verification | `id`, `scope_ref`, `status`, `verification`, `requires_human_approval` | When `status: done` AND `verification` passes, feed back to CDD via post-task-cdd-sync |

## Acceptance + verification criteria (mandatory)

Every Scope and every Task MUST define explicit acceptance / verification criteria (AWS Kiro 6-step pattern: Constitution → Specify → Plan → Tasks → Implement → Verify). No task is `done` without:

- `verification`: list of concrete commands / observable outputs that prove the task is complete.
- `requires_human_approval`: boolean. When `true`, ADD STOPs before merge and surfaces a BLUF to the human.

Without these fields, the task is rejected by ADD as ungrounded.

## Definition

> Fixed definition: `identity.md`

SDD is the **CDD-derived change plan** of the AI-native organization.

SDD transforms specific requests into executable plans that ADD auto-executes. It is not a general roadmap document — it is a CDD-based change plan.

SDD does not manage projects. SDD plans changes for ADD.

## Purpose

- Interpret change requests
- Define change scope
- Analyze impact
- Decompose into work units
- Define ordering and dependencies
- Define completion criteria
- Deliver executable plans to ADD

## Questions SDD Answers

- What is changing?
- Why is it changing?
- What is the scope boundary?
- What is affected?
- In what order should execution proceed?
- When is it complete?

## Change Types

SDD handles all types of system change:

| Change Type | Description | Example |
|-----------|-----------|-------|
| **Add** | New capability | New API endpoint, new domain |
| **Change** | Modify existing behavior | Update business rule, refactor |
| **Delete** | Remove capability | Deprecate feature, remove dead code |
| **Migrate** | Move or transform | Database migration, API version upgrade |
| **Improve** | Quality improvement | Performance optimization, test coverage |

## Scope

### SDD Contains

- Change target
- Change scope
- Impact analysis
- Dependencies
- Work decomposition
- Ordering and priorities
- Completion criteria
- Shared resource coordination plans (when needed)

### SDD Does NOT Contain

- System identity definitions (→ CDD)
- Arbitrary creation of global invariants (→ CDD)
- Contract creation without CDD basis (→ CDD)
- Execution procedure details (→ ADD)
- Approval governance details

## CDD vs SDD

| Aspect | CDD | SDD |
|------|---|---|
| Purpose | What the system IS | What to CHANGE |
| Nature | Stable knowledge base | Transient change plans |
| Derived from | System reality | CDD |
| Location | `.ai/`, `docs/llm/` | `.specs/` |
| History | Git | Files → DB |
| Lifecycle | Persistent | Created → Executed → Archived |

## Directory Structure

```
.specs/
├── README.md
└── apps/{app}/
    ├── {feature}.md              # Feature spec (what to build/change)
    │
    ├── roadmap.md                # L1: Direction (load on planning only)
    │
    ├── scopes/                   # L2: Active change scopes
    │   ├── 2026-Q1.md           # Scope A
    │   └── 2026-Q2.md           # Scope B
    │
    ├── tasks/                    # L3: Executable task lists
    │   ├── 2026-Q1.md           # Tasks for Scope A
    │   └── 2026-Q2.md           # Tasks for Scope B
    │
    └── history/
        ├── scopes/               # Completed scope archives
        └── decisions/            # Decision records
```

## 3-Layer Work Structure

| Layer | File | Purpose | Human Involvement |
|-----|----|-------|-----------------|
| **L1 Roadmap** | `roadmap.md` | Direction and priorities | Human sets direction |
| **L2 Scope** | `scopes/{scope}.md` | Change scope definition | Human approves scope |
| **L3 Tasks** | `tasks/{scope}.md` | Executable task breakdown | Autonomous (ADD executes) |

### How Layers Flow

```
L1: roadmap.md (What needs to change and why)
    ↓ Select scope
L2: scopes/{scope}.md (Define change boundary — requires approval)
    ↓ Break into tasks
L3: tasks/{scope}.md (ADD executes autonomously)
    ↓ Complete
Archive → CDD update if new knowledge confirmed
```

## Change Plan Derivation

Every SDD plan must trace back to CDD:

```
1. Identify what to change (from request or roadmap)
2. Read relevant CDD docs (domain model, constraints, contracts)
3. Determine change type (add / change / delete / migrate / improve)
4. Analyze impact on affected components
5. Define scope against CDD boundaries
6. Identify dependencies and ordering
7. Define completion criteria
8. Break into tasks that respect CDD invariants
9. ADD executes tasks within CDD constraints
```

## Token Load Strategy

| Situation | Load | Skip |
|---------|----|----|
| **Planning** | `roadmap.md` | `scopes/*`, `tasks/*`, `history/*` |
| **Work Start** | `scopes/{scope}.md`, `tasks/{scope}.md` | `roadmap.md`, other scopes, `history/*` |
| **Continue** | `tasks/{scope}.md` | Everything else |
| **Review** | `history/scopes/{scope}.md` | Active files |

## Scope ID Format

```
{year}-{period}
```

| Component | Example |
|---------|-------|
| year | `2026` |
| period | `Q1`, `Q2`, `Phase1` |
| Full ID | `2026-Q1` |

## Scope Lifecycle

```yaml
create:
  trigger: 'Change request identified against CDD'
  action: 'Create scopes/{scope}.md + tasks/{scope}.md'
  requires: 'Human approval of scope boundary'

active:
  executor: 'ADD (autonomous)'
  tracking: 'Progress in tasks/{scope}.md'

complete:
  trigger: 'All tasks done'
  action:
    - 'Merge scope + tasks → history/scopes/{scope}.md'
    - 'Delete active files'
    - 'Feed confirmed knowledge back to CDD'
```

## File Templates

### roadmap.md (L1)

```markdown
# Roadmap

> L1: Direction | Load on planning only

## 2026

| Q | Priority | Change | Type | Status |
| - | -------- | ------ | ---- | ------ |
| Q1 | P0 | Menu structure | Add | → scopes/2026-Q1.md |
| Q2 | P0 | Dashboard | Add | Pending |
| Q3 | P1 | Auth refactor | Migrate | Pending |

## Dependencies

- Menu → Dashboard → Auth refactor
```

### scopes/{scope}.md (L2)

```markdown
# Scope: 2026-Q1

> L2: Requires approval | Derived from roadmap

## Change Summary

Menu structure implementation

## Change Type

Add

## CDD References

- Domain: `docs/llm/frontend/`
- Constraints: `docs/llm/policies/architecture.md`

## Impact Analysis

- Affected components: navigation, routing, permission layer
- Dependencies: auth module must be stable

## Period

2026-01-01 ~ 2026-03-31

## Items

| Priority | Feature | Status |
| -------- | ------- | ------ |
| P0 | Menu config | todo |
| P1 | Route setup | todo |
| P2 | Permission checks | todo |

## Completion Criteria

- All menu items functional
- Permission-based visibility
- 80% test coverage
```

### tasks/{scope}.md (L3)

```markdown
# Tasks: 2026-Q1

> L3: ADD executes autonomously | Based on scopes/2026-Q1.md

## Active

- [ ] Update menu.config.ts

## Pending

- [ ] Add Identity routes
- [ ] Add Access routes
- [ ] Implement permission checks

## Completed

- [x] Analyze current structure (01-20)

## Blocked

(none)
```

## Best Practices

| Practice | Description |
|--------|-----------|
| Derive from CDD | Every scope must reference CDD constraints |
| Classify change type | Always specify add/change/delete/migrate/improve |
| Include impact analysis | Identify affected components and dependencies |
| Define completion criteria | Specify when the scope is done |
| Roadmap = Planning only | Do not load during execution |
| Scope = Approval boundary | Human approves scope, ADD executes tasks |
| Tasks = ADD input | Write tasks as executable instructions |
| History = Archive only | Skip during active work |
| CDD feedback | Update CDD only with confirmed stable knowledge |

## Future: DB Migration

```
Current: .specs/history/*.md (Git)
    ↓
Future:  DB MCP
         - Searchable
         - Zero tokens (query on demand)
         - Analytics support
```

## References

- Identity anchor: `docs/llm/policies/identity.md`
- Methodology: `docs/llm/policies/development-methodology.md`
- CDD Policy: `docs/llm/policies/cdd.md`
- ADD Policy: `docs/llm/policies/add.md`
- Token Optimization: `docs/llm/policies/token-optimization.md`
