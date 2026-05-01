import { VdsSelect } from './vds-select.js';
import { VdsOption } from './vds-option.js';
declare global {
    interface HTMLElementTagNameMap {
        'vds-select': VdsSelect;
        'vds-option': VdsOption;
    }
}
