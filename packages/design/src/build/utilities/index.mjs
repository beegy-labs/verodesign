import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from '../loader.mjs';
import { generateColor } from './color.mjs';
import { generateSpacing } from './spacing.mjs';
import { generateTypography } from './typography.mjs';
import { generateLayout } from './layout.mjs';
import { generateSizing } from './sizing.mjs';
import { generateEffect } from './effect.mjs';
import { generateTransition } from './transition.mjs';
import { expandStateVariants } from './state-variants.mjs';
import { generateBreakpoints, wrapResponsive } from './responsive.mjs';

const DIST = new URL('../../../dist/', import.meta.url).pathname;

function wrapLayer(label, lines) {
  return [`/* @verobee/design — ${label} */`, '@layer vds-utilities {', ...lines.map((l) => '  ' + l), '}', ''].join('\n');
}

export async function emitUtilities() {
  const tree = await buildThemeTokens('default', 'light');
  const flat = flattenTokens(tree);

  const color = generateColor(flat);
  const spacing = generateSpacing(flat);
  const typography = generateTypography(flat);
  const layout = generateLayout();
  const sizing = generateSizing(flat);
  const effect = generateEffect(flat);
  const transition = generateTransition(flat);
  const breakpoints = generateBreakpoints(flat);

  const stateEligible = [
    ...color,
    ...effect.filter((r) => r.startsWith('.vds-opacity-') || r.startsWith('.vds-shadow-')),
    ...layout.filter((r) => r.startsWith('.vds-cursor-')),
  ];
  const stateRules = expandStateVariants(stateEligible);

  const baseAll = [...color, ...spacing, ...typography, ...layout, ...sizing, ...effect, ...transition];
  const responsiveBlocks = wrapResponsive(baseAll, breakpoints);

  await mkdir(join(DIST, 'utilities', 'by-category'), { recursive: true });

  await writeFile(join(DIST, 'utilities', 'by-category', 'color.css'), wrapLayer('utilities/color', color), 'utf8');
  await writeFile(join(DIST, 'utilities', 'by-category', 'spacing.css'), wrapLayer('utilities/spacing', spacing), 'utf8');
  await writeFile(join(DIST, 'utilities', 'by-category', 'typography.css'), wrapLayer('utilities/typography', typography), 'utf8');
  await writeFile(join(DIST, 'utilities', 'by-category', 'layout.css'), wrapLayer('utilities/layout', layout), 'utf8');
  await writeFile(join(DIST, 'utilities', 'by-category', 'sizing.css'), wrapLayer('utilities/sizing', sizing), 'utf8');
  await writeFile(join(DIST, 'utilities', 'by-category', 'effect.css'), wrapLayer('utilities/effect', effect), 'utf8');
  await writeFile(join(DIST, 'utilities', 'by-category', 'transition.css'), wrapLayer('utilities/transition', transition), 'utf8');

  const stateLines = ['/* @verobee/design — utilities/state-variants */', '@layer vds-utilities {', ...stateRules.map((l) => '  ' + l), '}', ''].join('\n');
  await writeFile(join(DIST, 'utilities', 'state-variants.css'), stateLines, 'utf8');

  const responsiveLines = ['/* @verobee/design — utilities/responsive */', '@layer vds-utilities {', ...responsiveBlocks.map((l) => '  ' + l), '}', ''].join('\n');
  await writeFile(join(DIST, 'utilities', 'responsive.css'), responsiveLines, 'utf8');

  const fullLines = [
    '/* @verobee/design — utilities/full.css (all categories + state + responsive) */',
    '@layer vds-utilities {',
    ...color.map((l) => '  ' + l),
    ...spacing.map((l) => '  ' + l),
    ...typography.map((l) => '  ' + l),
    ...layout.map((l) => '  ' + l),
    ...sizing.map((l) => '  ' + l),
    ...effect.map((l) => '  ' + l),
    ...transition.map((l) => '  ' + l),
    ...stateRules.map((l) => '  ' + l),
    ...responsiveBlocks.map((l) => '  ' + l),
    '}',
    '',
  ].join('\n');
  await writeFile(join(DIST, 'utilities', 'full.css'), fullLines, 'utf8');

  return {
    counts: {
      color: color.length,
      spacing: spacing.length,
      typography: typography.length,
      layout: layout.length,
      sizing: sizing.length,
      effect: effect.length,
      transition: transition.length,
      state: stateRules.length,
      responsive: responsiveBlocks.length,
    },
  };
}
