import { VdsCheckbox } from './vds-checkbox.js';

if (!customElements.get('vds-checkbox')) {
  customElements.define('vds-checkbox', VdsCheckbox);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-checkbox': VdsCheckbox;
  }
}
