import { oklchToHex, normalizeOklch } from '../util/color.mjs';

const SHADOW_TYPES = new Set(['shadow']);
const COLOR_TYPES = new Set(['color']);

export function tokenPathToCssVar(path) {
  return `--vds-${path.join('-').toLowerCase()}`;
}

function isOklchValue(value) {
  return typeof value === 'string' && value.trim().toLowerCase().startsWith('oklch');
}

function shadowToCss(value) {
  if (value === 'none') return 'none';
  const { offsetX, offsetY, blur, spread, color } = value;
  const colorOut = isOklchValue(color) ? color : color;
  return `${offsetX} ${offsetY} ${blur} ${spread ?? '0'} ${colorOut}`;
}

function shadowFallback(value) {
  if (value === 'none') return 'none';
  const hex = oklchToHex(value.color);
  return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread ?? '0'} ${hex}`;
}

export function emitTokenLines(token) {
  const cssVar = tokenPathToCssVar(token.path);
  const value = token.resolvedValue;
  const lines = [];

  if (token.type === 'shadow' || SHADOW_TYPES.has(token.type)) {
    if (value === 'none') {
      lines.push(`  ${cssVar}: none;`);
    } else {
      lines.push(`  ${cssVar}: ${shadowFallback(value)};`);
      lines.push(`  ${cssVar}: ${shadowToCss(value)};`);
    }
    return lines;
  }

  if (token.type === 'cubicBezier' && Array.isArray(value)) {
    lines.push(`  ${cssVar}: cubic-bezier(${value.join(', ')});`);
    return lines;
  }

  if (COLOR_TYPES.has(token.type) && isOklchValue(value)) {
    lines.push(`  ${cssVar}: ${oklchToHex(value)};`);
    lines.push(`  ${cssVar}: ${normalizeOklch(value)};`);
    return lines;
  }

  if (token.type === 'fontWeight' || token.type === 'number' || token.type === 'duration' || token.type === 'dimension' || token.type === 'fontFamily') {
    lines.push(`  ${cssVar}: ${value};`);
    return lines;
  }

  lines.push(`  ${cssVar}: ${value};`);
  return lines;
}

export function emitTokensBlock(tokens) {
  const lines = [];
  for (const token of tokens) {
    lines.push(...emitTokenLines(token));
  }
  return lines.join('\n');
}
