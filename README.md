# Verobee Design System (VDS)

> Token-Driven CSS Architecture | OKLCH-first | Tailwind-independent | Multi-theme | Multi-framework

W3C DTCG JSON 토큰을 SSOT로 두고, Style Dictionary 4.x 빌드 파이프라인으로 CSS 변수 + utility 클래스 + TypeScript 타입을 생성하는 디자인 시스템. veronex / verobase 등 vero* 제품군을 위한 자체 시스템이며, OSS 공개를 목표로 설계.

## 상태

| 항목 | 값 |
| ---- | -- |
| 버전 | v0.0.1 (scaffold, 미테스트) |
| License | MIT |
| 패키지 (예정) | `@verobee/design` (tokens) · `@verobee/design-elements` (Lit WC) · `@verobee/design-react` (React 19 adapter) |
| `[Unreleased]` 작업 | 290 tokens · 3 themes × light/dark · 8 Lit Web Components — 브라우저/통합 검증 전 (CHANGELOG 참조) |
| 1.0 진입 기준 | `docs/llm/decisions.md` 참조 |

## 시작점

| 목적 | 경로 |
| ---- | ---- |
| 모든 결정 SSOT | [docs/llm/decisions.md](docs/llm/decisions.md) |
| LLM 진입점 | [.ai/README.md](.ai/README.md) |
| 핵심 룰 | [.ai/rules.md](.ai/rules.md) |
| 아키텍처 개요 | [.ai/architecture.md](.ai/architecture.md) |
| 빌드 파이프라인 | [docs/llm/build/style-dictionary.md](docs/llm/build/style-dictionary.md) |
| 소비자 통합 가이드 | [docs/llm/build/consumer.md](docs/llm/build/consumer.md) |

## 아키텍처 한 줄

```
W3C DTCG JSON tokens (packages/design)
     │
     ├─▶ Style Dictionary 4.x → CSS variables + utilities + TS types
     │
     ▼
Lit 3 Web Components (packages/design-elements)
     │      WAI-ARIA AP 1.2 + ElementInternals (FACE)
     │      Custom Elements Manifest + DSD SSR
     │
     ├─▶ Vue / Svelte / Solid / Astro / vanilla — direct WC consumption
     │
     └─▶ React 19 adapter (packages/design-react) via @lit/react
```

## 핵심 결정 (요약)

| 항목 | 값 |
| ---- | -- |
| 토큰 형식 | W3C DTCG JSON |
| 색공간 | OKLCH primary, sRGB hex fallback |
| Tier 모델 | 3-tier (primitive / semantic / component-deferred) |
| Theme | orthogonal binding layer |
| Slot groups | core (cross-platform) + web + future expansions |
| Output | CSS variables + utility classes + TS types (3-Layer) |
| Cascade | `@layer reset, base, vds-tokens, vds-utilities, components, overrides` |
| 접두사 | CSS variables `--vds-*`, utility classes `vds-*` |
| Theme 전환 | `[data-theme]` HTML attribute |
| WCAG | AA 4.5:1 mandatory (모든 텍스트), AAA 7:1 mandatory (primary tier) |
| 모듈 형식 | ESM only |
| 분배 | GitHub git URL + Releases |
| Node | ≥20 |

상세: [docs/llm/decisions.md](docs/llm/decisions.md)

## 사용 (v0.1.0+)

```bash
# 설치
npm install github:beegy-labs/verodesign#v0.X.Y
```

```css
/* CSS Variables 모드 */
@import "@verobee/design/css/themes/veronex.css";

.button {
  background: var(--vds-theme-primary);
  padding: var(--vds-spacing-3) var(--vds-spacing-4);
  border-radius: var(--vds-radius-md);
}
```

```html
<!-- Utility 클래스 모드 (Tailwind 대체) -->
<link rel="stylesheet" href="@verobee/design/utilities/full.css">
<button class="vds-bg-primary vds-text-primary-fg vds-p-3 vds-rounded-md">
  Click
</button>
```

상세 가이드: [docs/llm/build/consumer.md](docs/llm/build/consumer.md)

## 지원 환경

### 자동 지원 (CSS layer 만으로)
React / Next.js / Vue / Nuxt / Svelte / SvelteKit / Solid / SolidStart / Angular / Astro / Qwik / Remix / Lit / Preact / vanilla HTML / HTMX

### Webview 환경 (위 frontend 위에)
Tauri Desktop / Tauri Mobile / Electron / Capacitor / PWA

### 미래 (formatter 추가 시)
Native iOS Swift / Android Kotlin / Flutter Dart

## 사용 중 / 예정 소비자

| 프로젝트 | Theme |
| -------- | ----- |
| veronex/web | veronex |
| verobase/web/{accounts,dashboard,docs} | verobase |
| 외부 사용자 | default 또는 자기 theme |

## 자기 theme 만들기

```bash
# Template 복사
cp node_modules/@verobee/design/tokens/themes/_template-light.json my-light.json

# 빌드
npx vds build-theme \
  --light my-light.json \
  --dark my-dark.json \
  --name my-theme \
  --out ./public/my-theme.css
```

상세: [docs/llm/tokens/themes.md](docs/llm/tokens/themes.md)

## 개발

```bash
# 모노레포 전체 빌드 (turbo)
pnpm build

# 검증만 (token gates + TS check)
pnpm validate

# SSR smoke test (8 컴포넌트 DSD)
pnpm --filter @verobee/design-elements test:ssr

# 패키지 단위 빌드
pnpm --filter @verobee/design build
pnpm --filter @verobee/design-elements build
pnpm --filter @verobee/design-react build
```

## 정책 / 거버넌스

| 영역 | 문서 |
| ---- | ---- |
| 모든 LOCK 결정 | [docs/llm/decisions.md](docs/llm/decisions.md) |
| 핵심 룰 NEVER/ALWAYS | [.ai/rules.md](.ai/rules.md) |
| Git / Release flow | [.ai/git-flow.md](.ai/git-flow.md) |
| SemVer 정책 | [docs/llm/build/versioning.md](docs/llm/build/versioning.md) |
| WCAG 정책 | [docs/llm/tokens/contrast.md](docs/llm/tokens/contrast.md) |
| 흡수 시스템 (research → experimental → canonical) | [docs/llm/research/README.md](docs/llm/research/README.md) |

## CDD/SDD/ADD 프레임워크

verodesign 은 [agentic-dev-protocol](https://github.com/beegy-labs/agentic-dev-protocol) submodule 을 사용. AI agent 가 작업 시 [`.add/`](.add/) 워크플로우를 따르고 [`docs/llm/`](docs/llm/) SSOT 를 참조.

## 라이선스

MIT — 자유롭게 사용, 수정, 배포 가능. [LICENSE](LICENSE).

## 기여

OSS 공개 (1.0.0) 이전에는 외부 PR 받지 않음. 1.0 진입 시 CONTRIBUTING.md 추가 예정.
