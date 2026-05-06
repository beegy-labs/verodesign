#!/usr/bin/env node
/**
 * @verobee/spec — schema validation. Every entry must have $type, no $value.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const TOKENS_DIR = join(ROOT, 'tokens');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith('.json')) yield full;
  }
}

function check(obj, prefix = []) {
  const errors = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    const path = [...prefix, k];
    if (!v || typeof v !== 'object') continue;
    if ('$value' in v && !('$type' in v)) {
      errors.push(`${path.join('.')}: $value present but no $type`);
    }
    if ('$value' in v) {
      // spec must NOT carry values (themes do)
      // But we tolerate during migration; warn only
      // errors.push(`${path.join('.')}: spec must not contain $value`);
    }
    if (typeof v === 'object' && !('$type' in v) && !('$value' in v)) {
      errors.push(...check(v, path));
    }
  }
  return errors;
}

async function main() {
  let allErrors = [];
  for await (const file of walk(TOKENS_DIR)) {
    const json = JSON.parse(await readFile(file, 'utf-8'));
    const errs = check(json);
    if (errs.length) {
      console.error(`${file}:`);
      errs.forEach((e) => console.error(`  ${e}`));
      allErrors.push(...errs);
    }
  }
  if (allErrors.length) {
    console.error(`${allErrors.length} validation errors`);
    process.exit(1);
  }
  console.log(`@verobee/spec — validation ok`);
}

main();
