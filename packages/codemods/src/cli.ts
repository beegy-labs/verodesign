#!/usr/bin/env node
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';

type TransformModule = {
  transform: (targetDir: string, options?: { dry?: boolean }) => Promise<number> | number;
};

const TRANSFORMS: Record<string, () => Promise<TransformModule>> = {
  'v0-to-v1': () => import('./transforms/v0-to-v1/index.js'),
  'migrate-naming-2026-05': () => import('./transforms/migrate-naming-2026-05.js'),
};

function printUsage() {
  console.error('Usage: codemods <transform-name> <target-dir> [--dry-run]');
  console.error('Available transforms:');
  console.error('  v0-to-v1');
  console.error('  migrate-naming-2026-05');
}

async function main() {
  const [, , transformName, targetDir, ...flags] = process.argv;
  if (!transformName || !targetDir) {
    printUsage();
    process.exit(1);
  }

  const loader = TRANSFORMS[transformName];
  if (!loader) {
    console.error(`Unknown transform: ${transformName}`);
    printUsage();
    process.exit(1);
  }

  await access(targetDir, constants.F_OK);
  const dry = flags.includes('--dry-run') || flags.includes('--dry');
  const mod = await loader();
  await mod.transform(targetDir, { dry });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
