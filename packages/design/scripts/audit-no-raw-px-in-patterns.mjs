#!/usr/bin/env node
import { auditNoRawPxInPatterns } from '../src/audit/no-raw-px-in-patterns.mjs';

const result = auditNoRawPxInPatterns();
if (result.failures.length) {
  for (const failure of result.failures) {
    console.error(`raw literal forbidden: ${failure.file} :: ${failure.match} :: ${failure.line}`);
  }
  process.exit(1);
}
console.log('audit:no-raw-px-in-patterns ok (0 failures outside allowlist)');
