import { VdsDialog } from './vds-dialog.js';

if (!customElements.get('vds-dialog')) {
  customElements.define('vds-dialog', VdsDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-dialog': VdsDialog;
  }
}
