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
import { generateTransform } from './transform.mjs';
import { generateRing } from './ring.mjs';
import { generateDecoration } from './decoration.mjs';
import { generateBackdrop, generateAnimations, generateAnimationUtilities } from './backdrop.mjs';
import { expandStateVariants, expandGroupVariants } from './state-variants.mjs';
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
  const transform = generateTransform(flat);
  const ring = generateRing(flat);
  const decoration = generateDecoration(flat);
  const backdrop = generateBackdrop();
  const animUtils = generateAnimationUtilities();
  const breakpoints = generateBreakpoints(flat);

  const stateEligible = [
    ...color.filter((r) => /^\.vds-(bg|text|border)-[a-zA-Z0-9-]+(\\\/[0-9]+)?\s*\{/.test(r)),
    ...effect.filter((r) => r.startsWith('.vds-opacity-') || r.startsWith('.vds-shadow-')),
    ...layout.filter((r) => r.startsWith('.vds-cursor-')),
    ...ring.filter((r) => r.startsWith('.vds-ring-')),
  ];
  const stateRules = expandStateVariants(stateEligible);

  const groupEligible = color.filter((r) => /^\.vds-(bg|text|border)-[a-zA-Z0-9-]+(\\\/[0-9]+)?\s*\{/.test(r));
  const groupRules = expandGroupVariants(groupEligible);
  groupRules.unshift('.vds-group { /* parent marker for vds-group-hover/focus */ }');

  const baseAll = [
    ...color, ...spacing, ...typography, ...layout, ...sizing,
    ...effect, ...transition, ...transform, ...ring, ...decoration, ...backdrop,
  ];
  const responsiveBlocks = wrapResponsive(baseAll, breakpoints);

  await mkdir(join(DIST, 'utilities', 'by-category'), { recursive: true });

  const writes = [
    ['by-category/color.css', wrapLayer('utilities/color', color)],
    ['by-category/spacing.css', wrapLayer('utilities/spacing', spacing)],
    ['by-category/typography.css', wrapLayer('utilities/typography', typography)],
    ['by-category/layout.css', wrapLayer('utilities/layout', layout)],
    ['by-category/sizing.css', wrapLayer('utilities/sizing', sizing)],
    ['by-category/effect.css', wrapLayer('utilities/effect', effect)],
    ['by-category/transition.css', wrapLayer('utilities/transition', transition)],
    ['by-category/transform.css', wrapLayer('utilities/transform', transform)],
    ['by-category/ring.css', wrapLayer('utilities/ring', ring)],
    ['by-category/decoration.css', wrapLayer('utilities/decoration', decoration)],
    ['by-category/backdrop.css', wrapLayer('utilities/backdrop', backdrop)],
  ];
  for (const [path, content] of writes) {
    await writeFile(join(DIST, 'utilities', path), content, 'utf8');
  }

  const stateLines = ['/* @verobee/design — utilities/state-variants */', '@layer vds-utilities {', ...stateRules.map((l) => '  ' + l), '}', ''].join('\n');
  await writeFile(join(DIST, 'utilities', 'state-variants.css'), stateLines, 'utf8');

  const groupLines = ['/* @verobee/design — utilities/group-variants (consumer light DOM only) */', '@layer vds-utilities {', ...groupRules.map((l) => '  ' + l), '}', ''].join('\n');
  await writeFile(join(DIST, 'utilities', 'group-variants.css'), groupLines, 'utf8');

  const responsiveLines = ['/* @verobee/design — utilities/responsive */', '@layer vds-utilities {', ...responsiveBlocks.map((l) => '  ' + l), '}', ''].join('\n');
  await writeFile(join(DIST, 'utilities', 'responsive.css'), responsiveLines, 'utf8');

  const animKeyframes = generateAnimations();
  const animLines = [
    '/* @verobee/design — animations.css (opt-in primitives: spin/pulse/bounce) */',
    ...animKeyframes,
    '@layer vds-utilities {',
    ...animUtils.map((l) => '  ' + l),
    '  @media (prefers-reduced-motion: reduce) {',
    '    .vds-anim-spin, .vds-anim-pulse, .vds-anim-bounce { animation: none; }',
    '  }',
    '}',
    '',
  ].join('\n');
  await writeFile(join(DIST, 'animations.css'), animLines, 'utf8');

  const fullLines = [
    '/* @verobee/design — utilities/full.css (all categories + state + group + animations + responsive) */',
    ...animKeyframes,
    '@layer vds-utilities {',
    ...color.map((l) => '  ' + l),
    ...spacing.map((l) => '  ' + l),
    ...typography.map((l) => '  ' + l),
    ...layout.map((l) => '  ' + l),
    ...sizing.map((l) => '  ' + l),
    ...effect.map((l) => '  ' + l),
    ...transition.map((l) => '  ' + l),
    ...transform.map((l) => '  ' + l),
    ...ring.map((l) => '  ' + l),
    ...decoration.map((l) => '  ' + l),
    ...backdrop.map((l) => '  ' + l),
    ...animUtils.map((l) => '  ' + l),
    ...stateRules.map((l) => '  ' + l),
    ...groupRules.map((l) => '  ' + l),
    ...responsiveBlocks.map((l) => '  ' + l),
    '  @media (prefers-reduced-motion: reduce) {',
    '    .vds-anim-spin, .vds-anim-pulse, .vds-anim-bounce { animation: none; }',
    '  }',
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
      transform: transform.length,
      ring: ring.length,
      decoration: decoration.length,
      backdrop: backdrop.length,
      animation: animUtils.length,
      state: stateRules.length,
      group: groupRules.length,
      responsive: responsiveBlocks.length,
    },
  };
}
