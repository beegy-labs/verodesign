#!/usr/bin/env node
import { cp, mkdir, rm, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { transform } from 'lightningcss';
import { emitCoreCss } from '../src/build/emit-core.mjs';
import { emitPropertyCss } from '../src/build/emit-property.mjs';
import { emitThemeCss } from '../src/build/emit-theme.mjs';
import { emitUtilities } from '../src/build/utilities/index.mjs';
import { emitProseCss } from '../src/build/emit-prose.mjs';
import { emitTypes } from '../src/build/emit-types.mjs';
import { emitTokensJson } from '../src/build/emit-json.mjs';
import { emitStatic } from '../src/build/emit-static.mjs';
import { emitConcat } from '../src/build/emit-concat.mjs';
import { emitCompress } from '../src/build/emit-compress.mjs';
import { auditContrast } from '../src/audit/contrast.mjs';
import { auditParity } from '../src/audit/parity.mjs';
import { auditNaming } from '../src/audit/naming.mjs';
import { auditPatternSpacing } from '../src/audit/pattern-spacing.mjs';
import { auditNoLiteralFallback } from '../src/audit/no-literal-fallback.mjs';
import { auditNoRawPxInPatterns } from '../src/audit/no-raw-px-in-patterns.mjs';
import { auditUnusedTokens } from '../src/audit/unused-tokens.mjs';
import { auditLegacyNamespace } from '../src/audit/legacy-namespace.mjs';

const DIST = new URL('../dist/', import.meta.url).pathname;
const ASSETS = new URL('../assets/', import.meta.url).pathname;
const THEMES = ['default', 'veronex', 'verobase', 'verobase-admin', 'girok'];

function step(label) {
  process.stdout.write(`  ${label}...`);
  const t0 = Date.now();
  return (extra = '') => {
    const ms = Date.now() - t0;
    console.log(` ok (${ms}ms)${extra ? ' ' + extra : ''}`);
  };
}

async function main() {
  console.log('verodesign build');

  await rm(DIST, { recursive: true, force: true });

  console.log('[validate]');
  let done = step('naming pattern');
  const naming = await auditNaming();
  done(naming.failures.length ? `(${naming.failures.length} failures)` : '');
  if (naming.failures.length) {
    for (const f of naming.failures) console.error('  ✗', f.token, '→', f.cssVar);
    process.exit(1);
  }

  done = step('slot parity across themes');
  const parity = await auditParity(THEMES);
  done(parity.failures.length ? `(${parity.failures.length} mismatches)` : '');
  if (parity.failures.length) {
    for (const f of parity.failures) {
      console.error(`  ✗ ${f.theme}: missing=${f.missing.length} extra=${f.extra.length}`);
      if (f.missing.length) console.error('    missing:', f.missing.slice(0, 5).join(', '), f.missing.length > 5 ? `... +${f.missing.length - 5}` : '');
    }
    process.exit(1);
  }

  done = step('pattern spacing contract');
  const spacing = auditPatternSpacing();
  done(spacing.failures.length ? `(${spacing.failures.length} failures)` : '');
  if (spacing.failures.length) {
    for (const f of spacing.failures) {
      console.error(`  ✗ ${f.type}: ${f.selector}`);
    }
    process.exit(1);
  }

  done = step('no literal fallback in girok patterns');
  const fallback = auditNoLiteralFallback();
  done(fallback.failures.length ? `(${fallback.failures.length} failures)` : '');
  if (fallback.failures.length) {
    for (const f of fallback.failures) console.error(`  ✗ ${f.file}: ${f.match}`);
    process.exit(1);
  }

  done = step('no raw px/rem/em in girok patterns');
  const rawUnits = auditNoRawPxInPatterns();
  done(rawUnits.failures.length ? `(${rawUnits.failures.length} failures)` : '');
  if (rawUnits.failures.length) {
    for (const f of rawUnits.failures.slice(0, 20)) console.error(`  ✗ ${f.file}: ${f.match} :: ${f.line}`);
    process.exit(1);
  }

  done = step('no legacy girok namespace in patterns');
  const legacyNamespace = auditLegacyNamespace();
  done(legacyNamespace.failures.length ? `(${legacyNamespace.failures.length} failures)` : '');
  if (legacyNamespace.failures.length) {
    for (const f of legacyNamespace.failures.slice(0, 20)) console.error(`  ✗ ${f.file}: ${f.match}`);
    process.exit(1);
  }

  done = step('no unused girok semantic tokens');
  const unusedTokens = auditUnusedTokens();
  done(unusedTokens.failures.length ? `(${unusedTokens.failures.length} failures)` : '');
  if (unusedTokens.failures.length) {
    for (const f of unusedTokens.failures.slice(0, 20)) console.error(`  ✗ ${f.token}`);
    process.exit(1);
  }

  console.log('[emit]');
  done = step('dist/css/tokens.property.css');
  const propertyOut = await emitPropertyCss();
  done(`(${propertyOut.count} @property)`);

  done = step('dist/css/core.css');
  const coreOut = await emitCoreCss();
  done(`(${coreOut.count} tokens)`);

  for (const theme of THEMES) {
    done = step(`dist/css/themes/${theme}.css`);
    const r = await emitThemeCss(theme);
    done(`(light=${r.lightCount} dark=${r.darkCount})`);
  }

  done = step('dist/utilities/* (full + by-category + state + responsive)');
  const utilOut = await emitUtilities();
  done(`(color=${utilOut.counts.color} spacing=${utilOut.counts.spacing} typo=${utilOut.counts.typography} layout=${utilOut.counts.layout} sizing=${utilOut.counts.sizing} effect=${utilOut.counts.effect} transition=${utilOut.counts.transition} state=${utilOut.counts.state})`);

  done = step('dist/css/prose.css');
  await emitProseCss();
  done();

  done = step('dist/types/tokens.d.ts');
  const types = await emitTypes();
  done(`(${types.count} tokens)`);

  done = step('dist/data/tokens.json');
  await emitTokensJson(THEMES);
  done();

  done = step('dist/theme-init.js + reset.css + cli');
  await emitStatic();
  done();

  done = step('dist/fonts/plus-jakarta-sans/*');
  await emitFontAssets();
  done();

  console.log('[audit]');
  done = step('WCAG contrast');
  const audit = await auditContrast(THEMES);
  done(audit.failures ? `(${audit.failures} failures)` : '');
  if (audit.failures) {
    console.error(`build aborted: ${audit.failures} contrast failures`);
    process.exit(1);
  }

  // ── Optimize: Lightning CSS (Rust) minify + vendor prefix + modern syntax transform ───
  // ── Bundle: concatenated production bundle (tokens.property + reset + core + theme + utilities) ───
  done = step('dist/verodesign.full.css (concatenated production bundle)');
  const concatOut = await emitConcat({ theme: 'default' });
  done(`(${(concatOut.bytes / 1024).toFixed(0)} KB)`);

  console.log('[optimize]');
  // Browserslist baseline 2026-Q1 — Chrome/Edge 111+, Firefox 113+, Safari 15.4+
  const TARGETS = {
    chrome: 111 << 16,
    firefox: 113 << 16,
    safari: (15 << 16) | (4 << 8),
  };

  async function walkCss(dir) {
    const out = [];
    for (const ent of await readdir(dir)) {
      const p = join(dir, ent);
      const s = await stat(p);
      if (s.isDirectory()) {
        if (relative(DIST, p).startsWith('fonts/')) continue;
        out.push(...(await walkCss(p)));
      }
      else if (ent.endsWith('.css') && !ent.endsWith('.min.css')) out.push(p);
    }
    return out;
  }

  done = step('lightningcss minify *.css → *.min.css');
  const cssFiles = await walkCss(DIST);
  let totalRaw = 0, totalMin = 0;
  for (const file of cssFiles) {
    const raw = await readFile(file);
    totalRaw += raw.length;
    const { code } = transform({
      filename: relative(DIST, file),
      code: raw,
      minify: true,
      targets: TARGETS,
      drafts: { customMedia: true },
    });
    const minPath = file.replace(/\.css$/, '.min.css');
    await writeFile(minPath, code);
    totalMin += code.length;
  }
  const ratio = ((totalMin / totalRaw) * 100).toFixed(1);
  done(`(${cssFiles.length} files, ${(totalRaw / 1024).toFixed(0)} KB → ${(totalMin / 1024).toFixed(0)} KB · ${ratio}%)`);

  // ── Compress: Brotli-11 .br siblings for every .css (incl. .min.css) ───
  done = step('Brotli-11 *.css.br siblings');
  const cmp = await emitCompress();
  const brRatio = ((cmp.totalBr / cmp.totalRaw) * 100).toFixed(1);
  done(`(${cmp.count} files, concurrency=${cmp.concurrency}, ${(cmp.totalRaw / 1024).toFixed(0)} KB → ${(cmp.totalBr / 1024).toFixed(0)} KB · ${brRatio}%)`);

  console.log('done');
}

async function emitFontAssets() {
  const sourceDir = join(ASSETS, 'fonts/plus-jakarta-sans');
  const distDir = join(DIST, 'fonts/plus-jakarta-sans');
  await mkdir(distDir, { recursive: true });
  await cp(join(sourceDir, 'PlusJakartaSans-VariableFont_wght.woff2'), join(distDir, 'PlusJakartaSans-VariableFont_wght.woff2'));
  await cp(join(sourceDir, 'OFL.txt'), join(distDir, 'OFL.txt'));
  await writeFile(
    join(distDir, 'plus-jakarta-sans.css'),
    `@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('./PlusJakartaSans-VariableFont_wght.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
`
  );
}

main().catch((err) => {
  console.error('build failed:', err.message);
  if (process.env.VDS_DEBUG) console.error(err.stack);
  process.exit(1);
});
