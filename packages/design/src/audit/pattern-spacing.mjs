import { GIROK_APP_PATTERNS_CSS, readGirokPatternSources } from '../build/emit-static.mjs';

const SCOPED_ROOTS = [
  '.vds-pattern-girok-wordmark',
  '.vds-pattern-girok-tab-l1',
  '.vds-pattern-girok-tab-l2',
  '.vds-pattern-girok-stats',
  '.vds-pattern-girok-calendar',
  '.vds-pattern-girok-icon-actions',
  '.vds-pattern-girok-toolbar',
  '.vds-pattern-girok-month-pill',
  '.vds-pattern-girok-register-chip',
  '.vds-pattern-girok-view-toggle',
  '.vds-pattern-girok-bottom-nav',
  '.vds-pattern-bottomsheet__sheet',
];

const ROOT_STATUS = [
  { pattern: 'girok-wordmark', status: 'clean', selector: '.vds-pattern-girok-wordmark' },
  { pattern: 'girok-tab-l1', status: 'clean', selector: '.vds-pattern-girok-tab-l1__scroll' },
  { pattern: 'girok-tab-l2', status: 'clean', selector: '.vds-pattern-girok-tab-l2' },
  { pattern: 'girok-stats', status: 'clean', selector: '.vds-pattern-girok-stats' },
  { pattern: 'girok-calendar', status: 'clean', selector: '.vds-pattern-girok-calendar' },
  { pattern: 'girok-icon-actions', status: 'clean', selector: '.vds-pattern-girok-icon-actions' },
  { pattern: 'girok-toolbar', status: 'clean', selector: '.vds-pattern-girok-toolbar' },
  { pattern: 'girok-month-pill', status: 'clean', selector: '.vds-pattern-girok-month-pill' },
  { pattern: 'girok-register-chip', status: 'clean', selector: '.vds-pattern-girok-register-chip' },
  { pattern: 'girok-view-toggle', status: 'clean', selector: '.vds-pattern-girok-view-toggle' },
  { pattern: 'girok-bottom-nav', status: 'clean', selector: '.vds-pattern-girok-bottom-nav' },
  { pattern: 'girok-bottomsheet', status: 'clean', selector: '.vds-pattern-bottomsheet__sheet' },
];

const ALLOWED_PADDING_SELECTORS = new Set([
  '.vds-pattern-girok-tab-l1__scroll',
  '.vds-pattern-girok-tab-l1__item',
  '.vds-pattern-girok-tab-l2',
  '.vds-pattern-girok-tab-l2__cell',
  '.vds-pattern-girok-stats__cell',
  '.vds-pattern-girok-calendar__weekdays',
  '.vds-pattern-girok-month-pill',
  '.vds-pattern-girok-register-chip',
  '.vds-pattern-girok-view-toggle',
  '.vds-pattern-girok-view-toggle__item',
  '.vds-pattern-girok-bottom-nav',
  '.vds-pattern-bottomsheet__sheet',
  '.vds-pattern-bottomsheet__header',
  '.vds-pattern-bottomsheet__body',
  '.vds-pattern-bottomsheet__footer',
  '.vds-pattern-bottomsheet__cta',
]);

const OUTER_PADDING_VIOLATIONS = new Set([
  '.vds-pattern-girok-calendar',
]);

function parseRules(css) {
  const rules = [];
  const re = /([^{}@]+)\{([^{}]+)\}/g;
  let match;
  while ((match = re.exec(css))) {
    const selector = match[1].trim().replace(/\s+/g, ' ');
    const body = match[2].trim();
    rules.push({ selector, body });
  }
  return rules;
}

function touchesPattern(selector) {
  return selector.includes('.vds-pattern-girok-') || selector.includes('.vds-pattern-bottomsheet__');
}

export function auditPatternSpacing() {
  const failures = [];
  const css = GIROK_APP_PATTERNS_CSS;
  const sourceFiles = readGirokPatternSources();
  const rules = parseRules(css);

  for (const root of SCOPED_ROOTS) {
    const scopedNeedle = `@scope (${root})`;
    if (!css.includes(scopedNeedle)) {
      failures.push({ type: 'scope', selector: root, detail: scopedNeedle });
    }
    const antiPatternNeedle = `@scope (${root}) to (${root} *)`;
    if (css.includes(antiPatternNeedle)) {
      failures.push({ type: 'scope-anti-pattern', selector: root, detail: antiPatternNeedle });
    }
  }

  for (const { selector, body } of rules) {
    if (!touchesPattern(selector)) continue;

    if (/\bmargin(?:-[a-z]+)?\s*:/.test(body)) {
      failures.push({ type: 'margin', selector, detail: body });
    }

    if (!/\bpadding\s*:/.test(body)) continue;
    const selectorList = selector.split(',').map((part) => part.trim());
    for (const part of selectorList) {
      if (OUTER_PADDING_VIOLATIONS.has(part)) {
        failures.push({ type: 'outer-padding', selector: part, detail: body });
      }
      if (ALLOWED_PADDING_SELECTORS.has(part)) continue;
    }
  }

  return {
    failures,
    roots: ROOT_STATUS,
    sourceFiles: sourceFiles.map(({ file }) => file),
  };
}
