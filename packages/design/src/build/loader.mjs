import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const TOKENS_ROOT = new URL('../../tokens/', import.meta.url).pathname;

async function readJson(path) {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

async function loadDir(subdir) {
  const dir = join(TOKENS_ROOT, subdir);
  const entries = await readdir(dir);
  const out = [];
  for (const entry of entries) {
    if (!entry.endsWith('.json')) continue;
    if (entry.startsWith('_')) continue;
    out.push({ name: entry, json: await readJson(join(dir, entry)) });
  }
  return out;
}

export async function loadPrimitives() {
  return loadDir('primitive');
}

export async function loadSemantic() {
  return loadDir('semantic');
}

export async function loadTheme(theme, mode) {
  const path = join(TOKENS_ROOT, 'themes', `${theme}-${mode}.json`);
  try {
    return await readJson(path);
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

export function deepMerge(target, source) {
  if (source == null) return target;
  if (typeof source !== 'object' || Array.isArray(source)) return source;
  const out = Array.isArray(target) ? [...target] : { ...(target ?? {}) };
  for (const [key, val] of Object.entries(source)) {
    if (key.startsWith('$')) {
      out[key] = val;
      continue;
    }
    if (val && typeof val === 'object' && !Array.isArray(val) && '$value' in val) {
      out[key] = val;
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      out[key] = deepMerge(out[key], val);
    } else {
      out[key] = val;
    }
  }
  return out;
}

export function flattenTokens(tree, prefix = []) {
  const result = [];
  if (!tree || typeof tree !== 'object') return result;
  for (const [key, val] of Object.entries(tree)) {
    if (key.startsWith('$')) continue;
    if (val && typeof val === 'object' && '$value' in val) {
      result.push({
        path: [...prefix, key],
        value: val.$value,
        type: val.$type,
        description: val.$description,
        extensions: val.$extensions,
      });
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      result.push(...flattenTokens(val, [...prefix, key]));
    }
  }
  return result;
}

export async function buildThemeTokens(theme, mode) {
  const primitives = await loadPrimitives();
  const semantic = await loadSemantic();
  const themeOverride = await loadTheme(theme, mode);

  let tree = {};
  for (const { json } of primitives) tree = deepMerge(tree, json);
  for (const { json } of semantic) tree = deepMerge(tree, json);
  if (themeOverride) tree = deepMerge(tree, themeOverride);

  return tree;
}

export async function buildAllTokenTrees(themes) {
  const result = {};
  for (const theme of themes) {
    result[theme] = {
      light: await buildThemeTokens(theme, 'light'),
      dark: await buildThemeTokens(theme, 'dark'),
    };
  }
  return result;
}
