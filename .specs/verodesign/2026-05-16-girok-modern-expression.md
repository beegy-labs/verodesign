# 2026-05-16 — girok 2026 표현 현대화 (Scope/SDD)

> girok theme의 **컬러(OKLCH) 자체는 유지**하고, 2026 UI 트렌드(벤토/글래스/Calm/모션)를
> “표현 계층”으로 흡수하기 위한 설계 스펙이다. 이번 스펙은 **식별/설계/규칙 정의**까지만 한다.
> 실제 토큰 JSON 추가/컴포넌트 구현/consumer 적용은 **후속 SDD**로 분리한다.

SSOT:
- Brand CI/BI: `docs/llm/brands/girok.md` (디지털 서재, warm wood/brass, 대비 기준)
- Consumer (1): `dreamstock/` (girok 앱)
- Design-system personas (표현 전담): `dreamstock/docs/llm/design-personas.md`

Non-goals:
- girok light/dark 토큰 값(컬러) 변경 금지
- 다른 brand(default/verobase/veronex) 변경 금지
- verodesign 컴포넌트/토큰 실제 구현(이번 turn 범위 밖)

---

## 문제 정의

girok이 “촌스럽다/올드하다”는 피드백은 컬러가 아니라:
- 레이아웃 위계(모듈/그리드) 부족
- 표면 계층(깊이/elevation) 표현의 부족 또는 과잉
- 모션 언어 부재(타이밍/이징/상태 전환 규칙 없음)
- 글래스/블러 적용 경계 불명확
에서 발생한다.

---

## girok 표현 시스템 — “인생 기록의 토스” (규범)

목표: “박스 나열”이 아니라 **여백·타이포·정돈된 row**로 정제된 슈퍼앱 경험을 만든다.  
전제: girok의 warm-neutral 베이스 + brass 포인트(컬러 값)는 유지한다.

### 원칙 10 (강제)

1) 공백이 디자인: 카드 사이 여백은 넉넉(큰 `--vds-spacing` 단계), 한 화면 과밀 금지  
2) 타이포 위계: 핵심 숫자/금액은 대형 스케일, 라벨은 `text-secondary/dim` + 작은 사이즈  
3) 1카드=1메시지: **카드 테두리(border) 기본 금지** — 구획은 여백/타이포로(배경 차이는 미세)  
4) 곡률+미세 깊이: radius는 큰 단계 중심, 깊이는 `--vds-elevation-1` 이하로 절제  
5) 단일 primary 액션: 화면당 주 CTA 1개(가능하면 풀폭), 나머지 ghost/text  
6) 정돈된 row: 좌 아이콘/배지 + 라벨/보조 + 우 값(정렬), 구분선/보더 남발 금지  
7) 입력은 바텀시트: EntryDialog/GlassSurface 계열로 bottom-sheet화(페이지 내 폼 난립 금지)  
8) 단일 accent: warm-neutral + brass 포인트 “한 곳만” (상태/배지/아이콘에 컬러 남발 금지)  
9) 카피 담백: 기능 라벨은 직관 우선, 은유는 보조 카피/빈 상태에 제한  
10) 모션 절제: 토큰(`--vds-motion-*`) 기반, reduced-motion 존중, 의미 있는 전환만

### Do / Don’t (요약)

- Do:
  - “border 대신 여백+타이포”로 섹션을 분리한다.
  - 카드/리스트는 row 정렬 규칙(좌-중-우)을 고정한다.
  - accent는 1점만 사용하고 나머지는 중성 톤으로 유지한다.
- Don’t:
  - 동일한 회색 박스/보더를 연속 나열하지 않는다.
  - 화면마다 여러 개의 filled CTA를 동시에 두지 않는다.
  - 임의의 hex/px 하드코딩으로 표현을 깨지 않는다(토큰만).

---

## 목표(Goals)

1) **신규 토큰군**을 “식별”하고 네이밍/범위를 결정한다:
   - elevation (표면 깊이 단계)
   - motion (duration/easing)
   - blur (glass 강도)
2) 2026 표현 규칙을 문서화한다:
   - Bento grid(모듈 위계)
   - Liquid Glass(떠있는 레이어만 surgical)
   - Flat 2.0 / Calm(텍스트 dense 화면은 평면 유지)
   - Motion tokens(일관된 인터랙션 언어)
3) Pattern catalog에 “연구/실험 후보”로 등록한다(승격은 구현/소크 후).

---

## 토큰군 식별 (Naming + Scope)

### A) `elevation` (깊이)

목적:
- `bg.page < bg.card < bg.elevated` 같은 “표면 계층”을 **그림자/보더/배경**으로 일관되게 표현.

네이밍(후보):
- CSS vars: `--vds-elevation-0..6`
- 의미 예시:
  - `0`: page/base
  - `1`: card
  - `2`: floating (tab-bar, popover)
  - `3`: dialog/sheet

범위 결정:
- **전역 토큰(권장)**: elevation은 브랜드 공통으로 유효(표현 계층은 cross-brand 필요).
- 단, “girok 전용” shadow 톤(따뜻한 그림자) 같은 값은 theme 레벨에서 alias로 해결 가능.

### B) `motion` (duration/easing)

목적:
- 탭 전환/다이얼로그/버튼/리스트 삽입 등 핵심 모션을 “토큰으로” 통제.

네이밍(후보):
- durations: `--vds-motion-duration-{xs,sm,md,lg,xl}`
- easing: `--vds-motion-ease-{standard,emphasized,entrance,exit}`

범위 결정:
- **전역 토큰(권장)**: 모션은 브랜드별로 drift가 생기면 UX 일관성 붕괴.

### C) `blur` (glass 강도)

목적:
- glass surface의 blur를 “숫자/매직값”이 아니라 토큰으로 제한.

네이밍(후보):
- `--vds-blur-{none,sm,md,lg}`

범위 결정:
- **전역 토큰 + 브랜드 적용 규칙** 조합 권장.  
  (blur 자체는 공통, 언제/어디에 쓰는지는 girok 규칙으로 통제)

---

## 2026 표현 규칙 (girok CI/BI 유지)

### 1) Bento grid (벤토)

규칙:
- “카드가 많다”가 아니라 “모듈 위계가 명확하다”가 목표.
- 스팬 규칙(예: 2×1, 1×1)은 시스템으로 고정하고 임의 배치 금지.

컴포넌트 후보(후속 구현):
- `BentoGrid`, `BentoItem` (design-react 승격 후보)
- 이번 SDD에서는 **후보 식별만** 하고 구현은 별도 SDD로 분리.

### 2) Liquid Glass (글래스) — surgical 적용

허용:
- 떠있는 레이어: tab-bar, bottom-sheet/EntryDialog, popover, floating CTA

금지:
- 텍스트 dense 화면(기록/100억 리스트/테이블)에 glass/blur 적용 금지

토큰화 요소:
- blur 강도(`--vds-blur-*`)
- 투명도(alpha) + border + backdrop-filter 조합은 “패턴”으로 고정

### 3) Flat 2.0 / Calm

규칙:
- dense 화면은 평면(명확한 border + spacing)으로 유지한다.
- 그림자 남발 금지: elevation 단계가 필요한 곳만 사용.

### 4) Motion

토큰 기반으로만:
- duration/easing은 토큰으로만 표현(매직 값 금지).
- 의미 있는 모션만 채택:
  - 기록 추가: “책이 서가에 꽂히는” 느낌(짧고 절제)
  - 공유: “기증” 확인 모션(선택, 과장 금지)
  - 탭 전환: 방향성/상태 전환이 느껴지는 최소 모션

---

## 디자인시스템 페르소나 5인 반응(요약)

- 벤토: 찬성(모듈 위계 강화), 조건부(임의 배치 금지 규칙 필요)
- 글라스: 찬성(떠있는 레이어만), 반대(텍스트 dense 화면 적용)
- 플랫: 찬성(기능 우선/노이즈 제거), 반대(장식적 glass 남발)
- 모션: 찬성(토큰화된 타이밍), 반대(의미 없는 애니메이션)
- 토큰: 찬성(전역 스케일), 조건부(girok 전용 값은 theme alias로 제한)

---

## 후속 SDD 후보(별도 문서로 분리)

1) 토큰 추가: elevation/motion/blur DTCG 설계 + build/consumer 영향 검증
2) 패턴 구현: glass surface utility + elevation 레벨 적용 규칙
3) design-react 컴포넌트: BentoGrid/BentoItem 추가 + showcase
4) dreamstock 적용: 탭바/EntryDialog/헤더에 “표현 계층” 적용(기능 변경 없이)

---

## 검증 (이번 turn)

- 문서/패턴 카탈로그 변경만 수행한다.
- `pnpm --filter "@verobee/*" -C verodesign build` 가 깨지지 않아야 한다.
