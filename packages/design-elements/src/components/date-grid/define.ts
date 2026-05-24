import { VdsDateGrid } from './vds-date-grid.js';

if (!customElements.get('vds-date-grid')) {
  customElements.define('vds-date-grid', VdsDateGrid);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-date-grid': VdsDateGrid;
  }
}
