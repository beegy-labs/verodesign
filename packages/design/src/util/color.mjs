import { converter, formatHex, parse, oklch as toOklch } from 'culori';
import { hex as wcagHex } from 'wcag-contrast';

const toRgb = converter('rgb');

const round = (n, d = 4) => Number.parseFloat(Number(n).toFixed(d));

export function parseOklchString(str) {
  const parsed = parse(str);
  if (!parsed) throw new Error(`Cannot parse color: ${str}`);
  return toOklch(parsed);
}

export function oklchToHex(value) {
  const parsed = parse(value);
  if (!parsed) throw new Error(`Cannot parse color: ${value}`);
  if (parsed.alpha !== undefined && parsed.alpha < 1) {
    const rgb = toRgb(parsed);
    if (!rgb) throw new Error(`Cannot convert to RGB: ${value}`);
    const r = Math.round(Math.max(0, Math.min(1, rgb.r ?? 0)) * 255);
    const g = Math.round(Math.max(0, Math.min(1, rgb.g ?? 0)) * 255);
    const b = Math.round(Math.max(0, Math.min(1, rgb.b ?? 0)) * 255);
    const a = Math.round(parsed.alpha * 255);
    return `#${[r, g, b, a].map((n) => n.toString(16).padStart(2, '0')).join('')}`;
  }
  return formatHex(parsed);
}

export function normalizeOklch(value) {
  const o = parseOklchString(value);
  const lPct = round(o.l * 100, 2);
  const c = round(o.c, 4);
  const h = round(o.h ?? 0, 2);
  if (o.alpha !== undefined && o.alpha < 1) {
    return `oklch(${lPct}% ${c} ${h} / ${round(o.alpha, 3)})`;
  }
  return `oklch(${lPct}% ${c} ${h})`;
}

export function contrastRatio(fgValue, bgValue) {
  const fg = oklchToHex(fgValue).slice(0, 7);
  const bg = oklchToHex(bgValue).slice(0, 7);
  return wcagHex(fg, bg);
}
