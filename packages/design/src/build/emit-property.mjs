import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from './loader.mjs';
import { resolveTokens } from './resolver.mjs';
import { tokenPathToCssVar } from './css-vars.mjs';
import { normalizeOklch } from '../util/color.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

// DTCG $type → CSS @property syntax + inheritance defaults.
// Architecture: docs/llm/build/optimization.md § Technique 1.
// Decision lock: docs/llm/decisions.md § Performance & size optimization.
function descriptorFor(token) {
  const { type, path } = token;
  const pathStr = path.join('.');

  // Composite types — must use "*" syntax (initial-value optional)
  if (type === 'shadow') return { syntax: '"*"', inherits: 'false', composite: true };
  if (type === 'cubicBezier') return { syntax: '"*"', inherits: 'false', composite: true };

  // Theme color tokens (theme.bg.page, theme.text.primary, etc.) MUST inherit
  // so that :root / [data-theme] / [data-mode] cascades flow to every
  // descendant — otherwise children fall back to the registered
  // `initial-value` (light) regardless of the active mode and theming breaks.
  // Palette primitives (color.slate.*, color.blue.*) stay non-inheriting since
  // they're constants used only via var() reference, never re-defined per element.
  if (type === 'color') {
    const isThemeToken = path[0] === 'theme';
    return { syntax: '"<color>"', inherits: isThemeToken ? 'true' : 'false' };
  }

  if (type === 'dimension') {
    // font-size may eventually be fluid clamp() — accept length-percentage for those paths
    const isFontSize = pathStr.startsWith('font.size');
    return { syntax: isFontSize ? '"<length-percentage>"' : '"<length>"', inherits: 'false' };
  }

  if (type === 'duration') return { syntax: '"<time>"', inherits: 'false' };
  if (type === 'fontWeight') return { syntax: '"<number>"', inherits: 'false' };

  if (type === 'number') {
    // lineHeight tokens must inherit (text-block descendants need parent line-height)
    const isLineHeight = pathStr.includes('lineHeight') || pathStr.includes('leading');
    return { syntax: '"<number>"', inherits: isLineHeight ? 'true' : 'false' };
  }

  if (type === 'fontFamily') return { syntax: '"*"', inherits: 'true', composite: true };

  // Unknown / unhandled — fall back to universal syntax
  return { syntax: '"*"', inherits: 'false', composite: true };
}

// Format the resolved value as a valid initial-value CSS literal.
// Must be computationally independent — no `em`, no `%` (unless absolute),
// no `currentColor`. Resolved primitive values already satisfy this.
function initialValueFor(token) {
  const { type, resolvedValue } = token;

  if (type === 'shadow') {
    if (resolvedValue === 'none') return 'none';
    const { offsetX, offsetY, blur, spread, color } = resolvedValue;
    return `${offsetX} ${offsetY} ${blur} ${spread ?? '0'} ${color}`;
  }

  if (type === 'cubicBezier' && Array.isArray(resolvedValue)) {
    return `cubic-bezier(${resolvedValue.join(', ')})`;
  }

  if (type === 'color' && typeof resolvedValue === 'string' &&
      resolvedValue.toLowerCase().startsWith('oklch')) {
    return normalizeOklch(resolvedValue);
  }

  return String(resolvedValue);
}

// Build the canonical token set: primitives + semantic + default-theme
// (light) bindings. The @property registration is global per CSS variable
// name; the default-light value is the initial-value used until any
// @layer-scoped override resolves at runtime.
async function loadCanonicalTokens() {
  const tree = await buildThemeTokens('default', 'light');
  const flat = flattenTokens(tree);
  const resolved = resolveTokens(flat, tree);

  // De-duplicate by CSS variable name. Last write wins (later tokens override
  // earlier in deepMerge order: primitives → semantic → theme).
  const byCssVar = new Map();
  for (const token of resolved) {
    const cssVar = tokenPathToCssVar(token.path);
    byCssVar.set(cssVar, token);
  }
  return [...byCssVar.values()];
}

export async function emitPropertyCss() {
  const tokens = await loadCanonicalTokens();

  const lines = [
    '/* @verobee/design — tokens.property.css */',
    '/* @property registrations for typed custom properties. */',
    '/* Architecture: docs/llm/build/optimization.md § Technique 1. */',
    '/* MUST load before core.css and theme files. NOT inside @layer (registrations are global). */',
    '',
    '/* Cascade layer order — see decisions.md § Performance & size optimization. */',
    '@layer reset, base, vds-tokens, vds-utilities, components, overrides;',
    '',
  ];

  let registered = 0;
  for (const token of tokens) {
    const cssVar = tokenPathToCssVar(token.path);
    const { syntax, inherits, composite } = descriptorFor(token);

    lines.push(`@property ${cssVar} {`);
    lines.push(`  syntax: ${syntax};`);
    lines.push(`  inherits: ${inherits};`);

    // initial-value is required unless syntax is "*"
    if (!composite) {
      try {
        const init = initialValueFor(token);
        lines.push(`  initial-value: ${init};`);
      } catch (err) {
        // Skip — but warn at build time
        process.stderr.write(`  [property] skip ${cssVar}: ${err.message}\n`);
        // Convert to composite with "*" syntax
        lines[lines.length - 2] = `  syntax: "*";`;
      }
    }

    lines.push('}');
    registered++;
  }

  lines.push('');

  await mkdir(join(DIST, 'css'), { recursive: true });
  await writeFile(join(DIST, 'css', 'tokens.property.css'), lines.join('\n'), 'utf8');
  return { count: registered };
}
