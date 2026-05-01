import { VdsToast, VdsToastGroup } from './vds-toast.js';
declare global {
    interface HTMLElementTagNameMap {
        'vds-toast': VdsToast;
        'vds-toast-group': VdsToastGroup;
    }
}
