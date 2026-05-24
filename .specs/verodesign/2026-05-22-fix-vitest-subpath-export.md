# Fix: vitest subpath export resolution for `@verobee/design-elements/icon-registry/*`

> Slug: `fix-vitest-subpath-export` · Created: 2026-05-22 · Status: **proposed** · Priority: P1 (블로커) · Owner: vero

## 1. Why

- 2026-05-22 SDD 0a (`<vds-icon>` + 35 아이콘) Layer-3 검증 중 발견: vitest@5.4.21의 vite resolver가 `@verobee/design-elements/icon-registry/calendar` wildcard subpath exports를 "Failed to resolve import" 로 거부.
- `packages/design-elements/package.json`의 `"./icon-registry/*"` exports map은 정확하고 dist 파일도 존재(`dist/components/icon/icons/calendar.js`).
- Node ESM과 webpack 등은 처리하나 vitest의 vite 모드(server middleware)에서 wildcard subpath export resolution이 깨짐.
- 매 Codex 위임마다 동일 G_test 게이트 실패 → 영구 부채. Defer는 기술적으로 옳지 않음.

## 2. Source

- Error: `Failed to resolve import "@verobee/design-elements/icon-registry/calendar" from "src/icons/Calendar.tsx". Does the file exist?`
- Path: `/Users/vero/workspace/beegy/verodesign/packages/design-react/src/icons/Calendar.tsx`
- Vite 버전: 5.4.21
- Vitest 버전: 2.1.9

## 3. Hypothesis & 우선순위

Vite 5.x는 정적 subpath exports(`"./foo": "./dist/foo.js"`)를 처리하지만 **wildcard pattern**(`"./icon-registry/*": "./dist/components/icon/icons/*.js"`)을 일부 환경에서 처리 못함. vitest의 dependency optimizer가 이 패턴을 인식 안 함.

| 해결안 | 장점 | 단점 | 우선순위 |
|---|---|---|---|
| **A**: `vitest.config.ts`에 `resolve.alias` 명시 등록 (icon-registry → dist 절대경로) | 즉시 작동 | 35 아이콘 × hardcode 또는 dynamic glob | **1순위** |
| **B**: vitest 또는 vite 업그레이드 (vite@latest, vitest@latest) | 근본 fix 가능성 | breaking change 위험, 워크스페이스 회귀 | 2순위 |
| **C**: `server.deps.inline` + `server.deps.external` 조정 | vitest 정합 | wildcard 처리 보장 안 됨 | 3순위 |
| **D**: package.json exports를 wildcard 없이 35행 명시 등록 | 명시적 | 36th 아이콘 추가마다 수동 갱신 (스케일 안 됨) | 거부 |

**채택: A 우선 + 동적 glob 패턴**.

## 4. 해결안 A — vitest.config.ts resolve.alias 동적 등록

`packages/design-react/vitest.config.ts` (또는 기존 vite.config.ts) 에 추가:

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { readdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = resolve(__dirname, "../design-elements/dist/components/icon/icons");

// 35 icons → resolve.alias entries
const iconRegistryAliases = readdirSync(iconsDir)
  .filter(f => f.endsWith(".js"))
  .reduce((acc, file) => {
    const name = file.replace(/\.js$/, "");
    acc[`@verobee/design-elements/icon-registry/${name}`] = resolve(iconsDir, file);
    return acc;
  }, {} as Record<string, string>);

export default defineConfig({
  // ... existing config ...
  resolve: {
    alias: {
      // ... existing aliases ...
      ...iconRegistryAliases,
    }
  }
});
```

> 빌드는 영향 없음 — `resolve.alias`는 vitest dev/test 전용. Production 빌드는 정상 exports map 사용.

## 5. 검증 — 비-게임가능 게이트

| Gate | Pass criterion |
|---|---|
| **G1: Icon.test.tsx 통과** | `pnpm --filter @verobee/design-react exec vitest run src/icons/Icon.test.tsx` exit 0 + "Test Files 1 passed" 등장 |
| **G2: 전체 design-react test 회귀** | `pnpm --filter @verobee/design-react test` 결과의 PASS 수가 사전 PASS(8) 이상; FAIL 수가 사전 FAIL(6) 이하 |
| **G3: dist 빌드 영향 0** | `pnpm --filter @verobee/design-react build` exit 0; 산출 `.d.ts`/`.js` 갯수 동일 |
| **G4: vitest config 1 파일만 변경** | `git diff --stat packages/design-react/` 결과 vitest.config.ts (또는 vite.config.ts) 1 파일만 |
| **G5: 35 alias 자동 생성** | console.log(Object.keys(iconRegistryAliases).length) === 35 (실행 시 로그 또는 테스트 dump) |

## 6. Out of scope

- design-elements 측 web-test-runner 0.0.0.0 bind 문제 (별도 — 샌드박스 한계).
- 다른 wildcard exports (`./define/*`, `./components/*`) — 동일 패턴 적용 가능하면 추후. 본 SDD는 icon-registry/*만.
- vitest@latest 업그레이드 (해결안 B) — 별도 SDD.

## 7. Deliverables

1. `packages/design-react/vitest.config.ts` 신설 (없으면) 또는 기존 config 확장
2. (선택) `packages/design-react/test/setup-icon-aliases.ts` — alias 생성 헬퍼 분리
3. Icon.test.tsx — 변경 없음 (test 자체는 정상)

## 8. Pre-condition

- Phase 0a icons 머지 + dist 빌드 완료 (이미 충족).
- vitest@5.4 + vite@5.4 환경 (현행).
