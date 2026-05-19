import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/dialog/define.js';

async function flushFocusFrames(): Promise<void> {
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

describe('vds-dialog', () => {
  it('moves initial focus to the panel and preserves title labelling', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Open';
    document.body.append(trigger);
    trigger.focus();

    const el = await fixture<HTMLElement>(html`
      <vds-dialog open>
        <span slot="title">Long dialog title for truncation</span>
        <button type="button">Action</button>
      </vds-dialog>
    `);

    await flushFocusFrames();

    const panel = el.shadowRoot?.querySelector<HTMLElement>('.panel');
    const close = el.shadowRoot?.querySelector<HTMLButtonElement>('.close');
    const title = el.shadowRoot?.querySelector<HTMLElement>('.title');
    expect(panel).to.exist;
    expect(close).to.exist;
    expect(title).to.exist;

    expect(document.activeElement).to.equal(el);
    expect(el.shadowRoot?.activeElement).to.equal(panel);
    expect(close).to.not.equal(el.shadowRoot?.activeElement);
    expect(panel?.getAttribute('aria-labelledby')).to.equal(title?.id);

    el.remove();
    trigger.remove();
  });

  it('preserves escape close, backdrop close, focus trap, and trigger restore', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Launch';
    document.body.append(trigger);
    trigger.focus();

    const el = await fixture<any>(html`
      <vds-dialog open>
        <span slot="title">Dialog title</span>
        <button type="button">Primary action</button>
      </vds-dialog>
    `);

    await flushFocusFrames();

    const panel = el.shadowRoot?.querySelector<HTMLElement>('.panel');
    const close = el.shadowRoot?.querySelector<HTMLButtonElement>('.close');
    const backdrop = el.shadowRoot?.querySelector<HTMLElement>('.backdrop');
    expect(panel).to.exist;
    expect(close).to.exist;
    expect(backdrop).to.exist;

    document.body.focus();
    await flushFocusFrames();
    expect(el.shadowRoot?.activeElement).to.equal(panel);

    panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await flushFocusFrames();
    expect(el.shadowRoot?.activeElement).to.equal(close);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    await flushFocusFrames();
    expect(el.open).to.equal(false);
    expect(document.activeElement).to.equal(trigger);

    trigger.focus();
    el.show();
    await el.updateComplete;
    await flushFocusFrames();

    backdrop?.click();
    await el.updateComplete;
    await flushFocusFrames();
    expect(el.open).to.equal(false);
    expect(document.activeElement).to.equal(trigger);

    el.remove();
    trigger.remove();
  });
});
