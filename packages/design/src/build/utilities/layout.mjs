export function generateLayout() {
  const rules = [];

  for (const d of ['block', 'inline-block', 'inline', 'inline-flex', 'flex', 'inline-grid', 'grid', 'contents', 'hidden']) {
    const value = d === 'hidden' ? 'none' : d;
    rules.push(`.vds-${d} { display: ${value}; }`);
  }

  for (const p of ['static', 'relative', 'absolute', 'fixed', 'sticky']) {
    rules.push(`.vds-${p} { position: ${p}; }`);
  }

  const flexDir = { row: 'row', 'row-reverse': 'row-reverse', col: 'column', 'col-reverse': 'column-reverse' };
  for (const [k, v] of Object.entries(flexDir)) rules.push(`.vds-flex-${k} { flex-direction: ${v}; }`);

  rules.push(`.vds-flex-wrap { flex-wrap: wrap; }`);
  rules.push(`.vds-flex-nowrap { flex-wrap: nowrap; }`);
  rules.push(`.vds-flex-wrap-reverse { flex-wrap: wrap-reverse; }`);

  rules.push(`.vds-flex-1 { flex: 1 1 0%; }`);
  rules.push(`.vds-flex-auto { flex: 1 1 auto; }`);
  rules.push(`.vds-flex-initial { flex: 0 1 auto; }`);
  rules.push(`.vds-flex-none { flex: none; }`);

  rules.push(`.vds-grow { flex-grow: 1; }`);
  rules.push(`.vds-grow-0 { flex-grow: 0; }`);
  rules.push(`.vds-shrink { flex-shrink: 1; }`);
  rules.push(`.vds-shrink-0 { flex-shrink: 0; }`);

  const align = ['start', 'center', 'end', 'baseline', 'stretch'];
  for (const a of align) rules.push(`.vds-items-${a} { align-items: ${a === 'start' || a === 'end' ? 'flex-' + a : a}; }`);
  for (const a of ['start', 'center', 'end', 'between', 'around', 'evenly']) {
    const v = a === 'between' ? 'space-between' : a === 'around' ? 'space-around' : a === 'evenly' ? 'space-evenly' : a === 'start' || a === 'end' ? 'flex-' + a : a;
    rules.push(`.vds-justify-${a} { justify-content: ${v}; }`);
  }
  for (const a of ['auto', 'start', 'center', 'end', 'stretch', 'baseline']) {
    const v = a === 'start' || a === 'end' ? 'flex-' + a : a;
    rules.push(`.vds-self-${a} { align-self: ${v}; }`);
  }
  for (const a of ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch']) {
    const v = a === 'between' ? 'space-between' : a === 'around' ? 'space-around' : a === 'evenly' ? 'space-evenly' : a === 'start' || a === 'end' ? 'flex-' + a : a;
    rules.push(`.vds-content-${a} { align-content: ${v}; }`);
  }

  for (let i = 1; i <= 12; i++) {
    rules.push(`.vds-grid-cols-${i} { grid-template-columns: repeat(${i}, minmax(0, 1fr)); }`);
    rules.push(`.vds-col-span-${i} { grid-column: span ${i} / span ${i}; }`);
  }
  rules.push(`.vds-grid-cols-none { grid-template-columns: none; }`);
  rules.push(`.vds-col-span-full { grid-column: 1 / -1; }`);
  rules.push(`.vds-col-auto { grid-column: auto; }`);

  for (let i = 1; i <= 6; i++) {
    rules.push(`.vds-grid-rows-${i} { grid-template-rows: repeat(${i}, minmax(0, 1fr)); }`);
    rules.push(`.vds-row-span-${i} { grid-row: span ${i} / span ${i}; }`);
  }
  rules.push(`.vds-grid-rows-none { grid-template-rows: none; }`);
  rules.push(`.vds-row-span-full { grid-row: 1 / -1; }`);

  rules.push(`.vds-grid-flow-row { grid-auto-flow: row; }`);
  rules.push(`.vds-grid-flow-col { grid-auto-flow: column; }`);
  rules.push(`.vds-grid-flow-dense { grid-auto-flow: dense; }`);

  for (const v of ['auto', 'hidden', 'visible', 'scroll']) {
    rules.push(`.vds-overflow-${v} { overflow: ${v}; }`);
    rules.push(`.vds-overflow-x-${v} { overflow-x: ${v}; }`);
    rules.push(`.vds-overflow-y-${v} { overflow-y: ${v}; }`);
  }

  for (const c of ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'progress', 'crosshair']) {
    rules.push(`.vds-cursor-${c} { cursor: ${c}; }`);
  }

  for (const v of ['auto', 'none', 'text', 'all']) {
    rules.push(`.vds-select-${v} { user-select: ${v}; }`);
  }

  for (const v of ['auto', 'none']) {
    rules.push(`.vds-pointer-events-${v} { pointer-events: ${v}; }`);
  }

  return rules;
}
