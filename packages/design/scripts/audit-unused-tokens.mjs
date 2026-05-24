#!/usr/bin/env node
import { auditUnusedTokens } from '../src/audit/unused-tokens.mjs';

const result = auditUnusedTokens();
if (result.failures.length) {
  for (const failure of result.failures) console.error(`unused girok semantic token: ${failure.token}`);
  process.exit(1);
}
console.log('audit:unused-tokens ok (0 failures)');
