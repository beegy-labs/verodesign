import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../src/components/date-grid/define.js';

describe('vds-date-grid', () => {
  it('renders ARIA grid semantics with dynamic rows and selectable cells', async () => {
    const el = await fixture<any>(html`
      <vds-date-grid year="2026" month="8" selected-date="2026-08-20" dot-dates="2026-08-10,2026-08-20"></vds-date-grid>
    `);
    await el.updateComplete;

    const gridcells = el.shadowRoot?.querySelectorAll('[role="gridcell"]') ?? [];
    expect(el.getAttribute('role')).to.equal('grid');
    expect(gridcells.length).to.equal(42);
    expect(el.shadowRoot?.querySelector('button[data-selected="true"]')).to.exist;
  });

  it('emits vds-date-select when a date is chosen', async () => {
    const el = await fixture<any>(html`<vds-date-grid year="2026" month="7"></vds-date-grid>`);
    await el.updateComplete;

    const target = el.shadowRoot?.querySelector<HTMLButtonElement>('button[data-date="2026-07-20"]');
    expect(target).to.exist;

    const select = oneEvent(el, 'vds-date-select');
    target?.click();
    const event = await select;

    expect((event as CustomEvent).detail.date).to.equal('2026-07-20');
  });
});
