import test from 'node:test';
import assert from 'node:assert/strict';

import { migrateText, migrateTokenJson } from '../dist/lib/naming.js';

test('migrateTokenJson nests status and foreground tokens', () => {
  const input = JSON.stringify({
    theme: {
      primary: { $value: '{color.blue.7}', $type: 'color' },
      'primary-fg': { $value: '{color.white}', $type: 'color' },
      'primary-ring': { $value: '{color.blue.5}', $type: 'color' },
      success: { $value: '{color.green.7}', $type: 'color' },
      'success-fg': { $value: '{color.white}', $type: 'color' },
      cancelled: { $value: '{color.slate.7}', $type: 'color' },
      'cancelled-fg': { $value: '{color.white}', $type: 'color' }
    }
  });

  const output = JSON.parse(migrateTokenJson(input));
  assert.equal(output.theme.primary.$root.$value, '{color.blue.7}');
  assert.equal(output.theme.primary.foreground.$value, '{color.white}');
  assert.equal(output.theme.primary.ring.$value, '{color.blue.5}');
  assert.equal(output.theme.status.success.$root.$value, '{color.green.7}');
  assert.equal(output.theme.status.success.foreground.$value, '{color.white}');
  assert.equal(output.theme.cancelled.foreground.$value, '{color.white}');
  assert.equal('primary-fg' in output.theme, false);
  assert.equal('success-fg' in output.theme, false);
});

test('migrateText rewrites CSS vars and token refs', () => {
  const input = [
    'color: var(--vds-theme-success-fg);',
    'background: var(--vds-theme-primary);',
    '{theme.success-fg}',
    '{theme.success}',
    '{theme.primary-fg}'
  ].join('\n');

  const output = migrateText(input);
  assert.match(output, /--vds-theme-status-success-foreground/);
  assert.match(output, /\{theme\.status\.success\.foreground\}/);
  assert.match(output, /\{theme\.status\.success\}/);
  assert.match(output, /\{theme\.primary\.foreground\}/);
});
