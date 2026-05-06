import { tokenPathToCssVar } from '../css-vars.mjs';

const escapeStep = (step) => step.replace('_', '\\.');

const NAMED_WIDTHS = {
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  prose: '65ch',
};

export function generateSizing(flat) {
  const rules = [];

  for (const t of flat) {
    if (t.path[0] !== 'spacing') continue;
    const step = t.path[1];
    const v = `var(${tokenPathToCssVar(t.path)})`;
    const s = escapeStep(step);
    rules.push(`.vds-w-${s} { width: ${v}; }`);
    rules.push(`.vds-h-${s} { height: ${v}; }`);
    rules.push(`.vds-min-w-${s} { min-width: ${v}; }`);
    rules.push(`.vds-min-h-${s} { min-height: ${v}; }`);
    rules.push(`.vds-max-w-${s} { max-width: ${v}; }`);
    rules.push(`.vds-max-h-${s} { max-height: ${v}; }`);
  }

  for (const k of ['auto', 'full', 'screen', 'fit', 'min', 'max']) {
    const w = k === 'full' ? '100%' : k === 'screen' ? '100vw' : k === 'fit' ? 'fit-content' : k === 'min' ? 'min-content' : k === 'max' ? 'max-content' : 'auto';
    const h = k === 'screen' ? '100vh' : w;
    rules.push(`.vds-w-${k} { width: ${w}; }`);
    rules.push(`.vds-h-${k} { height: ${h}; }`);
    rules.push(`.vds-min-w-${k} { min-width: ${w}; }`);
    rules.push(`.vds-min-h-${k} { min-height: ${h}; }`);
    rules.push(`.vds-max-w-${k} { max-width: ${w}; }`);
    rules.push(`.vds-max-h-${k} { max-height: ${h}; }`);
  }

  for (const [name, value] of Object.entries(NAMED_WIDTHS)) {
    rules.push(`.vds-max-w-${name} { max-width: ${value}; }`);
    rules.push(`.vds-w-${name} { width: ${value}; }`);
  }

  rules.push(`.vds-w-0 { width: 0; }`);
  rules.push(`.vds-h-0 { height: 0; }`);
  rules.push(`.vds-min-w-0 { min-width: 0; }`);
  rules.push(`.vds-min-h-0 { min-height: 0; }`);
  rules.push(`.vds-max-w-none { max-width: none; }`);
  rules.push(`.vds-max-h-none { max-height: none; }`);

  // Tailwind-compat 1px exact (`px` literal, not the prefix `p-{x}`).
  rules.push(`.vds-w-px { width: 1px; }`);
  rules.push(`.vds-h-px { height: 1px; }`);
  rules.push(`.vds-min-w-px { min-width: 1px; }`);
  rules.push(`.vds-min-h-px { min-height: 1px; }`);
  rules.push(`.vds-max-w-px { max-width: 1px; }`);
  rules.push(`.vds-max-h-px { max-height: 1px; }`);
  rules.push(`.vds-gap-px { gap: 1px; }`);
  rules.push(`.vds-gap-x-px { column-gap: 1px; }`);
  rules.push(`.vds-gap-y-px { row-gap: 1px; }`);

  // Tailwind viewport sizes (responsive container max).
  rules.push(`.vds-h-screen { height: 100vh; }`);
  rules.push(`.vds-min-h-screen { min-height: 100vh; }`);
  rules.push(`.vds-max-h-screen { max-height: 100vh; }`);
  rules.push(`.vds-h-dvh { height: 100dvh; }`);
  rules.push(`.vds-min-h-dvh { min-height: 100dvh; }`);
  rules.push(`.vds-max-h-dvh { max-height: 100dvh; }`);
  rules.push(`.vds-h-svh { height: 100svh; }`);
  rules.push(`.vds-h-lvh { height: 100lvh; }`);

  // Viewport-relative widths
  rules.push(`.vds-w-screen { width: 100vw; }`);
  rules.push(`.vds-w-dvw { width: 100dvw; }`);
  rules.push(`.vds-w-mobile-drawer { width: 80vw; }`); // mobile sidebar 표준 폭
  rules.push(`.vds-max-w-mobile-drawer { max-width: 80vw; }`);

  // Common modal / panel sizes (Tailwind 마이그 시 자주 쓰이는 패턴)
  rules.push(`.vds-max-w-modal-sm { max-width: 420px; }`);
  rules.push(`.vds-max-w-modal-md { max-width: 560px; }`);
  rules.push(`.vds-max-w-modal-lg { max-width: 720px; }`);

  // Animated collapse maximum (no real cap — for max-height transitions)
  rules.push(`.vds-max-h-uncapped { max-height: 9999px; }`);
  rules.push(`.vds-max-h-half-vh { max-height: 50vh; }`);
  rules.push(`.vds-max-h-3-quarter-vh { max-height: 70vh; }`);
  rules.push(`.vds-max-h-9-tenth-vh { max-height: 90vh; }`);

  // Position anchored values
  for (const side of ['top', 'right', 'bottom', 'left']) {
    rules.push(`.vds-${side}-0 { ${side}: 0; }`);
    rules.push(`.vds-${side}-full { ${side}: 100%; }`);
    rules.push(`.vds-${side}-px { ${side}: 1px; }`);
    rules.push(`.vds-${side}-auto { ${side}: auto; }`);
  }
  rules.push(`.vds-inset-0 { inset: 0; }`);
  rules.push(`.vds-inset-auto { inset: auto; }`);
  rules.push(`.vds-inset-x-0 { left: 0; right: 0; }`);
  rules.push(`.vds-inset-y-0 { top: 0; bottom: 0; }`);
  rules.push(`.vds-inset-x-auto { left: auto; right: auto; }`);
  rules.push(`.vds-inset-y-auto { top: auto; bottom: auto; }`);

  return rules;
}
