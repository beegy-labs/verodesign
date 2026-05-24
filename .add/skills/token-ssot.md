# Skill — 토큰 3-tier · 의미역할 SSOT (LLM-agnostic, tool-neutral)

> 정책 SSOT: `docs/llm/decisions.md`(3-tier primitive→semantic→component,
> theme=직교 바인딩), `docs/llm/tokens/naming.md`. 특정 LLM·도구 가정 없음.

## 경로 SSOT (이행기 고정 — brand-isolation 과 동일)

- primitive: `packages/design/tokens/primitive/*.json`
- semantic(역할/슬롯 권위): `packages/design/tokens/semantic/*.json`
- 컴포넌트/유틸 소스: `packages/{design-elements,design-react,utilities}/src`
- dist/빌드 산출물 검출 제외.

## 원리 (1줄)

크기·글자·간격은 **의미역할(semantic role)** 로만 소비한다. raw primitive
스케일(`font.size.xs..6xl/numeric-display`, spacing step)을 컴포넌트·소비층이
**직접 산발 선택**하면 SSOT 붕괴 → "어디는 크고 어디는 작은" 불일치. 역할은
브랜드 무관, 역할→primitive 매핑은 semantic 한 곳에만 존재.

## 트리거

typography/size/spacing 사용, 새 토큰, 컴포넌트 크기·글자, 소비 앱의
숫자/제목/라벨 스타일.

## 검출 (변경에 실행 — 명령 그대로 복사·실행, 동등 수단 허용)

> `rg` 정규식의 `|` 는 alternation. 코드블록 그대로 실행(표 셀
> 이스케이프 `\|` 변형 금지).

**검출 1 — 컴포넌트/소비층이 raw size primitive 직접 사용**
```sh
rg -n -- '--vds-font-size-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|numeric-display)' \
  packages/design-elements/src packages/design-react/src
```
(소비 앱 점검이면 그 앱 src 경로로.) 역할 토큰 아닌 raw size = 위반.

**검출 2 — 컴포넌트 치수 하드코딩**
```sh
rg -n -- '(min-height|height|font-size):\s*[0-9.]+(rem|px)' \
  packages/design-elements/src packages/design-react/src
```
토큰 외 치수 = 위반.

**검출 3 — 의미역할 레이어 존재 확인**
```sh
rg -nl -- '"(role|display|metric|title|body|label|caption)"' \
  packages/design/tokens/semantic/
```
매치 파일 0 이면 **역할 SSOT 부재**(역할군 신설 트리거). 검출 1 에
잡힘이 있는데 검출 3 이 0 이면 FIX_REQUIRED.

**검출 4 — 같은 의도 다른 크기(불일치, 반자동)**
```sh
rg -no -- '--vds-font-size-[a-z0-9-]+' <대상 컴포넌트군 경로> | sort -u
```
동일 의미군(예: 카드 제목들 / 핵심 지표들)에 distinct size 가 2개+ 면
위반. 의미군 분류는 검토자가 **1줄 근거와 함께** 판정(완전 자동 아님 —
근거를 리포트/SDD 에 기록).

## 교정 절차

1. 브랜드 무관 **의미역할 토큰** 정의/사용: 예
   `type.role.{display,metric,title,body,label,caption}` (semantic, 전
   브랜드 공통). 역할→primitive(size/lineHeight/weight) 매핑은 semantic
   한 곳에만.
2. 컴포넌트·소비층은 raw `font-size-*`/치수 대신 역할 토큰 또는 역할
   유틸(`vds-text-{role}`)만 참조.
3. 컴포넌트 크기는 정해진 size 스케일 토큰(`sm/md/lg`→치수 토큰). raw
   rem/px 제거.
4. 동일 의도=동일 역할로 통일. 예외 크기는 역할 신설로(인스턴스 임의값
   금지). #4 판정 근거 1줄을 SDD/리포트에 남김.
5. 역할군 신설/변경은 브랜드 무관 — 동시에
   [`brand-isolation.md`](brand-isolation.md) CLEAN 이어야 한다(검출 2:
   역할은 cross-brand 입증 자명 — 모든 브랜드 타이포에 적용).

## 검증

- 검출 1·2 잔존 0(역할/스케일 토큰만). 검출 3 통과(역할군 존재).
  검출 4 불일치 0(근거 기록).
- `pnpm --filter "@verobee/*" build` pass + contrast audit pass +
  brand-isolation 스킬 CLEAN.
- 판정: CLEAN | FIX_REQUIRED.
