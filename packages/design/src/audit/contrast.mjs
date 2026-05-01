import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from '../build/loader.mjs';
import { resolveTokens } from '../build/resolver.mjs';
import { contrastRatio } from '../util/color.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

const PAIRS = [
  { fg: 'theme.text.primary', bg: 'theme.bg.page', required: 'AA' },
  { fg: 'theme.text.primary', bg: 'theme.bg.card', required: 'AA' },
  { fg: 'theme.text.secondary', bg: 'theme.bg.page', required: 'AA' },
  { fg: 'theme.text.dim', bg: 'theme.bg.page', required: 'AA' },
  { fg: 'theme.text.bright', bg: 'theme.bg.page', required: 'AAA' },
  { fg: 'theme.primary-fg', bg: 'theme.primary', required: 'AA' },
  { fg: 'theme.accent-fg', bg: 'theme.accent', required: 'AA' },
  { fg: 'theme.destructive-fg', bg: 'theme.destructive', required: 'AA' },
  { fg: 'theme.success-fg', bg: 'theme.success', required: 'AA' },
  { fg: 'theme.warning-fg', bg: 'theme.warning', required: 'AA' },
  { fg: 'theme.error-fg', bg: 'theme.error', required: 'AA' },
  { fg: 'theme.info-fg', bg: 'theme.info', required: 'AA' },
];

const REQUIRED_RATIO = { AAA: 7, AA: 4.5, 'AA-large': 3 };

function findToken(flat, dotPath) {
  const segs = dotPath.split('.');
  return flat.find((t) => t.path.length === segs.length && t.path.every((p, i) => p === segs[i]));
}

function tokenIsAllowedDowngrade(t) {
  return t?.extensions?.verobee?.contrast?.allow;
}

export async function auditContrast(themes) {
  const report = {};
  let failures = 0;

  for (const theme of themes) {
    report[theme] = { light: {}, dark: {} };
    for (const mode of ['light', 'dark']) {
      const tree = await buildThemeTokens(theme, mode);
      const flat = resolveTokens(flattenTokens(tree), tree);

      for (const pair of PAIRS) {
        const fgT = findToken(flat, pair.fg);
        const bgT = findToken(flat, pair.bg);
        if (!fgT || !bgT) continue;

        const ratio = contrastRatio(fgT.resolvedValue, bgT.resolvedValue);
        const downgrade = tokenIsAllowedDowngrade(fgT);
        const required = downgrade || pair.required;
        const need = REQUIRED_RATIO[required];
        const pass = ratio >= need;

        report[theme][mode][`${pair.fg} on ${pair.bg}`] = {
          ratio: Number(ratio.toFixed(2)),
          required,
          pass,
        };

        if (!pass) {
          failures += 1;
          console.error(`✗ ${theme}/${mode}  ${pair.fg} on ${pair.bg}: ${ratio.toFixed(2)} (need ${need} for ${required})`);
        }
      }
    }
  }

  await mkdir(join(DIST, 'data'), { recursive: true });
  await writeFile(join(DIST, 'data', 'contrast-report.json'), JSON.stringify(report, null, 2), 'utf8');
  return { failures };
}
