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

  return rules;
}
