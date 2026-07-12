import { readFileSync } from 'node:fs';
import { globSync } from './_glob.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const FILES = globSync('src/patterns/girok/*.css', { cwd: ROOT }).sort().map((file) => path.join(ROOT, file));
const LEGACY_RE = /--vds-exp-girok-redesign-[A-Za-z0-9-]*/g;

export function auditLegacyNamespace() {
  const failures = [];
  for (const file of FILES) {
    const css = readFileSync(file, 'utf8');
    for (const match of css.match(LEGACY_RE) ?? []) {
      failures.push({ file, match });
    }
  }
  return { failures };
}
