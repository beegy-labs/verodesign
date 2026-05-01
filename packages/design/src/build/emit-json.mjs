import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from './loader.mjs';
import { resolveTokens } from './resolver.mjs';
import { tokenPathToCssVar } from './css-vars.mjs';
import { normalizeOklch, oklchToHex } from '../util/color.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

function valueToJson(token) {
  const v = token.resolvedValue;
  if (token.type === 'color' && typeof v === 'string' && v.startsWith('oklch')) {
    return { oklch: normalizeOklch(v), hex: oklchToHex(v) };
  }
  if (token.type === 'shadow') return v;
  if (token.type === 'cubicBezier' && Array.isArray(v)) {
    return `cubic-bezier(${v.join(', ')})`;
  }
  return v;
}

export async function emitTokensJson(themes) {
  const out = {};
  for (const theme of themes) {
    out[theme] = { light: {}, dark: {} };
    for (const mode of ['light', 'dark']) {
      const tree = await buildThemeTokens(theme, mode);
      const flat = resolveTokens(flattenTokens(tree), tree);
      for (const t of flat) {
        out[theme][mode][tokenPathToCssVar(t.path)] = valueToJson(t);
      }
    }
  }
  await mkdir(join(DIST, 'data'), { recursive: true });
  await writeFile(join(DIST, 'data', 'tokens.json'), JSON.stringify(out, null, 2), 'utf8');
  return { themes: themes.length };
}
