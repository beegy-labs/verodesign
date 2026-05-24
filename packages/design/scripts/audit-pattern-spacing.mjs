#!/usr/bin/env node
import { auditPatternSpacing } from '../src/audit/pattern-spacing.mjs';

const result = auditPatternSpacing();

if (result.failures.length) {
  console.error('[pattern-spacing-audit] FAIL');
  for (const failure of result.failures) {
    console.error(`- type: ${failure.type}`);
    console.error(`  selector: ${failure.selector}`);
    console.error(`  detail: ${failure.detail}`);
  }
  process.exit(1);
}

console.log('[pattern-spacing-audit] PASS');
for (const root of result.roots) {
  console.log(`- ${root.pattern}: ${root.status}`);
}
