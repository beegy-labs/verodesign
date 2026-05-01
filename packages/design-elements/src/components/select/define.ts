import { VdsSelect } from './vds-select.js';
import { VdsOption } from './vds-option.js';

if (!customElements.get('vds-select')) {
  customElements.define('vds-select', VdsSelect);
}
if (!customElements.get('vds-option')) {
  customElements.define('vds-option', VdsOption);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-select': VdsSelect;
    'vds-option': VdsOption;
  }
}
