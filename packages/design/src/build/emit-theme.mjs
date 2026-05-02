import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from './loader.mjs';
import { resolveTokens } from './resolver.mjs';
import { tokenPathToCssVar } from './css-vars.mjs';
import { normalizeOklch } from '../util/color.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

function isSemanticToken(token) {
  return token.path[0] === 'theme';
}

function formatColor(value) {
  if (typeof value !== 'string') return String(value);
  if (value.toLowerCase().startsWith('oklch')) return normalizeOklch(value);
  return value;
}

// Collapse a (light, dark) pair into a single CSS declaration. If the values
// are equal, emit a plain value; otherwise emit light-dark(L, D). Architecture:
// docs/llm/build/optimization.md § Technique 4 — light-dark() theme collapse.
function emitDeclaration(cssVar, lightValue, darkValue) {
  const L = formatColor(lightValue);
  const D = formatColor(darkValue);
  if (L === D) return `  ${cssVar}: ${L};`;
  return `  ${cssVar}: light-dark(${L}, ${D});`;
}

export async function emitThemeCss(theme) {
  const lightTree = await buildThemeTokens(theme, 'light');
  const darkTree = await buildThemeTokens(theme, 'dark');

  const lightFlat = resolveTokens(flattenTokens(lightTree), lightTree).filter(isSemanticToken);
  const darkFlat = resolveTokens(flattenTokens(darkTree), darkTree).filter(isSemanticToken);

  // Build a path-keyed map for both modes
  const lightByVar = new Map(lightFlat.map((t) => [tokenPathToCssVar(t.path), t.resolvedValue]));
  const darkByVar = new Map(darkFlat.map((t) => [tokenPathToCssVar(t.path), t.resolvedValue]));

  // Emit a declaration per unique semantic token
  const allVars = new Set([...lightByVar.keys(), ...darkByVar.keys()]);
  const lines = [];
  for (const cssVar of allVars) {
    const L = lightByVar.get(cssVar) ?? darkByVar.get(cssVar);
    const D = darkByVar.get(cssVar) ?? lightByVar.get(cssVar);
    lines.push(emitDeclaration(cssVar, L, D));
  }

  const isDefault = theme === 'default';
  const selector = isDefault
    ? `:root,\n  [data-theme="${theme}"]`
    : `[data-theme="${theme}"]`;

  const css = [
    `/* @verobee/design — themes/${theme}.css */`,
    `/* Theme: ${theme}. light-dark() collapsed; mode toggled via :root color-scheme. */`,
    `/* Architecture: docs/llm/build/optimization.md § Technique 4. */`,
    '',
    '@layer vds-tokens {',
    `  ${selector} {`,
    ...lines,
    '  }',
    '}',
    '',
  ].join('\n');

  await mkdir(join(DIST, 'css', 'themes'), { recursive: true });
  await writeFile(join(DIST, 'css', 'themes', `${theme}.css`), css, 'utf8');
  return { theme, lightCount: lightFlat.length, darkCount: darkFlat.length };
}
