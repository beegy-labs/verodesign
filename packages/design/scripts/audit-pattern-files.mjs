#!/usr/bin/env node
import { auditPatternFiles } from '../src/audit/pattern-files.mjs';

async function main() {
  const { entries, failures } = await auditPatternFiles();

  if (failures.length) {
    console.error('[pattern-file-audit] FAIL');
    for (const failure of failures) {
      console.error(`- ${failure.file}:${failure.line} [${failure.rule}] ${failure.detail}`);
    }
    process.exit(1);
  }

  console.log(`[pattern-file-audit] PASS (${entries.length} files)`);
  for (const file of entries) {
    console.log(`- ${file}`);
  }
}

main().catch((error) => {
  console.error('[pattern-file-audit] ERROR');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
