import { tokenPathToCssVar } from '../css-vars.mjs';

const SEMANTIC_ROLES = ['primary', 'destructive', 'success', 'warning', 'error', 'info', 'neutral'];

export function generateColor(flat) {
  const rules = [];
  const textSlotNames = new Set(
    flat.filter((t) => t.path[0] === 'theme' && t.path[1] === 'text').map((t) => t.path[2])
  );

  for (const t of flat) {
    if (t.path[0] !== 'theme') continue;
    const v = `var(${tokenPathToCssVar(t.path)})`;
    if (t.path[1] === 'bg') rules.push(`.vds-bg-${t.path[2]} { background-color: ${v}; }`);
    else if (t.path[1] === 'text') rules.push(`.vds-text-${t.path[2]} { color: ${v}; }`);
    else if (t.path[1] === 'border') rules.push(`.vds-border-${t.path[2]} { border-color: ${v}; }`);
  }

  for (const role of SEMANTIC_ROLES) {
    const bgVar = `--vds-theme-${role}`;
    const fgVar = `--vds-theme-${role}-fg`;
    rules.push(`.vds-bg-${role} { background-color: var(${bgVar}); }`);
    if (!textSlotNames.has(role)) rules.push(`.vds-text-${role} { color: var(${bgVar}); }`);
    rules.push(`.vds-border-${role} { border-color: var(${bgVar}); }`);
    rules.push(`.vds-bg-${role}-fg { background-color: var(${fgVar}); }`);
    rules.push(`.vds-text-${role}-fg { color: var(${fgVar}); }`);
  }

  return rules;
}
