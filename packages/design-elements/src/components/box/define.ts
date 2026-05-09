import { VdsBox } from './vds-box.js';

if (!customElements.get('vds-box')) {
  customElements.define('vds-box', VdsBox);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-box': VdsBox;
  }
}
