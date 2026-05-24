import { fixture, html, expect } from '@open-wc/testing';
import './define.js';
import './icons/calendar.js';

describe('vds-icon', () => {
  it('renders a registered icon and resolves token size aliases', async () => {
    const el = await fixture<any>(html`<vds-icon name="calendar" size="lg"></vds-icon>`);
    await el.updateComplete;

    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg).to.exist;
    expect(svg?.getAttribute('style')).to.contain('32px');
    expect(el.getAttribute('aria-hidden')).to.equal('true');
  });

  it('promotes labelled icons to img semantics', async () => {
    const el = await fixture<any>(html`<vds-icon name="calendar" aria-label="Calendar"></vds-icon>`);
    await el.updateComplete;

    expect(el.getAttribute('role')).to.equal('img');
    expect(el.hasAttribute('aria-hidden')).to.equal(false);
  });

  it('warns once for an unknown icon name', async () => {
    const warn = globalThis.console.warn;
    const calls: string[] = [];
    globalThis.console.warn = (message?: unknown) => calls.push(String(message));

    try {
      const el = await fixture<any>(html`<vds-icon name="missing"></vds-icon>`);
      await el.updateComplete;
      expect(calls.length).to.equal(1);
      expect(calls[0]).to.contain('Unknown icon "missing"');
    } finally {
      globalThis.console.warn = warn;
    }
  });
});
