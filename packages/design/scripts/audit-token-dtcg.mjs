#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const PACKAGE_ROOT = new URL('..', import.meta.url);
const TOKENS_ROOT = new URL('../tokens/', import.meta.url);
const PACKAGE_ROOT_PATH = fileURLToPath(PACKAGE_ROOT);

const TOKEN_TYPES = new Set([
  'border',
  'color',
  'cubicBezier',
  'dimension',
  'duration',
  'fontFamily',
  'fontWeight',
  'gradient',
  'number',
  'shadow',
  'strokeStyle',
  'transition',
  'typography',
  'other',
]);

const COLOR_RE =
  /^(#[0-9a-fA-F]{3,8}|(oklch|oklab|rgb|rgba|hsl|hsla|lab|lch|color|color-mix)\(.+\)|transparent|currentColor|black|white)$/;
const DIMENSION_RE = /^-?(?:\d+|\d*\.\d+)(?:px|rem|em|%|vh|vw|svh|svw|lvh|lvw|dvh|dvw|ch|ex|cap|ic|lh|rlh|vmin|vmax)$/;
const DIMENSION_CALC_RE = /^calc\(.+\)$/;
const DURATION_RE = /^(?:\d+|\d*\.\d+)(ms|s)$/;
const FONT_FAMILY_RE = /,|[A-Za-z"-]/;
const REFERENCE_RE = /^\{([A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*)\}$/;

const FILE_GROUPS = ['primitive', 'semantic', 'experimental', 'themes'];

function isPlainObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function relPath(filePath) {
  return path.relative(PACKAGE_ROOT_PATH, fileURLToPath(filePath));
}

function pushIssue(list, severity, file, tokenPath, message) {
  list.push({ severity, file, tokenPath, message });
}

async function loadTokenFiles() {
  const files = [];
  for (const group of FILE_GROUPS) {
    const dir = new URL(`../tokens/${group}/`, import.meta.url);
    await walkTokenDir(dir, group, files);
  }
  return files.sort((a, b) => a.file.localeCompare(b.file));
}

async function walkTokenDir(dir, group, files) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_')) continue;
    if (entry.isDirectory()) {
      await walkTokenDir(new URL(`${entry.name}/`, dir), group, files);
      continue;
    }
    if (!entry.name.endsWith('.json')) continue;
    const filePath = new URL(entry.name, dir);
    const raw = await readFile(filePath, 'utf8');
    files.push({
      group,
      name: entry.name,
      file: relPath(filePath),
      json: JSON.parse(raw),
    });
  }
}

function collectTokens(node, file, prefix = [], issues = [], tokenMap = new Map()) {
  if (!isPlainObject(node)) return { issues, tokenMap };

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    if (!isPlainObject(value)) {
      pushIssue(issues, 'error', file, prefix.join('.') || '(root)', `group "${key}" must be an object`);
      continue;
    }

    const nextPath = [...prefix, key];
    const dotPath = nextPath.join('.');

    if ('$value' in value) {
      tokenMap.set(dotPath, { file, path: dotPath, token: value });
      validateTokenShape(value, file, dotPath, issues);
    }

    if ('$root' in value) {
      if (!isPlainObject(value.$root) || !('$value' in value.$root)) {
        pushIssue(issues, 'error', file, dotPath, '$root must be a token object');
      } else {
        tokenMap.set(dotPath, { file, path: dotPath, token: value.$root });
        validateTokenShape(value.$root, file, dotPath, issues, true);
      }
    }

    collectTokens(value, file, nextPath, issues, tokenMap);
  }

  return { issues, tokenMap };
}

function validateTokenShape(token, file, dotPath, issues, fromRoot = false) {
  if (!('$type' in token)) {
    pushIssue(issues, 'error', file, dotPath, `${fromRoot ? '$root ' : ''}token missing $type`);
    return;
  }

  if (!TOKEN_TYPES.has(token.$type)) {
    pushIssue(issues, 'error', file, dotPath, `invalid $type "${token.$type}"`);
  }

  if (!('$description' in token) || typeof token.$description !== 'string' || token.$description.trim() === '') {
    pushIssue(issues, 'warning', file, dotPath, '$description recommended');
  }

  validateValue(token.$type, token.$value, file, dotPath, issues);
}

function validateValue(type, value, file, dotPath, issues) {
  if (typeof value === 'string' && value.includes('{')) {
    if (!REFERENCE_RE.test(value)) {
      pushIssue(issues, 'error', file, dotPath, `invalid reference syntax "${value}"`);
    }
    return;
  }

  switch (type) {
    case 'color':
      if (typeof value !== 'string' || !COLOR_RE.test(value.trim())) {
        pushIssue(issues, 'error', file, dotPath, 'color $value must be OKLCH/hex or a supported CSS color');
      }
      break;
    case 'dimension':
      if (
        typeof value !== 'string' ||
        (!DIMENSION_RE.test(value.trim()) && !DIMENSION_CALC_RE.test(value.trim()))
      ) {
        pushIssue(issues, 'error', file, dotPath, 'dimension $value must be a CSS length or calc(...) expression');
      }
      break;
    case 'duration':
      if (typeof value !== 'string' || !DURATION_RE.test(value.trim())) {
        pushIssue(issues, 'error', file, dotPath, 'duration $value must use ms or s');
      }
      break;
    case 'fontFamily':
      if (typeof value !== 'string' || !FONT_FAMILY_RE.test(value)) {
        pushIssue(issues, 'error', file, dotPath, 'fontFamily $value must be a CSS font-family string');
      }
      break;
    case 'fontWeight':
      if (
        !(
          Number.isInteger(value) ||
          (typeof value === 'string' && /^(normal|bold|[1-9]00)$/.test(value.trim()))
        )
      ) {
        pushIssue(issues, 'error', file, dotPath, 'fontWeight $value must be 100-900, normal, or bold');
      }
      break;
    case 'number':
      if (typeof value !== 'number') {
        pushIssue(issues, 'error', file, dotPath, 'number $value must be numeric');
      }
      break;
    case 'cubicBezier':
      if (
        !(
          Array.isArray(value) &&
          value.length === 4 &&
          value.every((part) => typeof part === 'number')
        )
      ) {
        pushIssue(issues, 'error', file, dotPath, 'cubicBezier $value must be a 4-number array');
      }
      break;
    case 'shadow':
      validateShadow(value, file, dotPath, issues);
      break;
    case 'other':
      if (!(typeof value === 'string' || typeof value === 'number' || isPlainObject(value) || Array.isArray(value))) {
        pushIssue(issues, 'error', file, dotPath, 'other $value must be a JSON scalar/object/array');
      }
      break;
    default:
      break;
  }
}

function validateShadow(value, file, dotPath, issues) {
  if (typeof value === 'string') {
    if (value.trim() === '') {
      pushIssue(issues, 'error', file, dotPath, 'shadow string $value must not be empty');
    }
    return;
  }

  if (!isPlainObject(value)) {
    pushIssue(issues, 'error', file, dotPath, 'shadow $value must be "none" or an object');
    return;
  }

  for (const field of ['color', 'offsetX', 'offsetY', 'blur', 'spread']) {
    if (!(field in value)) {
      pushIssue(issues, 'error', file, dotPath, `shadow missing "${field}"`);
      continue;
    }
  }

  if (typeof value.color !== 'string' || !COLOR_RE.test(value.color.trim())) {
    pushIssue(issues, 'error', file, dotPath, 'shadow color must be a valid CSS color');
  }
  for (const field of ['offsetX', 'offsetY', 'blur', 'spread']) {
    if (typeof value[field] !== 'string' || !/^-?(?:\d+|\d*\.\d+)(?:px|rem|em|%)?$/.test(value[field].trim())) {
      pushIssue(issues, 'error', file, dotPath, `shadow ${field} must be a length-like string`);
    }
  }
}

function validateReferences(tokenMap, issues) {
  const graph = new Map();
  for (const [dotPath, meta] of tokenMap.entries()) {
    const refs = [];
    collectReferences(meta.token.$value, refs);
    graph.set(dotPath, refs);
    for (const ref of refs) {
      if (!tokenMap.has(ref)) {
        pushIssue(issues, 'error', meta.file, dotPath, `unresolved reference "{${ref}}"`);
      }
    }
  }

  const visited = new Set();
  const active = [];

  function dfs(node) {
    if (active.includes(node)) {
      const cycle = [...active.slice(active.indexOf(node)), node].join(' -> ');
      const meta = tokenMap.get(node);
      pushIssue(issues, 'error', meta.file, node, `circular reference detected: ${cycle}`);
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    active.push(node);
    for (const ref of graph.get(node) ?? []) {
      if (graph.has(ref)) dfs(ref);
    }
    active.pop();
  }

  for (const node of graph.keys()) dfs(node);
}

function collectReferences(value, refs) {
  if (typeof value === 'string') {
    const match = value.trim().match(REFERENCE_RE);
    if (match) refs.push(match[1]);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectReferences(item, refs);
    return;
  }
  if (isPlainObject(value)) {
    for (const item of Object.values(value)) collectReferences(item, refs);
  }
}

async function main() {
  const files = await loadTokenFiles();
  const issues = [];
  const tokenMap = new Map();

  for (const entry of files) {
    if (entry.json?.$schema && typeof entry.json.$schema !== 'string') {
      pushIssue(issues, 'error', entry.file, '(root)', '$schema must be a string');
    }
    collectTokens(entry.json, entry.file, [], issues, tokenMap);
  }

  validateReferences(tokenMap, issues);

  const errors = issues.filter((issue) => issue.severity === 'error');
  const warnings = issues.filter((issue) => issue.severity === 'warning');

  console.log('verodesign audit:tokens-dtcg');
  console.log(`  files: ${files.length}`);
  console.log(`  tokens: ${tokenMap.size}`);
  console.log(`  errors: ${errors.length}`);
  console.log(`  warnings: ${warnings.length}`);

  for (const issue of issues.slice(0, 200)) {
    const marker = issue.severity === 'error' ? '✗' : '!';
    console[issue.severity === 'error' ? 'error' : 'warn'](
      `  ${marker} ${issue.file} :: ${issue.tokenPath} :: ${issue.message}`,
    );
  }

  if (issues.length > 200) {
    console.error(`  ... ${issues.length - 200} more issues truncated`);
  }

  if (errors.length) process.exit(1);
}

main().catch((err) => {
  console.error('audit:tokens-dtcg failed:', err.message);
  process.exit(1);
});
