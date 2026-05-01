import { VdsTextField } from './vds-text-field.js';

if (!customElements.get('vds-text-field')) {
  customElements.define('vds-text-field', VdsTextField);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-text-field': VdsTextField;
  }
}
