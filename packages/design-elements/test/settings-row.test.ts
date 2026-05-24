import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/settings-row/define.js';

describe('vds-settings-row', () => {
  it('renders button-like semantics and default chevron affordance', async () => {
    const el = await fixture<any>(html`
      <vds-settings-row
        tone="indigo"
        row-label="KIS credentials"
        description="API connected"
        description-tone="success"
        chevron
      ></vds-settings-row>
    `);
    await el.updateComplete;

    expect(el.getAttribute('role')).to.equal('button');
    expect(el.getAttribute('aria-label')).to.contain('KIS credentials');
    expect(el.shadowRoot?.querySelector('svg')).to.exist;
  });
});
