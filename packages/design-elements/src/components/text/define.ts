import { VdsText } from './vds-text.js';

if (!customElements.get('vds-text')) {
  customElements.define('vds-text', VdsText);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-text': VdsText;
  }
}
