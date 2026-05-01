const FIRST_CLASS_RX = /^\.vds-(\S+?)(?=\s|\{)/;

export function generateBreakpoints(flat) {
  const bps = [];
  for (const t of flat) {
    if (t.path[0] === 'breakpoint') {
      bps.push({ name: t.path[1], value: t.value });
    }
  }
  return bps;
}

export function wrapResponsive(rules, breakpoints) {
  const blocks = [];
  for (const bp of breakpoints) {
    blocks.push(`@media (min-width: ${bp.value}) {`);
    for (const rule of rules) {
      const transformed = rule.replace(FIRST_CLASS_RX, (_, body) => `.vds-${bp.name}\\:${body}`);
      blocks.push('  ' + transformed);
    }
    blocks.push('}');
  }
  return blocks;
}
