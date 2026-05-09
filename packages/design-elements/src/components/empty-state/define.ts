import { VdsEmptyState } from './vds-empty-state.js';

if (!customElements.get('vds-empty-state')) {
  customElements.define('vds-empty-state', VdsEmptyState);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-empty-state': VdsEmptyState;
  }
}
