const BASE_CLASS_RX = /^\.((?:[a-zA-Z0-9_-]|\\[\/.])+)(?=\s|\{)/;

const FAMILY_PREFIX = [
  ['bg-', 'bg'],
  ['text-', 'text'],
  ['border-', 'border'],
  ['ring-', 'ring'],
  ['opacity-', 'opacity'],
  ['shadow-', 'shadow'],
  ['cursor-', 'cursor'],
];

const STATES = [
  { prefix: 'hover', pseudo: ':hover', applyTo: new Set(['bg', 'text', 'border', 'ring', 'opacity', 'shadow']) },
  { prefix: 'focus', pseudo: ':focus', applyTo: new Set(['bg', 'text', 'border', 'ring', 'opacity']) },
  { prefix: 'focus-visible', pseudo: ':focus-visible', applyTo: new Set(['bg', 'text', 'border', 'ring']) },
  { prefix: 'active', pseudo: ':active', applyTo: new Set(['bg', 'text', 'opacity']) },
  { prefix: 'disabled', pseudo: null, applyTo: new Set(['opacity', 'cursor']) },
];

function detectFamily(className) {
  const stripped = className.replace(/^vds-/, '');
  for (const [pfx, fam] of FAMILY_PREFIX) {
    if (stripped.startsWith(pfx)) return fam;
  }
  return null;
}

export function expandStateVariants(rules) {
  const out = [];
  for (const rule of rules) {
    const m = rule.match(BASE_CLASS_RX);
    if (!m) continue;
    const fullClass = m[1];
    if (!fullClass.startsWith('vds-')) continue;
    const fam = detectFamily(fullClass);
    if (!fam) continue;

    const declarationStart = rule.indexOf('{');
    if (declarationStart < 0) continue;
    const declaration = rule.slice(declarationStart - 1);

    const baseBody = fullClass.slice('vds-'.length);

    for (const s of STATES) {
      if (!s.applyTo.has(fam)) continue;
      const newClass = `vds-${s.prefix}\\:${baseBody}`;
      let selector;
      if (s.prefix === 'disabled') {
        selector = `.${newClass}:disabled, .${newClass}[aria-disabled="true"]`;
      } else {
        selector = `.${newClass}${s.pseudo}`;
      }
      out.push(`${selector} ${declaration}`);
    }
  }
  return out;
}

export function expandGroupVariants(rules) {
  const out = [];
  const FAMILIES_FOR_GROUP = new Set(['bg', 'text', 'border', 'opacity']);
  for (const rule of rules) {
    const m = rule.match(BASE_CLASS_RX);
    if (!m) continue;
    const fullClass = m[1];
    if (!fullClass.startsWith('vds-')) continue;
    const fam = detectFamily(fullClass);
    if (!fam || !FAMILIES_FOR_GROUP.has(fam)) continue;
    const declarationStart = rule.indexOf('{');
    if (declarationStart < 0) continue;
    const declaration = rule.slice(declarationStart - 1);
    const baseBody = fullClass.slice('vds-'.length);
    const newClass = `vds-group-hover\\:${baseBody}`;
    out.push(`.vds-group:hover .${newClass} ${declaration}`);
    const focusClass = `vds-group-focus\\:${baseBody}`;
    out.push(`.vds-group:focus-within .${focusClass} ${declaration}`);
  }
  return out;
}
