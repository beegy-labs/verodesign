import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/progress/define.js';

describe('vds-progress', () => {
  it('exposes progressbar semantics with determinate values', async () => {
    const el = await fixture<any>(html`<vds-progress value="65" max="100" aria-label="Goal progress"></vds-progress>`);
    await el.updateComplete;

    expect(el.getAttribute('role')).to.equal('progressbar');
    expect(el.getAttribute('aria-valuenow')).to.equal('65');
    expect(el.getAttribute('aria-valuemax')).to.equal('100');
  });

  it('omits aria-valuenow in indeterminate mode', async () => {
    const el = await fixture<any>(html`<vds-progress indeterminate aria-label="Loading"></vds-progress>`);
    await el.updateComplete;

    expect(el.hasAttribute('aria-valuenow')).to.equal(false);
  });
});
