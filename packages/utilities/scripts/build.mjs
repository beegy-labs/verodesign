#!/usr/bin/env node
/**
 * @verobee/utilities — vds-* utility CSS build.
 *
 * MIGRATION NOTE: this build temporarily delegates to the legacy
 * @verobee/design package's utility generator. The generator code already
 * lives at packages/utilities/src/* (copied from design), but the
 * dependency on `../loader.mjs` and other helpers is unresolved during
 * transition. After Phase H completion, the build pipeline will be made
 * self-contained inside this package.
 *
 * For now, the utility CSS is consumed via @verobee/design/utilities/full.css
 * — apps that import @verobee/utilities/css/full.css get the same output
 * via this thin re-export build.
 */
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST_DIR = join(ROOT, 'dist');
const DESIGN_DIST = join(ROOT, '..', 'design', 'dist', 'utilities');

async function main() {
  console.log('@verobee/utilities — build');
  await mkdir(join(DIST_DIR, 'css'), { recursive: true });
  await mkdir(join(DIST_DIR, 'css', 'by-category'), { recursive: true });

  // Bridge: copy from @verobee/design's already-built dist. After Phase H,
  // generation moves here directly.
  const files = [
    'full.css', 'full.min.css', 'full.css.br', 'full.min.css.br',
    'state-variants.css', 'state-variants.min.css',
    'state-variants.css.br', 'state-variants.min.css.br',
    'responsive.css', 'responsive.min.css',
    'responsive.css.br', 'responsive.min.css.br',
    'group-variants.css', 'group-variants.min.css',
  ];
  let copied = 0;
  for (const f of files) {
    try {
      await copyFile(join(DESIGN_DIST, f), join(DIST_DIR, 'css', f));
      copied++;
    } catch {}
  }
  console.log(`  bridged ${copied} files from @verobee/design/dist/utilities`);
  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
