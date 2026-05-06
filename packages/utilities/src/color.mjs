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

  // Tailwind-static colors (no theme dependency, cascade-safe)
  // emitted FIRST so per-slot colors (slate.X, primary, etc.) can override
  const STATIC_COLORS = {
    'black': '#000', 'white': '#fff', 'transparent': 'transparent',
    'current': 'currentColor', 'inherit': 'inherit',
  };
  for (const [name, value] of Object.entries(STATIC_COLORS)) {
    rules.push(`.vds-bg-${name} { background-color: ${value}; }`);
    rules.push(`.vds-text-${name} { color: ${value}; }`);
    if (name !== 'inherit') {
      // alpha variants for black/white only (transparent / current / inherit 무의미)
      if (name === 'black' || name === 'white') {
        for (const step of OPACITY_STEPS) {
          rules.push(`.vds-bg-${name}\\/${step} { background-color: color-mix(in oklab, ${value} ${step}%, transparent); }`);
          rules.push(`.vds-text-${name}\\/${step} { color: color-mix(in oklab, ${value} ${step}%, transparent); }`);
        }
      }
    }
  }

  // Primitive ramp utilities (color.{hue}.{1..12} → bg/text/border slot utility).
  // verobase 마이그 시 `bg-blue-50`, `text-indigo-700` 같은 Tailwind-static 사용.
  // Tailwind step (50/100/.../900) → verodesign step (1..12) Tailwind-호환 alias.
  // **Bundle 최적화**: primitive ramp 는 base utility 만 emit, opacity variant 미생성.
  // 알파 modifier 가 정말 필요하면 inline `style={{}}` 또는 semantic slot 으로 대체.
  // (semantic slot 은 emitColorSlot 으로 alpha 변형 포함 emit 됨)
  const TW_STEP_TO_VDS = {
    '50': '1', '100': '2', '200': '3', '300': '4', '400': '5',
    '500': '6', '600': '7', '700': '8', '800': '9', '900': '10', '950': '11',
  };
  for (const t of flat) {
    if (t.path[0] !== 'color') continue;
    if (t.path.length !== 3) continue;
    const hue = t.path[1];
    const step = t.path[2];
    const cssVar = tokenPathToCssVar(t.path);
    const slot = `${hue}-${step}`;
    rules.push(`.vds-bg-${slot} { background-color: var(${cssVar}); }`);
    rules.push(`.vds-text-${slot} { color: var(${cssVar}); }`);
    rules.push(`.vds-border-${slot} { border-color: var(${cssVar}); }`);
    // Tailwind-step alias (e.g. blue-50 → blue-1) — base only
    const twStep = Object.entries(TW_STEP_TO_VDS).find(([, vds]) => vds === step)?.[0];
    if (twStep) {
      const aliasSlot = `${hue}-${twStep}`;
      rules.push(`.vds-bg-${aliasSlot} { background-color: var(${cssVar}); }`);
      rules.push(`.vds-text-${aliasSlot} { color: var(${cssVar}); }`);
      rules.push(`.vds-border-${aliasSlot} { border-color: var(${cssVar}); }`);
    }
  }

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
      // theme.text.primary 는 role primary (브랜드) 와 .vds-text-primary 이름 충돌.
      // Tailwind/shadcn convention 에 맞춰 text-primary = 브랜드로 두고,
      // foreground 텍스트 슬롯은 'fg' alias 로만 emit (vds-text-fg / vds-bg-fg / vds-border-fg).
      if (slot === 'primary') {
        rules.push(`.vds-text-fg { color: var(${cssVar}); }`);
        rules.push(`.vds-bg-fg { background-color: var(${cssVar}); }`);
        rules.push(`.vds-border-fg { border-color: var(${cssVar}); }`);
        emitOpacityVariants(rules, `vds-text-fg`, 'color', cssVar);
        emitOpacityVariants(rules, `vds-bg-fg`, 'background-color', cssVar);
        emitOpacityVariants(rules, `vds-border-fg`, 'border-color', cssVar);
        seenSlots.add(`text-primary`);
        continue;
      }
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
