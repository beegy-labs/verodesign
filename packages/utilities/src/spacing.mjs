import { tokenPathToCssVar } from '../css-vars.mjs';

const escapeStep = (step) => step.replace('_', '\\.');

export function generateSpacing(flat) {
  const rules = [];

  for (const t of flat) {
    if (t.path[0] !== 'spacing') continue;
    const step = t.path[1];
    const v = `var(${tokenPathToCssVar(t.path)})`;
    const s = escapeStep(step);

    rules.push(`.vds-p-${s} { padding: ${v}; }`);
    rules.push(`.vds-px-${s} { padding-left: ${v}; padding-right: ${v}; }`);
    rules.push(`.vds-py-${s} { padding-top: ${v}; padding-bottom: ${v}; }`);
    rules.push(`.vds-pt-${s} { padding-top: ${v}; }`);
    rules.push(`.vds-pr-${s} { padding-right: ${v}; }`);
    rules.push(`.vds-pb-${s} { padding-bottom: ${v}; }`);
    rules.push(`.vds-pl-${s} { padding-left: ${v}; }`);

    rules.push(`.vds-m-${s} { margin: ${v}; }`);
    rules.push(`.vds-mx-${s} { margin-left: ${v}; margin-right: ${v}; }`);
    rules.push(`.vds-my-${s} { margin-top: ${v}; margin-bottom: ${v}; }`);
    rules.push(`.vds-mt-${s} { margin-top: ${v}; }`);
    rules.push(`.vds-mr-${s} { margin-right: ${v}; }`);
    rules.push(`.vds-mb-${s} { margin-bottom: ${v}; }`);
    rules.push(`.vds-ml-${s} { margin-left: ${v}; }`);

    rules.push(`.vds-gap-${s} { gap: ${v}; }`);
    rules.push(`.vds-gap-x-${s} { column-gap: ${v}; }`);
    rules.push(`.vds-gap-y-${s} { row-gap: ${v}; }`);

    rules.push(`.vds-space-x-${s} > * + * { margin-left: ${v}; }`);
    rules.push(`.vds-space-y-${s} > * + * { margin-top: ${v}; }`);

    rules.push(`.vds-top-${s} { top: ${v}; }`);
    rules.push(`.vds-right-${s} { right: ${v}; }`);
    rules.push(`.vds-bottom-${s} { bottom: ${v}; }`);
    rules.push(`.vds-left-${s} { left: ${v}; }`);
    rules.push(`.vds-inset-${s} { inset: ${v}; }`);
  }

  rules.push(`.vds-m-auto { margin: auto; }`);
  rules.push(`.vds-mx-auto { margin-left: auto; margin-right: auto; }`);
  rules.push(`.vds-my-auto { margin-top: auto; margin-bottom: auto; }`);
  rules.push(`.vds-mt-auto { margin-top: auto; }`);
  rules.push(`.vds-mr-auto { margin-right: auto; }`);
  rules.push(`.vds-mb-auto { margin-bottom: auto; }`);
  rules.push(`.vds-ml-auto { margin-left: auto; }`);

  rules.push(`.vds-inset-0 { inset: 0; }`);
  rules.push(`.vds-inset-auto { inset: auto; }`);
  rules.push(`.vds-top-auto { top: auto; }`);
  rules.push(`.vds-right-auto { right: auto; }`);
  rules.push(`.vds-bottom-auto { bottom: auto; }`);
  rules.push(`.vds-left-auto { left: auto; }`);

  return rules;
}
