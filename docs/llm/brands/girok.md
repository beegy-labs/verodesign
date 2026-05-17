# Brand — girok (기록)

이 문서는 girok 브랜드 산출물을 일관되게 만들기 위한 **LLM-neutral** 가이드다.
토큰 값 자체는 `@verobee/design` 의 girok theme를 사용한다(값 변경은 별도 절차).

## CI/BI

- Mission: **기록이 자산이 된다 — 나의 성장을 기록하고 나눈다**
- Concept: 디지털 서재(warm wood library)
  - 의미: 축적 · 신뢰 · 따뜻함 · 절제
- Tone/Voice: 진중 · 따뜻 · 담백 (과장/슬랭/과한 이모지 금지)

## Color (theme tokens)

권장 사용:
- 배경/표면: `theme.bg.page`, `theme.bg.card`, `theme.bg.elevated`
- 본문: `theme.text.primary` (기본), 보조: `theme.text.secondary`, 약한 보조: `theme.text.dim`
- 액션: `theme.primary` / `theme.primary-fg`, 보조 액션: `theme.accent` / `theme.accent-fg`
- 경계: `theme.border.default` (필요 시 subtle은 존재하는 슬롯만 사용)

### Canonical token snapshot (값 + 대비)

아래 값/대비는 `@verobee/design` 빌드 산출물의 contrast report 기준이다.

| Mode | Key | Token value | Verified contrast (ratio) |
| ---- | --- | ----------- | -------------------------- |
| Light | `bg.page` | `oklch(93% 0.012 86)` | — |
| Light | `bg.card` | `oklch(98.1% 0.006 88)` | — |
| Light | `text.primary` | `oklch(22.2% 0.012 80)` | on `bg.card` = **16.29:1** |
| Light | `text.secondary` | `oklch(39.2% 0.018 80)` | on `bg.page` = **7.69:1** |
| Light | `primary` | `oklch(46% 0.08 56)` | `primary-fg` on `primary` = **6.95:1** |
| Dark | `bg.page` | `oklch(18.2% 0.006 70)` | — |
| Dark | `bg.card` | `oklch(23.4% 0.008 72)` | — |
| Dark | `bg.elevated` | `oklch(28.6% 0.01 74)` | — |
| Dark | `text.primary` | `oklch(93.6% 0.02 86)` | on `bg.card` = **13.88:1** |
| Dark | `text.secondary` | `oklch(82.5% 0.028 86)` | on `bg.page` = **10.91:1** |
| Dark | `primary` | `oklch(72% 0.09 66)` | `primary-fg` on `primary` = **7.38:1** |

### Light 핵심(요약)

- `bg.page`: warm neutral(아이보리)
- `bg.card`: paper(near-white)
- `text.primary`: espresso(고대비 본문)
- `primary`: cognac/brass 계열(절제된 강조)

### Dark 핵심(요약)

- `bg.page`: warm charcoal
- `bg.card`: page보다 한 단계 밝은 표면
- `text.primary`: parchment(고대비 본문)
- `primary`: warm brass(강조)

### Contrast (검증 기준)

girok theme는 빌드 시 WCAG contrast audit를 통과해야 한다.
최소 요구:
- `theme.text.primary` on `theme.bg.card`: WCAG 2.1 **AA 최소** (법규 기준). 그 이상은 선택.
- `theme.primary-fg` on `theme.primary`: AA 이상

## Logotype (텍스트 규칙)

에셋(SVG/PNG)은 scope 밖이며, 여기서는 **텍스트 워드마크 규칙**만 정의한다.

- 기본 워드마크: `girok` (소문자 고정)
- brass accent: 1점만 사용
  - 예: “girok.” 처럼 dot을 accent 컬러로
  - 금지: 여러 글자에 accent 분산, 그라데이션 남발
  - UI 적용: "1점" 원칙은 화면 전역이 아니라 **레이아웃 Frame(구획) 단위**로
    해석한다 — 한 Frame 안의 채움(fill) 강조 액션은 최대 1개(주 액션). 분할
    화면에서도 강조가 흩어지지 않게 하며, 기계 검증 가능하다.
- 한글 표기: 앱 표시명은 `Girok`, 한글 병기는 `기록` (UI에서 동시 표기는 최소화)

## Logo assets (사양)

에셋 생성은 소비자 앱에서 수행할 수 있으나, **사양(재현 규칙)** 은 이 문서에 둔다.

### App icon symbol (SVG spec)

- viewBox: `0 0 1024 1024`
- 배경: warm-cream 단색(가독성 확보). 모서리는 iOS/Android 마스킹을 고려해 과도한 디테일 금지.
- 심볼: brass 계열 단색의 “상승하는 한 획(펜 스트로크)” 1개 + 끝점 강조 1개
  - 의미: 기록(필기) + 성장(상승) 이중 은유
  - 단색/소형에서도 식별 가능해야 하며, 컬러 의존(그라데이션/다중색) 금지
- clear space: 심볼 외곽에서 최소 `1/10`(= 102.4px) 여백을 유지
- minimum size: 24px(탭/리스트 아이콘), 32px(웹 파비콘)에서 형태가 무너지지 않도록 단순화

참조(구현 예): 소비자 앱에서 아래와 같은 구조를 사용해도 된다.
- `<rect rx=\"224\" .../>` + `<path stroke-linecap=\"round\" .../>`

## Typography (구현 독립 가이드)

폰트 패밀리는 소비자 앱에서 선택하되, 역할만 고정한다.

- Body: sans (가독성 우선)
- Accent: serif (제목/인용/브랜드 강조에 제한적으로)
- 금지: 본문 전체를 serif로 통일, 과도한 letter-spacing

## Do / Don’t

- Do:
  - 표면 계층(페이지/카드/떠있는 요소)을 명확히 구분한다.
  - 강조색은 “한 점”으로 사용하고, 나머지는 중성 톤으로 유지한다.
  - 공유 카드/피드는 담백한 문장(짧고 사실적)으로 기본값을 둔다.
  - “인생 기록의 토스”처럼 **여백·타이포 위계·정돈된 row**로 정제된 슈퍼앱 UX를 만든다.
  - 카드 구획은 **보더가 아니라 여백/타이포/미세 깊이(`--vds-elevation-1` 이하)** 로 만든다.
- Don’t:
  - 탁한 브라운 단색으로 전체 화면을 채우지 않는다.
  - 버튼/배지에 서로 다른 포인트 컬러를 여러 개 섞지 않는다.
  - 감탄사/유행어로 톤을 흔들지 않는다.
  - “무채색 박스 + 테두리 나열”로 화면을 구성하지 않는다(여백+위계로 분리).
