# 2026-05-16 — design-elements: bundle Lit (consumer dual-instance fix)

> consumer(app-girok, pnpm + Vite dev, `@verobee/*` file:-linked)에서
> `@verobee/design-react` 의 `createComponent` 래퍼(`Button`/`IconButton`/
> `Card` 등)가 **default(solid, slot 미투영)** 로 렌더되는 결함의 근본 원인과
> 수정. 손수 작성 React 컴포넌트(ThemeToggle/EntryDialog/CompactRow)와 raw
> light-DOM 은 정상 — createComponent 경로만 깨짐.

## 근본 원인 (재현·판별 완료)

- `packages/design-elements/vite.config.ts` 의 `rollupOptions.external` 가
  `/^lit($|\/)/`, `/^@lit($|\/)/` 를 external 처리 + `preserveModules:true`
  → dist 의 모든 컴포넌트가 `import "lit"` / `import "lit/decorators.js"`
  (bare) 로 남는다.
- pnpm 격리 + Vite dev(consumer 가 `@verobee/design-elements` 를
  optimizeDeps 에서 exclude) 환경에서 이 bare import 들이 consumer 의
  `@lit/reactive-element` 와 **다른 인스턴스**로 해소될 수 있다 → 커스텀
  엘리먼트의 reactive 시스템(ReactiveElement 클래스 정체성/`@property`
  메타데이터)이 분리 → 엘리먼트는 등록·초기 default 템플릿만 렌더하고
  property 반영·slot 투영이 끊긴다.
- 판별: app-girok 에서 React `StrictMode` 제거해도 동일(=@lit/react↔React19
  타이밍 아님). consumer Vite `dedupe:['lit',...]` 는 pnpm subpath
  (`lit-html/static.js`) 를 깨뜨려 consumer-side 로는 견고히 해결 불가.

## 결정 (Claude 정책 — 패키징)

웹컴포넌트 배포 라이브러리 표준대로 **design-elements 가 Lit 을 자체
번들(self-contained)** 한다. consumer 의 lit 해소에 의존하지 않게 하여
어떤 consumer(pnpm/Vite/기타)에서도 단일 Lit 인스턴스를 보장.

- `rollupOptions.external` 에서 `/^lit($|\/)/` 와 `/^@lit($|\/)/` **제거**
  → Rollup 이 lit/@lit/reactive-element/lit-html/lit-element/decorators 를
  design-elements dist 에 포함.
- `@zag-js` external 정책은 본 스코프 밖(현행 유지).
- `preserveModules:true` 유지 가능하면 유지(번들된 lit 모듈이 dist 하위에
  포함됨). preserveModules 와 deps 포함이 충돌하면, **design-elements 한정**
  으로 preserveModules 를 끄고 컴포넌트별 entry 번들(여전히 per-component
  파일 출력, lit inline)로 전환 — 단 PUBLIC_API 의 import 경로
  (`@verobee/design-elements/components/*`, `/define/*`) 와 custom element
  태그/manifest 는 **불변**이어야 한다.
- `@verobee/design-react` 는 변경 불필요(래퍼는 @lit/react + React 만 import;
  엘리먼트측 lit 단일화로 해결). 단 design-react 가 design-elements 를
  re-export/wrap 하므로 design-elements 재빌드 후 design-react 재빌드.

## SemVer

- 외형/공개 API(태그·attribute·slot·event·manifest·import 경로) 불변.
  내부 번들링 전략만 변경 → consumer 동작 **수정**(회귀 아님).
- 현재 미배포 사이클(0.1.0). 추가 bump 없이 **0.1.0 에 포함**.
  `CHANGELOG.md` [Unreleased]/0.1.0 에 "design-elements: bundle Lit to
  guarantee single instance in consumers" 1줄.

## Non-goals

- 공개 API/태그/manifest/import 경로 변경.
- @zag-js 번들 정책 변경.
- design-react 래퍼 로직 변경(필요 시 재빌드만).
- 컴포넌트 동작/스타일/토큰 변경.

## 검증

- `pnpm --filter "@verobee/*" -C verodesign build` pass (design-elements →
  design-react 순 재빌드 포함).
- `pnpm --filter @verobee/design-elements -C verodesign test:ssr`
  (SSR smoke) pass.
- dist 의 `components/*/*.js` 에 `import "lit"` 같은 bare 외부 import 가
  남지 않음(lit inline 확인). custom-elements.json/태그/슬롯 불변.
- consumer 회귀 검증(별도, app-girok 측): 재설치 후 시뮬레이터에서
  `<Button variant="ghost">라벨</Button>` 이 ghost 외형 + 라벨 표시.

## 후속

- showcase / 다른 consumer(verobase/veronex) 도 재빌드 dist 로 동일 수혜.
- dist 크기 증가(लit inline) 모니터링 — 필요 시 shared-chunk 최적화는
  별도 perf 스코프(`.add/optimize-2026.md`).
