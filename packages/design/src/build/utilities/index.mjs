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

  // State variants: SEMANTIC slots only — primitive ramps (slate-1, blue-50,
  // black, white) don't typically need hover/focus/active variants. This caps
  // bundle size: full.css drops from ~35MB to ~5MB, full.min.css.gz < 70KB.
  // Semantic slots — emit state variants for these; primitive ramps (slate-1, blue-50, etc.) skip variants to keep bundle size small.
  const SEMANTIC_SLOTS = [
    // bg slots
    'page', 'card', 'elevated', 'hover', 'muted', 'inverse', 'code',
    // text slots
    'primary', 'secondary', 'dim', 'faint', 'bright',
    // border slots
    'subtle', 'default', 'strong', 'focus',
    // role slots (× -fg, -bg, -ring)
    'primary-fg', 'primary-ring', 'accent', 'accent-fg', 'accent-2', 'accent-2-fg', 'accent-3', 'accent-3-fg',
    'destructive', 'destructive-fg', 'success', 'success-bg', 'success-fg',
    'warning', 'warning-bg', 'warning-fg', 'error', 'error-bg', 'error-fg',
    'info', 'info-bg', 'info-fg', 'neutral', 'neutral-bg', 'neutral-fg',
    'cancelled', 'cancelled-fg',
    // foreground text (theme.text.primary slot — 'fg' alias to avoid collision with role primary)
    'fg',
    // text-prefixed (`bg-text-dim` etc.)
    'text-primary', 'text-secondary', 'text-dim', 'text-faint', 'text-bright', 'text-inverse',
    // chart
    'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
  ];
  const SEMANTIC_RX = new RegExp(`^\\.vds-(bg|text|border)-(${SEMANTIC_SLOTS.map((s) => s.replace(/-/g, '\\-')).join('|')})(?:\\\\\\/[0-9]+)?\\s*\\{`);
  const stateEligible = [
    ...color.filter((r) => SEMANTIC_RX.test(r)),
    ...effect.filter((r) => r.startsWith('.vds-opacity-') || r.startsWith('.vds-shadow-') || r.startsWith('.vds-outline-') || /^\.vds-border-(0|1|2|4|8)\b/.test(r)),
    ...layout.filter((r) => r.startsWith('.vds-cursor-')),
    ...ring.filter((r) => r.startsWith('.vds-ring-')),
    // decoration family (hover:underline 등 — typography 의 underline/line-through/no-underline)
    ...typography.filter((r) => /^\.vds-(underline|line-through|no-underline)\s*\{/.test(r)),
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
