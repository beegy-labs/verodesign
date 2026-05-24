import { VdsIcon } from './vds-icon.js';

if (!customElements.get('vds-icon')) {
  customElements.define('vds-icon', VdsIcon);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-icon': VdsIcon;
  }
}
