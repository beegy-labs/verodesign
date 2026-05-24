import type { TransformOptions } from '../lib/naming.js';
import { migrateText, migrateTokenJson } from '../lib/naming.js';
import { rewriteFile, walk } from '../lib/fs.js';

const JSON_EXTS = ['.json'];
const TEXT_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.pcss', '.scss', '.md'];

export async function transform(targetDir: string, { dry = false }: TransformOptions = {}) {
  const jsonFiles = await walk(targetDir, JSON_EXTS);
  const textFiles = await walk(targetDir, TEXT_EXTS);

  let changed = 0;

  for (const file of jsonFiles) {
    const didChange = await rewriteFile(file, migrateTokenJson, dry);
    if (didChange) {
      changed += 1;
      console.log(`  ${file}`);
    }
  }

  for (const file of textFiles) {
    const didChange = await rewriteFile(file, migrateText, dry);
    if (didChange) {
      changed += 1;
      console.log(`  ${file}`);
    }
  }

  console.log(`\n${dry ? '[DRY RUN] ' : ''}${changed} files updated in ${targetDir}`);
  return changed;
}
