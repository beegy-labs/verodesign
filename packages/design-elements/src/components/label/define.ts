import { VdsLabel } from './vds-label.js';

if (!customElements.get('vds-label')) {
  customElements.define('vds-label', VdsLabel);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-label': VdsLabel;
  }
}
