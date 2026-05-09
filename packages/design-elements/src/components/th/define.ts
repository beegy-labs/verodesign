import { VdsTh } from './vds-th.js';

if (!customElements.get('vds-th')) {
  customElements.define('vds-th', VdsTh);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-th': VdsTh;
  }
}
