import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../../dist/', import.meta.url).pathname;

const THEME_INIT = `(function () {
  try {
    var stored = localStorage.getItem('vds:theme');
    var mode = localStorage.getItem('vds:mode');
    var html = document.documentElement;
    if (stored) html.setAttribute('data-theme', stored);
    if (mode) html.setAttribute('data-mode', mode);
  } catch (e) {}
})();
`;

const RESET_CSS = `/* @verobee/design — reset.css */
/* modern-normalize subset + minimal opinionated additions. */

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }

  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: var(--vds-font-family-sans, system-ui, sans-serif);
  }

  body {
    margin: 0;
    background-color: var(--vds-theme-bg-page, #fff);
    color: var(--vds-theme-text-primary, #111);
  }

  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }

  abbr[title] { text-decoration: underline dotted; }

  b, strong { font-weight: 600; }

  code, kbd, samp, pre {
    font-family: var(--vds-font-family-mono, ui-monospace, monospace);
    font-size: 1em;
  }

  small { font-size: 80%; }
  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
  sub { bottom: -0.25em; }
  sup { top: -0.5em; }

  table { text-indent: 0; border-color: inherit; }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  button, select { text-transform: none; }
  button, [type='button'], [type='reset'], [type='submit'] { -webkit-appearance: button; }
  ::-moz-focus-inner { border-style: none; padding: 0; }
  :-moz-focusring { outline: 1px dotted ButtonText; }
  legend { padding: 0; }
  progress { vertical-align: baseline; }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }
  [type='search'] { -webkit-appearance: textfield; outline-offset: -2px; }
  ::-webkit-search-decoration { -webkit-appearance: none; }
  ::-webkit-file-upload-button { -webkit-appearance: button; font: inherit; }
  summary { display: list-item; }

  :focus-visible {
    outline: 2px solid var(--vds-theme-border-focus, currentColor);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0ms !important;
      scroll-behavior: auto !important;
    }
  }
}
`;

const CLI = `#!/usr/bin/env node
// @verobee/design — vds CLI

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, '..', '..');
const args = process.argv.slice(2);
const cmd = args[0];

function help() {
  console.log(\`vds — Verobee Design System CLI

Usage:
  vds build                       Rebuild dist (must run inside checkout)
  vds validate                    Run validation gates only
  vds version                     Print package version

Run inside the verodesign checkout. End-user theme building (build-theme)
arrives in v0.2.x.\`);
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

console.error(\`Unknown command: \${cmd}\`);
help();
process.exit(1);
`;

export async function emitStatic() {
  await mkdir(DIST, { recursive: true });
  await writeFile(join(DIST, 'theme-init.js'), THEME_INIT, 'utf8');

  await mkdir(join(DIST, 'css'), { recursive: true });
  await writeFile(join(DIST, 'css', 'reset.css'), RESET_CSS, 'utf8');

  await mkdir(join(DIST, 'cli'), { recursive: true });
  await writeFile(join(DIST, 'cli', 'vds.js'), CLI, 'utf8');
  return { count: 3 };
}
