import { VdsSettingsRow } from './vds-settings-row.js';

if (!customElements.get('vds-settings-row')) {
  customElements.define('vds-settings-row', VdsSettingsRow);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-settings-row': VdsSettingsRow;
  }
}
