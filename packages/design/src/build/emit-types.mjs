import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from './loader.mjs';
import { tokenPathToCssVar } from './css-vars.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

export async function emitTypes() {
  const tree = await buildThemeTokens('default', 'light');
  const flat = flattenTokens(tree);
  const tokens = flat.map((t) => tokenPathToCssVar(t.path)).sort();

  const themeTokens = tokens.filter((n) => n.startsWith('--vds-theme-'));
  const colorTokens = tokens.filter((n) => n.startsWith('--vds-color-'));
  const spacingTokens = tokens.filter((n) => n.startsWith('--vds-spacing-'));
  const radiusTokens = tokens.filter((n) => n.startsWith('--vds-radius-'));
  const fontTokens = tokens.filter((n) => n.startsWith('--vds-font-'));
  const shadowTokens = tokens.filter((n) => n.startsWith('--vds-shadow-'));
  const otherTokens = tokens.filter(
    (n) => !themeTokens.includes(n) && !colorTokens.includes(n) && !spacingTokens.includes(n)
      && !radiusTokens.includes(n) && !fontTokens.includes(n) && !shadowTokens.includes(n)
  );

  const union = (arr) => arr.map((n) => `  | '${n}'`).join('\n');

  const tokensDts = `// @verobee/design — auto-generated tokens.d.ts (do not edit)

export type ThemeToken =
${union(themeTokens)};

export type ColorToken =
${union(colorTokens)};

export type SpacingToken =
${union(spacingTokens)};

export type RadiusToken =
${union(radiusTokens)};

export type FontToken =
${union(fontTokens)};

export type ShadowToken =
${union(shadowTokens)};

export type OtherToken =
${union(otherTokens)};

export type VdsToken = ThemeToken | ColorToken | SpacingToken | RadiusToken | FontToken | ShadowToken | OtherToken;

export const themeTokens: ReadonlyArray<ThemeToken>;
export const allTokens: ReadonlyArray<VdsToken>;
`;

  await mkdir(join(DIST, 'types'), { recursive: true });
  await writeFile(join(DIST, 'types', 'tokens.d.ts'), tokensDts, 'utf8');
  return { count: tokens.length };
}
