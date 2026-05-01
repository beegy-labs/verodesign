import { tokenPathToCssVar } from '../css-vars.mjs';

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

  rules.push(`.vds-border-solid { border-style: solid; }`);
  rules.push(`.vds-border-dashed { border-style: dashed; }`);
  rules.push(`.vds-border-dotted { border-style: dotted; }`);
  rules.push(`.vds-border-none { border-style: none; }`);

  rules.push(`.vds-rounded-none { border-radius: 0; }`);

  return rules;
}
