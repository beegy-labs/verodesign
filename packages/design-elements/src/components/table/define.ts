import { VdsTable } from './vds-table.js';

if (!customElements.get('vds-table')) {
  customElements.define('vds-table', VdsTable);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-table': VdsTable;
  }
}
