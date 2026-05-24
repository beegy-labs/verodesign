import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from '../build/loader.mjs';
import { resolveTokens } from '../build/resolver.mjs';
import { tokenPathToCssVar } from '../build/css-vars.mjs';
import { contrastRatio } from '../util/color.mjs';
import { getThemeImplements } from '../build/slot-groups.mjs';
import { emitOptionalGroupFallbacks } from '../build/optional-group-fallback.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

const CONTRAST_LEVELS = {
  AA: 4.5,
  'AA-large': 3,
  'AAA-strict': 7,
};

const BASE_PAIRS = [
  { foregroundToken: 'theme.text.primary', backgroundToken: 'theme.bg.page', required: 'AA', tier: 'body-text', group: 'core' },
  { foregroundToken: 'theme.text.primary', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'body-text', group: 'core' },
  { foregroundToken: 'theme.text.secondary', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'body-text', group: 'core' },
  { foregroundToken: 'theme.text.dim', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'body-text', group: 'core' },
  { foregroundToken: 'theme.text.faint', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'decorative-text', group: 'core', allow: 'AA-large' },
  { foregroundToken: 'theme.primary', backgroundToken: 'theme.bg.page', required: 'AA', tier: 'brand-primary', group: 'core' },
  { foregroundToken: 'theme.primary.foreground', backgroundToken: 'theme.primary', required: 'AA', tier: 'brand-primary', group: 'core' },
  { foregroundToken: 'theme.destructive.foreground', backgroundToken: 'theme.destructive', required: 'AA', tier: 'meaningful-surface', group: 'status' },
  { foregroundToken: 'theme.border.focus', backgroundToken: 'theme.bg.page', required: 'AA', tier: 'ui-component', group: 'core', minimumRatio: 3 }
];

const STATUS_PAIRS = [
  { foregroundToken: 'theme.status.success', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'meaningful-surface', group: 'status' },
  { foregroundToken: 'theme.status.error', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'meaningful-surface', group: 'status' },
  { foregroundToken: 'theme.status.warning', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'meaningful-surface', group: 'status' },
  { foregroundToken: 'theme.status.info', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'meaningful-surface', group: 'status' },
  { foregroundToken: 'theme.status.neutral', backgroundToken: 'theme.bg.card', required: 'AA', tier: 'meaningful-surface', group: 'status' }
];

const AAA_STRICT_PAIRS = [
  { foregroundToken: 'theme.text.primary-strong', backgroundToken: 'theme.bg.page', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict' },
  { foregroundToken: 'theme.primary-strong.foreground', backgroundToken: 'theme.primary-strong', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict' },
  { foregroundToken: 'theme.status.success-strong', backgroundToken: 'theme.bg.card', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict', requires: ['status'] },
  { foregroundToken: 'theme.status.error-strong', backgroundToken: 'theme.bg.card', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict', requires: ['status'] },
  { foregroundToken: 'theme.status.warning-strong', backgroundToken: 'theme.bg.card', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict', requires: ['status'] },
  { foregroundToken: 'theme.status.info-strong', backgroundToken: 'theme.bg.card', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict', requires: ['status'] },
  { foregroundToken: 'theme.status.neutral-strong', backgroundToken: 'theme.bg.card', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict', requires: ['status'] },
  { foregroundToken: 'theme.destructive-strong.foreground', backgroundToken: 'theme.destructive-strong', required: 'AAA-strict', tier: 'aaa-strict', group: 'aaa-strict', requires: ['status'] }
];

function findToken(flat, dotPath) {
  const segs = dotPath.split('.');
  return flat.find((t) => t.path.length === segs.length && t.path.every((p, i) => p === segs[i]));
}

function resolveCssVarAlias(value, varsByName, seen = new Set()) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^var\((--vds-[A-Za-z0-9-_]+)\)$/);
  if (!match) return value;

  const [, cssVar] = match;
  if (seen.has(cssVar)) return value;
  const next = varsByName.get(cssVar);
  if (next == null) return value;

  seen.add(cssVar);
  return resolveCssVarAlias(next, varsByName, seen);
}

function applyOptionalGroupFallbacks(flat, implementsList) {
  const varsByName = new Map(flat.map((token) => [tokenPathToCssVar(token.path), token.resolvedValue]));

  for (const { name, value } of emitOptionalGroupFallbacks(implementsList)) {
    varsByName.set(name, value);
  }

  return flat.map((token) => ({
    ...token,
    resolvedValue: resolveCssVarAlias(token.resolvedValue, varsByName),
  }));
}

function tokenIsAllowedDowngrade(token) {
  return token?.extensions?.verobee?.contrast?.allow;
}

function getPairsForImplements(implementsList) {
  const pairs = [...BASE_PAIRS];

  if (implementsList.includes('status')) pairs.push(...STATUS_PAIRS);
  if (implementsList.includes('aaa-strict')) {
    for (const pair of AAA_STRICT_PAIRS) {
      if (!pair.requires || pair.requires.every((group) => implementsList.includes(group))) {
        pairs.push(pair);
      }
    }
  }

  return pairs;
}

function getThreshold(pair, fgToken) {
  const declaredAllow = pair.allow;
  const tokenAllow = tokenIsAllowedDowngrade(fgToken);
  const allow = tokenAllow ?? declaredAllow;

  if (pair.required === 'AAA-strict') {
    return { threshold: CONTRAST_LEVELS['AAA-strict'], allow: null };
  }
  if (pair.minimumRatio) {
    return { threshold: pair.minimumRatio, allow };
  }
  if (allow === 'AA-large') {
    return { threshold: CONTRAST_LEVELS['AA-large'], allow };
  }

  return { threshold: CONTRAST_LEVELS[pair.required], allow };
}

export async function auditContrast(themes) {
  const report = {};
  let failures = 0;

  for (const theme of themes) {
    report[theme] = { light: {}, dark: {} };
    for (const mode of ['light', 'dark']) {
      const implementsList = await getThemeImplements(theme, mode);
      const tree = await buildThemeTokens(theme, mode);
      const pairs = getPairsForImplements(implementsList);
      const neededPaths = new Set(pairs.flatMap((pair) => [pair.foregroundToken, pair.backgroundToken]));
      const flat = resolveTokens(
        flattenTokens(tree).filter((token) => neededPaths.has(token.path.join('.'))),
        tree
      );
      const resolvedFlat = applyOptionalGroupFallbacks(flat, implementsList);

      for (const pair of pairs) {
        const foregroundToken = findToken(resolvedFlat, pair.foregroundToken);
        const backgroundToken = findToken(resolvedFlat, pair.backgroundToken);
        if (!foregroundToken || !backgroundToken) continue;

        const ratio = contrastRatio(foregroundToken.resolvedValue, backgroundToken.resolvedValue);
        const { threshold, allow } = getThreshold(pair, foregroundToken);
        const pass = ratio >= threshold;

        report[theme][mode][`${pair.foregroundToken} on ${pair.backgroundToken}`] = {
          ratio: Number(ratio.toFixed(2)),
          required: pair.required,
          pass,
          group: pair.group,
          tier: pair.tier,
          minimumRatio: threshold,
          allow,
        };

        if (!pass) {
          failures += 1;
          console.error(
            `✗ ${theme}/${mode}  ${pair.foregroundToken} on ${pair.backgroundToken}: ${ratio.toFixed(2)} (need ${threshold} for ${pair.required})`
          );
        }
      }
    }
  }

  await mkdir(join(DIST, 'data'), { recursive: true });
  await writeFile(join(DIST, 'data', 'contrast-report.json'), JSON.stringify(report, null, 2), 'utf8');
  return { failures };
}
