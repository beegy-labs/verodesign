# Skill — 브랜드 격리 (LLM-agnostic, tool-neutral)

> 정책 SSOT: `.specs/verodesign/2026-05-06-greenfield-architecture.md` §goal2
> ("brand X 변경 → brand Y 에 zero rebuild·zero diff·zero deploy"),
> `docs/llm/decisions.md`(3-tier, slot parity validator, theme=직교 바인딩).
> 특정 LLM·특정 VCS 도구를 가정하지 않는다(명령은 예시; 동등 수단 허용).

## 경로 SSOT (이행기 고정)

7-layer 분리는 목표 구조이나 **현 권위 경로는** `packages/design/tokens/`:
- primitive: `packages/design/tokens/primitive/*.json`
- semantic(코어/슬롯): `packages/design/tokens/semantic/*.json`
- 브랜드 theme: `packages/design/tokens/themes/<brand>-(light|dark).json`
- 컴포넌트/유틸 소스: `packages/{design-elements,design-react,utilities}/src`

dist/빌드 산출물(`**/dist/**`)은 검출 대상에서 항상 제외.

## 원리 (1줄)

브랜드/도메인 특수 값은 **해당 brand theme 또는 brand-scoped/experimental
슬롯**에만. 코어 semantic·primitive·컴포넌트·유틸은 **브랜드 무관**
(`var(--vds-theme-*)` 만). 코어 semantic 슬롯 추가는 parity 검증기가
**전 브랜드 theme 에 정의를 강제** → 단일 브랜드 작업이 타 브랜드 파일에
diff 를 내면 격리 위반.

## 입력 (필수 — 절차 시작 전 선언)

`작업대상_브랜드 = {…}` (예: `{girok}`). 이 집합 밖의 브랜드 theme 파일
변경은 검출 1 의 위반 후보다. 미선언이면 절차 무효(먼저 선언).

## 트리거

`tokens/semantic/*` 슬롯 추가/수정 · `tokens/themes/*` 변경 ·
`design-elements|design-react|utilities/src` 색·치수 작성 · 새 도메인 토큰.

## 검출 (변경에 실행 — 명령 그대로 복사·실행 가능, 동등 수단 허용)

> 주의: `rg` 정규식의 `|` 는 alternation. 아래는 코드블록이므로 그대로
> 실행하면 된다(표 셀의 `\|` 이스케이프 같은 변형 금지).

**검출 1 — 단일 브랜드 작업이 타 브랜드 theme 소스 변경**
```sh
git diff --name-only HEAD -- 'packages/design/tokens/themes/*.json'
```
결과의 각 `<brand>-(light|dark).json` 에서 `<brand>` 가 `작업대상_브랜드`
집합 밖이면 위반. (소스 json 만 — dist 제외.)

**검출 2 — 코어 semantic 슬롯 추가(전 브랜드 parity 강제)**
```sh
git diff HEAD -- packages/design/tokens/semantic/
```
신규 슬롯 키가 보이면 → 아래 cross-brand 입증 형식 없으면 위반.

**검출 3 — 컴포넌트/유틸에 raw 색 리터럴**
```sh
rg -n '#[0-9a-fA-F]{3,8}\b|rgba?\(|oklch\(' \
  packages/design-elements/src packages/design-react/src packages/utilities/src
```
`var(--vds-*)` 아닌 색이 잡히면 위반.

**검출 4 — 컴포넌트가 특정 브랜드 토큰 직접 참조**
```sh
rg -n -- '--vds-(verobase|veronex|girok|default)-' \
  packages/design-elements/src packages/design-react/src
```
브랜드 프리픽스 직접 참조가 잡히면 위반(무매치=정상, exit 코드 무시).

## cross-brand 입증 형식 (검출 2 면제 조건)

SDD 에 아래를 명시 + 사용자 비준 1줄이 있어야 코어 semantic 추가 허용:
```
cross-brand: <slot> — 대상 {brand목록=전체}. 각 브랜드가 이 의미를
보유하는 근거: <1줄>. 브랜드별 값 차이: <있음/없음>. 사용자 비준: <날짜/표식>
```
근거가 "girok 만 필요" 류면 cross-brand 아님 → 교정 1·2 로.

## 교정 절차

1. 브랜드/도메인 특수 슬롯 → 코어에서 제거. ① 해당 brand theme 에만 값,
   또는 ② brand-scoped/experimental 슬롯 `--vds-exp-girok-*`
   (구 `dreamstock`→`girok`; 잔존 `dreamstock` 표기는 girok 로 교정) /
   decisions 의 `future` 슬롯그룹(app-shell 등)으로 이동.
2. 진짜 cross-brand 만 코어 유지 — 위 입증 형식 + 비준 필수.
3. 컴포넌트/유틸 색·치수 → semantic `var(--vds-theme-*)`/`--vds-spacing-*`/
   `--vds-radius-*` 만. 브랜드 프리픽스 직접 참조 제거.
4. 작업대상 밖 브랜드 theme 에 들어간 diff → VCS 로 그 변경만 원복
   (수단 무관: 해당 파일을 직전 커밋 상태로 되돌림) 후 parity 재확인.

## 검증

- 검출 1·3·4 잔존 0. 검출 2 는 입증·비준 없으면 0.
- 변경 파일 목록에 `작업대상_브랜드` 밖 theme 소스 0(또는 입증된 cross-brand).
- `pnpm --filter "@verobee/*" build` pass + slot parity validator pass +
  contrast audit pass.
- 판정: CLEAN | FIX_REQUIRED.
