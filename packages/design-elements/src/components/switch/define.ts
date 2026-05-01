import { VdsSwitch } from './vds-switch.js';

if (!customElements.get('vds-switch')) {
  customElements.define('vds-switch', VdsSwitch);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-switch': VdsSwitch;
  }
}
