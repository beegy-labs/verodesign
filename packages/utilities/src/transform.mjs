import { tokenPathToCssVar } from '../css-vars.mjs';

const escapeStep = (step) => step.replace('_', '\\.');
const escapeFraction = (s) => s.replace('/', '\\/');

const ROTATIONS = [0, 1, 2, 3, 6, 12, 45, 90, 180, 270];
const SCALES = [0, 50, 75, 90, 95, 100, 105, 110, 125, 150];
const FRACTIONS = ['1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'full'];

const fracValue = (f) =>
  f === 'full' ? '100%' : (() => {
    const [n, d] = f.split('/').map(Number);
    return `${(n / d) * 100}%`;
  })();

export function generateTransform(flat) {
  const rules = [];

  for (const r of ROTATIONS) {
    rules.push(`.vds-rotate-${r} { transform: rotate(${r}deg); }`);
    if (r > 0) rules.push(`.vds--rotate-${r}, .vds-\\-rotate-${r} { transform: rotate(-${r}deg); }`);
  }
  for (const s of SCALES) {
    rules.push(`.vds-scale-${s} { transform: scale(${s / 100}); }`);
    rules.push(`.vds-scale-x-${s} { transform: scaleX(${s / 100}); }`);
    rules.push(`.vds-scale-y-${s} { transform: scaleY(${s / 100}); }`);
  }

  for (const f of FRACTIONS) {
    const v = fracValue(f);
    rules.push(`.${escapeFraction(`vds-translate-x-${f}`)} { transform: translateX(${v}); }`);
    rules.push(`.${escapeFraction(`vds-translate-y-${f}`)} { transform: translateY(${v}); }`);
    rules.push(`.${escapeFraction(`vds--translate-x-${f}`)}, .${escapeFraction(`vds-\\-translate-x-${f}`)} { transform: translateX(-${v}); }`);
    rules.push(`.${escapeFraction(`vds--translate-y-${f}`)}, .${escapeFraction(`vds-\\-translate-y-${f}`)} { transform: translateY(-${v}); }`);
  }

  for (const t of flat) {
    if (t.path[0] !== 'spacing') continue;
    const step = t.path[1];
    const v = `var(${tokenPathToCssVar(t.path)})`;
    const s = escapeStep(step);
    rules.push(`.vds-translate-x-${s} { transform: translateX(${v}); }`);
    rules.push(`.vds-translate-y-${s} { transform: translateY(${v}); }`);
    rules.push(`.vds--translate-x-${s}, .vds-\\-translate-x-${s} { transform: translateX(calc(${v} * -1)); }`);
    rules.push(`.vds--translate-y-${s}, .vds-\\-translate-y-${s} { transform: translateY(calc(${v} * -1)); }`);
  }

  rules.push(`.vds-transform-none { transform: none; }`);
  rules.push(`.vds-origin-center { transform-origin: center; }`);
  rules.push(`.vds-origin-top { transform-origin: top; }`);
  rules.push(`.vds-origin-bottom { transform-origin: bottom; }`);
  rules.push(`.vds-origin-left { transform-origin: left; }`);
  rules.push(`.vds-origin-right { transform-origin: right; }`);

  return rules;
}
