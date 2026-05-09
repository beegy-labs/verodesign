import { VdsGrid } from './vds-grid.js';

if (!customElements.get('vds-grid')) {
  customElements.define('vds-grid', VdsGrid);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-grid': VdsGrid;
  }
}
