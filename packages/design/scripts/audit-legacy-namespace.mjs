#!/usr/bin/env node
import { auditLegacyNamespace } from '../src/audit/legacy-namespace.mjs';

const result = auditLegacyNamespace();
if (result.failures.length) {
  for (const failure of result.failures) {
    console.error(`legacy namespace forbidden: ${failure.file} :: ${failure.match}`);
  }
  process.exit(1);
}
console.log('audit:legacy-namespace ok (0 failures)');
