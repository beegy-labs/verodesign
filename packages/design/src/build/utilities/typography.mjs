import { tokenPathToCssVar } from '../css-vars.mjs';

const WEIGHT_ALIAS = { 400: 'normal', 500: 'medium', 600: 'semibold', 700: 'bold' };

export function generateTypography(flat) {
  const rules = [];

  for (const t of flat) {
    if (t.path[0] !== 'font') continue;
    const v = `var(${tokenPathToCssVar(t.path)})`;

    if (t.path[1] === 'size') {
      rules.push(`.vds-text-${t.path[2]} { font-size: ${v}; }`);
    } else if (t.path[1] === 'weight') {
      const numeric = t.path[2];
      rules.push(`.vds-font-${numeric} { font-weight: ${v}; }`);
      const alias = WEIGHT_ALIAS[numeric];
      if (alias) rules.push(`.vds-font-${alias} { font-weight: ${v}; }`);
    } else if (t.path[1] === 'lineHeight') {
      rules.push(`.vds-leading-${t.path[2]} { line-height: ${v}; }`);
    } else if (t.path[1] === 'letterSpacing') {
      rules.push(`.vds-tracking-${t.path[2]} { letter-spacing: ${v}; }`);
    } else if (t.path[1] === 'family') {
      rules.push(`.vds-font-${t.path[2]} { font-family: ${v}; }`);
    }
  }

  rules.push(`.vds-text-left { text-align: left; }`);
  rules.push(`.vds-text-center { text-align: center; }`);
  rules.push(`.vds-text-right { text-align: right; }`);
  rules.push(`.vds-text-justify { text-align: justify; }`);
  rules.push(`.vds-text-start { text-align: start; }`);
  rules.push(`.vds-text-end { text-align: end; }`);

  rules.push(`.vds-italic { font-style: italic; }`);
  rules.push(`.vds-not-italic { font-style: normal; }`);

  rules.push(`.vds-underline { text-decoration: underline; }`);
  rules.push(`.vds-line-through { text-decoration: line-through; }`);
  rules.push(`.vds-no-underline { text-decoration: none; }`);

  rules.push(`.vds-uppercase { text-transform: uppercase; }`);
  rules.push(`.vds-lowercase { text-transform: lowercase; }`);
  rules.push(`.vds-capitalize { text-transform: capitalize; }`);
  rules.push(`.vds-normal-case { text-transform: none; }`);

  rules.push(`.vds-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`);
  rules.push(`.vds-whitespace-normal { white-space: normal; }`);
  rules.push(`.vds-whitespace-nowrap { white-space: nowrap; }`);
  rules.push(`.vds-whitespace-pre { white-space: pre; }`);
  rules.push(`.vds-whitespace-pre-wrap { white-space: pre-wrap; }`);
  rules.push(`.vds-break-words { overflow-wrap: break-word; }`);
  rules.push(`.vds-break-all { word-break: break-all; }`);

  return rules;
}
