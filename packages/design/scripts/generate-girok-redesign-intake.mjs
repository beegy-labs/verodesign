import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { converter, formatHex, parse } from 'culori';
import wcagContrast from 'wcag-contrast';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const sourceDir = '/Users/vero/workspace/beegy/app-girok/.specs/app-girok/redesign';
const specDir = path.join(repoRoot, '.specs/verodesign/2026-05-21-pattern-girok-redesign');
const sectionsDir = path.join(specDir, 'sections');
const tokenFile = path.join(repoRoot, 'packages/design/tokens/experimental/girok-redesign.json');
const catalogFile = path.join(repoRoot, 'docs/llm/research/pattern-catalog.md');
const specFile = path.join(specDir, 'spec.md');
const auditFile = path.join(specDir, 'audit.md');

const toOklch = converter('oklch');
const toRgb = converter('rgb');

const TAILWIND = {
  'amber-400': '#fbbf24',
  'amber-500': '#f59e0b',
  'blue-400': '#60a5fa',
  'emerald-400': '#34d399',
  'emerald-500': '#10b981',
  'indigo-400': '#818cf8',
  'indigo-500': '#6366f1',
  'purple-400': '#c084fc',
  'rose-400': '#fb7185',
  'rose-500': '#f43f5e',
  'white': '#ffffff',
  'black': '#000000',
  'zinc-100': '#f4f4f5',
  'zinc-200': '#e4e4e7',
  'zinc-300': '#d4d4d8',
  'zinc-400': '#a1a1aa',
  'zinc-500': '#71717a',
  'zinc-600': '#52525b',
  'zinc-700': '#3f3f46',
  'zinc-800': '#27272a',
  'zinc-900': '#18181b',
  'zinc-950': '#09090b',
};

const existingSlots = [
  'exp.girok.surface.hero.start',
  'exp.girok.surface.hero.end',
  'exp.girok.surface.hero.border',
  'exp.girok.bg.segmented-active',
  'exp.girok.market.up',
  'exp.girok.market.down',
  'exp.girok.finance.up',
  'exp.girok.finance.down',
  'exp.girok.finance.flat',
  'exp.girok.progress.goal-fill-start',
  'exp.girok.progress.goal-fill-end',
  'exp.girok.icon-tile.info',
  'exp.girok.icon-tile.success',
  'exp.girok.icon-tile.warning',
  'exp.girok.icon-tile.danger',
];

const semanticGapMap = new Map([
  ['#0e0d0a', { token: 'exp.girok-redesign.shell.frame-surface', desc: 'Primary girok device frame and root shell surface.' }],
  ['#0d0c0a', { token: 'exp.girok-redesign.shell.content-surface', desc: 'Main scroll content surface behind tab content.' }],
  ['#1c1a14', { token: 'exp.girok-redesign.surface.card', desc: 'Default redesign card and modal surface.' }],
  ['#1a1813', { token: 'exp.girok-redesign.surface.toolbar', desc: 'Toolbar and compact control rail surface.' }],
  ['#14120e', { token: 'exp.girok-redesign.surface.card-subtle', desc: 'Subtle inner card surface used in stats and list rows.' }],
  ['#232018', { token: 'exp.girok-redesign.border.card-subtle', desc: 'Subtle low-emphasis card border.' }],
  ['#2b271e', { token: 'exp.girok-redesign.border.control', desc: 'Default control border for dark girok redesign surfaces.' }],
  ['#3a3326', { token: 'exp.girok-redesign.border.modal-strong', desc: 'Higher-emphasis modal and sheet border.' }],
  ['#483e2c', { token: 'exp.girok-redesign.border.active', desc: 'Active chip, pill, and selected control border.' }],
  ['#fbbf24', { token: 'exp.girok-redesign.nav.tab-active', desc: 'Active 1-depth tab and key accent text tone.' }],
  ['#f59e0b', { token: 'exp.girok-redesign.nav.bottom-active', desc: 'Bottom navigation active icon and label tone.' }],
  ['#71717a', { token: 'exp.girok-redesign.nav.bottom-inactive', valueHex: '#a1a1aa', desc: 'Bottom navigation inactive tone, lifted from source zinc-500 to zinc-400 for AA on shell surface.' }],
  ['#10b981', { token: 'exp.girok-redesign.stats.income-text', desc: 'Income and savings-positive text tone in redesign cards.' }],
  ['#fb7185', { token: 'exp.girok-redesign.stats.expense-text', desc: 'Expense and negative outflow text tone in redesign cards.' }],
  ['#34d399', { token: 'exp.girok-redesign.chart.top-rank-fill', desc: 'Positive chart fill used for highlighted savings and rank emphasis.' }],
  ['#f43f5e', { token: 'exp.girok-redesign.toggle.expense-active', desc: 'Expense-side active pill tone for transaction toggles.' }],
  ['#60a5fa', { token: 'exp.girok-redesign.calendar.weekend-sat', desc: 'Saturday calendar label tone in ledger calendar.' }],
  ['#6366f1', { token: 'exp.girok-redesign.icon.info-strong', valueHex: '#818cf8', desc: 'Indigo info icon emphasis, lifted to the lighter indigo-400 step for AA on dark card surfaces.' }],
  ['#818cf8', { token: 'exp.girok-redesign.chart.rank-4-fill', desc: 'Fourth-rank progress fill accent in analysis charts.' }],
  ['#c084fc', { token: 'exp.girok-redesign.chart.rank-5-fill', desc: 'Fifth-rank progress fill accent in analysis charts.' }],
]);

const contrastPairs = [
  ['nav.tab-active', '#fbbf24', '#0e0d0a', 'AA 4.5:1'],
  ['nav.bottom-active', '#f59e0b', '#0e0d0a', 'AA 4.5:1'],
  ['nav.bottom-inactive', '#a1a1aa', '#0e0d0a', 'AA 4.5:1'],
  ['stats.income-text', '#10b981', '#14120e', 'AA 4.5:1'],
  ['stats.expense-text', '#fb7185', '#14120e', 'AA 4.5:1'],
  ['surface.card-subtle text', '#f4f4f5', '#14120e', 'AA 4.5:1'],
  ['calendar.weekend-sat', '#60a5fa', '#0d0c0a', 'AA 4.5:1'],
  ['toggle.active-foreground on expense', '#0e0d0a', '#f43f5e', 'AA 4.5:1'],
  ['toggle.active-foreground on income', '#0e0d0a', '#10b981', 'AA 4.5:1'],
  ['icon.info-strong', '#818cf8', '#1c1a14', 'AA 4.5:1'],
];

function round(n, digits = 4) {
  return Number(n.toFixed(digits));
}

function hexToOklchString(hex) {
  const parsed = toOklch(hex);
  if (!parsed) return '';
  const parts = [
    `${round(parsed.l * 100, 2)}%`,
    `${round(parsed.c, 4)}`,
    `${round(parsed.h ?? 0, 2)}`,
  ];
  if (parsed.alpha != null && parsed.alpha !== 1) parts.push(`/ ${round(parsed.alpha, 3)}`);
  return `oklch(${parts.join(' ')})`;
}

function hexToRgbString(hex) {
  const rgb = toRgb(hex);
  if (!rgb) return '';
  const r = Math.round(rgb.r * 255);
  const g = Math.round(rgb.g * 255);
  const b = Math.round(rgb.b * 255);
  if (rgb.alpha != null && rgb.alpha !== 1) return `rgba(${r}, ${g}, ${b}, ${round(rgb.alpha, 3)})`;
  return `rgb(${r}, ${g}, ${b})`;
}

function normalizeHex(input) {
  const c = parse(input);
  if (!c) return null;
  return formatHex(c).toLowerCase();
}

function parseArbitraryColor(value) {
  const inner = value.match(/\[([^\]]+)\]/)?.[1];
  if (!inner) return null;
  if (inner.startsWith('#')) return normalizeHex(inner);
  if (inner.startsWith('rgba(') || inner.startsWith('rgb(') || inner.startsWith('oklch(')) return normalizeHex(inner);
  return null;
}

function getColorHex(raw) {
  let base = raw;
  if (raw.includes('/')) base = raw.split('/')[0];
  base = base.replace(/^(bg|text|border|from|to|via|ring)-/, '');
  if (base.startsWith('[')) return parseArbitraryColor(raw);
  return TAILWIND[base] ?? null;
}

function getExistingReuse(hex) {
  const exact = {
    '#2e281c': 'exp.girok.bg.segmented-active',
  };
  if (exact[hex]) return exact[hex];
  if (hex === '#f59e0b') return 'exp.girok.progress.goal-fill-start (approx only)';
  if (hex === '#34d399') return 'exp.girok.progress.goal-fill-end (approx only)';
  if (hex === '#6366f1') return 'exp.girok.icon-tile.info (surface-only, not fg)';
  return 'none';
}

function classifyToken(raw) {
  if (/^(bg|text|border|from|to|via|ring)-/.test(raw)) return 'color';
  if (/^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y)-/.test(raw)) return 'spacing';
  if (/^rounded/.test(raw)) return 'radius';
  if (/^shadow/.test(raw)) return 'shadow';
  return null;
}

function extractTokens(content) {
  const matches = content.match(/[A-Za-z0-9_:\-[\]#.%/(),]+/g) ?? [];
  const out = { color: new Set(), spacing: new Set(), radius: new Set(), shadow: new Set() };
  for (const token of matches) {
    const kind = classifyToken(token);
    if (!kind) continue;
    out[kind].add(token);
  }
  return out;
}

function buildColorRows(colorTokens) {
  return [...colorTokens].sort().map((raw) => {
    const hex = getColorHex(raw);
    const gap = hex ? semanticGapMap.get(hex)?.token ?? 'none' : 'none';
    return {
      raw,
      hex: hex ?? 'n/a',
      rgb: hex ? hexToRgbString(hex) : 'n/a',
      oklch: hex ? hexToOklchString(hex) : 'n/a',
      reuse: hex ? getExistingReuse(hex) : 'none',
      gap,
    };
  });
}

function formatSectionMd(name, inventory, colorRows) {
  const lines = [];
  lines.push(`# ${name} token inventory`);
  lines.push('');
  lines.push('| Metric | Count |');
  lines.push('| ------ | ----- |');
  lines.push(`| Unique colors | ${inventory.color.size} |`);
  lines.push(`| Unique spacing | ${inventory.spacing.size} |`);
  lines.push(`| Unique radius | ${inventory.radius.size} |`);
  lines.push(`| Unique shadow | ${inventory.shadow.size} |`);
  lines.push('');
  lines.push('## Colors');
  lines.push('');
  lines.push('| Used Tailwind | Hex/RGB | OKLCH | 기존 slot? | gap? |');
  lines.push('| ------------- | ------- | ----- | ---------- | ---- |');
  for (const row of colorRows) {
    lines.push(`| ${row.raw} | ${row.hex}<br>${row.rgb} | ${row.oklch} | ${row.reuse} | ${row.gap} |`);
  }
  lines.push('');
  lines.push('## Spacing');
  lines.push('');
  lines.push([...inventory.spacing].sort().map((v) => `- \`${v}\``).join('\n') || '- none');
  lines.push('');
  lines.push('## Radius');
  lines.push('');
  lines.push([...inventory.radius].sort().map((v) => `- \`${v}\``).join('\n') || '- none');
  lines.push('');
  lines.push('## Shadow');
  lines.push('');
  lines.push([...inventory.shadow].sort().map((v) => `- \`${v}\``).join('\n') || '- none');
  lines.push('');
  return lines.join('\n');
}

function buildExperimentalTokens() {
  const groups = {};
  for (const [hex, meta] of semanticGapMap.entries()) {
    const parts = meta.token.replace('exp.girok-redesign.', '').split('.');
    let cursor = groups;
    for (let i = 0; i < parts.length - 1; i += 1) {
      cursor[parts[i]] ??= {};
      cursor = cursor[parts[i]];
    }
    const valueHex = meta.valueHex ?? hex;
    cursor[parts.at(-1)] = {
      $value: hexToOklchString(valueHex),
      $type: 'color',
      $description: meta.desc,
    };
  }
  groups.toggle.incomeActive = {
    $value: hexToOklchString('#10b981'),
    $type: 'color',
    $description: 'Income-side active pill tone for transaction and savings toggles.',
  };
  groups.nav.tabUnderlineGlow = {
    $value: '0 -2px 8px 0 oklch(83.69% 0.1644 84.43 / 0.5)',
    $type: 'shadow',
    $description: 'Underline glow for active first-depth tab emphasis.',
  };
  groups.toggle.activeForeground = {
    $value: hexToOklchString('#0e0d0a'),
    $type: 'color',
    $description: 'High-contrast foreground for active income and expense toggle pills.',
  };
  return {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    $extensions: {
      verobee: {
        status: 'experimental',
        since: 'TBD',
        source: '/Users/vero/workspace/beegy/redesing.txt + .specs/verodesign/2026-05-21-pattern-girok-redesign/sections/*.tsx',
        implements: ['girok-app-shell'],
        brand: 'girok',
      },
    },
    exp: {
      'girok-redesign': groups,
    },
  };
}

function flattenTokenNames(tree, prefix = []) {
  const out = [];
  for (const [key, value] of Object.entries(tree)) {
    if (key.startsWith('$')) continue;
    if (value && typeof value === 'object' && '$value' in value) {
      out.push(`exp.girok-redesign.${[...prefix, key].join('.')}`);
    } else {
      out.push(...flattenTokenNames(value, [...prefix, key]));
    }
  }
  return out;
}

function buildAuditMd(sectionSummaries, tokenNames, contrastRows) {
  const lines = [];
  lines.push('# girok-redesign audit');
  lines.push('');
  lines.push('[knowledge-gap-check] Read llm-knowledge-gaps.md. Topics in scope: W3C DTCG, Style Dictionary 4.x, CSS color spaces, WCAG 2.2. Web search required: no.');
  lines.push('');
  lines.push('## Section summary');
  lines.push('');
  lines.push('| Section | Colors | Spacing | Radius | Shadow | Reuse | Gap |');
  lines.push('| ------- | ------ | ------- | ------ | ------ | ----- | --- |');
  for (const s of sectionSummaries) {
    lines.push(`| ${s.name} | ${s.colors} | ${s.spacing} | ${s.radius} | ${s.shadow} | ${s.reuse} | ${s.gap} |`);
  }
  lines.push('');
  lines.push('## New slots');
  lines.push('');
  for (const name of tokenNames) lines.push(`- \`${name}\``);
  lines.push('');
  lines.push('## Contrast');
  lines.push('');
  lines.push('| Pair | Ratio | Required | Pass |');
  lines.push('| ---- | ----- | -------- | ---- |');
  for (const row of contrastRows) lines.push(`| ${row.pair} | ${row.ratio}:1 | ${row.required} | ${row.pass ? 'Yes' : 'No'} |`);
  lines.push('');
  lines.push('## Reuse reference');
  lines.push('');
  for (const slot of existingSlots) lines.push(`- \`${slot}\``);
  lines.push('');
  return lines.join('\n');
}

async function buildReport() {
  const sourceFiles = (await readdir(sourceDir)).filter((name) => name.endsWith('.tsx')).sort();
  const sections = {};
  const sectionSummaries = [];
  for (const file of sourceFiles) {
    const content = await readFile(path.join(sourceDir, file), 'utf8');
    const inventory = extractTokens(content);
    const colorRows = buildColorRows(inventory.color);
    sections[file] = {
      markdown: `${formatSectionMd(file, inventory, colorRows)}\n`,
      summary: {
        name: file,
        colors: inventory.color.size,
        spacing: inventory.spacing.size,
        radius: inventory.radius.size,
        shadow: inventory.shadow.size,
        reuse: colorRows.filter((row) => row.reuse !== 'none').length,
        gap: colorRows.filter((row) => row.gap !== 'none').length,
      },
    };
    sectionSummaries.push(sections[file].summary);
  }

  const experimental = buildExperimentalTokens();
  const tokenNames = flattenTokenNames(experimental.exp['girok-redesign']);
  const contrastRows = contrastPairs.map(([pair, fg, bg, required]) => {
    const ratio = round(wcagContrast.hex(fg, bg), 2);
    return {
      pair,
      ratio,
      required,
      pass: ratio >= 4.5,
    };
  });

  const baseSpec = await readFile(specFile, 'utf8');
  const specCompletion = [
    '## 완료 결과',
    '',
    '[knowledge-gap-check] Read llm-knowledge-gaps.md. Topics in scope: W3C DTCG, Style Dictionary 4.x, CSS color spaces, WCAG 2.2. Web search required: no.',
    '',
    '### 복사 범위',
    '',
    `- copied section files: ${sectionSummaries.length}`,
    `- source dir: \`${sourceDir}\``,
    `- target dir: \`${sectionsDir}\``,
    '',
    '### 새 experimental slots',
    '',
    ...tokenNames.map((name) => `- \`${name}\``),
    '',
    '### Contrast',
    '',
    '| Pair | Ratio | Required | Pass |',
    '| ---- | ----- | -------- | ---- |',
    ...contrastRows.map((row) => `| ${row.pair} | ${row.ratio}:1 | ${row.required} | ${row.pass ? 'Yes' : 'No'} |`),
    '',
  ].join('\n');

  return {
    sourceFiles,
    sections,
    tokenJson: `${JSON.stringify(experimental, null, 2)}\n`,
    tokenNames,
    contrastRows,
    auditMd: `${buildAuditMd(sectionSummaries, tokenNames, contrastRows)}\n`,
    catalogRow: '| girok-redesign | experimental | internal:redesing.txt | 2026-05-21 | girok app shell + 5 tabs + 4 modals 종합 시안 |',
    specWithCompletion: baseSpec.includes('## 완료 결과') ? baseSpec : `${baseSpec.trimEnd()}\n\n${specCompletion}\n`,
    sectionSummaries,
  };
}

async function main() {
  const report = await buildReport();
  const cmd = process.argv[2] ?? 'report';
  if (cmd === 'report') {
    process.stdout.write(`${JSON.stringify({
      copied: report.sourceFiles,
      sectionSummaries: report.sectionSummaries,
      tokenNames: report.tokenNames,
      contrastRows: report.contrastRows,
    }, null, 2)}\n`);
    return;
  }
  if (cmd === 'section-md') {
    process.stdout.write(report.sections[process.argv[3]].markdown);
    return;
  }
  if (cmd === 'token-json') {
    process.stdout.write(report.tokenJson);
    return;
  }
  if (cmd === 'audit-md') {
    process.stdout.write(report.auditMd);
    return;
  }
  if (cmd === 'spec-md') {
    process.stdout.write(report.specWithCompletion);
    return;
  }
  if (cmd === 'catalog-row') {
    process.stdout.write(`${report.catalogRow}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
