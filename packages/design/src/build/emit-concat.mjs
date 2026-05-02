import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../../dist/', import.meta.url).pathname;

// Concatenate the canonical production bundle. Order matters:
//   1. tokens.property.css   (top-level @property registrations — must load first)
//   2. reset.css             (@layer reset)
//   3. core.css              (@layer base + @layer vds-tokens primitives)
//   4. themes/{theme}.css    (@layer vds-tokens — bundle-theme override)
//   5. utilities/full.css    (@layer vds-utilities)
//
// Per docs/llm/build/optimization.md § Technique 8. HTTP/3 multiplexing
// reduces per-stream cost but the "3 Cs" (concatenate-compress-cache) rule
// still favors larger Brotli inputs (~16% better ratio on dictionary
// efficiency for utility CSS).
export async function emitConcat({ theme = 'default' } = {}) {
  const parts = [
    'css/tokens.property.css',
    'css/reset.css',
    'css/core.css',
    `css/themes/${theme}.css`,
    'utilities/full.css',
  ];
  const sections = [];
  for (const rel of parts) {
    const buf = await readFile(join(DIST, rel), 'utf8');
    sections.push(`/* === ${rel} === */`);
    sections.push(buf);
  }

  const header = [
    '/* @verobee/design — verodesign.full.css */',
    '/* Concatenated production bundle. Theme: ' + theme + '. */',
    '/* Architecture: docs/llm/build/optimization.md § Technique 8. */',
    '',
  ].join('\n');

  const out = header + sections.join('\n') + '\n';
  await writeFile(join(DIST, 'verodesign.full.css'), out, 'utf8');
  return { theme, bytes: Buffer.byteLength(out) };
}
