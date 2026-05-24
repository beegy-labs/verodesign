# SDD: Slot group reorganization (X2-1)

> Authored: 2026-05-21 | Phase X2 — 정공법 시정 #1 | Depends: none
> Inputs: X1 BLOCKER G8 (theme parity 미완) + X1-A P1 (brand scale 1000 비효율) + user decision (slot group 세분화)

## Why

architecture.md 슬롯 group 정책 (core + web + reserved future) 이미 존재, brand 가 `implements` 명시 가능. **현재 누락 = status 가 core 안에 강제 binding** → brand 1000 환경에서 boilerplate, 일부 brand (명상앱/일기앱/게임앱 등) finance/status 의미 무관.

**정공법 = status 를 별 active slot group 으로 분리, optional implements**. brand 가 status 의미 있으면 implements, 없으면 skip. X1 G8 (BLOCKER, 7 theme status slot 누락) 도 시정 = "implements 안 함이 정상" 으로 자연스럽게 해소.

## Scope

### Slot group 재구조 (architecture.md + decisions.md 갱신)

| Group | Status | Scope | Parity 강제 |
|-------|--------|-------|------------|
| core | active | bg / text / border / primary / chart (모든 brand 강제) | ✅ |
| **status** (new) | **active, optional implements** | status.success / status.error / status.warning / status.info / status.neutral + `*.foreground` | brand 선택 |
| **finance** (new) | **active, optional implements** | finance.market.up / finance.market.down / finance.loan.priority | brand 선택 |
| web | active | breakpoint / zindex / cursor | 유지 |
| app-shell / mobile-shell / code / chat | reserved | 미활성 | - |

### 파일 변경

- `tokens/semantic/core.json` — status/destructive slot 제거 (status group 으로 이동)
- `tokens/semantic/status.json` — 신설 (status.success/error/warning/info/neutral + `*.foreground` + destructive root + destructive.foreground)
- `tokens/semantic/finance.json` — 신설 (finance.market.{up,down}, finance.loan.priority + `*.foreground`)
- 모든 `tokens/themes/<brand>-<mode>.json` 의 `$extensions.verobee.implements` 명시 갱신:
  - default-dark: `["core", "web", "status"]` (현 binding 보존)
  - veronex-dark: `["core", "web", "status"]` (현 binding 보존)
  - girok-{light,dark}: `["core", "web", "status"]` (Phase A 보강 반영, status binding 보존)
  - 다른 brand (verobase-*, verobase-admin-*, *-light): `["core", "web"]` (status 미구현 = 정상)

### Validator 변경

- Slot parity validator 가 group-aware
- brand A 가 `implements: ["core", "web", "status"]` 선언 → status group 의 모든 slot binding 강제
- brand B 가 `implements: ["core", "web"]` → status 검증 skip
- WCAG contrast validator 도 group-aware (X2-3 와 연동)

### Brand-isolation skill 갱신

`.add/skills/brand-isolation.md` 보강:
- "Slot group 별 parity 강제, 단 brand 가 implements 한 group 에만"
- "Active group (core/status/finance/web) 중 implements 안 한 group 은 brand-specific 시각 없이 제외"
- "Brand 가 시각이 필요하면 implements 추가 → 그 group 의 모든 slot binding 의무"

## Acceptance gates

| Gate | 요구 |
|------|------|
| `tokens/semantic/status.json` 신설, core.json 에서 status/destructive 이동 | ✓ |
| `tokens/semantic/finance.json` 신설 (Phase B exp.girok.finance.* 가 사용한 의미 영역) | ✓ |
| 모든 theme 파일 `$extensions.verobee.implements` 명시 | ✓ |
| Slot parity validator group-aware (`pnpm build` 통과) | ✓ |
| 다른 brand (verobase-*, *-light, _template-light) 의 빠진 status binding 가 "implements 안 함" 으로 자연 해소 | ✓ |
| `decisions.md` slot groups 표 갱신 | ✓ |
| `tokens/architecture.md` slot groups 표 갱신 | ✓ |
| `.add/skills/brand-isolation.md` group-aware 정책 보강 | ✓ |
| `docs/llm/tokens/CHANGELOG.md` 갱신 | ✓ |

## Out-of-scope

- naming format 변경 (`theme.success` → `theme.status.success`) — X2-2 영역
- contrast 정책 갱신 — X2-3 영역
- component workflow — X2-4 영역
- CEM docs — X2-5 영역
- experimental token isolation — X2-6 영역

## Cross-impact

- X1 G2 BLOCKER (semantic schema parity) → 자연 해소 (group-aware parity)
- X1 G8 BLOCKER (7 theme status 누락) → 자연 해소 (implements 안 함 = 정상)

## Validation steps (Codex 자가검증)

1. naming.md + architecture.md + decisions.md 정독
2. 현 `tokens/semantic/core.json` 의 status/destructive slot 정확히 분리
3. `tokens/semantic/status.json` 신설, DTCG schema valid
4. `tokens/semantic/finance.json` 신설
5. 모든 theme 파일 `implements` 명시 + status implements 인 brand 만 status binding
6. validator 갱신 + `pnpm build` 통과
7. CHANGELOG / decisions.md / architecture.md 갱신
8. 보고 (≤ 100줄)
