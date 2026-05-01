import { VdsBadge } from './vds-badge.js';

if (!customElements.get('vds-badge')) {
  customElements.define('vds-badge', VdsBadge);
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-badge': VdsBadge;
  }
}
