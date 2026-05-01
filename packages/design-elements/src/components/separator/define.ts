import { VdsSeparator } from './vds-separator.js';

if (!customElements.get('vds-separator')) {
  customElements.define('vds-separator', VdsSeparator);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-separator': VdsSeparator;
  }
}
