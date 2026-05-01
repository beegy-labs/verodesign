import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildThemeTokens, flattenTokens } from './loader.mjs';
import { resolveTokens } from './resolver.mjs';
import { emitTokensBlock } from './css-vars.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

function isSemanticToken(token) {
  return token.path[0] === 'theme';
}

export async function emitThemeCss(theme) {
  const lightTree = await buildThemeTokens(theme, 'light');
  const darkTree = await buildThemeTokens(theme, 'dark');

  const lightFlat = resolveTokens(flattenTokens(lightTree), lightTree).filter(isSemanticToken);
  const darkFlat = resolveTokens(flattenTokens(darkTree), darkTree).filter(isSemanticToken);

  const lightBlock = emitTokensBlock(lightFlat).split('\n').map((l) => l && '  ' + l).filter(Boolean).join('\n');
  const darkBlock = emitTokensBlock(darkFlat).split('\n').map((l) => l && '  ' + l).filter(Boolean).join('\n');

  const isDefault = theme === 'default';
  const rootSelector = isDefault
    ? `:root,\n  [data-theme="${theme}"]:not([data-mode]),\n  [data-theme="${theme}"][data-mode="light"]`
    : `[data-theme="${theme}"]:not([data-mode]),\n  [data-theme="${theme}"][data-mode="light"]`;

  const css = [
    `/* @verobee/design — themes/${theme}.css */`,
    `/* Theme: ${theme}. Light + dark modes combined. Depends on core.css. */`,
    '',
    '@layer vds-tokens {',
    `  ${rootSelector} {`,
    lightBlock,
    '  }',
    '',
    `  [data-theme="${theme}"][data-mode="dark"] {`,
    darkBlock,
    '  }',
    '',
    '  @media (prefers-color-scheme: dark) {',
    `    [data-theme="${theme}"]:not([data-mode]) {`,
    darkBlock.split('\n').map((l) => l && '  ' + l).filter(Boolean).join('\n'),
    '    }',
    '  }',
    '}',
    '',
  ].join('\n');

  await mkdir(join(DIST, 'css', 'themes'), { recursive: true });
  await writeFile(join(DIST, 'css', 'themes', `${theme}.css`), css, 'utf8');
  return { theme, lightCount: lightFlat.length, darkCount: darkFlat.length };
}
