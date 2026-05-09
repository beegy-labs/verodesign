import { VdsPageHeader } from './vds-page-header.js';

if (!customElements.get('vds-page-header')) {
  customElements.define('vds-page-header', VdsPageHeader);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-page-header': VdsPageHeader;
  }
}
