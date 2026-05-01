import { VdsTextArea } from './vds-text-area.js';

if (!customElements.get('vds-text-area')) {
  customElements.define('vds-text-area', VdsTextArea);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-text-area': VdsTextArea;
  }
}
