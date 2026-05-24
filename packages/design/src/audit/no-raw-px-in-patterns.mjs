import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const FILES = globSync('src/patterns/girok/*.css', { cwd: ROOT }).sort().map((file) => path.join(ROOT, file));
const VALUE_RE = /\b[0-9]+(?:\.[0-9]+)?(?:px|rem|em)\b/g;
const ALLOWLIST = new Set(['1px', '3px', '4px', '10px', '9999rem']);

function isAllowed(file, match, line) {
  if (ALLOWLIST.has(match)) return true;
  if (match === '4px' && line.includes('blur(4px)')) return true;
  if (match === '10px' && line.includes('blur(10px)')) return true;
  if (line.includes('env(safe-area-inset-bottom')) return true;
  if (line.includes('@media')) return true;
  if (line.includes('@container')) return true;
  return false;
}

export function auditNoRawPxInPatterns() {
  const failures = [];
  for (const file of FILES) {
    const css = readFileSync(file, 'utf8');
    for (const line of css.split('\n')) {
      for (const match of line.match(VALUE_RE) ?? []) {
        if (!isAllowed(file, match, line)) failures.push({ file, line: line.trim(), match });
      }
    }
  }
  return { failures };
}
