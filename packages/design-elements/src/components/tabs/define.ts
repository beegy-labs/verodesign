import { VdsTabs, VdsTab, VdsTabPanel } from './vds-tabs.js';

if (!customElements.get('vds-tabs')) customElements.define('vds-tabs', VdsTabs);
if (!customElements.get('vds-tab')) customElements.define('vds-tab', VdsTab);
if (!customElements.get('vds-tab-panel')) customElements.define('vds-tab-panel', VdsTabPanel);

declare global {
  interface HTMLElementTagNameMap {
    'vds-tabs': VdsTabs;
    'vds-tab': VdsTab;
    'vds-tab-panel': VdsTabPanel;
  }
}
