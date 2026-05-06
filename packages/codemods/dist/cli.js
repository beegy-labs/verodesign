#!/usr/bin/env node
/**
 * @verobee/codemods CLI.
 *
 * Usage: verobee-codemod <transform-name> <target-dir> [--dry]
 * Example: verobee-codemod v0-to-v1 ./web/dashboard
 */
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);

async function main() {
  const [, , transformName, targetDir, ...flags] = process.argv;
  if (!transformName || !targetDir) {
    console.error('Usage: verobee-codemod <transform-name> <target-dir> [--dry]');
    console.error('Available transforms:');
    console.error('  v0-to-v1   Migrate from monolithic @verobee/design to 7-layer split');
    process.exit(1);
  }

  const transformPath = join(ROOT, 'transforms', transformName, 'index.mjs');
  if (!existsSync(transformPath)) {
    console.error(`Unknown transform: ${transformName}`);
    process.exit(1);
  }

  const dry = flags.includes('--dry');
  const mod = await import(pathToFileURL(transformPath).href);
  if (typeof mod.transform !== 'function') {
    console.error(`Transform ${transformName} does not export 'transform'`);
    process.exit(1);
  }
  mod.transform(targetDir, { dry });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
