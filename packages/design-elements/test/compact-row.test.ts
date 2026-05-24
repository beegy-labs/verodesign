import { fixture, html, expect } from '@open-wc/testing';
import '../dist/components/compact-row/define.js';

describe('vds-compact-row', () => {
  it('renders a button when as=button', async () => {
    const el = await fixture<any>(html`<vds-compact-row as="button">Label</vds-compact-row>`);
    const root = el.shadowRoot?.querySelector('button');
    expect(root).to.exist;
  });

  it('renders a link when as=link and forwards aria-disabled', async () => {
    const el = await fixture<any>(html`<vds-compact-row as="link" href="/settings" disabled>Label</vds-compact-row>`);
    const root = el.shadowRoot?.querySelector('a');
    expect(root?.getAttribute('aria-disabled')).to.equal('true');
  });
});
