import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from './loader.mjs';
import { resolveTokens, resolveValue } from './resolver.mjs';
import { tokenPathToCssVar } from './css-vars.mjs';
import { normalizeOklch } from '../util/color.mjs';
import { getImplementedTokenPaths, getThemeImplements } from './slot-groups.mjs';
import { emitOptionalGroupFallbacks } from './optional-group-fallback.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

function isSemanticToken(token) {
  return token.path[0] === 'breakpoint' || token.path[0] === 'exp';
}

function canResolveToken(token, tree) {
  try {
    resolveValue(token.value, tree);
    return true;
  } catch {
    return false;
  }
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

function emitGirokDensityBlocks(tree) {
  const density = tree?.exp?.girok?.density;
  if (!density) return [];
  const lines = [];
  for (const mode of ['compact', 'dense']) {
    const bucket = density[mode];
    if (!bucket) continue;
    lines.push(`  [data-theme="girok"][data-girok-density="${mode}"] {`);
    for (const key of Object.keys(bucket).sort()) {
      const component = key.replace(/-scale$/, '');
      lines.push(`    --vds-exp-girok-${component}-scale: var(--vds-exp-girok-density-${mode}-${key});`);
    }
    lines.push('  }');
    lines.push('');
  }
  return lines;
}

export async function emitThemeCss(theme) {
  const lightTree = await buildThemeTokens(theme, 'light');
  const darkTree = await buildThemeTokens(theme, 'dark');
  const lightImplements = await getThemeImplements(theme, 'light');
  const darkImplements = await getThemeImplements(theme, 'dark');
  const lightImplemented = await getImplementedTokenPaths(theme, 'light');
  const darkImplemented = await getImplementedTokenPaths(theme, 'dark');

  const lightCandidates = flattenTokens(lightTree).filter((token) => {
    if (token.path[0] === 'theme') return lightImplemented.has(token.path.join('.'));
    return isSemanticToken(token) && canResolveToken(token, lightTree);
  });
  const darkCandidates = flattenTokens(darkTree).filter((token) => {
    if (token.path[0] === 'theme') return darkImplemented.has(token.path.join('.'));
    return isSemanticToken(token) && canResolveToken(token, darkTree);
  });
  const lightFlat = resolveTokens(lightCandidates, lightTree);
  const darkFlat = resolveTokens(darkCandidates, darkTree);

  const lightByVar = new Map(lightFlat.map((t) => [tokenPathToCssVar(t.path), t.resolvedValue]));
  const darkByVar = new Map(darkFlat.map((t) => [tokenPathToCssVar(t.path), t.resolvedValue]));
  for (const { name, value } of emitOptionalGroupFallbacks(lightImplements)) {
    if (!lightByVar.has(name)) lightByVar.set(name, value);
  }
  for (const { name, value } of emitOptionalGroupFallbacks(darkImplements)) {
    if (!darkByVar.has(name)) darkByVar.set(name, value);
  }

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
    '',
    ...emitGirokDensityBlocks(lightTree),
    '}',
    '',
  ].join('\n');

  await mkdir(join(DIST, 'css', 'themes'), { recursive: true });
  await writeFile(join(DIST, 'css', 'themes', `${theme}.css`), css, 'utf8');
  return { theme, lightCount: lightFlat.length, darkCount: darkFlat.length };
}
