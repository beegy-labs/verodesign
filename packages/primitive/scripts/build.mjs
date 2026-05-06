#!/usr/bin/env node
/**
 * @verobee/primitive — raw token values build.
 *
 * Emits CSS custom properties for primitive tokens (color ramps, spacing,
 * radius, shadow, typography, animation). These are brand-agnostic — themes
 * reference primitives via DTCG `{color.slate.7}` syntax.
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const TOKENS_DIR = join(ROOT, 'tokens', 'primitive');
const DIST_DIR = join(ROOT, 'dist');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith('.json')) yield full;
  }
}

function flatten(obj, prefix = []) {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object' && '$value' in v) {
      out.push({ path: [...prefix, k], type: v.$type, value: v.$value });
    } else if (v && typeof v === 'object') {
      out.push(...flatten(v, [...prefix, k]));
    }
  }
  return out;
}

const cssVar = (path) => '--vds-' + path.join('-').toLowerCase();

async function main() {
  console.log('@verobee/primitive — build');
  await mkdir(join(DIST_DIR, 'css'), { recursive: true });
  await mkdir(join(DIST_DIR, 'tokens', 'primitive'), { recursive: true });

  const all = [];
  for await (const file of walk(TOKENS_DIR)) {
    const json = JSON.parse(await readFile(file, 'utf-8'));
    all.push(...flatten(json));
    // copy to dist
    const rel = file.slice(join(ROOT, 'tokens').length + 1);
    await mkdir(join(DIST_DIR, 'tokens', dirname(rel)), { recursive: true });
    await writeFile(join(DIST_DIR, 'tokens', rel), JSON.stringify(json, null, 2));
  }

  // Emit core.css with all primitives at :root
  const lines = all.map((t) => {
    const v = typeof t.value === 'string' ? t.value : JSON.stringify(t.value);
    return `  ${cssVar(t.path)}: ${v};`;
  });
  const css = `@layer vds-tokens {\n  :root {\n${lines.join('\n')}\n  }\n}\n`;
  await writeFile(join(DIST_DIR, 'css', 'core.css'), css);
  await writeFile(join(DIST_DIR, 'css', 'core.min.css'), css.replace(/\s+/g, ' '));

  console.log(`  emitted ${all.length} primitive tokens to core.css`);
  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
