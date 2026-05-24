import { tokenPathToCssVar } from '../css-vars.mjs';

const RING_WIDTHS = [0, 1, 2, 4, 8];

export function generateRing(flat) {
  const rules = [];

  rules.push(`:root { --vds-ring-offset-width: 0px; --vds-ring-offset-color: transparent; --vds-ring-color: var(--vds-theme-border-focus); --vds-ring-inset: ; }`);

  for (const w of RING_WIDTHS) {
    rules.push(`.vds-ring-${w} { box-shadow: var(--vds-ring-inset, ) 0 0 0 calc(${w}px + var(--vds-ring-offset-width, 0px)) var(--vds-ring-color, var(--vds-theme-border-focus)); }`);
  }

  for (const w of [0, 1, 2, 4, 8]) {
    rules.push(`.vds-ring-offset-${w} { --vds-ring-offset-width: ${w}px; box-shadow: 0 0 0 var(--vds-ring-offset-width) var(--vds-ring-offset-color, var(--vds-theme-bg-page)), 0 0 0 calc(var(--vds-ring-offset-width) + var(--vds-ring-width, 2px)) var(--vds-ring-color, var(--vds-theme-border-focus)); }`);
  }

  rules.push(`.vds-ring-inset { --vds-ring-inset: inset; }`);

  // Opacity steps (mirror color.mjs convention)
  const OPACITY_STEPS = [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95];

  function emitRingSlot(slot, path) {
    const cssVar = tokenPathToCssVar(path);
    rules.push(`.vds-ring-${slot} { --vds-ring-color: var(${cssVar}); }`);
    rules.push(`.vds-ring-offset-${slot} { --vds-ring-offset-color: var(${cssVar}); }`);
    for (const step of OPACITY_STEPS) {
      rules.push(`.vds-ring-${slot}\\/${step} { --vds-ring-color: color-mix(in oklab, var(${cssVar}) ${step}%, transparent); }`);
    }
    rules.push(`.vds-ring-${slot}\\/100 { --vds-ring-color: var(${cssVar}); }`);
  }

  for (const t of flat) {
    if (t.path[0] !== 'theme') continue;
    if (t.path.length === 2) {
      emitRingSlot(t.path[1], t.path);
    }
    if (t.path[1] === 'bg' && t.path.length === 3) {
      const slot = t.path[2];
      rules.push(`.vds-ring-offset-${slot} { --vds-ring-offset-color: var(${tokenPathToCssVar(t.path)}); }`);
    }
    if (t.path[1] === 'status' && t.path.length === 3) {
      emitRingSlot(t.path[2], t.path);
    }
    if (t.path[1] === 'status' && t.path.length === 4 && t.path[3] === 'foreground') {
      emitRingSlot(`${t.path[2]}-foreground`, t.path);
    }
    if ((t.path[1] === 'primary' || t.path[1] === 'accent' || t.path[1] === 'accent-2' || t.path[1] === 'accent-3' || t.path[1] === 'destructive' || t.path[1] === 'cancelled') && t.path.length === 3 && t.path[2] === 'foreground') {
      emitRingSlot(`${t.path[1]}-foreground`, t.path);
    }
  }

  return rules;
}
