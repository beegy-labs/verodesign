import { VdsSpacer } from './vds-spacer.js';

if (!customElements.get('vds-spacer')) {
  customElements.define('vds-spacer', VdsSpacer);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-spacer': VdsSpacer;
  }
}
