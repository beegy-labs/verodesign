# ADD — 정책 강제 스킬 인덱스 (verodesign, LLM-agnostic)

> 각 스킬 = **실행 절차**(검출 명령 → 교정 → 검증 → 판정). 특정 모델
> (Claude/Codex/Gemini/기타)을 가정하지 않는다. 어떤 LLM이 실행해도 동일한
> 검출 명령·동일한 판정을 낸다.
> 정책 자체(왜·규칙)의 SSOT = `docs/llm/decisions.md` +
> `.specs/verodesign/2026-05-06-greenfield-architecture.md`.
> 스킬은 그 정책을 "기계적으로 어떻게 강제하는가"만 담는다.
> 위임/검수가 필요할 때의 계약: 프로젝트의 delegation 문서
> ([`../codex-delegate.md`](../codex-delegate.md) — 파일명은 codex 이나
> 내용은 "구현/검수 분리·응답 캡" 일반 계약으로 적용, 실행 LLM 무관).

## 절대 규칙

**정책은 무조건 지켜진다.** 토큰/테마/컴포넌트/슬롯/유틸을 추가·수정하는
모든 작업은, 변경 파일에 해당 스킬의 "검출"을 실행하고 위반 0 이 아니면
머지·위임·커밋 금지. 예외는 SDD 에 `잔존(사유)` + 사용자 비준 명시일 때만.

## 스킬 → 언제

| 스킬 | 트리거 | 정책 근거 |
|---|---|---|
| [`brand-isolation.md`](brand-isolation.md) | semantic 슬롯 추가/수정, `tokens/themes/*` 변경, 컴포넌트/유틸에 색·값 작성 | greenfield §goal2 "brand X 변경 → brand Y zero diff" |
| [`token-ssot.md`](token-ssot.md) | typography/size/spacing 사용, 새 토큰, 컴포넌트 크기·글자 | decisions 3-tier + slot parity + 의미역할 SSOT |

## 3 게이트 (역할은 모델 무관 — 실행 주체 누구든 동일)

1. **구현 단계 (구현 에이전트 자가점검)**: 변경 파일에 각 스킬 "검출"
   실행, 그 자리 교정 후 진행.
2. **검수 단계 (별도 세션·신선한 눈, 구현 컨텍스트 없음)**: 각 스킬
   "출력 형식"으로 위반 리포트만.
3. **게이트 단계 (승인 주체)**: 스킬 "검증" 통과 + 정책/SDD 대조.
   코어 semantic·타 브랜드 theme 영향 건은 **사용자 비준 필수**.

> 단계 주체는 사람이 어떤 LLM에 할당하든 무방하다. 스킬 텍스트는
> "내가 Claude/Codex"라고 가정하지 않으며, 명령과 판정 기준만 규정한다.

## 공통 출력 형식 (모든 스킬 동일)

```
스킬: <이름>
검출: <건수> (경로:라인 — 패턴)
교정: <한 줄씩: 무엇을 → 무엇으로>
잔존(사유): <정책 예외 / 사용자 비준 근거>
검증: build / contrast / parity / cross-brand-diff = pass|fail
판정: CLEAN | FIX_REQUIRED
```

## 참고: 네이밍 (dreamstock → girok)

기존 consumer/브랜드 명 `dreamstock` 은 **`girok` 으로 리네임**되었다.
실험·브랜드스코프 토큰 프리픽스는 `--vds-exp-girok-*` 를 쓴다(문서·예시에
남은 `dreamstock` 표기는 girok 로 읽고, 발견 시 교정 대상).
