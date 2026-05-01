const BASE_CLASS_RX = /^\.vds-(\S+?)(?=\s|\{)/;

const FAMILY_PREFIX = [
  ['bg-', 'bg'],
  ['text-', 'text'],
  ['border-', 'border'],
  ['opacity-', 'opacity'],
  ['shadow-', 'shadow'],
  ['cursor-', 'cursor'],
];

const STATES = [
  { prefix: 'hover', pseudo: ':hover', applyTo: new Set(['bg', 'text', 'border', 'opacity', 'shadow']) },
  { prefix: 'focus', pseudo: ':focus', applyTo: new Set(['bg', 'text', 'border', 'opacity']) },
  { prefix: 'focus-visible', pseudo: ':focus-visible', applyTo: new Set(['bg', 'text', 'border']) },
  { prefix: 'active', pseudo: ':active', applyTo: new Set(['bg', 'text', 'opacity']) },
  { prefix: 'disabled', pseudo: null, applyTo: new Set(['opacity', 'cursor']) },
];

function detectFamily(className) {
  for (const [pfx, fam] of FAMILY_PREFIX) {
    if (className.startsWith(pfx)) return fam;
  }
  return null;
}

export function expandStateVariants(rules) {
  const out = [];
  for (const rule of rules) {
    const m = rule.match(BASE_CLASS_RX);
    if (!m) continue;
    const className = m[1];
    const fam = detectFamily(className);
    if (!fam) continue;

    const declaration = rule.slice(m[0].length);

    for (const s of STATES) {
      if (!s.applyTo.has(fam)) continue;
      const newClass = `vds-${s.prefix}\\:${className}`;
      let selector;
      if (s.prefix === 'disabled') {
        selector = `.${newClass}:disabled, .${newClass}[aria-disabled="true"]`;
      } else {
        selector = `.${newClass}${s.pseudo}`;
      }
      out.push(`${selector}${declaration}`);
    }
  }
  return out;
}
