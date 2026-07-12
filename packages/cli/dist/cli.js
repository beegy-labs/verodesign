#!/usr/bin/env node
/**
 * vds — verodesign CLI.
 *
 * Commands:
 *   vds new-brand <name> --primary <oklch>   Scaffold a new theme package.
 *   vds doctor                                Validate the verodesign workspace.
 *   vds add-token <path> --type color         (planned) Add a semantic slot.
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = dirname(__dirname);
const REPO_ROOT = (() => {
  // walk up looking for pnpm-workspace.yaml
  let cur = __dirname;
  for (let i = 0; i < 10; i++) {
    if (existsSync(join(cur, 'pnpm-workspace.yaml'))) return cur;
    const parent = dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return process.cwd();
})();

const PACKAGES_DIR = join(REPO_ROOT, 'packages');
const TEMPLATES_DIR = join(REPO_ROOT, 'packages', 'design', 'tokens', 'themes');

function help() {
  console.log(`vds — verodesign CLI

Commands:
  vds new-brand <name> --primary <oklch>   Scaffold a new theme package
  vds doctor                                Validate the verodesign workspace
  vds help                                  Show this help

Examples:
  vds new-brand veroteam --primary "oklch(45% 0.18 30)"
  vds doctor
`);
}

function newBrand(name, primary) {
  if (!name || !primary) {
    console.error('Usage: vds new-brand <name> --primary <oklch>');
    process.exit(1);
  }
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    console.error('Brand name must be lowercase, hyphen-separated.');
    process.exit(1);
  }
  const pkgDir = join(PACKAGES_DIR, `theme-${name}`);
  if (existsSync(pkgDir)) {
    console.error(`Package theme-${name} already exists.`);
    process.exit(1);
  }

  console.log(`Scaffolding @verobee/theme-${name}...`);
  mkdirSync(join(pkgDir, 'tokens'), { recursive: true });
  mkdirSync(join(pkgDir, 'scripts'), { recursive: true });
  mkdirSync(join(pkgDir, 'dist'), { recursive: true });

  // package.json
  writeFileSync(join(pkgDir, 'package.json'), JSON.stringify({
    name: `@verobee/theme-${name}`,
    version: '1.0.0',
    description: `Verobee Design System — ${name} brand theme. Implements @verobee/spec.`,
    license: 'MIT',
    type: 'module',
    engines: { node: '>=20' },
    publishConfig: {
      access: 'public',
      registry: 'https://npm.pkg.github.com',
    },
    peerDependencies: {
      '@verobee/spec': '^1.0.0',
      '@verobee/primitive': '^1.0.0',
    },
    devDependencies: {
      '@verobee/spec': 'workspace:*',
      '@verobee/primitive': 'workspace:*',
    },
    files: ['tokens/**/*.json', 'dist/**', 'README.md', 'CHANGELOG.md'],
    exports: {
      './tokens/light.json': `./tokens/${name}-light.json`,
      './tokens/dark.json': `./tokens/${name}-dark.json`,
      './css/theme.css': `./dist/css/${name}.min.css`,
      './types/tokens': './dist/types/tokens.d.ts',
      './package.json': './package.json',
    },
    scripts: {
      build: 'node scripts/build.mjs',
      validate: 'node scripts/validate.mjs',
    },
  }, null, 2) + '\n');

  // Token templates — copy and override primary
  const templateDark = readFileSync(join(TEMPLATES_DIR, '_template-dark.json'), 'utf-8');
  const templateLight = readFileSync(join(TEMPLATES_DIR, '_template-light.json'), 'utf-8');
  const dark = templateDark
    .replace(/"theme":\s*"TEMPLATE"/, `"theme": "${name}"`)
    .replace(/"primary":\s*"OKLCH\([^"]+\)"/, `"primary": "${primary}"`);
  const light = templateLight
    .replace(/"theme":\s*"TEMPLATE"/, `"theme": "${name}"`)
    .replace(/"primary":\s*"OKLCH\([^"]+\)"/, `"primary": "${primary}"`)
    .replace(/"\$value":\s*"oklch\(50% 0\.18 240\)"/g, `"$value": "${primary}"`);
  writeFileSync(join(pkgDir, 'tokens', `${name}-dark.json`), dark);
  writeFileSync(join(pkgDir, 'tokens', `${name}-light.json`), light);

  // Build script — copy from theme-verobase
  const buildScript = readFileSync(join(PACKAGES_DIR, 'theme-verobase', 'scripts', 'build.mjs'), 'utf-8')
    .replace(/const BRAND = 'verobase'/, `const BRAND = '${name}'`)
    .replace(/@verobee\/theme-verobase/g, `@verobee/theme-${name}`);
  writeFileSync(join(pkgDir, 'scripts', 'build.mjs'), buildScript);

  // README + CHANGELOG
  writeFileSync(join(pkgDir, 'README.md'), `# @verobee/theme-${name}\n\nVerobee Design System — ${name} brand theme.\n\n## License\nMIT\n`);
  writeFileSync(join(pkgDir, 'CHANGELOG.md'), `# @verobee/theme-${name}\n\n## 1.0.0\n\n### Major Changes\n\n- Initial release. Primary: ${primary}.\n`);

  console.log(`✓ Created packages/theme-${name}`);
  console.log(`  Next steps:`);
  console.log(`    pnpm install`);
  console.log(`    pnpm --filter @verobee/theme-${name} build`);
  console.log(`    pnpm changeset    # add release entry`);
}

function doctor() {
  const checks = [];
  const requiredPackages = [
    'spec', 'primitive', 'utilities',
    'theme-verobase', 'theme-veronex', 'theme-default',
    'design-elements', 'design-react',
    'codemods', 'cli',
  ];
  for (const pkg of requiredPackages) {
    const exists = existsSync(join(PACKAGES_DIR, pkg, 'package.json'));
    checks.push({ name: `packages/${pkg}/package.json exists`, ok: exists });
  }
  checks.push({ name: '.npmrc has @verobee scope routed to GHPR',
    ok: existsSync(join(REPO_ROOT, '.npmrc')) &&
        readFileSync(join(REPO_ROOT, '.npmrc'), 'utf-8').includes('npm.pkg.github.com') });
  checks.push({ name: '.changeset/config.json exists',
    ok: existsSync(join(REPO_ROOT, '.changeset', 'config.json')) });
  checks.push({ name: '.github/workflows/release.yml exists',
    ok: existsSync(join(REPO_ROOT, '.github', 'workflows', 'release.yml')) });

  let failed = 0;
  for (const c of checks) {
    console.log(`  ${c.ok ? '✓' : '✗'}  ${c.name}`);
    if (!c.ok) failed++;
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
  if (failed) process.exit(1);
}

const [, , cmd, ...args] = process.argv;
switch (cmd) {
  case 'new-brand': {
    const name = args[0];
    const primaryIdx = args.indexOf('--primary');
    const primary = primaryIdx >= 0 ? args[primaryIdx + 1] : undefined;
    newBrand(name, primary);
    break;
  }
  case 'doctor':
    doctor();
    break;
  case 'help':
  case undefined:
    help();
    break;
  default:
    console.error(`Unknown command: ${cmd}`);
    help();
    process.exit(1);
}
