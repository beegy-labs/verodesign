# Scope — vds-tabs `variant="segmented"` 추가 (2-depth 위계용)

> 대상: `packages/design-elements/src/components/tabs/{vds-tabs,vds-tab}.ts`.
> 소비자(app-girok 등 file: dist) 2-depth 내비 위계용. 사용자 레퍼런스:
> L1=underline(primary) / L2=segmented(secondary). **additive·opt-in**.

## 의도 (Claude 결정 — 네이밍/역할 정책)

- `vds-tabs` 에 `@property variant: 'underline' | 'segmented'`,
  **기본 `'underline'`(현행 동작 100% 불변)**. reflect 속성으로
  `vds-tab` 이 부모 variant 를 읽어 스타일 분기(현 `data-active` 패턴과
  동일 메커니즘).
- `segmented` 외형: 언더라인 rail 제거, tablist 를 **약한 그룹 컨테이너**
  (subtle bg + `--vds-radius-*`), 비활성 tab=`text-dim`,
  **활성 tab=채워진 pill**(elevated/hover 계열 bg + `--vds-radius-*` +
  `text-primary`). 모든 색·간격·반경은 `var(--vds-theme-*)` /
  `--vds-radius-*` / spacing 토큰만(raw hex/px 금지). 포커스 가시성
  (focus-visible outline)·키보드/ARIA/`vds-change`·orientation 동작
  **불변**.
- 브랜드 무관(토큰만, 분기 없음) → 기존 브랜드/소비자 **zero diff**
  (기본 underline). semantic/theme 토큰 **신설 없음**(기존 토큰 재사용).
  새 토큰 필요가 보이면 추가하지 말고 보고(스코프 재검토).

## 제약 (verodesign skills)

- token-ssot/brand-isolation 준수. 컴포넌트에 raw 값 금지. 기존
  underline 경로 회귀 0(기본값). a11y(role=tablist/tab, 선택·포커스,
  `vds-change`) 회귀 0. orientation=vertical 도 segmented 합리적 처리
  (최소: 기존 동작 깨지지 않게).
- dist 재빌드. app-girok·레포 기존 미커밋 드리프트(build 스크립트/
  typography/design dist) 건드리지 말 것. design-elements dist 만 갱신.

## 검증

- verodesign 표준 타입체크/빌드/`@verobee/design-elements`·`design`
  validate 통과까지 자체 재시도(최대3회). (브라우저 E2E 는 환경상
  기존 베이스라인 실패 — 무관, 회귀 테스트는 추가.)
- dist grep: `variant` 속성 정의 + segmented 스타일 분기 + 기본
  underline 불변 확인. app-girok 재링크 필요 여부 명시(file: dist).
- 회귀 테스트 추가: 기본 underline 렌더, segmented 렌더, 선택/키보드/
  `vds-change` 보존.

## 응답(≤400토큰, 코드/diff/로그 금지)
- 변경 파일(경로 — 의도)
- variant 속성/기본값/스타일 분기 메커니즘(vds-tab 가 부모 읽는 방식)
- 사용 토큰(신설 없음 확인)
- a11y/underline 회귀 0 근거
- 빌드/validate 결과 / dist grep / app-girok 재링크 필요 여부
- cross-brand zero diff 근거 / 범위 일탈
