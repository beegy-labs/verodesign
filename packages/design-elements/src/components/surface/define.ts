import { VdsSurface } from './vds-surface.js';

if (!customElements.get('vds-surface')) {
  customElements.define('vds-surface', VdsSurface);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-surface': VdsSurface;
  }
}
