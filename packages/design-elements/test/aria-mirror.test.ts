import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/button/define.js';
import '../src/components/dialog/define.js';

describe('attribute-mirror — Firefox ARIA fallback', () => {
  it('vds-button reflects role=button', async () => {
    const el = await fixture(html`<vds-button>Hi</vds-button>`);
    expect(el.getAttribute('role')).to.equal('button');
  });

  it('vds-button reflects aria-disabled when disabled', async () => {
    const el = await fixture<HTMLElement>(html`<vds-button disabled>Hi</vds-button>`);
    await new Promise((r) => requestAnimationFrame(r));
    expect(el.getAttribute('aria-disabled')).to.equal('true');
  });

  it('vds-dialog reflects role=dialog and aria-modal=true', async () => {
    const el = await fixture(html`<vds-dialog>Body</vds-dialog>`);
    expect(el.getAttribute('role')).to.equal('dialog');
    expect(el.getAttribute('aria-modal')).to.equal('true');
  });
});
