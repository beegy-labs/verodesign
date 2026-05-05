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

// Emit a single declaration line for one mode (light or dark).
function emitLine(cssVar, value) {
  return `    ${cssVar}: ${formatColor(value)};`;
}

export async function emitThemeCss(theme) {
  const lightTree = await buildThemeTokens(theme, 'light');
  const darkTree = await buildThemeTokens(theme, 'dark');

  const lightFlat = resolveTokens(flattenTokens(lightTree), lightTree).filter(isSemanticToken);
  const darkFlat = resolveTokens(flattenTokens(darkTree), darkTree).filter(isSemanticToken);

  const lightByVar = new Map(lightFlat.map((t) => [tokenPathToCssVar(t.path), t.resolvedValue]));
  const darkByVar = new Map(darkFlat.map((t) => [tokenPathToCssVar(t.path), t.resolvedValue]));

  const allVars = new Set([...lightByVar.keys(), ...darkByVar.keys()]);

  // Split into mode-specific blocks. Tokens that share the same value across
  // modes go into the light block (which is the default + [data-mode="light"]).
  const lightLines = [];
  const darkLines = [];
  for (const cssVar of allVars) {
    const L = lightByVar.get(cssVar) ?? darkByVar.get(cssVar);
    const D = darkByVar.get(cssVar) ?? lightByVar.get(cssVar);
    lightLines.push(emitLine(cssVar, L));
    if (formatColor(L) !== formatColor(D)) {
      darkLines.push(emitLine(cssVar, D));
    }
  }

  const isDefault = theme === 'default';
  const baseSelector = isDefault
    ? `:root,\n  [data-theme="${theme}"],\n  [data-theme="${theme}"][data-mode="light"]`
    : `[data-theme="${theme}"],\n  [data-theme="${theme}"][data-mode="light"]`;
  const darkSelector = `[data-theme="${theme}"][data-mode="dark"]`;

  const css = [
    `/* @verobee/design — themes/${theme}.css */`,
    `/* Theme: ${theme}. Mode toggled via [data-mode] attribute selector. */`,
    `/* Each mode has its own block — no light-dark() function dependency. */`,
    '',
    '@layer vds-tokens {',
    `  ${baseSelector} {`,
    ...lightLines,
    '  }',
    '',
    `  ${darkSelector} {`,
    ...darkLines,
    '  }',
    '}',
    '',
  ].join('\n');

  await mkdir(join(DIST, 'css', 'themes'), { recursive: true });
  await writeFile(join(DIST, 'css', 'themes', `${theme}.css`), css, 'utf8');
  return { theme, lightCount: lightFlat.length, darkCount: darkFlat.length };
}
