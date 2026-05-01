import { tokenPathToCssVar } from '../css-vars.mjs';

const OPACITY_STEPS = [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95];

const SEMANTIC_ROLES = ['primary', 'accent', 'accent-2', 'accent-3', 'destructive', 'success', 'warning', 'error', 'info', 'neutral', 'cancelled'];

function alphaRule(className, prop, cssVar, alpha) {
  const escaped = className.replace('/', '\\/');
  return `.${escaped} { ${prop}: color-mix(in oklab, var(${cssVar}) ${alpha}%, transparent); }`;
}

function emitOpacityVariants(rules, baseClass, prop, cssVar) {
  for (const step of OPACITY_STEPS) {
    rules.push(alphaRule(`${baseClass}/${step}`, prop, cssVar, step));
  }
  rules.push(`.${baseClass.replace('/', '\\/')}\\/100 { ${prop}: var(${cssVar}); }`);
}

function emitColorSlot(rules, slotName, cssVar) {
  rules.push(`.vds-bg-${slotName} { background-color: var(${cssVar}); }`);
  rules.push(`.vds-text-${slotName} { color: var(${cssVar}); }`);
  rules.push(`.vds-border-${slotName} { border-color: var(${cssVar}); }`);
  emitOpacityVariants(rules, `vds-bg-${slotName}`, 'background-color', cssVar);
  emitOpacityVariants(rules, `vds-text-${slotName}`, 'color', cssVar);
  emitOpacityVariants(rules, `vds-border-${slotName}`, 'border-color', cssVar);
}

export function generateColor(flat) {
  const rules = [];
  const seenSlots = new Set();

  for (const t of flat) {
    if (t.path[0] !== 'theme') continue;
    const cssVar = tokenPathToCssVar(t.path);

    if (t.path[1] === 'bg' && t.path.length === 3) {
      const slot = t.path[2];
      emitColorSlot(rules, slot, cssVar);
      seenSlots.add(`bg-${slot}`);
      continue;
    }
    if (t.path[1] === 'text' && t.path.length === 3) {
      const slot = t.path[2];
      rules.push(`.vds-text-${slot} { color: var(${cssVar}); }`);
      rules.push(`.vds-bg-text-${slot} { background-color: var(${cssVar}); }`);
      rules.push(`.vds-border-text-${slot} { border-color: var(${cssVar}); }`);
      emitOpacityVariants(rules, `vds-text-${slot}`, 'color', cssVar);
      emitOpacityVariants(rules, `vds-bg-text-${slot}`, 'background-color', cssVar);
      emitOpacityVariants(rules, `vds-border-text-${slot}`, 'border-color', cssVar);
      seenSlots.add(`text-${slot}`);
      continue;
    }
    if (t.path[1] === 'border' && t.path.length === 3) {
      const slot = t.path[2];
      rules.push(`.vds-border-${slot} { border-color: var(${cssVar}); }`);
      rules.push(`.vds-bg-border-${slot} { background-color: var(${cssVar}); }`);
      rules.push(`.vds-text-border-${slot} { color: var(${cssVar}); }`);
      emitOpacityVariants(rules, `vds-border-${slot}`, 'border-color', cssVar);
      emitOpacityVariants(rules, `vds-bg-border-${slot}`, 'background-color', cssVar);
      emitOpacityVariants(rules, `vds-text-border-${slot}`, 'color', cssVar);
      seenSlots.add(`border-${slot}`);
      continue;
    }
    if (t.path[1] === 'logo' && t.path.length === 3) {
      const slot = `logo-${t.path[2]}`;
      emitColorSlot(rules, slot, cssVar);
      seenSlots.add(slot);
      continue;
    }
    if (t.path[1] === 'chart' && t.path.length === 3) {
      const slot = `chart-${t.path[2]}`;
      emitColorSlot(rules, slot, cssVar);
      seenSlots.add(slot);
      continue;
    }
    if (t.path.length === 2) {
      const slot = t.path[1];
      emitColorSlot(rules, slot, cssVar);
      seenSlots.add(slot);
      continue;
    }
  }

  for (const role of SEMANTIC_ROLES) {
    if (!seenSlots.has(role)) {
      const cssVar = `--vds-theme-${role}`;
      emitColorSlot(rules, role, cssVar);
    }
    const fgRole = `${role}-fg`;
    if (!seenSlots.has(fgRole)) {
      const cssVar = `--vds-theme-${role}-fg`;
      emitColorSlot(rules, fgRole, cssVar);
    }
  }

  return rules;
}
