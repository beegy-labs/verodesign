import { readFileSync } from 'node:fs';
import { globSync } from './_glob.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const FILES = globSync('src/patterns/girok/*.css', { cwd: ROOT }).sort().map((file) => path.join(ROOT, file));
const FALLBACK_RE = /var\(--[^,)]+,[^)]+\)/g;

export function auditNoLiteralFallback() {
  const failures = [];
  for (const file of FILES) {
    const css = readFileSync(file, 'utf8');
    const matches = css.match(FALLBACK_RE) ?? [];
    for (const match of matches) failures.push({ file, match });
  }
  return { failures };
}
