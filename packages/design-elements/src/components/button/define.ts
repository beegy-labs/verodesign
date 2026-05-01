import { VdsButton } from './vds-button.js';

if (!customElements.get('vds-button')) {
  customElements.define('vds-button', VdsButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-button': VdsButton;
  }
}
