import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/button/define.js';
import '../src/components/dialog/define.js';
import '../src/components/icon-button/define.js';

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

  it('coarse pointer styles keep button and icon-button touch targets at least 44px', async () => {
    const [buttonEl, iconButtonEl] = await Promise.all([
      fixture(html`<vds-button size="sm">Hi</vds-button>`),
      fixture(html`<vds-icon-button size="sm" aria-label="More">+</vds-icon-button>`),
    ]);

    for (const el of [buttonEl, iconButtonEl]) {
      const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.button');
      expect(button).to.exist;

      const sheetText = Array.from(el.shadowRoot?.adoptedStyleSheets ?? [])
        .map((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText).join('\n'))
        .join('\n');

      expect(sheetText).to.include('@media (pointer: coarse)');
      expect(sheetText).to.include('width: max(100%, 2.75rem);');
      expect(sheetText).to.include('height: max(100%, 2.75rem);');
    }
  });
});
