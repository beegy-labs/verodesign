import { VdsSkeleton } from './vds-skeleton.js';

if (!customElements.get('vds-skeleton')) {
  customElements.define('vds-skeleton', VdsSkeleton);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-skeleton': VdsSkeleton;
  }
}
