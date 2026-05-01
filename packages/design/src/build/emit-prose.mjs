import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from './loader.mjs';
import { tokenPathToCssVar } from './css-vars.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

function v(path) {
  return `var(${tokenPathToCssVar(path)})`;
}

export async function emitProseCss() {
  const tree = await buildThemeTokens('default', 'light');
  const flat = flattenTokens(tree);

  const has = (target) => flat.some((t) => t.path.join('.') === target);
  const ensure = (target) => {
    if (!has(target)) throw new Error(`prose generator: missing token ${target}`);
  };

  ensure('font.size.base');
  ensure('font.lineHeight.relaxed');
  ensure('theme.text.primary');
  ensure('theme.bg.elevated');
  ensure('theme.border.default');
  ensure('spacing.4');
  ensure('radius.xs');
  ensure('radius.md');

  const lines = [
    '/* @verobee/design — prose.css */',
    '/* Long-form markdown styling. Wrap content in `.vds-prose`. Tokens drive everything; dark mode auto via [data-mode]. */',
    '',
    '@layer vds-prose {',
    `  .vds-prose { font-size: ${v(['font', 'size', 'base'])}; line-height: ${v(['font', 'lineHeight', 'relaxed'])}; color: ${v(['theme', 'text', 'primary'])}; max-width: 65ch; }`,
    '',
    '  /* Headings */',
    `  .vds-prose h1 { font-size: ${v(['font', 'size', '4xl'])}; font-weight: ${v(['font', 'weight', '700'])}; line-height: ${v(['font', 'lineHeight', 'tight'])}; letter-spacing: ${v(['font', 'letterSpacing', 'tight'])}; margin-top: ${v(['spacing', '8'])}; margin-bottom: ${v(['spacing', '4'])}; color: ${v(['theme', 'text', 'primary'])}; }`,
    `  .vds-prose h2 { font-size: ${v(['font', 'size', '3xl'])}; font-weight: ${v(['font', 'weight', '700'])}; line-height: ${v(['font', 'lineHeight', 'tight'])}; letter-spacing: ${v(['font', 'letterSpacing', 'snug'])}; margin-top: ${v(['spacing', '8'])}; margin-bottom: ${v(['spacing', '3'])}; color: ${v(['theme', 'text', 'primary'])}; padding-bottom: ${v(['spacing', '2'])}; border-bottom: 1px solid ${v(['theme', 'border', 'default'])}; }`,
    `  .vds-prose h3 { font-size: ${v(['font', 'size', '2xl'])}; font-weight: ${v(['font', 'weight', '600'])}; line-height: ${v(['font', 'lineHeight', 'snug'])}; margin-top: ${v(['spacing', '6'])}; margin-bottom: ${v(['spacing', '3'])}; color: ${v(['theme', 'text', 'primary'])}; }`,
    `  .vds-prose h4 { font-size: ${v(['font', 'size', 'xl'])}; font-weight: ${v(['font', 'weight', '600'])}; line-height: ${v(['font', 'lineHeight', 'snug'])}; margin-top: ${v(['spacing', '5'])}; margin-bottom: ${v(['spacing', '2'])}; color: ${v(['theme', 'text', 'primary'])}; }`,
    `  .vds-prose h5 { font-size: ${v(['font', 'size', 'lg'])}; font-weight: ${v(['font', 'weight', '600'])}; line-height: ${v(['font', 'lineHeight', 'normal'])}; margin-top: ${v(['spacing', '4'])}; margin-bottom: ${v(['spacing', '2'])}; color: ${v(['theme', 'text', 'primary'])}; }`,
    `  .vds-prose h6 { font-size: ${v(['font', 'size', 'base'])}; font-weight: ${v(['font', 'weight', '600'])}; line-height: ${v(['font', 'lineHeight', 'normal'])}; margin-top: ${v(['spacing', '4'])}; margin-bottom: ${v(['spacing', '2'])}; color: ${v(['theme', 'text', 'secondary'])}; text-transform: uppercase; letter-spacing: ${v(['font', 'letterSpacing', 'wider'])}; }`,
    '',
    '  /* Paragraph + inline */',
    `  .vds-prose p { margin-top: 0; margin-bottom: ${v(['spacing', '4'])}; }`,
    `  .vds-prose strong { font-weight: ${v(['font', 'weight', '600'])}; color: ${v(['theme', 'text', 'primary'])}; }`,
    `  .vds-prose em { font-style: italic; }`,
    `  .vds-prose a { color: ${v(['theme', 'primary'])}; text-decoration: underline; text-underline-offset: 0.2em; }`,
    `  .vds-prose a:hover { text-decoration-thickness: 2px; }`,
    '',
    '  /* Code */',
    `  .vds-prose code { font-family: ${v(['font', 'family', 'mono'])}; font-size: 0.9em; background-color: ${v(['theme', 'bg', 'elevated'])}; padding: 0.125em 0.375em; border-radius: ${v(['radius', 'xs'])}; color: ${v(['theme', 'text', 'primary'])}; }`,
    `  .vds-prose pre { font-family: ${v(['font', 'family', 'mono'])}; font-size: ${v(['font', 'size', 'sm'])}; background-color: ${v(['theme', 'bg', 'elevated'])}; padding: ${v(['spacing', '4'])}; border-radius: ${v(['radius', 'md'])}; overflow-x: auto; margin-top: ${v(['spacing', '4'])}; margin-bottom: ${v(['spacing', '4'])}; }`,
    `  .vds-prose pre code { background: transparent; padding: 0; font-size: inherit; }`,
    '',
    '  /* Lists */',
    `  .vds-prose ul, .vds-prose ol { margin-top: 0; margin-bottom: ${v(['spacing', '4'])}; padding-left: ${v(['spacing', '6'])}; }`,
    `  .vds-prose ul { list-style-type: disc; }`,
    `  .vds-prose ol { list-style-type: decimal; }`,
    `  .vds-prose li { margin-bottom: ${v(['spacing', '1'])}; }`,
    `  .vds-prose li > ul, .vds-prose li > ol { margin-top: ${v(['spacing', '1'])}; margin-bottom: ${v(['spacing', '1'])}; }`,
    '',
    '  /* Blockquote */',
    `  .vds-prose blockquote { margin: ${v(['spacing', '4'])} 0; padding-left: ${v(['spacing', '4'])}; border-left: 4px solid ${v(['theme', 'border', 'default'])}; color: ${v(['theme', 'text', 'secondary'])}; font-style: italic; }`,
    '',
    '  /* Tables */',
    `  .vds-prose table { width: 100%; border-collapse: collapse; margin-top: ${v(['spacing', '4'])}; margin-bottom: ${v(['spacing', '4'])}; font-size: ${v(['font', 'size', 'sm'])}; }`,
    `  .vds-prose thead { border-bottom: 2px solid ${v(['theme', 'border', 'default'])}; }`,
    `  .vds-prose th { text-align: left; font-weight: ${v(['font', 'weight', '600'])}; padding: ${v(['spacing', '2'])} ${v(['spacing', '3'])}; color: ${v(['theme', 'text', 'primary'])}; }`,
    `  .vds-prose td { padding: ${v(['spacing', '2'])} ${v(['spacing', '3'])}; border-bottom: 1px solid ${v(['theme', 'border', 'default'])}; }`,
    '',
    '  /* HR */',
    `  .vds-prose hr { border: 0; border-top: 1px solid ${v(['theme', 'border', 'default'])}; margin-top: ${v(['spacing', '8'])}; margin-bottom: ${v(['spacing', '8'])}; }`,
    '',
    '  /* Images */',
    `  .vds-prose img { max-width: 100%; height: auto; border-radius: ${v(['radius', 'md'])}; margin-top: ${v(['spacing', '4'])}; margin-bottom: ${v(['spacing', '4'])}; }`,
    '',
    '  /* kbd */',
    `  .vds-prose kbd { font-family: ${v(['font', 'family', 'mono'])}; font-size: 0.85em; background-color: ${v(['theme', 'bg', 'elevated'])}; border: 1px solid ${v(['theme', 'border', 'default'])}; border-bottom-width: 2px; border-radius: ${v(['radius', 'xs'])}; padding: 0.125em 0.375em; }`,
    '',
    '  /* First/last child reset */',
    `  .vds-prose > :first-child { margin-top: 0; }`,
    `  .vds-prose > :last-child { margin-bottom: 0; }`,
    '}',
    '',
  ];

  await mkdir(join(DIST, 'css'), { recursive: true });
  await writeFile(join(DIST, 'css', 'prose.css'), lines.join('\n'), 'utf8');

  return { count: lines.length };
}
