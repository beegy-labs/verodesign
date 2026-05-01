import { VdsToast, VdsToastGroup } from './vds-toast.js';

if (!customElements.get('vds-toast')) customElements.define('vds-toast', VdsToast);
if (!customElements.get('vds-toast-group')) customElements.define('vds-toast-group', VdsToastGroup);

declare global {
  interface HTMLElementTagNameMap {
    'vds-toast': VdsToast;
    'vds-toast-group': VdsToastGroup;
  }
}
