#!/usr/bin/env node
/**
 * @verobee/codemods build — no compile step needed (transforms ship as
 * .mjs source). This script just validates that each transform exports
 * a `transform` function.
 */
import { readdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const TRANSFORMS = join(ROOT, 'transforms');

async function main() {
  console.log('@verobee/codemods — build');
  let count = 0;
  for (const name of await readdir(TRANSFORMS)) {
    const full = join(TRANSFORMS, name);
    if (!(await stat(full)).isDirectory()) continue;
    const entry = join(full, 'index.mjs');
    const mod = await import(pathToFileURL(entry).href);
    if (typeof mod.transform !== 'function') {
      console.error(`  transforms/${name}: missing 'transform' export`);
      process.exit(1);
    }
    console.log(`  ✓ ${name}`);
    count++;
  }
  console.log(`done (${count} transforms validated)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
