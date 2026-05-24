import { VdsCompactRow } from './vds-compact-row.js';

if (!customElements.get('vds-compact-row')) {
  customElements.define('vds-compact-row', VdsCompactRow);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-compact-row': VdsCompactRow;
  }
}
