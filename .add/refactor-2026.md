# Refactoring — 2026 Canonical (START HERE)

> **모든 향후 리팩토링은 이 문서에서 시작한다.** (LLM-agnostic — 실행
> 주체 무관) 정책 SSOT = `docs/llm/decisions.md` +
> `.specs/verodesign/2026-05-06-greenfield-architecture.md`. 기계적 강제 =
> [`skills/`](skills/README.md). 성능/사이즈 워크플로 =
> [`optimize-2026.md`](optimize-2026.md). 소비자 영향 =
> [`consumer-update.md`](consumer-update.md). 위임 계약 =
> [`codex-delegate.md`](codex-delegate.md). 이 문서는 그 위에 2026
> 베스트프랙티스 합성과 프로그램 결정을 얹는 진입점·체크리스트다.

## 0. 프로그램 결정 (2026-05-19, 사용자 확정)

- 자동화 게이트 = **문서 + 수동 실행만**, 검출 도구 로컬 실행, **CI 강제
  없음**.
- 라운드 1 = canonical `.add` 정비 + Knip 셋업 + **베이스라인 리포트까지**.
  실제 코드/토큰 리팩토링은 **후속 별도 승인** 후. semantic·타 브랜드
  theme 영향 건은 사용자 비준 필수(skills/README 3 게이트 그대로).
- 본 레포 변경은 소비자(app-girok 등 `file:` 의존) 영향 → 변경 시
  [`consumer-update.md`](consumer-update.md) 절차 동반.

## 1. 리팩토링 진입 절차

1. 이 문서 → `docs/llm/decisions.md` → 해당 [`skills/*`](skills/README.md).
2. 검출 도구(§3) 실행, 베이스라인 대비 신규 위반 0.
3. 3 게이트(구현 자가점검 → 신선한 눈 → 승인). 자가선언 불인정.
4. 변경은 SSOT 한 곳. raw 값 금지(토큰만). brand X 변경 → brand Y zero
   diff([`skills/brand-isolation.md`](skills/brand-isolation.md)).

## 2. 2026 베스트프랙티스 합성 (웹조사 → 본 레포 적용)

| 영역 | 2026 기준 | 적용 (근거) |
|---|---|---|
| 데드코드/미사용 | **Knip** 모노레포 표준 — workspace/TS project refs 인식, production 모드 | 미사용 file/export/dep 1차 스윕. `deprecate.md`/`pattern-deprecate.md` 의 제거 판단 입력으로 |
| 토큰 3-tier | primitive→semantic→component, semantic(의미역할) 우선, theme=직교 바인딩 | [`skills/token-ssot.md`](skills/token-ssot.md) — 이미 정책. raw primitive 산발 선택 금지 |
| 브랜드 격리 | semantic 슬롯 1곳, 브랜드 무관 역할 | [`skills/brand-isolation.md`](skills/brand-isolation.md) |
| Lit 컴포넌트 | `static styles` + CSS 가 스타일 SSOT, Style Dictionary 가 토큰→CSS 변환(JS 토큰 산발 금지) | 컴포넌트는 `var(--vds-*)` 소비만, raw hex 금지(2026-05-19 scrim 토큰화가 실증) |
| public API/중복 | 패키지 export 표면 최소, 중복 로직 합치기 | knip unused export + 수동 검수 |
| 사이즈/런타임 | `@property inherits:false`, `@layer`, `light-dark()`, brotli | [`optimize-2026.md`](optimize-2026.md) 페이즈 플랜 |

출처: Knip(knip.dev) · 디자인토큰 계층/Lit(philparsons bundling-lit-design-tokens,
USWDS design-tokens, contentful design-token-system) · 디자인시스템 2026
(designsystems.surf).

## 3. 검출 도구 (로컬 — CI 강제 없음)

```sh
pnpm refactor:knip          # 미사용 file/export/dep (모노레포 전체)
pnpm -r exec tsc --noEmit   # 타입
pnpm build                  # dist 산출
# 토큰/브랜드/대비: skills 의 검출 명령 + contrast-audit.md
```

Knip 은 skills 검출을 대체하지 않는다 — 토큰/브랜드 SSOT 는 스킬이 권위,
Knip 은 데드코드/미사용 export·dep 자동 스윕만.

## 4. 후속 평가 항목 (지금 도입 안 함)

- 데드코드/경계 CI 게이트화. 현재 로컬·수동.
- 실제 토큰/컴포넌트 리팩토링 일괄 패스 — 별도 승인 후 베이스라인 기반.
- 소비자 일괄 마이그레이션은 [`consumer-update.md`](consumer-update.md) 로.
