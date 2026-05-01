import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadPrimitives, loadSemantic, deepMerge, flattenTokens } from './loader.mjs';
import { resolveTokens } from './resolver.mjs';
import { emitTokensBlock } from './css-vars.mjs';

const DIST = new URL('../../dist/', import.meta.url).pathname;

export async function emitCoreCss() {
  const primitives = await loadPrimitives();
  const semantic = await loadSemantic();

  let tree = {};
  for (const { json } of primitives) tree = deepMerge(tree, json);
  for (const { json } of semantic) tree = deepMerge(tree, json);

  const flat = flattenTokens(tree);
  const resolved = resolveTokens(flat, tree);

  const isPrimitive = (t) => !t.path[0].startsWith('theme') && t.path[0] !== 'breakpoint' && t.path[0] !== 'zindex';
  const isWeb = (t) => t.path[0] === 'breakpoint' || t.path[0] === 'zindex';
  const isSemantic = (t) => t.path[0] === 'theme';

  const primitiveTokens = resolved.filter(isPrimitive);
  const webTokens = resolved.filter(isWeb);
  const semanticTokens = resolved.filter(isSemantic);

  const css = [
    '/* @verobee/design — core.css */',
    '/* Primitives + semantic schema (default light bindings). Override with themes/{theme}.css. */',
    '',
    '@layer vds-tokens {',
    '  :root {',
    '    /* primitives */',
    emitTokensBlock(primitiveTokens).split('\n').map((l) => l && '  ' + l).filter(Boolean).join('\n'),
    '',
    '    /* web slot group (constants) */',
    emitTokensBlock(webTokens).split('\n').map((l) => l && '  ' + l).filter(Boolean).join('\n'),
    '',
    '    /* semantic schema (default light) */',
    emitTokensBlock(semanticTokens).split('\n').map((l) => l && '  ' + l).filter(Boolean).join('\n'),
    '  }',
    '}',
    '',
  ].join('\n');

  await mkdir(join(DIST, 'css'), { recursive: true });
  await writeFile(join(DIST, 'css', 'core.css'), css, 'utf8');
  return { count: resolved.length };
}
