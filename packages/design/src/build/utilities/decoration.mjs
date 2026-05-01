import { tokenPathToCssVar } from '../css-vars.mjs';

export function generateDecoration(flat) {
  const rules = [];

  for (const v of ['auto', 0, 1, 2, 4, 8]) {
    rules.push(`.vds-underline-offset-${v} { text-underline-offset: ${v === 'auto' ? 'auto' : v + 'px'}; }`);
  }
  for (const v of ['auto', 'thin', 'thick', 1, 2, 4, 8]) {
    const value = typeof v === 'number' ? `${v}px` : v;
    rules.push(`.vds-decoration-${v} { text-decoration-thickness: ${value}; }`);
  }
  for (const v of ['solid', 'double', 'dotted', 'dashed', 'wavy']) {
    rules.push(`.vds-decoration-${v} { text-decoration-style: ${v}; }`);
  }

  for (let i = 1; i <= 6; i++) {
    rules.push(`.vds-line-clamp-${i} { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${i}; line-clamp: ${i}; overflow: hidden; }`);
  }
  rules.push(`.vds-line-clamp-none { -webkit-line-clamp: none; line-clamp: none; overflow: visible; }`);

  rules.push(`.vds-tabular-nums { font-variant-numeric: tabular-nums; }`);
  rules.push(`.vds-proportional-nums { font-variant-numeric: proportional-nums; }`);
  rules.push(`.vds-slashed-zero { font-variant-numeric: slashed-zero; }`);
  rules.push(`.vds-ordinal { font-variant-numeric: ordinal; }`);

  rules.push(`.vds-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }`);
  rules.push(`.vds-not-sr-only { position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal; }`);

  rules.push(`.vds-divide-y > * + * { border-top-width: 1px; border-top-style: solid; border-top-color: var(--vds-theme-border-subtle); }`);
  rules.push(`.vds-divide-x > * + * { border-left-width: 1px; border-left-style: solid; border-left-color: var(--vds-theme-border-subtle); }`);
  rules.push(`.vds-divide-y-0 > * + * { border-top-width: 0; }`);
  rules.push(`.vds-divide-x-0 > * + * { border-left-width: 0; }`);
  rules.push(`.vds-divide-y-2 > * + * { border-top-width: 2px; border-top-style: solid; border-top-color: var(--vds-theme-border-default); }`);

  for (const t of flat) {
    if (t.path[0] !== 'theme') continue;
    if (t.path[1] === 'border' && t.path.length === 3) {
      const slot = t.path[2];
      rules.push(`.vds-divide-${slot} > * + * { border-color: var(${tokenPathToCssVar(t.path)}); }`);
    }
    if (t.path.length === 2) {
      const slot = t.path[1];
      rules.push(`.vds-divide-${slot} > * + * { border-color: var(${tokenPathToCssVar(t.path)}); }`);
    }
  }

  return rules;
}
