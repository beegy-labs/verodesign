# Scope — Dialog 닫기버튼 과강조 제거 + 헤더 좌우 균형 (verodesign)

> 대상: `packages/design-elements/src/components/dialog/vds-dialog.ts`.
> 전 브랜드 공통 컴포넌트. 소비자(app-girok 등 file: dist) 영향.

## 근인 (조사 확정 — 재확인 불필요)

- `.close` 버튼 자체엔 테두리 없음(`all:unset`, `color: text-dim`,
  hover bg). 화면의 강조 박스 = `.close:focus-visible { outline: 2px
  solid border-focus; outline-offset: 2px }` 가 **상시 노출**된 것.
- 원인: Dialog open 시 첫 포커서블(=닫기 ✕)로 **자동 포커스** 이동 →
  마운트 직후부터 focus-visible 링이 보임(소비자 측 EntryFormDialog 의
  ref-stable onClose 우회 주석이 같은 버그를 증언).
- `.title` 에 `flex`/`min-width` 없음 → 헤더 좌우 비율 불안정
  (`justify-content: space-between` + `gap`).

## 변경

1. **초기 포커스 대상 교정**: Dialog open 시 포커스를 닫기 버튼이
   아니라 **패널 컨테이너**(`part="panel"`, `role="dialog"`,
   `tabindex="-1"`)로 이동. 스크린리더 진입·Esc·focus trap·close 시
   트리거 복원 동작은 보존. 키보드 Tab 으로 닫기에 도달하면 그때
   `:focus-visible` 링은 **그대로**(WCAG AAA 가시 포커스 유지 —
   링 제거/약화 금지, 자동 노출만 차단).
2. **헤더 좌우 균형**: `.title { flex: 1; min-width: 0; }` + 길면
   ellipsis(`overflow:hidden;text-overflow:ellipsis;white-space:nowrap`
   또는 토큰 규약). `.close` 는 고정 정사각 히트영역(현 `padding:
   spacing-1` 유지, 필요 시 `flex: none`), 헤더 `gap`/좌우 padding
   대칭 유지. 제목 영역이 가용폭을 차지하고 닫기는 컴팩트 우측 고정.
3. 토큰만 사용(raw px/hex 금지). blur·radius·border·z-index·기타
   Dialog 동작/슬롯/이벤트 불변. scrim 토큰(2026-05-19) 회귀 0.

## 제약

- verodesign 토큰 파이프라인·skills(token-ssot/brand-isolation) 준수.
  semantic/theme 토큰 신설 없음(동작/레이아웃 한정). 전 브랜드 동일
  동작(브랜드별 분기 금지) → cross-brand zero diff.
- a11y 회귀 0: dialog 역할/`aria-labelledby`/Esc/backdrop/focus 복원
  유지. focus 가 dialog 밖으로 새지 않음.
- dist 재빌드. app-girok 빌드/수정 금지(별도). 레포 기존 미커밋
  드리프트(build 스크립트/typography/dist) 건드리지 말 것.

## 검증

- verodesign 표준 타입체크/빌드/테스트 통과까지 자체 재시도(최대3회).
- dist 산출물에 변경 반영 확인(grep: 초기 포커스 패널 이동, `.title`
  flex). app-girok 재링크 절차 불필요 여부 명시(file: dist 직접).
- 시각: 후속 app-girok dev:shot(주식 목표 설정 다이얼로그)에서 ① open
  직후 ✕ 포커스 박스 없음 ② 헤더 제목 좌·닫기 우 균형 ③ Tab 시
  닫기 포커스 링 정상. (이 작업 단독 app-girok 캡처 불필요 — 후속 게이트)
