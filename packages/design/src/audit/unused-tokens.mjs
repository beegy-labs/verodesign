import { readFileSync } from 'node:fs';
import { globSync } from './_glob.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function collectFiles() {
  return [
    ...globSync('src/patterns/girok/*.css', { cwd: ROOT }).sort().map((file) => path.join(ROOT, file)),
    ...globSync('tokens/experimental/girok/components/*.json', { cwd: ROOT }).sort().map((file) => path.join(ROOT, file)),
  ];
}

function flattenTokens(node, prefix = [], out = []) {
  for (const [key, value] of Object.entries(node ?? {})) {
    if (key.startsWith('$')) continue;
    const next = [...prefix, key];
    if (value && typeof value === 'object' && '$value' in value) {
      out.push(next);
      continue;
    }
    if (value && typeof value === 'object') flattenTokens(value, next, out);
  }
  return out;
}

export function auditUnusedTokens() {
  const corpus = collectFiles().map((file) => readFileSync(file, 'utf8')).join('\n');
  const semantic = JSON.parse(readFileSync(path.join(ROOT, 'tokens/experimental/girok/semantic.json'), 'utf8')).exp.girok;
  const failures = [];
  for (const tokenPath of flattenTokens(semantic)) {
    const cssVar = `--vds-exp-girok-${tokenPath.join('-')}`;
    if (!corpus.includes(cssVar)) failures.push({ token: cssVar });
  }
  return { failures };
}
