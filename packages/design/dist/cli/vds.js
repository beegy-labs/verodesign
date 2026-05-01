#!/usr/bin/env node
// @verobee/design — vds CLI

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, '..', '..');
const args = process.argv.slice(2);
const cmd = args[0];

function help() {
  console.log(`vds — Verobee Design System CLI

Usage:
  vds build                       Rebuild dist (must run inside checkout)
  vds validate                    Run validation gates only
  vds version                     Print package version

Run inside the verodesign checkout. End-user theme building (build-theme)
arrives in v0.2.x.`);
}

if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
  help();
  process.exit(0);
}

if (cmd === 'version' || cmd === '--version' || cmd === '-v') {
  const pkg = JSON.parse(await import('node:fs').then((m) => m.readFileSync(resolve(PKG_ROOT, 'package.json'), 'utf8')));
  console.log(pkg.version);
  process.exit(0);
}

if (cmd === 'build') {
  const r = spawnSync('node', [resolve(PKG_ROOT, 'scripts', 'build.mjs')], { stdio: 'inherit' });
  process.exit(r.status ?? 0);
}

if (cmd === 'validate') {
  const r = spawnSync('node', [resolve(PKG_ROOT, 'scripts', 'validate.mjs')], { stdio: 'inherit' });
  process.exit(r.status ?? 0);
}

console.error(`Unknown command: ${cmd}`);
help();
process.exit(1);
