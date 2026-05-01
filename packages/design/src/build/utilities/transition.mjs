import { tokenPathToCssVar } from '../css-vars.mjs';

export function generateTransition(flat) {
  const rules = [];

  rules.push(
    `.vds-transition { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-duration: var(--vds-duration-medium); transition-timing-function: var(--vds-easing-ease-in-out); }`
  );
  rules.push(`.vds-transition-none { transition-property: none; }`);
  rules.push(
    `.vds-transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-duration: var(--vds-duration-medium); transition-timing-function: var(--vds-easing-ease-in-out); }`
  );
  rules.push(
    `.vds-transition-opacity { transition-property: opacity; transition-duration: var(--vds-duration-medium); transition-timing-function: var(--vds-easing-ease-in-out); }`
  );
  rules.push(
    `.vds-transition-shadow { transition-property: box-shadow; transition-duration: var(--vds-duration-medium); transition-timing-function: var(--vds-easing-ease-in-out); }`
  );
  rules.push(
    `.vds-transition-transform { transition-property: transform; transition-duration: var(--vds-duration-medium); transition-timing-function: var(--vds-easing-ease-in-out); }`
  );
  rules.push(
    `.vds-transition-all { transition-property: all; transition-duration: var(--vds-duration-medium); transition-timing-function: var(--vds-easing-ease-in-out); }`
  );

  for (const t of flat) {
    if (t.path[0] === 'duration') {
      rules.push(`.vds-duration-${t.path[1]} { transition-duration: var(${tokenPathToCssVar(t.path)}); }`);
    }
    if (t.path[0] === 'easing') {
      rules.push(`.vds-ease-${t.path[1]} { transition-timing-function: var(${tokenPathToCssVar(t.path)}); }`);
    }
  }

  // Tailwind-compat numeric durations (ms) — alias for migration. Token-driven
  // semantic (`vds-duration-medium` etc.) remains the recommended form.
  for (const ms of [75, 100, 150, 200, 300, 500, 700, 1000]) {
    rules.push(`.vds-duration-${ms} { transition-duration: ${ms}ms; }`);
  }

  // Tailwind-compat ease keywords (Tailwind v3 default cubic-bezier values)
  rules.push(`.vds-ease-linear { transition-timing-function: linear; }`);
  rules.push(`.vds-ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }`);
  rules.push(`.vds-ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }`);
  rules.push(`.vds-ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }`);

  // Delay (Tailwind-compat ms) — duration-* counterpart.
  for (const ms of [0, 75, 100, 150, 200, 300, 500, 700, 1000]) {
    rules.push(`.vds-delay-${ms} { transition-delay: ${ms}ms; }`);
  }

  return rules;
}
