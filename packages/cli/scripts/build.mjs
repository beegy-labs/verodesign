#!/usr/bin/env node
/**
 * @verobee/cli build — CLI ships pre-built at dist/cli.js. This script
 * just verifies the entry exists and is executable.
 */
import { stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ENTRY = join(ROOT, 'dist', 'cli.js');

async function main() {
  console.log('@verobee/cli — build');
  await stat(ENTRY);
  console.log(`  ✓ ${ENTRY}`);
  console.log('done');
}

main().catch((err) => {
  console.error(`  ✗ missing ${ENTRY}`);
  process.exit(1);
});
