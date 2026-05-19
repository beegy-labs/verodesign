import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../dist/components/tabs/define.js';

describe('vds-tabs', () => {
  it('keeps underline as the default variant and syncs active state', async () => {
    const el = await fixture<any>(html`
      <vds-tabs value="profile">
        <vds-tab value="overview">Overview</vds-tab>
        <vds-tab value="profile">Profile</vds-tab>
        <vds-tab-panel value="overview">Overview panel</vds-tab-panel>
        <vds-tab-panel value="profile">Profile panel</vds-tab-panel>
      </vds-tabs>
    `);

    await el.updateComplete;

    const tabs = Array.from(el.querySelectorAll('vds-tab'));
    expect(el.getAttribute('variant')).to.equal('underline');
    expect(tabs[0].getAttribute('data-variant')).to.equal('underline');
    expect(tabs[1].hasAttribute('data-active')).to.equal(true);
    expect(tabs[1].getAttribute('aria-selected')).to.equal('true');
    expect(tabs[0].tabIndex).to.equal(-1);
    expect(tabs[1].tabIndex).to.equal(0);
  });

  it('applies segmented variant styles via parent-reflected state', async () => {
    const el = await fixture<any>(html`
      <vds-tabs variant="segmented" value="billing">
        <vds-tab value="account">Account</vds-tab>
        <vds-tab value="billing">Billing</vds-tab>
        <vds-tab-panel value="account">Account panel</vds-tab-panel>
        <vds-tab-panel value="billing">Billing panel</vds-tab-panel>
      </vds-tabs>
    `);

    await el.updateComplete;

    const tablist = el.shadowRoot?.querySelector<HTMLElement>('.tablist');
    const [inactiveTab, activeTab] = Array.from(el.querySelectorAll<HTMLElement>('vds-tab'));

    expect(tablist).to.exist;
    expect(getComputedStyle(tablist!).borderBottomStyle).to.equal('none');
    expect(activeTab.getAttribute('data-variant')).to.equal('segmented');
    expect(inactiveTab.getAttribute('data-variant')).to.equal('segmented');
    expect(activeTab.hasAttribute('data-active')).to.equal(true);
  });

  it('preserves keyboard activation and vds-change emission in segmented mode', async () => {
    const el = await fixture<any>(html`
      <vds-tabs variant="segmented" value="overview">
        <vds-tab value="overview">Overview</vds-tab>
        <vds-tab value="settings">Settings</vds-tab>
        <vds-tab-panel value="overview">Overview panel</vds-tab-panel>
        <vds-tab-panel value="settings">Settings panel</vds-tab-panel>
      </vds-tabs>
    `);

    await el.updateComplete;

    const [overviewTab, settingsTab] = Array.from(el.querySelectorAll<any>('vds-tab'));
    overviewTab.focus();
    const change = oneEvent(el, 'vds-change');
    overviewTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    settingsTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const event = await change;
    await el.updateComplete;

    const panels = Array.from(el.querySelectorAll<HTMLElement>('vds-tab-panel'));
    expect((event as CustomEvent).detail.value).to.equal('settings');
    expect(el.value).to.equal('settings');
    expect(settingsTab.hasAttribute('data-active')).to.equal(true);
    expect(document.activeElement).to.equal(settingsTab);
    expect(panels[0].hasAttribute('hidden')).to.equal(true);
    expect(panels[1].hasAttribute('hidden')).to.equal(false);
  });
});
