const BLUR_STEPS = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '24px',
  '2xl': '40px',
};

export function generateBackdrop() {
  const rules = [];

  for (const [name, val] of Object.entries(BLUR_STEPS)) {
    rules.push(`.vds-backdrop-blur-${name} { backdrop-filter: blur(${val}); -webkit-backdrop-filter: blur(${val}); }`);
    rules.push(`.vds-blur-${name} { filter: blur(${val}); }`);
  }

  rules.push(`.vds-backdrop-blur { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }`);
  rules.push(`.vds-blur { filter: blur(8px); }`);

  return rules;
}

export function generateAnimations() {
  const lines = [];
  lines.push('@keyframes vds-spin { to { transform: rotate(360deg); } }');
  lines.push('@keyframes vds-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }');
  lines.push('@keyframes vds-bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }');
  return lines;
}

export function generateAnimationUtilities() {
  return [
    `.vds-anim-spin { animation: vds-spin 1s linear infinite; }`,
    `.vds-anim-pulse { animation: vds-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }`,
    `.vds-anim-bounce { animation: vds-bounce 1s infinite; }`,
    `.vds-anim-none { animation: none; }`,
    // Tailwind-compat aliases (no opt-in import required — emitted into full.css)
    `.vds-animate-spin { animation: vds-spin 1s linear infinite; }`,
    `.vds-animate-pulse { animation: vds-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }`,
    `.vds-animate-bounce { animation: vds-bounce 1s infinite; }`,
    `.vds-animate-none { animation: none; }`,
  ];
}
