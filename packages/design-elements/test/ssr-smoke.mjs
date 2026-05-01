// SSR smoke test — exercise @lit-labs/ssr against built components.
// Validates that all custom elements render to declarative shadow DOM HTML
// without throwing in a Node.js (no DOM globals) environment.

import '@lit-labs/ssr/lib/install-global-dom-shim.js';
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js';
import { render } from '@lit-labs/ssr';
import { html } from 'lit';
import '../dist/components/button/define.js';
import '../dist/components/card/define.js';
import '../dist/components/text-field/define.js';
import '../dist/components/text-area/define.js';
import '../dist/components/dialog/define.js';
import '../dist/components/tabs/define.js';
import '../dist/components/menu/define.js';
import '../dist/components/toast/define.js';

const cases = [
  { name: 'vds-button', tpl: html`<vds-button>Click</vds-button>` },
  { name: 'vds-card', tpl: html`<vds-card><span slot="header">Title</span>Body</vds-card>` },
  { name: 'vds-text-field', tpl: html`<vds-text-field label="Name" name="name"></vds-text-field>` },
  { name: 'vds-text-area', tpl: html`<vds-text-area label="Bio" name="bio"></vds-text-area>` },
  { name: 'vds-dialog', tpl: html`<vds-dialog><span slot="title">Title</span>Body</vds-dialog>` },
  { name: 'vds-tabs', tpl: html`<vds-tabs value="a"><vds-tab slot="tab" value="a">A</vds-tab><vds-tab-panel value="a">A panel</vds-tab-panel></vds-tabs>` },
  { name: 'vds-menu', tpl: html`<vds-menu><button slot="trigger">Open</button><vds-menu-item value="x">X</vds-menu-item></vds-menu>` },
  { name: 'vds-toast', tpl: html`<vds-toast title="Saved"></vds-toast>` },
];

let failed = 0;
const verbose = process.env.VDS_DEBUG === '1';
for (const { name, tpl } of cases) {
  try {
    const out = collectResultSync(render(tpl));
    const hasOpen = out.includes('shadowrootmode') || out.includes('shadowroot=');
    const tagPresent = out.includes(`<${name}`);
    if (verbose) console.log(`--- ${name} ---\n${out}\n`);
    if (!tagPresent) {
      console.error(`✗ ${name}: tag not emitted`);
      failed += 1;
    } else if (!hasOpen) {
      console.error(`✗ ${name}: declarative shadow DOM not emitted`);
      failed += 1;
    } else {
      console.log(`✓ ${name}: ${out.length} bytes, DSD present`);
    }
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    if (process.env.VDS_DEBUG) console.error(err.stack);
    failed += 1;
  }
}

if (failed) {
  console.error(`\nSSR smoke failed: ${failed} component(s)`);
  process.exit(1);
}
console.log('\nSSR smoke passed for all 8 components');
