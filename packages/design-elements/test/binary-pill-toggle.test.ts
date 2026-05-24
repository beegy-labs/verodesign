import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../dist/components/binary-pill-toggle/define.js';

describe('vds-binary-pill-toggle', () => {
  it('sets radiogroup and radio state', async () => {
    const el = await fixture<any>(html`
      <vds-binary-pill-toggle aria-label="Type" value="income">
        <vds-binary-pill-toggle-option value="income">Income</vds-binary-pill-toggle-option>
        <vds-binary-pill-toggle-option value="expense">Expense</vds-binary-pill-toggle-option>
      </vds-binary-pill-toggle>
    `);

    await el.updateComplete;

    const options = Array.from(el.querySelectorAll('vds-binary-pill-toggle-option'));
    expect(el.getAttribute('role')).to.equal('radiogroup');
    expect(options[0].getAttribute('role')).to.equal('radio');
    expect(options[0].getAttribute('aria-checked')).to.equal('true');
    expect(options[1].getAttribute('aria-checked')).to.equal('false');
  });

  it('moves selection with arrow keys and emits vds-change', async () => {
    const el = await fixture<any>(html`
      <vds-binary-pill-toggle aria-label="Type" value="income">
        <vds-binary-pill-toggle-option value="income">Income</vds-binary-pill-toggle-option>
        <vds-binary-pill-toggle-option value="expense">Expense</vds-binary-pill-toggle-option>
      </vds-binary-pill-toggle>
    `);

    await el.updateComplete;

    const [income, expense] = Array.from(el.querySelectorAll<any>('vds-binary-pill-toggle-option'));
    income.focus();
    const change = oneEvent(el, 'vds-change');
    income.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    const event = await change;
    await el.updateComplete;

    expect((event as CustomEvent).detail.value).to.equal('expense');
    expect(el.value).to.equal('expense');
    expect(expense.getAttribute('aria-checked')).to.equal('true');
  });
});
