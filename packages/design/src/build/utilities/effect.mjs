import { tokenPathToCssVar } from '../css-vars.mjs';

// Shadow semantic alias map — maps Tailwind/shadcn-flavored names to numeric shadow tokens.
// Tokens themselves stay numeric (`shadow.0..6`) — alias only emits utility classes.
const SHADOW_ALIAS = [
  ['xs', '1'],
  ['sm', '1'],
  ['md', '2'],
  ['lg', '3'],
  ['xl', '4'],
  ['2xl', '5'],
];

export function generateEffect(flat) {
  const rules = [];

  for (const t of flat) {
    if (t.path[0] === 'shadow') {
      rules.push(`.vds-shadow-${t.path[1]} { box-shadow: var(${tokenPathToCssVar(t.path)}); }`);
    }
    if (t.path[0] === 'opacity') {
      rules.push(`.vds-opacity-${t.path[1]} { opacity: var(${tokenPathToCssVar(t.path)}); }`);
    }
    if (t.path[0] === 'radius') {
      rules.push(`.vds-rounded-${t.path[1]} { border-radius: var(${tokenPathToCssVar(t.path)}); }`);
    }
    if (t.path[0] === 'border' && t.path[1] === 'width') {
      const w = t.path[2];
      const v = `var(${tokenPathToCssVar(t.path)})`;
      rules.push(`.vds-border-${w} { border-width: ${v}; }`);
      rules.push(`.vds-border-t-${w} { border-top-width: ${v}; }`);
      rules.push(`.vds-border-r-${w} { border-right-width: ${v}; }`);
      rules.push(`.vds-border-b-${w} { border-bottom-width: ${v}; }`);
      rules.push(`.vds-border-l-${w} { border-left-width: ${v}; }`);
      rules.push(`.vds-border-x-${w} { border-left-width: ${v}; border-right-width: ${v}; }`);
      rules.push(`.vds-border-y-${w} { border-top-width: ${v}; border-bottom-width: ${v}; }`);
    }
  }

  for (const t of flat) {
    if (t.path[0] === 'zindex') {
      rules.push(`.vds-z-${t.path[1]} { z-index: var(${tokenPathToCssVar(t.path)}); }`);
    }
  }

  // Shadow semantic aliases (xs/sm/md/lg/xl/2xl) — map to numeric shadow.{1..5} tokens.
  // Plus: `none` (no shadow) and `inner` (inset).
  for (const [alias, num] of SHADOW_ALIAS) {
    const numericTokenExists = flat.some((t) => t.path[0] === 'shadow' && String(t.path[1]) === num);
    if (!numericTokenExists) continue;
    rules.push(`.vds-shadow-${alias} { box-shadow: var(--vds-shadow-${num}); }`);
  }
  rules.push(`.vds-shadow-none { box-shadow: 0 0 #0000; }`);
  rules.push(`.vds-shadow-inner { box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05); }`);

  rules.push(`.vds-border-solid { border-style: solid; }`);
  rules.push(`.vds-border-dashed { border-style: dashed; }`);
  rules.push(`.vds-border-dotted { border-style: dotted; }`);
  rules.push(`.vds-border-none { border-style: none; }`);
  rules.push(`.vds-border-collapse { border-collapse: collapse; }`);
  rules.push(`.vds-border-separate { border-collapse: separate; }`);
  // Transparent border colors (Tailwind-compat)
  rules.push(`.vds-border-transparent { border-color: transparent; }`);
  rules.push(`.vds-border-t-transparent { border-top-color: transparent; }`);
  rules.push(`.vds-border-r-transparent { border-right-color: transparent; }`);
  rules.push(`.vds-border-b-transparent { border-bottom-color: transparent; }`);
  rules.push(`.vds-border-l-transparent { border-left-color: transparent; }`);
  rules.push(`.vds-border-current { border-color: currentColor; }`);

  // Bare default border utilities — Tailwind/shadcn-compat shorthand for
  // "1px solid var(--vds-theme-border-default)" on a side or all sides.
  // Wrapped in :where() so specificity stays (0,0,0): any concrete
  // .vds-border-{1|2|...} (width) or .vds-border-{slot} (color) utility wins
  // regardless of source order. (See SDD utility-layer-3.md for rationale.)
  const D = 'var(--vds-theme-border-default)';
  rules.push(`:where(.vds-border)   { border-width: 1px; border-style: solid; border-color: ${D}; }`);
  rules.push(`:where(.vds-border-t) { border-top-width:    1px; border-top-style:    solid; border-top-color:    ${D}; }`);
  rules.push(`:where(.vds-border-r) { border-right-width:  1px; border-right-style:  solid; border-right-color:  ${D}; }`);
  rules.push(`:where(.vds-border-b) { border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: ${D}; }`);
  rules.push(`:where(.vds-border-l) { border-left-width:   1px; border-left-style:   solid; border-left-color:   ${D}; }`);
  rules.push(`:where(.vds-border-x) { border-left-width:   1px; border-right-width:  1px; border-left-style:  solid; border-right-style:  solid; border-left-color:  ${D}; border-right-color:  ${D}; }`);
  rules.push(`:where(.vds-border-y) { border-top-width:    1px; border-bottom-width: 1px; border-top-style:   solid; border-bottom-style: solid; border-top-color:   ${D}; border-bottom-color: ${D}; }`);

  // Outline utility (Tailwind v3 outline-none equivalent) — clears native
  // focus outline while preserving high-contrast / forced-colors visibility.
  // Pair with vds-focus-visible:ring-* for a custom focus indicator.
  rules.push(`.vds-outline-none { outline: 2px solid transparent; outline-offset: 2px; }`);

  rules.push(`.vds-rounded-none { border-radius: 0; }`);
  // Tailwind default `rounded` = `rounded-md`
  rules.push(`.vds-rounded { border-radius: var(--vds-radius-md); }`);
  // Directional rounded (per-side) — common Tailwind subset
  for (const [name, props] of [
    ['t', ['border-top-left-radius', 'border-top-right-radius']],
    ['r', ['border-top-right-radius', 'border-bottom-right-radius']],
    ['b', ['border-bottom-left-radius', 'border-bottom-right-radius']],
    ['l', ['border-top-left-radius', 'border-bottom-left-radius']],
    ['tl', ['border-top-left-radius']],
    ['tr', ['border-top-right-radius']],
    ['br', ['border-bottom-right-radius']],
    ['bl', ['border-bottom-left-radius']],
  ]) {
    for (const step of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']) {
      const v = step === 'none' ? '0' : step === 'full' ? '9999px' : `var(--vds-radius-${step})`;
      const decls = props.map((p) => `${p}: ${v}`).join('; ');
      rules.push(`.vds-rounded-${name}-${step} { ${decls}; }`);
    }
    rules.push(`.vds-rounded-${name} { ${props.map((p) => `${p}: var(--vds-radius-md)`).join('; ')}; }`);
  }

  // Tailwind default `shadow` = `shadow-sm`
  rules.push(`.vds-shadow { box-shadow: var(--vds-shadow-1); }`);
  // No-op transform utility (Tailwind v3 compat — modern browsers auto-apply)
  rules.push(`.vds-transform { transform: var(--vds-tw-transform, none); }`);
  rules.push(`.vds-transform-none { transform: none; }`);

  // Tailwind-compat numeric z-index (semantic z-{slot} 은 토큰 emit 그대로 유지)
  for (const z of [0, 10, 20, 30, 40, 50]) {
    rules.push(`.vds-z-${z} { z-index: ${z}; }`);
  }
  rules.push(`.vds-z-auto { z-index: auto; }`);

  return rules;
}
