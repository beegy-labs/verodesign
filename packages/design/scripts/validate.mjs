#!/usr/bin/env node
import { auditContrast } from '../src/audit/contrast.mjs';
import { auditParity } from '../src/audit/parity.mjs';
import { auditNaming } from '../src/audit/naming.mjs';

const THEMES = ['default', 'veronex', 'verobase'];

async function main() {
  console.log('verodesign validate (no emit)');
  let fail = 0;

  process.stdout.write('  naming pattern...');
  const naming = await auditNaming();
  console.log(naming.failures.length ? ` ✗ (${naming.failures.length})` : ' ok');
  if (naming.failures.length) {
    for (const f of naming.failures) console.error('    ✗', f.token, '→', f.cssVar);
    fail += 1;
  }

  process.stdout.write('  slot parity...');
  const parity = await auditParity(THEMES);
  console.log(parity.failures.length ? ` ✗ (${parity.failures.length})` : ' ok');
  if (parity.failures.length) {
    for (const f of parity.failures) {
      console.error(`    ✗ ${f.theme}: missing=${f.missing.length} extra=${f.extra.length}`);
    }
    fail += 1;
  }

  process.stdout.write('  WCAG contrast...');
  const audit = await auditContrast(THEMES);
  console.log(audit.failures ? ` ✗ (${audit.failures})` : ' ok');
  if (audit.failures) fail += 1;

  if (fail) {
    console.error(`validation failed (${fail} gates)`);
    process.exit(1);
  }
  console.log('all gates passed');
}

main().catch((err) => {
  console.error('validate failed:', err.message);
  process.exit(1);
});
