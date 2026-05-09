import { VdsStatTile } from './vds-stat-tile.js';

if (!customElements.get('vds-stat-tile')) {
  customElements.define('vds-stat-tile', VdsStatTile);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-stat-tile': VdsStatTile;
  }
}
