#!/usr/bin/env node
import { auditNoLiteralFallback } from '../src/audit/no-literal-fallback.mjs';

const result = auditNoLiteralFallback();
if (result.failures.length) {
  for (const failure of result.failures) {
    console.error(`fallback forbidden: ${failure.file} :: ${failure.match}`);
  }
  process.exit(1);
}
console.log('audit:no-literal-fallback ok (0 failures)');
